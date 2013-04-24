var chai = require('chai')
chai.should()
var expect = chai.expect
var data = require('./data')
var trie = require('../index')

describe('trie', function () {
  it('converts dictionary -> trie', function () {
    var t = trie(data)
  })
})

describe('splitPath', function () {
  it('splits on /', function () {
    trie._splitPath('a/b/c').should.deep.equal(['a','b','c'])
  })
  it('tolerates a leading /', function () {
    trie._splitPath('/a/b/c').should.deep.equal(['a','b','c'])
  })
  it('tolerates a trailing /', function () {
    trie._splitPath('a/b/c/').should.deep.equal(['a','b','c'])
  })
  it('is identity function on Array', function () {
    trie._splitPath(['a','b','c']).should.deep.equal(['a','b','c'])
  })
})

describe('put', function () {
  it('adds a value to the trie', function () {
    var t = {}

    trie.put.call(t, ['a','b','c'], 123)

    t.should.deep.equal({
      a: {
        b: {
          c: {
            '@': 123
          }
        }
      }
    })

  })
})

describe('flatten', function () {
  it('converts trie -> dictionary', function () {
    var t = {
      a: {
        b: {
          c: {
            '@': 123
          }
        }
      }
    }

    trie.flatten(t).should.deep.equal({
      'a/b/c': 123
    })
  })
})

describe('get', function () {
  it('gets a value from the trie', function () {
    var t = {
      a: {
        b: {
          c: {
            '@': 123
          }
        }
      }
    }

    trie.get.call(t, ['a','b','c']).should.equal(123)
  })
  it('returns undefined if the path doesnt have a value', function () {
    var t = {
      a: {
        b: {
          c: {
            '@': 123
          }
        }
      }
    }

    expect(trie.get.call(t, ['a','b'])).to.equal(undefined)
  })
  it('returns undefined if the path doesnt exist', function () {
    var t = {
      a: {
        b: {
          c: {
            '@': 123
          }
        }
      }
    }

    expect(trie.get.call(t, ['q','r','s'])).to.equal(undefined)
  })
})

describe('del', function () {
  it('removes a value from a trie', function () {
    var t = {
      a: {
        b: {
          '@': 'foo'
        }
      }
    }

    trie.del.call(t, ['a','b'])
    expect(trie.get.call(t, ['a','b'])).to.equal(undefined)
  })
  it('does nothing if the value does not exist (idempotent)', function () {
    var t = {}
    trie.del.call(t, ['a','b'])
    t.should.deep.equal({})
  })
})