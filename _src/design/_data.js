export default {
  type: "designPost",
  layout: "layouts/designPost.njk",
  templateEngine: "njk,md",
  parentTitle: "Design"
}

export function url(page) {
  return `/design/${page.data.title}/`
}