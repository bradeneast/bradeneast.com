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