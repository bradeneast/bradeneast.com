function linkify(string) {
    return encodeURI(string.replace(/[^A-Za-z0-9\-\s]/g, '').toLowerCase()).replace(/%20/g, '-');
}


function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function trimWhiteSpace(string) {
    return string.replace(/\n+/gm, '\n').replace(/\s+/gm, ' ');
}

const helpers = {
    linkify: linkify,
    dynamicSort: dynamicSort,
    trimWhiteSpace: trimWhiteSpace
}

module.exports = helpers;