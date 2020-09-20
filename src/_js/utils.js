export let $ = (selector, context = document) => context.querySelector(selector);
export let $$ = (selector, context = document) => context.querySelectorAll(selector);

export let elem = (tagName, content = '') => {
	let tag = document.createElement(tagName);
	tag.innerHTML = content;
	return tag;
}

export let ls = (key, value) => value == undefined
	? JSON.parse(localStorage.getItem(key))
	: localStorage.setItem(key, JSON.stringify(value));

export let togglePreference = (className) => {
	let locallySaved = ls(className);
	document.documentElement.classList.toggle(className, !locallySaved);
	ls(className, !locallySaved);
}

// get image alt text from image src url
export function altFromSrc(src = '') {
	let decoded = decodeURIComponent(src) || '';
	let name = decoded.split('/').pop();
	let result = name?.split('.')?.shift()?.replace(/-|\+/g, ' ');
	return result || '';
}

export function getSitemap(callback) {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.status == 200 && xhttp.responseXML)
			return callback(xhttp.responseXML);
	}
	xhttp.responseType = 'document';
	xhttp.open('GET', '/sitemap.xml', true);
	xhttp.send();
}



// Random links
export function random(fromPagesMatching) {
	return getSitemap(sitemap => {

		if (sitemap.querySelector('parsererror')) {
			window.location = '/random';
			return;
		}

		let hrefs = [];
		for (let loc of $$('loc', sitemap))
			hrefs.push(loc.textContent.trim());

		let filtered = hrefs.filter(href => fromPagesMatching.test(href));
		let index = Math.round((filtered.length - 1) * Math.random());

		if (filtered[index])
			window.location = filtered[index];
		else return false;
	})
}