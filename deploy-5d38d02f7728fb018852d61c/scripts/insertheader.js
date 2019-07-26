const url = window.location.pathname;
let pageTitle = url.split('/').reverse()[1].replace(/-/g, ' ').replace(/%20/g, ' ');

function insertHeader(url, pageTitle) {
    const siteTitle = 'Braden East';
    pageTitle = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);;
    if (pageTitle === '' || pageTitle == null) {
        pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + 'Visual design solutions for nonprofits';
    } else {
        pageTitle = siteTitle + ' &nbsp;|&nbsp; ' + pageTitle;
    }
    const tagline = 'Helping nonprofits take control of their identity through stellar branding and design.';
    const socialImage = '/images/social.jpg';
    document.head.insertAdjacentHTML('beforeend', `
        <style>body{opacity:0;}</style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${pageTitle}</title>

        <!-- Start SEO Framework -->
        <meta name="description" content="${tagline}" />
        <meta property="og:image" content="${socialImage}" />
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

        <link rel="shortcut icon" type="image/png" href="/images/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/main.css" />
        `);
}
insertHeader(url, pageTitle);