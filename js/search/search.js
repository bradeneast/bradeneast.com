import handleSearch from './_handleSearch.js';


export let sitemap = fetch('/sitemap.json').then(function (r) { return r.json() });
export let resultsElem = document.getElementById('search_results');
export let resultTemplate = document.getElementById('search_result_template');


if (!('fetch' in window)) {
    let searchWrapper = document.getElementById('search_wrapper');
    searchWrapper ? searchWrapper.style.display = 'none' : null;
}


let searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', e => {

    handleSearch(e.target.value);
    history.replaceState(null, null, `${location.pathname}?${e.target.value}`);

})

if (location.search) {

    let search = location.search.replace('?', '');

    searchInput.value = search;
    handleSearch(search);

}