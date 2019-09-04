function insertHeader() {
    function insertSEOFramework() {
        const root = window.location.origin;
        const path = window.location.pathname;
        const url = root + path;

        if (!path.includes('blog') || path.length < 12) {
            // Standard meta values
            let siteTitle = 'Braden East';
            let description = 'Helping focused businesses take control of their identity through digital design.';
            let pageName = path.split('/').reverse()[1].replace(/-+|%20+/g, ' ');
            let socialImage = root + '/images/me-looking-up.jpg';
            let pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + pageName;

            // Conditional meta values
            if (path.includes('blog')) {
                siteTitle = 'Blog of Braden East';
                description = 'The blog for design-oriented devs. Get regular tips to improve your UI and UX design skills.';
                socialImage = root + '/images/blog/laptop-book.jpg';
            } else if (pageName == ('' || null) || url.split('/').length <= 4) {
                pageTitle = siteTitle + ' &nbsp;|&nbsp; Digital design solutions for focused brands';
            }

            const SEOTags = [,
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
                }]

            SEOTags.map(tag => {
                const elem = document.createElement('meta');
                elem.setAttribute('property', tag.property);
                elem.setAttribute('content', tag.content);
                document.head.appendChild(elem);
            })
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