import { $$, elem } from "./utils";

export default function prepAnimations() {

	// Character-split animations
	for (let splitElem of $$('.split')) {
		let chars = splitElem.textContent
			.split('')
			.map((char, i) => {
				let span = elem('span', char.replace(' ', '&nbsp;'));
				span.classList.add('character');
				span.style.setProperty('--index', i);
				return span.outerHTML;
			});
		splitElem.innerHTML = chars.join('');
	}

	for (let paused of $$('.paused'))
		paused.classList.remove('.paused');
}