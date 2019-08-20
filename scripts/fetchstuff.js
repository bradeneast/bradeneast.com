// API Keys & IDs
const bloggerAPIKey = 'AIzaSyAIvo41apphAFmT6AzIDQfpWG3wzM1fvp8';
const portfolioID = '3486337941773520193';

function fetchAndInsert(request, dataSubset, wrapperID, templateID, parseMethod) {
    let fetched = fetchStuff(request, dataSubset);
    fetched.then(data => insertAllContent(wrapperID, templateID, fetched, parseMethod));
}

function fetchStuff(request, dataSubset) {
    return fetch(request).then(resp => resp.json()).then(data => {
        if (data[dataSubset]) {
            return data[dataSubset]
        } else {
            return data
        }
    })
}

function checkIfCurrent(item) {
    if (getURL().includes(URLify(item.title.split(' | ').shift()))) {
        return true;
    } else {
        return false;
    }
}

// STYLISH: clears style, width, and height attributes from all passed img elements
function clearImageFormatting(images) {
    images.forEach(image => {
        image.removeAttribute('style');
        image.removeAttribute('width');
        image.removeAttribute('height');
        image.setAttribute('loading', 'lazy');
    })
}

// INSERT CONTENT clones the passed template, calls the parseBlogContent() function, and then appends the new object as a child to the template wrapper
function insertCurrentContent(wrapperID, templateID, promise, parseMethod) {
    const wrapper = document.getElementById(wrapperID);
    const template = document.getElementById(templateID);
    promise.then(data => {
        data.map(item => {
            if (checkIfCurrent(item)) {
                let newObject = document.importNode(template.content, true);
                Object.keys(item).map(key => {
                    if (item[key]) {
                        parseMethod(item[key], key, newObject);
                    }
                });
                let wrapperChildren = Array.from(wrapper.children);
                wrapperChildren.map(child => {
                    if (child.id != templateID) {
                        child.remove();
                    }
                })
                wrapper.appendChild(newObject);
                clearImageFormatting(document.querySelectorAll('img'));
            }
        })
    })
}

function insertAllContent(wrapperID, templateID, promise, parseMethod) {
    const wrapper = document.getElementById(wrapperID);
    const template = document.getElementById(templateID);
    promise.then(data => {
            data.map(item => {
                if (!item.title || !checkIfCurrent(item)) {
                    let newObject = document.importNode(template.content, true);
                    Object.keys(item).map(key => {
                        if (item[key]) {
                            parseMethod(item[key], key, newObject);
                        }
                    });
                    newObject.querySelector('div').id = encodeURI(item.title);
                    wrapper.appendChild(newObject);
                    clearImageFormatting(document.querySelectorAll('img'));
                }
            })
        })
        .then(function () {
            removeIfFound('.loading', wrapperID);
            removeIfFound('.error', wrapperID);
        })
}

// Messiness that reads Blogger's post body (called by insertContent() function)
function parseBlogContent(content, contentName, container) {
    let e = container.querySelector(`[data-${contentName}]`);

    let featuredImg = null;
    if (contentName == 'content') {
        let parser = new DOMParser();
        featuredImg = parser.parseFromString(content, 'text/html').querySelector('img');
        featuredImg.setAttribute('alt', getTitleFromSource(featuredImg.getAttribute('src')));
    }
    if (container.querySelector('[data-image]') && featuredImg) {
        container.querySelector('[data-image]').insertAdjacentElement('beforeend', featuredImg);
    }
    if (Array.isArray(content) && e) {
        e.innerHTML = content.join().replace(/,/g, ', ');
    } else if (e) {
        e.innerHTML = content;
    }
    var a = container.querySelector('a');
    if (contentName == 'title' && a) {
        a.setAttribute('href', `/work/#${content.split(' | ').shift().replace(/ /g, '-').replace(/'/g, '').toLowerCase()}`);
        a.setAttribute('aria-label', content.replace(/&shy;/g, ''));
    }
}


// Messiness that reads local json data (called by insertContent() function)
function parseLocalContent(content, contentName, container) {
    let e = container.querySelector(`[data-${contentName}]`);

    if (contentName == 'icon' && e) {
        fetch(content)
            .then(response => response.text())
            .then(text => {
                e.insertAdjacentHTML('beforeend', text);
            })
    }
    if (contentName == 'image' && e) {
        var thisImage = document.createElement('img');
        thisImage.setAttribute('src', content);
        thisImage.setAttribute('alt', '');
        e.insertAdjacentElement('beforeend', thisImage);
    }
    if (contentName == 'background' && e) {
        e.setAttribute('style', `background-image: url(${content})`);
    }
    if (contentName != 'icon' && contentName != 'image' && contentName != 'background' && e) {
        if (Array.isArray(content)) {
            e.innerHTML = content.join().replace(/,/g, ', ');
        } else {
            e.innerHTML = content;
        }
    }
}