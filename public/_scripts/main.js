function checkActiveLinks() { document.querySelectorAll('.nav-item').forEach(function (e) { var t = e.textContent, o = window.location.href.toLowerCase(); t && (o.includes(t.toLowerCase()) ? e.classList.add('active') : e.classList.remove('active')); }); }
function toggleDarkMode() { var e = localStorage.getItem('darkModeOn'), t = document.getElementById('favicon'); var o; e && (o = JSON.parse(e)), o ? (o = !1, t.setAttribute('href', t.href.replace('dark', 'light'))) : (o = !0, t.setAttribute('href', t.href.replace('light', 'dark'))), localStorage.setItem('darkModeOn', o), document.documentElement.classList.toggle('dm'); }
function altFromSource(e) { var t, o = e.getAttribute('src'); if ('string' == typeof o) {
    var e_1 = decodeURIComponent(o).split('/').pop();
    e_1 && (t = e_1.split('.').shift().replace(/-|\+/g, ' '));
} return t; }
function clearImageFormatting() { var e = 'style, width, height, max-width, max-height'.split(', '); document.querySelectorAll('img').forEach(function (t) { e.map(function (e) { return t.removeAttribute(e); }), !t.getAttribute('alt') && t.setAttribute('alt', altFromSource(t)), t.setAttribute('loading', 'lazy'); }); }
function dynamicSort(e) { var t = 1; return '-' === e[0] && (t = -1, e = e.substr(1)), function (o, n) { return (o[e] < n[e] ? -1 : o[e] > n[e] ? 1 : 0) * t; }; }
function staggerAnimations(e) { var t, o, n = e.parent, i = n.getBoundingClientRect(), r = { x: i.right - i.width / 2, y: i.bottom - i.height / 2 }, a = Array.from(n.children), l = [], c = .5 * e.intensity, s = e.origin.split(' ') || ['top', 'left']; s[1] || s.push('center'), 'left' != s[0] && 'right' != s[0] || s.reverse(), s.map(function (e, n) { 'center' != e ? 0 == n ? o = i[e] : t = i[e] : 0 == n ? o = r.y : t = r.x; }), a.map(function (e) { var n = e.getBoundingClientRect(), i = n.right - n.width / 2, r = n.bottom - n.height / 2, a = Math.max(t, i) - Math.min(t, i), c = Math.max(o, r) - Math.min(o, r), s = Math.hypot(a, c); e.distance = Math.round(s), l.push(e); }), l.sort(dynamicSort('distance')), 'to' == e.direction && l.reverse(), l.map(function (e, t) { return e.style.animationDelay = t * c + 's'; }); }
function startTouchListeners() { var e, t; window.addEventListener('touchstart', function (t) { e = parseInt(t.changedTouches[0].clientX); }), window.addEventListener('touchend', function (o) { t = e - o.changedTouches[0].clientX, 'darkModeToggle' == o.target.id && (JSON.parse(localStorage.getItem('darkModeOn')) ? t > toggleThreshold && toggleDarkMode() : t < -1 * toggleThreshold && toggleDarkMode()); }); }
function copyBoilerPlateForMobile() { var e = document.querySelector('.nav-end').cloneNode(!0), t = document.createElement('section'); t.appendChild(e), main.insertAdjacentElement('afterend', t); }
var toggles = Array.from(document.getElementsByClassName('toggle')), toggleThreshold = 20, main = document.getElementById('main'), allImages = Array.from(document.getElementsByTagName('img')), consoleInfoStyles = '\n    font-family: sans-serif;\n    font-size: 14px;\n    font-weight: 500;\n';
checkActiveLinks(), copyBoilerPlateForMobile(), startTouchListeners(), document.querySelectorAll('[data-stagger]').forEach(function (e) { staggerAnimations({ parent: e, intensity: .3, direction: 'from', origin: 'top left' }); }), allImages.map(function (e) { clearImageFormatting(e), altFromSource(e); }), console.info('%c ⓘ Here to hack? My website is hosted with Netlify, deployed with GitHub, and compiled with NodeJS. Have fun! \n - Braden ', consoleInfoStyles);
