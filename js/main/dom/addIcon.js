export default (elem, content) => {
    let icon = document.createElement('span');
    icon.classList.add('icon');
    icon.innerText = content;
    elem.insertAdjacentElement('beforebegin', icon);
}