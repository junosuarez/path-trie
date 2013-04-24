// type Trie := Object returned from
//    returned from function Trie
// type Path := String | Array<String>
//    `/`-delimited path

// (dictionary: Dictionary<String, Value>) => Trie

function trie(dictionary){
  return reduce(dictionary, function(t, val, key) {
    return put.call(t, key, val)
  })
}

// (path: String) => Array<String>
// splits a `/`-delimited path into segments
function splitPath(path) {
  if (Array.isArray(path)) {
    return path
  }
  if (path[0] === '/') {
    path = path.substr(1)
  }
  if (path[path.length-1] === '/') {
    path = path.substr(0, path.length-1)
  }
  return path.split('/')
}

// (this: Trie, path: Path, val: Value) => Trie
function put(path, val) {
  var pos = splitPath(path).reduce(function (t, segment) {
    if (!t[segment]) { t[segment] = {} }
    return t[segment]
  }, this)
  pos['@'] = val;
  return this;
}

// (this: Trie, path: Path) => Value?
function get(path) {
  return splitPath(path).concat('@').reduce(function (t, segment) {
    return t ? t[segment]
             : undefined
  }, this)
}

// (this: Trie, path: Path) => void
function del(path) {
  var pos = splitPath(path).reduce(function (t, segment) {
    return t ? t[segment]
             : undefined
  }, this)
  if (typeof pos === 'object') {
    delete pos['@']
  }
  return this;
}

// (trie: Trie, from: Array<String> = []) => Dictionary<String, Value>
function flatten(trie, from) {
  from = from || []

  return reduce(trie, function (dict, subtrie, seg) {
    if (seg === '@') {
      return keyValPair(from.join('/'), subtrie)
    }
    return concat(dict, flatten(subtrie, from.concat(seg)))
  })
}

function keyValPair(key, val) {
  var o = {}
  o[key] = val
  return o
}

function map(obj, fn) {
  var o = {}
  for (var k in obj) {
    o[k] = fn(obj[k], k)
  }
  return o
}

function reduce(obj, fn, seed) {
  var val = seed || {}
  for (var k in obj) {
    val = fn(val, obj[k], k)
  }
  return val
}

function concat(objA, objB) {
  for (var k in objB) {
    objA[k] = objB[k]
  }
  return objA
}

module.exports = trie
module.exports._splitPath = splitPath
module.exports.put = put
module.exports.get = get
module.exports.del = del
module.exports.flatten = flatten
