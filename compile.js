console.time('\n>> SITE COMPILED IN');


// DEPENDENCIES
const fs = require('fs-extra');
const htmlParser = require('htmlParser2');
const cheerio = require('cheerio');
const commonmark = require('commonmark');
const prism = require('prismjs');


// GLOBAL VARIABLES
const consoleBlue = '\x1b[34m%s\x1b[0m';
const consolePurple = '\x1b[35m%s\x1b[0m';
const consoleGreen = '\x1b[32m%s\x1b[0m';

const ignoreChar = '_';
const public = './public/';
const blog = 'blog/';
const root = 'https://www.bradeneast.com/';
const pageTemplate = './_template.html';
const pagesFolder = './pages/';
const postsFolder = './posts/';
const postSrc = postsFolder + '_published/';
const postTemplate = postsFolder + '_template.html';
const staticComponents = './components/';
const feedAttribute = 'data-feed';
const acceptableMetaProperties = ['title', 'description', 'image'];

let posts = [];
let tags = [];

const blogAudience = 'dev-signers';
const blogTagline = 'Gain confidence designing and coding stellar interfaces.';

const today = new Date();
const RSSFeed = `${public + blog}feed.xml`;
const RSSLink = root + blog + RSSFeed;
let RSSFeedContent = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Blog of Braden East</title>
<link>${RSSLink}</link>
<description>The blog for ${blogAudience}. ${blogTagline}</description>
<lastBuildDate>${today.toUTCString()}</lastBuildDate>
<atom:link href="${RSSLink}" rel="self" type="application/rss+xml" />`;


// CLASSES
class HTMLFile {
    constructor(path) {
        this.path = path
    }

    parse(decodeEntities) {
        this.html = htmlParser.parseDOM(fs.readFileSync(this.path), { decodeEntities: decodeEntities });
        return this
    }

    loadDOM() {
        this.$ = cheerio.load(this.html);
        return this
    }

    populateComponents() {

        const select = this.$;

        select('custom-component').each(function (i, e) {
            const component = select(this);
            const componentName = component.attr('data-name');
            const componentHTML = new HTMLFile(`${staticComponents + componentName}.html`).parse(true).loadDOM();
            component.append(componentHTML.html);
        })

        return this
    }

    populateFeeds() {

        const select = this.$;
        const feeds = select(`[${feedAttribute}]`);

        feeds.each(function (i, e) {
            const feed = select(this);
            const wrapper = feed.children().first();

            populateFeed(posts, wrapper, {
                category: feed.attr(feedAttribute),
                count: feed.attr('data-count')
            });
        })

        return this
    }
}


// GLOBAL FUNCTIONS

function trimWhiteSpace(string) {

    const condensed = string.replace(/\n+/gm, '\n').replace(/\s+/gm, ' ');

    if (condensed.charAt(0) == ' ' || condensed.charAt(0) == '\n') {
        return condensed.substring(1)
    } else return condensed
}


function linkify(string) {
    return encodeURI(string.replace(/[^A-Za-z0-9 ]/g, '').toLowerCase()).replace(/%20/g, '-');
}


function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}


fs.cleandirSync = function (directory) {
    fs.readdirSync(directory).map(file => file.charAt(0) != ignoreChar ? fs.removeSync(directory + file) : null);
}


function getMetaProperty(metaData, property) {

    const split = metaData.split(`${property}:`);
    const metaContent = String(split[1]).substring(0, String(split[1]).indexOf(','));

    return trimWhiteSpace(metaContent.replace(/<[^>]*>/g, ''));
}


function appendMetaTags(metaData, selector) {

    acceptableMetaProperties.map(prop => {

        if (metaData.includes(`${prop}:`)) {

            const content = getMetaProperty(metaData, prop).replace('/_images/', `${root}_images/`);

            if (prop == 'title') selector(prop).text(`Braden East | ${content}`);
            if (prop == 'description') selector('head').append(`\n&#9;<meta name="${prop}" content="${content}">`);

            selector(`#og${prop}`).remove();
            selector('title').after(`\n\t<meta property="og:${prop}" content="${content}">`);
        }
    })
}


