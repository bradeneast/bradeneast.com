export default (textContent = '') => {

    let tip = document.createElement('span');

    tip.innerText = textContent;
    tip.classList.add('tooltip');

    return tip;

}