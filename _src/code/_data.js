export default {
  type: "codePost",
  layout: "layouts/post.vto",
  templateEngine: "vto,md",
  parentTitle: "Code"
}

export function url(page) {
  return `/code/${page.data.title}/`
}