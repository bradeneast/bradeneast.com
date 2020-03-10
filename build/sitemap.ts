import options from '../options.ts';
import { ensureFileSync, writeFileStr } from 'https://deno.land/std/fs/mod.ts';
import { pages } from './build.ts';

export default function makeSitemap() {

    let sitemap = [options.paths.dist, 'sitemap.json'].join('/');
    let ignore = ['content', 'info', 'excerpt', 'description', 'scopes', 'ext'];

    function cleanup(key, value) {

        if (key == 'next' || key == 'prev') {
            return value.name;
        }

        if (new RegExp(ignore.join('|')).test(key)) {
            return undefined;
        }

        return value;

    }

    ensureFileSync(sitemap);
    writeFileStr(sitemap, JSON.stringify(pages, cleanup));

}