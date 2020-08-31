import fs from 'fs-extra';
import makeTree from './lib/tree.js';
import render from './lib/render.js';
import config from './config.js';
import { slash } from './lib/utils.js';

console.time('Build Success');

// Clear Dist Directory
for (let filename of fs.readdirSync(config.paths.dist)) {
  if (config.ignorePattern.test(filename)) continue;
  fs.removeSync(slash(config.paths.dist, filename));
}
console.log('Dist Directory Cleared');


let tree = makeTree();
render(tree);
console.timeEnd('Build Success');