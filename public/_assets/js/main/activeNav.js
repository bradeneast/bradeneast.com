// add active class to appropriate nav item
var nav = document.getElementById('nav');
var navItems = nav.getElementsByTagName('a');

for (var i = 0; i < navItems.length; i++) {

    var url = location.pathname;
    var area = url.length <= 1 ? url : url.split('/')[1];
    var item = navItems[i];
    var href = item.getAttribute('href');

    if (href == area || href.split('/')[1].includes(area)) {
        item.classList.add('active');
        break;
    }

}