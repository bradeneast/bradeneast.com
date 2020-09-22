import prepAnimations from './parts/animations';
import startListeners from './parts/listeners';
import prepMedia from './parts/media';
import Schwifty from './parts/schwifty';

function init() {
	prepMedia();
	prepAnimations();
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