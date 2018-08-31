"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRemainingRequest(loaderContext) {
    if (loaderContext.remainingRequest)
        return loaderContext.remainingRequest;
    const request = loaderContext.loaders
        .slice(loaderContext.loaderIndex + 1)
        .map(obj => obj.request)
        .concat([loaderContext.resource]);
    return request.join("!");
}
exports.default = getRemainingRequest;
