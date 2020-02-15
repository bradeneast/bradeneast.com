import options from "../options.ts";
import { linkify, escRegExp } from "./utils.ts";


export default function includeVariables(page, context: string = null) {

    let ctx = context || page.content;
    let [a, b] = options.match.variables;
    let reVariables = new RegExp(`${escRegExp(a)} .+? ${escRegExp(b)}`, 'g');
    let matches = ctx.match(reVariables) || [];

    if (!matches.length) return ctx;

    for (let i = 0; i < matches.length; i++) {

        let match = matches[i];
        let reRef = new RegExp(`^${escRegExp(a)} | ${escRegExp(b)}$`, 'gm');
        let query = match.replace(reRef, '');
        let props = query.split('.');
        let value = page;

        props.map(prop => value = value?.[prop]);

        if (query.includes('media')) {

            if (/\.(webp|png|gif|jpg)/gi.test(value)) {
                value = `<img src="${value}" alt=""/>`;
            }

            if (/\.(mp4|webm|mov|webvtt|ogv|wmv|flv|avi|avchd)/gi.test(value)) {
                value = `<video src="${value}" autoplay="${options.default.autoPlayVideos}" loop="${options.default.loopVideos}" muted></video>`;
            }

        }

        if (query.includes('categories')) {

            let result = [];

            for (let i = 0; i < value.length; i++) {

                let category = value[i];
                let link = [page.parentDir, 'categories', linkify(category)].join('/');
                result.push(`<a href="/${link}">${category}</a>`);

            }

            value = result.join(', ');
        }

        ctx = ctx.replace(match, String(value));

    }

    return ctx;
}