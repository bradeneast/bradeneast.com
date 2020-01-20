const cheerio = require('cheerio');
const htmlParser = require('htmlparser2');
const fs = require('fs-extra');
const site = require('./site');

class HTMLFile {
    constructor(path) {
        this.path = path
    }

    parse(decodeEntities) {
        this.html = htmlParser.parseDOM(fs.readFileSync(this.path), { decodeEntities: decodeEntities || true });
        return this
    }

    loadDOM() {
        this.$ = cheerio.load(this.html);
        return this
    }

    populateComponents() {

        const select = this.$;

        select('component').each(function (i, e) {
            const component = select(this);
            const componentName = component.attr('data-name');
            const componentHTML = new HTMLFile(`${site.staticComponents + componentName}.html`).parse(true).loadDOM();
            component.append(componentHTML.html);
        })

        return this
    }

    populateFeeds(allPosts) {

        const select = this.$;
        const feeds = select(`[data-name=post-feed]`);

        feeds.each(function (i, e) {

            const feed = select(this);
            const wrapper = feed.children().first();
            const feedCategory = feed.attr('data-category');
            const feedCount = feed.attr('data-count');
            const posts = allPosts[feedCategory] || allPosts;

            populateFeed(posts, wrapper, {
                category: feedCategory,
                count: feedCount,
            })
        })

        return this
    }
}


function populateFeed(posts, wrapper, {
    category: category,
    count: count
}) {

    posts.map((post, index) => {

        let withinLimit = !count || index < count;
        let categoryMatch = !category || post.tags.toLowerCase().includes(category);

        if (withinLimit && categoryMatch) addPostToFeed(post, wrapper);

    })
}


function addPostToFeed(post, wrapper) {

    const newPost = wrapper.find('template').contents().clone();

    Object.keys(post).map(key => {
        let element = newPost.find(`.${key}`);
        let value = post[key];

        key = key.toLowerCase();

        if (!element) return;

        if (key === 'link') element.attr('href', `/${post.area}/${value}`);

        if (key === 'media') {

            let mediaTypeCheck = new RegExp('mp4|webm|ogg');
            let isVideo = String(value).match(mediaTypeCheck);
            let media = isVideo ? `<video muted loop playsinline src="${value}"></video>` : `<img alt="" src="${value}" />`;

            element.after(media);
            element.remove();
        }

        if (key != 'link' && key != 'media') element.append(value);
    })

    wrapper.append(newPost);
}

module.exports = HTMLFile;