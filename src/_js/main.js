import Schwifty from './schwifty.js';
import { $, altFromSrc, togglePreference, $$, elem } from './utils';

function init() {

	// Preference Toggles
	for (let preference of ['dark_mode', 'muted']) {
		let toggle = $(`#${preference}_toggle`);
		if (toggle)
			toggle.addEventListener('click', () => togglePreference(preference))
	}

	// Pause animations outside the viewport
	let animationHandler = new IntersectionObserver(entries =>
		entries.map(entry =>
			entry.target.classList
				.toggle('paused', !entry.isIntersecting)
		),
		{
			threshold: .63
		}
	);
	for (let animation of $$('.animation')) {
		animationHandler.observe(animation);
	}


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