import { $, $$, altFromSrc, elem } from "./utils";


export default function prepMedia() {

	// Image alts
	for (let media of $$('img, video')) {
		if (!media.alt?.length)
			media.alt = media.alt || altFromSrc(media.src);
		media.parentElement.classList.add('has-media');
		media.parentElement.title = media.title;
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