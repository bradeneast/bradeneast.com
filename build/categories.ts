import { pages, partials } from "./build.ts";
import options from "../options.ts";
import { ensureFileSync, walkSync } from 'https://deno.land/std/fs/mod.ts';
import applyTemplates from "./templates.ts";
import HTML from './deno_modules/html_parse_stringify/mod.ts';
import getFsInfo from "./fs_info.ts";
import { tag } from "./utils.ts";


export default function makeCategoryPages(scope) {

    let categories = [];
    let categoryDir = [options.paths.dist, scope.target, 'categories'].join('/');
    let categoryPages = [];

    for (let page of pages) {

        let scopeMatch = page.scopes.find(s => s.target == scope.target);
        if (!scopeMatch) continue;

        let newCategories = page.categories.names.filter(c => !categories.includes(c));
        if (newCategories) categories = categories.concat(newCategories);

    }

    if (!categories.length) return;

    // Ensure a file exists for each category
    for (let category of categories) {
        ensureFileSync(
            [categoryDir, category].join('/') + '.html'
        );
    }

    // Get file info for each category page
    for (let { filename, info } of walkSync(categoryDir, { includeDirs: false })) {
        categoryPages.push(getFsInfo({ filename, info }));
        Deno.remove(filename);
    }

    for (let page of categoryPages) {

        let mainTemplate = options.scopes.find(t => t.target.length < 2);
        let usePartial = scope?.categories?.usePartial;

        if (mainTemplate) page.scopes = [mainTemplate];

        if (usePartial) {

            let partial = partials.find(c => c.name == usePartial);
            let ast = HTML.parse(partial.content);
            let feedElem: any;

            for (let elem of ast) {
                if (elem.type == 'text') continue;
                let keys = Object.keys(elem.attrs);
                let hasFeedAttr = keys.some(key => key == options.feeds.attribute);

                if (!hasFeedAttr) continue;
                feedElem = elem;
                break;
            }

            feedElem.attrs[options.feeds.attribute] = page.href;
            page.content = HTML.stringify(ast);

        }

        if (!usePartial) {

            let defaultCategoryFeed = tag({
                name: 'template',
                content: `<li>
                    <a href="[[ page.href ]]">[[ page.name ]]</a>
                </li>`,
            });
            let defaultCategoryPage = `
            ${tag({ name: 'h1', content: '[[ name ]]' })}
            <hr />
            ${tag({
                name: 'ul',
                attributes: [{
                    name: options.feeds.attribute,
                    value: page.href
                }],
                content: defaultCategoryFeed
            })}`;

            page.content += defaultCategoryPage;
        }

        pages.push(page);
    }

    applyTemplates({ target: categoryDir });
}