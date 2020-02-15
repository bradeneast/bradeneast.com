import { pages } from "./build.ts";
import { dynamicSort } from "./utils.ts";
import options from "../options.ts";
import { readFileStrSync } from 'https://deno.land/std/fs/mod.ts';


export default function applyTemplates(scope: { target: string; sort?: string; }) {

    let targetPages = pages.filter(page => {
        return page.scopes.some(p => p.target == scope.target);
    });

    // Sort scoped items if a sort order is provided
    if (scope?.sort) {

        let reverse = scope.sort[0] == '!';
        let order = reverse ? scope.sort.substring(1) : scope.sort;

        if (order.toLowerCase() != 'lexical') targetPages.sort(dynamicSort(order));
        if (reverse) targetPages.reverse();

    }

    for (let i = 0; i < targetPages.length; i++) {

        let page = targetPages[i];
        let next = targetPages[i + 1];
        let prev = targetPages[i - 1];

        let current = page.scopes.find(s => s.target == scope.target);
        let location = [options.paths.templates, current.templateName].join('/');
        let html = readFileStrSync(location);
        let [before, after] = html.split('{{ CONTENT }}');

        page.next = next?.depth == page.depth ? next : false;
        page.prev = prev?.depth == page.depth ? prev : false;
        page.content = before + page.content + after;

    }
}