function publishPagesFrom(directory) {

    fs.readdirSync(directory, { encoding: 'utf8' }).map(child => {

        if (child.charAt(0) != ignoreChar) {

            if (!fs.lstatSync(directory + child).isDirectory()) {

                const location = directory + child;
                const destination = directory.replace('pages', 'public') + child;
                const templateFile = new HTMLFile(pageTemplate).parse(true).loadDOM();
                const currentFile = new HTMLFile(location).parse(true).loadDOM().populateComponents();

                // Append meta tags to head element
                if (currentFile.html[0].data) appendMetaTags(currentFile.html[0].data, templateFile.$)

                // Prepend main content to main element
                templateFile.$('#main').append(currentFile.html);
                templateFile.populateFeeds();

                // Write to destination file and remove comments
                fs.createFileSync(destination);
                fs.writeFileSync(destination, templateFile.$.html().replace(/(<!--)[\s\S]*?(-->)/g, ''));
                console.log(consolePurple, `PAGE written to ${destination}`);

            } else {

                // Create parallel directory in public folder and recurse
                fs.mkdirSync(directory.replace('pages', 'public') + child);
                publishPagesFrom(directory + child + '/');
            }
        }
    })
}


function addPostToRSS(post) {

    let date = new Date(post.date);
    let categories = '';

    post.tags.split(', ').map(tag => categories += `<category>${tag}</category>`);
    RSSFeedContent += `
    <item>
    <title>${post.title}</title>
    <link>${root + post.link}</link>
    <guid>${root + post.link}</guid>
    <pubDate>${date.toUTCString()}</pubDate>
    ${categories}
    <description>${post.body.substr(0, post.body.indexOf('</p>') + 4).replace(/<[^>]*>/g, '')}</description>
    </item>`;
}


function populateFeed(posts, wrapper, {
    category: category,
    count: count
}) {

    posts.map((post, index) => {

        if (!category) {

            if (!count || index < count) addPostToFeed(post, wrapper);

        } else if (post.tags.toLowerCase().includes(category)) {

            if (!count || index < count) addPostToFeed(post, wrapper);

        }
    });
}


function addPostToFeed(post, wrapper) {

    const newPost = wrapper.find('template').contents().clone();

    Object.keys(post).map(key => {
        let e = newPost.find(`.${key}`);
        let v = post[key];

        key = key.toLowerCase();

        if (Array.isArray(v)) v = v.join(', ');

        if (e) {
            if (key == 'link') e.attr('href', `/${blog + v}`);
            if (key == 'image') e.attr('src', v);
            if (key !== 'link' && key !== 'image') e.append(v)
        }
    })

    wrapper.append(newPost);
}


function readyPostData(post) {

    let thisPost = {
        title: '',
        date: '',
        tags: [],
        body: '',
        excerpt: '',
        link: '',
        image: ''
    }

    if (post) {

        const reader = new commonmark.Parser({ smart: true });
        const writer = new commonmark.HtmlRenderer({ softbreak: '<br />' });
        const parsed = reader.parse(fs.readFileSync(postSrc + post, 'utf8'));
        const $ = cheerio.load(htmlParser.parseDOM(writer.render(parsed), { decodeEntities: true }));

        // Highlight code snippets with PrismJS
        $('code').each(function (i, e) {

            const code = $(this);
            const snippet = code.text();

            if (String(e.attribs.class).includes('language-html')) {
                code.empty().append(prism.highlight(snippet, prism.languages.markup));
            }

            if (String(e.attribs.class).includes('language-javascript')) {
                code.empty().append(prism.highlight(snippet, prism.languages.javascript));
            }

            if (String(e.attribs.class).includes('language-css')) {
                code.empty().append(prism.highlight(snippet, prism.languages.css));
            }
        })

        thisPost.title = $('h1').contents().text();
        thisPost.date = $('h2').contents().text();
        thisPost.tags = $('h3').contents().text();
        thisPost.image = $('img').attr('src');
        thisPost.body = String($.html()).replace(/<h1>.*?<\/h3>/igs, '');
        thisPost.excerpt = thisPost.body.substr(0, thisPost.body.indexOf('</p>') + 4);


        // post link is absolute
        thisPost.link = linkify(thisPost.title);
        thisPost.tags.split(', ').map(tag => tags.push(tag));

        // Append CTA to post body
        thisPost.body += `<p>Thanks for reading. If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${thisPost.link.replace(/-/gi, '%20')}%20by%20@bradenthehair%20-%20&url=${root}blog/${thisPost.link}">share this article</a> with your followers.</p>`;

        posts.push(thisPost);
    }
}


