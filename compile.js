console.time('\n>> SITE COMPILED IN');


// DEPENDENCIES
const fs = require('fs-extra');
const htmlParser = require('htmlParser2');
const cheerio = require('cheerio');
const commonmark = require('commonmark');
const prism = require('prismjs');


// CLASSES
class HTMLFile {
    constructor(path) {
        this.path = path
    }

    parse(decodeEntities) {
        this.html = htmlParser.parseDOM(fs.readFileSync(this.path), { decodeEntities: decodeEntities })
        return this
    }

    loadDOM() {
        this.$ = cheerio.load(this.html)
        return this
    }

    populateComponents() {

        const select = this.$;

        select('component').each(function (i, e) {
            const component = select(this);
            const componentName = component.attr('data-name');
            const componentHTML = new HTMLFile(`${staticComponents + componentName}.html`).parse(true);

            component.append(componentHTML.html);
        })

        return this
    }
}


// GLOBAL VARIABLES
const consoleBlue = '\x1b[34m%s\x1b[0m';
const consolePurple = '\x1b[35m%s\x1b[0m';
const consoleGreen = '\x1b[32m%s\x1b[0m';

const ignoreChar = '_';
const public = './public/';
const blog = public + 'blog/';
const work = public + 'work/';
const pageTemplate = './_template.html';
const pagesFolder = './pages/';
const postsFolder = './posts/';
const blogPostSrc = postsFolder + '_blog/';
const workPostSrc = postsFolder + '_work/';
const postTemplate = postsFolder + '_template.html';
const staticComponents = './static_components/';
const acceptableMetaProperties = ['title', 'description', 'image'];

let blogPosts = [];
let blogTags = [];
let workPosts = [];
let workTags = [];

const blogAudience = 'dev-signers';
const blogHeadline = `Welcome to the blog for ${blogAudience}.`;
const blogTagline = 'Gain confidence designing and coding stellar interfaces.';

