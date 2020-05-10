import HTML from './deno_modules/html_parse_stringify/mod.ts';
import options from '../options.ts';
import includeVariables from './variables.ts';
import { deepCopy, firstElementChild, walkAst, linkify } from './utils.ts';
import { pages } from './build.ts';


export default function processFeeds(thisPage) {

    let ast = HTML.parse(thisPage.content);

    for (let elem of walkAst(ast)) {

        if (elem.type == 'text') continue;
        if (!elem.attrs?.[options.feeds.attribute]) continue;
        if (!elem.attrs?.[options.feeds.attribute]?.length) continue;

        let feedItems = [];
        let itemTemplate = firstElementChild(elem);
        let feedFrom = elem.attrs[options.feeds.attribute];
        let targetPages = [];

        if (/categories/i.test(feedFrom)) {

            feedFrom = feedFrom.split('/categories/').pop();

            for (let page of pages) {
                let categoryMatch = page.categories.names.some(c => linkify(c) == feedFrom);
                let scopeMatch = page.scopes.some(s => {
                    return s.target.substring(1) == thisPage.parentDir.split('/')[0];
                });
                if (categoryMatch && scopeMatch) {
                    targetPages.push(page);
                }
            }
        } else {
            targetPages = pages.filter(
                page => page.scopes.some(
                    s => s.target == feedFrom
                )
            );
        }

        for (let page of targetPages) {

            let templateElement = deepCopy(firstElementChild(itemTemplate));
            if (!templateElement.children) continue;

            let hydrated = includeVariables(
                page,
                HTML.stringify(
                    [templateElement]
                )
            );

            feedItems.push(HTML.parse(hydrated)[0]);
        }

        elem.children = feedItems;
        break;
    }

    thisPage.content = HTML.stringify(ast);
}