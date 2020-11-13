import { $$, elem } from "../../utils";

export default function prepCodeBlocks() {
	for (let code of $$('code[class*="language-"')) {

		let pre = code.closest('pre');
		let lineNumbers = elem('span');
		let lineCount = code.innerHTML.split(/\n/).length;

		lineNumbers.classList.add('line-numbers-rows');
		lineNumbers.setAttribute('aria-hidden', true);
		for (let i = 0; i < lineCount; i++)
			lineNumbers.append(elem('span'));

		pre.classList.add('line-numbers');
		pre.append(lineNumbers);
	}
}