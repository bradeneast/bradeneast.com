// checks url and adds 'active' class to nav links that match
function checkActiveLinks() {

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(link => {

        let linkTitle = link.innerText.toLowerCase();
        let url = window.location.href.toLowerCase();

        url.includes(linkTitle) ? link.classList.add('active') : link.classList.remove('active');

        link.addEventListener('click', function () {
            setTimeout(checkActiveLinks, 100);
        })
    })
}