// HELPERS: returns the current active URL
function getURL() {
    return window.location.href;
}

const url = 'https://bradeneast.com' + window.location.pathname;
let pageTitle = url.split('/').reverse()[1].replace(/-/g, ' ').replace(/%20/g, ' ');
const preloads = ['/css/main.css', '/css/prism.css', '/scripts/insertfooter.js', '/scripts/main.js', 'https://unpkg.com/scroll-out@2.2.7/dist/scroll-out.min.js'];
const polyFill = 'https://polyfill.io/v3/polyfill.min.js';

insertPreloads(preloads);
insertMeta(url, pageTitle);
insertPolyfills(polyFill);

function insertPreloads(paths) {
    paths.map(path => {
        let link = document.createElement('link');
        link.setAttribute('rel', 'preload');
        link.setAttribute('href', path);
        sourceType = path.split('.').reverse()[0];
        if (sourceType == 'js') {
            link.setAttribute('as', 'script')
        } else if (sourceType == 'css') {
            link.setAttribute('as', 'style')
        } else if (path.substr(0, 4) == 'http') {
            link.setAttribute('as', 'fetch')
        }
        document.head.appendChild(link);
    })
}

function insertMeta(url, pageTitle) {
    const siteTitle = 'Braden East';
    pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
    if (pageTitle === '' || pageTitle == null || url.split('/').length <= 4) {
        pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + 'Visual design solutions for focused brands';
    } else {
        pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + pageTitle;
    }
    const tagline = 'Helping focused businesses take control of their identity through branding and design.';
    const socialImage = 'https://bradeneast.com/images/me-grey-wall-square.jpg';

    document.head.insertAdjacentHTML('beforeend', `

        <!-- Start SEO Framework -->
        <title>${pageTitle}</title>
        <meta name="description" content="${tagline}" />
        <meta property="og:image" content="${socialImage}" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="${pageTitle}" />
        <meta property="og:description" content="${tagline}" />
        <meta property="og:url" content="${url}" />
        <meta property="og:site_name" content="Braden East" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bradenthehair" />
        <meta name="twitter:title" content="${pageTitle}" />
        <meta name="twitter:description" content="${tagline}" />
        <meta name="twitter:image" content="${socialImage}" />
        <link rel="canonical" href="${url}" />
        <!-- End SEO Framework -->

        <style>body{opacity:0;}</style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="alternate" type="application/rss+xml" title="RSS Feed for Braden East&apos;s Blog" href="/blog/feed.xml" />
        <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/css/main.css" />
        <link rel="stylesheet" href="/css/prism.css">
    `);
}

function insertPolyfills(source) {
    const polyFill = document.createElement('script');
    polyFill.setAttribute('src', source);
    polyFill.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(polyFill);
}

// LAZY LOADING ATTRIBUTE POLYFILL

/*
 * Loading attribute polyfill - https://github.com/mfranzke/loading-attribute-polyfill
 * @license Copyright(c) 2019 by Maximilian Franzke
 */

!function (e, t) { "use strict"; var r, a, o = { rootMargin: "256px 0px", threshold: .01, lazyImage: 'img[loading="lazy"]', lazyIframe: 'iframe[loading="lazy"]', loadingSupported: "loading" in HTMLImageElement.prototype && "loading" in HTMLIFrameElement.prototype }; "undefined" != typeof NodeList && NodeList.prototype && !NodeList.prototype.forEach && (NodeList.prototype.forEach = Array.prototype.forEach), "IntersectionObserver" in window && (r = new IntersectionObserver(function (e, t) { e.forEach(function (e) { if (0 !== e.intersectionRatio) { var r = e.target; t.unobserve(r), i(r) } }) }, o)), a = "requestAnimationFrame" in window ? window.requestAnimationFrame : function (e) { e() }; var n = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="; function i(e) { var t, r, a = []; "picture" === e.parentNode.tagName.toLowerCase() && (t = e.parentNode, (r = t.querySelector("source[data-lazy-remove]")) && t.removeChild(r), a = Array.prototype.slice.call(e.parentNode.querySelectorAll("source"))), a.push(e), a.forEach(function (e) { e.dataset.lazySrcset && (e.setAttribute("srcset", e.dataset.lazySrcset), delete e.dataset.lazySrcset) }), e.setAttribute("src", e.dataset.lazySrc), delete e.dataset.lazySrc } function d() { document.querySelectorAll("noscript." + e).forEach(function (e) { var t = e.textContent || e.innerHTML; o.loadingSupported || (void 0 === r ? t = t.replace(/(?:\r\n|\r|\n|\t| )src=/g, ' lazyload="1" src=') : ("picture" === e.parentNode.tagName.toLowerCase() && (t = function (e) { return '<source srcset="' + n + '" data-lazy-remove="true"></source>' + e }(t)), t = function (e) { return e.replace(/(?:\r\n|\r|\n|\t| )srcset=/g, " data-lazy-srcset=").replace(/(?:\r\n|\r|\n|\t| )src=/g, ' src="' + n + '" data-lazy-src=') }(t))); var a = document.createElement("div"); for (a.innerHTML = t; a.firstChild;)o.loadingSupported || void 0 === r || !a.firstChild.tagName || "img" !== a.firstChild.tagName.toLowerCase() && "iframe" !== a.firstChild.tagName.toLowerCase() || r.observe(a.firstChild), e.parentNode.insertBefore(a.firstChild, e); e.parentNode.removeChild(e) }), window.matchMedia("print").addListener(function (e) { e.matches && document.querySelectorAll(o.lazyImage + "[data-lazy-src]," + o.lazyIframe + "[data-lazy-src]").forEach(function (e) { i(e) }) }) } /comp|inter/.test(document.readyState) ? a(d) : "addEventListener" in document ? document.addEventListener("DOMContentLoaded", function () { a(d) }) : document.attachEvent("onreadystatechange", function () { "complete" === document.readyState && d() }) }("loading-lazy");
