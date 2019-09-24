// parses blogger json data
function parseBloggerJSON({ objectKey, objectValue, template }) {
    let e = template.querySelector(`[data-${objectKey}]`);
    let projectLinks = template.querySelectorAll('a');
    let parser = new DOMParser();
    let imageContainer = template.querySelector('[data-image]');

    if (objectKey == 'content') {
        let dom = parser.parseFromString(objectValue, 'text/html');
        let featuredImage = dom.querySelector('img');
        if (featuredImage && imageContainer) {
            clearImageFormatting(featuredImage);
            featuredImage.setAttribute('alt', altFromSource(featuredImage));
            imageContainer.appendChild(featuredImage);
        }
    }

    if (e) {
        Array.isArray(objectValue) ? e.innerHTML = objectValue.join(', ') : e.innerHTML = objectValue;

        if (objectKey == 'title' && projectLinks) {
            projectLinks.forEach(link => link.setAttribute('href', `/work/#${linkify(objectValue.split(' | ').shift())}`));
            projectLinks.forEach(link => link.setAttribute('aria-label', objectValue.replace(/&shy;/g, '')));
        }
    }
}