/**A shorthand for `querySelector`*/
export let $ = (selector, context = document) => context.querySelector(selector);

/**A shorthand for `querySelectorAll`*/
export let $$ = (selector, context = document) => context.querySelectorAll(selector);

/**Joins all arguments with a newline*/
export let reformLines = (...args) => args.join('\n');


export let elem = (tagName, content = '') => {
	let tag = document.createElement(tagName);
	tag.innerHTML = content;
	return tag;
}


/**A shorthand for `localStorage`
 * @param {string} key
 * @param {string} value
*/
export let ls = (key, value) => value == undefined
	? JSON.parse(localStorage.getItem(key))
	: localStorage.setItem(key, JSON.stringify(value));


/**Toggle a user preference saved in `localStorage` as a class on the `documentElement`
 * @param {string} className
*/
export function togglePref(className) {
	let locallySaved = ls(className);
	document.documentElement.classList.toggle(className, !locallySaved);
	ls(className, !locallySaved);
}


/**Tries to extract a human-readable filename from urls
 * @param {string} src
*/
export function altFromSrc(src) {
	let decoded = decodeURIComponent(src) || '';
	let name = decoded.split('/').pop();
	let result = name?.split('.')?.shift()?.replace(/-|\+/g, ' ');
	return result || '';
}


/**Fetches /sitemap.xml and runs a callback on the document response
 * @param {function} callback
*/
export function getSitemap(callback) {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.status == 200 && xhttp.responseXML)
			callback(xhttp.responseXML);
	}
	xhttp.responseType = 'document';
	xhttp.open('GET', '/sitemap.xml', true);
	xhttp.send();
}


/**Fetches the sitemap and picks a random loc to navigate to
 * @param {RegExp} matcher
 */
export function getRandomPage(matcher) {
	return getSitemap(sitemap => {
		if (!sitemap)
			window.location = '/random';

		let locs = Array.from($$('loc', sitemap));
		let hrefs = locs.map(loc => loc.textContent.trim());
		let filtered = hrefs.filter(href => matcher.test(href));
		let index = Math.round((filtered.length - 1) * Math.random());

		if (filtered[index])
			window.location = filtered[index];
		else return false;
	})
}