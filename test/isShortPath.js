var assert = require('assert');
var isShortPath = require('../lib/isShortPath');

describe('isShortPath()', function() {

  it('should return true', function() {
    assert(isShortPath('~a'));
    assert(isShortPath('~a/b'));
    assert(isShortPath('~a/b/c.d'));
    assert(isShortPath('~prospect/reducer'));
    assert(isShortPath('~components/pages/account'));
  });

  it('should return false', function() {
    assert(!isShortPath('~/.eslintrc'));
    assert(!isShortPath('react-dom'));
    assert(!isShortPath('react-dom'));
  });

});
