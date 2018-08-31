"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseString(str) {
    try {
        if (str[0] === '"')
            return JSON.parse(str);
        if (str[0] === "'" && str.substr(str.length - 1) === "'") {
            return parseString(str.replace(/\\.|"/g, x => (x === '"' ? '\\"' : x)).replace(/^'|'$/g, '"'));
        }
        return JSON.parse('"' + str + '"');
    }
    catch (e) {
        return str;
    }
}
exports.default = parseString;
