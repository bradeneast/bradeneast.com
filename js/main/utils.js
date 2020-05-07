export function listen(element, callback, event = 'click') {
    if (element.length) {
        for (let elem of element) {
            try { elem.addEventListener(event, callback) }
            catch (e) {
                console.log(e)
                try { elem.attachEvent(`on${event}`, callback) } catch (e) {
                    console.log(e)
                }
            }
        }
    }
    else {
        try { element.addEventListener(event, callback) }
        catch (e) {
            console.log(e)
            try { element.attachEvent(`on${event}`, callback) } catch (e) {
                console.log(e)
            }
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


export function toggleClass(elem, className = '', force) {

    let classList = elem.getAttribute('class') || '';
    let matchName = new RegExp(escapeRegex(className), 'i');
    let isPresent = matchName.test(classList);

    if (isPresent || !force) elem.setAttribute('class', classList.replace(matchName, ''));
    if (!isPresent || force) elem.setAttribute('class', classList + ' ' + className);

}