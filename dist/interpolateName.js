"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const emojis_list_1 = __importDefault(require("emojis-list"));
const getHashDigest_1 = __importDefault(require("./getHashDigest"));
const emojiRegex = /[\uD800-\uDFFF]./;
const emojiList = emojis_list_1.default.filter(emoji => emojiRegex.test(emoji));
const emojiCache = {};
const hashTplRe = /\[(?:([^:]+):)?hash(?::([a-z]+\d*))?(?::(\d+))?\]/gi;
const hashTplEmojiRe = /\[emoji(?::(\d+))?\]/gi;
function encodeStringToEmoji(content, length) {
    if (emojiCache[content])
        return emojiCache[content];
    length = length || 1;
    const emojis = [];
    do {
        if (!emojiList.length) {
            throw new Error("Ran out of emoji");
        }
        const index = Math.floor(Math.random() * emojiList.length);
        emojis.push(emojiList[index]);
        emojiList.splice(index, 1);
    } while (--length > 0);
    const emojiEncoding = emojis.join("");
    emojiCache[content] = emojiEncoding;
    return emojiEncoding;
}
function interpolateName(loaderContext, name, options) {
    let filename;
    if (typeof name === "function") {
        filename = name(loaderContext.resourcePath);
    }
    else {
        filename = name || "[hash].[ext]";
    }
    const context = options.context;
    const content = options.content;
    const regExp = options.regExp;
    let ext = "bin";
    let basename = "file";
    let directory = "";
    let folder = "";
    if (loaderContext.resourcePath) {
        const parsed = path_1.default.parse(loaderContext.resourcePath);
        let resourcePath = loaderContext.resourcePath;
        if (parsed.ext) {
            ext = parsed.ext.substr(1);
        }
        if (parsed.dir) {
            basename = parsed.name;
            resourcePath = parsed.dir + path_1.default.sep;
        }
        if (typeof context !== "undefined") {
            directory = path_1.default
                .relative(context, resourcePath + "_")
                .replace(/\\/g, "/")
                .replace(/\.\.(\/)?/g, "_$1");
            directory = directory.substr(0, directory.length - 1);
        }
        else {
            directory = resourcePath.replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
        }
        if (directory.length === 1) {
            directory = "";
        }
        else if (directory.length > 1) {
            folder = path_1.default.basename(directory);
        }
    }
    let url = filename;
    if (content) {
        // Match hash template
        url = url
            .replace(hashTplRe, (all, hashType, digestType, maxLength) => getHashDigest_1.default(content, hashType, digestType, parseInt(maxLength, 10)))
            .replace(hashTplEmojiRe, (all, length) => encodeStringToEmoji(content, parseInt(length, 10)));
    }
    url = url
        .replace(/\[ext\]/gi, () => ext)
        .replace(/\[name\]/gi, () => basename)
        .replace(/\[path\]/gi, () => directory)
        .replace(/\[folder\]/gi, () => folder);
    if (regExp && loaderContext.resourcePath) {
        const match = loaderContext.resourcePath.match(new RegExp(regExp));
        match &&
            match.forEach((matched, i) => {
                url = url.replace(new RegExp("\\[" + i + "\\]", "ig"), matched);
            });
    }
    if (typeof loaderContext.options === "object" && typeof loaderContext.options.customInterpolateName === "function") {
        url = loaderContext.options.customInterpolateName.call(loaderContext, url, name, options);
    }
    return url;
}
exports.default = interpolateName;
