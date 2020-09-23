import { $ } from './parts/utils';
import Prism, { languages } from './libs/prism';

let output = $('#output');
let input = $('#input');
let highlightButton = $('#highlightButton');
let lang = 'javascript';
let shiftPressed = false;


let handleKeydown = event => {

	let target = event.target;
	let val = target.value;
	let keycode = event.keyCode || event.which;

	if (keycode == 16)
		shiftPressed = true;

	// Handle Tab Indentation
	if (keycode == 9 && val.length) {
		event.preventDefault();

		let start = target.selectionStart;
		let end = target.selectionEnd;
		let preceding = val.slice(0, start);
		let following = val.slice(end);

		if (shiftPressed) {
			// Unindent current line by 1 tab
			let precedingLines = preceding.split(/\n/);
			let currentLine = precedingLines.pop();
			target.value = precedingLines.join('\n') + currentLine.replace(/^\t/, '\n') + following;
			target.selectionStart = target.selectionEnd = start - 1;
		} else {
			// Indent current line by 1 tab
			target.value = preceding + '\t' + following;
			target.selectionStart = target.selectionEnd = start + 1;
		}

	}
}


let handleKeyup = event => {
	let keycode = event.keyCode || event.which;
	if (keycode == 16)
		shiftPressed = false;
}


addEventListener('input', event => {
	if (event.target.name == 'lang')
		lang = event.target.id;
})


input.addEventListener('keydown', handleKeydown);
input.addEventListener('keyup', handleKeyup);
highlightButton.addEventListener('click', () => {
	output.innerHTML = Prism.highlight(input.value, languages[lang], lang);
});