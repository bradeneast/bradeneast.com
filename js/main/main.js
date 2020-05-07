// DOM
import altFromSrc from './dom/altFromSrc.js';
import addIcon from './dom/addIcon.js';

// FUNCTIONS
import { listen, playAudio } from './utils.js';

// ACTIONS
import toggleDarkMode from './actions/toggleDarkMode.js';
import toggleAudio from './actions/toggleAudio.js';
import skipToContent from './actions/skipToContent.js';
import backToTop from './actions/backToTop.js';


// LINK tags
for (let link of document.getElementsByTagName('link')) {
    if (link.href.includes('.css') && link.getAttribute('defer')) link.rel = 'stylesheet';
}


// IMG tags
for (let image of document.getElementsByTagName('img')) {

    let alt = image.getAttribute('alt');
    let tip = document.createElement('span');

    if (!alt) {
        alt = altFromSrc(image);
        image.setAttribute('alt', alt);
    }

    tip.innerText = alt;
    tip.classList.add('tooltip');
    image.insertAdjacentElement('afterend', tip);
    image.parentElement.classList.add('has_img');

}


// PRE tags
for (let pre of document.getElementsByTagName('pre')) {

    let icon = '&#x7B;/&#x7D;';
    let codeClass = pre.firstElementChild?.getAttribute('class')
    let lang = codeClass ? codeClass.trim().replace(/language\-/i, '') : null;

    if (lang) {
        addIcon(pre, `${icon} <small>${lang.toUpperCase()}</small>`);
        continue;
    }

    addIcon(pre, icon);

}


// BLOCKQUOTE tags
for (let blockquote of document.getElementsByTagName('blockquote')) {
    blockquote.classList.contains('warning') ? addIcon(blockquote, '!') : addIcon(blockquote, 'i');
}


// LINKS
for (let a of document.getElementsByTagName('a')) {

    if (a.href.includes(location.origin)) continue;
    if (!a.href.includes('http')) continue;

    a.target = '_blank';
    a.rel = 'noopener noreferrer';

}

for (let audio of document.getElementsByTagName('audio')) {
    audio.muted = JSON.parse(localStorage.getItem('muted'));
}


listen(document.getElementById('audio_toggle'), toggleAudio);
listen(document.getElementById('dark_mode_toggle'), toggleDarkMode);
listen(document.getElementById('skip_link'), skipToContent);
listen(document.getElementById('back_to_top'), backToTop);
listen(document.querySelectorAll('img'), (e) => playAudio('loboi'), 'mouseover');