try {

    function checkPreference(name) {

        let doc = document.documentElement;
        let value = JSON.parse(localStorage.getItem(name)) || false;
        let classList = doc.getAttribute('class') || '';

        if (value == null) value = false;
        if (value) doc.setAttribute('class', classList + ' ' + name);
        localStorage.setItem(name, JSON.stringify(value));

    }

    checkPreference('dark_mode');
    checkPreference('muted');

} catch (e) {
    console.log(e);
}