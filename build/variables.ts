import options from "../options.ts";
import { linkify, escRegExp } from "./utils.ts";


export default function includeVariables(page, context = '') {

    let ctx = context || page.content;
    let [a, b] = options.match.variables;
    let reVariables = new RegExp(`${escRegExp(a)} .+? ${escRegExp(b)}`, 'g');
    let matches = ctx.match(reVariables);

    if (!matches?.length) return ctx;

    for (let i = 0; i < matches.length; i++) {

        let match = matches[i];
        let reRef = new RegExp(`^${escRegExp(a)} | ${escRegExp(b)}$`, 'gm');
        let query = match.replace(reRef, '');

        ctx = ctx.replace(
            match,
            eval(query)
        );
    }

    return ctx;
}