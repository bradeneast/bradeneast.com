// Check for active navigation link
document.querySelectorAll('.nav-item').forEach(link => {

    const linkTitle = link.textContent;
    const url = window.location.href.toLowerCase();
    if (linkTitle) toggleClass(link, 'active', url.includes(linkTitle.toLowerCase()));

})

// Insert copy of boiler plate that shows after main content on mobile instead of before
const main = document.getElementById('main');
const boilerPlateDesktop = document.querySelector('.nav-end');
const boilerPlateMobile = boilerPlateDesktop.cloneNode(true);
const boilerPlateCopy = document.createElement('section');

boilerPlateCopy.appendChild(boilerPlateMobile);
main.insertAdjacentElement('afterend', boilerPlateCopy);


document.querySelectorAll('[data-stagger]').forEach(item => {

    staggerAnimations({
        parent: item,
        intensity: .2,
        direction: 'from',
        origin: 'top',
    })

})

document.querySelectorAll('img').forEach(img => {
    clearImageFormatting(img);
    altFromSource(img);
})

// Populate codepens with fallback content in case of error
document.querySelectorAll('.codepen').forEach(pen => populateCodepen(pen));

document.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href').includes('://')) a.setAttribute('target', '_blank');
});