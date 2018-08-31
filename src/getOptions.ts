import parseQuery from "./parseQuery";
import webpack = require("webpack");

export default function getOptions(loaderContext: webpack.loader.LoaderContext) {
	const query = loaderContext.query;
	if (typeof query === "string" && query !== "") {
		return parseQuery(loaderContext.query);
	}
	if (!query || typeof query !== "object") {
		// Not object-like queries are not supported.
		return null;
	}
	return query;
}
