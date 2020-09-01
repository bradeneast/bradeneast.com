var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function () { var b = function (a, c) {
    if (c === void 0) { c = document; }
    return c.querySelectorAll(a);
}; function f() { return fetch("//bradeneast.com/sitemap.xml").then(function (a) { return a.text(); }).then(function (a) { return new DOMParser().parseFromString(a, "text/xml"); }); } var g = [], i = ["/blog/.+"]; setTimeout(function () { return b(".hidden").forEach(function (a) { return a.classList.remove("hidden"); }); }, 1e3); f().then(function (a) {
    var e_1, _a;
    try {
        for (var _b = __values(b("loc", a)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var e = _c.value;
            g.push(e.textContent.trim());
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var c = new RegExp("(" + i.join(")|(") + ")"), d = g.filter(function (e) { return c.test(e); }), h = Math.round((d.length - 1) * Math.random());
    d[h] && (window.location = d[h]);
}); })();
