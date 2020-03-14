import { valueIn, search } from './_utils.js';
import { sitemap, resultsElem, resultTemplate } from './search.js';

export default (inputValue) => {

    // clear previous search results
    let prevResults = resultsElem.querySelectorAll('.result');
    prevResults.forEach(result => result.remove());

    sitemap.then(pages => {

        // get matching pages from sitemap
        let matchProps = ['name', 'excerpt'];
        let results = search(inputValue, pages, matchProps);

        if (!results) return;

        // populate result template with new info for each page
        for (let { content, matchedBy } of results) {

            let template = resultTemplate.cloneNode(true);
            let temp = template.innerHTML;
            let dynamic = new RegExp('result\..+?(?=[\W< `"\'])', 'gi');
            let matches = temp.match(dynamic) || [];

            for (let match of matches) {

                let query = match.replace('result.', '');
                let value = valueIn(content, query);

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
    })

}