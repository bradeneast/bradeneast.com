if (IE || !('fetch' in window)) {

    var searchWrapper = document.getElementById('search_wrapper');
    searchWrapper ? searchWrapper.style.display = 'none' : null;

} else {

    var sitemap = fetch('/sitemap.json').then(function (r) { return r.json() });
    var resultListElem = document.getElementById('search_results');
    var resultTemplate = document.getElementById('search_result_template');

}

function handleSearchInput(inputValue) {

    // clear previous search results
    var prevResults = resultListElem.querySelectorAll('.result');
    for (var i = 0; i < prevResults.length; i++) {
        prevResults[i].remove();
    }

    sitemap.then(function (pages) {

        // get matching pages from sitemap
        var matchProps = ['name'];
        var results = search(inputValue, pages, matchProps);

        if (!results) return;

        // populate result template with new info for each page
        for (var r in results) {

            var { content, matchedBy } = results[r];
            var template = resultTemplate.cloneNode(true);
            var dynamic = new RegExp('result\..+?(?=[\W< `"\'])', 'gi');
            var dynamicMatches = template.innerHTML.match(dynamic) || [];

            for (var m in dynamicMatches) {

                var match = dynamicMatches[m]
                var query = match.replace('result.', '');
                var value = valueIn(content, query);

                if (matchProps.indexOf(query) > -1) {

                    var marked = value.replace(matchedBy[0], '<mark>' + matchedBy[0] + '</mark>');
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