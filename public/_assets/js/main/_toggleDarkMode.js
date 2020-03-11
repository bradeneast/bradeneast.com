// @ts-nocheck
var darkModeToggle = document.getElementById('dark_mode_toggle');

function toggleDarkMode() {

    var dmName = 'dark_mode';
    var dm = JSON.parse(localStorage.getItem(dmName));

    document.documentElement.classList.toggle(dmName, !dm);
    localStorage.setItem(dmName, JSON.stringify(!dm));
    document.activeElement.blur();

}

// listen for dark mode toggle
darkModeToggle.addEventListener('click', toggleDarkMode);