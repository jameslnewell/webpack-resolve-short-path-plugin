var assert = require('assert');
var isShortPath = require('./isShortPath');
var resolveShortPath = require('./resolveShortPath');

var ResolveShortPathPlugin = function(options) {

  //require a `rootPath` option
  assert(
    typeof options === 'object' & typeof options.rootPath === 'string',
    'webpack-resolve-short-path-plugin: `options.rootPath` is required and expected to be a string.'
  );

  this.rootPath = options.rootPath;

};

ResolveShortPathPlugin.prototype.apply = function(resolver) {
  var rootPath = this.rootPath;

  resolver.plugin('described-resolve', function(shortRequest, callback) {

    /*

      This plugin is based on https://github.com/webpack/enhanced-resolve/blob/7df23d64da27cd76b09046f9b9ffd61480c0ddca/lib/AliasPlugin.js

      Legend:
        Call `callback()` to allow webpack to continue resolving the path
        Call `callback(null, null);` to prevent webpack from running other resolvers on the path

     */

    var shortPath = shortRequest.request;

    //ignore paths which aren't short
    if (!isShortPath(shortPath)) {
      return callback();
    }

    //resolve the long path
    var longPath = resolveShortPath(rootPath, shortPath);

    //create a new request to resolve the full path
    const longRequest = Object.assign({}, shortRequest, {
      request: longPath
    });

    //resolve the long path
    return resolver.doResolve('resolve', longRequest, 'expanded short path \'' + shortPath + '\' to \'' + longPath + '\'', callback);
  });

};

module.exports = ResolveShortPathPlugin;