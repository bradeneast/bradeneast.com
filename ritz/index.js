import { readLocal, clearDist } from './lib/utils.js';
import tree from './lib/tree.js';
import render from './lib/render.js';
import fs from 'fs-extra';

console.time('Build Success');

let useCache = /-dev/i.test(process.argv.toString());
let cache = readLocal('./cache');
fs.writeFile('./cache', JSON.stringify(tree));

if (!cache || !useCache) {
	clearDist();
	tree.map(render);
}

if (cache && cache.length) {
	cache = JSON.parse(cache);

	tree.map((page, index) => {

		let pageSys = page.props.sys;
		let cacheSys = cache[index]?.props?.sys;

		if (pageSys.content != cacheSys?.content)
			render(page);
		else if (pageSys.href != cacheSys?.href)
			render(page);
	})
}

console.timeEnd('Build Success');