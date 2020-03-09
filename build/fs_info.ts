import { readFileStrSync } from 'https://deno.land/std/fs/mod.ts';
import slash from "https://deno.land/x/slash/mod.ts";
import options from '../options.ts';
import { linkify, walkAst, deepCopy, matchBetween } from './utils.ts';
import HTML from './deno_modules/html_parse_stringify/mod.ts';
import marked from './deno_modules/marked/marked.ts';


export default function getFsInfo({ filename, info }) {

    filename = slash(filename);

    let page = {
        name: '',
        ext: 'html',
        content: readFileStrSync(filename).trim(),
        excerpt: '',
        description: '',
        href: '/',
        parentDir: '/',
        media: options.default.media,
        categories: [],
        categoriesStr: '',
        scopes: [],
        depth: 0,
        modified: 0,
        created: 0,
        date: {
            created: '',
            modified: '',
        },
        info: info,
        next: {},
        prev: {},
    }


    // Basic info
    {
        let [name, ...extension] = info.name.split('.');
        page.name = name;
        page.ext = extension.join('.').toLowerCase();
    }


    if (page.ext == 'md') {

        // Convert Markdown to HTML
        page.content = marked.parse(page.content);

        // Get categories and other meta
        let matchMeta = /<meta.+?name=["'].+?>/gi;
        if (matchMeta.test(page.content)) {

            let ast = HTML.parse(page.content);

            for (let elem of walkAst(ast)) {

                if (elem.name == 'p' && elem?.attrs?.class == 'codepen') {
                    elem.attrs['data-theme-id'] = options.default?.codePenTheme || 'dark';
                }

                if (elem.name == 'meta') {

                    let nameValue = elem.attrs?.name;
                    let contentValue = elem.attrs?.content;

                    // Get meta info
                    if (!contentValue || !nameValue) continue;

                    if (nameValue == 'categories') {
                        page.categories = contentValue.split(options.default?.categories?.split || ', ');
                        page.categoriesStr = page.categories.join(',');
                    } else {
                        page[nameValue] = contentValue;
                    }

                }

            }

            page.content = HTML.stringify(ast).replace(matchMeta, '').trim();

        }

        page.ext = 'html';
    }


    // Excerpt
    if (!page.excerpt) {

        let length = options?.feeds?.excerpts?.length;

        if (typeof length == 'number') {
            page.excerpt = page.content.substr(0, length);
        } else {
            page.excerpt = matchBetween(page.content, '<p>', '</p>') || '';
        }

    }


    // Get href and parentDir from filename
    if (page.name != options.homepage) {

        let pathArray = filename.split('/');
        let path = deepCopy(page.name);

        if (pathArray.length > 2) {
            page.parentDir = pathArray.slice(1, -1).join('/');
            path = [page.parentDir, page.name].join('/');
        }

        page.href = '/' + linkify(path);
        page.depth = pathArray?.length || 0;
    }


    // Get applicable templates
    {
        let unique = [...new Set(options.scopes)];
        let applicableScopes = unique.filter(scope => {
            if (scope.target.length < 2) return true;
            return scope.target.substring(1) == page.parentDir.split('/')[0];
        }) || [];

        page.scopes = applicableScopes;
    }


    // Get formatted and unix dates
    {
        let format = options?.default?.dateFormat || 'toDateString';

        ['created', 'modified'].map(prop => {

            let date = page[prop] ? new Date(page[prop]) : new Date(info[prop] * 1000);

            page.date[prop] = date[format].apply(date);
            page[prop] = date.getTime();

        })
    }

    return page;
}