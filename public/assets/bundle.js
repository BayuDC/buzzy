/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/cash-dom/dist/cash.js":
/*!********************************************!*\
  !*** ./node_modules/cash-dom/dist/cash.js ***!
  \********************************************/
/***/ ((module) => {

/* MIT https://github.com/fabiospampinato/cash */
(function(){
"use strict";

var propMap = {
  /* GENERAL */
  "class": 'className',
  contenteditable: 'contentEditable',

  /* LABEL */
  "for": 'htmlFor',

  /* INPUT */
  readonly: 'readOnly',
  maxlength: 'maxLength',
  tabindex: 'tabIndex',

  /* TABLE */
  colspan: 'colSpan',
  rowspan: 'rowSpan',

  /* IMAGE */
  usemap: 'useMap'
};

function attempt(fn, arg) {
  try {
    return fn(arg);
  } catch (_a) {
    return arg;
  }
}

var doc = document,
    win = window,
    docEle = doc.documentElement,
    createElement = doc.createElement.bind(doc),
    div = createElement('div'),
    table = createElement('table'),
    tbody = createElement('tbody'),
    tr = createElement('tr'),
    isArray = Array.isArray,
    ArrayPrototype = Array.prototype,
    concat = ArrayPrototype.concat,
    filter = ArrayPrototype.filter,
    indexOf = ArrayPrototype.indexOf,
    map = ArrayPrototype.map,
    push = ArrayPrototype.push,
    slice = ArrayPrototype.slice,
    some = ArrayPrototype.some,
    splice = ArrayPrototype.splice;
var idRe = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    classRe = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/,
    htmlRe = /<.+>/,
    tagRe = /^\w+$/; // @require ./variables.ts

function find(selector, context) {
  return !selector || !isDocument(context) && !isElement(context) ? [] : classRe.test(selector) ? context.getElementsByClassName(selector.slice(1)) : tagRe.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
} // @require ./find.ts
// @require ./variables.ts


var Cash =
/** @class */
function () {
  function Cash(selector, context) {
    if (!selector) return;
    if (isCash(selector)) return selector;
    var eles = selector;

    if (isString(selector)) {
      var ctx = (isCash(context) ? context[0] : context) || doc;
      eles = idRe.test(selector) ? ctx.getElementById(selector.slice(1)) : htmlRe.test(selector) ? parseHTML(selector) : find(selector, ctx);
      if (!eles) return;
    } else if (isFunction(selector)) {
      return this.ready(selector); //FIXME: `fn.ready` is not included in `core`, but it's actually a core functionality
    }

    if (eles.nodeType || eles === win) eles = [eles];
    this.length = eles.length;

    for (var i = 0, l = this.length; i < l; i++) {
      this[i] = eles[i];
    }
  }

  Cash.prototype.init = function (selector, context) {
    return new Cash(selector, context);
  };

  return Cash;
}();

var fn = Cash.prototype,
    cash = fn.init;
cash.fn = cash.prototype = fn; // Ensuring that `cash () instanceof cash`

fn.length = 0;
fn.splice = splice; // Ensuring a cash collection gets printed as array-like in Chrome's devtools

if (typeof Symbol === 'function') {
  // Ensuring a cash collection is iterable
  fn[Symbol['iterator']] = ArrayPrototype[Symbol['iterator']];
}

fn.map = function (callback) {
  return cash(concat.apply([], map.call(this, function (ele, i) {
    return callback.call(ele, i, ele);
  })));
};

fn.slice = function (start, end) {
  return cash(slice.call(this, start, end));
}; // @require ./cash.ts


var dashAlphaRe = /-([a-z])/g;

function camelCase(str) {
  return str.replace(dashAlphaRe, function (match, letter) {
    return letter.toUpperCase();
  });
}

cash.guid = 1; // @require ./cash.ts

function matches(ele, selector) {
  var matches = ele && (ele['matches'] || ele['webkitMatchesSelector'] || ele['msMatchesSelector']);
  return !!matches && !!selector && matches.call(ele, selector);
}

function isCash(x) {
  return x instanceof Cash;
}

function isWindow(x) {
  return !!x && x === x.window;
}

function isDocument(x) {
  return !!x && x.nodeType === 9;
}

function isElement(x) {
  return !!x && x.nodeType === 1;
}

function isBoolean(x) {
  return typeof x === 'boolean';
}

function isFunction(x) {
  return typeof x === 'function';
}

function isString(x) {
  return typeof x === 'string';
}

function isUndefined(x) {
  return x === undefined;
}

function isNull(x) {
  return x === null;
}

function isNumeric(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
}

function isPlainObject(x) {
  if (typeof x !== 'object' || x === null) return false;
  var proto = Object.getPrototypeOf(x);
  return proto === null || proto === Object.prototype;
}

cash.isWindow = isWindow;
cash.isFunction = isFunction;
cash.isArray = isArray;
cash.isNumeric = isNumeric;
cash.isPlainObject = isPlainObject;

fn.get = function (index) {
  if (isUndefined(index)) return slice.call(this);
  index = Number(index);
  return this[index < 0 ? index + this.length : index];
};

fn.eq = function (index) {
  return cash(this.get(index));
};

fn.first = function () {
  return this.eq(0);
};

fn.last = function () {
  return this.eq(-1);
};

function each(arr, callback, _reverse) {
  if (_reverse) {
    var i = arr.length;

    while (i--) {
      if (callback.call(arr[i], i, arr[i]) === false) return arr;
    }
  } else if (isPlainObject(arr)) {
    var keys = Object.keys(arr);

    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      if (callback.call(arr[key], key, arr[key]) === false) return arr;
    }
  } else {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (callback.call(arr[i], i, arr[i]) === false) return arr;
    }
  }

  return arr;
}

cash.each = each;

fn.each = function (callback) {
  return each(this, callback);
};

fn.prop = function (prop, value) {
  if (!prop) return;

  if (isString(prop)) {
    prop = propMap[prop] || prop;
    if (arguments.length < 2) return this[0] && this[0][prop];
    return this.each(function (i, ele) {
      ele[prop] = value;
    });
  }

  for (var key in prop) {
    this.prop(key, prop[key]);
  }

  return this;
};

fn.removeProp = function (prop) {
  return this.each(function (i, ele) {
    delete ele[propMap[prop] || prop];
  });
};

function extend() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  var deep = isBoolean(sources[0]) ? sources.shift() : false,
      target = sources.shift(),
      length = sources.length;
  if (!target) return {};
  if (!length) return extend(deep, cash, target);

  for (var i = 0; i < length; i++) {
    var source = sources[i];

    for (var key in source) {
      if (deep && (isArray(source[key]) || isPlainObject(source[key]))) {
        if (!target[key] || target[key].constructor !== source[key].constructor) target[key] = new source[key].constructor();
        extend(deep, target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}

cash.extend = extend;

fn.extend = function (plugins) {
  return extend(fn, plugins);
}; // @require ./matches.ts
// @require ./type_checking.ts


function getCompareFunction(comparator) {
  return isString(comparator) ? function (i, ele) {
    return matches(ele, comparator);
  } : isFunction(comparator) ? comparator : isCash(comparator) ? function (i, ele) {
    return comparator.is(ele);
  } : !comparator ? function () {
    return false;
  } : function (i, ele) {
    return ele === comparator;
  };
}

fn.filter = function (comparator) {
  var compare = getCompareFunction(comparator);
  return cash(filter.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  }));
}; // @require collection/filter.ts


function filtered(collection, comparator) {
  return !comparator ? collection : collection.filter(comparator);
} // @require ./type_checking.ts


var splitValuesRe = /\S+/g;

function getSplitValues(str) {
  return isString(str) ? str.match(splitValuesRe) || [] : [];
}

fn.hasClass = function (cls) {
  return !!cls && some.call(this, function (ele) {
    return isElement(ele) && ele.classList.contains(cls);
  });
};

fn.removeAttr = function (attr) {
  var attrs = getSplitValues(attr);
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    each(attrs, function (i, a) {
      ele.removeAttribute(a);
    });
  });
};

function attr(attr, value) {
  if (!attr) return;

  if (isString(attr)) {
    if (arguments.length < 2) {
      if (!this[0] || !isElement(this[0])) return;
      var value_1 = this[0].getAttribute(attr);
      return isNull(value_1) ? undefined : value_1;
    }

    if (isUndefined(value)) return this;
    if (isNull(value)) return this.removeAttr(attr);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      ele.setAttribute(attr, value);
    });
  }

  for (var key in attr) {
    this.attr(key, attr[key]);
  }

  return this;
}

fn.attr = attr;

fn.toggleClass = function (cls, force) {
  var classes = getSplitValues(cls),
      isForce = !isUndefined(force);
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    each(classes, function (i, c) {
      if (isForce) {
        force ? ele.classList.add(c) : ele.classList.remove(c);
      } else {
        ele.classList.toggle(c);
      }
    });
  });
};

fn.addClass = function (cls) {
  return this.toggleClass(cls, true);
};

fn.removeClass = function (cls) {
  if (arguments.length) return this.toggleClass(cls, false);
  return this.attr('class', '');
};

function pluck(arr, prop, deep, until) {
  var plucked = [],
      isCallback = isFunction(prop),
      compare = until && getCompareFunction(until);

  for (var i = 0, l = arr.length; i < l; i++) {
    if (isCallback) {
      var val_1 = prop(arr[i]);
      if (val_1.length) push.apply(plucked, val_1);
    } else {
      var val_2 = arr[i][prop];

      while (val_2 != null) {
        if (until && compare(-1, val_2)) break;
        plucked.push(val_2);
        val_2 = deep ? val_2[prop] : null;
      }
    }
  }

  return plucked;
}

function unique(arr) {
  return arr.length > 1 ? filter.call(arr, function (item, index, self) {
    return indexOf.call(self, item) === index;
  }) : arr;
}

cash.unique = unique;

fn.add = function (selector, context) {
  return cash(unique(this.get().concat(cash(selector, context).get())));
}; // @require core/type_checking.ts
// @require core/variables.ts


function computeStyle(ele, prop, isVariable) {
  if (!isElement(ele)) return;
  var style = win.getComputedStyle(ele, null);
  return isVariable ? style.getPropertyValue(prop) || undefined : style[prop] || ele.style[prop];
} // @require ./compute_style.ts


function computeStyleInt(ele, prop) {
  return parseInt(computeStyle(ele, prop), 10) || 0;
}

var cssVariableRe = /^--/; // @require ./variables.ts

function isCSSVariable(prop) {
  return cssVariableRe.test(prop);
} // @require core/camel_case.ts
// @require core/cash.ts
// @require core/each.ts
// @require core/variables.ts
// @require ./is_css_variable.ts


var prefixedProps = {},
    style = div.style,
    vendorsPrefixes = ['webkit', 'moz', 'ms'];

function getPrefixedProp(prop, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  if (isVariable) return prop;

  if (!prefixedProps[prop]) {
    var propCC = camelCase(prop),
        propUC = "" + propCC[0].toUpperCase() + propCC.slice(1),
        props = (propCC + " " + vendorsPrefixes.join(propUC + " ") + propUC).split(' ');
    each(props, function (i, p) {
      if (p in style) {
        prefixedProps[prop] = p;
        return false;
      }
    });
  }

  return prefixedProps[prop];
}

; // @require core/type_checking.ts
// @require ./is_css_variable.ts

var numericProps = {
  animationIterationCount: true,
  columnCount: true,
  flexGrow: true,
  flexShrink: true,
  fontWeight: true,
  gridArea: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnStart: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowStart: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true
};

function getSuffixedValue(prop, value, isVariable) {
  if (isVariable === void 0) {
    isVariable = isCSSVariable(prop);
  }

  return !isVariable && !numericProps[prop] && isNumeric(value) ? value + "px" : value;
}

function css(prop, value) {
  if (isString(prop)) {
    var isVariable_1 = isCSSVariable(prop);
    prop = getPrefixedProp(prop, isVariable_1);
    if (arguments.length < 2) return this[0] && computeStyle(this[0], prop, isVariable_1);
    if (!prop) return this;
    value = getSuffixedValue(prop, value, isVariable_1);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;

      if (isVariable_1) {
        ele.style.setProperty(prop, value);
      } else {
        ele.style[prop] = value;
      }
    });
  }

  for (var key in prop) {
    this.css(key, prop[key]);
  }

  return this;
}

;
fn.css = css; // @optional ./css.ts
// @require core/attempt.ts
// @require core/camel_case.ts

var JSONStringRe = /^\s+|\s+$/;

function getData(ele, key) {
  var value = ele.dataset[key] || ele.dataset[camelCase(key)];
  if (JSONStringRe.test(value)) return value;
  return attempt(JSON.parse, value);
} // @require core/attempt.ts
// @require core/camel_case.ts


function setData(ele, key, value) {
  value = attempt(JSON.stringify, value);
  ele.dataset[camelCase(key)] = value;
}

function data(name, value) {
  if (!name) {
    if (!this[0]) return;
    var datas = {};

    for (var key in this[0].dataset) {
      datas[key] = getData(this[0], key);
    }

    return datas;
  }

  if (isString(name)) {
    if (arguments.length < 2) return this[0] && getData(this[0], name);
    if (isUndefined(value)) return this;
    return this.each(function (i, ele) {
      setData(ele, name, value);
    });
  }

  for (var key in name) {
    this.data(key, name[key]);
  }

  return this;
}

fn.data = data; // @optional ./data.ts

function getDocumentDimension(doc, dimension) {
  var docEle = doc.documentElement;
  return Math.max(doc.body["scroll" + dimension], docEle["scroll" + dimension], doc.body["offset" + dimension], docEle["offset" + dimension], docEle["client" + dimension]);
} // @require css/helpers/compute_style_int.ts


function getExtraSpace(ele, xAxis) {
  return computeStyleInt(ele, "border" + (xAxis ? 'Left' : 'Top') + "Width") + computeStyleInt(ele, "padding" + (xAxis ? 'Left' : 'Top')) + computeStyleInt(ele, "padding" + (xAxis ? 'Right' : 'Bottom')) + computeStyleInt(ele, "border" + (xAxis ? 'Right' : 'Bottom') + "Width");
}

each([true, false], function (i, outer) {
  each(['Width', 'Height'], function (i, prop) {
    var name = "" + (outer ? 'outer' : 'inner') + prop;

    fn[name] = function (includeMargins) {
      if (!this[0]) return;
      if (isWindow(this[0])) return outer ? this[0]["inner" + prop] : this[0].document.documentElement["client" + prop];
      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
      return this[0]["" + (outer ? 'offset' : 'client') + prop] + (includeMargins && outer ? computeStyleInt(this[0], "margin" + (i ? 'Top' : 'Left')) + computeStyleInt(this[0], "margin" + (i ? 'Bottom' : 'Right')) : 0);
    };
  });
});
each(['Width', 'Height'], function (index, prop) {
  var propLC = prop.toLowerCase();

  fn[propLC] = function (value) {
    if (!this[0]) return isUndefined(value) ? undefined : this;

    if (!arguments.length) {
      if (isWindow(this[0])) return this[0].document.documentElement["client" + prop];
      if (isDocument(this[0])) return getDocumentDimension(this[0], prop);
      return this[0].getBoundingClientRect()[propLC] - getExtraSpace(this[0], !index);
    }

    var valueNumber = parseInt(value, 10);
    return this.each(function (i, ele) {
      if (!isElement(ele)) return;
      var boxSizing = computeStyle(ele, 'boxSizing');
      ele.style[propLC] = getSuffixedValue(propLC, valueNumber + (boxSizing === 'border-box' ? getExtraSpace(ele, !index) : 0));
    });
  };
}); // @optional ./inner_outer.ts
// @optional ./normal.ts
// @require css/helpers/compute_style.ts

var defaultDisplay = {};

