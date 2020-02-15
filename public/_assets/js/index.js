// @ts-nocheck


// add codepen fallbacks
let codePens = document.querySelectorAll('.codepen');
import addCodepenFallback from './addCodepenFallback.js';
codePens.forEach(pen => addCodepenFallback(pen));


// get alt attribute from img src
let images = document.querySelectorAll('img');
import altFromSrc from './altFromSrc.js';
images.forEach(img => altFromSrc(img));


// add active class to appropriate nav item
let navItems = document.querySelectorAll('nav a');

for (let i = 0; i < navItems.length; i++) {

    let url = location.pathname;
    let area = url.length <= 1 ? url : url.split('/')[1];
    let item = navItems[i];
    let href = item.getAttribute('href');

    if (href == area || href.split('/')[1].includes(area)) {
        item.classList.add('active');
        break;
    }

}

// open external links in a new tab
let anchors = document.querySelectorAll('a');
anchors.forEach(a => {

    if (a.href.includes('https://')) {
        a.target = '_blank';
        a.rel = 'noreferrer';
    }

})


let darkModeToggle = document.getElementById('dark_mode_toggle');
import toggleDarkMode from './darkMode.js';
darkModeToggle.addEventListener('click', toggleDarkMode);