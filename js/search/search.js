import { valueIn, search } from './_utils.js';


if (!('fetch' in window)) {
    let searchWrapper = document.getElementById('search_wrapper');
    searchWrapper ? searchWrapper.style.display = 'none' : null;
}


let sitemap = fetch('/sitemap.json').then(function (r) { return r.json() });
let resultListElem = document.getElementById('search_results');
let resultTemplate = document.getElementById('search_result_template');
let searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', e => {
    handleSearchInput(e.target.value)
})


function handleSearchInput(inputValue) {

    // clear previous search results
    let prevResults = resultListElem.querySelectorAll('.result');
    for (let i = 0; i < prevResults.length; i++) {
        prevResults[i].remove();
    }

    sitemap.then(pages => {

        // get matching pages from sitemap
        let matchProps = ['name'];
        let results = search(inputValue, pages, matchProps);

        if (!results) return;

        // populate result template with new info for each page
        for (let { content, matchedBy } of results) {

            let template = resultTemplate.cloneNode(true);
            let dynamic = new RegExp('result\..+?(?=[\W< `"\'])', 'gi');
            let dynamicMatches = template.innerHTML.match(dynamic) || [];

            for (let match of dynamicMatches) {

                let query = match.replace('result.', '');
                let value = valueIn(content, query);

                if (matchProps.includes(query)) {

                    let marked = value.replace(matchedBy[0], `<mark>${matchedBy[0]}</mark>`);
                    template.innerHTML = template.innerHTML.replace(match, marked);

                } else {

                    template.innerHTML = template.innerHTML.replace(match, value);

                }
            }

            template.id = '';
            template.classList.add('result');
            resultListElem.appendChild(template);

        }
    })

}