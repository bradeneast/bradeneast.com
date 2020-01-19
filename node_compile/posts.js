const fs = require('fs-extra');
const htmlParser = require('htmlParser2');
const cheerio = require('cheerio');
const commonmark = require('commonmark');
const prism = require('prismjs');

const site = require('./site');
const helpers = require('./helpers');
const HTMLFile = require('./HTMLFile');
const meta = require('./meta');
const log = require('./log');


function objectify(postFilePath) {

    const thisPost = {}
    let codeLanguages = ['html', 'css', 'javascript']

    const reader = new commonmark.Parser({ smart: true });
    const writer = new commonmark.HtmlRenderer({ softbreak: '<br />' });
    const parsed = reader.parse(fs.readFileSync(site.postSrc + postFilePath, 'utf8'));
    const $ = cheerio.load(htmlParser.parseDOM(writer.render(parsed), { decodeEntities: true }));

    // Highlight code snippets with PrismJS
    $('code').each(function (i, e) {

        const code = $(this);
        const snippet = code.text();

        codeLanguages.map(language => {

            let prismLang = language === 'html' ? 'markup' : language;

            if (String(e.attribs.class).includes(language)) {
                code.empty().append(prism.highlight(snippet, prism.languages[prismLang]));
                code.parent().addClass(`contains-${language}`);
            }

        })
    })

    // Unwrap images from p tags
    $('img').each(function (i, e) {
        const img = $(this);
        const parent = img.closest('p');
        parent.after(img);
        parent.remove();
    })

    $('.codepen').each(function (i, e) {
        $(this).attr('data-theme-id', site.codePenTheme);
    })

    thisPost.title = $('h1').contents().text();
    thisPost.date = $('h2').contents().text();
    thisPost.tags = $('h3').contents().text();
    thisPost.body = String($.html()).replace(/<h1>.*?<\/h3>/igs, '');
    thisPost.excerpt = thisPost.body.substr(0, thisPost.body.indexOf('</p>') + 4);
    thisPost.link = helpers.linkify(thisPost.title);
    thisPost.media = $('#featured-media').attr('src') || $('video').attr('src') || $('source').attr('src') || $('img').attr('src');

    // Determine which area post belongs in from post tags
    let regex = new RegExp(String(site.postAreas).replace(/[, ]/g, '|'), 'gi');
    thisPost.area = thisPost.tags.match(regex)[0].toLowerCase();

    // Append Twitter share CTA to post body
    if (thisPost.area == 'blog') {

        thisPost.body += `<p>Thanks for reading. If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${thisPost.link.replace(/-/gi, '%20')}%20by%20@${site.socials.twitter}%20-%20&url=${site.root}${site.blog}${thisPost.link}">share this post</a> with your followers.</p>`;

    }
    return thisPost;
}


function newFromTemplate(posts) {

    posts.map((post, index) => {

        const postLocation = `${site.public}/${post.area}/${post.link}/index.html`;
        const pageTemp = new HTMLFile(site.pageTemp).parse(true).loadDOM();
        const postTemp = new HTMLFile(site.postTemp).parse(true).loadDOM().populateComponents();

        pageTemp.$('#main').append(postTemp.html);

        meta.addTags(
            `<!--
            title: "${post.title}",
            image: "${post.media}",
            url: "${site.root}/${post.area}/${post.link}",
            -->`,
            pageTemp.$);

        fs.mkdirSync(postLocation.replace('/index.html', ''));

        Object.keys(post).map(key => {

            let element = pageTemp.$(`.${key}`);
            let value = post[key];
            key = key.toLowerCase();

            if (!value || !element) return;

            if (key == 'tags') {

                let theseTags = value.split(', ');
                value = theseTags.map(tag => `
                    <a class="tag" href="/${post.area}/tags/${helpers.linkify(tag)}">${tag}</a>`
                ).join(', ');
            }
            if (key == 'media') element.attr('src', value);
            else element.append(value);
        })

        // Add next and previous links
        new Array(0, 1).forEach(nextPost => {

            const toPost = nextPost ? posts[index + 1] : posts[index - 1];
            const toElem = nextPost ? pageTemp.$('.previous') : pageTemp.$('.next');

            if (toPost) {

                toElem.find('.link-title').append(toPost.title);
                toElem.attr('href', `/${toPost.area}/${toPost.link}`);
                pageTemp.$('head').append(`<link rel="prefetch" href="${site.root + post.area}/${toPost.link}" />`)

            } else toElem.css('display', 'none');

        })

        fs.writeFileSync(postLocation, pageTemp.$.html());
        log.blue(`POST written to ${postLocation}`);
    })
}

const posts = {
    objectify: objectify,
    newFromTemplate: newFromTemplate
}

module.exports = posts;