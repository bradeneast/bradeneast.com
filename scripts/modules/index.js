const main = document.getElementById('main');
const allImages = Array.from(document.getElementsByTagName('img'));

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

document.querySelectorAll('[data-stagger]').forEach(item => {

    staggerAnimations({
        parent: item,
        intensity: .2,
        direction: 'from',
        origin: 'top',
    })

})

allImages.map(img => {

    clearImageFormatting(img);
    altFromSource(img);

})