import { $$, elem } from "./utils";

export default function prepAnimations() {

	let animationClass = 'animate-in';
	let observerTargets = $$(`.${animationClass}`);
	let observerOptions = { threshold: 0.2 };
	let observer = new IntersectionObserver(handleIntersection, observerOptions);

	observerTargets.forEach(target => observer.observe(target));

	// Pause animations outside the viewport
	function handleIntersection(entries) {
		entries.map(entry => {

			let target = entry.target;
			let isIntersecting = entry.isIntersecting;
			let r = target.getBoundingClientRect();
			let targetCenter = r.bottom - r.height / 2;
			let viewportCenter = innerHeight / 2;
			let scrollDirection = targetCenter > viewportCenter ? 1 : -1;
			if (!isIntersecting) scrollDirection = 0;

			target.style.setProperty('--animateFrom', scrollDirection);
			target.classList.toggle('intersecting', isIntersecting);

			if (isIntersecting)
				setTimeout(() => target.classList.remove(animationClass), 1000);
		})
	}


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