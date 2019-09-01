import { altFromSource, clearImageFormatting, linkify } from './helpers.js';
export { parseBloggerJSON, parseLocalJSON, parseLocalHTML };

// parses blogger json data
function parseBloggerJSON({ objectKey, objectValue, template }) {
    let e = template.querySelector(`[data-${objectKey}]`);
    let projectLink = template.querySelector('a');
    let parser = new DOMParser();
    let imageContainer = template.querySelector('[data-image]');

    if (objectKey == 'content' && imageContainer) {
        let imageElem = parser.parseFromString(objectValue, 'text/html').querySelector('img');
        if (imageElem) {
            clearImageFormatting(imageElem);
            imageElem.setAttribute('alt', altFromSource(imageElem));
            imageContainer.appendChild(imageElem);
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


// parses local json data
function parseLocalJSON({ objectKey, objectValue, template }) {
    let e = template.querySelector(`[data-${objectKey}]`);
    objectKey == 'background' && e ? e.setAttribute('style', `background-image: url(${objectValue})`) : null;
    objectKey == 'icon' && e ? fetch(objectValue).then(response => { e.insertAdjacentHTML('beforeend', response.text()) }) : null;

    if (e) {
        if (Array.isArray(objectValue)) {
            e.innerHTML = objectValue.join(', ');
        } else if (objectKey == 'image') {
            let image = document.createElement('img');
            image.setAttribute('src', objectValue);
            e.appendChild(image);
        } else if (objectValue && e) {
            e.innerHTML = objectValue;
        }
    }
}

function parseLocalHTML({ string, template }) {
    let parser = new DOMParser();
    parser.parseFromString(string, 'text/html');
}