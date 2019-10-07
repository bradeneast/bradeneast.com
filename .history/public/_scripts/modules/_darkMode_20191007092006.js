const darkModeOn = JSON.parse(localStorage.getItem('darkModeOn'));
function toggleDarkMode() {
    darkModeOn ? localStorage.setItem('darkModeOn', false) : localStorage.setItem('darkModeOn', true);
    document.body.classList.toggle('dm');
}

function checkDarkMode() {
    if (darkModeOn) { document.body.classList.toggle('dm') }
}