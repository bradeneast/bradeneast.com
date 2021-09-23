import Schwifty from './_includes/_js/schwifty.js';
import { $, $$, elem, togglePref } from './_includes/_js/utils.js';


function init() {


	// Set aria-current
	$$(`a[href="${location.pathname}"]`)
		.forEach(a => a.setAttribute('aria-current', 'page'));


	// Remove paused class from animating elements
	for (let paused of $$('.paused'))
		paused.classList.remove('.paused');


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


	// Add wrapper div to tables
	for (let table of $$('table'))
		table.outerHTML = `<div class="table-wrapper">${table.outerHTML}</div>`;


	// Add codepen script for embedded Codepens
	if ($('.codepen')) {
		let script = elem('script');
		script.src = 'https://static.codepen.io/assets/embed/ei.js';
		script.async = true;
		document.body.append(script);
	}


	// Listen on back-to-top button
	$('#back_to_top').onclick = () => scrollTo(0, 0);


	// Listen on preference toggles
	for (let pref of window.__preferences) {
		let toggle = $(`#${pref}_toggle`);
		toggle.onclick = () => togglePref(pref);
	}

}


init();


new Schwifty({
	onload: init,
	preserveAttributes: { documentElement: true }
})