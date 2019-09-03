function insertHeader() {
    function insertSEOFramework() {
        const root = window.location.origin;
        const path = window.location.pathname;
        const url = root + path;
        if (!path.includes('blog') || path.length < 12) {
            let siteTitle = 'Braden East';
            let description = 'Helping focused businesses take control of their identity through digital design.';
            let pageName = path.split('/').reverse()[1].replace(/-+|%20+/g, ' ');
            let socialImage = root + '/images/me-looking-up.jpg';
            let pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + pageName;

            if (path.includes('blog')) {
                siteTitle = 'Blog of Braden East';
                description = 'The blog for design-oriented devs. Get regular tips to improve your UI and UX design skills.';
                socialImage = root + '/images/blog/laptop-book.jpg';
            } else if (pageName == ('' || null) || url.split('/').length <= 4) {
                pageTitle = siteTitle + ' &nbsp;|&nbsp; Digital design solutions for focused brands';
            }
            let SEOFramework = `
            <!-- Start SEO Framework -->
            <title>${pageTitle}</title>
            <meta name="description" content="${description}" />
            <meta property="og:image" content="${socialImage}" />
            <meta property="og:image:width" content="1080" />
            <meta property="og:image:height" content="1080" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="${pageTitle}" />
            <meta property="og:description" content="${description}" />
            <meta property="og:url" content="${url}" />
            <meta property="og:site_name" content="Braden East" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@bradenthehair" />
            <meta name="twitter:title" content="${pageTitle}" />
            <meta name="twitter:description" content="${description}" />
            <meta name="twitter:image" content="${socialImage}" />
            <link rel="canonical" href="${url}" />
            <!-- End SEO Framework -->`;
            document.head.insertAdjacentHTML('beforeend', SEOFramework);
        }
    }

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

    document.head.insertAdjacentHTML('beforeend', `
    <title>Braden East | Visual Design Solutions for Focused Brands</title>
    <style>body{opacity:0;}</style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="alternate" type="application/rss+xml" title="RSS Feed for Braden East&apos;s Blog" href="/blog/feed.xml" />
    <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <link rel="stylesheet" href="/css/prism.css">`);

    function insertPolyfills(source) {
        const polyFill = document.createElement('script');
        polyFill.setAttribute('src', source);
        polyFill.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(polyFill);
    }
    const preloads = ['/css/main.css', '/css/prism.css', '/scripts/insertfooter.js', '/scripts/index.js', 'https://unpkg.com/scroll-out@2.2.7/dist/scroll-out.min.js'];
    const polyFill = 'https://polyfill.io/v3/polyfill.min.js';

    insertSEOFramework();
    insertPreloads(preloads);
    insertPolyfills(polyFill);
}
insertHeader();