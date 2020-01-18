const fs = require('fs-extra');
const site = require('./site');
const meta = require('./meta');
const HTMLFile = require('./HTMLFile');
const log = require('./log');

function publish(posts, directory) {

    fs.readdirSync(directory, { encoding: 'utf8' }).map(child => {

        if (child.charAt(0) == site.ignoreChar) return;

        if (fs.lstatSync(directory + child).isDirectory()) {

            // Create parallel directory in public folder and recurse
            fs.mkdirSync(directory.replace('pages', 'public') + child);
            publish(posts, directory + child + '/');

            return;
        }

        const location = directory + child;
        const destination = directory.replace('pages', 'public') + child;
        const templateFile = new HTMLFile(site.pageTemp).parse(true).loadDOM();
        const currentFile = new HTMLFile(location).parse(true).loadDOM().populateComponents();
        const currentFileMeta = currentFile.html[0].data;

        // Append meta tags to head element
        if (currentFileMeta) meta.addTags(currentFileMeta, templateFile.$);
        templateFile.$('#ogurl').attr('content', site.root + directory.replace(site.pagesFolder, ''));

        // Prepend main content to main element
        templateFile.$('#main').append(currentFile.html);
        templateFile.populateFeeds(posts);

        // Write to destination file
        fs.createFileSync(destination);
        fs.writeFileSync(destination, templateFile.$.html());
        log.purple(`PAGE written to ${destination}`);

    })
}

const pages = {
    publish: publish
}

module.exports = pages;