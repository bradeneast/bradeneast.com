import fs from 'fs-extra';
import marked from 'marked';
import prism from 'prismjs';
import config from '../config.js';

/**Joins parts of a URL with a forward slash */
export let slash = (...parts) => parts.join('/');

/**Gets the tag name of the first HTML element in a string */
export let getTagName = string => string.match(/(?<=<).+?(?=[ >])/)?.[0];

/**Matches the outer HTML of the first tag with that name */
export let matchTag = tagName => tagName
	? new RegExp(`<${tagName}((.|\n|\r)(?!<${tagName}))+?<\/${tagName}>`, 'g')
	: /<(\w*)\b.*?>((.|\n|\r)(?!<\1))*?<\/\1>/g;


/**Gets the inner HTML of a tag */
export function getInner(string) {
	let tagName = getTagName(string);
	let matcher = new RegExp(`(?<=<${tagName}.*?>)((.|\n|\r)(?!<${tagName}))+?(?=<\/${tagName}>)`);
	return string.match(matcher)?.[0] || '';
};


/**Takes a relative path and converts it to an absolute path in the src folder */
export function getAbsolutePath(path, currentDir) {
	path = path.trim();
	return slash(
		config.paths.src,
		path[0] == '.' ? currentDir : '',
		path
	)
}


/**Reads a local file and parses it as markdown if the extension is '.md' */
export function readLocal(path) {

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


/**Hard to explain */
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

/**Checks if the argument can be parsed as a valid date */
export function isValidDate(value) {
	value = new Date(value);
	return value && Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value);
}


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

/**Returns a deep iterable of files from the given directory */
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

/**Clears the dist directory */
export async function clearDist() {
	// Clear Dist Directory
	for (let filename of fs.readdirSync(config.paths.dist)) {
		if (config.ignorePattern.test(filename)) continue;
		fs.removeSync(slash(config.paths.dist, filename));
	}
	return 'Done!';
}