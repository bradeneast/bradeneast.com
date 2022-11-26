export default {
  type: "blogPost",
  layout: "layouts/blogPost.njk",
  templateEngine: "njk,md",
  parentTitle: "Blog",
  sortBy: "date"
}

export function url(page) {
  return `/blog/${page.data.title}/`
}