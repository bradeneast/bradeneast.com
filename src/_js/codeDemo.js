import { $, elem } from './parts/utils';

let pre = $('pre');

$('#formatCode').addEventListener('click', () =>
	Prism.highlightElement(pre, false, () =>
		pre.children = [elem('code', pre.innerHTML)]
	)
);

addEventListener('input', event => {
	if (event.target.name == 'lang')
		pre.setAttribute('class', `language-${event.target.id}`);
})