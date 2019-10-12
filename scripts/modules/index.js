checkActiveLinks();

startTouchListeners();

const main = document.getElementById('main');
const allImages = Array.from(document.getElementsByTagName('img'));
const staggerItems = document.querySelectorAll('[data-stagger]');

const navEndDesktop = document.querySelector('.nav-end');
const navEndMobile = navEndDesktop.cloneNode(true);
const newSection = document.createElement('section');
newSection.appendChild(navEndMobile);
main.insertAdjacentElement('afterend', newSection);

staggerItems.forEach(item => {

    Stagger({
        parent: item,
        intensity: .3,
        direction: 'from',
        origin: 'top',
    })

})

allImages.map(img => {

    clearImageFormatting(img);
    altFromSource(img);

})

console.log('Here to hack? My website is hosted with Netlify, deployed with GitHub, and compiled with NodeJS. Have fun!\n- Braden');