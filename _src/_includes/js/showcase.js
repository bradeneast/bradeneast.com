import { $, $$ } from "./utils.js";

export default function watchShowcase(showcase) {
  let selectedClass = "selected";
  let trayItems = $$(".showcase__tray--item", showcase);

  trayItems.forEach(item => item.addEventListener("click", () => {

    let relation = item.getAttribute("for");
    let currentSelection = $(`.${selectedClass}`, showcase);
    let newSelection = $(`[data-showcase-id=${relation}]`, showcase);

    currentSelection.classList.remove(selectedClass);
    newSelection.classList.add(selectedClass);
  }))
}