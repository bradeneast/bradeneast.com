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

        let feedItems = [];
        let itemTemplate = firstElementChild(elem);
        let feedFrom = elem.attrs[options.feeds.attribute];
        let targetPages = [];

        if (feedFrom.includes('/categories/')) {

            feedFrom = feedFrom.split('/categories/').pop();
            targetPages = pages.filter(page => page.categories.some(c => linkify(c) == feedFrom));

        } else {

            targetPages = pages.filter(page => page.scopes.some(s => s.target == feedFrom));

        }

        for (let i = 0; i < targetPages.length; i++) {

            let page = targetPages[i];
            let elem = firstElementChild(itemTemplate);
            let unwrapped = deepCopy(elem);
            let itemStr = HTML.stringify([unwrapped]);
            let populated = includeVariables(page, itemStr);

            feedItems.push(HTML.parse(populated)[0]);

        }

        elem.children = feedItems;
        break;
    }

    page.content = HTML.stringify(ast);
}