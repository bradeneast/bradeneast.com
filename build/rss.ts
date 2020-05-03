import options from '../options.ts';
import { ensureFileSync, writeFileStr } from 'https://deno.land/std/fs/mod.ts';
import { pages, xmlStart } from './build.ts';
import { tag, tab } from './utils.ts';
import { Html5Entities } from "https://deno.land/x/html_entities@v1.0/mod.js";


export default (scope) => {

    let scopedPages = pages.filter(p => p.scopes.some(s => s.target == scope.target));
    let link = options.paths.root + (scope.rss?.path || scope.target) + '/feed.xml';
    let rssPath = options.paths.dist + (scope.rss?.path || scope.target) + '/feed.xml';
    let items = [];

    scopedPages.map(page => {

        let removeEntities = (str) => str.replace(/\&.{1,5};/g, '');
        let desc = removeEntities(page.excerpt.replace(/<[^>]+>/g, ''));

        items.push(`${tab(5)}<item>
                        <title>${removeEntities(page.name)}</title>
                        <link>${options.paths.root + page.href}</link>
                        <guid>${options.paths.root + page.href}</guid>
                        <pubDate>${new Date(page.created).toUTCString()}</pubDate>
                        ${page.categories.names.map(c => `<category>${c}</category>`).join('\n' + tab(6))}
                        <description>${desc}</description>
                    </item>`
        );

    });

    let rss = `${xmlStart}
    ${tag({
        name: 'rss',
        attributes: [
            { name: 'version', value: '2.0' },
            { name: 'xmlns:atom', value: 'http://www.w3.org/2005/Atom' },
            { name: 'xmlns:media', value: 'http://search.yahoo.com/mrss/' }
        ],
        content: `
            <channel>
                ${tag({
            name: 'title',
            content: scope.rss?.name || scope.target
        })}
                ${tag({
            name: 'link',
            content: link
        })}
                ${tag({
            name: 'description',
            content: scope.rss?.description || ''
        })}
                ${tag({
            name: 'lastBuildDate',
            content: new Date().toUTCString()
        })}
                ${tag({
            name: 'atom:link',
            attributes: [
                { name: 'href', value: link },
                { name: 'rel', value: 'self' },
                { name: 'type', value: 'application/rss+xml' },
            ]
        })}
                <items>
${items.join('\n')}
                </items>
    </channel>
`
    })}`;

    ensureFileSync(rssPath);
    writeFileStr(
        rssPath,
        rss
    );

}