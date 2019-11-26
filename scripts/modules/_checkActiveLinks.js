// checks url and adds 'active' class to nav links that match
function checkActiveLinks() {

    document.querySelectorAll('.nav-item').forEach(link => {

        let linkTitle = link.textContent;
        let url = window.location.href.toLowerCase();

        if (linkTitle) toggleClass(link, 'active', url.includes(linkTitle.toLowerCase()));

    })

}