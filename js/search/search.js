import { valueIn, search } from './_utils.js';


if (!('fetch' in window)) {
    let searchWrapper = document.getElementById('search_wrapper');
    searchWrapper ? searchWrapper.style.display = 'none' : null;
}


let sitemap = fetch('/sitemap.json').then(function (r) { return r.json() });
let resultListElem = document.getElementById('search_results');
let resultTemplate = document.getElementById('search_result_template');
let searchInput = document.getElementById('search');


searchInput.addEventListener('keyup', e => { handleSearchInput(e.target.value) })


function handleSearchInput(inputValue) {

    // clear previous search results
    let prevResults = resultListElem.querySelectorAll('.result');
    prevResults.forEach(result => result.remove());

    sitemap.then(pages => {

        // get matching pages from sitemap
        let matchProps = ['name', 'excerpt'];
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

                    let reMatch = new RegExp(matchedBy[0], 'gi');

                    value = value.replace(reMatch, `<mark>${matchedBy[0]}</mark>`);
                    template.innerHTML = template.innerHTML.replace(match, value);

                    continue;
                }

                template.innerHTML = template.innerHTML.replace(match, value);
            }

            template.removeAttribute('id');
            template.classList.add('result');
            resultListElem.appendChild(template);
        }
    })

}