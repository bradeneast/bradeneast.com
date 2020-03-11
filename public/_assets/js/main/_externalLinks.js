// open external links in a new tab
var anchors = document.getElementsByTagName('a');

for (var i = 0; i < anchors.length; i++) {

    var a = anchors[i];

    if (!(new RegExp(location.origin, 'i').test(a.href))) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
    }

}