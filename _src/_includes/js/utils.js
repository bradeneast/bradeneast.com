/**A shorthand for `querySelector` */
export let $ = (selector, context = document) => context.querySelector(selector);
/**A shorthand for `querySelectorAll` */
export let $$ = (selector, context = document) => context.querySelectorAll(selector);


/**A shorthand for `document.createElement` */
export let elem = (tagName, content = '') => {
	let tag = document.createElement(tagName);
	tag.innerHTML = content;
	return tag;
}


/**A shorthand for `localStorage` */
export let ls = (key, value) => value == undefined
	? JSON.parse(localStorage.getItem(key))
	: localStorage.setItem(key, JSON.stringify(value));
