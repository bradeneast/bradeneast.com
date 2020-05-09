import { partials } from "./build.ts";
import options from "../options.ts";
import { escRegExp } from "./utils.ts";

export default function includePartials(page) {

    let [a, b] = options.match.partials;
    let between = new RegExp(`${escRegExp(a)} .+? ${escRegExp(b)}`, 'g');
    let matches = page.content.match(between) || [];

    if (!matches.length) return;

    for (let match of matches) {

        let matchPartialName = new RegExp(`^${a} | ${b}$`, 'gm');
        let partialName = match.replace(matchPartialName, '');
        let matchingPartial = partials.find(c => c.name == partialName);

        if (!matchingPartial) {
            console.log(`${page.name} page says, "Couldn't find a match for "${partialName}".`);
            page.content = page.content.replace(match, '');
            continue;
        }

        page.content = page.content.replace(match, matchingPartial.content);
    }

    if (between.test(page.content)) includePartials(page);
}
