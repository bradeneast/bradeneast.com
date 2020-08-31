import { $$, getSitemap } from "./utils";

(async function () {

	document.body.style.opacity = 0;
	setTimeout(() => document.body.style.opacity = 1, 1000);

	let hrefs = [];
	let include = ['/blog/.+'];
	let sitemap = await getSitemap();

	for (let loc of $$('loc', sitemap))
		hrefs.push(loc.textContent.trim());

	let includePattern = new RegExp(`(${include.join(')|(')})`);
	let filtered = hrefs.filter(href => includePattern.test(href));
	let index = Math.round((filtered.length - 1) * Math.random());

	if (filtered[index])
		window.location = filtered[index];

})();