// @ts-nocheck

// listen for dark mode toggle
var darkModeToggle = document.getElementById('dark_mode_toggle');

function toggleDarkMode() {

    var dmName = 'dark_mode';
    var dm = JSON.parse(localStorage.getItem(dmName));

    document.documentElement.classList.toggle(dmName, !dm);
    localStorage.setItem(dmName, JSON.stringify(!dm));
    document.activeElement.blur();

}

if (darkModeToggle.addEventListener) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
} else if (darkModeToggle.attachEvent) {
    darkModeToggle.attachEvent('onclick', toggleDarkMode);
}