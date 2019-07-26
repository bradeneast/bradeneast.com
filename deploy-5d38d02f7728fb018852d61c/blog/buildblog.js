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
const htmlparser = require('htmlparser2');
const cheerio = require('cheerio');

// FUNCION: Copies html template and creates a new post in the blog directory
function newFromTemplate(directory, postName) {
    const newPath = directory + postName.replace(/ /g, '-');
    fs.mkdirSync(newPath);
    fs.copyFileSync(postTemplate, `${newPath}/index.html`);
    console.log('new post created from template');
    return newPath;
}

// FUNCION: Injects post content into HTML template (accepts "full" or "partial" as viewType arguments)
function injectPost(postData, htmlFilePath, viewType, linkPath) {
    const dom = htmlparser.parseDOM(fs.readFileSync(htmlFilePath), {
        decodeEntities: true
    });
    const $ = cheerio.load(dom);
    if (viewType.toLowerCase() == 'full') {
        Object.keys(postData).forEach(key => {
            if (postData[key]) {
                writeWhole(postData[key], key, $);
            }
        })
        if (linkPath) {
            appendCTA($, linkPath);
        }
    }
    if (viewType.toLowerCase() == 'partial') {
        const feedWrapper = $('#recent-posts');
        const partialTemplate = $('.template').contents().clone();
        feedWrapper.append(partialTemplate);
        Object.keys(postData).forEach(key => {
            if (postData[key]) {
                writePartial(postData[key], key, $, partialTemplate);
            }
        })
        if (linkPath) {
            addLink(partialTemplate, $, linkPath);
        }
    }
    fs.writeFileSync(htmlFilePath, $.html());
    console.log('post written to file');
}

// FUNCTION: Loops through each json object and appends value to element with matching classname
function writeWhole(data, selector, method) {
    const e = method(`.${selector}`);
    if (e && Array.isArray(data)) {
        e.append(data.join().replace(/,/g, ', '));
    } else if (e) {
        e.append(data);
    }
}

// FUNCTION: (partial post previews) Loops through each json object and appends value to element with matching classname
function writePartial(data, selector, $, template) {
    const e = template.find($(`.${selector}`));
    if (e && Array.isArray(data)) {
        e.append(data.join().replace(/,/g, ', '));
    } else if (e && selector.toLowerCase() == 'body') {
        e.append(`${data.substr(0, 150)}...`);
    } else if (e) {
        e.append(data);
    }
}

// FUNCTION: Sets read more link on partial posts
function addLink(parent, $, linkPath) {
    const a = parent.find($('.link'));
    if (a) {
        a.attr('href', encodeURI(linkPath));
        a.attr('aria-label', `Read ${linkPath.replace(/-/g, ' ').replace('./', '').replace('/index.html', '')} by Braden East`);
        console.log('link added to partial post');
    }
}

// FUNCTION: Appends call to action to the post body
function appendCTA($, linkPath) {
    const e = $('.body');
    const title = encodeURI(linkPath).replace('./', '').replace(/-/g, '%20');
    const url = encodeURI(linkPath).replace('./', 'https://bradeneast.netlify.com/blog/');
    if (e) {
        e.append(`<br />Thanks for reading! If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${title}%20by%20@bradenthehair%20-%20&url=${url}">share this article</a> with your followers. I appreciate it!`);
        console.log('cta appended to post body');
    }
}


// STUFF HAPPENS BELOW THIS LINE
/////////////////////////////////////////////////////////////////


// CLEAR POSTS FROM BLOG DIRECTORY & BLOG HOME
fs.readdirSync(blogDir).forEach(dir => {
    if (fs.lstatSync(blogDir + dir).isDirectory() && path.basename(blogDir + dir).charAt(0) !== '_') {
        fs.removeSync(blogDir + dir);
    }
})
const blogHomeDOM = htmlparser.parseDOM(fs.readFileSync(`${blogDir}index.html`), {
    decodeEntities: true
});
const $ = cheerio.load(blogHomeDOM, {
    normalizeWhitespace: true
});
$('#recent-posts').children().not('.template').remove();
fs.writeFileSync(`${blogDir}index.html`, $.html());


// GENERATE NEW BLOG POSTS
fs.readdirSync(postDir).forEach(post => {
    const postName = path.basename(post, '.json');
    if (postName != templateName) {
        const postContent = JSON.parse(fs.readFileSync(`${postDir + postName}.json`, 'utf8'));
        const newPath = blogDir + postName.replace(/ /g, '-');
        newFromTemplate(blogDir, postName);
        injectPost(postContent, newPath + '/index.html', 'full', newPath);
    }
})


// POPULATE LATEST POSTS ON BLOG HOME
fs.readdirSync(postDir).forEach(post => {
    const postName = path.basename(post, '.json');
    const postContent = JSON.parse(fs.readFileSync(`${postDir + postName}.json`, 'utf8'));
    const newPath = `${blogDir + postName.replace(/ /g, '-')}/index.html`;
    injectPost(postContent, `${blogDir}index.html`, 'partial', newPath);
})

console.log('BUILD COMPLETE');