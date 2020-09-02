import { readLocal, clearDist } from './lib/utils.js';
import makeTree from './lib/tree.js';
import render from './lib/render.js';
import fs from 'fs-extra';

console.time('Build Success');

let treeReady = makeTree();
let cacheReady = readLocal('./cache');
let readyToRender = Promise.all([treeReady, cacheReady]);

readyToRender.then(([tree, cached]) => {
	fs.writeFile('./cache', JSON.stringify(tree));

	if (cached) {
		cached = JSON.parse(cached);
		console.log(tree.length, cached.length);
		tree.map((page, index) => {
			if (page.props.sys.content == cached[index].props.sys.content) return;
			if (page.props.sys.href == cached[index].props.sys.href) return;
			render(page);
		})
	}
	else {
		clearDist().then(() => tree.map(render));
	}

	console.timeEnd('Build Success');
});