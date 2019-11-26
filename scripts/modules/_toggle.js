const toggles = Array.from(document.getElementsByClassName('toggle'));
const toggleThreshold = 20;

// touch functionality for toggles on mobile
function startTouchListeners() {

    let startX;
    let amt;

    window.addEventListener('touchstart', function (e) {

        startX = parseInt(e.changedTouches[0].clientX);

    })

    window.addEventListener('touchend', function (e) {

        amt = startX - e.changedTouches[0].clientX;

        if (e.target.id == 'darkModeToggle') {

            if (JSON.parse(localStorage.getItem('darkModeOn'))) {

                amt > toggleThreshold ? toggleDarkMode() : null;

            } else {

                amt < (toggleThreshold * -1) ? toggleDarkMode() : null;

            }

        }
    })
}