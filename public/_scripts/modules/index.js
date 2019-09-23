// set onload attribute of body element to add loaded class
document.body.setAttribute('onload', 'document.body.classList.add(`loaded`)');

insertNav();
checkActiveLinks();
initScrollAnimations();

// fetch and insert design projects
getProjects();
initDarkMode(konami, darkModeSuccess);