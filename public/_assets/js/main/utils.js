function addClass(elem, className) {

    var classList = elem.getAttribute('class');
    elem.setAttribute('class', classList + ' ' + className);

}