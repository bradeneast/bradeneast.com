export default (e) => {

    e.preventDefault();

    let main = document.getElementById('main');

    main.setAttribute('tabindex', -1);
    main.focus();

}