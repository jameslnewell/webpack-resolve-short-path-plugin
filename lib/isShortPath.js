
module.exports = function(path) {

  //make sure the request starts with `~` followed by a character that is not a directory separator
  if (!path
    || path.length < 2
    || path[0] !== '~' || path[1] === '/'
  ) {
    return false;
  }

  return true;
};
