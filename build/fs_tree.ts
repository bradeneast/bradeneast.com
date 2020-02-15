import { walkSync } from 'https://deno.land/std/fs/mod.ts';
import slash from "https://deno.land/x/slash/mod.ts";
import options from '../options.ts';
import getFsInfo from './fs_info.ts';


export default function getFsTree(directory: string) {

    let tree = [];

    for (let { filename, info } of walkSync(directory, { includeDirs: false })) {

        filename = slash(filename);
        if (filename.includes('/' + options.ignore)) continue;
        tree.push(getFsInfo({ filename, info }));

    }

    return tree;
}