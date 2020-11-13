import { $, elem, ls, reformLines } from './utils';
import Prism, { languages } from './libs/prism';

let output = $('#output');
let input = $('#input');

let queryParameters = new URLSearchParams(location.search);
let retrievedFromLocalStorage = ls('codeDemo');
let value = queryParameters.get('value');
let lang = queryParameters.get('lang');

let codeExampleLanguage = lang || retrievedFromLocalStorage?.lang || 'javascript';
let codeExampleValue = value || retrievedFromLocalStorage?.value || '';
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
			target.value = reformLines(
				selectedLinesString,
				subsequentLinesString
			);
		else if (!subsequentLines.length)
			target.value = reformLines(
				precedingLinesString,
				selectedLinesString
			);
		else
			target.value = reformLines(
				precedingLinesString,
				selectedLinesString,
				subsequentLinesString
			);

		target.setSelectionRange(
			start + moveSelectionRange,
			end + moveSelectionRange
		);
	}
}


let highlightInput = () => {

	let lineNumbers = elem('span');
	let lineCount = codeExampleValue.split(/\n/).length;

	lineNumbers.classList.add('line-numbers-rows');
	lineNumbers.setAttribute('aria-hidden', true);
	for (let i = 0; i < lineCount; i++)
		lineNumbers.append(elem('span'));

	codeExampleValue = Prism.highlight(
		input.value,
		languages[codeExampleLanguage],
		codeExampleLanguage
	);
	output.innerHTML = '';
	output.append(elem('code', codeExampleValue));
	output.append(lineNumbers);

	ls('codeDemo', { value: input.value, lang: codeExampleLanguage });
	queryParameters.set('value', input.value);
	queryParameters.set('lang', codeExampleLanguage);
	history.pushState(null, null, location.pathname + '?' + queryParameters.toString())
}


let handleKeyup = event => {
	let keycode = event.keyCode || event.which;
	waiter = setTimeout(highlightInput, 250);
	if (keycode == 16)
		shiftPressed = false;
}


addEventListener('input', event => {
	if (event.target.name == 'lang') {
		codeExampleLanguage = event.target.id;
		highlightInput();
	}
})
input.addEventListener('keydown', handleKeydown);
input.addEventListener('keyup', handleKeyup);

input.value = codeExampleValue;
$(`#${codeExampleLanguage}`).checked = true;
highlightInput();