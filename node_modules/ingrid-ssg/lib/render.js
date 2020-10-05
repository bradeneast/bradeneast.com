const options = require('./options.js');
const { addGarnish, hydrate } = require('./parse.js');
const { join, basename } = require('path');
const {
  dynamicSort,
  matchTag,
  getAttributes,
  readLocal,
  slash
} = require('./utils.js');

function render({ filename, props }, tree) {

  let { src, dist } = options;
  let { content, href } = props.sys;
  let matchEach = matchTag('Each');

  function getSortParameter(string = 'sys.href') {
    let reverse = '';
    if (string[0] == '-') {
      reverse = '-';
      string = string.slice(1);
    }
    return reverse + 'props.' + string;
  }

  // Parse <Each> Elements
  while (matchEach.test(content)) {
    content = content.replace(matchEach, string => {

      let attrs = getAttributes(string);
      let path = attrs.use.trim();
      let pathPrefix = /^\./.test(path) ? href : '';
      let brickContent = readLocal(join(src, path, pathPrefix));

      let matchPattern = new RegExp(attrs.from.trim());
      let matchingPages = tree.filter(p => matchPattern.test(slash(p.filename))) || [];
      let sortParam = getSortParameter(attrs.sort);

      return matchingPages
        .sort(dynamicSort(sortParam))
        .map(page => hydrate(brickContent, page.props))
        .join('')
    })
  }

  return {
    destination: filename.replace(basename(src), basename(dist)),
    content: addGarnish(content, props).trim(),
  }
}

module.exports = render;