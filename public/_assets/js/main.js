"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// get alt attribute from img src
var images = document.getElementsByTagName('img');
for (var i = 0; i < images.length; i++) {
    var img = images[i];
    addClass(img.parentElement, 'has-img');
    altFromSrc(img);
}
// add active class to appropriate nav item
var nav = document.getElementById('nav');
var navItems = nav.getElementsByTagName('a');
for (var i = 0; i < navItems.length; i++) {
    var url = location.pathname;
    var area = url.length <= 1 ? url : url.split('/')[1];
    var item = navItems[i];
    var href = item.getAttribute('href');
    if (href == area || href.split('/')[1].includes(area)) {
        item.classList.add('active');
        break;
    }
}
// @ts-nocheckif (IE) {
var pElems = document.getElementsByTagName('p');
for (var i = 0; i < pElems.length; i++) {
    var p = pElems[i];
    if (!p['data-slug-hash'])
        continue;
    if (p.innerHTML == "")
        p.innerHTML = "&#x1F62C; Yikes... this pen isn't available.";
    addCodepenFallback(p);
}
function addCodepenFallback(pen) {
    var codepenio = "https://codepen.io";
    var hash = pen.getAttribute("data-slug-hash");
    var user = pen.getAttribute("data-user");
    var fallback = document.createElement('p');
    if (!hash && !user)
        fallback.innerText = "This pen is unavailable.";
    if (hash) {
        var a = document.createElement('a');
        var link = [codepenio, 'pen', hash].join('/');
        a.href = link;
        fallback.innerText += 'View ';
        a.innerText = 'this pen';
        fallback.appendChild(a);
    }
    if (hash && user) {
        var a = document.createElement('a');
        var link = [codepenio, user].join('/');
        a.href = link;
        a.innerText = '@' + user;
        fallback.innerText += 'by ';
        fallback.appendChild(a);
    }
    addClass(fallback, 'codepen-fallback');
    fallback.innerHTML += " on CodePen.";
    pen.insertAdjacentElement("afterend", fallback);
}
// get image alt text from image src url
function altFromSrc(image) {
    if (!image || !image.getAttribute('src'))
        return;
    var src = image.getAttribute('src');
    var decoded = decodeURIComponent(src) || '';
    var name = decoded.split('/').pop();
    var readable = name.split('.').shift().replace(/-|\+/g, ' ');
    return readable || '';
}
// load non critical css
var links = document.getElementsByTagName('link');
for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link['defer'] || link.getAttribute('defer')) {
        link.rel = 'stylesheet';
    }
}
// open external links in a new tab
var anchors = document.getElementsByTagName('a');
for (var i = 0; i < anchors.length; i++) {
    var a = anchors[i];
    if (!(new RegExp(location.origin, 'i').test(a.href))) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    }
}
if (IE || !('fetch' in window)) {
    var searchWrapper = document.getElementById('search_wrapper');
    searchWrapper ? searchWrapper.style.display = 'none' : null;
}
else {
    var sitemap = fetch('/sitemap.json').then(function (r) { return r.json(); });
    var resultListElem = document.getElementById('search_results');
    var resultTemplate = document.getElementById('search_result_template');
}
function handleSearchInput(inputValue) {
    // clear previous search results
    var prevResults = resultListElem.querySelectorAll('.result');
    for (var i = 0; i < prevResults.length; i++) {
        prevResults[i].remove();
    }
    sitemap.then(function (pages) {
        // get matching pages from sitemap
        var matchProps = ['name'];
        var results = search(inputValue, pages, matchProps);
        if (!results)
            return;
        // populate result template with new info for each page
        for (var r in results) {
            var _a = results[r], content = _a.content, matchedBy = _a.matchedBy;
            var template = resultTemplate.cloneNode(true);
            var dynamic = new RegExp('result\..+?(?=[\W< `"\'])', 'gi');
            var dynamicMatches = template.innerHTML.match(dynamic) || [];
            for (var m in dynamicMatches) {
                var match = dynamicMatches[m];
                var query = match.replace('result.', '');
                var value = valueIn(content, query);
                if (matchProps.indexOf(query) > -1) {
                    var marked = value.replace(matchedBy[0], '<mark>' + matchedBy[0] + '</mark>');
                    template.innerHTML = template.innerHTML.replace(match, marked);
                }
                else {
                    template.innerHTML = template.innerHTML.replace(match, value);
                }
            }
            template.id = '';
            template.classList.add('result');
            resultListElem.appendChild(template);
        }
    });
}
// @ts-nocheck
var darkModeToggle = document.getElementById('dark_mode_toggle');
function toggleDarkMode() {
    var dmName = 'dark_mode';
    var dm = JSON.parse(localStorage.getItem(dmName));
    document.documentElement.classList.toggle(dmName, !dm);
    localStorage.setItem(dmName, JSON.stringify(!dm));
    document.activeElement.blur();
}
// listen for dark mode toggle
darkModeToggle.addEventListener('click', toggleDarkMode);
function addClass(elem, className) {
    var classList = elem.getAttribute('class');
    elem.setAttribute('class', classList + ' ' + className);
}
function valueIn(object, query) {
    if (query === void 0) { query = ''; }
    var props = query.split('.');
    var value = __assign({}, object);
    for (var p in props) {
        var prop = props[p];
        if (!value[prop])
            return '';
        value = value[prop];
    }
    return value;
}
function search(value, inArray, matchProps) {
    if (!value.length)
        return;
    var search = new RegExp(value, 'gi');
    var results = [];
    for (var i in inArray) {
        var obj = inArray[i];
        matchProps = matchProps.length ? matchProps : Object.keys(obj);
        for (var q in matchProps) {
            var prop = matchProps[q];
            var value = valueIn(obj, prop);
            if (search.test(value)) {
                var result = {
                    content: obj,
                    matchedBy: value.match(search)
                };
                if (results.indexOf(result) > -1)
                    return;
                results.push(result);
            }
        }
    }
    return results;
}
