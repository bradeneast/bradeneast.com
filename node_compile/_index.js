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
let allPosts = {
    [site.postAreas[0]]: [],
    [site.postAreas[1]]: [],
};
// let allPosts = [];
let allTags = [];


// Clear old pages
fs.readdirSync(site.public).map(file => {
    if (file.charAt(0) != site.ignoreChar) fs.removeSync(site.public + file);
})


// Compile and sort blog posts
const postFilePaths = fs.readdirSync(site.postSrc);

postFilePaths.map(path => {

    const postData = posts.objectify(path);
    allPosts[postData.area].push(postData);

})

site.postAreas.map(area => {

    // Sort posts by date
    allPosts[area].sort(helpers.dynamicSort('date')).reverse();

    allPosts[area].map(item => {

        item.tags.split(', ').map(tag => allTags.push(tag));
        if (area == 'blog') rssXML += rss.ify(item);

    })

})

// Publish pages
pages.publish(allPosts, site.pagesFolder);

site.postAreas.map(area => {

    // Publish posts
    posts.newFromTemplate(allPosts[area]);
    tags.buildDirectories(allTags, allPosts[area]);

})



// Create RSS feed
fs.createFileSync(rss.feed);
fs.writeFileSync(rss.feed, rssXML + '</channel></rss>');

console.timeEnd('\n>> SITE COMPILED IN');
console.log('\n');