function getDefaultDisplay(tagName) {
  if (defaultDisplay[tagName]) return defaultDisplay[tagName];
  var ele = createElement(tagName);
  doc.body.insertBefore(ele, null);
  var display = computeStyle(ele, 'display');
  doc.body.removeChild(ele);
  return defaultDisplay[tagName] = display !== 'none' ? display : 'block';
} // @require css/helpers/compute_style.ts


function isHidden(ele) {
  return computeStyle(ele, 'display') === 'none';
}

var displayProperty = '___cd';

fn.toggle = function (force) {
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    var show = isUndefined(force) ? isHidden(ele) : force;

    if (show) {
      ele.style.display = ele[displayProperty] || '';

      if (isHidden(ele)) {
        ele.style.display = getDefaultDisplay(ele.tagName);
      }
    } else {
      ele[displayProperty] = computeStyle(ele, 'display');
      ele.style.display = 'none';
    }
  });
};

fn.hide = function () {
  return this.toggle(false);
};

fn.show = function () {
  return this.toggle(true);
}; // @optional ./hide.ts
// @optional ./show.ts
// @optional ./toggle.ts


function hasNamespaces(ns1, ns2) {
  return !ns2 || !some.call(ns2, function (ns) {
    return ns1.indexOf(ns) < 0;
  });
}

var eventsNamespace = '___ce',
    eventsNamespacesSeparator = '.',
    eventsFocus = {
  focus: 'focusin',
  blur: 'focusout'
},
    eventsHover = {
  mouseenter: 'mouseover',
  mouseleave: 'mouseout'
},
    eventsMouseRe = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i; // @require ./variables.ts

function getEventNameBubbling(name) {
  return eventsHover[name] || eventsFocus[name] || name;
} // @require ./variables.ts


function getEventsCache(ele) {
  return ele[eventsNamespace] = ele[eventsNamespace] || {};
} // @require core/guid.ts
// @require events/helpers/get_events_cache.ts


function addEvent(ele, name, namespaces, selector, callback) {
  var eventCache = getEventsCache(ele);
  eventCache[name] = eventCache[name] || [];
  eventCache[name].push([namespaces, selector, callback]);
  ele.addEventListener(name, callback);
} // @require ./variables.ts


function parseEventName(eventName) {
  var parts = eventName.split(eventsNamespacesSeparator);
  return [parts[0], parts.slice(1).sort()]; // [name, namespace[]]
} // @require ./get_events_cache.ts
// @require ./has_namespaces.ts
// @require ./parse_event_name.ts


function removeEvent(ele, name, namespaces, selector, callback) {
  var cache = getEventsCache(ele);

  if (!name) {
    for (name in cache) {
      removeEvent(ele, name, namespaces, selector, callback);
    }
  } else if (cache[name]) {
    cache[name] = cache[name].filter(function (_a) {
      var ns = _a[0],
          sel = _a[1],
          cb = _a[2];
      if (callback && cb.guid !== callback.guid || !hasNamespaces(ns, namespaces) || selector && selector !== sel) return true;
      ele.removeEventListener(name, cb);
    });
  }
}

fn.off = function (eventFullName, selector, callback) {
  var _this = this;

  if (isUndefined(eventFullName)) {
    this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
      removeEvent(ele);
    });
  } else if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.off(key, eventFullName[key]);
    }
  } else {
    if (isFunction(selector)) {
      callback = selector;
      selector = '';
    }

    each(getSplitValues(eventFullName), function (i, eventFullName) {
      var _a = parseEventName(eventFullName),
          nameOriginal = _a[0],
          namespaces = _a[1],
          name = getEventNameBubbling(nameOriginal);

      _this.each(function (i, ele) {
        if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;
        removeEvent(ele, name, namespaces, selector, callback);
      });
    });
  }

  return this;
};

function on(eventFullName, selector, data, callback, _one) {
  var _this = this;

  if (!isString(eventFullName)) {
    for (var key in eventFullName) {
      this.on(key, selector, data, eventFullName[key], _one);
    }

    return this;
  }

  if (!isString(selector)) {
    if (isUndefined(selector) || isNull(selector)) {
      selector = '';
    } else if (isUndefined(data)) {
      data = selector;
      selector = '';
    } else {
      callback = data;
      data = selector;
      selector = '';
    }
  }

  if (!isFunction(callback)) {
    callback = data;
    data = undefined;
  }

  if (!callback) return this;
  each(getSplitValues(eventFullName), function (i, eventFullName) {
    var _a = parseEventName(eventFullName),
        nameOriginal = _a[0],
        namespaces = _a[1],
        name = getEventNameBubbling(nameOriginal),
        isEventHover = nameOriginal in eventsHover,
        isEventFocus = nameOriginal in eventsFocus;

    if (!name) return;

    _this.each(function (i, ele) {
      if (!isElement(ele) && !isDocument(ele) && !isWindow(ele)) return;

      var finalCallback = function finalCallback(event) {
        if (event.target["___i" + event.type]) return event.stopImmediatePropagation(); // Ignoring native event in favor of the upcoming custom one

        if (event.namespace && !hasNamespaces(namespaces, event.namespace.split(eventsNamespacesSeparator))) return;
        if (!selector && (isEventFocus && (event.target !== ele || event.___ot === name) || isEventHover && event.relatedTarget && ele.contains(event.relatedTarget))) return;
        var thisArg = ele;

        if (selector) {
          var target = event.target;

          while (!matches(target, selector)) {
            if (target === ele) return;
            target = target.parentNode;
            if (!target) return;
          }

          thisArg = target;
          event.___cd = true; // Delegate
        }

        if (event.___cd) {
          Object.defineProperty(event, 'currentTarget', {
            configurable: true,
            get: function get() {
              return thisArg;
            }
          });
        }

        Object.defineProperty(event, 'data', {
          configurable: true,
          get: function get() {
            return data;
          }
        });
        var returnValue = callback.call(thisArg, event, event.___td);

        if (_one) {
          removeEvent(ele, name, namespaces, selector, finalCallback);
        }

        if (returnValue === false) {
          event.preventDefault();
          event.stopPropagation();
        }
      };

      finalCallback.guid = callback.guid = callback.guid || cash.guid++;
      addEvent(ele, name, namespaces, selector, finalCallback);
    });
  });
  return this;
}

fn.on = on;

function one(eventFullName, selector, data, callback) {
  return this.on(eventFullName, selector, data, callback, true);
}

;
fn.one = one;

fn.ready = function (callback) {
  var cb = function cb() {
    return setTimeout(callback, 0, cash);
  };

  if (doc.readyState !== 'loading') {
    cb();
  } else {
    doc.addEventListener('DOMContentLoaded', cb);
  }

  return this;
};

fn.trigger = function (event, data) {
  if (isString(event)) {
    var _a = parseEventName(event),
        nameOriginal = _a[0],
        namespaces = _a[1],
        name_1 = getEventNameBubbling(nameOriginal);

    if (!name_1) return this;
    var type = eventsMouseRe.test(name_1) ? 'MouseEvents' : 'HTMLEvents';
    event = doc.createEvent(type);
    event.initEvent(name_1, true, true);
    event.namespace = namespaces.join(eventsNamespacesSeparator);
    event.___ot = nameOriginal;
  }

  event.___td = data;
  var isEventFocus = event.___ot in eventsFocus;
  return this.each(function (i, ele) {
    if (isEventFocus && isFunction(ele[event.___ot])) {
      ele["___i" + event.type] = true; // Ensuring the native event is ignored

      ele[event.___ot]();

      ele["___i" + event.type] = false; // Ensuring the custom event is not ignored
    }

    ele.dispatchEvent(event);
  });
}; // @optional ./off.ts
// @optional ./on.ts
// @optional ./one.ts
// @optional ./ready.ts
// @optional ./trigger.ts
// @require core/pluck.ts
// @require core/variables.ts


function getValue(ele) {
  if (ele.multiple && ele.options) return pluck(filter.call(ele.options, function (option) {
    return option.selected && !option.disabled && !option.parentNode.disabled;
  }), 'value');
  return ele.value || '';
}

var queryEncodeSpaceRe = /%20/g,
    queryEncodeCRLFRe = /\r?\n/g;

function queryEncode(prop, value) {
  return "&" + encodeURIComponent(prop) + "=" + encodeURIComponent(value.replace(queryEncodeCRLFRe, '\r\n')).replace(queryEncodeSpaceRe, '+');
}

var skippableRe = /file|reset|submit|button|image/i,
    checkableRe = /radio|checkbox/i;

fn.serialize = function () {
  var query = '';
  this.each(function (i, ele) {
    each(ele.elements || [ele], function (i, ele) {
      if (ele.disabled || !ele.name || ele.tagName === 'FIELDSET' || skippableRe.test(ele.type) || checkableRe.test(ele.type) && !ele.checked) return;
      var value = getValue(ele);

      if (!isUndefined(value)) {
        var values = isArray(value) ? value : [value];
        each(values, function (i, value) {
          query += queryEncode(ele.name, value);
        });
      }
    });
  });
  return query.slice(1);
};

function val(value) {
  if (!arguments.length) return this[0] && getValue(this[0]);
  return this.each(function (i, ele) {
    var isSelect = ele.multiple && ele.options;

    if (isSelect || checkableRe.test(ele.type)) {
      var eleValue_1 = isArray(value) ? map.call(value, String) : isNull(value) ? [] : [String(value)];

      if (isSelect) {
        each(ele.options, function (i, option) {
          option.selected = eleValue_1.indexOf(option.value) >= 0;
        }, true);
      } else {
        ele.checked = eleValue_1.indexOf(ele.value) >= 0;
      }
    } else {
      ele.value = isUndefined(value) || isNull(value) ? '' : value;
    }
  });
}

fn.val = val;

fn.clone = function () {
  return this.map(function (i, ele) {
    return ele.cloneNode(true);
  });
};

fn.detach = function (comparator) {
  filtered(this, comparator).each(function (i, ele) {
    if (ele.parentNode) {
      ele.parentNode.removeChild(ele);
    }
  });
  return this;
};

var fragmentRe = /^\s*<(\w+)[^>]*>/,
    singleTagRe = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
var containers = {
  '*': div,
  tr: tbody,
  td: tr,
  th: tr,
  thead: table,
  tbody: table,
  tfoot: table
}; //TODO: Create elements inside a document fragment, in order to prevent inline event handlers from firing
//TODO: Ensure the created elements have the fragment as their parent instead of null, this also ensures we can deal with detatched nodes more reliably

function parseHTML(html) {
  if (!isString(html)) return [];
  if (singleTagRe.test(html)) return [createElement(RegExp.$1)];
  var fragment = fragmentRe.test(html) && RegExp.$1,
      container = containers[fragment] || containers['*'];
  container.innerHTML = html;
  return cash(container.childNodes).detach().get();
}

cash.parseHTML = parseHTML;

fn.empty = function () {
  return this.each(function (i, ele) {
    while (ele.firstChild) {
      ele.removeChild(ele.firstChild);
    }
  });
};

function html(html) {
  if (!arguments.length) return this[0] && this[0].innerHTML;
  if (isUndefined(html)) return this;
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    ele.innerHTML = html;
  });
}

fn.html = html;

fn.remove = function (comparator) {
  filtered(this, comparator).detach().off();
  return this;
};

function text(text) {
  if (isUndefined(text)) return this[0] ? this[0].textContent : '';
  return this.each(function (i, ele) {
    if (!isElement(ele)) return;
    ele.textContent = text;
  });
}

;
fn.text = text;

fn.unwrap = function () {
  this.parent().each(function (i, ele) {
    if (ele.tagName === 'BODY') return;
    var $ele = cash(ele);
    $ele.replaceWith($ele.children());
  });
  return this;
};

fn.offset = function () {
  var ele = this[0];
  if (!ele) return;
  var rect = ele.getBoundingClientRect();
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
};

fn.offsetParent = function () {
  return this.map(function (i, ele) {
    var offsetParent = ele.offsetParent;

    while (offsetParent && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.offsetParent;
    }

    return offsetParent || docEle;
  });
};

fn.position = function () {
  var ele = this[0];
  if (!ele) return;
  var isFixed = computeStyle(ele, 'position') === 'fixed',
      offset = isFixed ? ele.getBoundingClientRect() : this.offset();

  if (!isFixed) {
    var doc_1 = ele.ownerDocument;
    var offsetParent = ele.offsetParent || doc_1.documentElement;

    while ((offsetParent === doc_1.body || offsetParent === doc_1.documentElement) && computeStyle(offsetParent, 'position') === 'static') {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent !== ele && isElement(offsetParent)) {
      var parentOffset = cash(offsetParent).offset();
      offset.top -= parentOffset.top + computeStyleInt(offsetParent, 'borderTopWidth');
      offset.left -= parentOffset.left + computeStyleInt(offsetParent, 'borderLeftWidth');
    }
  }

  return {
    top: offset.top - computeStyleInt(ele, 'marginTop'),
    left: offset.left - computeStyleInt(ele, 'marginLeft')
  };
};

fn.children = function (comparator) {
  return filtered(cash(unique(pluck(this, function (ele) {
    return ele.children;
  }))), comparator);
};

fn.contents = function () {
  return cash(unique(pluck(this, function (ele) {
    return ele.tagName === 'IFRAME' ? [ele.contentDocument] : ele.tagName === 'TEMPLATE' ? ele.content.childNodes : ele.childNodes;
  })));
};

fn.find = function (selector) {
  return cash(unique(pluck(this, function (ele) {
    return find(selector, ele);
  })));
}; // @require core/variables.ts
// @require collection/filter.ts
// @require traversal/find.ts


var HTMLCDATARe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    scriptTypeRe = /^$|^module$|\/(java|ecma)script/i,
    scriptAttributes = ['type', 'src', 'nonce', 'noModule'];

function evalScripts(node, doc) {
  var collection = cash(node);
  collection.filter('script').add(collection.find('script')).each(function (i, ele) {
    if (scriptTypeRe.test(ele.type) && docEle.contains(ele)) {
      // The script type is supported // The element is attached to the DOM // Using `documentElement` for broader browser support
      var script_1 = createElement('script');
      script_1.text = ele.textContent.replace(HTMLCDATARe, '');
      each(scriptAttributes, function (i, attr) {
        if (ele[attr]) script_1[attr] = ele[attr];
      });
      doc.head.insertBefore(script_1, null);
      doc.head.removeChild(script_1);
    }
  });
} // @require ./eval_scripts.ts


function insertElement(anchor, target, left, inside, evaluate) {
  if (inside) {
    // prepend/append
    anchor.insertBefore(target, left ? anchor.firstChild : null);
  } else {
    // before/after
    anchor.parentNode.insertBefore(target, left ? anchor : anchor.nextSibling);
  }

  if (evaluate) {
    evalScripts(target, anchor.ownerDocument);
  }
} // @require ./insert_element.ts


function insertSelectors(selectors, anchors, inverse, left, inside, reverseLoop1, reverseLoop2, reverseLoop3) {
  each(selectors, function (si, selector) {
    each(cash(selector), function (ti, target) {
      each(cash(anchors), function (ai, anchor) {
        var anchorFinal = inverse ? target : anchor,
            targetFinal = inverse ? anchor : target,
            indexFinal = inverse ? ti : ai;
        insertElement(anchorFinal, !indexFinal ? targetFinal : targetFinal.cloneNode(true), left, inside, !indexFinal);
      }, reverseLoop3);
    }, reverseLoop2);
  }, reverseLoop1);
  return anchors;
}

fn.after = function () {
  return insertSelectors(arguments, this, false, false, false, true, true);
};

fn.append = function () {
  return insertSelectors(arguments, this, false, false, true);
};

fn.appendTo = function (selector) {
  return insertSelectors(arguments, this, true, false, true);
};

fn.before = function () {
  return insertSelectors(arguments, this, false, true);
};

fn.insertAfter = function (selector) {
  return insertSelectors(arguments, this, true, false, false, false, false, true);
};

fn.insertBefore = function (selector) {
  return insertSelectors(arguments, this, true, true);
};

