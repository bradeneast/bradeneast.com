function formatMedia() {

    // get image alt text from image src url
    function altFromSource(image) {

        let src = image.getAttribute('src');
        if (!src) return;
        let decoded = decodeURIComponent(src) || '';
        let name = decoded.split('/').pop();
        let readable = name.split('.').shift().replace(/-|\+/g, ' ');

        return readable || '';
    }

    // clear style, width, and height attributes from img elements
    function clearImageFormatting(image) {

        let removeAttributes = 'style, width, height, max-width, max-height'.split(', ');
        removeAttributes.map(attr => image.removeAttribute(attr));

        image.setAttribute('loading', 'lazy');
        return image;
    }


    // Format Images
    document.querySelectorAll('img').forEach(image => {
        clearImageFormatting(image);
        if (!image.getAttribute('alt')) image.setAttribute('alt', altFromSource(image));
    })


    // Format Videos
    document.querySelectorAll('video').forEach(video => {
        video.setAttribute('loop', true);
        video.setAttribute('muted', true);
        video.setAttribute('playsinline', true);
    })


    // Populate codepens with fallback content in case of error
    document.querySelectorAll('.codepen').forEach(pen => populateCodepen(pen));

    document.querySelectorAll('a').forEach(a => {
        if (a.getAttribute('href').includes('://')) a.setAttribute('target', '_blank');
    });

}

function playChildMedia(element) {
    element.querySelectorAll('video').forEach(video => video.play());
}

function pauseChildMedia(element) {
    element.querySelectorAll('video').forEach(video => video.pause());
}