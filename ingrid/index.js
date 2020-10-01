import { readLocal, slash } from './lib/utils.js';
import tree from './lib/tree.js';
import render from './lib/render.js';
import options from './lib/options.js';
import fs from 'fs-extra';


console.time('Built in');

// Determines whether or not to use the cache
let useCache = /-dev/i.test(process.argv.toString());
let cache = readLocal('./cache');
fs.writeFile('./cache', JSON.stringify(tree));


// Render normally if no cache
if (!cache || !useCache) {

	// Clear the dist directory
	for (let filename of fs.readdirSync(options.paths.dist))
		if (!options.ignorePattern.test(filename))
			fs.removeSync(slash(options.paths.dist, filename));

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