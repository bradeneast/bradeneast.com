var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
(function () { var h = function (b, a) {
    if (a === void 0) { a = document; }
    return a.querySelector(b);
}, k = function (b, a) {
    if (a === void 0) { a = document; }
    return a.querySelectorAll(b);
}, g = function (b, a) {
    if (a === void 0) { a = ""; }
    var c = document.createElement(b);
    return c.innerHTML = a, c;
}; function i(b) {
    var _a, _b;
    if (b === void 0) { b = ""; }
    var a = decodeURIComponent(b) || "", c = a.split("/").pop(), e = (_b = (_a = c === null || c === void 0 ? void 0 : c.split(".")) === null || _a === void 0 ? void 0 : _a.shift()) === null || _b === void 0 ? void 0 : _b.replace(/-|\+/g, " ");
    return e || "";
} function l() {
    return __awaiter(this, void 0, void 0, function () { var b, a; return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fetch("/sitemap.xml")];
            case 1:
                b = _a.sent();
                return [4, b.text()];
            case 2:
                a = _a.sent();
                return [2, new DOMParser().parseFromString(a, "text/xml")];
        }
    }); });
} var m = h("#results"), n; h('input[type="search"]').addEventListener("input", function (b) { clearTimeout(n), n = setTimeout(function () { return p(b); }, 200); }); function o(b) {
    return __awaiter(this, void 0, void 0, function () {
        var a, c, e, _a, _b, d, f;
        var e_1, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = [], c = new RegExp(b, "i");
                    return [4, l()];
                case 1:
                    e = _d.sent();
                    z;
                    try {
                        for (_a = __values(k("loc", e)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            d = _b.value;
                            f = d.textContent.trim();
                            a.push({ absolute: f, relative: f.split("/").pop() });
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [2, (a = a.filter(function (d) { return c.test(i(d.relative)) && d.relative.length > 1; }), __spread(new Set(a)))];
            }
        });
    });
} function p(b) { var a = b.target.value; o(a).then(function (c) {
    var e_2, _a;
    m.innerHTML = "";
    if (!a.trim().length)
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
