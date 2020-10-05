const { walkDirSync, matchTag } = require('./utils.js');
const options = require('./options.js');
const { parseBrick } = require('./parse.js');
const fs = require('fs-extra');

function makeTree() {

  let tree = [];
  let src = options.src;
  fs.ensureDirSync(src);

  for (let { filename, content } of walkDirSync(src, options.ignorePattern)) {
    // Ignore non-html files
    if (!/\.html$/i.test(filename)) continue;

    let matchBrick = matchTag('Brick');
    let pageProps = {
      sys: {
        href: filename.replace(src, '').replace('index.html', ''),
        content: content
      }
    };
    let sys = pageProps.sys;

    // Match and parse all Bricks in the page
    while (matchBrick.test(sys.content))
      sys.content = sys.content
        .replace(matchBrick, string =>
          parseBrick(string, pageProps)
        )

    // Add page to the tree
    tree.push({
      filename: filename,
      props: pageProps
    })
  }
  return tree;
}


module.exports = makeTree;