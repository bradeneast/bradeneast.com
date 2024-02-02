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


/**Toggle a user preference saved in `localStorage` as a class on the `documentElement` */
export function togglePref(prefName) {

	let modal = $('.modal');
	let locallySaved = ls(prefName);
	let state = !locallySaved;

	document.documentElement.classList.toggle(prefName, state);
	ls(prefName, state);

	if (!modal) return;
	modal.innerHTML = `${prefName.replace(/[-_]/g, ' ')} ${state ? 'on' : 'off'}`;
	modal.classList.add('visible');

	let waiter;
	waiter = setTimeout(() => {
		clearTimeout(waiter);
		modal.classList.remove('visible')
	}, 2000);
}