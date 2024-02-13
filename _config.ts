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

const site = lume(lumeOptions, pluginOptions);

// Copy assets
site.copy("_");
site.copy([".mp4"]);
site.copy([".svg"]);

// Run all filters
for (let f in filters)
  site.filter(f, filters[f]);

// Run all processors
for (let p in processors)
  site.process([`.${p}`], processors[p]);

// Use plugins
site.use(codeHighlight());
site.use(esbuild({ target: "es6" }));
site.use(slugify_urls({ extensions: [".html"] }));
site.use(sass());
site.use(transformImages());
site.use(date());

export default site;
