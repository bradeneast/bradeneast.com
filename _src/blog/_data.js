export default {
  type: "blogPost",
  layout: "layouts/blogPost.vto",
  templateEngine: "vto,md",
  parentTitle: "Blog",
  sortBy: "date"
}

export function url(page) {
  return `/blog/${page.data.title}/`
}