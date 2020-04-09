// DOM
import processAnchor from './dom/processAnchor.js';
import altFromSrc from './dom/altFromSrc.js';
import addCodepenFallback from './dom/addCodepenFallback.js';
import findActive from './dom/findActive.js';
import tooltip from './dom/tooltip.js';

// ACTIONS
import toggleDarkMode from './actions/toggleDarkMode.js';
import skipToContent from './actions/skipToContent.js';

import { listen } from './utils.js';


// LINK tags
for (let link of document.getElementsByTagName('link')) {
    if (link.href.includes('.css') && link.getAttribute('defer')) link.rel = 'stylesheet';
}


// Codepens
for (let p of document.getElementsByTagName('p')) {

    if (!p['data-slug-hash']) continue;
    if (p.innerHTML == "") p.innerHTML = "&#x1F62C; Yikes... this pen isn't available.";

    addCodepenFallback(p);

}


// A tags
for (let a of document.getElementsByTagName('a')) processAnchor(a);


// IMG tags
for (let image of document.getElementsByTagName('img')) {

    let alt = image.getAttribute('alt');

    if (!alt) {
        alt = altFromSrc(image);
        image.setAttribute('alt', alt);
    }

    image.insertAdjacentElement('afterend', tooltip(alt));
    image.parentElement.classList.add('has_img');

}


// NAV
let nav = document.getElementById('nav');
let navItems = nav.getElementsByTagName('a');
let active = findActive(navItems);

if (active) {
    active.classList.add('active');
    active.setAttribute('aria-current', 'page');
}


// DARK MODE
let darkModeToggle = document.getElementById('dark_mode_toggle');
listen(darkModeToggle, toggleDarkMode);


// SKIP LINK
let skipLink = document.getElementById('skip_link');
listen(skipLink, skipToContent);