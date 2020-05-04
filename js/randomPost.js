document.body.style.opacity = 0;

let sitemap = fetch('/sitemap.json').then(r => r.json());
let include = 'blog/';
let exclude = '/blog/categories/';

sitemap.then(pages => {

    try {

        let filtered = [];

        for (let page of pages) {
            if (page.href.includes(include) && !page.href.includes(exclude)) {
                filtered.push(page);
            }
        }

        let index = Math.round((filtered.length - 1) * Math.random());
        window.location = filtered[index]?.href;

    } catch (e) {
        console.log(e);
        document.body.style.opacity = 1;
    }

})