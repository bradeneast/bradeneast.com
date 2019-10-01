// parses blogger json data
function parseBloggerJSON({ objectKey, objectValue, template }) {
    let e = template.querySelector(`.${objectKey}`);
    let projectLinks = template.querySelectorAll('a');
    let imageContainer = template.querySelector('.image');
    let parser = new DOMParser();

    if (objectKey == 'content') {
        let dom = parser.parseFromString(objectValue, 'text/html');
        let featuredImage = dom.querySelector('img');
        
        if (featuredImage && imageContainer) {
            clearImageFormatting(featuredImage);
            featuredImage.setAttribute('alt', altFromSource(featuredImage));
            imageContainer.appendChild(featuredImage);
        }

        if (projectLinks) {
            projectLinks.forEach(link => link.setAttribute('href', `/work/#${linkify(objectValue.split(' ').shift())}`));
        }
    }

    if (objectKey == 'title' && projectLinks) {
        projectLinks.forEach(link => link.setAttribute('aria-label', objectValue.replace(/&shy;/g, '')));
    }

    if (e) {
        Array.isArray(objectValue) ? e.innerHTML = objectValue.join(', ') : e.innerHTML = objectValue;
    }
}