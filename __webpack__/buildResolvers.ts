import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.ts', '.js', '.css', '.scss'],
        alias: {
            '@': options.paths.src,
        },
    }
}