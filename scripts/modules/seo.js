function insertSEOFramework() {
    const root = window.location.origin;
    const path = window.location.pathname;
    const url = root + path;
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