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


// STUFF HAPPENS BELOW THIS LINE
/////////////////////////////////////////////////////////////////


// CLEARS POSTS FROM BLOG DIRECTORY
fs.readdirSync(blogDir).forEach(dir => {
    if (fs.lstatSync(blogDir + dir).isDirectory() && path.basename(blogDir + dir).charAt(0) !== '_') {
        fs.removeSync(blogDir + dir);
    }
})


// CREATES JSON ARRAY OF BLOG POSTS
let posts = [];

fs.readdirSync(postDir).forEach(post => {
    let postJSON = {
        "title": "",
        "date": "",
        "tags": [],
        "body": "",
    }
    const reader = new commonmark.Parser({ smart: true });
    const writer = new commonmark.HtmlRenderer({ softbreak: '<br />' });
    const parsed = reader.parse(fs.readFileSync(postDir + post, 'utf8'));
    const output = writer.render(parsed);
    const dom = htmlparser.parseDOM(output, { decodeEntities: true });
    const $ = cheerio.load(dom);

    postJSON.title = $('h1').contents().text();
    postJSON.date = $('h2').contents().text();
    postJSON.tags = $('h3').contents().text();
    postJSON.body = String(output).replace(/\n/g, '').replace(/<h1>.*?<\/h3>/g, '');
    posts.push(postJSON);
})

posts.forEach(post => {
    post.link = encodeURI(post.title).replace(/%20|#/g, '-').replace(/\(|\)/g, '').replace(/--/g, '-').toLowerCase();
})

// SORTS ARRAY OF BLOG POSTS BY DATE
posts = posts.sort(dynamicSort('date')).reverse();


// GENERATES NEW POST FROM TEMPLATE
posts.forEach((post, index) => {

    // Copies post from template
    let postLocation = blogDir + post.link;
    fs.mkdirSync(postLocation);
    postLocation = postLocation + '/index.html';
    fs.copyFileSync(postTemplate, postLocation);
    console.log('new post created from template');

    // Parses post page html
    const dom = htmlparser.parseDOM(fs.readFileSync(postLocation), {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);

    // Inserts json values based on classnames matching the key
    Object.keys(post).forEach(key => {
        const e = $(`.${key}`);
        let value = post[key];
        if (Array.isArray(value)) {
            value = value.join(', ');
        }
        if (value && e) {
            e.append(value);
            if (key == 'body') {
                let title = post.link.replace(/--/g, ': ').replace(/-/g, '%20');
                title = title.charAt(0).toUpperCase() + title.slice(1);
                const url = 'https://bradeneast.com/blog/' + post.link;
                e.append(`Thanks for reading! If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${title}%20by%20@bradenthehair%20-%20&url=${url}">share this article</a> with your followers. I appreciate it!`);
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
})


// ADDS POSTS TO HOMEPAGE
const blogFeedPages = ['../blog/index.html'];
blogFeedPages.forEach(page => {

    // Parses page containing blog feed
    const dom = htmlparser.parseDOM(fs.readFileSync(page), {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);
    const feedElem = $('#blogFeed');
    feedElem.children().not('template').remove();

    posts.forEach(post => {

        // Clones partial post template
        const newPost = feedElem.find('template').contents().clone();

        // Inserts json values based on classnames matching the key
        Object.keys(post).forEach(key => {
            const e = newPost.find(`.${key}`);
            let value = post[key];
            if (Array.isArray(value)) {
                value = value.join(', ');
            }
            if (e && key == 'body') {
                value = value.substr(0, value.indexOf('</p>') + 4);
                e.append(value);
            } else if (e && key == 'link') {
                e.attr('href', value);
            } else if (e) {
                e.append(value);
            }
        });
        feedElem.append(newPost);
    })

    fs.writeFileSync(page, $.html());
})

console.timeEnd('>> BUILD COMPLETE');