const options = require('./options.js');
const { addGarnish, hydrate } = require('./parse.js');
const { getSortParameter, dynamicSort, matchTag, slash, getAttributes, readLocal } = require('./utils.js');

function render({ filename, props }, tree) {

  let { src, dist } = options;
  let content = props.sys.content;
  let matchEach = matchTag('Each');

  // Parse <Each> Elements
  while (matchEach.test(content)) {
    content = content.replace(matchEach, string => {

      let attrs = getAttributes(string);
      let path = attrs.use.trim();
      let pathPrefix = /^\./.test(path) ? props.sys.href : '';
      let brickContent = readLocal(slash(src, pathPrefix, path));

      let matchPattern = new RegExp(attrs.from.trim());
      let matchingPages = tree.filter(p => matchPattern.test(p.filename)) || [];
      let sortParam = getSortParameter(attrs.sort);

      return matchingPages
        .sort(dynamicSort(sortParam))
        .map(page => hydrate(brickContent, page.props))
        .join('')
    })
  }

  return {
    destination: filename.replace(src, dist),
    content: addGarnish(content, props).trim(),
  }
}

module.exports = render;