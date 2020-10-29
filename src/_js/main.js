import prepAnimations from './parts/animations';
import prepCodeBlocks from './parts/codeBlocks';
import startListeners from './parts/listeners';
import prepMedia from './parts/media';
import Schwifty from './libs/schwifty';

function init() {
	prepAnimations();
	prepMedia();
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

console.log(`%cAffectionately built with Ingrid :)`, `
		font-family: "Recursive", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Nueue", "Roboto",
		sans-serif;
		font-size: 16px;
		font-weight: bold`);
console.log(`%chttps://github.com/bradeneast/ingrid`, "color: orangered");