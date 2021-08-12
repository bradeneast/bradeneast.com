import prepAnimations from './_includes/_js/animations';
import prepCodeBlocks from './_includes/_js/codeBlocks';
import startListeners from './_includes/_js/listeners';
import prepMedia from './_includes/_js/media';
import { $$ } from './_includes/_js/utils';

function init() {

	$$(`a[href="${location.pathname}"]`)
		.forEach(a => a.setAttribute('aria-current', 'page'));

	prepAnimations();
	prepMedia();
	prepCodeBlocks();
	startListeners();
}

init();