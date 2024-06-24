/**@returns {HTMLElement} */
export let $ = (selector, context = document) => context.querySelector(selector);

/**@returns {NodeList} */
export let $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

export let setProp = (elem, propName, propValue) => elem.style.setProperty(`--${propName}`, propValue);

/**@returns {String} */
export let attr = (element, attributeName) => {
  let a = element.getAttribute(attributeName);
  if (a) {
    try {
      return JSON.parse(a)
    }
    catch (e) {
      return a;
    }
  }
}

export let toggleRootClass = (className, force) => {
  document.documentElement.classList.toggle(className, force);
}

/**@returns {Number} */
export let round = (x, places = 0) =>
  places
    ? Math.round(x * 10 * places) / (10 * places)
    : Math.round(x);

/** Debounces animations with requestAnimationFrame */
let lastFrame = 0;
export let debounce = (callback, interval = 10) => requestAnimationFrame(thisFrame => {
  if (thisFrame - lastFrame > interval) {
    lastFrame = thisFrame;
    callback();
  }
})


const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))];
export const randomString = length => Array.from(Array(length)).map(randomChar).join("");

/**
 * Returns a number whose value is limited to the given range.
 *
 * Example: limit the output of this computation to between 0 and 255
 * (x * 255).clamp(0, 255)
 *
 * @param {Number} min The lower boundary of the output range
 * @param {Number} max The upper boundary of the output range
 * @returns A number in the range [min, max]
 * @type Number
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

export function copyToClipboard(targetElem, value) {

  let textarea = document.createElement("textarea");

  getSelection().removeAllRanges();
  textarea.innerText = value;
  textarea.style.position = "absolute";
  textarea.style.opacity = .001;
  targetElem.appendChild(textarea);

  textarea.focus();
  textarea.setSelectionRange(0, 99999);
  document.execCommand("copy");

  targetElem.classList.add("copied");
  setTimeout(() => targetElem.classList.remove("copied"), 2000);

  textarea.remove();
}