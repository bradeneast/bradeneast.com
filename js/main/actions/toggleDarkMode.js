import { playAudio, toggleClass } from "../utils.js";

export default () => {

    playAudio('bloop');

    let name = 'dark_mode';
    let value = JSON.parse(localStorage.getItem(name));

    try {
        document.documentElement.classList.toggle(name, !value);
    } catch (e) {
        toggleClass(document.documentElement, name, !value);
    }

    localStorage.setItem(name, JSON.stringify(!value));

}