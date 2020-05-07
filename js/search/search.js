let xhttp = new XMLHttpRequest();
let pages = [];
let resultsElem = document.getElementById('search_results');
let resultTemplate = document.getElementById('search_result_template');
let searchInput = document.getElementById('search');



xhttp.onreadystatechange = function () {
    if (this.readyState != 4 || this.status != 200) return;
    pages = JSON.parse(xhttp.responseText);
    searchInput.addEventListener('keyup', handleSearchInput);
}
xhttp.open("GET", "/sitemap.json", true);
xhttp.send();



function get(object, query = '') {
    let props = query.split('.');
    let value = { ...object };
    props.map(prop => value = value[prop] || '');
    return value;
}


function search(value, inArray, matchProps) {

    if (!value.length) return;
    let searchValue = new RegExp(value, 'gi');
    let results = [];

    for (let obj of inArray) {

        matchProps = matchProps.length ? matchProps : Object.keys(obj);

        for (let prop of matchProps) {
            let value = get(obj, prop);
            if (!searchValue.test(value)) continue;
            if (results.find(r => r.content == obj)) continue;
            results.push({
                content: obj,
                matchedBy: value.match(searchValue)
            })
        }
    }

    return results;
}


function handleSearchInput(event) {

    let inputValue = event.target.value;
    let matchProps = ['name', 'excerpt'];
    let results = search(inputValue, pages, matchProps);

    if (!results) return;
    resultsElem.querySelectorAll('.result').forEach(r => r.remove());

    // populate result template with new info for each page
    for (let { content, matchedBy } of results) {

        let template = resultTemplate.cloneNode(true);
        let temp = template.innerHTML;
        let dynamic = new RegExp('result\..+?(?=[\W< `"\'])', 'gi');
        let matches = temp.match(dynamic) || [];

        for (let match of matches) {

            let query = match.replace('result.', '');
            let value = get(content, query);

            if (matchProps.includes(query)) {
                let reMatch = new RegExp(matchedBy[0], 'gi');
                value = value.replace(reMatch, `<mark>${matchedBy[0]}</mark>`);
                temp = temp.replace(match, value);
                continue;
            }

            temp = temp.replace(match, value);
        }

        template.removeAttribute('id');
        template.classList.add('result');
        template.innerHTML = temp;
        resultsElem.appendChild(template);
    }

    history.replaceState(
        null,
        null,
        `${location.pathname}?${event.target.value}`
    );
}