fn.prepend = function () {
  return insertSelectors(arguments, this, false, true, true, true, true);
};

fn.prependTo = function (selector) {
  return insertSelectors(arguments, this, true, true, true, false, false, true);
};

fn.replaceWith = function (selector) {
  return this.before(selector).remove();
};

fn.replaceAll = function (selector) {
  cash(selector).replaceWith(this);
  return this;
};

fn.wrapAll = function (selector) {
  var structure = cash(selector),
      wrapper = structure[0];

  while (wrapper.children.length) {
    wrapper = wrapper.firstElementChild;
  }

  this.first().before(structure);
  return this.appendTo(wrapper);
};

fn.wrap = function (selector) {
  return this.each(function (i, ele) {
    var wrapper = cash(selector)[0];
    cash(ele).wrapAll(!i ? wrapper : wrapper.cloneNode(true));
  });
};

fn.wrapInner = function (selector) {
  return this.each(function (i, ele) {
    var $ele = cash(ele),
        contents = $ele.contents();
    contents.length ? contents.wrapAll(selector) : $ele.append(selector);
  });
};

fn.has = function (selector) {
  var comparator = isString(selector) ? function (i, ele) {
    return find(selector, ele).length;
  } : function (i, ele) {
    return ele.contains(selector);
  };
  return this.filter(comparator);
};

fn.is = function (comparator) {
  var compare = getCompareFunction(comparator);
  return some.call(this, function (ele, i) {
    return compare.call(ele, i, ele);
  });
};

fn.next = function (comparator, _all, _until) {
  return filtered(cash(unique(pluck(this, 'nextElementSibling', _all, _until))), comparator);
};

fn.nextAll = function (comparator) {
  return this.next(comparator, true);
};

fn.nextUntil = function (until, comparator) {
  return this.next(comparator, true, until);
};

fn.not = function (comparator) {
  var compare = getCompareFunction(comparator);
  return this.filter(function (i, ele) {
    return (!isString(comparator) || isElement(ele)) && !compare.call(ele, i, ele);
  });
};

fn.parent = function (comparator) {
  return filtered(cash(unique(pluck(this, 'parentNode'))), comparator);
};

fn.index = function (selector) {
  var child = selector ? cash(selector)[0] : this[0],
      collection = selector ? this : cash(child).parent().children();
  return indexOf.call(collection, child);
};

fn.closest = function (comparator) {
  var filtered = this.filter(comparator);
  if (filtered.length) return filtered;
  var $parent = this.parent();
  if (!$parent.length) return filtered;
  return $parent.closest(comparator);
};

fn.parents = function (comparator, _until) {
  return filtered(cash(unique(pluck(this, 'parentElement', true, _until))), comparator);
};

fn.parentsUntil = function (until, comparator) {
  return this.parents(comparator, until);
};

fn.prev = function (comparator, _all, _until) {
  return filtered(cash(unique(pluck(this, 'previousElementSibling', _all, _until))), comparator);
};

fn.prevAll = function (comparator) {
  return this.prev(comparator, true);
};

fn.prevUntil = function (until, comparator) {
  return this.prev(comparator, true, until);
};

fn.siblings = function (comparator) {
  return filtered(cash(unique(pluck(this, function (ele) {
    return cash(ele).parent().children().not(ele);
  }))), comparator);
}; // @optional ./children.ts
// @optional ./closest.ts
// @optional ./contents.ts
// @optional ./find.ts
// @optional ./has.ts
// @optional ./is.ts
// @optional ./next.ts
// @optional ./next_all.ts
// @optional ./next_until.ts
// @optional ./not.ts
// @optional ./parent.ts
// @optional ./parents.ts
// @optional ./parents_until.ts
// @optional ./prev.ts
// @optional ./prev_all.ts
// @optional ./prev_until.ts
// @optional ./siblings.ts
// @optional attributes/index.ts
// @optional collection/index.ts
// @optional css/index.ts
// @optional data/index.ts
// @optional dimensions/index.ts
// @optional effects/index.ts
// @optional events/index.ts
// @optional forms/index.ts
// @optional manipulation/index.ts
// @optional offset/index.ts
// @optional traversal/index.ts
// @require core/index.ts
// @priority -100
// @require ./cash.ts
// @require ./variables.ts


if (true) {
  // Node.js
  module.exports = cash;
} else {}
})();

/***/ }),

/***/ "./assets/scss/main.scss":
/*!*******************************!*\
  !*** ./assets/scss/main.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "bundle.css");

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../scss/main.scss */ "./assets/scss/main.scss");




