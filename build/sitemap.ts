import options from '../options.ts';
import { ensureFileSync, writeFileStr } from 'https://deno.land/std/fs/mod.ts';
import { pages, xmlStart } from './build.ts';
import { tag, escapeEntities } from './utils.ts';


export default function makeSitemaps() {


    // JSON Sitemap (for local searching)
    let jsonSitemap = [options.paths.dist, 'sitemap.json'].join('/');
    let ignore = ['content', 'info', 'description', 'scopes', 'ext'];

    function jsonCleanup(key, value) {
        if (key == 'next' || key == 'prev') return value.name;
        if (new RegExp(ignore.join('|')).test(key)) return undefined;
        return value;
    }

    ensureFileSync(jsonSitemap);
    writeFileStr(jsonSitemap, JSON.stringify(pages, jsonCleanup));


    // XML Sitemap (for crawlers/SEO)
    let xmlSitemap = [options.paths.dist, 'sitemap.xml'].join('/');
    let exclude = ['404', 'categories'];
    let urls = [];

    pages.map(page => {

        if (new RegExp(exclude.join('|')).test(page.href)) return;

        let mod = new Date(page.date.modified);
        let formattedDate = `${mod.getFullYear()}-${mod.getMonth()}-${mod.getDate()}`;
        let priority = 0.5;

        if (page.href.includes('design')) priority = 0.2;
        if (!page.depth) priority = 0.8;

        urls.push(
            `\t<url>
            ${tag({ name: 'loc', content: escapeEntities(options.paths.root + page.href) })}
            ${tag({ name: 'lastmod', content: formattedDate })}
            ${tag({ name: 'changefreq', content: 'weekly' })}
            ${tag({ name: 'priority', content: priority.toString() })}
        </url>`
        )
    });

    let xml = `${xmlStart}
${tag({
        name: 'urlset',
        attributes: [{ name: 'xmlns', value: 'http://www.sitemaps.org/schemas/sitemap/0.9' }],
        content: '\n' + urls.join('\n') + '\n',
    })}`;

    ensureFileSync(xmlSitemap);
    writeFileStr(xmlSitemap, xml);

}