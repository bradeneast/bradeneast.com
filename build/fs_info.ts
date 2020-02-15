import { readFileStrSync } from 'https://deno.land/std/fs/mod.ts';
import slash from "https://deno.land/x/slash/mod.ts";
import options from '../options.ts';
import { linkify, walkAst, deepCopy } from './utils.ts';
import HTML from './deno_modules/html_parse_stringify/mod.ts';
import marked from './deno_modules/marked/marked.ts';


export default function getFsInfo({ filename, info }) {

    filename = slash(filename);

    let page = {
        name: '',
        ext: 'html',
        content: readFileStrSync(filename).trim(),
        excerpt: '',
        href: '/',
        parentDir: '/',
        media: options.default.media,
        categories: [],
        scopes: [],
        depth: 0,
        modified: '',
        created: '',
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


    // Convert Markdown to HTML
    if (page.ext == 'md') {
        page.content = marked.parse(page.content);
        page.ext = 'html';
    }


    // Get categories and featured media
    let matchMeta = /<meta.+?name=["'](media|categories).+?>/gi;

    if (matchMeta.test(page.content)) {

        let ast = HTML.parse(page.content);

        for (let elem of walkAst(ast)) {

            if (elem.name != 'meta') continue;

            let name = elem.attrs?.name;
            let content = elem.attrs?.content;

            if (!content) continue;
            if (name == 'media') page.media = content;
            if (name == 'categories') page.categories = content.split(', ');

        }

        page.content = HTML.stringify(ast).replace(matchMeta, '').trim();

    }


    // Excerpts
    {
        let length = options?.feeds?.excerpts?.length;
        let cap = page.content.indexOf('</p>');
        if (typeof length == 'number') cap = length
        page.excerpt = page.content.substr(0, cap);
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
        let modified = new Date(info.modified * 1000);
        let created = new Date(info.created * 1000);
        let format = options?.default?.dateFormat || 'toDateString';

        if (format) {
            page.modified = modified[format].apply(modified);
            page.created = created[format].apply(created);
        }
    }

    return page;
}