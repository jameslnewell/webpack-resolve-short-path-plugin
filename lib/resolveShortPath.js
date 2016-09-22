var path = require('path');

module.exports = function(rootPath, shortPath) {
  return path.join(rootPath, shortPath.substr(1));
};
