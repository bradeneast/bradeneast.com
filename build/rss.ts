import options from '../options.ts';
import { ensureFileSync, writeFileStr } from 'https://deno.land/std/fs/mod.ts';
import { pages } from './build.ts';


export default (scope) => {

    let scopedPages = pages.filter(p => p.scopes.some(s => s.target == scope.target));
    let link = options.paths.root + (scope.rss?.path || scope.target) + '/feed.xml';

    let feed = {
        path: options.paths.dist + (scope.rss?.path || scope.target) + '/feed.xml',
        head: `<?xml version="1.0" encoding="utf-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
        <channel>
        <title>${scope.rss?.name || scope.target}</title>
        <link>${link}</link>
        <description>${scope.rss?.description || ''}</description>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${link}" rel="self" type="application/rss+xml" />`,
        items: scopedPages.map(page => `
        <item>
            <title>${page.name}</title>
            <link>${options.paths.root + page.href}</link>
            <guid>${options.paths.root + page.href}</guid>
            <pubDate>${new Date(page.created).toUTCString()}</pubDate>
            ${page.categories.names.map(c => `<category>${c}</category>`).join('\n')}
            <description>${page.excerpt.replace(/<[^>]+>/g, '').replace(/\&.{1,5};/g, '')}</description>
        </item>`
        ),
        footer: '</channel></rss>',
    }

    ensureFileSync(feed.path);
    writeFileStr(feed.path, feed.head + feed.items.join('') + feed.footer);

}