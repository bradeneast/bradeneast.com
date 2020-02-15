import options from '../options.ts';
import {
    writeFileStrSync,
    ensureFileSync,
    existsSync,
    emptyDirSync,
} from 'https://deno.land/std/fs/mod.ts';
import getFsTree from './fs_tree.ts';
import { dynamicSort, deepCopy, tryFunc } from './utils.ts';
import includeComponents from './components.ts';
import processFeeds from './feeds.ts';
import includeVariables from './variables.ts';
import applyTemplates from './templates.ts';
import makeCategoryPages from './categories.ts';


console.time('done');


// Clear dist folder
Deno.readDirSync(options.paths.dist).map(file => {

    let path = [options.paths.dist, file.name].join('/');

    if (file.name.charAt(0) == options.ignore) return;
    if (file.isDirectory()) emptyDirSync(path);

    if (existsSync(path)) tryFunc(5, () => Deno.removeSync(path));

})


export let pages = getFsTree(options.paths.src);
export let components = getFsTree(options.paths.components);


async function build() {

    // Sort scopes by depth
    let scopes = deepCopy(options.scopes);

    for (let i = 0; i < scopes.length; i++) {
        let scope = scopes[i];
        scope.depth = scope.target.length < 2 ? 1 : scope.target.split('/').length;
    }

    scopes.sort(dynamicSort('-depth'));

    // Make categories for scope and apply templates to applicable pages
    for (let i = 0; i < scopes.length; i++) {
        let scope = scopes[i];
        if (scope?.categories?.categorize) makeCategoryPages(scope);
        applyTemplates(scope);
    }


    // Perform final transforms
    for (let i = 0; i < pages.length; i++) {

        let page = pages[i];
        let reFeed = new RegExp(` ${options.feeds.attribute}="`);
        let destination = [options.paths.dist, page.href, 'index.html'].join('/');

        // Include components
        includeComponents(page);

        // Process feeds
        if (reFeed.test(page.content)) processFeeds(page);

        // Include variables
        page.content = includeVariables(page);

        // Create and write to file
        ensureFileSync(destination);
        writeFileStrSync(destination, page.content);

    }

}


build().then(() => console.timeEnd('done'));