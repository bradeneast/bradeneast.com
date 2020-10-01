import fs from 'fs-extra';
import options from './options.js';
import { getSortParameter, dynamicSort, matchTag, slash, getAttributes, readLocal } from './utils.js';
import tree from './tree.js';
import { addGarnish, hydrate } from './parse.js';

export default function render({ filename, props }) {

  let content = props.sys.content;
  let destination = filename.replace(options.paths.src, options.paths.dist);
  let matchEach = matchTag('Each');

  // Parse <Each> Elements
  while (matchEach.test(content)) {
    content = content.replace(matchEach, string => {

      let attrs = getAttributes(string);
      let path = attrs.use.trim();
      let pathPrefix = /^\./.test(path) ? props.sys.href : '';
      let brickContent = readLocal(slash(options.paths.src, pathPrefix, path));

      let matchPattern = new RegExp(attrs.from.trim());
      let matchingPages = tree.filter(p => matchPattern.test(p.filename)) || [];
      let sortParam = getSortParameter(attrs.sort);

      return matchingPages
        .sort(dynamicSort(sortParam))
        .map(page => hydrate(brickContent, page.props))
        .join('')
    })
  }

  fs.ensureFileSync(destination);
  fs.writeFile(destination, addGarnish(content, props).trim());
}