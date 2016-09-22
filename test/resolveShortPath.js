var assert = require('assert');
var resolveShortPath = require('../lib/resolveShortPath');

describe('resolveShortPath()', function() {

  it('should resolve relative', function() {
    assert.equal('a', resolveShortPath('.', '~a'));
    assert.equal('../a/b', resolveShortPath('..', '~a/b'));
    assert.equal('../abc/a/b/c.d', resolveShortPath('../abc', '~a/b/c.d'));
    assert.equal('abc/def/prospect/reducer', resolveShortPath('abc/def', '~prospect/reducer'));
    assert.equal('abc/components/pages/account', resolveShortPath('abc', '~components/pages/account'));
  });

  it('should resolve absolute', function() {
    assert.equal('/example/src/a', resolveShortPath('/example/src', '~a'));
    assert.equal('/example/src/a/b', resolveShortPath('/example/src', '~a/b'));
    assert.equal('/example/src/a/b/c.d', resolveShortPath('/example/src', '~a/b/c.d'));
    assert.equal('/example/src/prospect/reducer', resolveShortPath('/example/src', '~prospect/reducer'));
    assert.equal('/example/src/components/pages/account', resolveShortPath('/example/src', '~components/pages/account'));
  });

});
