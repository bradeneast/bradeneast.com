// HELPERS: returns the current active URL
function getURL() {
    return window.location.href;
}

// HELPERS: removes an element if found
function removeIfFound(elementQuery, parentQuery) {
    let p = document.getElementById(parentQuery);
    let e = p.querySelector(elementQuery);
    if (e) {
        e.remove();
    }
}

// HELPERS: change element classes if window is scrolled past a given threshold (in pixels)
function addClassIfScrolled(element, className, threshold) {
    let y = Math.round(window.scrollY);
    if (y > threshold) {
        element.classList.add(className);
    }
    if (y < threshold) {
        element.classList.remove(className);
    }
}

// HELPERS: converts a string to work as a URL
function URLify(string) {
    return string.toLowerCase().replace(/ /g, '-').replace(/'/g, '');
}

// HELPERS: returns first preceding sibling element matching a given selector
function prevUntil(elem, selector) {
    p = elem.previousElementSibling;
    while (!p.matches(selector)) {
        p = p.previousElementSibling;
    }
    return p;
}

// HELPERS: capitalizes first letter of a string
function capitalize(string) {
    var words = string.split(' ');
    var newWords = [];
    words.map(word => {
        newWords.push(word.charAt(0).toUpperCase() + word.slice(1));
    })
    return newWords.join().replace(/,/g, ' ');
}

// HELPERS: sorts array of objects by the value of the property you pass
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

// HELPERS: adds numbers together in an array
function getSum(total, n) {
    return total + Math.round(n);
}

// HELPERS: removes elements by a selector name (use like querySelectorAll)
function removeElementsBySelector(selector) {
    if (document.querySelectorAll(selector)) {
        var selected = Array.from(document.querySelectorAll(selector));
        selected.map(e => {
            e.remove();
        })
    }
}

// HELPERS: gets image title from image url
function getTitleFromSource(string) {
    return (decodeURIComponent(string).split('/').pop()).split('.').shift().replace(/-|\+/g, ' ');
}

// INSERT NAV
function toggleNav() {
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle.checked) {
        navToggle.checked = false;
    } else if (!navToggle.checked) {
        navToggle.checked = true;
    }
}
let nav = document.createElement('nav');
let navToggle = '<input tabindex="-1" aria-label="toggle navigation" type="checkbox" id="nav-toggle" />';
let navItemsContainer = `<div class="nav-items-container">
        <label tabindex="0" role="button" aria-label="toggle navigation menu" for="nav-toggle" id="hamburger" onkeypress="toggleNav()"></label>
        <a class="nav-item" href="/#work">Work</a>
        <a class="nav-item" href="/about/me">About</a>
        <a class="nav-item" href="/blog">Blog</a>
    </div>`
let logo = `<a href="/" aria-label="logo - link to homepage" class="logo" id="logo">
        <svg class="logo-squiggle" viewBox="0 0 168 216">
            <path fill="currentColor" d="M42.64,139.94H.38V76.06H60l-.61,1.57c-.56,1.31-1.2,2.73-1.88,4.23-2.8,6-6.53,13-9.87,21.3a89.14,89.14,0,0,0-4.36,13.92,60.76,60.76,0,0,0-1.42,17.11A50.25,50.25,0,0,0,42.64,139.94ZM58.51,63.88a41.26,41.26,0,0,0-11.14-8.5A109.55,109.55,0,0,0,30.65,48a193.15,193.15,0,0,0-19.06-5.52C7.9,41.63,4.15,40.85.38,40.13V63.88Zm81.38,150.86c-6.08-3.28-12.35-6.45-18.93-9.62s-13.37-6.31-20.28-9.7-14-7.1-21-11.19l-5.22-3.15c-1.83-1.1-3.92-2.43-5.87-3.81a74.33,74.33,0,0,1-11.78-10.05A57.36,57.36,0,0,1,46.71,152.6c-.08-.16-.13-.32-.21-.48H.38V216H142.12C141.37,215.59,140.64,215.14,139.89,214.74Zm-28-62.62c2.49,1.19,5,2.37,7.56,3.53,6.43,2.9,13.17,5.76,20.06,8.7s14,6,21.13,9.41c2.34,1.12,4.69,2.33,7,3.52V152.12ZM46,5.74A151.69,151.69,0,0,1,69.63,16.61a100.86,100.86,0,0,1,11.84,8A72.91,72.91,0,0,1,92.83,35.76a56.86,56.86,0,0,1,9.1,15.61,51.87,51.87,0,0,1,3,12.51h62.7V0H28C34.06,1.7,40.07,3.56,46,5.74ZM167.62,76.06H104.88a57.87,57.87,0,0,1-2.52,11.63c-.44,1.31-.89,2.59-1.38,3.83s-.91,2.23-1.37,3.3c-.91,2.09-1.83,4-2.73,5.86-3.62,7.3-6.95,13.35-9.19,18.73a48,48,0,0,0-2.47,7.15,16.94,16.94,0,0,0-.58,4.86,7.57,7.57,0,0,0,.69,2.92,12.49,12.49,0,0,0,2.56,3.47,31.71,31.71,0,0,0,2.36,2.13h77.37Z" />
        </svg>
        <svg class="logo-icon" viewBox="0 0 168 216">
            <path fill="currentColor" d="M167.62,63.88H.38V0H167.62Zm0,12.18H.38v63.88H167.62Zm0,76.06H.38V216H167.62Z"/>
        </svg>
    </a>`
