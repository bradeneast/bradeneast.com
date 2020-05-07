document.body.style.opacity = 0;

function bail(err) {
    console.log(err);
    document.body.style.opacity = 1;
}

try {

    let sitemap = fetch('/sitemap.json').then(r => r.json());
    let include = /blog\//i;
    let exclude = /\/blog\/categories/i;

    sitemap.then(pages => {

        try {

            let filtered = [];

            for (let page of pages) {
                if (include.test(page.href) && !exclude.test(page.href)) {
                    filtered.push(page);
                }
            }

            let index = Math.round((filtered.length - 1) * Math.random());
            window.location = filtered[index]?.href;

        } catch (e) { bail(e) }

    })

} catch (e) { bail(e) }