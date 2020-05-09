// @ts-nocheck
import altFromSrc from './altFromSrc.js';

export default (elem) => {

    let alt = '';
    let tip = document.createElement('span');

    if (elem.src) {
        alt = elem.getAttribute('alt') || altFromSrc(elem.src);
        elem.setAttribute('alt', alt);
    } else {
        let firstSource = elem.getElementsByTagName('source')[0];
        alt = altFromSrc(firstSource.src);
        elem.setAttribute('title', alt);
    }

    tip.innerText = alt;
    tip.classList.add('tooltip');
    elem.insertAdjacentElement('afterend', tip);

}