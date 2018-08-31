"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const matchRelativePath = /^\.\.?[/\\]/;
function isAbsolutePath(str) {
    return path_1.default.posix.isAbsolute(str) || path_1.default.win32.isAbsolute(str);
}
function isRelativePath(str) {
    return matchRelativePath.test(str);
}
function stringifyRequest(loaderContext, request) {
    const splitted = request.split("!");
    const context = loaderContext.context || (loaderContext.options && loaderContext.options.context);
    const normlizedParts = splitted.map(part => {
        // First, separate singlePath from query, because the query might contain paths again
        const splittedPart = part.match(/^(.*?)(\?.*)/);
        let singlePath = splittedPart ? splittedPart[1] : part;
        const query = splittedPart ? splittedPart[2] : "";
        if (isAbsolutePath(singlePath) && context) {
            singlePath = path_1.default.relative(context, singlePath);
            if (isAbsolutePath(singlePath)) {
                // If singlePath still matches an absolute path, singlePath was on a different drive than context.
                // In this case, we leave the path platform-specific without replacing any separators.
                // @see https://github.com/webpack/loader-utils/pull/14
                return singlePath + query;
            }
            if (isRelativePath(singlePath) === false) {
                // Ensure that the relative path starts at least with ./ otherwise it would be a request into the modules directory (like node_modules).
                singlePath = "./" + singlePath;
            }
        }
        return singlePath.replace(/\\/g, "/") + query;
    });
    return JSON.stringify(normlizedParts.join("!"));
}
exports.default = stringifyRequest;
