import { playAudio } from "../utils.js";

export default (e) => {
    playAudio('hiya');
    window.scrollTo(0, 0);
    document.getElementById('skip_link').focus();
}