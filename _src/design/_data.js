export const type = "designPost";
export const layout = "layouts/designPost.njk";
export const templateEngine = "njk,md";
export const areaDescription = "Design work of Braden East";
export const parentTitle = "Design";

export function url(page) {
  return `/design/${page.data.title}/`
}