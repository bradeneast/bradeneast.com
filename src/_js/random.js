import { $$, getSitemap } from "./utils";

export default function random() {
	let hrefs = [];
	let include = ['/blog/.+'];

	getSitemap().then(sitemap => {

		for (let loc of $$('loc', sitemap))
			hrefs.push(loc.textContent.trim());

		let includePattern = new RegExp(`(${include.join(')|(')})`);
		let filtered = hrefs.filter(href => includePattern.test(href));
		let index = Math.round((filtered.length - 1) * Math.random());

		if (filtered[index])
			window.location = filtered[index];
	})
}