import { pages, components } from "./build.ts";
import options from "../options.ts";
import { ensureFileSync, walkSync } from 'https://deno.land/std/fs/mod.ts';
import applyTemplates from "./templates.ts";
import HTML from './deno_modules/html_parse_stringify/mod.ts';
import getFsInfo from "./fs_info.ts";


export default function makeCategoryPages(scope) {

    let categories = [];
    let categoryDir = [options.paths.dist, scope.target, 'categories'].join('/');
    let categoryPages = [];

    for (let i = 0; i < pages.length; i++) {

        let page = pages[i];
        let scopeMatch = page.scopes.find(s => s.target == scope.target);
        if (!scopeMatch) continue;

        let newCategories = page.categories.filter(c => !categories.includes(c));
        if (newCategories) categories = categories.concat(newCategories);

    }

    for (let i = 0; i < categories.length; i++) {

        let category = categories[i];
        let destination = [categoryDir, category].join('/') + '.html';

        ensureFileSync(destination);

    }

    for (let { filename, info } of walkSync(categoryDir, { includeDirs: false })) {

        categoryPages.push(getFsInfo({ filename, info }));
        Deno.remove(filename);

    }

    for (let i = 0; i < categoryPages.length; i++) {

        let page = categoryPages[i];
        let mainTemplate = options.scopes.find(t => t.target.length < 2);
        let useComponent = scope?.categories?.useComponent;

        // let location = options.paths.dist + page.href + '.html';;
        // if (existsSync(location)) Deno.remove(location);
        
        if (mainTemplate) page.scopes = [mainTemplate];

        if (useComponent) {

            let component = components.find(c => c.name == useComponent);
            let ast = HTML.parse(component.content);
            let feedElem: any;

            for (let i = 0; i < ast.length; i++) {

                let elem = ast[i];
                if (elem.type == 'text') continue;

                let keys = Object.keys(elem.attrs);
                let hasFeedAttr = keys.some(key => key == options.feeds.attribute);

                if (hasFeedAttr) {
                    feedElem = elem;
                    break;
                }

            }

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