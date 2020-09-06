import safeEval from 'safe-eval';
import { matchTag, getAttributes, getInner, accessProp, readLocal, getAbsolutePath, isValidDate, getElementProps } from './utils.js';
import config from '../config.js';


export function parseBrick(string, pageProps) {

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
		if (isValidDate(inner))
			setProps(name, new Date(inner));
		else if (attrs?.use)
			setProps(
				name,
				readLocal(
					getAbsolutePath(attrs.use, location)
				)
			);
		else
			setProps(name, inner.trim());
	}

	return fillSlots(brickContent, brickProps);
}


export function fillSlots(string = '', props = {}) {
	return string.replace(
		matchTag('Slot'),
		slot => props[getAttributes(slot).name] || getInner(slot)
	);
}


export function addGarnish(string = '', props = {}) {
	return string.replace(
		/@?\{\{(.|\n|\r)+?\}\}/g,
		garnish => {
			let isExpression = garnish.charAt(0) == '@';
			let tokenStart = isExpression ? 3 : 2;
			let tokens = garnish.slice(tokenStart, -2);
			try {
				return isExpression
					? safeEval(tokens, props)
					: accessProp(tokens, props) || accessProp(tokens, config.global)
			} catch (err) {
				console.log(err);
				return '';
			}
		}
	)
}


export function hydrate(string = '', props = {}) {
	return addGarnish(
		fillSlots(string, props),
		props
	);
}