export function listen(element, callback, event = 'click') {
    if (typeof element[Symbol.iterator] == 'function') {
        for (let elem of element) {
            try { elem.addEventListener(event, callback) }
            catch (e) { elem.attachEvent(`on${event}`, callback) }
        }
    } else {
        try { element.addEventListener(event, callback) }
        catch (e) { element.attachEvent(`on${event}`, callback) }
    }
}

export function playAudio(id) {
    let elem = document.getElementById(id);
    if (elem) elem.play();
}