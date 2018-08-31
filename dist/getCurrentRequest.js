"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentRequest(loaderContext) {
    if (loaderContext.currentRequest)
        return loaderContext.currentRequest;
    const request = loaderContext.loaders
        .slice(loaderContext.loaderIndex)
        .map(obj => obj.request)
        .concat([loaderContext.resource]);
    return request.join("!");
}
exports.default = getCurrentRequest;