var controller;
var socket;
cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#url').on('keyup', function (e) {
  if (e.key == 'Enter') cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#btn-go').trigger('click');
});
cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#btn-go').on('click', /*#__PURE__*/(0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
  var _controller;

  var $music, $download, $message, $loader, error, url, _socket, res, body, music, $img, $info;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (_controller = controller) === null || _controller === void 0 ? void 0 : _controller.abort();
          controller = new AbortController();
          $music = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('.music').hide();
          $download = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#download').attr('class', 'hide');
          $message = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('.message').hide();
          $loader = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('.loader').addClass('load');

          error = function error(msg) {
            $message.text(msg).show();
            $loader.removeClass('load');
          };

          url = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#url').val();

          if (url) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", error("The url can't be empty"));

        case 10:
          _context.prev = 10;
          _context.next = 13;
          return fetch('/app', {
            method: 'post',
            body: JSON.stringify({
              url: url
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            signal: controller.signal
          });

        case 13:
          res = _context.sent;
          _context.next = 16;
          return res.json();

        case 16:
          body = _context.sent;

          if (res.ok) {
            _context.next = 21;
            break;
          }

          if (body.msg) {
            _context.next = 20;
            break;
          }

          throw body;

        case 20:
          return _context.abrupt("return", error(body.msg));

        case 21:
          if (body.music) {
            _context.next = 23;
            break;
          }

          throw body;

        case 23:
          music = body.music;
          $img = $music.children().first().children().first();
          $info = $music.children().last();
          $info.find('.genre').text("#".concat(music.genre || 'NoGenre', " "));
          $info.find('.title').text(music.title);
          $info.find('.artist').text("".concat(music.artist || 'Unknown Artist', " \u2022 ").concat(music.album || 'Unknown Album'));
          $info.find('.year').text(music.year);
          $img.hide();
          $img.next().text('No Track Artwork').removeAttr('style');

          if (music.artwork) {
            $img.on('load', function () {
              $img.next().hide();
              $img.removeAttr('style');
            });
            $img.attr('src', music.artwork);
          }

          $music.removeAttr('style');
          $download.attr('class', 'load');
          (_socket = socket) === null || _socket === void 0 ? void 0 : _socket.close();
          socket = new WebSocket("".concat(document.URL.replace(/http/, 'ws'), "/").concat(music.buzzyId));
          socket.addEventListener('message', function (e) {
            if (e.data == 'ready') {
              $loader.removeClass('load');
              $download.removeAttr('style');
              $download.find('a').attr('href', "/d/".concat(music.buzzyId));
              $download.attr('class', 'ready');
            }

            if (e.data == 'error') {
              $download.attr('class', 'error');
            }
          });
          _context.next = 45;
          break;

        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](10);

          if (!(_context.t0 instanceof DOMException)) {
            _context.next = 44;
            break;
          }

          return _context.abrupt("return");

        case 44:
          error('Something went wrong');

        case 45:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[10, 40]]);
})));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9idXp6eS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2J1enp5Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2J1enp5Ly4vbm9kZV9tb2R1bGVzL2Nhc2gtZG9tL2Rpc3QvY2FzaC5qcyIsIndlYnBhY2s6Ly9idXp6eS8uL2Fzc2V0cy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly9idXp6eS8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1enp5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idXp6eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1enp5L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2J1enp5Ly4vYXNzZXRzL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvbnRyb2xsZXIiLCJzb2NrZXQiLCIkIiwib24iLCJlIiwia2V5IiwidHJpZ2dlciIsImFib3J0IiwiQWJvcnRDb250cm9sbGVyIiwiJG11c2ljIiwiaGlkZSIsIiRkb3dubG9hZCIsImF0dHIiLCIkbWVzc2FnZSIsIiRsb2FkZXIiLCJhZGRDbGFzcyIsImVycm9yIiwibXNnIiwidGV4dCIsInNob3ciLCJyZW1vdmVDbGFzcyIsInVybCIsInZhbCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJoZWFkZXJzIiwic2lnbmFsIiwicmVzIiwianNvbiIsIm9rIiwibXVzaWMiLCIkaW1nIiwiY2hpbGRyZW4iLCJmaXJzdCIsIiRpbmZvIiwibGFzdCIsImZpbmQiLCJnZW5yZSIsInRpdGxlIiwiYXJ0aXN0IiwiYWxidW0iLCJ5ZWFyIiwibmV4dCIsInJlbW92ZUF0dHIiLCJhcnR3b3JrIiwiY2xvc2UiLCJXZWJTb2NrZXQiLCJkb2N1bWVudCIsIlVSTCIsInJlcGxhY2UiLCJidXp6eUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRhdGEiLCJET01FeGNlcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQzs7Ozs7Ozs7OztBQ2xDQSxnSEFBK0M7Ozs7Ozs7Ozs7O0FDQS9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOzs7QUFHRjtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLE9BQU87QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRUFBRTtBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw2RUFBNkU7O0FBRTdFO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGOztBQUV2RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOztBQUV0Qzs7QUFFQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLElBQUksSUFBOEI7QUFDbEM7QUFDQTtBQUNBLENBQUMsTUFBTSxFQUdOO0FBQ0QsQ0FBQyxJOzs7Ozs7Ozs7Ozs7Ozs7QUM3MUNELGlFQUFlLHFCQUF1QixlQUFlLEU7Ozs7Ozs7Ozs7QUNBckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM3VCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFFQSxJQUFJQSxVQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUVBQywrQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxFQUFWLENBQWEsT0FBYixFQUFzQixVQUFBQyxDQUFDLEVBQUk7QUFDdkIsTUFBSUEsQ0FBQyxDQUFDQyxHQUFGLElBQVMsT0FBYixFQUFzQkgsK0NBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYUksT0FBYixDQUFxQixPQUFyQjtBQUN6QixDQUZEO0FBR0FKLCtDQUFDLENBQUMsU0FBRCxDQUFELENBQWFDLEVBQWIsQ0FBZ0IsT0FBaEIscUxBQXlCO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDckIseUJBQUFILFVBQVUsVUFBVixrREFBWU8sS0FBWjtBQUNBUCxvQkFBVSxHQUFHLElBQUlRLGVBQUosRUFBYjtBQUVNQyxnQkFKZSxHQUlOUCwrQ0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZUSxJQUFaLEVBSk07QUFLZkMsbUJBTGUsR0FLSFQsK0NBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZVUsSUFBZixDQUFvQixPQUFwQixFQUE2QixNQUE3QixDQUxHO0FBTWZDLGtCQU5lLEdBTUpYLCtDQUFDLENBQUMsVUFBRCxDQUFELENBQWNRLElBQWQsRUFOSTtBQU9mSSxpQkFQZSxHQU9MWiwrQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhYSxRQUFiLENBQXNCLE1BQXRCLENBUEs7O0FBU2ZDLGVBVGUsR0FTUCxTQUFSQSxLQUFRLENBQUFDLEdBQUcsRUFBSTtBQUNqQkosb0JBQVEsQ0FBQ0ssSUFBVCxDQUFjRCxHQUFkLEVBQW1CRSxJQUFuQjtBQUNBTCxtQkFBTyxDQUFDTSxXQUFSLENBQW9CLE1BQXBCO0FBQ0gsV0Fab0I7O0FBYWZDLGFBYmUsR0FhVG5CLCtDQUFDLENBQUMsTUFBRCxDQUFELENBQVVvQixHQUFWLEVBYlM7O0FBQUEsY0FlaEJELEdBZmdCO0FBQUE7QUFBQTtBQUFBOztBQUFBLDJDQWVKTCxLQUFLLENBQUMsd0JBQUQsQ0FmRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFrQkNPLEtBQUssQ0FBQyxNQUFELEVBQVM7QUFDNUJDLGtCQUFNLEVBQUUsTUFEb0I7QUFFNUJDLGdCQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQUVOLGlCQUFHLEVBQUhBO0FBQUYsYUFBZixDQUZzQjtBQUc1Qk8sbUJBQU8sRUFBRTtBQUFFLDhCQUFnQjtBQUFsQixhQUhtQjtBQUk1QkMsa0JBQU0sRUFBRTdCLFVBQVUsQ0FBQzZCO0FBSlMsV0FBVCxDQWxCTjs7QUFBQTtBQWtCWEMsYUFsQlc7QUFBQTtBQUFBLGlCQXdCRUEsR0FBRyxDQUFDQyxJQUFKLEVBeEJGOztBQUFBO0FBd0JYTixjQXhCVzs7QUFBQSxjQXlCWkssR0FBRyxDQUFDRSxFQXpCUTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxjQTBCUlAsSUFBSSxDQUFDUixHQTFCRztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkEwQlFRLElBMUJSOztBQUFBO0FBQUEsMkNBMkJOVCxLQUFLLENBQUNTLElBQUksQ0FBQ1IsR0FBTixDQTNCQzs7QUFBQTtBQUFBLGNBNkJaUSxJQUFJLENBQUNRLEtBN0JPO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQTZCTVIsSUE3Qk47O0FBQUE7QUErQlhRLGVBL0JXLEdBK0JIUixJQUFJLENBQUNRLEtBL0JGO0FBZ0NYQyxjQWhDVyxHQWdDSnpCLE1BQU0sQ0FBQzBCLFFBQVAsR0FBa0JDLEtBQWxCLEdBQTBCRCxRQUExQixHQUFxQ0MsS0FBckMsRUFoQ0k7QUFpQ1hDLGVBakNXLEdBaUNINUIsTUFBTSxDQUFDMEIsUUFBUCxHQUFrQkcsSUFBbEIsRUFqQ0c7QUFtQ2pCRCxlQUFLLENBQUNFLElBQU4sQ0FBVyxRQUFYLEVBQXFCckIsSUFBckIsWUFBOEJlLEtBQUssQ0FBQ08sS0FBTixJQUFlLFNBQTdDO0FBQ0FILGVBQUssQ0FBQ0UsSUFBTixDQUFXLFFBQVgsRUFBcUJyQixJQUFyQixDQUEwQmUsS0FBSyxDQUFDUSxLQUFoQztBQUNBSixlQUFLLENBQUNFLElBQU4sQ0FBVyxTQUFYLEVBQXNCckIsSUFBdEIsV0FBOEJlLEtBQUssQ0FBQ1MsTUFBTixJQUFnQixnQkFBOUMscUJBQW9FVCxLQUFLLENBQUNVLEtBQU4sSUFBZSxlQUFuRjtBQUNBTixlQUFLLENBQUNFLElBQU4sQ0FBVyxPQUFYLEVBQW9CckIsSUFBcEIsQ0FBeUJlLEtBQUssQ0FBQ1csSUFBL0I7QUFFQVYsY0FBSSxDQUFDeEIsSUFBTDtBQUNBd0IsY0FBSSxDQUFDVyxJQUFMLEdBQVkzQixJQUFaLENBQWlCLGtCQUFqQixFQUFxQzRCLFVBQXJDLENBQWdELE9BQWhEOztBQUNBLGNBQUliLEtBQUssQ0FBQ2MsT0FBVixFQUFtQjtBQUNmYixnQkFBSSxDQUFDL0IsRUFBTCxDQUFRLE1BQVIsRUFBZ0IsWUFBTTtBQUNsQitCLGtCQUFJLENBQUNXLElBQUwsR0FBWW5DLElBQVo7QUFDQXdCLGtCQUFJLENBQUNZLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDSCxhQUhEO0FBSUFaLGdCQUFJLENBQUN0QixJQUFMLENBQVUsS0FBVixFQUFpQnFCLEtBQUssQ0FBQ2MsT0FBdkI7QUFDSDs7QUFFRHRDLGdCQUFNLENBQUNxQyxVQUFQLENBQWtCLE9BQWxCO0FBQ0FuQyxtQkFBUyxDQUFDQyxJQUFWLENBQWUsT0FBZixFQUF3QixNQUF4QjtBQUVBLHFCQUFBWCxNQUFNLFVBQU4sMENBQVErQyxLQUFSO0FBQ0EvQyxnQkFBTSxHQUFHLElBQUlnRCxTQUFKLFdBQWlCQyxRQUFRLENBQUNDLEdBQVQsQ0FBYUMsT0FBYixDQUFxQixNQUFyQixFQUE2QixJQUE3QixDQUFqQixjQUF1RG5CLEtBQUssQ0FBQ29CLE9BQTdELEVBQVQ7QUFDQXBELGdCQUFNLENBQUNxRCxnQkFBUCxDQUF3QixTQUF4QixFQUFtQyxVQUFBbEQsQ0FBQyxFQUFJO0FBQ3BDLGdCQUFJQSxDQUFDLENBQUNtRCxJQUFGLElBQVUsT0FBZCxFQUF1QjtBQUNuQnpDLHFCQUFPLENBQUNNLFdBQVIsQ0FBb0IsTUFBcEI7QUFDQVQsdUJBQVMsQ0FBQ21DLFVBQVYsQ0FBcUIsT0FBckI7QUFDQW5DLHVCQUFTLENBQUM0QixJQUFWLENBQWUsR0FBZixFQUFvQjNCLElBQXBCLENBQXlCLE1BQXpCLGVBQXVDcUIsS0FBSyxDQUFDb0IsT0FBN0M7QUFDQTFDLHVCQUFTLENBQUNDLElBQVYsQ0FBZSxPQUFmLEVBQXdCLE9BQXhCO0FBQ0g7O0FBQ0QsZ0JBQUlSLENBQUMsQ0FBQ21ELElBQUYsSUFBVSxPQUFkLEVBQXVCO0FBQ25CNUMsdUJBQVMsQ0FBQ0MsSUFBVixDQUFlLE9BQWYsRUFBd0IsT0FBeEI7QUFDSDtBQUNKLFdBVkQ7QUF2RGlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQW1FYix1QkFBYTRDLFlBbkVBO0FBQUE7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBb0VqQnhDLGVBQUssQ0FBQyxzQkFBRCxDQUFMOztBQXBFaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsQ0FBekIsSSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiLyogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWJpb3NwYW1waW5hdG8vY2FzaCAqL1xuKGZ1bmN0aW9uKCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3BNYXAgPSB7XG4gIC8qIEdFTkVSQUwgKi9cbiAgXCJjbGFzc1wiOiAnY2xhc3NOYW1lJyxcbiAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcblxuICAvKiBMQUJFTCAqL1xuICBcImZvclwiOiAnaHRtbEZvcicsXG5cbiAgLyogSU5QVVQgKi9cbiAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gIG1heGxlbmd0aDogJ21heExlbmd0aCcsXG4gIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuXG4gIC8qIFRBQkxFICovXG4gIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuXG4gIC8qIElNQUdFICovXG4gIHVzZW1hcDogJ3VzZU1hcCdcbn07XG5cbmZ1bmN0aW9uIGF0dGVtcHQoZm4sIGFyZykge1xuICB0cnkge1xuICAgIHJldHVybiBmbihhcmcpO1xuICB9IGNhdGNoIChfYSkge1xuICAgIHJldHVybiBhcmc7XG4gIH1cbn1cblxudmFyIGRvYyA9IGRvY3VtZW50LFxuICAgIHdpbiA9IHdpbmRvdyxcbiAgICBkb2NFbGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudC5iaW5kKGRvYyksXG4gICAgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgdGFibGUgPSBjcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgIHRib2R5ID0gY3JlYXRlRWxlbWVudCgndGJvZHknKSxcbiAgICB0ciA9IGNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGUsXG4gICAgY29uY2F0ID0gQXJyYXlQcm90b3R5cGUuY29uY2F0LFxuICAgIGZpbHRlciA9IEFycmF5UHJvdG90eXBlLmZpbHRlcixcbiAgICBpbmRleE9mID0gQXJyYXlQcm90b3R5cGUuaW5kZXhPZixcbiAgICBtYXAgPSBBcnJheVByb3RvdHlwZS5tYXAsXG4gICAgcHVzaCA9IEFycmF5UHJvdG90eXBlLnB1c2gsXG4gICAgc2xpY2UgPSBBcnJheVByb3RvdHlwZS5zbGljZSxcbiAgICBzb21lID0gQXJyYXlQcm90b3R5cGUuc29tZSxcbiAgICBzcGxpY2UgPSBBcnJheVByb3RvdHlwZS5zcGxpY2U7XG52YXIgaWRSZSA9IC9eIyg/OltcXHctXXxcXFxcLnxbXlxceDAwLVxceGEwXSkqJC8sXG4gICAgY2xhc3NSZSA9IC9eXFwuKD86W1xcdy1dfFxcXFwufFteXFx4MDAtXFx4YTBdKSokLyxcbiAgICBodG1sUmUgPSAvPC4rPi8sXG4gICAgdGFnUmUgPSAvXlxcdyskLzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICByZXR1cm4gIXNlbGVjdG9yIHx8ICFpc0RvY3VtZW50KGNvbnRleHQpICYmICFpc0VsZW1lbnQoY29udGV4dCkgPyBbXSA6IGNsYXNzUmUudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc2xpY2UoMSkpIDogdGFnUmUudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSA6IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59IC8vIEByZXF1aXJlIC4vZmluZC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG52YXIgQ2FzaCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENhc2goc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIXNlbGVjdG9yKSByZXR1cm47XG4gICAgaWYgKGlzQ2FzaChzZWxlY3RvcikpIHJldHVybiBzZWxlY3RvcjtcbiAgICB2YXIgZWxlcyA9IHNlbGVjdG9yO1xuXG4gICAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgICAgdmFyIGN0eCA9IChpc0Nhc2goY29udGV4dCkgPyBjb250ZXh0WzBdIDogY29udGV4dCkgfHwgZG9jO1xuICAgICAgZWxlcyA9IGlkUmUudGVzdChzZWxlY3RvcikgPyBjdHguZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpIDogaHRtbFJlLnRlc3Qoc2VsZWN0b3IpID8gcGFyc2VIVE1MKHNlbGVjdG9yKSA6IGZpbmQoc2VsZWN0b3IsIGN0eCk7XG4gICAgICBpZiAoIWVsZXMpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWFkeShzZWxlY3Rvcik7IC8vRklYTUU6IGBmbi5yZWFkeWAgaXMgbm90IGluY2x1ZGVkIGluIGBjb3JlYCwgYnV0IGl0J3MgYWN0dWFsbHkgYSBjb3JlIGZ1bmN0aW9uYWxpdHlcbiAgICB9XG5cbiAgICBpZiAoZWxlcy5ub2RlVHlwZSB8fCBlbGVzID09PSB3aW4pIGVsZXMgPSBbZWxlc107XG4gICAgdGhpcy5sZW5ndGggPSBlbGVzLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXNbaV0gPSBlbGVzW2ldO1xuICAgIH1cbiAgfVxuXG4gIENhc2gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IENhc2goc2VsZWN0b3IsIGNvbnRleHQpO1xuICB9O1xuXG4gIHJldHVybiBDYXNoO1xufSgpO1xuXG52YXIgZm4gPSBDYXNoLnByb3RvdHlwZSxcbiAgICBjYXNoID0gZm4uaW5pdDtcbmNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IGZuOyAvLyBFbnN1cmluZyB0aGF0IGBjYXNoICgpIGluc3RhbmNlb2YgY2FzaGBcblxuZm4ubGVuZ3RoID0gMDtcbmZuLnNwbGljZSA9IHNwbGljZTsgLy8gRW5zdXJpbmcgYSBjYXNoIGNvbGxlY3Rpb24gZ2V0cyBwcmludGVkIGFzIGFycmF5LWxpa2UgaW4gQ2hyb21lJ3MgZGV2dG9vbHNcblxuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gRW5zdXJpbmcgYSBjYXNoIGNvbGxlY3Rpb24gaXMgaXRlcmFibGVcbiAgZm5bU3ltYm9sWydpdGVyYXRvciddXSA9IEFycmF5UHJvdG90eXBlW1N5bWJvbFsnaXRlcmF0b3InXV07XG59XG5cbmZuLm1hcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FzaChjb25jYXQuYXBwbHkoW10sIG1hcC5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pKSk7XG59O1xuXG5mbi5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHJldHVybiBjYXNoKHNsaWNlLmNhbGwodGhpcywgc3RhcnQsIGVuZCkpO1xufTsgLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG5cblxudmFyIGRhc2hBbHBoYVJlID0gLy0oW2Etel0pL2c7XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGRhc2hBbHBoYVJlLCBmdW5jdGlvbiAobWF0Y2gsIGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cbmNhc2guZ3VpZCA9IDE7IC8vIEByZXF1aXJlIC4vY2FzaC50c1xuXG5mdW5jdGlvbiBtYXRjaGVzKGVsZSwgc2VsZWN0b3IpIHtcbiAgdmFyIG1hdGNoZXMgPSBlbGUgJiYgKGVsZVsnbWF0Y2hlcyddIHx8IGVsZVsnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJ10gfHwgZWxlWydtc01hdGNoZXNTZWxlY3RvciddKTtcbiAgcmV0dXJuICEhbWF0Y2hlcyAmJiAhIXNlbGVjdG9yICYmIG1hdGNoZXMuY2FsbChlbGUsIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gaXNDYXNoKHgpIHtcbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBDYXNoO1xufVxuXG5mdW5jdGlvbiBpc1dpbmRvdyh4KSB7XG4gIHJldHVybiAhIXggJiYgeCA9PT0geC53aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGlzRG9jdW1lbnQoeCkge1xuICByZXR1cm4gISF4ICYmIHgubm9kZVR5cGUgPT09IDk7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XG4gIHJldHVybiAhIXggJiYgeC5ub2RlVHlwZSA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoeCkge1xuICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc051bGwoeCkge1xuICByZXR1cm4geCA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKHgpIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHgpKSAmJiBpc0Zpbml0ZSh4KTtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh4KSB7XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgeCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoeCk7XG4gIHJldHVybiBwcm90byA9PT0gbnVsbCB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuY2FzaC5pc1dpbmRvdyA9IGlzV2luZG93O1xuY2FzaC5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbmNhc2guaXNBcnJheSA9IGlzQXJyYXk7XG5jYXNoLmlzTnVtZXJpYyA9IGlzTnVtZXJpYztcbmNhc2guaXNQbGFpbk9iamVjdCA9IGlzUGxhaW5PYmplY3Q7XG5cbmZuLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICBpZiAoaXNVbmRlZmluZWQoaW5kZXgpKSByZXR1cm4gc2xpY2UuY2FsbCh0aGlzKTtcbiAgaW5kZXggPSBOdW1iZXIoaW5kZXgpO1xuICByZXR1cm4gdGhpc1tpbmRleCA8IDAgPyBpbmRleCArIHRoaXMubGVuZ3RoIDogaW5kZXhdO1xufTtcblxuZm4uZXEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgcmV0dXJuIGNhc2godGhpcy5nZXQoaW5kZXgpKTtcbn07XG5cbmZuLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lcSgwKTtcbn07XG5cbmZuLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVxKC0xKTtcbn07XG5cbmZ1bmN0aW9uIGVhY2goYXJyLCBjYWxsYmFjaywgX3JldmVyc2UpIHtcbiAgaWYgKF9yZXZlcnNlKSB7XG4gICAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoYXJyW2ldLCBpLCBhcnJbaV0pID09PSBmYWxzZSkgcmV0dXJuIGFycjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcnIpKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChhcnJba2V5XSwga2V5LCBhcnJba2V5XSkgPT09IGZhbHNlKSByZXR1cm4gYXJyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltpXSwgaSwgYXJyW2ldKSA9PT0gZmFsc2UpIHJldHVybiBhcnI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuY2FzaC5lYWNoID0gZWFjaDtcblxuZm4uZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gZWFjaCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5mbi5wcm9wID0gZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gIGlmICghcHJvcCkgcmV0dXJuO1xuXG4gIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgIHByb3AgPSBwcm9wTWFwW3Byb3BdIHx8IHByb3A7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdW3Byb3BdO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgZWxlW3Byb3BdID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMucHJvcChrZXksIHByb3Bba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnJlbW92ZVByb3AgPSBmdW5jdGlvbiAocHJvcCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBkZWxldGUgZWxlW3Byb3BNYXBbcHJvcF0gfHwgcHJvcF07XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICB2YXIgc291cmNlcyA9IFtdO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICB9XG5cbiAgdmFyIGRlZXAgPSBpc0Jvb2xlYW4oc291cmNlc1swXSkgPyBzb3VyY2VzLnNoaWZ0KCkgOiBmYWxzZSxcbiAgICAgIHRhcmdldCA9IHNvdXJjZXMuc2hpZnQoKSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuIHt9O1xuICBpZiAoIWxlbmd0aCkgcmV0dXJuIGV4dGVuZChkZWVwLCBjYXNoLCB0YXJnZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gc291cmNlc1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChkZWVwICYmIChpc0FycmF5KHNvdXJjZVtrZXldKSB8fCBpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSkpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XS5jb25zdHJ1Y3RvciAhPT0gc291cmNlW2tleV0uY29uc3RydWN0b3IpIHRhcmdldFtrZXldID0gbmV3IHNvdXJjZVtrZXldLmNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGV4dGVuZChkZWVwLCB0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jYXNoLmV4dGVuZCA9IGV4dGVuZDtcblxuZm4uZXh0ZW5kID0gZnVuY3Rpb24gKHBsdWdpbnMpIHtcbiAgcmV0dXJuIGV4dGVuZChmbiwgcGx1Z2lucyk7XG59OyAvLyBAcmVxdWlyZSAuL21hdGNoZXMudHNcbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuXG5cbmZ1bmN0aW9uIGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gIHJldHVybiBpc1N0cmluZyhjb21wYXJhdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gbWF0Y2hlcyhlbGUsIGNvbXBhcmF0b3IpO1xuICB9IDogaXNGdW5jdGlvbihjb21wYXJhdG9yKSA/IGNvbXBhcmF0b3IgOiBpc0Nhc2goY29tcGFyYXRvcikgPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IuaXMoZWxlKTtcbiAgfSA6ICFjb21wYXJhdG9yID8gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSA6IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZWxlID09PSBjb21wYXJhdG9yO1xuICB9O1xufVxuXG5mbi5maWx0ZXIgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIGNhc2goZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KSk7XG59OyAvLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci50c1xuXG5cbmZ1bmN0aW9uIGZpbHRlcmVkKGNvbGxlY3Rpb24sIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuICFjb21wYXJhdG9yID8gY29sbGVjdGlvbiA6IGNvbGxlY3Rpb24uZmlsdGVyKGNvbXBhcmF0b3IpO1xufSAvLyBAcmVxdWlyZSAuL3R5cGVfY2hlY2tpbmcudHNcblxuXG52YXIgc3BsaXRWYWx1ZXNSZSA9IC9cXFMrL2c7XG5cbmZ1bmN0aW9uIGdldFNwbGl0VmFsdWVzKHN0cikge1xuICByZXR1cm4gaXNTdHJpbmcoc3RyKSA/IHN0ci5tYXRjaChzcGxpdFZhbHVlc1JlKSB8fCBbXSA6IFtdO1xufVxuXG5mbi5oYXNDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgcmV0dXJuICEhY2xzICYmIHNvbWUuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGlzRWxlbWVudChlbGUpICYmIGVsZS5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTtcbiAgfSk7XG59O1xuXG5mbi5yZW1vdmVBdHRyID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgdmFyIGF0dHJzID0gZ2V0U3BsaXRWYWx1ZXMoYXR0cik7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoaSwgYSkge1xuICAgICAgZWxlLnJlbW92ZUF0dHJpYnV0ZShhKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBhdHRyKGF0dHIsIHZhbHVlKSB7XG4gIGlmICghYXR0cikgcmV0dXJuO1xuXG4gIGlmIChpc1N0cmluZyhhdHRyKSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgaWYgKCF0aGlzWzBdIHx8ICFpc0VsZW1lbnQodGhpc1swXSkpIHJldHVybjtcbiAgICAgIHZhciB2YWx1ZV8xID0gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cik7XG4gICAgICByZXR1cm4gaXNOdWxsKHZhbHVlXzEpID8gdW5kZWZpbmVkIDogdmFsdWVfMTtcbiAgICB9XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm4gdGhpcztcbiAgICBpZiAoaXNOdWxsKHZhbHVlKSkgcmV0dXJuIHRoaXMucmVtb3ZlQXR0cihhdHRyKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGF0dHIpIHtcbiAgICB0aGlzLmF0dHIoa2V5LCBhdHRyW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZuLmF0dHIgPSBhdHRyO1xuXG5mbi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbHMsIGZvcmNlKSB7XG4gIHZhciBjbGFzc2VzID0gZ2V0U3BsaXRWYWx1ZXMoY2xzKSxcbiAgICAgIGlzRm9yY2UgPSAhaXNVbmRlZmluZWQoZm9yY2UpO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWFjaChjbGFzc2VzLCBmdW5jdGlvbiAoaSwgYykge1xuICAgICAgaWYgKGlzRm9yY2UpIHtcbiAgICAgICAgZm9yY2UgPyBlbGUuY2xhc3NMaXN0LmFkZChjKSA6IGVsZS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLmNsYXNzTGlzdC50b2dnbGUoYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZm4uYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgdHJ1ZSk7XG59O1xuXG5mbi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgZmFsc2UpO1xuICByZXR1cm4gdGhpcy5hdHRyKCdjbGFzcycsICcnKTtcbn07XG5cbmZ1bmN0aW9uIHBsdWNrKGFyciwgcHJvcCwgZGVlcCwgdW50aWwpIHtcbiAgdmFyIHBsdWNrZWQgPSBbXSxcbiAgICAgIGlzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKHByb3ApLFxuICAgICAgY29tcGFyZSA9IHVudGlsICYmIGdldENvbXBhcmVGdW5jdGlvbih1bnRpbCk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGlzQ2FsbGJhY2spIHtcbiAgICAgIHZhciB2YWxfMSA9IHByb3AoYXJyW2ldKTtcbiAgICAgIGlmICh2YWxfMS5sZW5ndGgpIHB1c2guYXBwbHkocGx1Y2tlZCwgdmFsXzEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmFsXzIgPSBhcnJbaV1bcHJvcF07XG5cbiAgICAgIHdoaWxlICh2YWxfMiAhPSBudWxsKSB7XG4gICAgICAgIGlmICh1bnRpbCAmJiBjb21wYXJlKC0xLCB2YWxfMikpIGJyZWFrO1xuICAgICAgICBwbHVja2VkLnB1c2godmFsXzIpO1xuICAgICAgICB2YWxfMiA9IGRlZXAgPyB2YWxfMltwcm9wXSA6IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWNrZWQ7XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgcmV0dXJuIGFyci5sZW5ndGggPiAxID8gZmlsdGVyLmNhbGwoYXJyLCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICByZXR1cm4gaW5kZXhPZi5jYWxsKHNlbGYsIGl0ZW0pID09PSBpbmRleDtcbiAgfSkgOiBhcnI7XG59XG5cbmNhc2gudW5pcXVlID0gdW5pcXVlO1xuXG5mbi5hZGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHRoaXMuZ2V0KCkuY29uY2F0KGNhc2goc2VsZWN0b3IsIGNvbnRleHQpLmdldCgpKSkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZShlbGUsIHByb3AsIGlzVmFyaWFibGUpIHtcbiAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICB2YXIgc3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGUsIG51bGwpO1xuICByZXR1cm4gaXNWYXJpYWJsZSA/IHN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgfHwgdW5kZWZpbmVkIDogc3R5bGVbcHJvcF0gfHwgZWxlLnN0eWxlW3Byb3BdO1xufSAvLyBAcmVxdWlyZSAuL2NvbXB1dGVfc3R5bGUudHNcblxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVJbnQoZWxlLCBwcm9wKSB7XG4gIHJldHVybiBwYXJzZUludChjb21wdXRlU3R5bGUoZWxlLCBwcm9wKSwgMTApIHx8IDA7XG59XG5cbnZhciBjc3NWYXJpYWJsZVJlID0gL14tLS87IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cbmZ1bmN0aW9uIGlzQ1NTVmFyaWFibGUocHJvcCkge1xuICByZXR1cm4gY3NzVmFyaWFibGVSZS50ZXN0KHByb3ApO1xufSAvLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FzaC50c1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcblxuXG52YXIgcHJlZml4ZWRQcm9wcyA9IHt9LFxuICAgIHN0eWxlID0gZGl2LnN0eWxlLFxuICAgIHZlbmRvcnNQcmVmaXhlcyA9IFsnd2Via2l0JywgJ21veicsICdtcyddO1xuXG5mdW5jdGlvbiBnZXRQcmVmaXhlZFByb3AocHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoaXNWYXJpYWJsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNWYXJpYWJsZSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gIH1cblxuICBpZiAoaXNWYXJpYWJsZSkgcmV0dXJuIHByb3A7XG5cbiAgaWYgKCFwcmVmaXhlZFByb3BzW3Byb3BdKSB7XG4gICAgdmFyIHByb3BDQyA9IGNhbWVsQ2FzZShwcm9wKSxcbiAgICAgICAgcHJvcFVDID0gXCJcIiArIHByb3BDQ1swXS50b1VwcGVyQ2FzZSgpICsgcHJvcENDLnNsaWNlKDEpLFxuICAgICAgICBwcm9wcyA9IChwcm9wQ0MgKyBcIiBcIiArIHZlbmRvcnNQcmVmaXhlcy5qb2luKHByb3BVQyArIFwiIFwiKSArIHByb3BVQykuc3BsaXQoJyAnKTtcbiAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoaSwgcCkge1xuICAgICAgaWYgKHAgaW4gc3R5bGUpIHtcbiAgICAgICAgcHJlZml4ZWRQcm9wc1twcm9wXSA9IHA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwcmVmaXhlZFByb3BzW3Byb3BdO1xufVxuXG47IC8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcblxudmFyIG51bWVyaWNQcm9wcyA9IHtcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFNocmluazogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgZ3JpZEFyZWE6IHRydWUsXG4gIGdyaWRDb2x1bW46IHRydWUsXG4gIGdyaWRDb2x1bW5FbmQ6IHRydWUsXG4gIGdyaWRDb2x1bW5TdGFydDogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZFJvd0VuZDogdHJ1ZSxcbiAgZ3JpZFJvd1N0YXJ0OiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWUsIGlzVmFyaWFibGUpIHtcbiAgaWYgKGlzVmFyaWFibGUgPT09IHZvaWQgMCkge1xuICAgIGlzVmFyaWFibGUgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICB9XG5cbiAgcmV0dXJuICFpc1ZhcmlhYmxlICYmICFudW1lcmljUHJvcHNbcHJvcF0gJiYgaXNOdW1lcmljKHZhbHVlKSA/IHZhbHVlICsgXCJweFwiIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNzcyhwcm9wLCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICB2YXIgaXNWYXJpYWJsZV8xID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgICBwcm9wID0gZ2V0UHJlZml4ZWRQcm9wKHByb3AsIGlzVmFyaWFibGVfMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiBjb21wdXRlU3R5bGUodGhpc1swXSwgcHJvcCwgaXNWYXJpYWJsZV8xKTtcbiAgICBpZiAoIXByb3ApIHJldHVybiB0aGlzO1xuICAgIHZhbHVlID0gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wLCB2YWx1ZSwgaXNWYXJpYWJsZV8xKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcblxuICAgICAgaWYgKGlzVmFyaWFibGVfMSkge1xuICAgICAgICBlbGUuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMuY3NzKGtleSwgcHJvcFtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG47XG5mbi5jc3MgPSBjc3M7IC8vIEBvcHRpb25hbCAuL2Nzcy50c1xuLy8gQHJlcXVpcmUgY29yZS9hdHRlbXB0LnRzXG4vLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcblxudmFyIEpTT05TdHJpbmdSZSA9IC9eXFxzK3xcXHMrJC87XG5cbmZ1bmN0aW9uIGdldERhdGEoZWxlLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZWxlLmRhdGFzZXRba2V5XSB8fCBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV07XG4gIGlmIChKU09OU3RyaW5nUmUudGVzdCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGF0dGVtcHQoSlNPTi5wYXJzZSwgdmFsdWUpO1xufSAvLyBAcmVxdWlyZSBjb3JlL2F0dGVtcHQudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuXG5cbmZ1bmN0aW9uIHNldERhdGEoZWxlLCBrZXksIHZhbHVlKSB7XG4gIHZhbHVlID0gYXR0ZW1wdChKU09OLnN0cmluZ2lmeSwgdmFsdWUpO1xuICBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGF0YShuYW1lLCB2YWx1ZSkge1xuICBpZiAoIW5hbWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybjtcbiAgICB2YXIgZGF0YXMgPSB7fTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzWzBdLmRhdGFzZXQpIHtcbiAgICAgIGRhdGFzW2tleV0gPSBnZXREYXRhKHRoaXNbMF0sIGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFzO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiBnZXREYXRhKHRoaXNbMF0sIG5hbWUpO1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiB0aGlzO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgc2V0RGF0YShlbGUsIG5hbWUsIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgdGhpcy5kYXRhKGtleSwgbmFtZVtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mbi5kYXRhID0gZGF0YTsgLy8gQG9wdGlvbmFsIC4vZGF0YS50c1xuXG5mdW5jdGlvbiBnZXREb2N1bWVudERpbWVuc2lvbihkb2MsIGRpbWVuc2lvbikge1xuICB2YXIgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgcmV0dXJuIE1hdGgubWF4KGRvYy5ib2R5W1wic2Nyb2xsXCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJzY3JvbGxcIiArIGRpbWVuc2lvbl0sIGRvYy5ib2R5W1wib2Zmc2V0XCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJvZmZzZXRcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcImNsaWVudFwiICsgZGltZW5zaW9uXSk7XG59IC8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGVfaW50LnRzXG5cblxuZnVuY3Rpb24gZ2V0RXh0cmFTcGFjZShlbGUsIHhBeGlzKSB7XG4gIHJldHVybiBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpICsgXCJXaWR0aFwiKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSkgKyBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSArIFwiV2lkdGhcIik7XG59XG5cbmVhY2goW3RydWUsIGZhbHNlXSwgZnVuY3Rpb24gKGksIG91dGVyKSB7XG4gIGVhY2goWydXaWR0aCcsICdIZWlnaHQnXSwgZnVuY3Rpb24gKGksIHByb3ApIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIgKyAob3V0ZXIgPyAnb3V0ZXInIDogJ2lubmVyJykgKyBwcm9wO1xuXG4gICAgZm5bbmFtZV0gPSBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgIGlmICghdGhpc1swXSkgcmV0dXJuO1xuICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKSByZXR1cm4gb3V0ZXIgPyB0aGlzWzBdW1wiaW5uZXJcIiArIHByb3BdIDogdGhpc1swXS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIHByb3BdO1xuICAgICAgaWYgKGlzRG9jdW1lbnQodGhpc1swXSkpIHJldHVybiBnZXREb2N1bWVudERpbWVuc2lvbih0aGlzWzBdLCBwcm9wKTtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wiXCIgKyAob3V0ZXIgPyAnb2Zmc2V0JyA6ICdjbGllbnQnKSArIHByb3BdICsgKGluY2x1ZGVNYXJnaW5zICYmIG91dGVyID8gY29tcHV0ZVN0eWxlSW50KHRoaXNbMF0sIFwibWFyZ2luXCIgKyAoaSA/ICdUb3AnIDogJ0xlZnQnKSkgKyBjb21wdXRlU3R5bGVJbnQodGhpc1swXSwgXCJtYXJnaW5cIiArIChpID8gJ0JvdHRvbScgOiAnUmlnaHQnKSkgOiAwKTtcbiAgICB9O1xuICB9KTtcbn0pO1xuZWFjaChbJ1dpZHRoJywgJ0hlaWdodCddLCBmdW5jdGlvbiAoaW5kZXgsIHByb3ApIHtcbiAgdmFyIHByb3BMQyA9IHByb3AudG9Mb3dlckNhc2UoKTtcblxuICBmbltwcm9wTENdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzWzBdKSByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpID8gdW5kZWZpbmVkIDogdGhpcztcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKSByZXR1cm4gdGhpc1swXS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIHByb3BdO1xuICAgICAgaWYgKGlzRG9jdW1lbnQodGhpc1swXSkpIHJldHVybiBnZXREb2N1bWVudERpbWVuc2lvbih0aGlzWzBdLCBwcm9wKTtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3Byb3BMQ10gLSBnZXRFeHRyYVNwYWNlKHRoaXNbMF0sICFpbmRleCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICAgIHZhciBib3hTaXppbmcgPSBjb21wdXRlU3R5bGUoZWxlLCAnYm94U2l6aW5nJyk7XG4gICAgICBlbGUuc3R5bGVbcHJvcExDXSA9IGdldFN1ZmZpeGVkVmFsdWUocHJvcExDLCB2YWx1ZU51bWJlciArIChib3hTaXppbmcgPT09ICdib3JkZXItYm94JyA/IGdldEV4dHJhU3BhY2UoZWxlLCAhaW5kZXgpIDogMCkpO1xuICAgIH0pO1xuICB9O1xufSk7IC8vIEBvcHRpb25hbCAuL2lubmVyX291dGVyLnRzXG4vLyBAb3B0aW9uYWwgLi9ub3JtYWwudHNcbi8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGUudHNcblxudmFyIGRlZmF1bHREaXNwbGF5ID0ge307XG5cbmZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KHRhZ05hbWUpIHtcbiAgaWYgKGRlZmF1bHREaXNwbGF5W3RhZ05hbWVdKSByZXR1cm4gZGVmYXVsdERpc3BsYXlbdGFnTmFtZV07XG4gIHZhciBlbGUgPSBjcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBkb2MuYm9keS5pbnNlcnRCZWZvcmUoZWxlLCBudWxsKTtcbiAgdmFyIGRpc3BsYXkgPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICBkb2MuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICByZXR1cm4gZGVmYXVsdERpc3BsYXlbdGFnTmFtZV0gPSBkaXNwbGF5ICE9PSAnbm9uZScgPyBkaXNwbGF5IDogJ2Jsb2NrJztcbn0gLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS50c1xuXG5cbmZ1bmN0aW9uIGlzSGlkZGVuKGVsZSkge1xuICByZXR1cm4gY29tcHV0ZVN0eWxlKGVsZSwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnO1xufVxuXG52YXIgZGlzcGxheVByb3BlcnR5ID0gJ19fX2NkJztcblxuZm4udG9nZ2xlID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICB2YXIgc2hvdyA9IGlzVW5kZWZpbmVkKGZvcmNlKSA/IGlzSGlkZGVuKGVsZSkgOiBmb3JjZTtcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGVsZVtkaXNwbGF5UHJvcGVydHldIHx8ICcnO1xuXG4gICAgICBpZiAoaXNIaWRkZW4oZWxlKSkge1xuICAgICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGdldERlZmF1bHREaXNwbGF5KGVsZS50YWdOYW1lKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlW2Rpc3BsYXlQcm9wZXJ0eV0gPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICAgICAgZWxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn07XG5cbmZuLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZShmYWxzZSk7XG59O1xuXG5mbi5zaG93ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSk7XG59OyAvLyBAb3B0aW9uYWwgLi9oaWRlLnRzXG4vLyBAb3B0aW9uYWwgLi9zaG93LnRzXG4vLyBAb3B0aW9uYWwgLi90b2dnbGUudHNcblxuXG5mdW5jdGlvbiBoYXNOYW1lc3BhY2VzKG5zMSwgbnMyKSB7XG4gIHJldHVybiAhbnMyIHx8ICFzb21lLmNhbGwobnMyLCBmdW5jdGlvbiAobnMpIHtcbiAgICByZXR1cm4gbnMxLmluZGV4T2YobnMpIDwgMDtcbiAgfSk7XG59XG5cbnZhciBldmVudHNOYW1lc3BhY2UgPSAnX19fY2UnLFxuICAgIGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IgPSAnLicsXG4gICAgZXZlbnRzRm9jdXMgPSB7XG4gIGZvY3VzOiAnZm9jdXNpbicsXG4gIGJsdXI6ICdmb2N1c291dCdcbn0sXG4gICAgZXZlbnRzSG92ZXIgPSB7XG4gIG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLFxuICBtb3VzZWxlYXZlOiAnbW91c2VvdXQnXG59LFxuICAgIGV2ZW50c01vdXNlUmUgPSAvXihtb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcHxjbGlja3xkYmxjbGljaykvaTsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZSkge1xuICByZXR1cm4gZXZlbnRzSG92ZXJbbmFtZV0gfHwgZXZlbnRzRm9jdXNbbmFtZV0gfHwgbmFtZTtcbn0gLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBnZXRFdmVudHNDYWNoZShlbGUpIHtcbiAgcmV0dXJuIGVsZVtldmVudHNOYW1lc3BhY2VdID0gZWxlW2V2ZW50c05hbWVzcGFjZV0gfHwge307XG59IC8vIEByZXF1aXJlIGNvcmUvZ3VpZC50c1xuLy8gQHJlcXVpcmUgZXZlbnRzL2hlbHBlcnMvZ2V0X2V2ZW50c19jYWNoZS50c1xuXG5cbmZ1bmN0aW9uIGFkZEV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBldmVudENhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcbiAgZXZlbnRDYWNoZVtuYW1lXSA9IGV2ZW50Q2FjaGVbbmFtZV0gfHwgW107XG4gIGV2ZW50Q2FjaGVbbmFtZV0ucHVzaChbbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrXSk7XG4gIGVsZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKTtcbn0gLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBwYXJzZUV2ZW50TmFtZShldmVudE5hbWUpIHtcbiAgdmFyIHBhcnRzID0gZXZlbnROYW1lLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpO1xuICByZXR1cm4gW3BhcnRzWzBdLCBwYXJ0cy5zbGljZSgxKS5zb3J0KCldOyAvLyBbbmFtZSwgbmFtZXNwYWNlW11dXG59IC8vIEByZXF1aXJlIC4vZ2V0X2V2ZW50c19jYWNoZS50c1xuLy8gQHJlcXVpcmUgLi9oYXNfbmFtZXNwYWNlcy50c1xuLy8gQHJlcXVpcmUgLi9wYXJzZV9ldmVudF9uYW1lLnRzXG5cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGNhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcblxuICBpZiAoIW5hbWUpIHtcbiAgICBmb3IgKG5hbWUgaW4gY2FjaGUpIHtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY2FjaGVbbmFtZV0pIHtcbiAgICBjYWNoZVtuYW1lXSA9IGNhY2hlW25hbWVdLmZpbHRlcihmdW5jdGlvbiAoX2EpIHtcbiAgICAgIHZhciBucyA9IF9hWzBdLFxuICAgICAgICAgIHNlbCA9IF9hWzFdLFxuICAgICAgICAgIGNiID0gX2FbMl07XG4gICAgICBpZiAoY2FsbGJhY2sgJiYgY2IuZ3VpZCAhPT0gY2FsbGJhY2suZ3VpZCB8fCAhaGFzTmFtZXNwYWNlcyhucywgbmFtZXNwYWNlcykgfHwgc2VsZWN0b3IgJiYgc2VsZWN0b3IgIT09IHNlbCkgcmV0dXJuIHRydWU7XG4gICAgICBlbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBjYik7XG4gICAgfSk7XG4gIH1cbn1cblxuZm4ub2ZmID0gZnVuY3Rpb24gKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmIChpc1VuZGVmaW5lZChldmVudEZ1bGxOYW1lKSkge1xuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub2ZmKGtleSwgZXZlbnRGdWxsTmFtZVtrZXldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9XG5cbiAgICBlYWNoKGdldFNwbGl0VmFsdWVzKGV2ZW50RnVsbE5hbWUpLCBmdW5jdGlvbiAoaSwgZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksXG4gICAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgICAgbmFtZXNwYWNlcyA9IF9hWzFdLFxuICAgICAgICAgIG5hbWUgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpO1xuXG4gICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSAmJiAhaXNEb2N1bWVudChlbGUpICYmICFpc1dpbmRvdyhlbGUpKSByZXR1cm47XG4gICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBvbihldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIF9vbmUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub24oa2V5LCBzZWxlY3RvciwgZGF0YSwgZXZlbnRGdWxsTmFtZVtrZXldLCBfb25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICghaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHNlbGVjdG9yKSB8fCBpc051bGwoc2VsZWN0b3IpKSB7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQoZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIGZ1bmN0aW9uIChpLCBldmVudEZ1bGxOYW1lKSB7XG4gICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksXG4gICAgICAgIG5hbWVPcmlnaW5hbCA9IF9hWzBdLFxuICAgICAgICBuYW1lc3BhY2VzID0gX2FbMV0sXG4gICAgICAgIG5hbWUgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpLFxuICAgICAgICBpc0V2ZW50SG92ZXIgPSBuYW1lT3JpZ2luYWwgaW4gZXZlbnRzSG92ZXIsXG4gICAgICAgIGlzRXZlbnRGb2N1cyA9IG5hbWVPcmlnaW5hbCBpbiBldmVudHNGb2N1cztcblxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xuXG4gICAgX3RoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcblxuICAgICAgdmFyIGZpbmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiBmaW5hbENhbGxiYWNrKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXRbXCJfX19pXCIgKyBldmVudC50eXBlXSkgcmV0dXJuIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpOyAvLyBJZ25vcmluZyBuYXRpdmUgZXZlbnQgaW4gZmF2b3Igb2YgdGhlIHVwY29taW5nIGN1c3RvbSBvbmVcblxuICAgICAgICBpZiAoZXZlbnQubmFtZXNwYWNlICYmICFoYXNOYW1lc3BhY2VzKG5hbWVzcGFjZXMsIGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKSkpIHJldHVybjtcbiAgICAgICAgaWYgKCFzZWxlY3RvciAmJiAoaXNFdmVudEZvY3VzICYmIChldmVudC50YXJnZXQgIT09IGVsZSB8fCBldmVudC5fX19vdCA9PT0gbmFtZSkgfHwgaXNFdmVudEhvdmVyICYmIGV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgZWxlLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSkgcmV0dXJuO1xuICAgICAgICB2YXIgdGhpc0FyZyA9IGVsZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgICAgd2hpbGUgKCFtYXRjaGVzKHRhcmdldCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzQXJnID0gdGFyZ2V0O1xuICAgICAgICAgIGV2ZW50Ll9fX2NkID0gdHJ1ZTsgLy8gRGVsZWdhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5fX19jZCkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2N1cnJlbnRUYXJnZXQnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdkYXRhJywge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZXZlbnQsIGV2ZW50Ll9fX3RkKTtcblxuICAgICAgICBpZiAoX29uZSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJldHVyblZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZpbmFsQ2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrLmd1aWQgPSBjYWxsYmFjay5ndWlkIHx8IGNhc2guZ3VpZCsrO1xuICAgICAgYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgZmluYWxDYWxsYmFjayk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn1cblxuZm4ub24gPSBvbjtcblxuZnVuY3Rpb24gb25lKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5vbihldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIHRydWUpO1xufVxuXG47XG5mbi5vbmUgPSBvbmU7XG5cbmZuLnJlYWR5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHZhciBjYiA9IGZ1bmN0aW9uIGNiKCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwLCBjYXNoKTtcbiAgfTtcblxuICBpZiAoZG9jLnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIGNiKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgaWYgKGlzU3RyaW5nKGV2ZW50KSkge1xuICAgIHZhciBfYSA9IHBhcnNlRXZlbnROYW1lKGV2ZW50KSxcbiAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgIG5hbWVzcGFjZXMgPSBfYVsxXSxcbiAgICAgICAgbmFtZV8xID0gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZU9yaWdpbmFsKTtcblxuICAgIGlmICghbmFtZV8xKSByZXR1cm4gdGhpcztcbiAgICB2YXIgdHlwZSA9IGV2ZW50c01vdXNlUmUudGVzdChuYW1lXzEpID8gJ01vdXNlRXZlbnRzJyA6ICdIVE1MRXZlbnRzJztcbiAgICBldmVudCA9IGRvYy5jcmVhdGVFdmVudCh0eXBlKTtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZV8xLCB0cnVlLCB0cnVlKTtcbiAgICBldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gICAgZXZlbnQuX19fb3QgPSBuYW1lT3JpZ2luYWw7XG4gIH1cblxuICBldmVudC5fX190ZCA9IGRhdGE7XG4gIHZhciBpc0V2ZW50Rm9jdXMgPSBldmVudC5fX19vdCBpbiBldmVudHNGb2N1cztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGlzRXZlbnRGb2N1cyAmJiBpc0Z1bmN0aW9uKGVsZVtldmVudC5fX19vdF0pKSB7XG4gICAgICBlbGVbXCJfX19pXCIgKyBldmVudC50eXBlXSA9IHRydWU7IC8vIEVuc3VyaW5nIHRoZSBuYXRpdmUgZXZlbnQgaXMgaWdub3JlZFxuXG4gICAgICBlbGVbZXZlbnQuX19fb3RdKCk7XG5cbiAgICAgIGVsZVtcIl9fX2lcIiArIGV2ZW50LnR5cGVdID0gZmFsc2U7IC8vIEVuc3VyaW5nIHRoZSBjdXN0b20gZXZlbnQgaXMgbm90IGlnbm9yZWRcbiAgICB9XG5cbiAgICBlbGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH0pO1xufTsgLy8gQG9wdGlvbmFsIC4vb2ZmLnRzXG4vLyBAb3B0aW9uYWwgLi9vbi50c1xuLy8gQG9wdGlvbmFsIC4vb25lLnRzXG4vLyBAb3B0aW9uYWwgLi9yZWFkeS50c1xuLy8gQG9wdGlvbmFsIC4vdHJpZ2dlci50c1xuLy8gQHJlcXVpcmUgY29yZS9wbHVjay50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBnZXRWYWx1ZShlbGUpIHtcbiAgaWYgKGVsZS5tdWx0aXBsZSAmJiBlbGUub3B0aW9ucykgcmV0dXJuIHBsdWNrKGZpbHRlci5jYWxsKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkICYmICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZDtcbiAgfSksICd2YWx1ZScpO1xuICByZXR1cm4gZWxlLnZhbHVlIHx8ICcnO1xufVxuXG52YXIgcXVlcnlFbmNvZGVTcGFjZVJlID0gLyUyMC9nLFxuICAgIHF1ZXJ5RW5jb2RlQ1JMRlJlID0gL1xccj9cXG4vZztcblxuZnVuY3Rpb24gcXVlcnlFbmNvZGUocHJvcCwgdmFsdWUpIHtcbiAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3ApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUucmVwbGFjZShxdWVyeUVuY29kZUNSTEZSZSwgJ1xcclxcbicpKS5yZXBsYWNlKHF1ZXJ5RW5jb2RlU3BhY2VSZSwgJysnKTtcbn1cblxudmFyIHNraXBwYWJsZVJlID0gL2ZpbGV8cmVzZXR8c3VibWl0fGJ1dHRvbnxpbWFnZS9pLFxuICAgIGNoZWNrYWJsZVJlID0gL3JhZGlvfGNoZWNrYm94L2k7XG5cbmZuLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gJyc7XG4gIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZWFjaChlbGUuZWxlbWVudHMgfHwgW2VsZV0sIGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmIChlbGUuZGlzYWJsZWQgfHwgIWVsZS5uYW1lIHx8IGVsZS50YWdOYW1lID09PSAnRklFTERTRVQnIHx8IHNraXBwYWJsZVJlLnRlc3QoZWxlLnR5cGUpIHx8IGNoZWNrYWJsZVJlLnRlc3QoZWxlLnR5cGUpICYmICFlbGUuY2hlY2tlZCkgcmV0dXJuO1xuICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoZWxlKTtcblxuICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICBlYWNoKHZhbHVlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICAgICAgcXVlcnkgKz0gcXVlcnlFbmNvZGUoZWxlLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcXVlcnkuc2xpY2UoMSk7XG59O1xuXG5mdW5jdGlvbiB2YWwodmFsdWUpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpc1swXSAmJiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIGlzU2VsZWN0ID0gZWxlLm11bHRpcGxlICYmIGVsZS5vcHRpb25zO1xuXG4gICAgaWYgKGlzU2VsZWN0IHx8IGNoZWNrYWJsZVJlLnRlc3QoZWxlLnR5cGUpKSB7XG4gICAgICB2YXIgZWxlVmFsdWVfMSA9IGlzQXJyYXkodmFsdWUpID8gbWFwLmNhbGwodmFsdWUsIFN0cmluZykgOiBpc051bGwodmFsdWUpID8gW10gOiBbU3RyaW5nKHZhbHVlKV07XG5cbiAgICAgIGlmIChpc1NlbGVjdCkge1xuICAgICAgICBlYWNoKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAoaSwgb3B0aW9uKSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZWxlVmFsdWVfMS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMDtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuY2hlY2tlZCA9IGVsZVZhbHVlXzEuaW5kZXhPZihlbGUudmFsdWUpID49IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZS52YWx1ZSA9IGlzVW5kZWZpbmVkKHZhbHVlKSB8fCBpc051bGwodmFsdWUpID8gJycgOiB2YWx1ZTtcbiAgICB9XG4gIH0pO1xufVxuXG5mbi52YWwgPSB2YWw7XG5cbmZuLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUuY2xvbmVOb2RlKHRydWUpO1xuICB9KTtcbn07XG5cbmZuLmRldGFjaCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIGZpbHRlcmVkKHRoaXMsIGNvbXBhcmF0b3IpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChlbGUucGFyZW50Tm9kZSkge1xuICAgICAgZWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBmcmFnbWVudFJlID0gL15cXHMqPChcXHcrKVtePl0qPi8sXG4gICAgc2luZ2xlVGFnUmUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPik/JC87XG52YXIgY29udGFpbmVycyA9IHtcbiAgJyonOiBkaXYsXG4gIHRyOiB0Ym9keSxcbiAgdGQ6IHRyLFxuICB0aDogdHIsXG4gIHRoZWFkOiB0YWJsZSxcbiAgdGJvZHk6IHRhYmxlLFxuICB0Zm9vdDogdGFibGVcbn07IC8vVE9ETzogQ3JlYXRlIGVsZW1lbnRzIGluc2lkZSBhIGRvY3VtZW50IGZyYWdtZW50LCBpbiBvcmRlciB0byBwcmV2ZW50IGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGZpcmluZ1xuLy9UT0RPOiBFbnN1cmUgdGhlIGNyZWF0ZWQgZWxlbWVudHMgaGF2ZSB0aGUgZnJhZ21lbnQgYXMgdGhlaXIgcGFyZW50IGluc3RlYWQgb2YgbnVsbCwgdGhpcyBhbHNvIGVuc3VyZXMgd2UgY2FuIGRlYWwgd2l0aCBkZXRhdGNoZWQgbm9kZXMgbW9yZSByZWxpYWJseVxuXG5mdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICBpZiAoIWlzU3RyaW5nKGh0bWwpKSByZXR1cm4gW107XG4gIGlmIChzaW5nbGVUYWdSZS50ZXN0KGh0bWwpKSByZXR1cm4gW2NyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKV07XG4gIHZhciBmcmFnbWVudCA9IGZyYWdtZW50UmUudGVzdChodG1sKSAmJiBSZWdFeHAuJDEsXG4gICAgICBjb250YWluZXIgPSBjb250YWluZXJzW2ZyYWdtZW50XSB8fCBjb250YWluZXJzWycqJ107XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICByZXR1cm4gY2FzaChjb250YWluZXIuY2hpbGROb2RlcykuZGV0YWNoKCkuZ2V0KCk7XG59XG5cbmNhc2gucGFyc2VIVE1MID0gcGFyc2VIVE1MO1xuXG5mbi5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgd2hpbGUgKGVsZS5maXJzdENoaWxkKSB7XG4gICAgICBlbGUucmVtb3ZlQ2hpbGQoZWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBodG1sKGh0bWwpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdLmlubmVySFRNTDtcbiAgaWYgKGlzVW5kZWZpbmVkKGh0bWwpKSByZXR1cm4gdGhpcztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVsZS5pbm5lckhUTUwgPSBodG1sO1xuICB9KTtcbn1cblxuZm4uaHRtbCA9IGh0bWw7XG5cbmZuLnJlbW92ZSA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIGZpbHRlcmVkKHRoaXMsIGNvbXBhcmF0b3IpLmRldGFjaCgpLm9mZigpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHRleHQodGV4dCkge1xuICBpZiAoaXNVbmRlZmluZWQodGV4dCkpIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS50ZXh0Q29udGVudCA6ICcnO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfSk7XG59XG5cbjtcbmZuLnRleHQgPSB0ZXh0O1xuXG5mbi51bndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGFyZW50KCkuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGVsZS50YWdOYW1lID09PSAnQk9EWScpIHJldHVybjtcbiAgICB2YXIgJGVsZSA9IGNhc2goZWxlKTtcbiAgICAkZWxlLnJlcGxhY2VXaXRoKCRlbGUuY2hpbGRyZW4oKSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG4gIGlmICghZWxlKSByZXR1cm47XG4gIHZhciByZWN0ID0gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0XG4gIH07XG59O1xuXG5mbi5vZmZzZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGVsZS5vZmZzZXRQYXJlbnQ7XG5cbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGNvbXB1dGVTdHlsZShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY0VsZTtcbiAgfSk7XG59O1xuXG5mbi5wb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG4gIGlmICghZWxlKSByZXR1cm47XG4gIHZhciBpc0ZpeGVkID0gY29tcHV0ZVN0eWxlKGVsZSwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcsXG4gICAgICBvZmZzZXQgPSBpc0ZpeGVkID8gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogdGhpcy5vZmZzZXQoKTtcblxuICBpZiAoIWlzRml4ZWQpIHtcbiAgICB2YXIgZG9jXzEgPSBlbGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlLm9mZnNldFBhcmVudCB8fCBkb2NfMS5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICB3aGlsZSAoKG9mZnNldFBhcmVudCA9PT0gZG9jXzEuYm9keSB8fCBvZmZzZXRQYXJlbnQgPT09IGRvY18xLmRvY3VtZW50RWxlbWVudCkgJiYgY29tcHV0ZVN0eWxlKG9mZnNldFBhcmVudCwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ICE9PSBlbGUgJiYgaXNFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSBjYXNoKG9mZnNldFBhcmVudCkub2Zmc2V0KCk7XG4gICAgICBvZmZzZXQudG9wIC09IHBhcmVudE9mZnNldC50b3AgKyBjb21wdXRlU3R5bGVJbnQob2Zmc2V0UGFyZW50LCAnYm9yZGVyVG9wV2lkdGgnKTtcbiAgICAgIG9mZnNldC5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0ICsgY29tcHV0ZVN0eWxlSW50KG9mZnNldFBhcmVudCwgJ2JvcmRlckxlZnRXaWR0aCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBvZmZzZXQudG9wIC0gY29tcHV0ZVN0eWxlSW50KGVsZSwgJ21hcmdpblRvcCcpLFxuICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gY29tcHV0ZVN0eWxlSW50KGVsZSwgJ21hcmdpbkxlZnQnKVxuICB9O1xufTtcblxuZm4uY2hpbGRyZW4gPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBlbGUuY2hpbGRyZW47XG4gIH0pKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4uY29udGVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGVsZS50YWdOYW1lID09PSAnSUZSQU1FJyA/IFtlbGUuY29udGVudERvY3VtZW50XSA6IGVsZS50YWdOYW1lID09PSAnVEVNUExBVEUnID8gZWxlLmNvbnRlbnQuY2hpbGROb2RlcyA6IGVsZS5jaGlsZE5vZGVzO1xuICB9KSkpO1xufTtcblxuZm4uZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbGUpO1xuICB9KSkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLnRzXG4vLyBAcmVxdWlyZSB0cmF2ZXJzYWwvZmluZC50c1xuXG5cbnZhciBIVE1MQ0RBVEFSZSA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZyxcbiAgICBzY3JpcHRUeXBlUmUgPSAvXiR8Xm1vZHVsZSR8XFwvKGphdmF8ZWNtYSlzY3JpcHQvaSxcbiAgICBzY3JpcHRBdHRyaWJ1dGVzID0gWyd0eXBlJywgJ3NyYycsICdub25jZScsICdub01vZHVsZSddO1xuXG5mdW5jdGlvbiBldmFsU2NyaXB0cyhub2RlLCBkb2MpIHtcbiAgdmFyIGNvbGxlY3Rpb24gPSBjYXNoKG5vZGUpO1xuICBjb2xsZWN0aW9uLmZpbHRlcignc2NyaXB0JykuYWRkKGNvbGxlY3Rpb24uZmluZCgnc2NyaXB0JykpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChzY3JpcHRUeXBlUmUudGVzdChlbGUudHlwZSkgJiYgZG9jRWxlLmNvbnRhaW5zKGVsZSkpIHtcbiAgICAgIC8vIFRoZSBzY3JpcHQgdHlwZSBpcyBzdXBwb3J0ZWQgLy8gVGhlIGVsZW1lbnQgaXMgYXR0YWNoZWQgdG8gdGhlIERPTSAvLyBVc2luZyBgZG9jdW1lbnRFbGVtZW50YCBmb3IgYnJvYWRlciBicm93c2VyIHN1cHBvcnRcbiAgICAgIHZhciBzY3JpcHRfMSA9IGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0XzEudGV4dCA9IGVsZS50ZXh0Q29udGVudC5yZXBsYWNlKEhUTUxDREFUQVJlLCAnJyk7XG4gICAgICBlYWNoKHNjcmlwdEF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gICAgICAgIGlmIChlbGVbYXR0cl0pIHNjcmlwdF8xW2F0dHJdID0gZWxlW2F0dHJdO1xuICAgICAgfSk7XG4gICAgICBkb2MuaGVhZC5pbnNlcnRCZWZvcmUoc2NyaXB0XzEsIG51bGwpO1xuICAgICAgZG9jLmhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0XzEpO1xuICAgIH1cbiAgfSk7XG59IC8vIEByZXF1aXJlIC4vZXZhbF9zY3JpcHRzLnRzXG5cblxuZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChhbmNob3IsIHRhcmdldCwgbGVmdCwgaW5zaWRlLCBldmFsdWF0ZSkge1xuICBpZiAoaW5zaWRlKSB7XG4gICAgLy8gcHJlcGVuZC9hcHBlbmRcbiAgICBhbmNob3IuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbGVmdCA/IGFuY2hvci5maXJzdENoaWxkIDogbnVsbCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYmVmb3JlL2FmdGVyXG4gICAgYW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbGVmdCA/IGFuY2hvciA6IGFuY2hvci5uZXh0U2libGluZyk7XG4gIH1cblxuICBpZiAoZXZhbHVhdGUpIHtcbiAgICBldmFsU2NyaXB0cyh0YXJnZXQsIGFuY2hvci5vd25lckRvY3VtZW50KTtcbiAgfVxufSAvLyBAcmVxdWlyZSAuL2luc2VydF9lbGVtZW50LnRzXG5cblxuZnVuY3Rpb24gaW5zZXJ0U2VsZWN0b3JzKHNlbGVjdG9ycywgYW5jaG9ycywgaW52ZXJzZSwgbGVmdCwgaW5zaWRlLCByZXZlcnNlTG9vcDEsIHJldmVyc2VMb29wMiwgcmV2ZXJzZUxvb3AzKSB7XG4gIGVhY2goc2VsZWN0b3JzLCBmdW5jdGlvbiAoc2ksIHNlbGVjdG9yKSB7XG4gICAgZWFjaChjYXNoKHNlbGVjdG9yKSwgZnVuY3Rpb24gKHRpLCB0YXJnZXQpIHtcbiAgICAgIGVhY2goY2FzaChhbmNob3JzKSwgZnVuY3Rpb24gKGFpLCBhbmNob3IpIHtcbiAgICAgICAgdmFyIGFuY2hvckZpbmFsID0gaW52ZXJzZSA/IHRhcmdldCA6IGFuY2hvcixcbiAgICAgICAgICAgIHRhcmdldEZpbmFsID0gaW52ZXJzZSA/IGFuY2hvciA6IHRhcmdldCxcbiAgICAgICAgICAgIGluZGV4RmluYWwgPSBpbnZlcnNlID8gdGkgOiBhaTtcbiAgICAgICAgaW5zZXJ0RWxlbWVudChhbmNob3JGaW5hbCwgIWluZGV4RmluYWwgPyB0YXJnZXRGaW5hbCA6IHRhcmdldEZpbmFsLmNsb25lTm9kZSh0cnVlKSwgbGVmdCwgaW5zaWRlLCAhaW5kZXhGaW5hbCk7XG4gICAgICB9LCByZXZlcnNlTG9vcDMpO1xuICAgIH0sIHJldmVyc2VMb29wMik7XG4gIH0sIHJldmVyc2VMb29wMSk7XG4gIHJldHVybiBhbmNob3JzO1xufVxuXG5mbi5hZnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIHRydWUpO1xufTtcblxuZm4uYXBwZW5kID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmFwcGVuZFRvID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5iZWZvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCB0cnVlKTtcbn07XG5cbmZuLnByZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5mbi5wcmVwZW5kVG8gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIHRydWUsIHRydWUsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5iZWZvcmUoc2VsZWN0b3IpLnJlbW92ZSgpO1xufTtcblxuZm4ucmVwbGFjZUFsbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBjYXNoKHNlbGVjdG9yKS5yZXBsYWNlV2l0aCh0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi53cmFwQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBzdHJ1Y3R1cmUgPSBjYXNoKHNlbGVjdG9yKSxcbiAgICAgIHdyYXBwZXIgPSBzdHJ1Y3R1cmVbMF07XG5cbiAgd2hpbGUgKHdyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgd3JhcHBlciA9IHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIH1cblxuICB0aGlzLmZpcnN0KCkuYmVmb3JlKHN0cnVjdHVyZSk7XG4gIHJldHVybiB0aGlzLmFwcGVuZFRvKHdyYXBwZXIpO1xufTtcblxuZm4ud3JhcCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgd3JhcHBlciA9IGNhc2goc2VsZWN0b3IpWzBdO1xuICAgIGNhc2goZWxlKS53cmFwQWxsKCFpID8gd3JhcHBlciA6IHdyYXBwZXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgfSk7XG59O1xuXG5mbi53cmFwSW5uZXIgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyICRlbGUgPSBjYXNoKGVsZSksXG4gICAgICAgIGNvbnRlbnRzID0gJGVsZS5jb250ZW50cygpO1xuICAgIGNvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzLndyYXBBbGwoc2VsZWN0b3IpIDogJGVsZS5hcHBlbmQoc2VsZWN0b3IpO1xuICB9KTtcbn07XG5cbmZuLmhhcyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgY29tcGFyYXRvciA9IGlzU3RyaW5nKHNlbGVjdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZmluZChzZWxlY3RvciwgZWxlKS5sZW5ndGg7XG4gIH0gOiBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jb250YWlucyhzZWxlY3Rvcik7XG4gIH07XG4gIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbn07XG5cbmZuLmlzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiBzb21lLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KTtcbn07XG5cbmZuLm5leHQgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX2FsbCwgX3VudGlsKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAnbmV4dEVsZW1lbnRTaWJsaW5nJywgX2FsbCwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLm5leHRBbGwgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5uZXh0KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcblxuZm4ubmV4dFVudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLm5leHQoY29tcGFyYXRvciwgdHJ1ZSwgdW50aWwpO1xufTtcblxuZm4ubm90ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuICghaXNTdHJpbmcoY29tcGFyYXRvcikgfHwgaXNFbGVtZW50KGVsZSkpICYmICFjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KTtcbn07XG5cbmZuLnBhcmVudCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAncGFyZW50Tm9kZScpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4uaW5kZXggPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgdmFyIGNoaWxkID0gc2VsZWN0b3IgPyBjYXNoKHNlbGVjdG9yKVswXSA6IHRoaXNbMF0sXG4gICAgICBjb2xsZWN0aW9uID0gc2VsZWN0b3IgPyB0aGlzIDogY2FzaChjaGlsZCkucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgcmV0dXJuIGluZGV4T2YuY2FsbChjb2xsZWN0aW9uLCBjaGlsZCk7XG59O1xuXG5mbi5jbG9zZXN0ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGZpbHRlcmVkID0gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG4gIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHJldHVybiBmaWx0ZXJlZDtcbiAgdmFyICRwYXJlbnQgPSB0aGlzLnBhcmVudCgpO1xuICBpZiAoISRwYXJlbnQubGVuZ3RoKSByZXR1cm4gZmlsdGVyZWQ7XG4gIHJldHVybiAkcGFyZW50LmNsb3Nlc3QoY29tcGFyYXRvcik7XG59O1xuXG5mbi5wYXJlbnRzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF91bnRpbCkge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3BhcmVudEVsZW1lbnQnLCB0cnVlLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ucGFyZW50c1VudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnBhcmVudHMoY29tcGFyYXRvciwgdW50aWwpO1xufTtcblxuZm4ucHJldiA9IGZ1bmN0aW9uIChjb21wYXJhdG9yLCBfYWxsLCBfdW50aWwpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJywgX2FsbCwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLnByZXZBbGwgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5wcmV2KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcblxuZm4ucHJldlVudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnByZXYoY29tcGFyYXRvciwgdHJ1ZSwgdW50aWwpO1xufTtcblxuZm4uc2libGluZ3MgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBjYXNoKGVsZSkucGFyZW50KCkuY2hpbGRyZW4oKS5ub3QoZWxlKTtcbiAgfSkpKSwgY29tcGFyYXRvcik7XG59OyAvLyBAb3B0aW9uYWwgLi9jaGlsZHJlbi50c1xuLy8gQG9wdGlvbmFsIC4vY2xvc2VzdC50c1xuLy8gQG9wdGlvbmFsIC4vY29udGVudHMudHNcbi8vIEBvcHRpb25hbCAuL2ZpbmQudHNcbi8vIEBvcHRpb25hbCAuL2hhcy50c1xuLy8gQG9wdGlvbmFsIC4vaXMudHNcbi8vIEBvcHRpb25hbCAuL25leHQudHNcbi8vIEBvcHRpb25hbCAuL25leHRfYWxsLnRzXG4vLyBAb3B0aW9uYWwgLi9uZXh0X3VudGlsLnRzXG4vLyBAb3B0aW9uYWwgLi9ub3QudHNcbi8vIEBvcHRpb25hbCAuL3BhcmVudC50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50cy50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50c191bnRpbC50c1xuLy8gQG9wdGlvbmFsIC4vcHJldi50c1xuLy8gQG9wdGlvbmFsIC4vcHJldl9hbGwudHNcbi8vIEBvcHRpb25hbCAuL3ByZXZfdW50aWwudHNcbi8vIEBvcHRpb25hbCAuL3NpYmxpbmdzLnRzXG4vLyBAb3B0aW9uYWwgYXR0cmlidXRlcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGNvbGxlY3Rpb24vaW5kZXgudHNcbi8vIEBvcHRpb25hbCBjc3MvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBkYXRhL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZGltZW5zaW9ucy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGVmZmVjdHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBldmVudHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBmb3Jtcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG1hbmlwdWxhdGlvbi9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG9mZnNldC9pbmRleC50c1xuLy8gQG9wdGlvbmFsIHRyYXZlcnNhbC9pbmRleC50c1xuLy8gQHJlcXVpcmUgY29yZS9pbmRleC50c1xuLy8gQHByaW9yaXR5IC0xMDBcbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIE5vZGUuanNcbiAgbW9kdWxlLmV4cG9ydHMgPSBjYXNoO1xufSBlbHNlIHtcbiAgLy8gQnJvd3NlclxuICB3aW5bJ2Nhc2gnXSA9IHdpblsnJCddID0gY2FzaDtcbn1cbn0pKCk7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImJ1bmRsZS5jc3NcIjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gZGVmaW5lKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIG9ialtrZXldO1xuICB9XG4gIHRyeSB7XG4gICAgLy8gSUUgOCBoYXMgYSBicm9rZW4gT2JqZWN0LmRlZmluZVByb3BlcnR5IHRoYXQgb25seSB3b3JrcyBvbiBET00gb2JqZWN0cy5cbiAgICBkZWZpbmUoe30sIFwiXCIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBkZWZpbmUgPSBmdW5jdGlvbihvYmosIGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gSWYgb3V0ZXJGbiBwcm92aWRlZCBhbmQgb3V0ZXJGbi5wcm90b3R5cGUgaXMgYSBHZW5lcmF0b3IsIHRoZW4gb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IuXG4gICAgdmFyIHByb3RvR2VuZXJhdG9yID0gb3V0ZXJGbiAmJiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvciA/IG91dGVyRm4gOiBHZW5lcmF0b3I7XG4gICAgdmFyIGdlbmVyYXRvciA9IE9iamVjdC5jcmVhdGUocHJvdG9HZW5lcmF0b3IucHJvdG90eXBlKTtcbiAgICB2YXIgY29udGV4dCA9IG5ldyBDb250ZXh0KHRyeUxvY3NMaXN0IHx8IFtdKTtcblxuICAgIC8vIFRoZSAuX2ludm9rZSBtZXRob2QgdW5pZmllcyB0aGUgaW1wbGVtZW50YXRpb25zIG9mIHRoZSAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMuXG4gICAgZ2VuZXJhdG9yLl9pbnZva2UgPSBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIGdlbmVyYXRvcjtcbiAgfVxuICBleHBvcnRzLndyYXAgPSB3cmFwO1xuXG4gIC8vIFRyeS9jYXRjaCBoZWxwZXIgdG8gbWluaW1pemUgZGVvcHRpbWl6YXRpb25zLiBSZXR1cm5zIGEgY29tcGxldGlvblxuICAvLyByZWNvcmQgbGlrZSBjb250ZXh0LnRyeUVudHJpZXNbaV0uY29tcGxldGlvbi4gVGhpcyBpbnRlcmZhY2UgY291bGRcbiAgLy8gaGF2ZSBiZWVuIChhbmQgd2FzIHByZXZpb3VzbHkpIGRlc2lnbmVkIHRvIHRha2UgYSBjbG9zdXJlIHRvIGJlXG4gIC8vIGludm9rZWQgd2l0aG91dCBhcmd1bWVudHMsIGJ1dCBpbiBhbGwgdGhlIGNhc2VzIHdlIGNhcmUgYWJvdXQgd2VcbiAgLy8gYWxyZWFkeSBoYXZlIGFuIGV4aXN0aW5nIG1ldGhvZCB3ZSB3YW50IHRvIGNhbGwsIHNvIHRoZXJlJ3Mgbm8gbmVlZFxuICAvLyB0byBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb2JqZWN0LiBXZSBjYW4gZXZlbiBnZXQgYXdheSB3aXRoIGFzc3VtaW5nXG4gIC8vIHRoZSBtZXRob2QgdGFrZXMgZXhhY3RseSBvbmUgYXJndW1lbnQsIHNpbmNlIHRoYXQgaGFwcGVucyB0byBiZSB0cnVlXG4gIC8vIGluIGV2ZXJ5IGNhc2UsIHNvIHdlIGRvbid0IGhhdmUgdG8gdG91Y2ggdGhlIGFyZ3VtZW50cyBvYmplY3QuIFRoZVxuICAvLyBvbmx5IGFkZGl0aW9uYWwgYWxsb2NhdGlvbiByZXF1aXJlZCBpcyB0aGUgY29tcGxldGlvbiByZWNvcmQsIHdoaWNoXG4gIC8vIGhhcyBhIHN0YWJsZSBzaGFwZSBhbmQgc28gaG9wZWZ1bGx5IHNob3VsZCBiZSBjaGVhcCB0byBhbGxvY2F0ZS5cbiAgZnVuY3Rpb24gdHJ5Q2F0Y2goZm4sIG9iaiwgYXJnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwibm9ybWFsXCIsIGFyZzogZm4uY2FsbChvYmosIGFyZykgfTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IFwidGhyb3dcIiwgYXJnOiBlcnIgfTtcbiAgICB9XG4gIH1cblxuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRTdGFydCA9IFwic3VzcGVuZGVkU3RhcnRcIjtcbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkWWllbGQgPSBcInN1c3BlbmRlZFlpZWxkXCI7XG4gIHZhciBHZW5TdGF0ZUV4ZWN1dGluZyA9IFwiZXhlY3V0aW5nXCI7XG4gIHZhciBHZW5TdGF0ZUNvbXBsZXRlZCA9IFwiY29tcGxldGVkXCI7XG5cbiAgLy8gUmV0dXJuaW5nIHRoaXMgb2JqZWN0IGZyb20gdGhlIGlubmVyRm4gaGFzIHRoZSBzYW1lIGVmZmVjdCBhc1xuICAvLyBicmVha2luZyBvdXQgb2YgdGhlIGRpc3BhdGNoIHN3aXRjaCBzdGF0ZW1lbnQuXG4gIHZhciBDb250aW51ZVNlbnRpbmVsID0ge307XG5cbiAgLy8gRHVtbXkgY29uc3RydWN0b3IgZnVuY3Rpb25zIHRoYXQgd2UgdXNlIGFzIHRoZSAuY29uc3RydWN0b3IgYW5kXG4gIC8vIC5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgcHJvcGVydGllcyBmb3IgZnVuY3Rpb25zIHRoYXQgcmV0dXJuIEdlbmVyYXRvclxuICAvLyBvYmplY3RzLiBGb3IgZnVsbCBzcGVjIGNvbXBsaWFuY2UsIHlvdSBtYXkgd2lzaCB0byBjb25maWd1cmUgeW91clxuICAvLyBtaW5pZmllciBub3QgdG8gbWFuZ2xlIHRoZSBuYW1lcyBvZiB0aGVzZSB0d28gZnVuY3Rpb25zLlxuICBmdW5jdGlvbiBHZW5lcmF0b3IoKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvbigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlKCkge31cblxuICAvLyBUaGlzIGlzIGEgcG9seWZpbGwgZm9yICVJdGVyYXRvclByb3RvdHlwZSUgZm9yIGVudmlyb25tZW50cyB0aGF0XG4gIC8vIGRvbid0IG5hdGl2ZWx5IHN1cHBvcnQgaXQuXG4gIHZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuICBJdGVyYXRvclByb3RvdHlwZVtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgdmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mO1xuICB2YXIgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90byAmJiBnZXRQcm90byhnZXRQcm90byh2YWx1ZXMoW10pKSk7XG4gIGlmIChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAmJlxuICAgICAgTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgIT09IE9wICYmXG4gICAgICBoYXNPd24uY2FsbChOYXRpdmVJdGVyYXRvclByb3RvdHlwZSwgaXRlcmF0b3JTeW1ib2wpKSB7XG4gICAgLy8gVGhpcyBlbnZpcm9ubWVudCBoYXMgYSBuYXRpdmUgJUl0ZXJhdG9yUHJvdG90eXBlJTsgdXNlIGl0IGluc3RlYWRcbiAgICAvLyBvZiB0aGUgcG9seWZpbGwuXG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBOYXRpdmVJdGVyYXRvclByb3RvdHlwZTtcbiAgfVxuXG4gIHZhciBHcCA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLnByb3RvdHlwZSA9XG4gICAgR2VuZXJhdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUpO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5wcm90b3R5cGUgPSBHcC5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlO1xuICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdlbmVyYXRvckZ1bmN0aW9uO1xuICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IGRlZmluZShcbiAgICBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSxcbiAgICB0b1N0cmluZ1RhZ1N5bWJvbCxcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgKTtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBkZWZpbmUocHJvdG90eXBlLCBtZXRob2QsIGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgZXhwb3J0cy5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBkZWZpbmUoZ2VuRnVuLCB0b1N0cmluZ1RhZ1N5bWJvbCwgXCJHZW5lcmF0b3JGdW5jdGlvblwiKTtcbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yLCBQcm9taXNlSW1wbCkge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUuX19hd2FpdCkudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaW52b2tlKFwibmV4dFwiLCB2YWx1ZSwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgIGludm9rZShcInRocm93XCIsIGVyciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlSW1wbC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlSW1wbChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBleHBvcnRzLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBleHBvcnRzLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QsIFByb21pc2VJbXBsKSB7XG4gICAgaWYgKFByb21pc2VJbXBsID09PSB2b2lkIDApIFByb21pc2VJbXBsID0gUHJvbWlzZTtcblxuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSxcbiAgICAgIFByb21pc2VJbXBsXG4gICAgKTtcblxuICAgIHJldHVybiBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAvLyBOb3RlOiBbXCJyZXR1cm5cIl0gbXVzdCBiZSB1c2VkIGZvciBFUzMgcGFyc2luZyBjb21wYXRpYmlsaXR5LlxuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3JbXCJyZXR1cm5cIl0pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBkZWZpbmUoR3AsIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvclwiKTtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaW1wb3J0ICQgZnJvbSAnY2FzaC1kb20nO1xyXG5pbXBvcnQgJy4uL3Njc3MvbWFpbi5zY3NzJztcclxuXHJcbmxldCBjb250cm9sbGVyO1xyXG5sZXQgc29ja2V0O1xyXG5cclxuJCgnI3VybCcpLm9uKCdrZXl1cCcsIGUgPT4ge1xyXG4gICAgaWYgKGUua2V5ID09ICdFbnRlcicpICQoJyNidG4tZ28nKS50cmlnZ2VyKCdjbGljaycpO1xyXG59KTtcclxuJCgnI2J0bi1nbycpLm9uKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICAgIGNvbnRyb2xsZXI/LmFib3J0KCk7XHJcbiAgICBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0ICRtdXNpYyA9ICQoJy5tdXNpYycpLmhpZGUoKTtcclxuICAgIGNvbnN0ICRkb3dubG9hZCA9ICQoJyNkb3dubG9hZCcpLmF0dHIoJ2NsYXNzJywgJ2hpZGUnKTtcclxuICAgIGNvbnN0ICRtZXNzYWdlID0gJCgnLm1lc3NhZ2UnKS5oaWRlKCk7XHJcbiAgICBjb25zdCAkbG9hZGVyID0gJCgnLmxvYWRlcicpLmFkZENsYXNzKCdsb2FkJyk7XHJcblxyXG4gICAgY29uc3QgZXJyb3IgPSBtc2cgPT4ge1xyXG4gICAgICAgICRtZXNzYWdlLnRleHQobXNnKS5zaG93KCk7XHJcbiAgICAgICAgJGxvYWRlci5yZW1vdmVDbGFzcygnbG9hZCcpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHVybCA9ICQoJyN1cmwnKS52YWwoKTtcclxuXHJcbiAgICBpZiAoIXVybCkgcmV0dXJuIGVycm9yKFwiVGhlIHVybCBjYW4ndCBiZSBlbXB0eVwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmwgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgICAgIGlmICghYm9keS5tc2cpIHRocm93IGJvZHk7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihib2R5Lm1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYm9keS5tdXNpYykgdGhyb3cgYm9keTtcclxuXHJcbiAgICAgICAgY29uc3QgbXVzaWMgPSBib2R5Lm11c2ljO1xyXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbXVzaWMuY2hpbGRyZW4oKS5maXJzdCgpLmNoaWxkcmVuKCkuZmlyc3QoKTtcclxuICAgICAgICBjb25zdCAkaW5mbyA9ICRtdXNpYy5jaGlsZHJlbigpLmxhc3QoKTtcclxuXHJcbiAgICAgICAgJGluZm8uZmluZCgnLmdlbnJlJykudGV4dChgIyR7bXVzaWMuZ2VucmUgfHwgJ05vR2VucmUnfSBgKTtcclxuICAgICAgICAkaW5mby5maW5kKCcudGl0bGUnKS50ZXh0KG11c2ljLnRpdGxlKTtcclxuICAgICAgICAkaW5mby5maW5kKCcuYXJ0aXN0JykudGV4dChgJHttdXNpYy5hcnRpc3QgfHwgJ1Vua25vd24gQXJ0aXN0J30g4oCiICR7bXVzaWMuYWxidW0gfHwgJ1Vua25vd24gQWxidW0nfWApO1xyXG4gICAgICAgICRpbmZvLmZpbmQoJy55ZWFyJykudGV4dChtdXNpYy55ZWFyKTtcclxuXHJcbiAgICAgICAgJGltZy5oaWRlKCk7XHJcbiAgICAgICAgJGltZy5uZXh0KCkudGV4dCgnTm8gVHJhY2sgQXJ0d29yaycpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgaWYgKG11c2ljLmFydHdvcmspIHtcclxuICAgICAgICAgICAgJGltZy5vbignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRpbWcubmV4dCgpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICRpbWcucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRpbWcuYXR0cignc3JjJywgbXVzaWMuYXJ0d29yayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbXVzaWMucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkZG93bmxvYWQuYXR0cignY2xhc3MnLCAnbG9hZCcpO1xyXG5cclxuICAgICAgICBzb2NrZXQ/LmNsb3NlKCk7XHJcbiAgICAgICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldChgJHtkb2N1bWVudC5VUkwucmVwbGFjZSgvaHR0cC8sICd3cycpfS8ke211c2ljLmJ1enp5SWR9YCk7XHJcbiAgICAgICAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PSAncmVhZHknKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9hZGVyLnJlbW92ZUNsYXNzKCdsb2FkJyk7XHJcbiAgICAgICAgICAgICAgICAkZG93bmxvYWQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICRkb3dubG9hZC5maW5kKCdhJykuYXR0cignaHJlZicsIGAvZC8ke211c2ljLmJ1enp5SWR9YCk7XHJcbiAgICAgICAgICAgICAgICAkZG93bmxvYWQuYXR0cignY2xhc3MnLCAncmVhZHknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZS5kYXRhID09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgICRkb3dubG9hZC5hdHRyKCdjbGFzcycsICdlcnJvcicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pIHJldHVybjtcclxuICAgICAgICBlcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcclxuICAgIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=