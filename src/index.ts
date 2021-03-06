"use strict";

import getOptions from "./getOptions";
import parseQuery from "./parseQuery";
import stringifyRequest from "./stringifyRequest";
import getRemainingRequest from "./getRemainingRequest";
import getCurrentRequest from "./getCurrentRequest";
import isUrlRequest from "./isUrlRequest";
import urlToRequest from "./urlToRequest";
import parseString from "./parseString";
import getHashDigest from "./getHashDigest";
import interpolateName from "./interpolateName";

const defaults = {
  getOptions,
  parseQuery,
  stringifyRequest,
  getRemainingRequest,
  getCurrentRequest,
  isUrlRequest,
  urlToRequest,
  parseString,
  getHashDigest,
  interpolateName
};

export = defaults;
