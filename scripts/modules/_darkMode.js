function toggleDarkMode() {

    const setting = localStorage.getItem('darkModeOn');
    let darkModeOn;

    setting ? darkModeOn = JSON.parse(setting) : null;

    darkModeOn ? localStorage.setItem('darkModeOn', 'false') : localStorage.setItem('darkModeOn', 'true');
    document.documentElement.classList.toggle('dm');
}