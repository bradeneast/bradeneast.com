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
let postData = [];
let tagData = [];


// Clear old pages
fs.readdirSync(site.public).map(file => {
    if (file.charAt(0) != site.ignoreChar) fs.removeSync(site.public + file);
})


// Compile and sort posts
const postFilePaths = fs.readdirSync(site.postSrc);

postFilePaths.map(path => postData.push(posts.objectify(path)));

postData.map(item => {

    item.tags.split(', ').map(tag => tagData.push(tag));
    rssXML += rss.ify(item);

});

postData.sort(helpers.dynamicSort('date')).reverse();


// Publish pages
pages.publish(postData, site.pagesFolder);


// Publish posts
posts.newFromTemplate(postData);
tags.buildDirectories(tagData, postData);


// Create RSS feed
fs.createFileSync(rss.feed);
fs.writeFileSync(rss.feed, rssXML + '</channel></rss>');

console.timeEnd('\n>> SITE COMPILED IN');
console.log('\n');