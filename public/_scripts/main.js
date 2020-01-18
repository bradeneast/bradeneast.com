function toggleDarkMode() { document.documentElement.classList.toggle('dm'); var e = localStorage.getItem('darkModeOn'), t = document.getElementById('favicon'), o = !!e && JSON.parse(e); if (o)
    return t.setAttribute('href', t.href.replace('dark', 'light')), void localStorage.setItem('darkModeOn', !1); o || (t.setAttribute('href', t.href.replace('light', 'dark')), localStorage.setItem('darkModeOn', !0)); }
function altFromSource(e) { var t = e.getAttribute('src'); if (!t)
    return; var o = decodeURIComponent(t).split('/').pop(); return o ? o.split('.').shift().replace(/-|\+/g, ' ') : null; }
function clearImageFormatting() { var e = 'style, width, height, max-width, max-height'.split(', '); document.querySelectorAll('img').forEach(function (t) { e.map(function (e) { return t.removeAttribute(e); }), t.getAttribute('alt') || t.setAttribute('alt', altFromSource(t)), t.setAttribute('loading', 'lazy'); }); }
function dynamicSort(e) { var t = 1; return '-' === e[0] && (t = -1, e = e.substr(1)), function (o, n) { return (o[e] < n[e] ? -1 : o[e] > n[e] ? 1 : 0) * t; }; }
function populateCodepen(e) { var t = e.getAttribute('data-slug-hash'), o = e.getAttribute('data-user'), n = document.createElement('p'); t && (n.innerHTML += "View <a href=\"https://codepen.io/pen/" + t + "\">this pen</a>"), t && o && (n.innerHTML += " by <a href=\"" + ('https://codepen.io/' + o) + "\">@" + o + "</a>"), n.classList.add('codepen-fallback'), n.innerHTML = t || o ? n.innerHTML + ' on CodePen.' : 'This pen is unavailable.', e.insertAdjacentElement('afterend', n); }
function staggerAnimations(e) { var t, o, n = e.parent, r = n.getBoundingClientRect(), a = { x: r.right - r.width / 2, y: r.bottom - r.height / 2 }, i = Array.from(n.children), l = [], c = .5 * e.intensity, d = e.origin.split(' ') || ['top', 'left']; d[1] || d.push('center'), 'left' != d[0] && 'right' != d[0] || d.reverse(), d.map(function (e, n) { 'center' != e ? 0 == n ? o = r[e] : t = r[e] : 0 == n ? o = a.y : t = a.x; }), i.map(function (e) { var n = e.getBoundingClientRect(), r = n.right - n.width / 2, a = n.bottom - n.height / 2, i = Math.max(t, r) - Math.min(t, r), c = Math.max(o, a) - Math.min(o, a), d = Math.hypot(i, c); e.distance = Math.round(d), l.push(e); }), l.sort(dynamicSort('distance')), 'to' == e.direction && l.reverse(), l.map(function (e, t) { return e.style.animationDelay = t * c + 's'; }); }
document.querySelectorAll('.nav-item').forEach(function (e) { var t = e.textContent, o = window.location.href.toLowerCase(); t && e.classList.toggle('active', o.includes(t.toLowerCase())); });
var main = document.getElementById('main'), boilerPlateDesktop = document.querySelector('.nav-end'), boilerPlateMobile = boilerPlateDesktop.cloneNode(!0), boilerPlateCopy = document.createElement('section');
boilerPlateCopy.appendChild(boilerPlateMobile), main.insertAdjacentElement('afterend', boilerPlateCopy), document.querySelectorAll('[data-stagger]').forEach(function (e) { staggerAnimations({ parent: e, intensity: .2, direction: 'from', origin: 'top' }); }), document.querySelectorAll('img').forEach(function (e) { clearImageFormatting(e), altFromSource(e); }), document.querySelectorAll('[autoplay]').forEach(function (e) { e.setAttribute('loop', !0), e.setAttribute('muted', !0), e.setAttribute('playsinline', !0); }), document.querySelectorAll('.codepen').forEach(function (e) { return populateCodepen(e); }), document.querySelectorAll('a').forEach(function (e) { e.getAttribute('href').includes('://') && e.setAttribute('target', '_blank'); });
