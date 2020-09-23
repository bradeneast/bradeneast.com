import { $ } from './parts/utils';
import Prism, { languages } from './libs/prism';

let output = $('#output');
let input = $('#input');
let lang = 'javascript';

$('#formatCode').addEventListener('click', () => {
	output.innerHTML = Prism.highlight(input.value, languages[lang], lang);
});

addEventListener('input', event => {
	if (event.target.name == 'lang')
		lang = event.target.id;
})

input.addEventListener('keydown', event => {

	let target = event.target;
	let val = target.value;
	let keycode = event.keyCode || event.which;

	if (keycode == 9) {
		event.preventDefault();
		let start = target.selectionStart;
		let end = target.selectionEnd;
		target.value = val.slice(0, start) + '\t' + val.slice(end);
		target.selectionStart = target.selectionEnd = start + 1;
	}
})