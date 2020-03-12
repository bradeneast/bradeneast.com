export function listen(element, eventType = 'click', callback) {

    if (element.addEventListener) {
        element.addEventListener(eventType, callback)
    } else {
        element.attachEvent(`on${eventType}`, callback)
    }

}