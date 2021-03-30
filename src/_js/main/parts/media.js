import { $, $$, altFromSrc, elem } from "../../utils";


export default function prepMedia() {

	// Image alts
	for (let media of $$('img, video')) {
		if (!media.alt?.length)
			media.alt = media.alt || altFromSrc(media.src);
		media.parentElement.classList.add('has-media');
	}

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