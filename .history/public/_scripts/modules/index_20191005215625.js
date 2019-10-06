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
    const navEndDesktop = document.querySelector('.nav-end');
    const navEndMobile = navEndDesktop.cloneNode(true);
    const main = document.getElementById('main');

    navEndDesktop.remove();
    main.appendChild(navEndMobile);
}