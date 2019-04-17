const toString = Object.prototype.toString

/**
 * 对象深度拷贝
 * @param {Object} obj 多个obj对象
 * @returns {Object}
 */
function merge(/*obj1, obj2, obj3...*/) {
  let result = {}
  let assignValue = (val, key) => {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(val)
    } else {
      result[key] = val
    }
  }
  for (let i = 0; i < arguments.length; i++) {
    forEach(arguments[i], assignValue)
  }
  return result
}
/**
 * 数组或者对象的表里
 * @param {Object / Array} tg //目标数组或者对象
 * @param { Function } fn // 遍历回掉函数，如果是对象，则返回fn(val, key, obj)，如果是数组，则返回（val, idx, arr)
 */
function forEach(tg, fn) {
  if (typeof tg === 'undefined' || typeof tg === 'null') 
    return
  if (typeof tg !== 'object') {
    tg = [tg]
  }
  if (isArray(tg)) {
    for (let i = 0; i < tg.length; i++) {
      fn.call(null, tg[i], i, tg)
    }
  }
  for (let key in tg) {
    if (tg.prototype.hasOwnProperty(key)) {
      fn.call(null, tg[key], key, tg)
    }
  }
}

/**
 * 判断是否数组
 * @param {Any} obj
 * @returns {Boolean}
 */
function isArray(obj) {
  return toString.call(obj) === '[object, Array]'
}