export const type = "codePost";
export const layout = "layouts/codePost.njk";
export const templateEngine = "njk,md";
export const areaDescription = "Explorations in web development";
export const parentTitle = "Code";

export function url(page) {
  return `/code/${page.data.title}/`
}