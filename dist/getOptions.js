"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parseQuery_1 = __importDefault(require("./parseQuery"));
function getOptions(loaderContext) {
    const query = loaderContext.query;
    if (typeof query === "string" && query !== "") {
        return parseQuery_1.default(loaderContext.query);
    }
    if (!query || typeof query !== "object") {
        // Not object-like queries are not supported.
        return null;
    }
    return query;
}
exports.default = getOptions;
