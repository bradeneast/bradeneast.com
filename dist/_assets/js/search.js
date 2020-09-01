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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
(function () { var h = function (a, b) {
    if (b === void 0) { b = document; }
    return b.querySelector(a);
}, k = function (a, b) {
    if (b === void 0) { b = document; }
    return b.querySelectorAll(a);
}, g = function (a, b) {
    if (b === void 0) { b = ""; }
    var c = document.createElement(a);
    return c.innerHTML = b, c;
}; function i(a) {
    var _a, _b;
    if (a === void 0) { a = ""; }
    var b = decodeURIComponent(a) || "", c = b.split("/").pop(), e = (_b = (_a = c === null || c === void 0 ? void 0 : c.split(".")) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.replace(/-|\+/g, " ");
    return e || "";
} function l() { return fetch("/sitemap.xml").then(function (a) { return a.text(); }).then(function (a) { return new DOMParser().parseFromString(a, "text/xml"); }); } var m = h("#results"), n; h('input[type="search"]').addEventListener("input", function (a) { clearTimeout(n), n = setTimeout(function () { return p(a); }, 200); }); function o(a) { var b = [], c = new RegExp(a, "i"); return l().then(function (e) {
    var e_1, _a;
    try {
        for (var _b = __values(k("loc", e)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var d = _c.value;
            var f = d.textContent.trim();
            b.push({ absolute: f, relative: f.split("/").pop() });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return b = b.filter(function (d) { return c.test(i(d.relative)) && d.relative.length > 1; }), __spread(new Set(b));
}); } function p(a) { var b = a.target.value; o(b).then(function (c) {
    var e_2, _a;
    m.innerHTML = "";
    if (!b.trim().length)
        return;
    try {
        for (var c_1 = __values(c), c_1_1 = c_1.next(); !c_1_1.done; c_1_1 = c_1.next()) {
            var e = c_1_1.value;
            var d = g("a"), f = g("h2"), j = g("li");
            d.innerText = i(e.relative), d.href = e.absolute, f.append(d), j.append(f), j.classList.add("post--info"), m.append(j);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (c_1_1 && !c_1_1.done && (_a = c_1["return"])) _a.call(c_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
}); } })();
