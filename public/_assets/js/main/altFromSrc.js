// get image alt text from image src url
function altFromSrc (image) {

    if (!image || !image.getAttribute('src')) return;

    var src = image.getAttribute('src');
    var decoded = decodeURIComponent(src) || '';
    var name = decoded.split('/').pop();
    var readable = name.split('.').shift().replace(/-|\+/g, ' ');

    return readable || '';

}