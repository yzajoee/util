class aQuery {
  constructor(selector) {
    this.doc = document;
    this.selector = this
      .doc
      .querySelectorAll(selector);
    this.handlers = {}
  }
  /**
   *
   * @param {string} elem 绑定委托的目标
   * @param {string | object} types 触发事件类型，可以是一个对象，可以是字符串
   * @param {*} selector 选择可触发的目标
   * @param {*} fn 事件触发回调
   * @param {boolean} once 一次触发或者多次触发
   */
  on(type, selector, fn) {
    let _this = this
    if (this.handlers[type]) {
      _this
        .handlers[type]
        .push({selector, fn})
    } else {
      _this.handlers[type] = [fn]
      for (let eventTarget of this.selector) {
        eventTarget.addEventListener(type, e => {
          _this
            .handlers[type]
            .forEach(function (item) {
              _this.match(item.selector, e.target) && item.fn(e)
            })
        })
      }
    }
  }

  /**
   *
   * @param {string} type 事件类型
   * @param {function?} fn 要清除的事件对象
   */
  off(type, fn) {
    if (fn) {
      this.handlers = this
        .handlers[type]
        .filter(item => {
          return item.fn !== fn
        })
    } else {
      for (let eventTarget in this.selector) {
        eventTarget.removeEventListener(type, e => {
          _this
            .handlers[type]
            .forEach(function (item) {
              _this.match(item.selector, e.target) && item.fn(e)
            })
        })
      }
    }
  }
  /**
   * 是否匹配
   * @param {dom} elm 目标元素
   * @param {*} selector 匹配的selector
   */
  match(elm, selector) {
    let flag = false
    this
      .doc
      .querySelectorAll(selector)
      .forEach(item => {
        flag = flag || item === elm
      })
    return flag
  }
}
export default aQuery