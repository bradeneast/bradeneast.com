export default () => {

    let dmName = 'dark_mode';
    let dm = JSON.parse(localStorage.getItem(dmName));

    document.documentElement.classList.toggle(dmName, !dm);
    localStorage.setItem(dmName, JSON.stringify(!dm));

}