// IMPORTS
import { capitalize, altFromSource } from './modules/helpers.js';
import { checkActiveLinks } from './modules/checkActiveLinks.js';
import { insertNav } from './modules/insertNav.js';
import { initScrollAnimations } from './modules/scrollAnimations.js';
import { getProjects, getLocalContent } from './modules/projects.js';


function init() {

    // set onload attribute of body element to add loaded class
    document.body.setAttribute('onload', 'document.body.classList.add(`loaded`)');

    insertNav();
    checkActiveLinks();

    // populate sub nav and indicates active page
    const area = window.location.pathname.split('/').reverse()[2];
    const subNav = document.getElementById('sub-nav');
    if (subNav) {
        fetch('/sitemap.json')
            .then(response => response.json())
            .then(siteMap => {
                siteMap[area].map(page => {
                    let subNavItem = document.createElement('a');
                    subNavItem.setAttribute('href', `/${area}/${page.replace(/ /g, '-')}`);
                    subNavItem.classList.add('sub-nav__item');
                    pageTitle.replace(/-/g, ' ') === page ? subNavItem.classList.add('active') : null;
                    subNavItem.innerHTML = capitalize(page);
                    subNav.appendChild(subNavItem);
                })
            })
    }

    // ACCESSIBILITY: adds alt and lazy loading attributes to img elements
    document.querySelectorAll('img').forEach(e => {
        e.setAttribute('loading', 'lazy');
        !e.getAttribute('alt') ? e.setAttribute('alt', altFromSource(e)) : null;
    })

    // init scrolling animations
    initScrollAnimations();

    // fetch and insert design projects
    getProjects();

    // get
    getLocalContent();
}

init();