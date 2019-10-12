function checkActiveLinks() { document.querySelectorAll('.nav-item').forEach(function (e) { var t = e.textContent, n = window.location.href.toLowerCase(); t && (n.includes(t.toLowerCase()) ? e.classList.add('active') : e.classList.remove('active')); }); }
function toggleDarkMode() { var e = localStorage.getItem('darkModeOn'); var t; e && (t = JSON.parse(e)), t ? localStorage.setItem('darkModeOn', 'false') : localStorage.setItem('darkModeOn', 'true'), document.documentElement.classList.toggle('dm'); }
function altFromSource(e) { var t, n = e.getAttribute('src'); if ('string' == typeof n) {
    var e_1 = decodeURIComponent(n).split('/').pop();
    e_1 && (t = e_1.split('.').shift().replace(/-|\+/g, ' '));
} return t; }
function clearImageFormatting() { var e = 'style, width, height, max-width, max-height'.split(', '); document.querySelectorAll('img').forEach(function (t) { e.map(function (e) { return t.removeAttribute(e); }), !t.getAttribute('alt') && t.setAttribute('alt', altFromSource(t)), t.setAttribute('loading', 'lazy'); }); }
function Stagger(e) { var t, n, o, r = e.parent, a = [], i = .5 * e.intensity; r.r = r.getBoundingClientRect(), !(t = e.origin ? e.origin.split(' ') : ['top', 'left'])[1] && t.push('center'), ('left' == t[0] || 'right' == t[0]) && t.reverse(), n = t[1].includes('center') ? r.r.right - r.r.width / 2 : r.r[t[1]], o = t[0].includes('center') ? r.r.bottom - r.r.height / 2 : r.r[t[0]], Array.from(e.parent.children).map(function (e) { var r; if ('template' !== e.tagName.toLowerCase()) {
    var i_1, l = void 0, c = void 0, s = void 0, d = e.getBoundingClientRect();
    i_1 = t[1].includes('center') ? d.right - d.width / 2 : d[t[1]], s = (l = t[0].includes('center') ? d.bottom - d.height / 2 : d[t[0]]) < o ? o - l : l - o, c = i_1 < n ? n - i_1 : i_1 - n, r = Math.round(c + s), a.push(r);
} }), a.sort(), 'to' == e.direction && a.reverse(), a.map(function (t, n) { return e.parent.children[n].style.animationDelay = n * i + 's'; }); }
function startTouchListeners() { var e, t; window.addEventListener('touchstart', function (t) { e = parseInt(t.changedTouches[0].clientX); }), window.addEventListener('touchend', function (n) { t = e - n.changedTouches[0].clientX, 'darkModeToggle' == n.target.id && (JSON.parse(localStorage.getItem('darkModeOn')) ? t > toggleThreshold && toggleDarkMode() : t < -1 * toggleThreshold && toggleDarkMode()); }); }
var toggles = Array.from(document.getElementsByClassName('toggle')), toggleThreshold = 20;
checkActiveLinks(), startTouchListeners();
var main = document.getElementById('main'), allImages = Array.from(document.getElementsByTagName('img')), staggerItems = document.querySelectorAll('[data-stagger]'), navEndDesktop = document.querySelector('.nav-end'), navEndMobile = navEndDesktop.cloneNode(!0), newSection = document.createElement('section');
newSection.appendChild(navEndMobile), main.insertAdjacentElement('afterend', newSection), staggerItems.forEach(function (e) { Stagger({ parent: e, intensity: .3, direction: 'from', origin: 'top' }); }), allImages.map(function (e) { clearImageFormatting(e), altFromSource(e); }), console.log('Here to hack? My website is hosted with Netlify, deployed with GitHub, and compiled with NodeJS. Have fun!\n- Braden');
