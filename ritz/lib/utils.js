import fs from 'fs-extra';
import marked from 'marked';
import prism from 'prismjs';
import config from '../config.js';


export let slash = (...parts) => parts.join('/');
export let matchTag = (tagName = '') => new RegExp(`[\t ]*<${tagName}(.|\n|\r)+?<\/${tagName}>`, 'g');


export function getAbsolutePath(path, currentDir) {
	path = path.trim();
	return slash(
		config.paths.src,
		path[0] == '.' ? currentDir : '',
		path
	)
}


export function readLocal(path) {
	let isMarkdown = /md/i.test(path.split('.').pop());
	if (isMarkdown)
		marked.setOptions({
			smartLists: true,
			smartypants: true,
			highlight: (code, lang, callback) =>
				prism.highlight(code, prism.languages[lang], lang),
		});
	return isMarkdown
		? marked(fs.readFileSync(path, 'utf-8'))
		: fs.readFileSync(path, 'utf-8');
}


export function accessProp(string = '', obj = {}) {
	let tokens = string.split('.');
	let index = 0;
	let result = obj[tokens[index]];

	if (tokens.length == 1) return result;
	if (result == undefined) return;

	while (result[tokens[index + 1]]) {
		index++;
		result = result[tokens[index]];
	}
	return result;
}


export function getSortParameter(string = '') {
	let reverse = '';
	if (string[0] == '-') {
		reverse = '-';
		string = string.slice(1);
	}
	return reverse + 'props.' + string;
}


/** Sorts an array of objects by comparing the values of a property those objects have in common
 * (For use inside the Array.sort() method)
 * @param {string} property The property whose value will be compared in the sort
*/
export function dynamicSort(property) {

	let sortOrder = 1;

	if (property[0] == '-') {
		sortOrder = -1;
		property = property.substr(1);
	}

	return function (a, b) {

		let result = 0;
		let [aVal, bVal] = [a, b].map(obj => {
			let prop = accessProp(property, obj);
			return parseFloat(prop) || prop;
		});

		if (aVal < bVal) result = -1;
		else if (aVal > bVal) result = 1;
		return result * sortOrder;
	}
}


export function isValidDate(date) {
	return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}


export function getInner(string) {
	let tagName = string.match(/(?<=<).+?(?=[ >])/)[0];
	let start = string.indexOf('>') + 1;
	let end = string.indexOf(`</${tagName}>`);
	return string.slice(start, end);
};


export function getAttributes(string) {
	let firstLine = string.split(/[\n\r]/)[0];
	let attributeChunks = firstLine.match(/(?<= +).+?=["'].+?(?=["'])/g);
	let attributes = {};

	if (attributeChunks)
		attributeChunks.map(chunk => {
			let [key, value] = chunk.split('="');
			attributes[key] = value;
		});

	return attributes;
}


export function* walkDirSync(dirname, ignorePattern) {
	for (let filename of fs.readdirSync(dirname)) {
		if (ignorePattern.test(filename)) continue;

		let newPath = slash(dirname, filename);
		let isDirectory = fs.lstatSync(newPath).isDirectory();

		if (isDirectory) yield* walkDirSync(newPath, ignorePattern);
		if (!isDirectory) yield {
			filename: newPath,
			content: fs.readFileSync(newPath, 'utf-8')
		}
	}
}


export async function clearDist() {
	// Clear Dist Directory
	for (let filename of fs.readdirSync(config.paths.dist)) {
		if (config.ignorePattern.test(filename)) continue;
		fs.removeSync(slash(config.paths.dist, filename));
	}
	return 'Done!';
}