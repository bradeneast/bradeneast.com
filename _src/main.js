import { $, $$ } from "./_includes/js/utils.js";
import observer from "./_includes/js/observer.js";
import { watchForms } from "./_includes/js/forms.js";
import { watchEverfault } from "./_includes/js/everfault_hover.js";

/** Run initial functions for each page */
function init() {

  watchForms();

  $$("[data-animate]").forEach(elem => {
    elem.setAttribute("data-offscreen", true);
    setTimeout(() => observer.observe(elem), 100);
  });

  watchEverfault();

  // Add codepen script for embedded Codepens
  if ($('.codepen')) {
    let script = elem('script');
    script.src = 'https://static.codepen.io/assets/embed/ei.js';
    script.async = true;
    document.body.append(script);
  }

}

init();