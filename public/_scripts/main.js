function toggleDarkMode() { var e = localStorage.getItem('darkModeOn'), t = document.getElementById('favicon'); var n; e && (n = JSON.parse(e)), n && (n = !1, t.setAttribute('href', t.href.replace('dark', 'light'))), n || (n = !0, t.setAttribute('href', t.href.replace('light', 'dark'))), localStorage.setItem('darkModeOn', n), toggleClass(document.documentElement, 'dm'); }
function altFromSource(e) { var t = e.getAttribute('src'); if (t) {
    var e_1 = decodeURIComponent(t).split('/').pop();
    return e_1 ? e_1.split('.').shift().replace(/-|\+/g, ' ') : null;
} }
function clearImageFormatting() { var e = 'style, width, height, max-width, max-height'.split(', '); document.querySelectorAll('img').forEach(function (t) { e.map(function (e) { return t.removeAttribute(e); }), !t.getAttribute('alt') && t.setAttribute('alt', altFromSource(t)), t.setAttribute('loading', 'lazy'); }); }
function dynamicSort(e) { var t = 1; return '-' === e[0] && (t = -1, e = e.substr(1)), function (n, o) { return (n[e] < o[e] ? -1 : n[e] > o[e] ? 1 : 0) * t; }; }
function toggleClass(e, t, n) { return void 0 === n ? e.classList.toggle(t) : e.classList.toggle(t, n), e; }
function populateCodepen(e) { var t = e.getAttribute('data-slug-hash'), n = e.getAttribute('data-user'), o = document.createElement('p'); t && (o.innerHTML += "View <a href=\"https://codepen.io/pen/" + t + "\">this pen</a>"), t && n && (o.innerHTML += " by <a href=\"" + ('https://codepen.io/' + n) + "\">@" + n + "</a>"), o.classList.add('codepen-fallback'), o.innerHTML = t || n ? o.innerHTML + ' on CodePen.' : 'This pen is unavailable.', e.insertAdjacentElement('afterend', o); }
function staggerAnimations(e) { var t, n, o = e.parent, r = o.getBoundingClientRect(), a = { x: r.right - r.width / 2, y: r.bottom - r.height / 2 }, i = Array.from(o.children), l = [], c = .5 * e.intensity, s = e.origin.split(' ') || ['top', 'left']; s[1] || s.push('center'), 'left' != s[0] && 'right' != s[0] || s.reverse(), s.map(function (e, o) { 'center' != e ? 0 == o ? n = r[e] : t = r[e] : 0 == o ? n = a.y : t = a.x; }), i.map(function (e) { var o = e.getBoundingClientRect(), r = o.right - o.width / 2, a = o.bottom - o.height / 2, i = Math.max(t, r) - Math.min(t, r), c = Math.max(n, a) - Math.min(n, a), s = Math.hypot(i, c); e.distance = Math.round(s), l.push(e); }), l.sort(dynamicSort('distance')), 'to' == e.direction && l.reverse(), l.map(function (e, t) { return e.style.animationDelay = t * c + 's'; }); }
document.querySelectorAll('.nav-item').forEach(function (e) { var t = e.textContent, n = window.location.href.toLowerCase(); t && toggleClass(e, 'active', n.includes(t.toLowerCase())); });
var main = document.getElementById('main'), boilerPlateDesktop = document.querySelector('.nav-end'), boilerPlateMobile = boilerPlateDesktop.cloneNode(!0), boilerPlateCopy = document.createElement('section');
boilerPlateCopy.appendChild(boilerPlateMobile), main.insertAdjacentElement('afterend', boilerPlateCopy), document.querySelectorAll('[data-stagger]').forEach(function (e) { staggerAnimations({ parent: e, intensity: .2, direction: 'from', origin: 'top' }); }), document.querySelectorAll('img').forEach(function (e) { clearImageFormatting(e), altFromSource(e); }), document.querySelectorAll('.codepen').forEach(function (e) { return populateCodepen(e); }), document.querySelectorAll('a').forEach(function (e) { e.getAttribute('href').includes('://') && e.setAttribute('target', '_blank'); });
