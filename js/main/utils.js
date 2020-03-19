export function listen(element, callback, event = 'click') {
    try { element.addEventListener(event, callback) }
    catch (e) { element.attachEvent(`on${event}`, callback) }
}