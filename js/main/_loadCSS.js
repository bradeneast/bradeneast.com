// load non critical css
export default (link) => {

    if (link['defer'] || link.getAttribute('defer')) {

        link.rel = 'stylesheet';

    }

}