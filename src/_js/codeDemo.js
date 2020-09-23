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