import * as esbuild from "https://deno.land/x/esbuild@v0.12.17/mod.js";
import { siteDest, siteSrc } from "./_config.js";


export async function js(page) {

  let { path, ext } = page.src;
  let entryPoint = path + ext;
  let filename = path.split(/[\\\/]/).pop();
  let outfile = filename + ".min" + ext;

  return esbuild
    .build({
      entryPoints: [siteSrc + entryPoint],
      outfile: siteDest + "/" + outfile,
      bundle: true,
      minify: true,
    })
    .then(() => {
      console.log("🥡 Bundle", outfile);
      esbuild.stop();
    })
}