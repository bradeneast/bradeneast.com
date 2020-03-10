var sitemap = fetch('/sitemap.json').then(r => r.json());
var resultListElem = document.getElementById('search_results');
var resultTemplate = document.getElementById('search_result_template');

function search(value, inArray, { matchProps } = {}) {

    if (!value.length) return;

    let search = new RegExp(value, 'gi');
    let results = [];

    inArray.map(obj => {

        let props = matchProps || Object.keys(obj);

        props.map(prop => {

            let value = valueIn(obj, prop);
            let match = value.match(search);

            if (search.test(value)) {

                let result = {
                    content: obj,
                    match: match
                }

                if (results.indexOf(result) > -1) return;

                results.push(result);
            }

        })

    })

    return results;
}


document.addEventListener('keyup', (e) => {

    if (e.target.id == 'search' && !IE) {

        // clear previous search results
        resultListElem.querySelectorAll('li').forEach(item => item.remove());

        sitemap.then(pages => {

            // get matching pages from sitemap
            let results = search(e.target.value, pages,
                { matchProps: ['name'] }
            );

            // populate result template with new info for each page
            results.map(result => {

                let page = result.content;
                let match = result.match;

                if (page.parentDir.split('/').pop() == 'categories') return;

                let template = document.importNode(resultTemplate.content, true);
                let li = template.firstElementChild;
                let dynamicMatches = li.innerHTML.match(/result\..+?(?!\w|\.)/g) || [];

                dynamicMatches.map(variable => {
                    let value = valueIn(page, variable.replace('result.', ''));
                    li.innerHTML = li.innerHTML.replace(variable, value);
                })

                resultListElem.appendChild(template);

            })

        })

    }

})