import { $$, elem } from "./utils";

export default function prepAnimations() {


	// Default state is reduced motion - all animations paused
	document.body.classList.remove('reduced-motion');
	for (let pausedAnimation of $$('.paused'))
		pausedAnimation.classList.remove('paused');


	// Pause animations outside the viewport
	let handleIntersection = entries => {
		entries.map(entry =>
			entry.target.classList.toggle('paused', !entry.isIntersecting)
		)
	};
	let observerOptions = { threshold: .63 };
	let observer = new IntersectionObserver(handleIntersection, observerOptions);

	for (let animation of $$('.animation'))
		observer.observe(animation);


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
}