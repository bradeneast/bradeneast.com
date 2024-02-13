import observer from './_includes/js/observer.js';
import watchShowcase from './_includes/js/showcase.js';
import { $, $$, elem } from './_includes/js/utils.js';


function init() {

	// Observe animating elements
	$$("[data-animate]").forEach(elem => {
		elem.style.setProperty("--onscreen", 0);
		setTimeout(() => observer.observe(elem), 100);
	});

	$$(".showcase").forEach(elem => watchShowcase(elem));

	// Set aria-current
	$$(`a[href="${location.pathname}"]`)
		.forEach(a => a.setAttribute('aria-current', 'page'));


	// Add line numbers to code blocks
	for (let code of $$('code[class*="language-"')) {

		let pre = code.closest('pre');
		let lineNumbers = elem('span');
		let lineCount = code.innerHTML.split(/\n/).length;

		lineNumbers.classList.add('line-numbers-rows');
		lineNumbers.setAttribute('aria-hidden', true);
		for (let i = 0; i < lineCount; i++)
			lineNumbers.append(elem('span'));

		pre.classList.add('line-numbers');
		pre.append(lineNumbers);
	}


	// Add codepen script for embedded Codepens
	if ($('.codepen')) {
		let script = elem('script');
		script.src = 'https://static.codepen.io/assets/embed/ei.js';
		script.async = true;
		document.body.append(script);
	}

	new Rellax('.rellax');

}


init();