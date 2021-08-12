import lume from "lume";
import date from "lume/plugins/date.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import textLoader from "lume/core/loaders/text.ts";
import * as processors from "./_processors.js";
import * as filters from "./_filters.js";

export const siteSrc = "_src";
export const siteDest = "_site";
export const siteRoot = "https://bradeneast.com";

const site = lume({
  location: new URL(siteRoot),
  src: siteSrc,
  dest: siteDest,
});

site
  .copy("img")
  .copy("_includes/assets/", "/")
  .copy("main.css")
  .copy("retro.css")
  .copy("cms.css")
  .loadAssets([".js"], textLoader)

  // Processors
  .process([".js"], processors.js)

  // Plugins
  .use(slugifyUrls())
  .use(codeHighlight())
  .use(date())

  // Helpers
  .filter('splitting', filters.splitting, { type: "tag", body: true })

export default site;