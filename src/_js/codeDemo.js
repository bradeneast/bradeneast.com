import { $, ls } from './parts/utils';
import Prism, { languages } from './libs/prism';

let output = $('#output');
let input = $('#input');
let retrieved = ls('codeDemo');
let lang = retrieved?.lang || 'javascript';
let value = retrieved?.value || '';
let shiftPressed = false;
let waiter;


let handleKeydown = event => {

	clearTimeout(waiter);

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
			let currentLine = precedingLines.pop().replace(/^\t/, '\n');
			target.value = precedingLines.join('\n') + currentLine + following;
			target.selectionStart = target.selectionEnd = start - 1;

		} else {
			// Indent current line by 1 tab
			target.value = preceding + '\t' + following;
			target.selectionStart = target.selectionEnd = start + 1;
		}
	}
}


let highlightInput = () => {
	value = Prism.highlight(input.value, languages[lang], lang);
	ls('codeDemo', { value: input.value, lang: lang });
	output.innerHTML = value;
}


let handleKeyup = event => {
	let keycode = event.keyCode || event.which;
	waiter = setTimeout(highlightInput, 250);
	if (keycode == 16)
		shiftPressed = false;
}


addEventListener('input', event => {
	if (event.target.name == 'lang') {
		lang = event.target.id;
		highlightInput();
	}
})
input.addEventListener('keydown', handleKeydown);
input.addEventListener('keyup', handleKeyup);

input.value = value;
$(`#${lang}`).checked = true;
highlightInput();