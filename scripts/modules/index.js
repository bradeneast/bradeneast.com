const main = document.getElementById('main');
const allImages = Array.from(document.getElementsByTagName('img'));
const staggerItems = document.querySelectorAll('[data-stagger]');
const consoleInfoStyles = `
    font-family: sans-serif;
    font-size: 14px;
    font-weight: 500;
`;

// Insert copy of boiler plate that shows after main content on mobile instead of before
function copyBoilerPlateForMobile() {

    const boilerPlateDesktop = document.querySelector('.nav-end');
    const boilerPlateMobile = boilerPlateDesktop.cloneNode(true);
    const newSection = document.createElement('section');

    newSection.appendChild(boilerPlateMobile);
    main.insertAdjacentElement('afterend', newSection);

}

checkActiveLinks();

copyBoilerPlateForMobile();

startTouchListeners();

staggerItems.forEach(item => {

    Stagger({
        parent: item,
        intensity: .3,
        direction: 'from',
        origin: 'top left',
    })

})

allImages.map(img => {

    clearImageFormatting(img);
    altFromSource(img);
    animateOnScroll(img, {
        threshold: .2
    });

})

console.info('%c ⓘ Here to hack? My website is hosted with Netlify, deployed with GitHub, and compiled with NodeJS. Have fun! \n - Braden ', consoleInfoStyles);