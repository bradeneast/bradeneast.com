let doc = document.documentElement;
let IE = navigator.userAgent.indexOf('MSIE') > -1 || navigator.appVersion.indexOf('Trident/') > -1;

function checkPreference(name) {

    let value = JSON.parse(localStorage.getItem(name)) || false;
    let classList = doc.getAttribute('class') || '';

    if (value == null) value = false;
    if (value) doc.setAttribute('class', classList + ' ' + name);
    localStorage.setItem(name, JSON.stringify(value));

}


checkPreference('dark_mode');
checkPreference('muted');


if (IE) {

    let retroModeStyles = document.createElement('link');

    retroModeStyles.rel = 'stylesheet';
    retroModeStyles.href = '/_assets/css/retro_mode.min.css';
    retroModeStyles.setAttribute('type', 'text/css');
    doc.appendChild(retroModeStyles);

}