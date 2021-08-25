// @ts-nocheck
import lume from "lume";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import textLoader from "lume/core/loaders/text.ts";
import * as processors from "./_processors.ts";
import markdownItCheckbox from "https://jspm.dev/markdown-it-checkbox";

export const siteSrc = "_src";
export const siteDest = "_site";
export const siteRoot = "https://bradeneast.com";

const site = lume({
  location: new URL(siteRoot),
  src: siteSrc,
  dest: siteDest,
},
{
  markdown: { plugins: [[markdownItCheckbox]] }
});

site
  .copy("img")
  .copy("_includes/assets/", "/")
  .copy("main.css")
  .copy("retro.css")
  .copy("cms.css")

  .loadAssets([".js"], textLoader)
  .process([".js"], processors.js)

  .process([".html"], processors.html)

  .use(slugifyUrls())
  .use(codeHighlight())
  .use(date())

export default site;
