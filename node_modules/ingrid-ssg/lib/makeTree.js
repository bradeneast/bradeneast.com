const { walkDirSync, matchTag } = require('./utils.js');
const { src, ignorePattern } = require('./options.js');
const { parseBrick } = require('./parse.js');
const { extname, dirname, basename } = require('path');


function makeTree() {

  let tree = [];
  let matchBrick = matchTag('Brick');

  for (let { filename, content } of walkDirSync(src, ignorePattern)) {

    if (extname(filename) != '.html')
      continue; // Skip non-html files

    let props = {
      sys: {
        href: dirname(filename.replace(basename(src), '')),
        content: content
      }
    };

    // Match and parse all Bricks in the page
    while (matchBrick.test(props.sys.content))
      props.sys.content = props.sys.content
        .replace(matchBrick, string => parseBrick(string, props))

    // Add page to the tree
    tree.push({
      filename: filename,
      props: props
    })
  }

  return tree;
}


module.exports = makeTree;