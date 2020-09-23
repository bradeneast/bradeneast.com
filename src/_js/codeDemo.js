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

		let tabMatcher = /^/gm;
		let tabReplacer = '\t';
		let moveSelectionRange = 1;

		if (shiftPressed) {
			tabMatcher = /^\t/gm;
			tabReplacer = '';
			moveSelectionRange = -1;
		}

		let start = target.selectionStart;
		let end = target.selectionEnd;
		let selection = val.slice(start, end);

		let allLines = val.split(/\n/);
		let precedingLines = val.slice(0, start).split(/\n/).slice(0, -1);
		let selectionStartLine = precedingLines.length;
		let selectionEndLine = selectionStartLine + selection.split(/\n/).length;
		let selectedLines = allLines.slice(selectionStartLine, selectionEndLine);
		let subsequentLines = allLines.slice(selectionEndLine);

		let precedingLinesString = precedingLines.join('\n');
		let selectedLinesString = selectedLines.join('\n').replace(tabMatcher, tabReplacer);
		let subsequentLinesString = subsequentLines.join('\n');


		if (!precedingLines.length)
			target.value = [
				selectedLinesString,
				subsequentLinesString
			].join('\n');
		else if (!subsequentLines.length)
			target.value = [
				precedingLinesString,
				selectedLinesString
			].join('\n');
		else
			target.value = [
				precedingLinesString,
				selectedLinesString,
				subsequentLinesString
			].join('\n');

		target.setSelectionRange(start + moveSelectionRange, end + moveSelectionRange);
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