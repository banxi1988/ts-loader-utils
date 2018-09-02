"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const getOptions_1 = __importDefault(require("./getOptions"));
const parseQuery_1 = __importDefault(require("./parseQuery"));
const stringifyRequest_1 = __importDefault(require("./stringifyRequest"));
const getRemainingRequest_1 = __importDefault(require("./getRemainingRequest"));
const getCurrentRequest_1 = __importDefault(require("./getCurrentRequest"));
const isUrlRequest_1 = __importDefault(require("./isUrlRequest"));
const urlToRequest_1 = __importDefault(require("./urlToRequest"));
const parseString_1 = __importDefault(require("./parseString"));
const getHashDigest_1 = __importDefault(require("./getHashDigest"));
const interpolateName_1 = __importDefault(require("./interpolateName"));
const defaults = {
    getOptions: getOptions_1.default,
    parseQuery: parseQuery_1.default,
    stringifyRequest: stringifyRequest_1.default,
    getRemainingRequest: getRemainingRequest_1.default,
    getCurrentRequest: getCurrentRequest_1.default,
    isUrlRequest: isUrlRequest_1.default,
    urlToRequest: urlToRequest_1.default,
    parseString: parseString_1.default,
    getHashDigest: getHashDigest_1.default,
    interpolateName: interpolateName_1.default
};
module.exports = defaults;
