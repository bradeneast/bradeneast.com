import { $, $$, altFromSrc, elem } from "./utils";


export default function prepMedia() {

	// Image alts
	for (let img of $$('img')) {
		if (!img.alt?.length)
			img.alt = img.alt || altFromSrc(img.src);
		img.parentElement.classList.add('has-img');
		img.parentElement.title = img.title;
	}


	// Embedded Codepens
	if ($('.codepen')) {
		let script = elem('script');
		script.src = 'https://static.codepen.io/assets/embed/ei.js';
		script.async = true;
		document.body.append(script);
	}


	// Embedded Projects
	// for (let project of $$('.embedded_project')) {

	// 	let button = $('button', project);
	// 	let iframe = $('iframe', project);

	// 	button.addEventListener('click', () => {
	// 		iframe.src = iframe.getAttribute('data-src');
	// 		project.classList.add('loaded');
	// 	})
	// }
}