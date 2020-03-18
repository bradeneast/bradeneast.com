import toggleDarkMode from './_toggleDarkMode.js';
import processAnchor from './_processAnchor.js';
import loadCSS from './_loadCSS.js';
import altFromSrc from './_altFromSrc.js';
import addCodepenFallback from './_addCodepenFallback.js';
import findActive from './_findActive.js';
import { listen } from './_utils.js';
import tooltip from './_tooltip.js';
import skipToContent from './_skipToContent.js';


// LINK tags
for (let link of document.getElementsByTagName('link')) loadCSS(link);


// Codepens
for (let p of document.getElementsByTagName('p')) {

    if (!p['data-slug-hash']) continue;
    if (p.innerHTML == "") p.innerHTML = "&#x1F62C; Yikes... this pen isn't available.";

    addCodepenFallback(p);

}


for (let pre of document.getElementsByTagName('pre')) {

    if (pre.offsetWidth >= pre.scrollWidth) continue;

    pre.classList.add('is_overflowing');

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
listen(darkModeToggle, 'click', toggleDarkMode);

// SKIP LINK
let skipLink = document.getElementById('skip_link');
listen(skipLink, 'click', skipToContent);