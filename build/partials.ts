import { partials } from "./build.ts";
import options from "../options.ts";
import { escRegExp } from "./utils.ts";

export default function includePartials(page) {

    let [a, b] = options.match.partials;
    let between = new RegExp(`${escRegExp(a)} .+? ${escRegExp(b)}`, 'g');
    let matches = page.content.match(between) || [];

    if (!matches.length) return;

    for (let match of matches) {

        let reRef = new RegExp(`^${a} | ${b}$`, 'gm');
        let ref = match.replace(reRef, '');
        let comp = partials.find(c => c.name == ref);

        page.content = page.content.replace(match, comp.content);

    }

    if (between.test(page.content)) includePartials(page);

}
