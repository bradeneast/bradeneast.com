import { $, $$, elem } from "./utils";


export default function prepMedia() {

	for (let table of $$('table')) {
		table.outerHTML = `<div class="table-wrapper">${table.outerHTML}</div>`;
	}

	// Embedded Codepens
	if ($('.codepen')) {
		let script = elem('script');
		script.src = 'https://static.codepen.io/assets/embed/ei.js';
		script.async = true;
		document.body.append(script);
	}
}