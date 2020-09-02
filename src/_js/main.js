import Schwifty from './schwifty.js';
import { $, altFromSrc, togglePreference, $$, elem } from './utils';

function init() {

	// Preference Toggles
	for (let preference of ['dark_mode', 'muted']) {
		let toggle = $(`#${preference}_toggle`);
		if (toggle)
			toggle.addEventListener('click', () => togglePreference(preference))
	}


	// Image Titles and Alts
	for (let img of $$('img')) {
		if (img.title?.length) continue;
		img.title = !img.alt ? altFromSrc(img.src) : img.alt
		img.parentElement.classList.add('has-img');
	}


	// Embedded Codepens
	if ($('.codepen')) {
		let script = elem('script');
		script.src = 'https://static.codepen.io/assets/embed/ei.js';
		script.async = true;
		document.body.append(script);
	}


	// Embedded Projects
	for (let project of $$('.embedded_project')) {

		let button = $('button', project);
		let iframe = $('iframe', project);

		button.addEventListener('click', () => {
			iframe.src = iframe.getAttribute('data-src');
			project.classList.add('loaded');
		})
	}
}

init();

try {
	new Schwifty({
		preserveAttributes: true,
		onload: init,
	})
} catch (err) {
	console.log(err);
}