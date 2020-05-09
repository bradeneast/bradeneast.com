// get image alt text from image src url
export default (src = '') => {

    if (!src || !src.length) return;

    let decoded = decodeURIComponent(src) || '';
    let name = decoded.split('/').pop();
    let readable = name?.split('.')?.shift()?.replace(/-|\+/g, ' ');

    return readable || '';

}