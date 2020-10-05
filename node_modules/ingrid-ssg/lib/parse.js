const {
	matchTag,
	getAttributes,
	getInner,
	accessProp,
	readLocal,
	getAbsolutePath,
	getElementProps
} = require('./utils.js');
const { global } = require('./options.js');
const safeEval = require('safe-eval');


/**Parses a stringified Brick HTML element */
function parseBrick(string, pageProps) {

	let { attrs, inner } = getElementProps(string);
	let location = pageProps.sys.href;
	let brickElementChildren = inner.match(matchTag());
	let brickContent = readLocal(getAbsolutePath(attrs.use, location));
	let brickProps = {};
	let setProps = (name, value) => {
		brickProps[name] = value;
		pageProps[name] = value;
	}

	for (let elem of brickElementChildren || []) {
		let { name, attrs, inner } = getElementProps(elem);
		attrs?.use
			? setProps(name, readLocal(getAbsolutePath(attrs.use, location)))
			: setProps(name, inner.trim());
	}

	return fillSlots(brickContent, brickProps);
}


/**Fills slots in a Brick source file */
function fillSlots(string = '', props = {}) {
	return string.replace(
		matchTag('Slot'),
		slot => props[getAttributes(slot).name] || getInner(slot)
	);
}


/**Interpolates variables where it finds double curly braces */
function addGarnish(string = '', props = {}) {
	return string.replace(
		/@?\{\{(.|\n|\r)+?\}\}/g,
		garnish => {
			let isExpression = garnish.charAt(0) == '@';
			let tokenStart = isExpression ? 3 : 2;
			let tokens = garnish.slice(tokenStart, -2);
			try {
				return isExpression
					? safeEval(tokens, props)
					: accessProp(tokens, props) || accessProp(tokens, global)
			} catch (err) {
				console.log(err);
				return '';
			}
		}
	)
}


/**Fills slots and adds garnish */
function hydrate(string = '', props = {}) {
	return addGarnish(
		fillSlots(string, props),
		props
	);
}


module.exports = {
	parseBrick,
	fillSlots,
	addGarnish,
	hydrate,
}