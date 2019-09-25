const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const darkModeSuccess = 'Dark Mode unlocked. Repeat code to turn off.';

function toggleDarkMode() {
    JSON.parse(localStorage.getItem(`darkModeOn`)) ? localStorage.setItem(`darkModeOn`, false) : localStorage.setItem(`darkModeOn`, true);
    document.body.classList.toggle(`dm`);
}

function initDarkMode(code, successMessage) {

    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = 'body.dm{background:currentColor}body.dm h1,body.dm h2,body.dm h3,body.dm h4,body.dm h5,body.dm p,body.dm ul,body.dm ol,body.dm p img,body.dm ul img,body.dm ol img{filter:invert(100%)}body.dm ul h1,body.dm ul h2,body.dm ul h3,body.dm ul h4,body.dm ul h5,body.dm ul p,body.dm ol h1,body.dm ol h2,body.dm ol h3,body.dm ol h4,body.dm ol h5,body.dm ol p{filter:none}';
    document.head.appendChild(darkModeStyles);

    let current = 0;
    let darkModeOn = JSON.parse(localStorage.getItem('darkModeOn')) || false;

    darkModeOn ? document.body.classList.toggle('dm') : null;

    document.addEventListener('keydown', function (e) {
        if (code.indexOf(e.key) < 0 || e.key !== code[current]) {
            current = 0;
            return;
        }

        current++;

        code.length === current ? toggleDarkMode() : null;
    })
}