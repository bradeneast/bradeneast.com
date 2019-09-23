// parses blogger json data
function parseBloggerJSON({ objectKey, objectValue, template }) {
    let e = template.querySelector(`[data-${objectKey}]`);
    let projectLink = template.querySelector('a');
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
        if (Array.isArray(objectValue)) {
            e.innerHTML = objectValue.join(', ');
        } else if (objectValue && e) {
            e.innerHTML = objectValue;
        }
        if (objectKey == 'title' && projectLink) {
            projectLink.setAttribute('href', `/work/#${linkify(objectValue.split(' | ').shift())}`);
            projectLink.setAttribute('aria-label', objectValue.replace(/&shy;/g, ''));
        }
    }
}