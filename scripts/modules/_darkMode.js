function toggleDarkMode() {

    document.documentElement.classList.toggle('dm');

    let setting = localStorage.getItem('darkModeOn');
    let favicon = document.getElementById('favicon');
    let darkModeOn = setting ? JSON.parse(setting) : false;

    if (darkModeOn) {
        favicon.setAttribute('href', favicon.href.replace('dark', 'light'));
        localStorage.setItem('darkModeOn', false);
        return;
    }

    if (!darkModeOn) {
        favicon.setAttribute('href', favicon.href.replace('light', 'dark'));
        localStorage.setItem('darkModeOn', true);
    }
}