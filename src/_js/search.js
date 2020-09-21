import { $, $$, getSitemap, altFromSrc, elem } from "./utils";


let resultContainer = $('.results');
let inputThrottle;
let sitemap;

$('input[type="search"]')
	.addEventListener('input', event => {
		clearTimeout(inputThrottle);
		inputThrottle = setTimeout(() => handleSearch(event), 200);
	});


/**Takes a query and returns a list of pages  */
function searchSite(query, callback) {

	function processSitemap(sitemap) {
		let locs = Array.from($$('loc', sitemap));
		let results = locs.map(loc => {
			let url = loc.textContent.trim();
			return {
				absolute: url,
				relative: url.split('/').pop()
			}
		});
		let filteredResults = results.filter(url =>
			new RegExp(query, 'i')
				.test(
					altFromSrc(url.relative)
				)
			&& url.relative.length > 1
		);

		callback([...new Set(filteredResults)]);
	}

	sitemap
		? processSitemap(sitemap)
		: getSitemap(xmlDoc => {
			sitemap = xmlDoc;
			processSitemap(sitemap);
		})
}


/**Handles a search input event */
function handleSearch(event) {

	let value = event.target.value;

	searchSite(value, results => {
		resultContainer.innerHTML = '';
		if (!value.trim().length) return;

		for (let result of results) {
			let a = elem('a');
			let h2 = elem('h2');
			let li = elem('li');

			a.innerText = altFromSrc(result.relative);
			a.href = result.absolute;
			a.setAttribute('data-no-schwifty', 1);
			h2.append(a);

			li.append(h2);
			resultContainer.append(li);
		}
	})
}