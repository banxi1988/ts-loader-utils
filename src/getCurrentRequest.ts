import webpack = require("webpack");

export default function getCurrentRequest(loaderContext: webpack.loader.LoaderContext) {
	if ((loaderContext as any).currentRequest) return (loaderContext as any).currentRequest;
	const request = loaderContext.loaders
		.slice(loaderContext.loaderIndex)
		.map(obj => obj.request)
		.concat([loaderContext.resource]);
	return request.join("!");
}
