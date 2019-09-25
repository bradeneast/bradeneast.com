const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

function toggleDarkMode() {
    JSON.parse(localStorage.getItem('darkModeOn')) ? localStorage.setItem('darkModeOn', false) : localStorage.setItem('darkModeOn', true);
    document.body.classList.toggle('dm');
}

function checkDarkMode(code) {

    JSON.parse(localStorage.getItem('darkModeOn')) ? document.body.classList.toggle('dm') : null;

    let current = 0;
    document.addEventListener('keydown', function (e) {
        if (code.indexOf(e.key) < 0 || e.key !== code[current]) {
            current = 0;
            return;
        }
        current++;
        code.length === current ? toggleDarkMode() : null;
    })
}