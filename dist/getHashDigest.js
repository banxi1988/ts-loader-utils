"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const baseEncodeTables = {
    26: "abcdefghijklmnopqrstuvwxyz",
    32: "123456789abcdefghjkmnpqrstuvwxyz",
    36: "0123456789abcdefghijklmnopqrstuvwxyz",
    49: "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    52: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    58: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
};
function encodeBufferToBase(buffer, base) {
    const encodeTable = baseEncodeTables[base];
    if (!encodeTable)
        throw new Error("Unknown encoding base" + base);
    const readLength = buffer.length;
    const Big = require("big.js");
    Big.RM = Big.DP = 0;
    let b = new Big(0);
    for (let i = readLength - 1; i >= 0; i--) {
        b = b.times(256).plus(buffer[i]);
    }
    let output = "";
    while (b.gt(0)) {
        output = encodeTable[b.mod(base)] + output;
        b = b.div(base);
    }
    Big.DP = 20;
    Big.RM = 1;
    return output;
}
function getHashDigest(buffer, hashType, digestType, maxLength) {
    hashType = hashType || "md5";
    maxLength = maxLength || 9999;
    const hash = crypto_1.createHash(hashType);
    hash.update(buffer);
    if (digestType === "base26" || digestType === "base32" || digestType === "base36" || digestType === "base49" || digestType === "base52" || digestType === "base58" || digestType === "base62" || digestType === "base64") {
        return encodeBufferToBase(hash.digest(), digestType.substr(4)).substr(0, maxLength);
    }
    else {
        let digest = "";
        switch (digestType) {
            case "latin1":
            case "base64":
                digest = hash.digest(digestType);
                break;
            default:
                digest = hash.digest("hex");
                break;
        }
        return digest.substr(0, maxLength);
    }
}
exports.default = getHashDigest;
