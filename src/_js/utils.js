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

export function getSitemap() {
	return fetch('//bradeneast.com/sitemap.xml')
		.then(response => response.text())
		.then(text =>
			new DOMParser().parseFromString(text, 'text/xml')
		)
}