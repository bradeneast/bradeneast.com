// capitalize first letter of a string
export function capitalize(string) {
    var words = string.split(' ');
    var newWords = [];
    words.map(word => {
        newWords.push(word.charAt(0).toUpperCase() + word.slice(1));
    })
    return newWords.join().replace(/,/g, ' ');
}

// get image title from image url
export function altFromSource(element) {
    let src = element.getAttribute('src');
    return (decodeURIComponent(src).split('/').pop()).split('.').shift().replace(/-|\+/g, ' ');
}

// clear style, width, and height attributes from all passed img elements
export function clearImageFormatting() {
    document.querySelectorAll('img').forEach(image => {
        image.removeAttribute('style');
        image.removeAttribute('width');
        image.removeAttribute('height');
        image.removeAttribute('max-width');
        image.removeAttribute('max-height');
        image.setAttribute('loading', 'lazy');
        !image.getAttribute('alt') ? image.setAttribute('alt', altFromSource(image)) : null;
    })
}

export function linkify(string) {
    return string.replace(/ /g, '-').replace(/'/g, '').toLowerCase();
}

export function removeLoadingAnimations({
    from
}) {
    from.querySelectorAll('.loading').forEach(loadingElem => {
        loadingElem.remove();
    })
}

export function removeEmpty(array) {
    return array.filter((e) => {
        return e != ""
    })
}

export function hideTargetedElement({
    fromParent
}) {
    let target = window.location.hash.replace('#', '');
    Array.from(fromParent.children).map(child => {
        child.id == target ? child.classList.add('hidden') : child.classList.remove('hidden');
    })
}

export function getURL() {
    return window.location.href;
}