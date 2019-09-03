////>>>>RUN ME IN NODE TO BUILD OUT STATIC POSTS

console.time('>> BUILD COMPLETE');
// DECLARATIONS
///////////////////////////////////////////////////

// NODE THINGS
const path = require('path');
const fs = require('fs-extra');

// PATHS
const blogDir = './';
const postDir = './_published/';
const templateName = '_posttemplate.html';
const postTemplate = blogDir + templateName;

// DEPENDENCIES
const commonmark = require('commonmark');
const htmlparser = require('htmlparser2');
const cheerio = require('cheerio');
const prism = require('prismjs');

// HELPERS
// Sorts array of objects by the value of the property you pass
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

// Adds a post excerpt to the specified wrapper
function addToPostFeed(post, wrapper, $) {

    // Clones partial post template
    let newPost = $('template').contents().clone();

    // Inserts json values based on classnames matching the key
    Object.keys(post).map(key => {
        const e = newPost.find(`.${key}`);
        let value = post[key];
        if (Array.isArray(value)) {
            value = value.join(', ');
        }
        if (e && key == 'body') {
            value = value.substr(0, value.indexOf('</p>') + 4);
            e.append(value);
        } else if (e && key == 'link') {
            e.attr('href', '/blog/' + value);
        } else if (e) {
            e.append(value);
        }
    });
    wrapper.append(newPost);
}


// STUFF HAPPENS BELOW THIS LINE
//////////////////////////////////////////////////////////////////////////////////////////////////////////


// CLEARS POSTS FROM BLOG DIRECTORY
fs.readdirSync(blogDir).map(dir => {
    if (fs.lstatSync(blogDir + dir).isDirectory() && path.basename(blogDir + dir).charAt(0) !== '_') {
        fs.removeSync(blogDir + dir);
    }
})

// Creates RSS feed location and starts RSS text string
const feedName = 'feed.xml';
const feed = blogDir + feedName;
const selfLink = `https://www.bradeneast.com/blog/${feedName}`
fs.createFileSync(feed);
const today = new Date();
let RSSFeed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Blog of Braden East</title>
<link>${selfLink}</link>
<description>The blog for design-oriented devs. Get regular tips to improve your UI and UX design skills.</description>
<lastBuildDate>${today.toUTCString()}</lastBuildDate>
<atom:link href="${selfLink}" rel="self" type="application/rss+xml" />
`;


// CREATES JSON ARRAY OF BLOG POSTS WITH APPROPRIATE KEY/VALUE PAIRS
let posts = [];
let tags = [];

fs.readdirSync(postDir).map(post => {
    let postJSON = {
        "title": "",
        "date": "",
        "tags": [],
        "body": "",
    }
    const reader = new commonmark.Parser({
        smart: true
    });
    const writer = new commonmark.HtmlRenderer({
        softbreak: '<br />'
    });
    const parsed = reader.parse(fs.readFileSync(postDir + post, 'utf8'));
    let output = writer.render(parsed);
    const dom = htmlparser.parseDOM(output, {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);

    postJSON.title = $('h1').contents().text();
    postJSON.date = $('h2').contents().text();
    postJSON.tags = $('h3').contents().text();

    // Highlights code snippets with PrismJS
    const codeSnippets = $('code');
    codeSnippets.each(function (i, e) {
        const snippetText = $(this).text();
        if (e.attribs.class == 'language-html') {
            $(this).empty().append(prism.highlight(snippetText, prism.languages.markup));
        }
        if (e.attribs.class == 'language-javascript') {
            $(this).empty().append(prism.highlight(snippetText, prism.languages.javascript));
        }
        if (e.attribs.class == 'language-css') {
            $(this).empty().append(prism.highlight(snippetText, prism.languages.css));
        }
    })

    postJSON.body = String($.html()).replace(/<h1>.*?<\/h3>/gs, '');
    posts.push(postJSON);
})


// PUSHES ALL TAGS TO TAGS ARRAY
posts.map(post => {
    post.tags.split(', ').map(tag => {
        tags.push(tag)
    });
    // GENERATES A POST LINK FROM POST TITLE
    post.link = encodeURI(post.title).replace(/%20|#/g, '-').replace(/\(|\)/g, '').replace(/--/g, '-').toLowerCase();
    // APPENDS CTA TO POST BODY
    let title = post.link.replace(/--/g, ': ').replace(/-/g, '%20');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    const url = 'https://bradeneast.com/blog/' + post.link;
    post.body += (`<span class="post-cta"><p>Thanks for reading! If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${title}%20by%20@bradenthehair%20-%20&url=${url}">share this article</a> with your followers. I appreciate it!</p></span>`);
})


// REMOVES DUPLICATE TAGS
tags = [...new Set(tags)];


// SORTS ARRAY OF BLOG POSTS BY DATE
posts = posts.sort(dynamicSort('date')).reverse();


