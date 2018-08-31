import webpack = require("webpack");

export default function getRemainingRequest(loaderContext: webpack.loader.LoaderContext) {
	if ((loaderContext as any).remainingRequest) return (loaderContext as any).remainingRequest;
	const request = loaderContext.loaders
		.slice(loaderContext.loaderIndex + 1)
		.map(obj => obj.request)
		.concat([loaderContext.resource]);
	return request.join("!");
}
