export {
    dynamicSort,
    matchBetween,
    linkify,
    deepCopy,
    firstElementChild,
    walkAst,
    escRegExp,
    tryFunc,
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
            .replace(/['"`?!]/g, '')
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

        if (a[property] < b[property]) result = -1;
        else if (a[property] > b[property]) result = 1;

        return result * sortOrder;
    }
}


function matchBetween(str: string, a, b) {

    const first = typeof a == 'number' ? a : str.indexOf(a) + a.length;
    const last = typeof b == 'number' ? b : str.indexOf(b, first);
    const match = str.substring(first, last);

    return match.length ? match : null;
}