import toggleDarkMode from './_toggleDarkMode.js';
import processAnchor from './_processAnchor.js';
import loadCSS from './_loadCSS.js';
import altFromSrc from './_altFromSrc.js';
import addCodepenFallback from './_addCodepenFallback.js';
import findActive from './_findActive.js';

let darkModeToggle = document.getElementById('dark_mode_toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);


// LINK tags
for (let link of document.getElementsByTagName('link')) loadCSS(link);


// A tags
for (let a of document.getElementsByTagName('a')) processAnchor(a);


// IMG tags
for (let image of document.getElementsByTagName('img')) {
    image.parentElement.classList.add('has-img');
    altFromSrc(image);
}


// P tags
for (let p of document.getElementsByTagName('p')) {
    if (!p['data-slug-hash']) continue;
    if (p.innerHTML == "") p.innerHTML = "&#x1F62C; Yikes... this pen isn't available.";
    addCodepenFallback(p);
}

// NAV
let nav = document.getElementById('nav');
let navItems = nav.getElementsByTagName('a');
let activeNavItem = findActive(navItems);
if (activeNavItem) activeNavItem.classList.add('active');