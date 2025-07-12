import { $, $$ } from "./_includes/js/utils.js";
import observer from "./_includes/js/observer.js";

/** Run initial functions for each page */
function init() {

  let videoElem = $(".background-vid video");
  let headlines = $$("h1 span");

  headlines.forEach(headline => {
    headline.addEventListener("mouseover", showVideo);
    headline.addEventListener("mouseout", hideVideo);
  })

  function showVideo() {
    document.body.classList.add("show-video");
    videoElem.play();
  }

  function hideVideo() {
    document.body.classList.remove("show-video");
    videoElem.pause();
  }


  $$("[data-animate]").forEach(elem => {
    elem.setAttribute("data-offscreen", true);
    setTimeout(() => observer.observe(elem), 100);
  });

}

init();