
function toggleDarkMode() {
    const darkModeOn = JSON.parse(localStorage.getItem('darkModeOn'));
    darkModeOn ? localStorage.setItem('darkModeOn', false) : localStorage.setItem('darkModeOn', true);
    document.body.classList.toggle('dm');
}

function checkDarkMode() {

    if (JSON.parse(localStorage.getItem('darkModeOn'))) {
        
        document.body.classList.toggle('dm')
        
        }
        
}