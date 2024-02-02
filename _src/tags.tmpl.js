export const layout = "layouts/tag.vto";

export default function* ({ search }) {
  for (const tag of search.values("tags")) {
    yield {
      url: `/tags/${tag}/`,
      title: `Tagged “${tag}”`,
      type: "tag",
      tag,
    };
  }
}