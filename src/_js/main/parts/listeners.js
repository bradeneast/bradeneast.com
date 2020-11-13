import { $, $$, getRandomPage, togglePref } from "../../utils";

export default function startListeners() {


	// Preference Toggles
	for (let pref of window.__preferences) {
		let toggle = $(`#${pref}_toggle`);
		toggle.addEventListener('click', () => togglePref(pref));
	}


	// Listen on all links to the random page
	for (let randomLink of $$('a[href*="/random"]'))
		randomLink
			.addEventListener('click', event => {
				event.preventDefault();
				getRandomPage(/\/blog\/.+/i);
			})
}