const today = new Date();
const RSSFeed = 'feed.xml';
const RSSLink = `https://www.bradeneast.com/blog/${RSSFeed}`;
let RSSFeedContent = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>Blog of Braden East</title>
<link>${RSSLink}</link>
<description>The blog for ${blogAudience}. ${blogTagline}</description>
<lastBuildDate>${today.toUTCString()}</lastBuildDate>
<atom:link href="${RSSLink}" rel="self" type="application/rss+xml" />`;


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
    fs.readdirSync(directory).map(file => file.charAt(0) != ignoreChar ? fs.removeSync(directory + file) : null);
}


function getMetaProperty(metaData, property) {

    const split = metaData.split(`${property}:`);
    const metaContent = String(split[1]).substring(0, String(split[1]).indexOf(','));

    return trimWhiteSpace(metaContent.replace(/<[^>]*>/g, ''));
}


function appendMetaTags(metaData, selector) {

    acceptableMetaProperties.map(prop => {

        prop = prop.toLowerCase();

        if (metaData.includes(`${prop}:`)) {

            const content = getMetaProperty(metaData, prop).replace('/_images/', 'https://www.bradeneast.com/_images/');

            if (prop == 'title') selector(prop).text(`Braden East | ${content}`);
            if (prop == 'description') selector('head').append(`\n<meta name="${prop}" content="${content}">`);

            selector('head').prepend(`\n<meta property="og:${prop}" content="${content}">`);
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

                if (directory.includes('blog')) {

                    // Update blog headline and tagline
                    currentFile.$('#blog-headline').empty().text(blogHeadline);
                    currentFile.$('#blog-tagline').empty().text(blogTagline);

                    // Prepend main content to main element
                    templateFile.$('#main').append(currentFile.$.html());

                } else {

                    // Prepend main content to main element as is
                    templateFile.$('#main').append(currentFile.html);

                }

                // Append meta tags to head element
                if (currentFile.html[0]) { appendMetaTags(currentFile.html[0].data, templateFile.$) }

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
    let categories;

    post.tags.split(', ').map(tag => categories += `<category>${tag}</category>`);
    RSSFeedContent += `
        <item>
        <title>${post.title}</title>
        <link>https://www.bradeneast.com/blog/${post.link}</link>
        <guid>https://www.bradeneast.com/blog/${post.link}</guid>
        <pubDate>${date.toUTCString()}</pubDate>
        ${categories}
        <description>${post.body.substr(0, post.body.indexOf('</p>') + 4).replace(/<[^>]*>/g, '')}</description>
        </item>`;
}


function createPostFeed(posts, page, category) {

    const currentFile = new HTMLFile(page).parse(true).loadDOM();
    const wrapper = currentFile.$('#postFeed');
    wrapper.children().not('template').remove();

    posts.map(post => {
        if (!category || post.tags.join().includes(category)) addPostToFeed(post, wrapper, currentFile.$)
    });

    const formattedOutput = String(currentFile.$.html()).replace(/\n\s*\n/g, '\n')
    fs.writeFileSync(page, formattedOutput);
}


function addPostToFeed(post, wrapper, $) {
    const newPost = $('template').contents().clone();

    Object.keys(post).map(key => {
        let e = newPost.find(`.${key}`);
        let v = post[key];
        key = key.toLowerCase();
        Array.isArray(v) ? v = v.join(', ') : null;
        if (e) {
            if (key == 'body') {
                e.append(v.substr(0, v.indexOf('</p>') + 4))
            } else if (key == 'link') {
                e.attr('href', v)
            } else if (key == 'image') {
                e.attr('src', v)
            } else {
                e.append(v)
            }
        }
    })
    wrapper.append(newPost);
}


function readyPostData(post, parentDirectory) {

    let thisPost = {
        title: '',
        date: '',
        tags: [],
        body: '',
        link: '',
        image: ''
    }

    if (post) {

        const reader = new commonmark.Parser({ smart: true });
        const writer = new commonmark.HtmlRenderer({ softbreak: '<br />' });
        const parsed = reader.parse(fs.readFileSync(parentDirectory + post, 'utf8'));
        const $ = cheerio.load(htmlParser.parseDOM(writer.render(parsed), { decodeEntities: true }));

        // Highlight code snippets with PrismJS
        $('code').each(function (i, e) {

            const code = $(this);
            const snippet = code.text();

            e.attribs.class == 'language-html' ? code.empty().append(prism.highlight(snippet, prism.languages.markup)) : null;
            e.attribs.class == 'language-javascript' ? code.empty().append(prism.highlight(snippet, prism.languages.javascript)) : null;
            e.attribs.class == 'language-css' ? code.empty().append(prism.highlight(snippet, prism.languages.css)) : null;

        })

        thisPost.title = $('h1').contents().text();
        thisPost.date = $('h2').contents().text();
        thisPost.tags = $('h3').contents().text();
        thisPost.image = $('img').attr('src');
        thisPost.body = String($.html()).replace(/<h1>.*?<\/h3>/igs, '');

        if (parentDirectory == blogPostSrc) {

            thisPost.link = '/blog/' + linkify(thisPost.title);
            thisPost.tags.split(', ').map(tag => blogTags.push(tag));
            blogPosts.push(thisPost);

            // Append CTA to post body
            thisPost.body += `<p>Thanks for reading! If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${thisPost.link.replace(/\/blog\/|-/gi, '%20')}%20by%20@bradenthehair%20-%20&url=https://bradeneast.com/blog/${thisPost.link}">share this article</a> with your followers. I appreciate it!</p>`;

        }

        if (parentDirectory == workPostSrc) {

            thisPost.link = '/work/' + linkify(thisPost.title);
            thisPost.tags.split(', ').map(tag => workTags.push(tag));
            workPosts.push(thisPost);

        }
    }
}