// GENERATES NEW POST FROM TEMPLATE
posts.map((post, index) => {

    // Copies post from template
    let postLocation = blogDir + post.link;
    fs.mkdirSync(postLocation);
    postLocation += '/index.html';
    fs.copyFileSync(postTemplate, postLocation);
    console.log('new post created from template');

    // Parses post page html
    const dom = htmlparser.parseDOM(fs.readFileSync(postLocation), {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);

    // Inserts json values based on classnames matching the key
    Object.keys(post).map(key => {
        const e = $(`.${key}`);
        let value = post[key];
        if (key == 'tags') {
            const tags = [];
            value.split(', ').map(tag => {
                tags.push(`<a href="/blog/tags/${encodeURI(tag).replace(/\%20+/g, '-')}">${tag}</a>`);
            })
            value = tags.join(', ');
        }
        if (value && e) {
            e.append(value);
        }
    })

    // Adds next and previous links
    const prevPost = posts[index - 1];
    const prevElem = $('#previous-post');
    const nextPost = posts[index + 1];
    const nextElem = $('#next-post');
    if (prevPost) {
        prevElem.find('.link-title').append(prevPost.title);
        prevElem.attr('href', `/blog/${prevPost.link}`);
    } else {
        prevElem.attr('style', 'display: none');
    }
    if (nextPost) {
        nextElem.find('.link-title').append(nextPost.title);
        nextElem.attr('href', `/blog/${nextPost.link}`);
    } else {
        nextElem.attr('style', 'display: none');
    }

    // Adds open graph social sharing and seo tags
    const siteTitle = 'Blog of Braden East';
    let description = 'The blog for design-oriented devs. Get regular tips to improve your UI and UX design skills.';
    const root = 'https://bradeneast.com';
    const url = root + '/blog/' + post.link;
    const pageName = post.title;
    let socialImage = `${root}/images/blog/laptop-book.jpg`;
    let images = $('img');
    if (images) {
        String(images.first().attr('src')).split('.').pop() != 'svg' ? socialImage = root + images.first().attr('src') : null;
    }
    let pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + pageName;
    let SEOFramework = `
    <!-- Start SEO Framework -->
    <title>${pageTitle}</title>
    <meta name="description" content="${description}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:width" content="1080" />
    <meta property="og:image:height" content="1080" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:site_name" content="Braden East" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@bradenthehair" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${socialImage}" />
    <link rel="canonical" href="${url}" />
    <!-- End SEO Framework -->`;
    $('head').append(SEOFramework);

    // Writes the final markup to the post page
    fs.writeFileSync(postLocation, $.html());
    console.log('> post written to file ' + postLocation.replace('./', '/blog/'));

    // Adds post to RSS string
    let RSSDate = new Date(post.date);
    let RSSCategories = '';
    post.tags.split(', ').map(tag => {
        RSSCategories += `<category>${tag}</category>`
    });
    let RSSImage = post.body.match(/src="(.*?[^"])(?=("|'))/i);
    if (!post.body.includes('src=')) {
        RSSImage = ''
    } else {
        RSSImage = `<media:content url="https://www.bradeneast.com${RSSImage[1]}" type="image/jpg" width="250" />`
    }
    RSSFeed += `
    <item>
    <title>${post.title}</title>
    <link>https://bradeneast.com/blog/${post.link}</link>
    <guid>https://bradeneast.com/blog/${post.link}</guid>
    <pubDate>${RSSDate.toUTCString()}</pubDate>
    ${RSSCategories}
    <description>${post.body.substr(0, post.body.indexOf('</p>') + 4).replace(/<[^>]*>/g, '')}</description>
    ${RSSImage}
    </item>`;
})

// Writes RSS string of blog posts to feed.xml
RSSFeed += `</channel></rss>`;
fs.writeFileSync(feed, RSSFeed);

// ADDS POSTS TO HOMEPAGE
const blogFeedPages = ['../blog/index.html'];
blogFeedPages.map(page => {

    // Parses page containing blog feed
    const dom = htmlparser.parseDOM(fs.readFileSync(page), {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);
    const wrapper = $('#blogFeed');
    wrapper.children().not('template').remove();

    posts.map(post => {
        addToPostFeed(post, wrapper, $);
    })

    fs.writeFileSync(page, String($.html()).replace(/\n\s*\n/g, '\n'));
})


// CREATES AN INDEX PAGE FOR EACH UNIQUE TAG
fs.mkdirSync(blogDir + 'tags');

tags.map(tag => {

    // Copies tag page from template
    let tagName = encodeURI(tag).replace(/\%20+/g, '-');
    let location = `${blogDir}tags/${tagName}`;
    fs.mkdirSync(location);
    location += '/index.html';
    fs.copyFileSync(`${blogDir}_tagtemplate.html`, location);
    console.log(`tag directory created for ${tag}`);

    // Parses post page html
    const dom = htmlparser.parseDOM(fs.readFileSync(location), {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);
    $('.tagName').each(function (i, e) {
        $(this).append(tag);
    });
    const wrapper = $('#blogFeed');

    posts.map(post => {
        if (post.tags.includes(tag)) {
            addToPostFeed(post, wrapper, $);
        }
    })

    fs.writeFileSync(location, $.html());
})

console.timeEnd('>> BUILD COMPLETE');