function toggleDarkMode() {

    const darkModeOn = JSON.parse(localStorage.getItem('darkModeOn'));

    darkModeOn ? localStorage.setItem('darkModeOn', false) : localStorage.setItem('darkModeOn', true);
    document.documentElement.classList.toggle('dm');
}