// get image title from image url
function altFromSource(element) {

    let src = element.getAttribute('src');
    let alt;

    if (typeof src === 'string') {

        let srcName = decodeURIComponent(src).split('/').pop();

        srcName ? alt = srcName.split('.').shift().replace(/-|\+/g, ' ') : null;

    }

    return alt;

}

// clear style, width, and height attributes from all passed img elements
function clearImageFormatting() {

    const removeAttributes = 'style, width, height, max-width, max-height'.split(', ');

    document.querySelectorAll('img').forEach(image => {

        removeAttributes.map(attr => image.removeAttribute(attr));
        !image.getAttribute('alt') ? image.setAttribute('alt', altFromSource(image)) : null;
        image.setAttribute('loading', 'lazy');

    })

}

// this helper function stolen from a hero on stackoverflow
function dynamicSort(property) {

    let sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {
        let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
    }

}