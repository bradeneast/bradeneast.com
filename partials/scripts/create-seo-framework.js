const siteTitle = document.querySelector('title').innerText;
const url = window.location.href;
const firstParagraph = document.querySelector('p');
const socialImage = '/images/social.jpg';
let description = '';
if (firstParagraph) {
    description = firstParagraph.innerHTML.replace(/<[^>]*>|\s\s/g, '').replace(/\n+/g, '');
}

document.head.insertAdjacentHTML('beforeend', `
<!-- Start SEO Framework -->
<meta name="description" content="${description}" />
<meta property="og:image" content="${socialImage}" />
<meta property="og:image:width" content="1080" />
<meta property="og:image:height" content="1080" />
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${siteTitle}" />
<meta property="og:description" content="${siteTitle}" />
<meta property="og:url" content="${url}" />
<meta property="og:site_name" content="${siteTitle}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@bradenthehair" />
<meta name="twitter:title" content="${siteTitle}" />
<meta name="twitter:description" content="${description}" />
<meta name="twitter:image" content="${socialImage}" />
<link rel="canonical" href="${url}" />
<!-- End SEO Framework -->
`);