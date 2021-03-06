import _isArrayLike from './_isArrayLike'
import _isFunction from './_isFunction'

const _arrayReduce = (fn, acc, list) => {
  for (let el of list) {
    acc = fn(acc, el)
  }
  return acc
}

const _iterableReduce = (fn, acc, iter) => {
  let step = iter.next()

  if (_isFunction(acc.set)) {
    while (!step.done) {
      acc.set(...step.value)
      step = iter.next()
    }
  } else if (_isFunction(acc.add)) {
    while (!step.done) {
      acc.add(step.value)
      step = iter.next()
    }
  }
  return acc
}

const _reduce = (fn, acc, list) => {
  switch (true) {
    case _isArrayLike(list):
      return _arrayReduce(fn, acc, list)
    case list[Symbol.iterator] != null:
      return _iterableReduce(fn, acc, list[Symbol.iterator]())
    case _isFunction(list.next):
      return _iterableReduce(fn, acc, list)
  }

  throw new TypeError('reduce: list must be array or iterable')
}

export default _reduce
