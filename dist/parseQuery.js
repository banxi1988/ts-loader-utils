"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json5_1 = __importDefault(require("json5"));
const specialValues = {
    null: null,
    true: true,
    false: false
};
function parseQuery(query) {
    if (query[0] !== "?") {
        throw new Error("A valid query string passed to parseQuery should begin with '?'");
    }
    query = query.substring(1);
    if (!query) {
        return {};
    }
    if (query.startsWith("{") && query.endsWith("}")) {
        return json5_1.default.parse(query);
    }
    const queryArgs = query.split(/[,&]/g);
    const result = {};
    queryArgs.forEach(arg => {
        const idx = arg.indexOf("=");
        if (idx >= 0) {
            let name = arg.substr(0, idx);
            let value = decodeURIComponent(arg.substr(idx + 1));
            if (specialValues.hasOwnProperty(value)) {
                value = specialValues[value];
            }
            if (name.endsWith("[]")) {
                name = decodeURIComponent(name.substr(0, name.length - 2));
                if (!Array.isArray(result[name]))
                    result[name] = [];
                result[name].push(value);
            }
            else {
                name = decodeURIComponent(name);
                result[name] = value;
            }
        }
        else {
            let name = arg;
            let value = true;
            if (arg[0] === "-") {
                name = arg.substring(1);
                value = false;
            }
            else if (arg[0] === "+") {
                name = arg.substring(1);
                value = true;
            }
            result[decodeURIComponent(name)] = value;
        }
    });
    return result;
}
exports.default = parseQuery;
