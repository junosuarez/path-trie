# path-trie
data structure for path-addressable resources

## usage

```javascript
  var pathTrie = require('path-trie')

  var dictionary = {
    'a/b/c': 123
  }
  var trie = pathTrie(dictionary)
  // => {
  //      a: {
  //        b: {
  //          c: {
  //            '@': 123
  //          }
  //        }
  //      }
  //    }

  dictionary = pathTrie.flatten(trie)
  // => {
  //      'a/b/c': 123
  //    }

```

## api

### `pathTrie: (dictionary: Dictionary<String, Value>) => Trie`

### `pathTrie.flatten: (trie: Trie, from: Array<String> = []) => Dictionary<String, Value>`

`from` is an optional path to flatten just a particular subtrie.

### `pathTrie.put: (this: Trie, path: Path, val: Value) => Trie`

### `pathTrie.get: (this: Trie, path: Path) => Value?`

### `pathTrie.del: (this: Trie, path: Path) => void`

## installation

    $ npm install path-trie

## running the tests

from project root:

    $ npm install
    $ npm test

## contributors

- jden <jason@denizac.org>

## license
MIT. (c) 2013 jden <jason@denizac.org>. See LICENSE.md
