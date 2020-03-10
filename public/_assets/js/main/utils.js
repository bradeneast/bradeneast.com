function addClass(elem, className) {

    var classList = elem.getAttribute('class');
    elem.setAttribute('class', classList + ' ' + className);

}

function valueIn(object, query = '') {

    var props = query.split('.');
    var value = { ...object };

    props.map(prop => value = value[prop]);

    return value;

}