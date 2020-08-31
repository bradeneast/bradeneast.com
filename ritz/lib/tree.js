import config from '../config.js';
import { walkDirSync, matchTag } from './utils.js';
import { parseBrick } from './parse.js';


export default function makeTree() {

  let tree = [];

  for (let { filename, content } of walkDirSync(config.paths.src, config.ignorePattern)) {

    if (!/\.html$/i.test(filename)) continue;

    let matchBrick = matchTag('Brick');
    let pageProps = {
      sys: {
        content: content,
        filename: filename,
        href: filename
          .replace(config.paths.src, '')
          .replace('index.html', ''),
      },
    };

    while (matchBrick.test(pageProps.sys.content))
      pageProps.sys.content = pageProps.sys.content
        .replace(matchBrick, string =>
          parseBrick(string, pageProps)
        );

    tree.push({
      filename: filename,
      props: pageProps
    });
  }

  return tree;
}