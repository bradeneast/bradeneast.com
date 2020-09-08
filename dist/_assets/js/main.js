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
        var _b = _a === void 0 ? {} : _a, c = _b.onload, _c = _b.selector, a = _c === void 0 ? "a[href^=\"" + window.location.origin + "\"]:not([data-no-schwifty]), a[href^=\"/\"]:not([data-no-schwifty])" : _c, _d = _b.cacheLimit, e = _d === void 0 ? 85 : _d, _e = _b.preserveScroll, k = _e === void 0 ? !1 : _e, _f = _b.transitioningAttribute, x = _f === void 0 ? "data-schwifty" : _f, s = _b.preserveAttributes;
        var y = s === !0;
        typeof s != "object" && (s = { documentElement: y, head: y, body: y });
        var n = "schwifty-preload", o = 'link[rel="stylesheet"]', g = document, p = g.documentElement, t = "innerHTML", l = new Map(), L = new IntersectionObserver(function (b, d) { return b.forEach(function (q) { var v = q.isIntersecting, w = q.target.href; if (!v && v != void 0)
            return; l.size >= e && l["delete"](l.keys()[0]), l.get(w) ? d.unobserve(q.target) : N(w); }); }, { threshold: .5 }), F = function (b, d) {
            if (d === void 0) { d = g; }
            return d.querySelector(b);
        }, u = function (b, d) {
            if (d === void 0) { d = g; }
            return d.querySelectorAll(b);
        }, M = function (b) { return b.target.closest(a) || {}; }, G = function () { return u(a).forEach(function (b) { return L.observe(b); }); }, h = function (b, d) {
            if (d === void 0) { d = window; }
            return d.dispatchEvent(new Event(b));
        }, H = function (b) { return b.replace(/m?s/gi, ""); }, I = function () { var b = getComputedStyle(p); return (H(b.transitionDelay) + H(b.transitionDuration)) * 1000; }, N = function (b) { if (!b)
            return; var d = new XMLHttpRequest(); d.onreadystatechange = function () { this.status == 200 && l.set(b, d.responseXML); }, d.open("GET", b, !0), d.responseType = "document", d.send(); }, J = function (b) {
            var e_1, _a;
            var d = l.get(b);
            if (!d) {
                location = b;
                return;
            }
            history.replaceState(null, null, b), u(o + ":not(." + n + ")").forEach(function (f) { var i = f.href.replace(location.origin, ""), j = F(o + "." + n + "[href=\"" + i + "\"]"), K = F(o + "[href=\"" + i + "\"]", d); K && !j && (f.classList.add(n), p.append(f)), !K && j && j.remove(); });
            var q = o + ":not(." + n + ")", v = o + "." + n, w = u(q, d), O = u(v);
            var _loop_1 = function (f) {
                Array.from(w).some(function (i) { return i.href == f.href; }) || f.remove();
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
                if (s[f])
                    return;
                var i = g[f];
                try {
                    for (var _c = __values(i.attributes), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var j = _d.value;
                        i.removeAttribute(j.name);
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
                    for (var _e = __values(d[f].attributes), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var j = _f.value;
                        i.setAttribute(j.name, j.value);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }), p.setAttribute(x, "out"), h("pagehide"), h("unload"), setTimeout(function () { h("loading", g), g.body[t] = d.body[t], g.head[t] = d.head[t], p.setAttribute(x, "in"), h("interactive", g), h("DOMContentLoaded", g), k || scrollTo(0, 0), c && (c.length ? c.map(function (f) { return f(); }) : c()), G(), setTimeout(function () { return p.removeAttribute(x); }, I()), h("complete", g), h("load"), h("pageshow"); }, I());
        };
        G(), addEventListener("popstate", function (b) { return J(location.href); }), addEventListener("click", function (b) { var d = M(b).href; d && (b.preventDefault(), h("beforeunload"), history.pushState(null, null, location.href), J(d)); });
    }
    return z;
}());  var m = function (c, a) {
    if (a === void 0) { a = document; }
    return a.querySelector(c);
}, r = function (c, a) {
    if (a === void 0) { a = document; }
    return a.querySelectorAll(c);
}, C = function (c, a) {
    if (a === void 0) { a = ""; }
    var e = document.createElement(c);
    return e.innerHTML = a, e;
}, E = function (c, a) { return a == void 0 ? JSON.parse(localStorage.getItem(c)) : localStorage.setItem(c, JSON.stringify(a)); }, B = function (c) { var a = E(c); document.documentElement.classList.toggle(c, !a), E(c, !a); }; function A(c) {
    var _a, _b;
    if (c === void 0) { c = ""; }
    var a = decodeURIComponent(c) || "", e = a.split("/").pop(), k = (_b = (_a = e === null || e === void 0 ? void 0 : e.split(".")) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.replace(/-|\+/g, " ");
    return k || "";
} function D() {
    var e_4, _a, e_5, _b, e_6, _c, e_7, _d;
    var _e;
    var _loop_2 = function (a) {
        var e = m("#" + a + "_toggle");
        e && e.addEventListener("click", function () { return B(a); });
    };
    try {
        for (var _f = __values(["dark_mode", "muted"]), _g = _f.next(); !_g.done; _g = _f.next()) {
            var a = _g.value;
            _loop_2(a);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_a = _f["return"])) _a.call(_f);
        }
        finally { if (e_4) throw e_4.error; }
    }
    var c = new IntersectionObserver(function (a) { return a.map(function (e) { return e.target.classList.toggle("paused", !e.isIntersecting); }); });
    try {
        for (var _h = __values(r(".animation")), _j = _h.next(); !_j.done; _j = _h.next()) {
            var a = _j.value;
            c.observe(a);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_b = _h["return"])) _b.call(_h);
        }
        finally { if (e_5) throw e_5.error; }
    }
    try {
        for (var _k = __values(r("img")), _l = _k.next(); !_l.done; _l = _k.next()) {
            var a = _l.value;
            if ((_e = a.title) === null || _e === void 0 ? void 0 : _e.length)
                continue;
            a.title = a.alt ? a.alt : A(a.src), a.parentElement.classList.add("has-img");
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_l && !_l.done && (_c = _k["return"])) _c.call(_k);
        }
        finally { if (e_6) throw e_6.error; }
    }
    if (m(".codepen")) {
        var a = C("script");
        a.src = "https://static.codepen.io/assets/embed/ei.js", a.async = !0, document.body.append(a);
    }
    var _loop_3 = function (a) {
        var e = m("button", a), k = m("iframe", a);
        e.addEventListener("click", function () { k.src = k.getAttribute("data-src"), a.classList.add("loaded"); });
    };
    try {
        for (var _m = __values(r(".embedded_project")), _o = _m.next(); !_o.done; _o = _m.next()) {
            var a = _o.value;
            _loop_3(a);
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_o && !_o.done && (_d = _m["return"])) _d.call(_m);
        }
        finally { if (e_7) throw e_7.error; }
    }
} D(); try {
    new z({ preserveAttributes: !0, onload: D });
}
catch (c) {
    console.log(c);
} })();
