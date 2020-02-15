import { pages, components } from "./build.ts";
import options from "../options.ts";
import { ensureFileSync, readFileStrSync } from 'https://deno.land/std/fs/mod.ts';
import getFsTree from "./fs_tree.ts";
import applyTemplates from "./templates.ts";
import HTML from './deno_modules/html_parse_stringify/mod.ts';


export default function makeCategoryPages(scope) {

    let categories = [];
    let categoryDir = [options.paths.dist, scope.target, 'categories'].join('/');

    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        let newCategories = page.categories.filter(c => !categories.includes(c));
        if (newCategories) categories = categories.concat(newCategories);
    }

    for (let i = 0; i < categories.length; i++) {
        let category = categories[i];
        let destination = [categoryDir, category].join('/');
        ensureFileSync(destination + '.html');
    }

    let categoryPages = getFsTree(categoryDir);

    for (let i = 0; i < categoryPages.length; i++) {

        let page = categoryPages[i];
        let mainTemplate = options.scopes.find(t => t.target.length < 2);
        let useComponent = scope?.categories?.useComponent;
        
        if (mainTemplate) page.scopes = [mainTemplate];

        if (useComponent) {

            let component = components.find(c => c.name == useComponent);
            let ast = HTML.parse(component.content);

            let feedElem = ast.find(e => {
                return Object.keys(e.attrs).some(k => {
                    return k == options.feeds.attribute
                })
            });

            feedElem.attrs[options.feeds.attribute] = page.href;
            page.content = HTML.stringify(ast);
            

        } else {

            page.content = `
            <h1>[[ name ]]</h1>
            <ul ${options.feeds.attribute}="${page.href}">
                <template>
                    {{ feed_item }}
                </template>
            </ul>`;
        }

        pages.push(page);

    }

    applyTemplates({ target: categoryDir });

}