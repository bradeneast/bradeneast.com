// @ts-nocheck
// DOM
import appendToolTip from './dom/appendToolTip.js';
import addIcon from './dom/addIcon.js';
import quicklink from './quicklink.js';

// FUNCTIONS
import { listen, playAudio, escapeRegex } from './utils.js';

// ACTIONS
import toggleDarkMode from './actions/toggleDarkMode.js';
import toggleAudio from './actions/toggleAudio.js';
import skipToContent from './actions/skipToContent.js';
import backToTop from './actions/backToTop.js';

// INTERNET EXPLORER CHECK
if (navigator.userAgent.indexOf('MSIE') > -1 || navigator.appVersion.indexOf('Trident/') > -1) {

    let retroModeStyles = document.createElement('link');

    retroModeStyles.rel = 'stylesheet';
    retroModeStyles.href = '/_assets/css/retro_mode.min.css';
    retroModeStyles.setAttribute('type', 'text/css');
    document.documentElement.appendChild(retroModeStyles);

}


// LINK tags
for (let link of document.getElementsByTagName('link')) {
    if (/\.css/i.test(link.href) && link.getAttribute('defer')) link.rel = 'stylesheet';
}


// IMG tags
for (let image of document.getElementsByTagName('img')) {
    try { image.parentElement.classList.add('has-media') } catch (e) { }
    appendToolTip(image);
}


// VIDEO tags
for (let video of document.getElementsByTagName('video')) {
    try { video.parentElement.classList.add('has-media') } catch (e) { }
    appendToolTip(video);
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

    let origin = new RegExp(escapeRegex(location.origin), 'i');
    if (origin.test(a.href)) continue;
    if (!/http/i.test(a.href)) continue;

    a.target = '_blank';
    a.rel = 'noopener noreferrer';

}


listen(document.getElementById('audio_toggle'), toggleAudio);
listen(document.getElementById('dark_mode_toggle'), toggleDarkMode);
listen(document.getElementById('skip_link'), skipToContent);
listen(document.getElementById('back_to_top'), backToTop);
listen(document.querySelectorAll('img'), function () { playAudio('loboi') }, 'mouseover');
quicklink.listen();


if (JSON.parse(localStorage.getItem('muted'))) {
    for (let audio of document.getElementsByTagName('audio')) {
        audio.muted = true;
    }
}