// get image title from image url
function altFromSource(element) {
    let src = element.getAttribute('src');
    return (decodeURIComponent(src).split('/').pop()).split('.').shift().replace(/-|\+/g, ' ');
}

// clear style, width, and height attributes from all passed img elements
function clearImageFormatting() {
    const removeAttributes = 'style, width, height, max-width, max-height'.split(', ');
    document.querySelectorAll('img').forEach(image => {
        removeAttributes.map(attr => image.removeAttribute(attr));
        image.setAttribute('loading', 'lazy');
        !image.getAttribute('alt') ? image.setAttribute('alt', altFromSource(image)) : null;
    })
}

function linkify(string) {
    return string.replace(/ /g, '-').replace(/[^A-Za-z0-9]/g, '').toLowerCase();
}

function removeEmpty(array) {
    return array.filter(e => e != "");
}

function getURL() {
    return window.location.href;
}