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

// FORMS: adds labels for form inputs based on input ID
if (document.querySelector('form')) {
    const contactForm = document.getElementById('contact-form');
    var inputs = Array.from(contactForm.querySelectorAll('input'));

    inputs.map(input => {
        var inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', input.id);
        inputLabel.innerHTML = input.id.replace(/-/g, '&nbsp;');
        var inputTitle = document.createElement('h4');
        inputTitle.innerHTML = input.name.replace(/-/g, '&nbsp;');

        if (input.type == 'text' | input.type == 'email' | input.type == 'number') {
            input.insertAdjacentElement('beforebegin', inputTitle);
        }
        if (input.type == 'radio' | input.type == 'checkbox') {
            input.insertAdjacentHTML('afterend', '<br>');
            input.insertAdjacentElement('afterend', inputLabel);
        }
    })
}

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

// SCROLL EFFECTS
setTimeout(() => {

    let topNav = document.getElementById('nav');
    if (topNav) {

        // STYLISH: checks url and adds 'active' class to nav links that match
        let navItems = Array.from(topNav.querySelectorAll('.nav-item'));

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

        if (topNav.querySelector('.nav-item')) {
            checkActiveLinks();
        }

        navItems.map(link => {
            link.addEventListener('click', function () {
                setTimeout(() => {
                    checkActiveLinks();
                }, 100);
            })
        })
    }

    const footerHeight = document.querySelector('footer').offsetHeight;
    let bodyHeight = document.body.offsetHeight;
    const upDownArrow = document.getElementById('up-down');
    const waveOverlays = document.querySelectorAll('.wave-overlay');

    window.addEventListener('scroll', function (e) {
        addClassIfScrolled(topNav, 'compact', 600);
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

    ScrollOut({
        once: true,
        threshold: .1
    })

}, 1000)

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