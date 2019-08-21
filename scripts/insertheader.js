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
            link.setAttribute('as', 'style');
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