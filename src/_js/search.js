import { $, $$, getSitemap, altFromSrc, elem } from "./utils";


let resultContainer = $('.results');
let inputThrottle;

$('input[type="search"]')
	.addEventListener('input', event => {
		clearTimeout(inputThrottle);
		inputThrottle = setTimeout(() => handleSearch(event), 200);
	});


/**Takes a query and returns a list of pages  */
function searchSite(query) {
	let results = [];
	let queryRegExp = new RegExp(query, 'i');

	return getSitemap().then(sitemap => {

		for (let loc of $$('loc', sitemap)) {
			let url = loc.textContent.trim();
			results.push({
				absolute: url,
				relative: url.split('/').pop()
			});
		}

		results = results.filter(result =>
			queryRegExp.test(altFromSrc(result.relative))
			&& result.relative.length > 1
		);

		return [...new Set(results)];
	})
}


/**Handles a search input event */
function handleSearch(event) {

	let value = event.target.value;

	searchSite(value)
		.then(results => {

			resultContainer.innerHTML = '';
			if (!value.trim().length) return;

			for (let result of results) {
				let a = elem('a');
				let h2 = elem('h2');
				let li = elem('li');

				a.innerText = altFromSrc(result.relative);
				a.href = result.absolute;
				h2.append(a);

				li.append(h2);
				resultContainer.append(li);
			}
		})
}