// @ts-nocheck
// @ts-ignore


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


// add codepen fallbacks
let codePens = document.querySelectorAll('.codepen');
codePens.forEach(pen => addCodepenFallback(pen));


// get alt attribute from img src
let images = document.querySelectorAll('img');
images.forEach(img => altFromSrc(img));


// open external links in a new tab
let anchors = document.querySelectorAll('a');
anchors.forEach(a => {

    if (!a.href.includes(location.origin)) {
        a.target = '_blank';
        a.rel = 'noreferrer';
    }

})


// listen for dark mode toggle
let darkModeToggle = document.getElementById('dark_mode_toggle');
darkModeToggle.addEventListener('click', toggleDarkMode);