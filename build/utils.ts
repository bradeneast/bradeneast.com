export {
    dynamicSort,
    matchBetween,
    linkify,
    deepCopy,
    firstElementChild,
    walkAst,
    escRegExp,
    tryFunc,
    tag,
    tab,
    leadingZero,
    escapeEntities,
    pageMatchesBlob,
    sanitizeForPlainText,
}


function sanitizeForPlainText(str: string) {
    return str.replace(/<.+?>/g, '').replace(/(?=["'`“”‘’])/g, '\\');
}

function pageMatchesBlob(page, str: string) {
    let testAgainst = /\/\*/.test(str) ? 'parentDir' : 'href';
    str = str.toLowerCase().replace(/(^\/)|(\/\*$)/gm, '');
    return page[testAgainst].includes(str);
}


function leadingZero(n) {
    if (typeof n == 'string') {
        n = parseInt(n);
    }
    if (n < 10) return `0${n}`;
    if (n > 10) return n.toString();
}


function escapeEntities(str: string) {
    return str
        .replace(/\&/g, '&#x26;')
        .replace(/'/g, '&#x27;')
        .replace(/"/g, '&#x22;')
        .replace(/\>/g, '&#x3E;')
        .replace(/\</g, '&#x3c;')
}


function tab(n) {
    let tabs = '\t';
    for (let i = 0; i < n - 1; i++) tabs += '\t';
    return tabs;
}


function tag({
    name,
    attributes = [],
    content = ''
}) {
    let attrs = [];
    attributes.map(a => attrs.push(
        `${a.name}="${a.value}"`
    ))
    return `<${name}${attributes.length ? ' ' + attrs.join(' ') : ''}${content.length ? '>' + content + '</' + name + '>' : '/>'}`
}


function tryFunc(limit: number, callback: { (): any }, tries: number = 0) {
    try {
        callback();
    } catch (err) {
        if (tries < limit) {
            tryFunc(limit, callback, tries + 1);
        }
    }
}


function escRegExp(str: string): string {
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}


function* walkAst(ast: any[]) {
    for (let node of ast) {
        yield node;
        if (node.children) yield* walkAst(node.children);
    }
}


function deepCopy(object = {}) {
    return JSON.parse(JSON.stringify(object));
}


function linkify(path: string) {
    return encodeURI(
        path
            .replace(/['"`?!]|\&.{0,5};/g, '')
            .replace(/[ _,.:+=~*^$@;<>\[\]\(\)\{\}\|]/g, '-')
            .replace(/\-+/g, '-')
            .toLowerCase()
    )
}


function firstElementChild(element) {
    return element.children.find(e => e.type !== 'text');
}


function dynamicSort(property) {

    let sortOrder = 1;

    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a, b) {

        let result = 0;
        let aVal = parseInt(a[property]) || a[property];
        let bVal = parseInt(b[property]) || b[property];

        if (aVal < bVal) result = -1;
        else if (aVal > bVal) result = 1;

        return result * sortOrder;
    }
}


/** matches a string between two characters or sets of characters */
function matchBetween(str: string, a, b) {

    let first = typeof a == 'number' ? a : str.indexOf(a) + a.length;
    let last = typeof b == 'number' ? b : str.indexOf(b, first);

    if (first <= a.length - 1) return null;

    let match = str.substring(first, last);

    return match.length ? match : null;
}