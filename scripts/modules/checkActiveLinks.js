// checks url and adds 'active' class to nav links that match
export function checkActiveLinks() {
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    navItems.map(link => {
        let linkTitle = link.innerHTML.split('<svg')[0];
        getURL().toUpperCase().includes(linkTitle.toUpperCase()) ? link.classList.add('active') : link.classList.remove('active');
    })
    navItems.map(item => {
        item.addEventListener('click', function () {
            setTimeout(checkActiveLinks, 100);
        })
    })
}