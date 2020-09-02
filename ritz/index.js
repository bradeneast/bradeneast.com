import makeTree from './lib/tree.js';
import render from './lib/render.js';
import { clearDist } from './lib/utils.js';


console.time('Build Success');

let treeIsBuilt = makeTree();
let distIsCleared = clearDist();
let readyToRender = Promise.all([treeIsBuilt, distIsCleared]);

readyToRender.then(([tree, distCleared]) => render(tree));
console.timeEnd('Build Success');