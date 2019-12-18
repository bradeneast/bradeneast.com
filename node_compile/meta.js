const helpers = require('./helpers');
const site = require('./site');
const acceptableMetaProperties = ['title', 'description', 'image', 'url'];

function getProperty(metaData, property) {

    const splitAtKey = metaData.split(`${property}:`);
    const value = String(splitAtKey[1])
    const content = value.split('\"')[1] || "";

    return helpers.trimWhiteSpace(content.replace(/<[^>]*>/g, ''));
}


function addTags(metaData, selector) {

    acceptableMetaProperties.map(prop => {

        if (metaData.toLowerCase().includes(`${prop}:`)) {

            const content = getProperty(metaData, prop).replace('/_images/', `${site.root}_images/`);
            const metaTag = `<meta name="${prop}" content="${content}">`;

            if (prop === 'title') selector(prop).text(site.name + site.titleSeparator + content);
            if (prop === 'description') selector('head').append(metaTag);

            selector(`#og${prop}`).remove();
            selector('title').after(`\n\t<meta property="og:${prop}" content="${content}">`);
        }
    })
}

const meta = {
    addTags: addTags
}

module.exports = meta;