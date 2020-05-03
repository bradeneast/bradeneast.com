export default (elem, content) => {
    let icon = document.createElement('span');
    icon.classList.add('icon', 'no-select');
    icon.innerHTML = content;
    elem.insertAdjacentElement('beforebegin', icon);
}