function createNewPostsFromTemplate(posts, destinationDirectory) {

    posts.map((post, index) => {

        const postLocation = public + post.link + '/index.html';
        const pageTemplateFile = new HTMLFile(pageTemplate).parse(true).loadDOM();
        const postTemplateFile = new HTMLFile(postTemplate).parse(true).loadDOM().populateComponents();

        pageTemplateFile.$('#main').append(postTemplateFile.html);

        appendMetaTags(`
        <!--title: ${post.title},
        description: The blog for ${blogAudience} - ${blogTagline},
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
                    const destination = destinationDirectory.replace(public, '');
                    tags.push(`<a href="/${destination}tags/${encodedTag}">${tag}</a>`);
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
        const prevPost = posts[index - 1];
        const prevElem = pageTemplateFile.$('.previous');
        const nextPost = posts[index + 1];
        const nextElem = pageTemplateFile.$('.next');

        if (prevPost) {

            prevElem.find('.link-title').append(prevPost.title);
            prevElem.attr('href', `${prevPost.link}`);

        } else { prevElem.attr('style', 'display: none') }

        if (nextPost) {

            nextElem.find('.link-title').append(nextPost.title);
            nextElem.attr('href', `${nextPost.link}`);

        } else { nextElem.attr('style', 'display: none') }

        addPostToRSS(post);
        fs.writeFileSync(postLocation, pageTemplateFile.$.html());
        console.log(consoleBlue, `POST written to ${postLocation}`);
    })
}


function buildTagDirectories(tags, destinationDirectory) {

    fs.mkdirSync(`${destinationDirectory}tags`);

    [...new Set(tags)].map(tag => {

        const tagName = encodeURI(tag).replace(/\%20+/g, '-');
        const destination = `${destinationDirectory}tags/${tagName}/index.html`;

        fs.mkdirSync(destination.split('/index.html').shift());
        fs.copyFileSync(pageTemplate, destination);

        const pageTemplateFile = new HTMLFile(pageTemplate).parse(true).loadDOM();
        const tagTemplateFile = new HTMLFile(`${postsFolder}_tags.html`).parse(true);
        const $ = cheerio.load(htmlParser.parseDOM(fs.readFileSync(pageTemplate), { decodeEntities: true }));

        pageTemplateFile.$('#main').prepend(tagTemplateFile.html);
        appendMetaTags(`<!--title: ${tag}, description: Enjoy curated content from my blog,-->`, pageTemplateFile.$);
        pageTemplateFile.$('.tagName').append(tag);

        if (destinationDirectory == blog) {
            blogPosts.map(post => {
                if (post.tags.includes(tag)) addPostToFeed(post, pageTemplateFile.$('#postFeed'), pageTemplateFile.$)
            })
        }

        if (destinationDirectory == work) {
            workPosts.map(post => {
                if (post.tags.includes(tag)) addPostToFeed(post, pageTemplateFile.$('#postFeed'), pageTemplateFile.$)
            })
        }

        fs.writeFileSync(destination, pageTemplateFile.$.html());
        console.log(consoleGreen, `TAG created for ${tag}`);
    })
}


// Clear old pages
fs.cleandirSync(public, ignoreChar);

// Publish pages
publishPagesFrom(pagesFolder);

// Clear old posts
fs.cleandirSync(postsFolder);

// Create RSS feed
fs.createFileSync(blog + RSSFeed);

// Sort and publish blog posts
fs.readdirSync(blogPostSrc).map(post => readyPostData(post, blogPostSrc));
blogPosts.sort(dynamicSort('date')).reverse();
createNewPostsFromTemplate(blogPosts, blog);
createPostFeed(blogPosts, `${blog}index.html`);
buildTagDirectories(blogTags, blog);

// Complete RSS feed
fs.writeFileSync(blog + RSSFeed, `${RSSFeedContent}</channel></rss>`);

// Sort and publish work posts
fs.readdirSync(workPostSrc).map(post => readyPostData(post, workPostSrc));
workPosts.sort(dynamicSort('date')).reverse();
createNewPostsFromTemplate(workPosts, work);
createPostFeed(workPosts, `${work}index.html`);
buildTagDirectories(workTags, work);


console.timeEnd('\n>> SITE COMPILED IN');
console.log('\n');