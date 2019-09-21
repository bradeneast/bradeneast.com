// IMPORTS
import { checkActiveLinks } from './modules/checkActiveLinks.js';
import { insertNav } from './modules/insertNav.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
import { getProjects } from './modules/projects.js';
import * as darkMode from './modules/darkMode.js';


function init() {

    // set onload attribute of body element to add loaded class
    document.body.setAttribute('onload', 'document.body.classList.add(`loaded`)');

    insertNav();
    checkActiveLinks();
    initScrollAnimations();

    // fetch and insert design projects
    getProjects();
    darkMode.init(darkMode.konami, darkMode.darkModeSuccess);
}

init();