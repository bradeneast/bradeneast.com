export function listen(element, callback, event = 'click') {
    if (typeof element[Symbol.iterator] == 'function') {
        for (let elem of element) {
            try { elem.addEventListener(event, callback) }
            catch (e) {
                try { elem.attachEvent(`on${event}`, callback) } catch (e) { }
            }
        }
    } else {
        try { element.addEventListener(event, callback) }
        catch (e) {
            try { element.attachEvent(`on${event}`, callback) } catch (e) { }
        }
    }
}


export function playAudio(id = '') {
    let elem = document.getElementById(id);
    if (elem) elem.play();
}


export function escapeRegex(str = '') {
    return str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}


export function toggleClass(elem, className = '', force = null) {

    let classList = elem.getAttribute('class');
    let matchName = new RegExp(escapeRegex(className), 'i');

    if (force == null) return;

    if (matchName.test(classList) || !force) {
        elem.setAttribute(
            'class',
            classList.replace(matchName, '')
        );
    }

    if (!matchName.test(classList) || force) {
        elem.setAttribute(
            'class',
            classList + ' ' + className
        );
    }

}