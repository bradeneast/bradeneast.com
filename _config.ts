//@ts-nocheck
import lume from "lume/mod.ts";
import esbuild from "lume/plugins/esbuild.ts";
import transformImages from "lume/plugins/transform_images.ts";
import sass from "lume/plugins/sass.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";

// Create site
const site = lume({ src: "_src" });

// Copy assets
site.copy("_");
site.copy([".mp4"]);
site.copy([".svg"]);

site.filter(
  "getRelatedPosts",
  (postsList, tags) => postsList.filter(post => {
    for (let tag of tags)
      if (post.tags.includes(tag)) return post;
  })
);

site.process([".html"], (pages) => {
  for (const page of pages) {
    page.document.querySelectorAll("img, video").forEach(elem => {
      if (!elem.hasAttribute('aria-hidden'))
        elem.parentElement.classList.add('has-media');
    })
  }
});

site.use(esbuild({ target: "es6" }));
site.use(transformImages());
site.use(sass());
site.use(slugify_urls());
site.use(date());

export default site;