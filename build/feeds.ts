import HTML from './deno_modules/html_parse_stringify/mod.ts';
import options from '../options.ts';
import includeVariables from './variables.ts';
import { deepCopy, firstElementChild, walkAst, linkify } from './utils.ts';
import { pages } from './build.ts';


export default function processFeeds(page) {

    let ast = HTML.parse(page.content);

    for (let elem of walkAst(ast)) {

        if (elem.type == 'text') continue;
        if (!elem.attrs?.[options.feeds.attribute]) continue;
        if (!elem.attrs?.[options.feeds.attribute]?.length) continue;

        let feedItems = [];
        let itemTemplate = firstElementChild(elem);
        let feedFrom = elem.attrs[options.feeds.attribute];
        let targetPages = [];

        if (feedFrom.includes('/categories/')) {
            feedFrom = feedFrom.split('/categories/').pop();
            targetPages = pages.filter(
                page => page.categories.names.some(
                    c => linkify(c) == feedFrom
                )
            );
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

    page.content = HTML.stringify(ast);
}