import toggleDarkMode from './_toggleDarkMode.js';
import processAnchor from './_processAnchor.js';
import loadCSS from './_loadCSS.js';
import altFromSrc from './_altFromSrc.js';
import addCodepenFallback from './_addCodepenFallback.js';
import findActive from './_findActive.js';
import { listen } from './_utils.js';


// LINK tags
for (let link of document.getElementsByTagName('link')) loadCSS(link);


// P tags
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

// NAV
let nav = document.getElementById('nav');
let navItems = nav.getElementsByTagName('a');
let activeNavItem = findActive(navItems);
if (activeNavItem) activeNavItem.classList.add('active');


// DARK MODE
let darkModeToggle = document.getElementById('dark_mode_toggle');
listen(darkModeToggle, 'click', toggleDarkMode);