import prepAnimations from './parts/animations';
import prepCodeBlocks from './parts/codeBlocks';
import startListeners from './parts/listeners';
import prepMedia from './parts/media';
import Schwifty from './parts/schwifty';

function init() {
	prepMedia();
	prepAnimations();
	prepCodeBlocks();
	startListeners();
}

init();

try {
	new Schwifty({
		preserveAttributes: true,
		onload: init,
	})
} catch (err) {
	console.log(err);
}