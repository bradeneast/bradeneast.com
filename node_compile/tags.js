const fs = require('fs-extra');
const HTMLFile = require('./HTMLFile');
const meta = require('./meta');
const site = require('./site');
const log = require('./log');

function buildDirectories(tags, posts) {

    const postArea = [posts[0].area];

    fs.mkdirSync(`${site.public}/${postArea}/tags`);

    [...new Set(tags)].map(tag => {

        const tagName = encodeURI(tag).replace(/\%20+/g, '-');
        const destination = `${site.public}/${postArea}/tags/${tagName}/index.html`;
        const destinationDir = destination.split('/index.html').shift();

        fs.mkdirSync(destinationDir);
        fs.copyFileSync(site.pageTemp, destination);

        const pageTemp = new HTMLFile(site.pageTemp).parse(true).loadDOM();
        const tagTemplateFile = new HTMLFile(`${site.postsFolder}_tags.html`).parse(true).loadDOM().populateComponents();

        pageTemp.$('#main').prepend(tagTemplateFile.html);
        meta.addTags(
            `<!--title: "${tag}",
            description: "Enjoy curated content from my blog",
            url: "${site.root}${site.blog}tags/${tag}",
            -->`,
            pageTemp.$
        );
        pageTemp.$('.tagName').append(tag);

        pageTemp.$(`[data-name=post-feed]`).attr('data-category', tag);
        pageTemp.populateFeeds(posts);

        fs.writeFileSync(destination, pageTemp.$.html());
        log.green(`TAG created for ${tag}`);
    })
}

const tags = {
    buildDirectories: buildDirectories
}

module.exports = tags;