function insertHeader() {

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

    let standardHeader = `
    <style>body{opacity:0;}</style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="alternate" type="application/rss+xml" title="RSS Feed for Braden East&apos;s Blog" href="/blog/feed.xml" />
    <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
    <link rel="stylesheet" type="text/css" href="/css/main.css" />
    <link rel="stylesheet" href="/css/prism.css">`;
    document.head.insertAdjacentHTML('beforeend', standardHeader);

    function insertPolyfills(source) {
        const polyFill = document.createElement('script');
        polyFill.setAttribute('src', source);
        polyFill.setAttribute('crossorigin', 'anonymous');
        document.head.appendChild(polyFill);
    }
    const preloads = ['/css/main.css', '/css/prism.css', '/scripts/insertfooter.js', '/scripts/index.js', 'https://unpkg.com/scroll-out@2.2.7/dist/scroll-out.min.js'];
    const polyFill = 'https://polyfill.io/v3/polyfill.min.js';

    insertPreloads(preloads);
    insertPolyfills(polyFill);
}
insertHeader();