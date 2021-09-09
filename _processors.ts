// @ts-nocheck
import * as esbuild from "https://deno.land/x/esbuild@v0.12.17/mod.js";
import { siteDest, siteSrc } from "./_config.ts";
import { splitting } from "./_filters.ts";


export async function html(page:any) {
  let h1 = page.document.querySelector("h1");
  if (h1) {
    h1.classList.add("splitting");
    h1.innerHTML = splitting(h1.innerText);
  }
}


export async function js(page:any) {

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