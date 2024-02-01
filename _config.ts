// @ts-nocheck
import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import sass from "lume/plugins/sass.ts";
import esbuild from "lume/plugins/esbuild.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import markdownItCheckbox from "https://jspm.dev/markdown-it-checkbox";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import * as processors from "./_processors.ts";
import * as filters from "./_filters.ts";

export const siteSrc = "_src";
export const siteDest = "_site";
export const siteRoot = "https://bradeneast.com";

const lumeOptions = {
  location: new URL(siteRoot),
  src: siteSrc,
  dest: siteDest,
};
const pluginOptions = {
  markdown: { plugins: [[markdownItCheckbox]] }
};

export default
  lume(lumeOptions, pluginOptions)
    .copy("assets", ".")
    .copy("main.css")
    .copy("retro.css")

    // .process([".html"], processors.html)

    // .filter("getRelatedPosts", filters.getRelatedPosts)
    .use(slugifyUrls())
    .use(codeHighlight())
    .use(esbuild({ target: "es6" }))
    .use(sass())
    .use(date())
