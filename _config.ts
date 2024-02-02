// @ts-nocheck
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";
import sass from "lume/plugins/sass.ts";
import esbuild from "lume/plugins/esbuild.ts";
import transformImages from "lume/plugins/transform_images.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import markdownItCheckbox from "https://jspm.dev/markdown-it-checkbox";
import * as processors from "./_processors.ts";
import * as filters from "./_filters.ts";

const lumeOptions = {
  src: "_src",
  location: new URL("https://bradeneast.com")
};
const pluginOptions = {
  markdown: { plugins: [[markdownItCheckbox]] }
};

export default
  lume(lumeOptions, pluginOptions)
    .copy("assets", ".")
    .copy("main.css")
    .copy("retro.css")

    .process([".html"], (pages) => pages.forEach(processors.html))

    .filter("getRelatedPosts", filters.getRelatedPosts)
    .filter("truncate", filters.truncate)
    .filter("round", filters.round)

    .use(codeHighlight())
    .use(esbuild({ target: "es6" }))
    .use(slugify_urls({ extensions: [".html"] }))
    .use(sass())
    .use(transformImages())
    .use(date())
