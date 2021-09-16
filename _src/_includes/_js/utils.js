/**A shorthand for `querySelector`*/
export let $ = (selector, context = document) => context.querySelector(selector);

/**A shorthand for `querySelectorAll`*/
export let $$ = (selector, context = document) => context.querySelectorAll(selector);

/**Joins all arguments with a newline*/
export let reformLines = (...args) => args.join('\n');

/**Generates a random integer between 0 and the ceiling */
export let randomInt = (max = 10) => Math.round(Math.random() * max);

/**Replaces backslashes with forward slashes and removes trailing and double slashes from a path */
export let normalize = (path) => path.replace(/\/$/, '').replace(/[/\\]+/g, '/');


/**Refreshes the page */
export let redirect = (target = location.href) => location = target;

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
export function togglePref(prefName) {

	let modal = $('.modal');
	let locallySaved = ls(prefName);
	let state = !locallySaved;

	document.documentElement.classList.toggle(prefName, state);
	ls(prefName, state);

	if (modal) {

		modal.innerHTML = `${prefName.replace(/[-_]/g, ' ')} ${state ? 'on' : 'off'}`;
		modal.classList.add('visible');

		let waiter;
		waiter = setTimeout(() => {
			clearTimeout(waiter);
			modal.classList.remove('visible')
		}, 2000);
	}
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