function createNewPostsFromTemplate(posts) {

    posts.map((post, index) => {

        const postLocation = public + blog + post.link + '/index.html';
        const pageTemplateFile = new HTMLFile(pageTemplate).parse(true).loadDOM();
        const postTemplateFile = new HTMLFile(postTemplate).parse(true).loadDOM().populateComponents();

        pageTemplateFile.$('#main').append(postTemplateFile.html);

        appendMetaTags(`
        <!--title: ${post.title},
        image: ${post.image},-->`,
            pageTemplateFile.$);

        fs.mkdirSync(postLocation.replace('/index.html', ''));

        Object.keys(post).map(key => {

            let e = pageTemplateFile.$(`.${key}`);
            let value = post[key];

            if (key == 'tags') {
                const tags = [];
                value.split(', ').map(tag => {
                    const encodedTag = encodeURI(tag).replace(/%20+/g, '-');
                    tags.push(`<a href="/${blog}tags/${encodedTag}">${tag}</a>`);
                })
                value = tags.join(', ');
            }

            if (key == 'image') {
                e.attr('src', value);
            } else if (value && e) {
                e.append(value);
            }
        })

        // Add next and previous links
        const prevPost = posts[index + 1];
        const prevElem = pageTemplateFile.$('.previous');
        const nextPost = posts[index - 1];
        const nextElem = pageTemplateFile.$('.next');

        if (prevPost) {

            prevElem.find('.link-title').append(prevPost.title);
            prevElem.attr('href', `/${blog + prevPost.link}`);

        } else { prevElem.attr('style', 'display: none') }

        if (nextPost) {

            nextElem.find('.link-title').append(nextPost.title);
            nextElem.attr('href', `/${blog + nextPost.link}`);

        } else { nextElem.attr('style', 'display: none') }

        addPostToRSS(post);
        fs.writeFileSync(postLocation, pageTemplateFile.$.html());

        console.log(consoleBlue, `POST written to ${postLocation}`);
    })
}


function buildTagDirectories(tags) {

    fs.mkdirSync(`${public + blog}tags`);

    [...new Set(tags)].map(tag => {

        const tagName = encodeURI(tag).replace(/\%20+/g, '-');
        const destination = `${public + blog}tags/${tagName}/index.html`;

        fs.mkdirSync(destination.split('/index.html').shift());
        fs.copyFileSync(pageTemplate, destination);

        const pageTemplateFile = new HTMLFile(pageTemplate).parse(true).loadDOM();
        const tagTemplateFile = new HTMLFile(`${postsFolder}_tags.html`).parse(true).loadDOM().populateComponents();

        pageTemplateFile.$('#main').prepend(tagTemplateFile.html);
        appendMetaTags(`<!--title: ${tag}, description: Enjoy curated content from my blog,-->`, pageTemplateFile.$);
        pageTemplateFile.$('.tagName').append(tag);

        pageTemplateFile.$(`[${feedAttribute}]`).attr(feedAttribute, tag);
        pageTemplateFile.populateFeeds();

        fs.writeFileSync(destination, pageTemplateFile.$.html());
        console.log(consoleGreen, `TAG created for ${tag}`);
    })
}


// Clear old pages
fs.cleandirSync(public, ignoreChar);

// Compile and sort posts
fs.readdirSync(postSrc).map(post => readyPostData(post));
posts.sort(dynamicSort('date')).reverse();

// Publish pages
publishPagesFrom(pagesFolder);

// Publish posts
createNewPostsFromTemplate(posts);
buildTagDirectories(tags);

// Create RSS feed
fs.createFileSync(RSSFeed);
fs.writeFileSync(RSSFeed, RSSFeedContent + '</channel></rss>');


console.timeEnd('\n>> SITE COMPILED IN');
console.log('\n');