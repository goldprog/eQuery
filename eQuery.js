;(function(global, factory) {
  global.eQuery = factory()
})(this, function() {
  var eQuery = function(selector, context) {
    return new eQuery.fn.init(selector, context)
  }

  eQuery.fn = eQuery.prototype = {
    constructor: eQuery,
    init: function(selector, context) {
      // 设置元素长度
      this.length = 0
      context = context || document
      if (~selector.indexOf('#')) {
        this[0] = document.getElementById(selector.slice(1))
        this.length = 1
      } else {
        var doms = document.getElementsByTagName(selector),
            len = doms.length,
            i = 0
        this.length = len
        for(; i< len; i++) {
          this[i] = doms[i]
        }
      }
      this.selector = selector
      this.context = context
    },
    push: [].push,
    splice: [].splice,
    slice: [].slice
  }

  eQuery.extend = eQuery.fn.extend = function() {
    var args = arguments,
        len = arguments.length,
        target = args[0]
        i = 1
    if(i === len) {
      target = this
      i --
    }
    for(; i < len; i++) {
      for(var key in args[i]) {
        target[key] = args[i][key]
      }
    }
    return target
  }

  // 绑定监听事件

  eQuery.fn.extend({
    on: (function() {
      if(document.addEventListener) {
        return function(type, fn) {
          for(var i=0; i<this.length; i++) {
            this[i].addEventListener(type, fn, false)
          }
          return this
        }
      } else if(document.attachEvent) {
        return function(type, fn) {
          for(var i =0; i< this.length; i++) {
            this[i].attachEvent('on' + type, fn,)
          }
          return this
        }
      } else {
        return function(type, fn) {
          for(var i = 0; i< this.length; i++) {
            this[i]['on'+ type] = fn
          }
          return this
        }
      }
    })()
  })

  // 获取或者设置css样式
  eQuery.fn.extend({
    css: function() {
      var len = arguments.length,
          args = arguments
      if(this.length < 1) return this
      if(len === 1) {
        if(typeof args[0] === 'string') {
          return this[0].currentStyle ? this[0].currentStyle[args[0]] : getComputedStyle(this[0], false)[args[0]]
        } else if(typeof args[0] === 'object') {
          for(var key in args[0]) {
            for(var i =0; i < this.length; i++) {
              this[i].style[eQuery.camelCase(key)] = args[0][key]
            }
          }
        }
      } else if(len === 2){
        for(var i =0; i < this.length; i++) {
          this[i].style[eQuery.camelCase(args[0])] = args[1]
        }
      }
      return this
    }
  })

  eQuery.fn.extend({
    attr: function() {
      var args = arguments,
          len = args.length
      if(this.length < 1) return this
      if(len === 1) {
        if(typeof args[0] === 'string') {
          return this[0] && this[0].getAttribute(args[0])
        } else if(typeof args[0] === 'object') {
          for(var key in args[0]) {
            for(var i =0; i< this.length; i++) {
              this[i].setAttribute(key, args[0][key])
            }
          }
        }
      } else if(len === 2) {
        for(var i =0; i < this.length; i++) {
          this[i].setAttribute(args[0], args[1])
        }
      }
      return this
    }
  })

  // 获取或者设置html内容
  eQuery.fn.extend({
    html: function() {
      var len = arguments.length,
          args = arguments
      if(len === 0) {
        return this[0] && this[0].innerHTML
      } else {
        for(var i =0; i< this.length; i++) {
          this[i].innerHTML = args[0]
        }
      }
    }
  })

  // “-”变驼峰
  eQuery.extend({
    camelCase: function(str) {
      return str.replace(/-(\w)/g, function(all, matcher) {
        return matcher.toUpperCase()
      })
    }
  })

  eQuery.fn.init.prototype = eQuery.fn

  return eQuery
})
