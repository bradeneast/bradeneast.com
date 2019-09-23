console.log('\n');
console.time('\n>> build took');

// DEPENDENCIES
const fs = require('fs-extra');
const htmlParser = require('htmlParser2');
const cheerio = require('cheerio');
const commonmark = require('commonmark');
const prism = require('prismjs');

// GLOBAL VARIABLES
const public = './public/';
const ignoreBeginsWith = '_';
const pagesFolder = './pages/';
const postsFolder = './posts/';
const blog = public + 'blog/';
const publishedPosts = './posts/_published/';
const pageTemplate = './_template.html';
const postTemplate = postsFolder + '_template.html';
const acceptableMetaProperties = ['title', 'description', 'image'];

// GLOBAL FUNCTIONS
function getMetaProperty(metaData, property) {
    return metaData.split(property + ':').pop().split(',')[0].replace(' ', '');
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

fs.cleandirSync = function (directory) {
    fs.readdirSync(directory).map(file => file.charAt(0) != ignoreBeginsWith ? fs.removeSync(directory + file) : null);
}

function publishPagesFrom(directory) {

    fs.readdirSync(directory, { encoding: 'utf8' }).map(child => {

        if (child.charAt(0) != ignoreBeginsWith) {

            if (!fs.lstatSync(directory + child).isDirectory()) {

                const location = directory + child;
                const destination = directory.replace('pages', 'public') + child;
                const template = cheerio.load(htmlParser.parseDOM(fs.readFileSync(pageTemplate)));
                const content = htmlParser.parseDOM(fs.readFileSync(location), { decodeEntities: true });

                // Prepend main content to body element
                template('body').prepend(content);

                // Append meta tags to head element
                if (content[0]) {
                    const meta = content[0].data;
                    acceptableMetaProperties.map(prop => {
                        prop = prop.toLowerCase();
                        const content = getMetaProperty(meta, prop).replace('/_images/', 'https://bradeneast.com/_images/');
                        prop == 'title' ? template(prop).text('Braden East | ' + content) : null;
                        template('head').append(`\n<meta property="og:${prop}" content="${content}">`);
                    })
                }

                // Write to destination file and remove comments
                fs.createFileSync(destination);
                fs.writeFileSync(destination, template.html().replace(/(<!--)[\s\S]*?(-->)/g, ''));
                console.log('page written to ' + destination);

            } else {

                // Create parallel directory in public folder
                fs.mkdirSync(directory.replace('pages', 'public') + child);
                publishPagesFrom(directory + child + '/');
            }
        }
    })
}


function buildBlog() {

    const RSSFeed = 'feed.xml';
    let RSSFeedContent;
    let posts = [];
    let tags = [];

    function createRSSFeed(location) {
        const selfLink = `https://www.bradeneast.com/blog/${RSSFeed}`;
        const today = new Date();
        RSSFeedContent = `<?xml version="1.0" encoding="utf-8"?>
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
        <channel>
        <title>Blog of Braden East</title>
        <link>${selfLink}</link>
        <description>The blog for design-oriented devs. Get regular tips to improve your UI and UX design skills.</description>
        <lastBuildDate>${today.toUTCString()}</lastBuildDate>
        <atom:link href="${selfLink}" rel="self" type="application/rss+xml" />
        `;
        fs.createFileSync(location + RSSFeed);
    }

    function addPostToRSS(post) {
        let date = new Date(post.date);
        let categories;

        post.tags.split(', ').map(tag => categories += `<category>${tag}</category>`);
        RSSFeedContent += `
        <item>
        <title>${post.title}</title>
        <link>https://bradeneast.com/blog/${post.link}</link>
        <guid>https://bradeneast.com/blog/${post.link}</guid>
        <pubDate>${date.toUTCString()}</pubDate>
        ${categories}
        <description>${post.body.substr(0, post.body.indexOf('</p>') + 4).replace(/<[^>]*>/g, '')}</description>
        </item>`;
    }

    function createPostFeed(page, category) {
        const dom = htmlParser.parseDOM(fs.readFileSync(page), { decodeEntities: true });
        const $ = cheerio.load(dom);
        const wrapper = $('#blogFeed');

        wrapper.children().not('template').remove();
        posts.map(post => { !category || post.tags.join().includes(category) ? addPostToFeed(post, wrapper, $) : null });
        fs.writeFileSync(page, String($.html()).replace(/\n\s*\n/g, '\n'));
    }

    function addPostToFeed(post, wrapper, $) {
        const newPost = $('template').contents().clone();

        Object.keys(post).map(key => {
            let e = newPost.find(`.${key}`);
            let v = post[key];
            key = key.toLowerCase();
            Array.isArray(v) ? v = v.join(', ') : null;
            if (e) {
                if (key == 'body') { e.append(v.substr(0, v.indexOf('</p>') + 4)) }
                else if (key == 'link') { e.attr('href', '/blog/' + v) }
                else { e.append(v) }
            }
        })
        wrapper.append(newPost);
    }

    // Clear old posts and create RSS feed
    fs.cleandirSync(postsFolder);
    createRSSFeed(blog);

    fs.readdirSync(publishedPosts).map(post => {
        let thisPost = {
            title: '',
            date: '',
            tags: [],
            body: ''
        }
        const reader = new commonmark.Parser({ smart: true });
        const writer = new commonmark.HtmlRenderer({ softbreak: '<br />' });
        const parsed = reader.parse(fs.readFileSync(publishedPosts + post, 'utf8'));
        const output = writer.render(parsed);
        const dom = htmlParser.parseDOM(output, { decodeEntities: true });
        const $ = cheerio.load(dom);

        // Highlight code snippets with PrismJS
        $('code').each(function (i, e) {
            const snippet = $(this).text();
            e.attribs.class == 'language-html' ? $(this).empty().append(prism.highlight(snippet, prism.languages.markup)) : null;
            e.attribs.class == 'language-javascript' ? $(this).empty().append(prism.highlight(snippet, prism.languages.javascript)) : null;
            e.attribs.class == 'language-css' ? $(this).empty().append(prism.highlight(snippet, prism.languages.css)) : null;
        })

        thisPost.title = $('h1').contents().text();
        thisPost.date = $('h2').contents().text();
        thisPost.tags = $('h3').contents().text();
        thisPost.body = String($.html()).replace(/<h1>.*?<\/h3>/gs, '');

        posts.push(thisPost);
    })


    // Generate new post from template
    posts.sort(dynamicSort('date')).reverse().map((post, index) => {

        post.tags.split(', ').map(tag => tags.push(tag));
        post.link = encodeURI(post.title).replace(/%20|#/g, '-').replace(/\(|\)/g, '').replace(/--/g, '-').toLowerCase();

        // Append CTA to post body
        const title = post.link.replace(/--/g, ': ').replace(/-/g, '%20');
        const url = 'https://bradeneast.com/blog/' + post.link;
        post.body += (`<span class="post-cta"><p>Thanks for reading! If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${title.charAt(0).toUpperCase() + title.slice(1)}%20by%20@bradenthehair%20-%20&url=${url}">share this article</a> with your followers. I appreciate it!</p></span>`);

        // Copy page template into post destination
        const postLocation = blog + post.link + '/index.html';
        const $ = cheerio.load(htmlParser.parseDOM(fs.readFileSync(pageTemplate), { decodeEntities: true }));

        $('body').prepend(htmlParser.parseDOM(fs.readFileSync(postTemplate)));
        fs.mkdirSync(postLocation.replace('/index.html', ''));
        console.log('post written to ' + postLocation);

        Object.keys(post).map(key => {
            const e = $(`.${key}`);
            let value = post[key];

            if (key == 'tags') {
                const tags = [];
                value.split(', ').map(tag => tags.push(`<a href="/blog/tags/${encodeURI(tag).replace(/\%20+/g, '-')}">${tag}</a>`));
                value = tags.join(', ');
            }

            value && e ? e.append(value) : null;
        })

        // Add next and previous links
        const prevPost = posts[index - 1];
        const prevElem = $('#previous-post');
        const nextPost = posts[index + 1];
        const nextElem = $('#next-post');

        if (prevPost) {
            prevElem.find('.link-title').append(prevPost.title);
            prevElem.attr('href', `/blog/${prevPost.link}`);
        } else { prevElem.attr('style', 'display: none') }

        if (nextPost) {
            nextElem.find('.link-title').append(nextPost.title);
            nextElem.attr('href', `/blog/${nextPost.link}`);
        } else { nextElem.attr('style', 'display: none') }

        // Write the final markup to the post page
        fs.writeFileSync(postLocation, $.html());
        console.log('> post written to file ' + postLocation.replace('./', '/blog/'));

        addPostToRSS(post);
    })

    fs.writeFileSync(blog + RSSFeed, RSSFeedContent + '</channel></rss>');
    createPostFeed(public + 'blog/index.html');
    fs.mkdirSync(public + 'blog/tags');

    [...new Set(tags)].map(tag => {

        const tagName = encodeURI(tag).replace(/\%20+/g, '-');
        const location = `${public}blog/tags/${tagName}/index.html`;

        fs.mkdirSync(location.replace('/index.html', ''));
        fs.copyFileSync(`${postsFolder}_tags.html`, location);
        console.log(`tag directory created for ${tag}`);

        const dom = htmlParser.parseDOM(fs.readFileSync(location), { decodeEntities: true });
        const $ = cheerio.load(dom);
        const wrapper = $('#blogFeed');
        $('.tagName').each(function (i, e) { $(this).append(tag) });

        posts.map(post => post.tags.includes(tag) ? addPostToFeed(post, wrapper, $) : null);
        fs.writeFileSync(location, $.html());
    })
}


fs.cleandirSync(public, ignoreBeginsWith);
publishPagesFrom(pagesFolder);
buildBlog();


console.timeEnd('\n>> build took');
console.log('\n');