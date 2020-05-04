"use strict";
document.body.style.opacity = 0;
var sitemap = fetch('/sitemap.json').then(function (r) { return r.json(); });
var include = 'blog/';
var exclude = '/blog/categories/';
sitemap.then(function (pages) {
    var _a;
    try {
        var filtered = [];
        for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            var page = pages_1[_i];
            if (page.href.includes(include) && !page.href.includes(exclude)) {
                filtered.push(page);
            }
        }
        var index = Math.round((filtered.length - 1) * Math.random());
        window.location = (_a = filtered[index]) === null || _a === void 0 ? void 0 : _a.href;
    }
    catch (e) {
        console.log(e);
        document.body.style.opacity = 1;
    }
});
