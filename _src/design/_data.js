export default {
  type: "designPost",
  layout: "layouts/designPost.vto",
  templateEngine: "vto,md",
  parentTitle: "Design"
}

export function url(page) {
  return `/design/${page.data.title}/`
}