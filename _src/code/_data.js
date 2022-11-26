export default {
  type: "codePost",
  layout: "layouts/codePost.njk",
  templateEngine: "njk,md",
  parentTitle: "Code"
}

export function url(page) {
  return `/code/${page.data.title}/`
}