console.time('\n>> SITE COMPILED IN');


// IMPORTS

const fs = require('fs-extra');
const helpers = require('./helpers');
const pages = require('./pages');
const posts = require('./posts');
const site = require('./site');
const rss = require('./rss');
const tags = require('./tags');


// GLOBAL VARIABLES

let rssXML = rss.head;
let blogPosts = [];
let blogTags = [];


// Clear old pages
fs.readdirSync(site.public).map(file => {
    if (file.charAt(0) != site.ignoreChar) fs.removeSync(site.public + file);
})


// Compile and sort blog posts
const postFilePaths = fs.readdirSync(site.postSrc);

postFilePaths.map(path => blogPosts.push(posts.objectify(path)));

blogPosts.map(item => {

    item.tags.split(', ').map(tag => blogTags.push(tag));
    rssXML += rss.ify(item);

});

blogPosts.sort(helpers.dynamicSort('date')).reverse();


// Publish pages
pages.publish(blogPosts, site.pagesFolder);


// Publish posts
posts.newFromTemplate(blogPosts);
tags.buildDirectories(blogTags, blogPosts);


// Create RSS feed
fs.createFileSync(rss.feed);
fs.writeFileSync(rss.feed, rssXML + '</channel></rss>');

console.timeEnd('\n>> SITE COMPILED IN');
console.log('\n');