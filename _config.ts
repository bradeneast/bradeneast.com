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
site.add("_");
site.add([".mp4"]);
site.add([".svg"]);
site.add([".gif"]);
site.add("/main.scss");
site.add("/main.js");
site.add("/img");

site.use(esbuild({ target: "es6" }));
site.use(transformImages());
site.use(sass());
site.use(slugify_urls());
site.use(date());

export default site;