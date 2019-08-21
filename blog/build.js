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
const feed = blogDir + 'feed';

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
/////////////////////////////////////////////////////////////////


// CLEARS POSTS FROM BLOG DIRECTORY
fs.readdirSync(blogDir).map(dir => {
    if (fs.lstatSync(blogDir + dir).isDirectory() && path.basename(blogDir + dir).charAt(0) !== '_') {
        fs.removeSync(blogDir + dir);
    }
})

// Creates RSS feed location and starts RSS text string
fs.mkdirSync(feed);
fs.createFileSync(feed + '/index.xml');
const today = new Date();
let RSSFeed = `
    <rss>
    <channel>
    <title>Braden East's Blog</title>
    <link>https://www.bradeneast.com/blog</link>
    <description>This blog is for developers and designers ready to execute their ideas.</description>
    <lastBuildDate>${today.toDateString().slice(0, 3) + ',' + today.toDateString().slice(3)}</lastBuildDate>
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


// PUSHES ALL TAGS TO TAGS ARRAY AND GENERATES A POST LINK FROM POST TITLE
posts.map(post => {
    post.tags.split(', ').map(tag => {
        tags.push(tag)
    });
    post.link = encodeURI(post.title).replace(/%20|#/g, '-').replace(/\(|\)/g, '').replace(/--/g, '-').toLowerCase();
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
            if (key == 'body') {
                let title = post.link.replace(/--/g, ': ').replace(/-/g, '%20');
                title = title.charAt(0).toUpperCase() + title.slice(1);
                const url = 'https://bradeneast.com/blog/' + post.link;
                e.append(`<span class="post-cta"><p>Thanks for reading! If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${title}%20by%20@bradenthehair%20-%20&url=${url}">share this article</a> with your followers. I appreciate it!</p></span>`);
                console.log('cta appended to post body');
            }
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

    // Writes the final markup to the post page
    fs.writeFileSync(postLocation, $.html());
    console.log('> post written to file ' + postLocation.replace('./', '/blog/'));

    // Adds post to RSS feed
    let RSSDate = new Date(post.date);
    RSSFeed += `
            <item>
                <title>${post.title}</title>
                <link>https://bradeneast.com/blog/${post.link}</link>
                <guid>${index}</guid>
                <pubDate>${RSSDate.toDateString().slice(0, 3) + ',' + RSSDate.toDateString().slice(3)}</pubDate>
            </item>
    `;
})
RSSFeed += `</channel></rss>`;
fs.writeFileSync(feed + '/index.xml', RSSFeed);

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