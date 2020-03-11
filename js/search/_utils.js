export function valueIn(object, query = '') {

    var props = query.split('.');
    var value = { ...object };

    for (var p in props) {

        var prop = props[p];
        if (!value[prop]) return '';
        value = value[prop];
    }

    return value;

}

export function search(value, inArray, matchProps) {

    if (!value.length) return;

    var search = new RegExp(value, 'gi');
    var results = [];

    for (var i in inArray) {

        var obj = inArray[i];
        matchProps = matchProps.length ? matchProps : Object.keys(obj)

        for (var q in matchProps) {

            var prop = matchProps[q]
            var value = valueIn(obj, prop);

            if (search.test(value)) {

                var result = {
                    content: obj,
                    matchedBy: value.match(search)
                }

                if (results.indexOf(result) > -1) return;

                results.push(result);
            }
        }
    }

    return results;
}