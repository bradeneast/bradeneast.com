function populateCodepen(element) {

    const codePen = "https://codepen.io/";
    const hash = element.getAttribute("data-slug-hash");
    const user = element.getAttribute("data-user");
    const fallback = document.createElement('p');

    if (hash) fallback.innerHTML += `View <a href="${codePen}pen/${hash}">this pen</a>`;
    if (hash && user) fallback.innerHTML += ` by <a href="${codePen + user}">@${user}</a>`;

    fallback.innerHTML = hash || user ? fallback.innerHTML + " on CodePen." : "This pen is unavailable.";
    element.insertAdjacentElement("afterend", fallback);

}