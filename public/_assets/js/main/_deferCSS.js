// load non critical css
var links = document.getElementsByTagName('link');

for (var i = 0; i < links.length; i++) {

    var link = links[i];

    if (link['defer'] || link.getAttribute('defer')) {

        link.rel = 'stylesheet';

    }
}