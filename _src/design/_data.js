export default {
  type: "designPost",
  layout: "layouts/post.vto",
  templateEngine: "vto,md",
  parentTitle: "Design"
}

export function url(page) {
  return `/design/${page.data.title}/`
}