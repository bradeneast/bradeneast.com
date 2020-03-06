// @ts-nocheck
export default function () {

    var dmName = 'dark_mode';
    var dm = JSON.parse(localStorage.getItem(dmName));

    document.documentElement.classList.toggle(dmName, !dm);
    localStorage.setItem(dmName, JSON.stringify(!dm));
    document.activeElement.blur();

}