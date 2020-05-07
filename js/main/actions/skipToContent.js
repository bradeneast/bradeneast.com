import { playAudio } from "../utils.js";

export default (e) => {

    e.preventDefault();
    playAudio('weow');

    let main = document.getElementById('main');
    main.setAttribute('tabindex', -1);
    main.focus();

}