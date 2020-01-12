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

    let thisPost = {}
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

    // Populate CodePens
    $('.codepen').each(function (i, e) {

        const pen = $(this);

        $('#codepen-embed-script').remove();

        Object.keys(site.codepen).map(key => {
            let value = `data-${key.replace(/_/g, '-')}`;
            if (!pen.attr(value)) pen.attr(value, site.codepen[key]);
        })

        pen.after(
            `<span>
                <a href="https://codepen.io/${pen.attr('data-user')}/pen/${pen.attr('data-slug-hash')}">See this pen</a> by <a href="https://codepen.io/${pen.attr('data-user')}">@${pen.attr('data-user')}</a> on CodePen.
            </span>
            <script async src="https://static.codepen.io/assets/embed/ei.js" id="codepen-embed-script" type="text/javascript"></script>`
        )
    })

    $('img').each(function (i, e) {
        const img = $(this);
        const parent = img.closest('p');
        parent.after(img);
        parent.remove();
    })

    thisPost.title = $('h1').contents().text();
    thisPost.date = $('h2').contents().text();
    thisPost.tags = $('h3').contents().text();
    thisPost.image = $('img').attr('src');
    thisPost.body = String($.html()).replace(/<h1>.*?<\/h3>/igs, '');
    thisPost.excerpt = thisPost.body.substr(0, thisPost.body.indexOf('</p>') + 4);

    // Determine which area post belongs in from post tags
    let regex = new RegExp(String(site.postAreas).replace(/[, ]/g, '|'), 'gi');
    thisPost.area = thisPost.tags.match(regex)[0];

    // post link is absolute
    thisPost.link = helpers.linkify(thisPost.title);

    // Append Twitter share CTA to post body
    if (thisPost.area == 'blog') {

        thisPost.body += `<p>Thanks for reading. If you learned something useful, <a target="_blank" href="https://twitter.com/share?text=${thisPost.link.replace(/-/gi, '%20')}%20by%20@bradenthehair%20-%20&url=${site.root}${site.blog}${thisPost.link}">share this post</a> with your followers.</p>`;

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
            image: "${post.image}",
            url: "${site.root}/${post.area}/${post.link}",
            -->`,
            pageTemp.$);

        fs.mkdirSync(postLocation.replace('/index.html', ''));

        Object.keys(post).map(key => {

            let e = pageTemp.$(`.${key}`);
            let value = post[key];

            if (!value || !e) return;

            if (key == 'tags') {

                let theseTags = value.split(', ');
                value = '';

                theseTags.map(tag => {
                    value += `<a class="tag" href="/${post.area}/tags/${helpers.linkify(tag)}">${tag}</a>`;
                })
            }

            key == 'image' ? e.attr('src', value) : e.append(value);
        })

        // Add next and previous links
        new Array(0, 1).forEach(next => {

            const toPost = next ? posts[index + 1] : posts[index - 1];
            const toElem = next ? pageTemp.$('.previous') : pageTemp.$('.next');

            if (toPost) {

                toElem.find('.link-title').append(toPost.title);
                toElem.attr('href', `/${toPost.area}/${toPost.link}`);

            } else toElem.attr('style', 'display:none');

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