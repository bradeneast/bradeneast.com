import { pages, templates } from "./build.ts";
import { dynamicSort, deepCopy } from "./utils.ts";


export default function applyTemplates(scope: { target: string; sort?: string; }) {

    let targetPages = pages.filter(page => page?.scopes?.some(p => p.target == scope.target));
    let startPoint = pages.indexOf(targetPages[0]);

    if (!targetPages.length) return;

    // Sort scoped items if a sort order is provided
    if (scope?.sort) {

        let order = scope.sort.toLowerCase();
        targetPages.sort(dynamicSort(order));

    }

    for (let i = 0; i < targetPages.length; i++) {

        let page = targetPages[i];
        let next = targetPages[i + 1];
        let prev = targetPages[i - 1];

        let current = page.scopes.find(s => s.target == scope.target);
        let template = templates.find(t => t.name == current.templateName);
        let [before, after] = template.content.split('{{ CONTENT }}');

        page.next = next?.depth == page.depth ? next : false;
        page.prev = prev?.depth == page.depth ? prev : false;
        page.content = before + page.content + after;

    }

    pages.splice(startPoint, targetPages.length, ...targetPages);
}