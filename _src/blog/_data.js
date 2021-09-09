export const type = "blogPost";
export const layout = "layouts/blogPost.njk";
export const templateEngine = "njk,md";
export const areaDescription = "Blog of Braden East";
export const parentTitle = "Blog";
export const sortBy = "date";

export function url(page) {
  return `/blog/${page.data.title}/`
}