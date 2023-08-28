// @ts-nocheck
import { splitting } from "./_filters.ts";


export async function html(page: any) {

  /**Helper to select an element on the page */
  let $ = (selector: string, context = page.document) => context.querySelector(selector);
  /**Helper to select many elements on the page */
  let $$ = (selector: string, context = page.document) => context.querySelectorAll(selector);

  /**Tries to extract a human-readable filename from urls */
  function altFromSrc(src: string) {
    let decoded = decodeURIComponent(src) || '';
    let name = decoded.split('/').pop();
    let result = name?.split('.')?.shift()?.replace(/-|\+/g, ' ');
    return result || '';
  }

  // Split all H1 elements by character for animating
  let h1 = $("h1");
  if (h1) {
    h1.classList.add("splitting");
    h1.innerHTML = splitting(h1.innerText);
  }

  let images = $$("img,video");
  images.forEach(img => {
    if (!img.alt?.length)
      img.alt = img.alt || altFromSrc(img.src);
    if (!img.hasAttribute('aria-hidden'))
      img.parentElement.classList.add('has-media');
  })
}