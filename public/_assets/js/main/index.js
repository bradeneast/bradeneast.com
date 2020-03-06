// @ts-nocheck
// @ts-ignore
import addCodepenFallback from './addCodepenFallback.js';
import toggleDarkMode from './toggleDarkMode.js';
import altFromSrc from './altFromSrc.js';

// add active class to appropriate nav item
var nav = document.getElementById('nav');
var navItems = Array.from(nav.getElementsByTagName('a'));

for (var i = 0; i < navItems.length; i++) {

    var url = location.pathname;
    var area = url.length <= 1 ? url : url.split('/')[1];
    var item = navItems[i];
    var href = item.getAttribute('href');

    if (href == area || href.split('/')[1].includes(area)) {
        item.classList.add('active');
        break;
    }

}


// add codepen fallbacks
var pens = Array.from(document.getElementsByClassName('codepen'));
for (var i = 0; i < pens.length; i++) addCodepenFallback(pens[i]);


// get alt attribute from img src
var images = Array.from(document.getElementsByTagName('img'));

for (var i = 0; i < images.length; i++) {

    var img = images[i];

    img.parentElement.classList.add('has-img');
    altFromSrc(img);

}


// open external links in a new tab
var anchors = Array.from(document.getElementsByTagName('a'));

for (var i = 0; i < anchors.length; i++) {

    var a = anchors[i];

    if (!(new RegExp(location.origin, 'i').test(a.href))) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    }

}


// listen for dark mode toggle
var darkModeToggle = document.getElementById('dark_mode_toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);


// load non critical css
var links = document.getElementsByClassName('deferredCSS');
for (var i = 0; i < links.length; i++) links[i].rel = 'stylesheet';