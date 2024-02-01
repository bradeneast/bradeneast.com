export default {
  type: "codePost",
  layout: "layouts/codePost.vto",
  templateEngine: "vto,md",
  parentTitle: "Code"
}

export function url(page) {
  return `/code/${page.data.title}/`
}