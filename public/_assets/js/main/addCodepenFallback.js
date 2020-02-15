// @ts-nocheck

function addCodepenFallback(pen) {

    let codepenio = "https://codepen.io";
    let hash = pen.getAttribute("data-slug-hash");
    let user = pen.getAttribute("data-user");
    let fallback = document.createElement('p');

    if (!hash && !user) fallback.innerText = "This pen is unavailable.";

    if (hash) {

        let a = document.createElement('a');
        let link = [codepenio, 'pen', hash].join('/');

        a.href = link;
        fallback.innerText += 'View ';
        a.innerText = 'this pen';
        fallback.appendChild(a);

    }

    if (hash && user) {

        let a = document.createElement('a');
        let link = [codepenio, user].join('/');

        a.href = link;
        a.innerText = '@' + user;
        fallback.innerText += 'by ';
        fallback.appendChild(a);

    }

    fallback.classList.add('codepen-fallback');
    fallback.innerHTML += " on CodePen.";
    pen.insertAdjacentElement("afterend", fallback);

}