let upDown = '<button id="up-down" tabindex="-1" aria-hidden="true" onclick="window.location.href = `#`;"><svg viewBox="0 0 18 9"><polyline stroke="currentColor" stroke-width="1.7" fill="none" points="1,8 9,0 17,8"></svg></button>';

nav.setAttribute('id', 'nav');
nav.insertAdjacentHTML('beforeend', logo + navItemsContainer);
document.body.insertAdjacentElement('afterbegin', nav);
document.body.insertAdjacentHTML('afterbegin', navToggle + upDown);

// checks url and adds 'active' class to nav links that match
const navItems = Array.from(document.querySelectorAll('.nav-item'));

function checkActiveLinks() {
    navItems.map(link => {
        var linkTitle = link.innerHTML.split('<svg')[0];

        if (getURL().toUpperCase().includes(linkTitle.toUpperCase())) {
            link.classList.add('active');
        }
        if (!getURL().toUpperCase().includes(linkTitle.toUpperCase())) {
            link.classList.remove('active');
        }
    })
}
checkActiveLinks();
navItems.map(item => {
    item.addEventListener('click', function () {
        setTimeout(() => {
            checkActiveLinks();
        }, 100);
    })
})

// STYLISH: sets onload attribute of body element to add loaded class
document.body.setAttribute('onload', 'document.body.classList.add(`loaded`)');

// STYLISH: populates sub nav and indicates active page
const pageArea = window.location.pathname.split('/').reverse()[2];
if (document.getElementById('sub-nav')) {
    populateSubNav(pageArea);
}

function populateSubNav(area) {
    let subNav = document.getElementById('sub-nav');
    fetch('/sitemap.json')
        .then(response => response.json())
        .then(siteMap => {
            siteMap[area].map(page => {
                let subNavItem = document.createElement('a');
                subNavItem.setAttribute('href', `/${area}/${page.replace(/ /g, '-')}`);
                subNavItem.classList.add('sub-nav__item');
                if (pageTitle.replace(/-/g, ' ') === page) {
                    subNavItem.classList.add('active');
                }
                subNavItem.innerHTML = capitalize(page);
                subNav.insertAdjacentElement('beforeend', subNavItem);
            })
        })
}

// ACCESSIBILITY: adds alt and lazy loading attributes to img elements
document.querySelectorAll('img').forEach(e => {
    e.setAttribute('loading', 'lazy');
    if (!e.getAttribute('alt')) {
        e.setAttribute('alt', getTitleFromSource(e.getAttribute('src')));
    }
})

// ACCESSIBILITY: adds aria label to each heading element with text content
const ariaElems = ['h1', 'h2', 'h3'];
ariaElems.map(tag => {
    document.querySelectorAll(tag).forEach(e => {
        e.setAttribute('aria-label', e.textContent);
        e.setAttribute('tabindex', 0);
    })
})


// scroll effects
let bodyHeight = document.body.offsetHeight;
let footerHeight = document.querySelector('footer').offsetHeight;
const upDownArrow = document.getElementById('up-down');
const waveOverlays = document.querySelectorAll('.wave-overlay');

window.addEventListener('scroll', function (e) {
    addClassIfScrolled(nav, 'compact', 600);
    addClassIfScrolled(upDownArrow, 'up', 600);

    if (window.scrollY >= bodyHeight - footerHeight - window.innerHeight) {
        upDownArrow.classList.remove('up');
    }
    if (waveOverlays) {
        waveOverlays.forEach(e => {
            e.style.setProperty('--overlay-position', Math.round(window.scrollY) + 'px');
        })
    }
});

setTimeout(() => {
    ScrollOut({
        once: true,
        threshold: .1
    })
}, 1000);