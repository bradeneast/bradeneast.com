import safeEval from 'safe-eval';
import html from 'html-parse-stringify';
import { matchTag, getAttributes, getInner, accessProp, readLocal, getAbsolutePath, isValidDate } from './utils.js';
import config from '../config.js';


export function parseBrick(string, props) {

	let attrs = getAttributes(string);
	let ast = html.parse(getInner(string));
	let brickContent = readLocal(getAbsolutePath(attrs.use, props.sys.href));

	for (let { name, children } of ast) {
		if (!children) continue;

		let elem = props.sys.content.match(matchTag(name))[0];
		let attrs = getAttributes(elem);
		let inner = getInner(elem).trim();

		if (isValidDate(inner))
			props[name] = new Date(inner);
		else if (attrs?.use)
			props[name] = readLocal(getAbsolutePath(attrs.use, props.sys.href));
		else
			props[name] = inner;
	}

	return fillSlots(brickContent, props);
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