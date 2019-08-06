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

// INSERT CONTENT clones the passed template, calls the parseBlogContent() function, and then appends the new object as a child to the template wrapper
function insertCurrentContent(wrapperID, templateID, promise, parseMethod) {
    const wrapper = document.getElementById(wrapperID);
    const template = document.getElementById(templateID);
    promise.then(data => {
        data.forEach(item => {
            if (checkIfCurrent(item)) {
                let newObject = document.importNode(template.content, true);
                Object.keys(item).forEach(key => {
                    if (item[key]) {
                        parseMethod(item[key], key, newObject);
                    }
                });
                let wrapperChildren = Array.from(wrapper.children);
                wrapperChildren.forEach(child => {
                    if (child.id != templateID) {
                        child.remove();
                    }
                })
                wrapper.appendChild(newObject);
                clearImageFormatting();
            }
        })
    })
}

function insertAllContent(wrapperID, templateID, promise, parseMethod) {
    const wrapper = document.getElementById(wrapperID);
    const template = document.getElementById(templateID);
    promise.then(data => {
            data.forEach(item => {
                if (!item.title || !checkIfCurrent(item)) {
                    let newObject = document.importNode(template.content, true);
                    Object.keys(item).forEach(key => {
                        if (item[key]) {
                            parseMethod(item[key], key, newObject);
                        }
                    });
                    newObject.querySelector('div').id = encodeURI(item.title);
                    wrapper.appendChild(newObject);
                    clearImageFormatting();
                }
            })
        })
        .then(function () {
            removeIfFound('.loading', wrapperID);
            removeIfFound('.error', wrapperID);
        })
}

// Messiness that reads Blogger API json data (called by insertContent() function)
function parseBlogContent(content, contentName, container) {
    let e = container.querySelector(`[data-${contentName}]`);

    let featuredImg = null;
    if (contentName == 'content') {
        let parser = new DOMParser();
        featuredImg = parser.parseFromString(content, 'text/html').querySelector('img');
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