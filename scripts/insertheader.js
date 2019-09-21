function insertHeader() {
    function insertSEOFramework() {
        // Standard meta values
        const root = window.location.origin;
        const path = window.location.pathname;
        const url = root + path;
        const blogTagline = 'The blog for design-oriented devs. Get regular tips to improve your UI and UX design skills.'
        const mainTagline = 'Helping focused businesses take control of their identity through digital design.';

        let siteTitle = 'Braden East';
        let description = mainTagline;
        let socialImage = root + '/images/me-looking-up.jpg';

        let pageName = path.split('/').reverse()[1].replace(/-+|%20+/g, ' ');
        let pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + pageName.charAt(0).toLocaleUpperCase() + pageName.slice(1);

        // Conditional meta values
        if (path.includes('blog')) {
            siteTitle = 'Blog of Braden East';
            description = blogTagline;
            socialImage = root + '/images/blog/laptop-book.jpg';
        } else if (url.split('/').length <= 4) {
            pageTitle = siteTitle + ' &nbsp;|&nbsp; Digital design solutions for focused brands';
        }

        const SEOTags = [
            {
                'property': 'og:site_name',
                'content': siteTitle
            },
            {
                'property': 'og:image',
                'content': socialImage
            },
            {
                'property': 'og:title',
                'content': pageTitle
            },
            {
                'property': 'og:description',
                'content': description
            },
            {
                'property': 'og:url',
                'content': url
            },
            {
                'property': 'og:locale',
                'content': 'en_US'
            },
            {
                'property': 'og:type',
                'content': 'website'
            },
            {
                'property': 'twitter:site',
                'content': '@bradenthehair'
            },
            {
                'property': 'twitter:title',
                'content': pageTitle
            },
            {
                'property': 'twitter:description',
                'content': description
            },
            {
                'property': 'twitter:image',
                'content': socialImage
            },
            {
                'property': 'twitter:card',
                'content': 'summary_large_image'
            },
            {
                'property': 'fb:app_id',
                'content': '136269307054042'
            }]

        SEOTags.map(tag => {
            const elem = document.createElement('meta');
            elem.setAttribute('property', tag.property);
            elem.setAttribute('content', tag.content);
            document.head.appendChild(elem);
        })

        const titleElem = document.createElement('title');
        titleElem.innerHTML = pageTitle;
        document.head.appendChild(titleElem);

        const canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', url);
        document.head.appendChild(canonical);
    }

    function insertPreloads() {
        const preloads = ['/css/main.css', '/css/prism.css', 'https://unpkg.com/scroll-out@2.2.7/dist/scroll-out.min.js'];

        preloads.map(path => {
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

    function insertPolyfills() {
        const polyFills = ['https://polyfill.io/v3/polyfill.min.js'];
        polyFills.map(source => {
            const polyFill = document.createElement('script');
            polyFill.setAttribute('src', source);
            polyFill.setAttribute('crossorigin', 'anonymous');
            document.head.appendChild(polyFill);
        })
    }

    insertSEOFramework();
    insertPreloads();
    insertPolyfills();

    document.head.insertAdjacentHTML('beforeend', `
    <style>body{opacity:0}</style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="alternate" type="application/rss+xml" title="RSS Feed for Braden East&apos;s Blog" href="/blog/feed.xml" />
    <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <link rel="stylesheet" href="/css/prism.css">`);
}
insertHeader();