import { $, $$, random, togglePreference } from "./utils";

export default function startListeners() {

	let preferences = ['dark_mode'];

	// Preference Toggles
	for (let preference of preferences) {
		let toggle = $(`#${preference}_toggle`);
		if (!toggle) continue;
		toggle.addEventListener('click', () =>
			togglePreference(preference)
		);
	}


	// Listen on all links to the random page
	for (let randomLink of $$('a[href*="/random"]'))
		randomLink.addEventListener('click', event => {
			event.preventDefault();
			random(/\/blog\/.+/i);
		});
}