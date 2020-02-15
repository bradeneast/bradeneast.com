// @ts-nocheck

export default function addCodepenFallback(pen) {

    let codepenio = "https://codepen.io";
    let hash = pen.getAttribute("data-slug-hash");
    let user = pen.getAttribute("data-user");
    let fallback = document.createElement('p');

    if (!hash && !user) fallback.innerText = "This pen is unavailable.";

    if (hash && user) {

        let a = document.createElement('a');
        let link = [codepenio, user].join('/');

        a.href = link;
        a.innerText = '@' + user;
        fallback.appendChild('by ');
        fallback.appendChild(a);

    }

    if (hash) {

        let a = document.createElement('a');
        let link = [codepenio, 'pen', hash].join('/');

        a.href = link;
        a.innerText = 'this pen';
        fallback.appendChild(a);

    }

    fallback.classList.add('codepen-fallback');
    fallback.innerHTML += " on CodePen.";
    pen.insertAdjacentElement("afterend", fallback);

}