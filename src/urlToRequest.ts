// we can't use path.win32.isAbsolute because it also matches paths starting with a forward slash
const matchNativeWin32Path = /^[A-Z]:[/\\]|^\\\\/i;

export default function urlToRequest(url: string, root?: string | boolean) {
	// Do not rewrite an empty url
	if (url === "") {
		return "";
	}

	const moduleRequestRegex = /^[^?]*~/;
	let request;

	if (matchNativeWin32Path.test(url)) {
		// absolute windows path, keep it
		request = url;
	} else if (root !== undefined && root !== false && /^\//.test(url)) {
		// if root is set and the url is root-relative
		if (typeof root === "string") {
			// 1. root is a string: root is prefixed to the url
			// special case: `~` roots convert to module request
			if (moduleRequestRegex.test(root)) {
				request = root.replace(/([^~\/])$/, "$1/") + url.slice(1);
			} else {
				request = root + url;
			}
		} else if (typeof root === "boolean") {
			// 2. root is `true`: absolute paths are allowed
			//    *nix only, windows-style absolute paths are always allowed as they doesn't start with a `/`
			request = url;
		} else {
			throw new Error("Unexpected parameters to loader-utils 'urlToRequest': url = " + url + ", root = " + root + ".");
		}
	} else if (/^(?:https?:)?\/\//.test(url)) {
		// Preserve http and https urls
		request = url;
	} else if (/^\.\.?\//.test(url)) {
		// A relative url stays
		request = url;
	} else {
		// every other url is threaded like a relative url
		request = "./" + url;
	}

	// A `~` makes the url an module
	if (moduleRequestRegex.test(request)) {
		request = request.replace(moduleRequestRegex, "");
	}

	return request;
}

module.exports = urlToRequest;