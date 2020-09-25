import { readLocal, slash } from './lib/utils.js';
import tree from './lib/tree.js';
import render from './lib/render.js';
import fs from 'fs-extra';
import config from './ritz.config.js';


console.time('Built in');

// Determines if 
let useCache = /-dev/i.test(process.argv.toString());

// Store current cache and start overwriting asynchronously
let cache = readLocal('./cache');
fs.writeFile('./cache', JSON.stringify(tree));


// Render normally if no cache
if (!cache || !useCache) {

	// Clear the dist directory
	for (let filename of fs.readdirSync(config.paths.dist))
		if (!config.ignorePattern.test(filename))
			fs.removeSync(slash(
				config.paths.dist,
				filename
			));

	tree.map(render);
}


// Render from cache
if (cache && cache.length) {

	cache = JSON.parse(cache);

	tree.map((page, index) => {
		let pageSys = page.props.sys;
		let cacheSys = cache[index]?.props?.sys || {};

		// Rudimentary diff for page content and file paths (works for 90% of changes)
		if (pageSys.content != cacheSys.content)
			render(page);
		else if (pageSys.href != cacheSys.href)
			render(page);
	})
}


console.timeEnd('Built in');