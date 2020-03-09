// @ts-nocheckif (IE) {

var pElems = document.getElementsByTagName('p');

for (var i = 0; i < pElems.length; i++) {

    var p = pElems[i];

    if (!p['data-slug-hash']) continue;
    if (p.innerHTML == "") p.innerHTML = "&#x1F62C; Yikes... this pen isn't available.";

    addCodepenFallback(p)

}

function addCodepenFallback(pen) {

    var codepenio = "https://codepen.io";
    var hash = pen.getAttribute("data-slug-hash");
    var user = pen.getAttribute("data-user");
    var fallback = document.createElement('p');

    if (!hash && !user) fallback.innerText = "This pen is unavailable.";

    if (hash) {

        var a = document.createElement('a');
        var link = [codepenio, 'pen', hash].join('/');

        a.href = link;
        fallback.innerText += 'View ';
        a.innerText = 'this pen';
        fallback.appendChild(a);

    }

    if (hash && user) {

        var a = document.createElement('a');
        var link = [codepenio, user].join('/');

        a.href = link;
        a.innerText = '@' + user;
        fallback.innerText += 'by ';
        fallback.appendChild(a);

    }

    addClass(fallback, 'codepen-fallback');
    fallback.innerHTML += " on CodePen.";
    pen.insertAdjacentElement("afterend", fallback);

}