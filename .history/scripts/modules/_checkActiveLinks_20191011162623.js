// checks url and adds 'active' class to nav links that match
function checkActiveLinks() {

    document.querySelectorAll('.nav-item').forEach(link => {

        let linkTitle = link.textContent;
        let url = window.location.href.toLowerCase();

        if (linkTitle) {
            url.includes(linkTitle.toLowerCase()) ? link.classList.add('active') : link.classList.remove('active');
        }

    })

}