checkActiveLinks();
checkDarkMode(konami);
initScrollAnimations();
Array.from(document.getElementsByTagName('img')).map(img => {
    clearImageFormatting(img);
    altFromSource(img);
})