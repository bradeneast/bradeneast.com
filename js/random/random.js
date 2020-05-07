document.body.style.opacity = 0;
let xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function () {

    if (this.readyState != 4 || this.status != 200) return;

    try {

        let pages = JSON.parse(xhttp.responseText);
        let include = /blog\//i;
        let exclude = /\/blog\/categories/i;
        let filtered = [];

        for (let page of pages) {
            if (include.test(page.href) && !exclude.test(page.href)) {
                filtered.push(page);
            }
        }

        let index = Math.floor((filtered.length - 1) * Math.random());
        window.location = filtered[index]?.href;

    } catch (e) {
        document.body.style.opacity = 1;
    }

}

xhttp.open("GET", "/sitemap.json", true);
xhttp.send();