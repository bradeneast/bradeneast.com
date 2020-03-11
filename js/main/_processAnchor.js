// open external links in a new tab
export default (a) => {

    if (!(new RegExp(location.origin, 'i').test(a.href))) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    }

}