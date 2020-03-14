export function valueIn(object, query = '') {

    let props = query.split('.');
    let value = { ...object };

    props.map(prop => value = value[prop] || '');

    return value;

}

export function search(value, inArray, matchProps) {

    if (!value.length) return;

    let search = new RegExp(value, 'gi');
    let results = [];

    for (let obj of inArray) {

        matchProps = matchProps.length ? matchProps : Object.keys(obj);

        for (let prop of matchProps) {

            let value = valueIn(obj, prop);

            if (!search.test(value)) continue;
            if (results.find(r => r.content == obj)) continue;

            results.push({
                content: obj,
                matchedBy: value.match(search)
            })
        }
    }

    return results;
}