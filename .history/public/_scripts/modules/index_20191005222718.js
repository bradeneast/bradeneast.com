const main = document.getElementById('main');
const navEndDesktop = document.querySelector('.nav-end');
const navEndMobile = navEndDesktop.cloneNode(true);
const newSection = document.createElement('section');
const allImages = document.querySelectorAll('img');
const staggerItems = document.querySelectorAll('[data-stagger]');

newSection.appendChild(navEndMobile);
main.appendChild(newSection);

allImages.forEach(img => {

    clearImageFormatting(img);
    altFromSource(img);

})

staggerItems.forEach(elem => {

    Stagger({
        parent: elem,
        intensity: .3,
        direction: 'from',
        origin: 'top'
    })

})

checkDarkMode(konami);

checkActiveLinks();