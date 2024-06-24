import { $, debounce, randomString } from "./utils.js";

export function watchEverfault() {

  let everfault = $(".everfault");
  if (!everfault) return;

  let letters = $(".everfault__letters", everfault);
  letters.innerText = randomString(12000);

  document.body.onmousemove = e => handleEverfaultHover(e, true);
  document.body.ontouchmove = e => handleEverfaultHover(e.touches[0]);

  function handleEverfaultHover(e, isMouse) {

    let rect = everfault.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    debounce(() => {

      let text = randomString(6000);
      letters.innerText = text + text;

      if (isMouse) {
        letters.style.setProperty("--x", `${x}px`);
        letters.style.setProperty("--y", `${y}px`);
      }
    }, 50)
  }
}