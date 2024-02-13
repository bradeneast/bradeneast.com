// @ts-nocheck
import { splitting } from "./_filters.ts";


export async function html(page: any) {
  /**Helper to select an element on the page */
  let $ = (selector: string, context = page.document) => context?.querySelector(selector);
  /**Helper to select many elements on the page */
  let $$ = (selector: string, context = page.document) => context?.querySelectorAll(selector);
}