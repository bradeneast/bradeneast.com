document.body.style.opacity = 0;
function bail(err) {
    console.log(err);
    document.body.style.opacity = 1;
}
try {
    var sitemap = fetch('/sitemap.json').then(function (r) { return r.json(); });
    var include_1 = /blog\//i;
    var exclude_1 = /\/blog\/categories/i;
    sitemap.then(function (pages) {
        var _a;
        try {
            var filtered = [];
            for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
                var page = pages_1[_i];
                if (include_1.test(page.href) && !exclude_1.test(page.href)) {
                    filtered.push(page);
                }
            }
            var index = Math.round((filtered.length - 1) * Math.random());
            window.location = (_a = filtered[index]) === null || _a === void 0 ? void 0 : _a.href;
        }
        catch (e) {
            bail(e);
        }
    });
}
catch (e) {
    bail(e);
}
