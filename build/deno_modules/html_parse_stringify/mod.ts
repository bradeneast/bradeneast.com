/*jshint -W030 */
var tagRE = /<[a-zA-Z\-\!\/](?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])*>/g;

import parseTag from './parse_tag.ts';
// re-used obj for quick lookups of components
var empty = Object.create ? Object.create(null) : {};

function parse(html: any, options = {
    components: empty
}) {
    var result = [];
    var current;
    var level = -1;
    var arr = [];
    var byTag = {};
    var inComponent = false;

    html.replace(tagRE, function (tag: string, index: any) {
        if (inComponent) {
            if (tag !== ('</' + current.name + '>')) {
                return;
            } else {
                inComponent = false;
            }
        }
        var isOpen = tag.charAt(1) !== '/';
        var start = index + tag.length;
        var nextChar = html.charAt(start);
        var parent;

        if (isOpen) {
            level++;

            current = parseTag(tag);
            if (current.type === 'tag' && options.components[current.name]) {
                current.type = 'component';
                inComponent = true;
            }

            if (!current.voidElement && !inComponent && nextChar && nextChar !== '<') {
                current.children.push({
                    type: 'text',
                    content: html.slice(start, html.indexOf('<', start))
                });
            }

            byTag[current.tagName] = current;

            // if we're at root, push new base node
            if (level === 0) {
                result.push(current);
            }

            parent = arr[level - 1];

            if (parent) {
                parent.children.push(current);
            }

            arr[level] = current;
        }

        if (!isOpen || current.voidElement) {
            level--;
            if (!inComponent && nextChar !== '<' && nextChar) {
                // trailing text node
                // if we're at the root, push a base text node. otherwise add as
                // a child to the current node.
                parent = level === -1 ? result : arr[level].children;

                // calculate correct end of the content slice in case there's
                // no tag after the text node.
                var end = html.indexOf('<', start);
                var content = html.slice(start, end === -1 ? undefined : end);
                // if a node is nothing but whitespace, no need to add it.
                if (!/^\s*$/.test(content)) {
                    parent.push({
                        type: 'text',
                        content: content
                    });
                }
            }
        }
    });

    return result;
};

function attrString(attrs) {
    var buff = [];
    for (var key in attrs) {
        buff.push(key + '="' + attrs[key] + '"');
    }
    if (!buff.length) {
        return '';
    }
    return ' ' + buff.join(' ');
}

function makeString(buff, doc) {
    switch (doc.type) {
        case 'text':
            return buff + doc.content;
        case 'tag':
            buff += '<' + doc.name + (doc.attrs ? attrString(doc.attrs) : '') + (doc.voidElement ? '/>' : '>');
            if (doc.voidElement) {
                return buff;
            }
            return buff + doc.children.reduce(makeString, '') + '</' + doc.name + '>';
    }
}

function stringify(doc) {
    return doc.reduce(function (token, rootEl) {
        return token + makeString('', rootEl);
    }, '');
};

export default {
    stringify,
    parse
}