import { components } from "./build.ts";
import options from "../options.ts";
import { escRegExp } from "./utils.ts";

export default function includeComponents(page) {

    let [a, b] = options.match.components;
    let reComponents = new RegExp(`${escRegExp(a)} .+? ${escRegExp(b)}`, 'g');
    let matches = page.content.match(reComponents) || [];

    if (!matches.length) return;

    for (let i = 0; i < matches.length; i++) {

        let match = matches[i];
        let reRef = new RegExp(`^${a} | ${b}$`, 'gm');
        let ref = match.replace(reRef, '');
        let comp = components.find(c => c.name == ref);

        page.content = page.content.replace(match, comp.content);

    }

    if (reComponents.test(page.content)) includeComponents(page);

}
