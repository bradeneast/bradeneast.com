import options from '../options.ts';
import {
    writeFileStrSync,
    writeFileStr,
    ensureFileSync,
    existsSync,
    emptyDirSync,
} from 'https://deno.land/std/fs/mod.ts';
import getFsTree from './fs_tree.ts';
import { dynamicSort, deepCopy, tryFunc, matchBetween, sanitizeForPlainText } from './utils.ts';
import includePartials from './partials.ts';
import processFeeds from './feeds.ts';
import includeVariables from './variables.ts';
import applyTemplates from './templates.ts';
import makeCategoryPages from './categories.ts';
import makeSitemaps from './sitemap.ts';
import rss from './rss.ts';

console.time('done');

// Clear dist folder
Deno.readDirSync(options.paths.dist).map(file => {

    let path = [options.paths.dist, file.name].join('/');

    if (file.name?.charAt(0) == options.ignore) return;
    if (file.isDirectory()) emptyDirSync(path);
    if (existsSync(path)) tryFunc(5, () => Deno.removeSync(path));

})


export let pages = getFsTree(options.paths.src);
export let partials = getFsTree(options.paths.partials);
export let templates = getFsTree(options.paths.templates);
export let xmlStart = '<?xml version="1.0" encoding="UTF-8"?>';


async function build() {


    // Sort scopes by depth
    let scopes = deepCopy(options.scopes);
    scopes.map(s => s.depth = s.target.length < 2 ? 1 : s.target.split('/').length);
    scopes.sort(dynamicSort('-depth'));

    // Make categories for scope and apply templates to applicable pages
    for (let scope of scopes) {
        if (scope?.rss) rss(scope);
        if (scope?.categories?.categorize) makeCategoryPages(scope);
        applyTemplates(scope);
    }


    // Perform final transforms
    for (let page of pages) {

        // Include partials
        includePartials(page);

        // Process feeds
        let reFeed = new RegExp(` ${options.feeds.attribute}=`, 'gi');
        if (reFeed.test(page.content)) processFeeds(page);

        // Find and sanitize page description
        page.description = sanitizeForPlainText(
            matchBetween(page.content, '<p>', '</p>') || ''
        );

        // Include variables
        page.description = includeVariables(page, page.description);
        page.content = includeVariables(page);

        // Create and write to file
        let destination = [options.paths.dist, page.href, 'index.html'].join('/');

        ensureFileSync(destination);
        writeFileStr(
            destination,
            '<!doctype html>\n' + page.content
        );

    }


    // Make sitemaps
    makeSitemaps();

}


build().then(() => console.timeEnd('done'));