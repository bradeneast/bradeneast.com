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
  let depth = 0;

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

    if (depth > 99) break;
    depth++;

    content = content.replace(matchEach, string => {

      let attrs = getAttributes(string);
      let path = attrs.use.trim();
      let pathPrefix = /^\./.test(path) ? href : '';
      let brickContent = readLocal(join(src, path, pathPrefix));

      let matchPattern = new RegExp(attrs.from.trim());
      let matchingPages = tree.filter(p => matchPattern.test(p.props.sys.href)) || [];
      let sortParam = getSortParameter(attrs.sort);
      let sortedPages = matchingPages.sort(dynamicSort(sortParam));

      return sortedPages
        .map((page, i) => {
          let props = page.props;
          let nextPage = sortedPages[i + 1];
          let previousPage = sortedPages[i - 1];
          if (nextPage) props.sys.next = nextPage.props;
          if (previousPage) props.sys.previous = previousPage.props;
          return hydrate(brickContent, props);
        })
        .join('')
    })
  }

  return {
    destination: filename.replace(basename(src), basename(dist)),
    content: addGarnish(content, props).trim(),
  }
}

module.exports = render;