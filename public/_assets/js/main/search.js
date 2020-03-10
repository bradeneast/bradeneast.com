var sitemap = fetch('/sitemap.json').then(r => r.json());
var resultListElem = document.getElementById('search_results');
var resultTemplate = document.getElementById('search_result_template');

function search(value, inArray, { matchProps } = {}) {

    var search = new RegExp(value, 'gi');
    var results = [];

    inArray.map(obj => {

        var props = matchProps || Object.keys(obj);

        props.map(prop => {

            if (search.test(obj[prop])) results.push(obj);

        })

    })

    return results;

}


document.addEventListener('keyup', (e) => {

    if (e.target.id == 'search' && !IE) {

        resultListElem.querySelectorAll('li').forEach(item => item.remove());
        if (!e.target.value.length) return;

        sitemap.then(pages => {

            var results = search(e.target.value, pages,
                { matchProps: ['name', 'categories.names'] }
            );

            results.map(page => {

                var template = document.importNode(resultTemplate.content, true);
                var li = template.firstElementChild;
                var variableMatches = li.innerHTML.match(/result\..+?(?!\w|\.)/g) || [];

                variableMatches.map(match => {

                    var value = valueIn(page, match.replace('result.', ''));
                    li.innerHTML = li.innerHTML.replace(match, value);

                })

                resultListElem.appendChild(template);

            })

        })

    }

})