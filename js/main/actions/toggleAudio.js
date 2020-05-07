import { playAudio, toggleClass } from "../utils.js";

export default (e) => {

    let name = 'muted';
    let value = JSON.parse(localStorage.getItem(name));

    for (let audio of document.getElementsByTagName('audio')) {
        audio.muted = !value;
    }

    if (value) playAudio('blip');
    try {
        document.documentElement.classList.toggle(name, !value);
    } catch (e) {
        toggleClass(document.documentElement, name, !value);
    }
    localStorage.setItem(name, JSON.stringify(!value));

}