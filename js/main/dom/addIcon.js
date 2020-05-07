export default (elem, content) => {
    try {
        let icon = document.createElement('span');
        icon.classList.add('icon', 'no-select');
        icon.innerHTML = content;
        elem.insertAdjacentElement('beforebegin', icon);
    } catch (e) { }
}