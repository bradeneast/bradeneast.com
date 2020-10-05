const fs = require('fs-extra');
const marked = require('marked');
const prism = require('prismjs');
const { src } = require('./options.js');
const { join } = require('path');

let slash = string => string.replace(/\\/g, '/');

/**Gets the tag name of the first HTML element in a string */
let getTagName = string => string.match(/(?<=<).+?(?=[ >])/)?.[0];


/**Matches the outer HTML of the first tag with that name */
let matchTag = tagName => tagName
	? new RegExp(`<${tagName}((.|\n|\r)(?!<${tagName}))+?<\/${tagName}>`, 'g')
	: /<(\w*)\b.*?>((.|\n|\r)(?!<\1))*?<\/\1>/g;


/**Gets all basic properties of a stringified HTML element */
function getElementProps(string) {
	return {
		inner: getInner(string),
		attrs: getAttributes(string),
		name: getTagName(string)
	}
}


/**Gets the inner HTML of a tag */
function getInner(string) {
	let tagName = getTagName(string);
	let matcher = new RegExp(`(?<=<${tagName}.*?>)((.|\n|\r)(?!<${tagName}))+?(?=<\/${tagName}>)`);
	return string.match(matcher)?.[0] || '';
}


/**Takes a stringified HTML element and returns a map of its attributes */
function getAttributes(string) {
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


/**Takes a relative path and converts it to an absolute path in the src folder */
function getAbsolutePath(path, currentDir) {
	path = path.trim();
	return join(
		src,
		path[0] == '/' ? '' : currentDir,
		path
	)
}


/**Reads a local file and parses it as markdown if the extension is '.md' */
function readLocal(path) {

	fs.ensureFileSync(path);
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


/**Takes a 'path' of properties and returns the value at the end of the 'path' within a given object */
function accessProp(string = '', obj = {}) {
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


/** Sorts an array of objects by comparing the values of a property those objects have in common
 * (For use inside the Array.sort() method)
 * @param {string} property The property whose value will be compared in the sort
*/
function dynamicSort(property) {

	let sortOrder = 1;

	if (property[0] == '-') {
		sortOrder = -1;
		property = property.substr(1);
	}

	return function (a, b) {

		let result = 0;
		let [aVal, bVal] = [a, b].map(obj => {
			let prop = accessProp(property, obj);
			return parseFloat(prop) || new Date(prop).getTime() || prop;
		});

		if (aVal < bVal) result = -1;
		else if (aVal > bVal) result = 1;
		return result * sortOrder;
	}
}


/**Returns a deep iterable of files from the given directory */
function* walkDirSync(dirname, ignorePattern) {
	for (let filename of fs.readdirSync(dirname)) {
		if (ignorePattern.test(filename)) continue;

		let newPath = join(dirname, filename);
		let isDirectory = fs.lstatSync(newPath).isDirectory();

		if (isDirectory) yield* walkDirSync(newPath, ignorePattern);
		if (!isDirectory) yield {
			filename: slash(newPath),
			content: fs.readFileSync(newPath, 'utf-8')
		}
	}
}


module.exports = {
	getTagName,
	matchTag,
	getAbsolutePath,
	getElementProps,
	getInner,
	getAttributes,
	accessProp,
	readLocal,
	dynamicSort,
	walkDirSync,
	slash
}