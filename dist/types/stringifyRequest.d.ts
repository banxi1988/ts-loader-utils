/// <reference types="webpack" />
import webpack = require("webpack");
export default function stringifyRequest(loaderContext: webpack.loader.LoaderContext, request: string): string;
