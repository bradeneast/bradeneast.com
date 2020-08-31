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
(function () { var z = (function () {
    function z(_a) {
        var _b = _a === void 0 ? {} : _a, a = _b.onload, _c = _b.selector, d = _c === void 0 ? "a[href^=\"" + window.location.origin + "\"]:not([data-no-schwifty]), a[href^=\"/\"]:not([data-no-schwifty])" : _c, _d = _b.cacheLimit, g = _d === void 0 ? 85 : _d, _e = _b.preserveScroll, w = _e === void 0 ? !1 : _e, _f = _b.transitioningAttribute, x = _f === void 0 ? "data-schwifty" : _f, q = _b.preserveAttributes;
        var y = q === !0;
        typeof q != "object" && (q = { documentElement: y, head: y, body: y });
        var m = "schwifty-preload", n = 'link[rel="stylesheet"]', e = document, o = e.documentElement, r = "innerHTML", k = new Map(), L = new IntersectionObserver(function (b, c) { return b.forEach(function (p) { var t = p.isIntersecting, u = p.target.href; if (!t && t != void 0)
            return; k.size >= g && k["delete"](k.keys()[0]), k.get(u) ? c.unobserve(p.target) : N(u); }); }, { threshold: .5 }), F = function (b, c) {
            if (c === void 0) { c = e; }
            return c.querySelector(b);
        }, s = function (b, c) {
            if (c === void 0) { c = e; }
            return c.querySelectorAll(b);
        }, M = function (b) { return b.target.closest(d) || {}; }, G = function () { return s(d).forEach(function (b) { return L.observe(b); }); }, j = function (b, c) {
            if (c === void 0) { c = window; }
            return c.dispatchEvent(new Event(b));
        }, H = function (b) { return b.replace(/m?s/gi, ""); }, I = function () { var b = getComputedStyle(o); return (H(b.transitionDelay) + H(b.transitionDuration)) * 1e3; }, N = function (b) { if (!b)
            return; var c = new XMLHttpRequest(); c.onreadystatechange = function () { this.status == 200 && k.set(b, c.responseXML); }, c.open("GET", b, !0), c.responseType = "document", c.send(); }, J = function (b) {
            var e_1, _a;
            var c = k.get(b);
            if (!c) {
                location = b;
                return;
            }
            history.replaceState(null, null, b), s(n + ":not(." + m + ")").forEach(function (f) { var h = f.href.replace(location.origin, ""), i = F(n + "." + m + "[href=\"" + h + "\"]"), K = F(n + "[href=\"" + h + "\"]", c); K && !i && (f.classList.add(m), o.append(f)), !K && i && i.remove(); });
            var p = n + ":not(." + m + ")", t = n + "." + m, u = s(p, c), O = s(t);
            var _loop_1 = function (f) {
                Array.from(u).some(function (h) { return h.href == f.href; }) || f.remove();
            };
            try {
                for (var O_1 = __values(O), O_1_1 = O_1.next(); !O_1_1.done; O_1_1 = O_1.next()) {
                    var f = O_1_1.value;
                    _loop_1(f);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (O_1_1 && !O_1_1.done && (_a = O_1["return"])) _a.call(O_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            ["body", "head", "documentElement"].forEach(function (f) {
                var e_2, _a, e_3, _b;
                if (q[f])
                    return;
                var h = e[f];
                try {
                    for (var _c = __values(h.attributes), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var i = _d.value;
                        h.removeAttribute(i.name);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    for (var _e = __values(c[f].attributes), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var i = _f.value;
                        h.setAttribute(i.name, i.value);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }), o.setAttribute(x, "out"), j("unload"), setTimeout(function () { j("loading", e), e.body[r] = c.body[r], e.head[r] = c.head[r], o.setAttribute(x, "in"), j("interactive", e), j("DOMContentLoaded", e), w || scrollTo(0, 0), a && a(), G(), setTimeout(function () { return o.removeAttribute(x); }, I()), j("complete", e), j("load"); }, I());
        };
        G(), addEventListener("popstate", function (b) { return J(location.href); }), addEventListener("click", function (b) { var c = M(b).href; c && (b.preventDefault(), j("beforeunload"), history.pushState(null, null, location.href), J(c)); });
    }
    return z;
}());  var l = function (a, d) {
    if (d === void 0) { d = document; }
    return d.querySelector(a);
}, v = function (a, d) {
    if (d === void 0) { d = document; }
    return d.querySelectorAll(a);
}, C = function (a, d) {
    if (d === void 0) { d = ""; }
    var g = document.createElement(a);
    return g.innerHTML = d, g;
}, E = function (a, d) { return d == void 0 ? JSON.parse(localStorage.getItem(a)) : localStorage.setItem(a, JSON.stringify(d)); }, B = function (a) { var d = E(a); document.documentElement.classList.toggle(a, !d), E(a, !d); }; function A(a) {
    var _a, _b;
    if (a === void 0) { a = ""; }
    var d = decodeURIComponent(a) || "", g = d.split("/").pop(), w = (_b = (_a = g === null || g === void 0 ? void 0 : g.split(".")) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.replace(/-|\+/g, " ");
    return w || "";
} function D() {
    var e_4, _a, e_5, _b, e_6, _c;
    var _d;
    var _loop_2 = function (a) {
        var d = l("#" + a + "_toggle");
        d && d.addEventListener("click", function () { return B(a); });
    };
    try {
        for (var _e = __values(["dark_mode", "muted"]), _f = _e.next(); !_f.done; _f = _e.next()) {
            var a = _f.value;
            _loop_2(a);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_a = _e["return"])) _a.call(_e);
        }
        finally { if (e_4) throw e_4.error; }
    }
    try {
        for (var _g = __values(v("img")), _h = _g.next(); !_h.done; _h = _g.next()) {
            var a = _h.value;
            if ((_d = a.title) === null || _d === void 0 ? void 0 : _d.length)
                continue;
            a.title = a.alt ? a.alt : A(a.src), a.parentElement.classList.add("has-img");
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_h && !_h.done && (_b = _g["return"])) _b.call(_g);
        }
        finally { if (e_5) throw e_5.error; }
    }
    if (l(".codepen")) {
        var a = C("script");
        a.src = "https://static.codepen.io/assets/embed/ei.js", a.async = !0, document.body.append(a);
    }
    var _loop_3 = function (a) {
        var d = l("button", a), g = l("iframe", a);
        d.addEventListener("click", function () { g.src = g.getAttribute("data-src"), a.classList.add("loaded"); });
    };
    try {
        for (var _j = __values(v(".embedded_project")), _k = _j.next(); !_k.done; _k = _j.next()) {
            var a = _k.value;
            _loop_3(a);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_k && !_k.done && (_c = _j["return"])) _c.call(_j);
        }
        finally { if (e_6) throw e_6.error; }
    }
} D(); new z({ preserveAttributes: !0, onload: D }); })();
