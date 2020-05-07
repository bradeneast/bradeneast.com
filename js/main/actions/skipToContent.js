import { playAudio } from "../utils.js";

export default (e) => {

    let main = document.getElementById('main');
    main.setAttribute('tabindex', -1);
    main.focus();
    playAudio('weow');

}