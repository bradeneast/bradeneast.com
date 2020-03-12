// get image alt text from image src url
export default (image) => {

    if (!image || !image.getAttribute('src')) return;

    let src = image.getAttribute('src');
    let decoded = decodeURIComponent(src) || '';
    let name = decoded.split('/').pop();
    let readable = name.split('.').shift().replace(/-|\+/g, ' ');

    return readable || '';

}