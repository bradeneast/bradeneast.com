const site = require('./site');

let feed = `${site.public + site.blog}feed.xml`;
let link = site.root + site.blog + 'feed.xml';
let head = `
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Blog of ${site.name}</title>
<link>${link}</link>
<description>The blog for ${site.audience}. ${site.tagline}</description>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${link}" rel="self" type="application/rss+xml" />
`;


function ify(post) {

    let date = new Date(post.date);
    let tags = post.tags.split(', ');
    let categories = tags.map(tag => `<category>${tag}</category>`);

    return (
        `<item>
        <title>${post.title}</title>
        <link>${site.root + post.link}</link>
        <guid>${site.root + post.link}</guid>
        <pubDate>${date.toUTCString()}</pubDate>
        ${String(categories).replace(/,/g, '')}
        <description>${post.body.substr(0, post.body.indexOf('</p>') + 4).replace(/<[^>]*>/g, '')}</description>
        </item>`
    );
}

const rss = {
    feed: feed,
    head: head,
    ify: ify
}

module.exports = rss;