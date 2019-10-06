checkActiveLinks();

checkDarkMode(konami);

document.querySelectorAll('img').forEach(img => {
    clearImageFormatting(img);
    altFromSource(img);
})

document.querySelectorAll('[data-stagger]').forEach(elem => {
    Stagger({
        parent: elem,
        intensity: .3,
        direction: 'from',
        origin: 'top'
    })
})

if (window.innerWidth < 1080) {
    const navEnd = document.querySelector('.nav-end').cloneNode(true);
    const main = document.getElementById('main');
    main.appendChild(navEnd);
}