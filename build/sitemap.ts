import options from '../options.ts';
import { ensureFileSync, writeFileStr } from 'https://deno.land/std/fs/mod.ts';
import { pages, xmlStart } from './build.ts';
import { tag, escapeEntities, leadingZero, pageMatchesBlob } from './utils.ts';


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
    if (!options.sitemap) return;

    let xmlSitemap = [options.paths.dist, 'sitemap.xml'].join('/');
    let urls = [];

    pages.map(page => {

        let exclude = false;
        options.sitemap?.exclude?.map(blob => {
            if (pageMatchesBlob(page, blob)) {
                exclude = true;
            }
        });

        if (exclude) return;

        let prioritize = false;
        options.sitemap?.prioritize?.map(blob => {
            if (pageMatchesBlob(page, blob)) {
                prioritize = true;
            }
        });

        let mod = new Date(page.date.modified);
        let date = [
            mod.getFullYear().toString(),
            leadingZero(mod.getMonth()),
            leadingZero(mod.getDate())
        ];

        let msDiff = new Date().getTime() - mod.getTime();
        let diff = Math.round(msDiff / 1000 / 60 / 60 / 24);

        urls.push(
            `\t<url>
            ${tag({ name: 'loc', content: escapeEntities(options.paths.root + page.href) })}
            ${tag({ name: 'lastmod', content: date.join('-') })}
            ${tag({ name: 'changefreq', content: diff < 7 ? 'daily' : diff < 30 ? 'weekly' : 'monthly' })}
            ${tag({ name: 'priority', content: prioritize ? '1' : '0.5' })}
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