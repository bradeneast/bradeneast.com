function toggleDarkMode() {

    const setting = localStorage.getItem('darkModeOn');
    const favicon = document.getElementById('favicon');
    let darkModeOn;

    if (setting) darkModeOn = JSON.parse(setting);

    if (darkModeOn) {
        darkModeOn = false;
        favicon.setAttribute('href', favicon.href.replace('dark', 'light'));
    }

    if (!darkModeOn) {
        darkModeOn = true;
        favicon.setAttribute('href', favicon.href.replace('light', 'dark'));
    }

    localStorage.setItem('darkModeOn', darkModeOn);
    toggleClass(document.documentElement, 'dm');
}