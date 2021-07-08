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
  var _socket, _controller;

  var $music, $download, $message, $loader, error, url, res, body, music, $img, $info;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          (_socket = socket) === null || _socket === void 0 ? void 0 : _socket.close();
          (_controller = controller) === null || _controller === void 0 ? void 0 : _controller.abort();
          controller = new AbortController();
          $music = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('.music').hide();
          $download = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#download').attr('class', 'hide');
          $message = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('.message').hide();
          $loader = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('.loader').addClass('load');

          error = function error() {
            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Something went wrong';
            $music.hide();
            $download.attr('class', 'hide');
            $message.text(msg).show();
            $loader.removeClass('load');
          };

          url = cash_dom__WEBPACK_IMPORTED_MODULE_2___default()('#url').val();

          if (url) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", error("The url can't be empty"));

        case 11:
          _context.prev = 11;
          _context.next = 14;
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

        case 14:
          res = _context.sent;
          _context.next = 17;
          return res.json();

        case 17:
          body = _context.sent;

          if (res.ok) {
            _context.next = 22;
            break;
          }

          if (body.msg) {
            _context.next = 21;
            break;
          }

          throw body;

        case 21:
          return _context.abrupt("return", error(body.msg));

        case 22:
          if (body.music) {
            _context.next = 24;
            break;
          }

          throw body;

        case 24:
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
          $message.hide();
          socket = new WebSocket("".concat(document.URL.replace(/http/, 'ws'), "/").concat(music.buzzyId));
          socket.addEventListener('message', function (e) {
            if (e.data == 'ready') {
              $loader.removeClass('load');
              $download.removeAttr('style');
              $download.find('a').attr('href', "/d/".concat(music.buzzyId));
              $download.attr('class', 'ready');
              socket.addEventListener('close', function () {
                return error('Your file has expired');
              });
            }
          });
          socket.addEventListener('close', function () {
            return error();
          });
          _context.next = 47;
          break;

        case 42:
          _context.prev = 42;
          _context.t0 = _context["catch"](11);

          if (!(_context.t0 instanceof DOMException)) {
            _context.next = 46;
            break;
          }

          return _context.abrupt("return");

        case 46:
          error();

        case 47:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[11, 42]]);
})));
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9idXp6eS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovL2J1enp5Ly4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL3JlZ2VuZXJhdG9yL2luZGV4LmpzIiwid2VicGFjazovL2J1enp5Ly4vbm9kZV9tb2R1bGVzL2Nhc2gtZG9tL2Rpc3QvY2FzaC5qcyIsIndlYnBhY2s6Ly9idXp6eS8uL2Fzc2V0cy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly9idXp6eS8uL25vZGVfbW9kdWxlcy9yZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUuanMiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1enp5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idXp6eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1enp5L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2J1enp5Ly4vYXNzZXRzL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvbnRyb2xsZXIiLCJzb2NrZXQiLCIkIiwib24iLCJlIiwia2V5IiwidHJpZ2dlciIsImNsb3NlIiwiYWJvcnQiLCJBYm9ydENvbnRyb2xsZXIiLCIkbXVzaWMiLCJoaWRlIiwiJGRvd25sb2FkIiwiYXR0ciIsIiRtZXNzYWdlIiwiJGxvYWRlciIsImFkZENsYXNzIiwiZXJyb3IiLCJtc2ciLCJ0ZXh0Iiwic2hvdyIsInJlbW92ZUNsYXNzIiwidXJsIiwidmFsIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImhlYWRlcnMiLCJzaWduYWwiLCJyZXMiLCJqc29uIiwib2siLCJtdXNpYyIsIiRpbWciLCJjaGlsZHJlbiIsImZpcnN0IiwiJGluZm8iLCJsYXN0IiwiZmluZCIsImdlbnJlIiwidGl0bGUiLCJhcnRpc3QiLCJhbGJ1bSIsInllYXIiLCJuZXh0IiwicmVtb3ZlQXR0ciIsImFydHdvcmsiLCJXZWJTb2NrZXQiLCJkb2N1bWVudCIsIlVSTCIsInJlcGxhY2UiLCJidXp6eUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRhdGEiLCJET01FeGNlcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQzs7Ozs7Ozs7OztBQ2xDQSxnSEFBK0M7Ozs7Ozs7Ozs7O0FDQS9DO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOzs7QUFHRjtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLE9BQU87QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRUFBRTtBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw2RUFBNkU7O0FBRTdFO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGOztBQUV2RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOztBQUV0Qzs7QUFFQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLElBQUksSUFBOEI7QUFDbEM7QUFDQTtBQUNBLENBQUMsTUFBTSxFQUdOO0FBQ0QsQ0FBQyxJOzs7Ozs7Ozs7Ozs7Ozs7QUM3MUNELGlFQUFlLHFCQUF1QixlQUFlLEU7Ozs7Ozs7Ozs7QUNBckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSx3Q0FBd0MsV0FBVztBQUNuRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxjQUFjO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsS0FBMEIsb0JBQW9CLENBQUU7QUFDbEQ7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDM3VCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFFQSxJQUFJQSxVQUFKO0FBQ0EsSUFBSUMsTUFBSjtBQUVBQywrQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVQyxFQUFWLENBQWEsT0FBYixFQUFzQixVQUFBQyxDQUFDLEVBQUk7QUFDdkIsTUFBSUEsQ0FBQyxDQUFDQyxHQUFGLElBQVMsT0FBYixFQUFzQkgsK0NBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYUksT0FBYixDQUFxQixPQUFyQjtBQUN6QixDQUZEO0FBR0FKLCtDQUFDLENBQUMsU0FBRCxDQUFELENBQWFDLEVBQWIsQ0FBZ0IsT0FBaEIscUxBQXlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNyQixxQkFBQUYsTUFBTSxVQUFOLDBDQUFRTSxLQUFSO0FBQ0EseUJBQUFQLFVBQVUsVUFBVixrREFBWVEsS0FBWjtBQUNBUixvQkFBVSxHQUFHLElBQUlTLGVBQUosRUFBYjtBQUVNQyxnQkFMZSxHQUtOUiwrQ0FBQyxDQUFDLFFBQUQsQ0FBRCxDQUFZUyxJQUFaLEVBTE07QUFNZkMsbUJBTmUsR0FNSFYsK0NBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZVcsSUFBZixDQUFvQixPQUFwQixFQUE2QixNQUE3QixDQU5HO0FBT2ZDLGtCQVBlLEdBT0paLCtDQUFDLENBQUMsVUFBRCxDQUFELENBQWNTLElBQWQsRUFQSTtBQVFmSSxpQkFSZSxHQVFMYiwrQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhYyxRQUFiLENBQXNCLE1BQXRCLENBUks7O0FBVWZDLGVBVmUsR0FVUCxTQUFSQSxLQUFRLEdBQWtDO0FBQUEsZ0JBQWpDQyxHQUFpQyx1RUFBM0Isc0JBQTJCO0FBQzVDUixrQkFBTSxDQUFDQyxJQUFQO0FBQ0FDLHFCQUFTLENBQUNDLElBQVYsQ0FBZSxPQUFmLEVBQXdCLE1BQXhCO0FBQ0FDLG9CQUFRLENBQUNLLElBQVQsQ0FBY0QsR0FBZCxFQUFtQkUsSUFBbkI7QUFDQUwsbUJBQU8sQ0FBQ00sV0FBUixDQUFvQixNQUFwQjtBQUNILFdBZm9COztBQWdCZkMsYUFoQmUsR0FnQlRwQiwrQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVcUIsR0FBVixFQWhCUzs7QUFBQSxjQWtCaEJELEdBbEJnQjtBQUFBO0FBQUE7QUFBQTs7QUFBQSwyQ0FrQkpMLEtBQUssQ0FBQyx3QkFBRCxDQWxCRDs7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFxQkNPLEtBQUssQ0FBQyxNQUFELEVBQVM7QUFDNUJDLGtCQUFNLEVBQUUsTUFEb0I7QUFFNUJDLGdCQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQUVOLGlCQUFHLEVBQUhBO0FBQUYsYUFBZixDQUZzQjtBQUc1Qk8sbUJBQU8sRUFBRTtBQUFFLDhCQUFnQjtBQUFsQixhQUhtQjtBQUk1QkMsa0JBQU0sRUFBRTlCLFVBQVUsQ0FBQzhCO0FBSlMsV0FBVCxDQXJCTjs7QUFBQTtBQXFCWEMsYUFyQlc7QUFBQTtBQUFBLGlCQTJCRUEsR0FBRyxDQUFDQyxJQUFKLEVBM0JGOztBQUFBO0FBMkJYTixjQTNCVzs7QUFBQSxjQTRCWkssR0FBRyxDQUFDRSxFQTVCUTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxjQTZCUlAsSUFBSSxDQUFDUixHQTdCRztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkE2QlFRLElBN0JSOztBQUFBO0FBQUEsMkNBOEJOVCxLQUFLLENBQUNTLElBQUksQ0FBQ1IsR0FBTixDQTlCQzs7QUFBQTtBQUFBLGNBZ0NaUSxJQUFJLENBQUNRLEtBaENPO0FBQUE7QUFBQTtBQUFBOztBQUFBLGdCQWdDTVIsSUFoQ047O0FBQUE7QUFrQ1hRLGVBbENXLEdBa0NIUixJQUFJLENBQUNRLEtBbENGO0FBbUNYQyxjQW5DVyxHQW1DSnpCLE1BQU0sQ0FBQzBCLFFBQVAsR0FBa0JDLEtBQWxCLEdBQTBCRCxRQUExQixHQUFxQ0MsS0FBckMsRUFuQ0k7QUFvQ1hDLGVBcENXLEdBb0NINUIsTUFBTSxDQUFDMEIsUUFBUCxHQUFrQkcsSUFBbEIsRUFwQ0c7QUFzQ2pCRCxlQUFLLENBQUNFLElBQU4sQ0FBVyxRQUFYLEVBQXFCckIsSUFBckIsWUFBOEJlLEtBQUssQ0FBQ08sS0FBTixJQUFlLFNBQTdDO0FBQ0FILGVBQUssQ0FBQ0UsSUFBTixDQUFXLFFBQVgsRUFBcUJyQixJQUFyQixDQUEwQmUsS0FBSyxDQUFDUSxLQUFoQztBQUNBSixlQUFLLENBQUNFLElBQU4sQ0FBVyxTQUFYLEVBQXNCckIsSUFBdEIsV0FBOEJlLEtBQUssQ0FBQ1MsTUFBTixJQUFnQixnQkFBOUMscUJBQW9FVCxLQUFLLENBQUNVLEtBQU4sSUFBZSxlQUFuRjtBQUNBTixlQUFLLENBQUNFLElBQU4sQ0FBVyxPQUFYLEVBQW9CckIsSUFBcEIsQ0FBeUJlLEtBQUssQ0FBQ1csSUFBL0I7QUFFQVYsY0FBSSxDQUFDeEIsSUFBTDtBQUNBd0IsY0FBSSxDQUFDVyxJQUFMLEdBQVkzQixJQUFaLENBQWlCLGtCQUFqQixFQUFxQzRCLFVBQXJDLENBQWdELE9BQWhEOztBQUNBLGNBQUliLEtBQUssQ0FBQ2MsT0FBVixFQUFtQjtBQUNmYixnQkFBSSxDQUFDaEMsRUFBTCxDQUFRLE1BQVIsRUFBZ0IsWUFBTTtBQUNsQmdDLGtCQUFJLENBQUNXLElBQUwsR0FBWW5DLElBQVo7QUFDQXdCLGtCQUFJLENBQUNZLFVBQUwsQ0FBZ0IsT0FBaEI7QUFDSCxhQUhEO0FBSUFaLGdCQUFJLENBQUN0QixJQUFMLENBQVUsS0FBVixFQUFpQnFCLEtBQUssQ0FBQ2MsT0FBdkI7QUFDSDs7QUFFRHRDLGdCQUFNLENBQUNxQyxVQUFQLENBQWtCLE9BQWxCO0FBQ0FuQyxtQkFBUyxDQUFDQyxJQUFWLENBQWUsT0FBZixFQUF3QixNQUF4QjtBQUNBQyxrQkFBUSxDQUFDSCxJQUFUO0FBRUFWLGdCQUFNLEdBQUcsSUFBSWdELFNBQUosV0FBaUJDLFFBQVEsQ0FBQ0MsR0FBVCxDQUFhQyxPQUFiLENBQXFCLE1BQXJCLEVBQTZCLElBQTdCLENBQWpCLGNBQXVEbEIsS0FBSyxDQUFDbUIsT0FBN0QsRUFBVDtBQUNBcEQsZ0JBQU0sQ0FBQ3FELGdCQUFQLENBQXdCLFNBQXhCLEVBQW1DLFVBQUFsRCxDQUFDLEVBQUk7QUFDcEMsZ0JBQUlBLENBQUMsQ0FBQ21ELElBQUYsSUFBVSxPQUFkLEVBQXVCO0FBQ25CeEMscUJBQU8sQ0FBQ00sV0FBUixDQUFvQixNQUFwQjtBQUNBVCx1QkFBUyxDQUFDbUMsVUFBVixDQUFxQixPQUFyQjtBQUNBbkMsdUJBQVMsQ0FBQzRCLElBQVYsQ0FBZSxHQUFmLEVBQW9CM0IsSUFBcEIsQ0FBeUIsTUFBekIsZUFBdUNxQixLQUFLLENBQUNtQixPQUE3QztBQUNBekMsdUJBQVMsQ0FBQ0MsSUFBVixDQUFlLE9BQWYsRUFBd0IsT0FBeEI7QUFDQVosb0JBQU0sQ0FBQ3FELGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDO0FBQUEsdUJBQU1yQyxLQUFLLENBQUMsdUJBQUQsQ0FBWDtBQUFBLGVBQWpDO0FBQ0g7QUFDSixXQVJEO0FBU0FoQixnQkFBTSxDQUFDcUQsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUM7QUFBQSxtQkFBTXJDLEtBQUssRUFBWDtBQUFBLFdBQWpDO0FBbkVpQjtBQUFBOztBQUFBO0FBQUE7QUFBQTs7QUFBQSxnQkFxRWIsdUJBQWF1QyxZQXJFQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQXNFakJ2QyxlQUFLOztBQXRFWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUF6QixJIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCIvKiBNSVQgaHR0cHM6Ly9naXRodWIuY29tL2ZhYmlvc3BhbXBpbmF0by9jYXNoICovXG4oZnVuY3Rpb24oKXtcblwidXNlIHN0cmljdFwiO1xuXG52YXIgcHJvcE1hcCA9IHtcbiAgLyogR0VORVJBTCAqL1xuICBcImNsYXNzXCI6ICdjbGFzc05hbWUnLFxuICBjb250ZW50ZWRpdGFibGU6ICdjb250ZW50RWRpdGFibGUnLFxuXG4gIC8qIExBQkVMICovXG4gIFwiZm9yXCI6ICdodG1sRm9yJyxcblxuICAvKiBJTlBVVCAqL1xuICByZWFkb25seTogJ3JlYWRPbmx5JyxcbiAgbWF4bGVuZ3RoOiAnbWF4TGVuZ3RoJyxcbiAgdGFiaW5kZXg6ICd0YWJJbmRleCcsXG5cbiAgLyogVEFCTEUgKi9cbiAgY29sc3BhbjogJ2NvbFNwYW4nLFxuICByb3dzcGFuOiAncm93U3BhbicsXG5cbiAgLyogSU1BR0UgKi9cbiAgdXNlbWFwOiAndXNlTWFwJ1xufTtcblxuZnVuY3Rpb24gYXR0ZW1wdChmbiwgYXJnKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZuKGFyZyk7XG4gIH0gY2F0Y2ggKF9hKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfVxufVxuXG52YXIgZG9jID0gZG9jdW1lbnQsXG4gICAgd2luID0gd2luZG93LFxuICAgIGRvY0VsZSA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgY3JlYXRlRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50LmJpbmQoZG9jKSxcbiAgICBkaXYgPSBjcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICB0YWJsZSA9IGNyZWF0ZUVsZW1lbnQoJ3RhYmxlJyksXG4gICAgdGJvZHkgPSBjcmVhdGVFbGVtZW50KCd0Ym9keScpLFxuICAgIHRyID0gY3JlYXRlRWxlbWVudCgndHInKSxcbiAgICBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSxcbiAgICBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBjb25jYXQgPSBBcnJheVByb3RvdHlwZS5jb25jYXQsXG4gICAgZmlsdGVyID0gQXJyYXlQcm90b3R5cGUuZmlsdGVyLFxuICAgIGluZGV4T2YgPSBBcnJheVByb3RvdHlwZS5pbmRleE9mLFxuICAgIG1hcCA9IEFycmF5UHJvdG90eXBlLm1hcCxcbiAgICBwdXNoID0gQXJyYXlQcm90b3R5cGUucHVzaCxcbiAgICBzbGljZSA9IEFycmF5UHJvdG90eXBlLnNsaWNlLFxuICAgIHNvbWUgPSBBcnJheVByb3RvdHlwZS5zb21lLFxuICAgIHNwbGljZSA9IEFycmF5UHJvdG90eXBlLnNwbGljZTtcbnZhciBpZFJlID0gL14jKD86W1xcdy1dfFxcXFwufFteXFx4MDAtXFx4YTBdKSokLyxcbiAgICBjbGFzc1JlID0gL15cXC4oPzpbXFx3LV18XFxcXC58W15cXHgwMC1cXHhhMF0pKiQvLFxuICAgIGh0bWxSZSA9IC88Lis+LyxcbiAgICB0YWdSZSA9IC9eXFx3KyQvOyAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5mdW5jdGlvbiBmaW5kKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gIHJldHVybiAhc2VsZWN0b3IgfHwgIWlzRG9jdW1lbnQoY29udGV4dCkgJiYgIWlzRWxlbWVudChjb250ZXh0KSA/IFtdIDogY2xhc3NSZS50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzZWxlY3Rvci5zbGljZSgxKSkgOiB0YWdSZS50ZXN0KHNlbGVjdG9yKSA/IGNvbnRleHQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoc2VsZWN0b3IpIDogY29udGV4dC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn0gLy8gQHJlcXVpcmUgLi9maW5kLnRzXG4vLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbnZhciBDYXNoID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ2FzaChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIGlmICghc2VsZWN0b3IpIHJldHVybjtcbiAgICBpZiAoaXNDYXNoKHNlbGVjdG9yKSkgcmV0dXJuIHNlbGVjdG9yO1xuICAgIHZhciBlbGVzID0gc2VsZWN0b3I7XG5cbiAgICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgICB2YXIgY3R4ID0gKGlzQ2FzaChjb250ZXh0KSA/IGNvbnRleHRbMF0gOiBjb250ZXh0KSB8fCBkb2M7XG4gICAgICBlbGVzID0gaWRSZS50ZXN0KHNlbGVjdG9yKSA/IGN0eC5nZXRFbGVtZW50QnlJZChzZWxlY3Rvci5zbGljZSgxKSkgOiBodG1sUmUudGVzdChzZWxlY3RvcikgPyBwYXJzZUhUTUwoc2VsZWN0b3IpIDogZmluZChzZWxlY3RvciwgY3R4KTtcbiAgICAgIGlmICghZWxlcykgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlYWR5KHNlbGVjdG9yKTsgLy9GSVhNRTogYGZuLnJlYWR5YCBpcyBub3QgaW5jbHVkZWQgaW4gYGNvcmVgLCBidXQgaXQncyBhY3R1YWxseSBhIGNvcmUgZnVuY3Rpb25hbGl0eVxuICAgIH1cblxuICAgIGlmIChlbGVzLm5vZGVUeXBlIHx8IGVsZXMgPT09IHdpbikgZWxlcyA9IFtlbGVzXTtcbiAgICB0aGlzLmxlbmd0aCA9IGVsZXMubGVuZ3RoO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpc1tpXSA9IGVsZXNbaV07XG4gICAgfVxuICB9XG5cbiAgQ2FzaC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICAgIHJldHVybiBuZXcgQ2FzaChzZWxlY3RvciwgY29udGV4dCk7XG4gIH07XG5cbiAgcmV0dXJuIENhc2g7XG59KCk7XG5cbnZhciBmbiA9IENhc2gucHJvdG90eXBlLFxuICAgIGNhc2ggPSBmbi5pbml0O1xuY2FzaC5mbiA9IGNhc2gucHJvdG90eXBlID0gZm47IC8vIEVuc3VyaW5nIHRoYXQgYGNhc2ggKCkgaW5zdGFuY2VvZiBjYXNoYFxuXG5mbi5sZW5ndGggPSAwO1xuZm4uc3BsaWNlID0gc3BsaWNlOyAvLyBFbnN1cmluZyBhIGNhc2ggY29sbGVjdGlvbiBnZXRzIHByaW50ZWQgYXMgYXJyYXktbGlrZSBpbiBDaHJvbWUncyBkZXZ0b29sc1xuXG5pZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAvLyBFbnN1cmluZyBhIGNhc2ggY29sbGVjdGlvbiBpcyBpdGVyYWJsZVxuICBmbltTeW1ib2xbJ2l0ZXJhdG9yJ11dID0gQXJyYXlQcm90b3R5cGVbU3ltYm9sWydpdGVyYXRvciddXTtcbn1cblxuZm4ubWFwID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBjYXNoKGNvbmNhdC5hcHBseShbXSwgbWFwLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjYWxsYmFjay5jYWxsKGVsZSwgaSwgZWxlKTtcbiAgfSkpKTtcbn07XG5cbmZuLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIGNhc2goc2xpY2UuY2FsbCh0aGlzLCBzdGFydCwgZW5kKSk7XG59OyAvLyBAcmVxdWlyZSAuL2Nhc2gudHNcblxuXG52YXIgZGFzaEFscGhhUmUgPSAvLShbYS16XSkvZztcblxuZnVuY3Rpb24gY2FtZWxDYXNlKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoZGFzaEFscGhhUmUsIGZ1bmN0aW9uIChtYXRjaCwgbGV0dGVyKSB7XG4gICAgcmV0dXJuIGxldHRlci50b1VwcGVyQ2FzZSgpO1xuICB9KTtcbn1cblxuY2FzaC5ndWlkID0gMTsgLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG5cbmZ1bmN0aW9uIG1hdGNoZXMoZWxlLCBzZWxlY3Rvcikge1xuICB2YXIgbWF0Y2hlcyA9IGVsZSAmJiAoZWxlWydtYXRjaGVzJ10gfHwgZWxlWyd3ZWJraXRNYXRjaGVzU2VsZWN0b3InXSB8fCBlbGVbJ21zTWF0Y2hlc1NlbGVjdG9yJ10pO1xuICByZXR1cm4gISFtYXRjaGVzICYmICEhc2VsZWN0b3IgJiYgbWF0Y2hlcy5jYWxsKGVsZSwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBpc0Nhc2goeCkge1xuICByZXR1cm4geCBpbnN0YW5jZW9mIENhc2g7XG59XG5cbmZ1bmN0aW9uIGlzV2luZG93KHgpIHtcbiAgcmV0dXJuICEheCAmJiB4ID09PSB4LndpbmRvdztcbn1cblxuZnVuY3Rpb24gaXNEb2N1bWVudCh4KSB7XG4gIHJldHVybiAhIXggJiYgeC5ub2RlVHlwZSA9PT0gOTtcbn1cblxuZnVuY3Rpb24gaXNFbGVtZW50KHgpIHtcbiAgcmV0dXJuICEheCAmJiB4Lm5vZGVUeXBlID09PSAxO1xufVxuXG5mdW5jdGlvbiBpc0Jvb2xlYW4oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdib29sZWFuJztcbn1cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih4KSB7XG4gIHJldHVybiB0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcoeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdzdHJpbmcnO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh4KSB7XG4gIHJldHVybiB4ID09PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbCh4KSB7XG4gIHJldHVybiB4ID09PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bWVyaWMoeCkge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQoeCkpICYmIGlzRmluaXRlKHgpO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHgpIHtcbiAgaWYgKHR5cGVvZiB4ICE9PSAnb2JqZWN0JyB8fCB4ID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih4KTtcbiAgcmV0dXJuIHByb3RvID09PSBudWxsIHx8IHByb3RvID09PSBPYmplY3QucHJvdG90eXBlO1xufVxuXG5jYXNoLmlzV2luZG93ID0gaXNXaW5kb3c7XG5jYXNoLmlzRnVuY3Rpb24gPSBpc0Z1bmN0aW9uO1xuY2FzaC5pc0FycmF5ID0gaXNBcnJheTtcbmNhc2guaXNOdW1lcmljID0gaXNOdW1lcmljO1xuY2FzaC5pc1BsYWluT2JqZWN0ID0gaXNQbGFpbk9iamVjdDtcblxuZm4uZ2V0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gIGlmIChpc1VuZGVmaW5lZChpbmRleCkpIHJldHVybiBzbGljZS5jYWxsKHRoaXMpO1xuICBpbmRleCA9IE51bWJlcihpbmRleCk7XG4gIHJldHVybiB0aGlzW2luZGV4IDwgMCA/IGluZGV4ICsgdGhpcy5sZW5ndGggOiBpbmRleF07XG59O1xuXG5mbi5lcSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICByZXR1cm4gY2FzaCh0aGlzLmdldChpbmRleCkpO1xufTtcblxuZm4uZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVxKDApO1xufTtcblxuZm4ubGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZXEoLTEpO1xufTtcblxuZnVuY3Rpb24gZWFjaChhcnIsIGNhbGxiYWNrLCBfcmV2ZXJzZSkge1xuICBpZiAoX3JldmVyc2UpIHtcbiAgICB2YXIgaSA9IGFyci5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChhcnJbaV0sIGksIGFycltpXSkgPT09IGZhbHNlKSByZXR1cm4gYXJyO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFycikpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFycik7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltrZXldLCBrZXksIGFycltrZXldKSA9PT0gZmFsc2UpIHJldHVybiBhcnI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoYXJyW2ldLCBpLCBhcnJbaV0pID09PSBmYWxzZSkgcmV0dXJuIGFycjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYXJyO1xufVxuXG5jYXNoLmVhY2ggPSBlYWNoO1xuXG5mbi5lYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHJldHVybiBlYWNoKHRoaXMsIGNhbGxiYWNrKTtcbn07XG5cbmZuLnByb3AgPSBmdW5jdGlvbiAocHJvcCwgdmFsdWUpIHtcbiAgaWYgKCFwcm9wKSByZXR1cm47XG5cbiAgaWYgKGlzU3RyaW5nKHByb3ApKSB7XG4gICAgcHJvcCA9IHByb3BNYXBbcHJvcF0gfHwgcHJvcDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiB0aGlzWzBdICYmIHRoaXNbMF1bcHJvcF07XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBlbGVbcHJvcF0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wKSB7XG4gICAgdGhpcy5wcm9wKGtleSwgcHJvcFtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4ucmVtb3ZlUHJvcCA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGRlbGV0ZSBlbGVbcHJvcE1hcFtwcm9wXSB8fCBwcm9wXTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBzb3VyY2VzID0gW107XG5cbiAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICBzb3VyY2VzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gIH1cblxuICB2YXIgZGVlcCA9IGlzQm9vbGVhbihzb3VyY2VzWzBdKSA/IHNvdXJjZXMuc2hpZnQoKSA6IGZhbHNlLFxuICAgICAgdGFyZ2V0ID0gc291cmNlcy5zaGlmdCgpLFxuICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGg7XG4gIGlmICghdGFyZ2V0KSByZXR1cm4ge307XG4gIGlmICghbGVuZ3RoKSByZXR1cm4gZXh0ZW5kKGRlZXAsIGNhc2gsIHRhcmdldCk7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKGRlZXAgJiYgKGlzQXJyYXkoc291cmNlW2tleV0pIHx8IGlzUGxhaW5PYmplY3Qoc291cmNlW2tleV0pKSkge1xuICAgICAgICBpZiAoIXRhcmdldFtrZXldIHx8IHRhcmdldFtrZXldLmNvbnN0cnVjdG9yICE9PSBzb3VyY2Vba2V5XS5jb25zdHJ1Y3RvcikgdGFyZ2V0W2tleV0gPSBuZXcgc291cmNlW2tleV0uY29uc3RydWN0b3IoKTtcbiAgICAgICAgZXh0ZW5kKGRlZXAsIHRhcmdldFtrZXldLCBzb3VyY2Vba2V5XSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbmNhc2guZXh0ZW5kID0gZXh0ZW5kO1xuXG5mbi5leHRlbmQgPSBmdW5jdGlvbiAocGx1Z2lucykge1xuICByZXR1cm4gZXh0ZW5kKGZuLCBwbHVnaW5zKTtcbn07IC8vIEByZXF1aXJlIC4vbWF0Y2hlcy50c1xuLy8gQHJlcXVpcmUgLi90eXBlX2NoZWNraW5nLnRzXG5cblxuZnVuY3Rpb24gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIGlzU3RyaW5nKGNvbXBhcmF0b3IpID8gZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBtYXRjaGVzKGVsZSwgY29tcGFyYXRvcik7XG4gIH0gOiBpc0Z1bmN0aW9uKGNvbXBhcmF0b3IpID8gY29tcGFyYXRvciA6IGlzQ2FzaChjb21wYXJhdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gY29tcGFyYXRvci5pcyhlbGUpO1xuICB9IDogIWNvbXBhcmF0b3IgPyBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9IDogZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUgPT09IGNvbXBhcmF0b3I7XG4gIH07XG59XG5cbmZuLmZpbHRlciA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHZhciBjb21wYXJlID0gZ2V0Q29tcGFyZUZ1bmN0aW9uKGNvbXBhcmF0b3IpO1xuICByZXR1cm4gY2FzaChmaWx0ZXIuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlLCBpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pKTtcbn07IC8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLnRzXG5cblxuZnVuY3Rpb24gZmlsdGVyZWQoY29sbGVjdGlvbiwgY29tcGFyYXRvcikge1xuICByZXR1cm4gIWNvbXBhcmF0b3IgPyBjb2xsZWN0aW9uIDogY29sbGVjdGlvbi5maWx0ZXIoY29tcGFyYXRvcik7XG59IC8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuXG5cbnZhciBzcGxpdFZhbHVlc1JlID0gL1xcUysvZztcblxuZnVuY3Rpb24gZ2V0U3BsaXRWYWx1ZXMoc3RyKSB7XG4gIHJldHVybiBpc1N0cmluZyhzdHIpID8gc3RyLm1hdGNoKHNwbGl0VmFsdWVzUmUpIHx8IFtdIDogW107XG59XG5cbmZuLmhhc0NsYXNzID0gZnVuY3Rpb24gKGNscykge1xuICByZXR1cm4gISFjbHMgJiYgc29tZS5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gaXNFbGVtZW50KGVsZSkgJiYgZWxlLmNsYXNzTGlzdC5jb250YWlucyhjbHMpO1xuICB9KTtcbn07XG5cbmZuLnJlbW92ZUF0dHIgPSBmdW5jdGlvbiAoYXR0cikge1xuICB2YXIgYXR0cnMgPSBnZXRTcGxpdFZhbHVlcyhhdHRyKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVhY2goYXR0cnMsIGZ1bmN0aW9uIChpLCBhKSB7XG4gICAgICBlbGUucmVtb3ZlQXR0cmlidXRlKGEpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGF0dHIoYXR0ciwgdmFsdWUpIHtcbiAgaWYgKCFhdHRyKSByZXR1cm47XG5cbiAgaWYgKGlzU3RyaW5nKGF0dHIpKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBpZiAoIXRoaXNbMF0gfHwgIWlzRWxlbWVudCh0aGlzWzBdKSkgcmV0dXJuO1xuICAgICAgdmFyIHZhbHVlXzEgPSB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRyKTtcbiAgICAgIHJldHVybiBpc051bGwodmFsdWVfMSkgPyB1bmRlZmluZWQgOiB2YWx1ZV8xO1xuICAgIH1cblxuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiB0aGlzO1xuICAgIGlmIChpc051bGwodmFsdWUpKSByZXR1cm4gdGhpcy5yZW1vdmVBdHRyKGF0dHIpO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgICAgZWxlLnNldEF0dHJpYnV0ZShhdHRyLCB2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gYXR0cikge1xuICAgIHRoaXMuYXR0cihrZXksIGF0dHJba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cblxuZm4uYXR0ciA9IGF0dHI7XG5cbmZuLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24gKGNscywgZm9yY2UpIHtcbiAgdmFyIGNsYXNzZXMgPSBnZXRTcGxpdFZhbHVlcyhjbHMpLFxuICAgICAgaXNGb3JjZSA9ICFpc1VuZGVmaW5lZChmb3JjZSk7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChpLCBjKSB7XG4gICAgICBpZiAoaXNGb3JjZSkge1xuICAgICAgICBmb3JjZSA/IGVsZS5jbGFzc0xpc3QuYWRkKGMpIDogZWxlLmNsYXNzTGlzdC5yZW1vdmUoYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuY2xhc3NMaXN0LnRvZ2dsZShjKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mbi5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlQ2xhc3MoY2xzLCB0cnVlKTtcbn07XG5cbmZuLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24gKGNscykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMudG9nZ2xlQ2xhc3MoY2xzLCBmYWxzZSk7XG4gIHJldHVybiB0aGlzLmF0dHIoJ2NsYXNzJywgJycpO1xufTtcblxuZnVuY3Rpb24gcGx1Y2soYXJyLCBwcm9wLCBkZWVwLCB1bnRpbCkge1xuICB2YXIgcGx1Y2tlZCA9IFtdLFxuICAgICAgaXNDYWxsYmFjayA9IGlzRnVuY3Rpb24ocHJvcCksXG4gICAgICBjb21wYXJlID0gdW50aWwgJiYgZ2V0Q29tcGFyZUZ1bmN0aW9uKHVudGlsKTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoaXNDYWxsYmFjaykge1xuICAgICAgdmFyIHZhbF8xID0gcHJvcChhcnJbaV0pO1xuICAgICAgaWYgKHZhbF8xLmxlbmd0aCkgcHVzaC5hcHBseShwbHVja2VkLCB2YWxfMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2YWxfMiA9IGFycltpXVtwcm9wXTtcblxuICAgICAgd2hpbGUgKHZhbF8yICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHVudGlsICYmIGNvbXBhcmUoLTEsIHZhbF8yKSkgYnJlYWs7XG4gICAgICAgIHBsdWNrZWQucHVzaCh2YWxfMik7XG4gICAgICAgIHZhbF8yID0gZGVlcCA/IHZhbF8yW3Byb3BdIDogbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGx1Y2tlZDtcbn1cblxuZnVuY3Rpb24gdW5pcXVlKGFycikge1xuICByZXR1cm4gYXJyLmxlbmd0aCA+IDEgPyBmaWx0ZXIuY2FsbChhcnIsIGZ1bmN0aW9uIChpdGVtLCBpbmRleCwgc2VsZikge1xuICAgIHJldHVybiBpbmRleE9mLmNhbGwoc2VsZiwgaXRlbSkgPT09IGluZGV4O1xuICB9KSA6IGFycjtcbn1cblxuY2FzaC51bmlxdWUgPSB1bmlxdWU7XG5cbmZuLmFkZCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCkge1xuICByZXR1cm4gY2FzaCh1bmlxdWUodGhpcy5nZXQoKS5jb25jYXQoY2FzaChzZWxlY3RvciwgY29udGV4dCkuZ2V0KCkpKSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL3R5cGVfY2hlY2tpbmcudHNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLnRzXG5cblxuZnVuY3Rpb24gY29tcHV0ZVN0eWxlKGVsZSwgcHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gIHZhciBzdHlsZSA9IHdpbi5nZXRDb21wdXRlZFN0eWxlKGVsZSwgbnVsbCk7XG4gIHJldHVybiBpc1ZhcmlhYmxlID8gc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKSB8fCB1bmRlZmluZWQgOiBzdHlsZVtwcm9wXSB8fCBlbGUuc3R5bGVbcHJvcF07XG59IC8vIEByZXF1aXJlIC4vY29tcHV0ZV9zdHlsZS50c1xuXG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZUludChlbGUsIHByb3ApIHtcbiAgcmV0dXJuIHBhcnNlSW50KGNvbXB1dGVTdHlsZShlbGUsIHByb3ApLCAxMCkgfHwgMDtcbn1cblxudmFyIGNzc1ZhcmlhYmxlUmUgPSAvXi0tLzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gaXNDU1NWYXJpYWJsZShwcm9wKSB7XG4gIHJldHVybiBjc3NWYXJpYWJsZVJlLnRlc3QocHJvcCk7XG59IC8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuLy8gQHJlcXVpcmUgY29yZS9jYXNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL2VhY2gudHNcbi8vIEByZXF1aXJlIGNvcmUvdmFyaWFibGVzLnRzXG4vLyBAcmVxdWlyZSAuL2lzX2Nzc192YXJpYWJsZS50c1xuXG5cbnZhciBwcmVmaXhlZFByb3BzID0ge30sXG4gICAgc3R5bGUgPSBkaXYuc3R5bGUsXG4gICAgdmVuZG9yc1ByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ21zJ107XG5cbmZ1bmN0aW9uIGdldFByZWZpeGVkUHJvcChwcm9wLCBpc1ZhcmlhYmxlKSB7XG4gIGlmIChpc1ZhcmlhYmxlID09PSB2b2lkIDApIHtcbiAgICBpc1ZhcmlhYmxlID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgfVxuXG4gIGlmIChpc1ZhcmlhYmxlKSByZXR1cm4gcHJvcDtcblxuICBpZiAoIXByZWZpeGVkUHJvcHNbcHJvcF0pIHtcbiAgICB2YXIgcHJvcENDID0gY2FtZWxDYXNlKHByb3ApLFxuICAgICAgICBwcm9wVUMgPSBcIlwiICsgcHJvcENDWzBdLnRvVXBwZXJDYXNlKCkgKyBwcm9wQ0Muc2xpY2UoMSksXG4gICAgICAgIHByb3BzID0gKHByb3BDQyArIFwiIFwiICsgdmVuZG9yc1ByZWZpeGVzLmpvaW4ocHJvcFVDICsgXCIgXCIpICsgcHJvcFVDKS5zcGxpdCgnICcpO1xuICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChpLCBwKSB7XG4gICAgICBpZiAocCBpbiBzdHlsZSkge1xuICAgICAgICBwcmVmaXhlZFByb3BzW3Byb3BdID0gcDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHByZWZpeGVkUHJvcHNbcHJvcF07XG59XG5cbjsgLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLnRzXG4vLyBAcmVxdWlyZSAuL2lzX2Nzc192YXJpYWJsZS50c1xuXG52YXIgbnVtZXJpY1Byb3BzID0ge1xuICBhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcbiAgY29sdW1uQ291bnQ6IHRydWUsXG4gIGZsZXhHcm93OiB0cnVlLFxuICBmbGV4U2hyaW5rOiB0cnVlLFxuICBmb250V2VpZ2h0OiB0cnVlLFxuICBncmlkQXJlYTogdHJ1ZSxcbiAgZ3JpZENvbHVtbjogdHJ1ZSxcbiAgZ3JpZENvbHVtbkVuZDogdHJ1ZSxcbiAgZ3JpZENvbHVtblN0YXJ0OiB0cnVlLFxuICBncmlkUm93OiB0cnVlLFxuICBncmlkUm93RW5kOiB0cnVlLFxuICBncmlkUm93U3RhcnQ6IHRydWUsXG4gIGxpbmVIZWlnaHQ6IHRydWUsXG4gIG9wYWNpdHk6IHRydWUsXG4gIG9yZGVyOiB0cnVlLFxuICBvcnBoYW5zOiB0cnVlLFxuICB3aWRvd3M6IHRydWUsXG4gIHpJbmRleDogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wLCB2YWx1ZSwgaXNWYXJpYWJsZSkge1xuICBpZiAoaXNWYXJpYWJsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNWYXJpYWJsZSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gIH1cblxuICByZXR1cm4gIWlzVmFyaWFibGUgJiYgIW51bWVyaWNQcm9wc1twcm9wXSAmJiBpc051bWVyaWModmFsdWUpID8gdmFsdWUgKyBcInB4XCIgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY3NzKHByb3AsIHZhbHVlKSB7XG4gIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgIHZhciBpc1ZhcmlhYmxlXzEgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICAgIHByb3AgPSBnZXRQcmVmaXhlZFByb3AocHJvcCwgaXNWYXJpYWJsZV8xKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiB0aGlzWzBdICYmIGNvbXB1dGVTdHlsZSh0aGlzWzBdLCBwcm9wLCBpc1ZhcmlhYmxlXzEpO1xuICAgIGlmICghcHJvcCkgcmV0dXJuIHRoaXM7XG4gICAgdmFsdWUgPSBnZXRTdWZmaXhlZFZhbHVlKHByb3AsIHZhbHVlLCBpc1ZhcmlhYmxlXzEpO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuXG4gICAgICBpZiAoaXNWYXJpYWJsZV8xKSB7XG4gICAgICAgIGVsZS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuc3R5bGVbcHJvcF0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wKSB7XG4gICAgdGhpcy5jc3Moa2V5LCBwcm9wW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbjtcbmZuLmNzcyA9IGNzczsgLy8gQG9wdGlvbmFsIC4vY3NzLnRzXG4vLyBAcmVxdWlyZSBjb3JlL2F0dGVtcHQudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuXG52YXIgSlNPTlN0cmluZ1JlID0gL15cXHMrfFxccyskLztcblxuZnVuY3Rpb24gZ2V0RGF0YShlbGUsIGtleSkge1xuICB2YXIgdmFsdWUgPSBlbGUuZGF0YXNldFtrZXldIHx8IGVsZS5kYXRhc2V0W2NhbWVsQ2FzZShrZXkpXTtcbiAgaWYgKEpTT05TdHJpbmdSZS50ZXN0KHZhbHVlKSkgcmV0dXJuIHZhbHVlO1xuICByZXR1cm4gYXR0ZW1wdChKU09OLnBhcnNlLCB2YWx1ZSk7XG59IC8vIEByZXF1aXJlIGNvcmUvYXR0ZW1wdC50c1xuLy8gQHJlcXVpcmUgY29yZS9jYW1lbF9jYXNlLnRzXG5cblxuZnVuY3Rpb24gc2V0RGF0YShlbGUsIGtleSwgdmFsdWUpIHtcbiAgdmFsdWUgPSBhdHRlbXB0KEpTT04uc3RyaW5naWZ5LCB2YWx1ZSk7XG4gIGVsZS5kYXRhc2V0W2NhbWVsQ2FzZShrZXkpXSA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBkYXRhKG5hbWUsIHZhbHVlKSB7XG4gIGlmICghbmFtZSkge1xuICAgIGlmICghdGhpc1swXSkgcmV0dXJuO1xuICAgIHZhciBkYXRhcyA9IHt9O1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXNbMF0uZGF0YXNldCkge1xuICAgICAgZGF0YXNba2V5XSA9IGdldERhdGEodGhpc1swXSwga2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YXM7XG4gIH1cblxuICBpZiAoaXNTdHJpbmcobmFtZSkpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiB0aGlzWzBdICYmIGdldERhdGEodGhpc1swXSwgbmFtZSk7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuIHRoaXM7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBzZXREYXRhKGVsZSwgbmFtZSwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIG5hbWUpIHtcbiAgICB0aGlzLmRhdGEoa2V5LCBuYW1lW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZuLmRhdGEgPSBkYXRhOyAvLyBAb3B0aW9uYWwgLi9kYXRhLnRzXG5cbmZ1bmN0aW9uIGdldERvY3VtZW50RGltZW5zaW9uKGRvYywgZGltZW5zaW9uKSB7XG4gIHZhciBkb2NFbGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICByZXR1cm4gTWF0aC5tYXgoZG9jLmJvZHlbXCJzY3JvbGxcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcInNjcm9sbFwiICsgZGltZW5zaW9uXSwgZG9jLmJvZHlbXCJvZmZzZXRcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcIm9mZnNldFwiICsgZGltZW5zaW9uXSwgZG9jRWxlW1wiY2xpZW50XCIgKyBkaW1lbnNpb25dKTtcbn0gLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZV9pbnQudHNcblxuXG5mdW5jdGlvbiBnZXRFeHRyYVNwYWNlKGVsZSwgeEF4aXMpIHtcbiAgcmV0dXJuIGNvbXB1dGVTdHlsZUludChlbGUsIFwiYm9yZGVyXCIgKyAoeEF4aXMgPyAnTGVmdCcgOiAnVG9wJykgKyBcIldpZHRoXCIpICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgXCJwYWRkaW5nXCIgKyAoeEF4aXMgPyAnTGVmdCcgOiAnVG9wJykpICsgY29tcHV0ZVN0eWxlSW50KGVsZSwgXCJwYWRkaW5nXCIgKyAoeEF4aXMgPyAnUmlnaHQnIDogJ0JvdHRvbScpKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwiYm9yZGVyXCIgKyAoeEF4aXMgPyAnUmlnaHQnIDogJ0JvdHRvbScpICsgXCJXaWR0aFwiKTtcbn1cblxuZWFjaChbdHJ1ZSwgZmFsc2VdLCBmdW5jdGlvbiAoaSwgb3V0ZXIpIHtcbiAgZWFjaChbJ1dpZHRoJywgJ0hlaWdodCddLCBmdW5jdGlvbiAoaSwgcHJvcCkge1xuICAgIHZhciBuYW1lID0gXCJcIiArIChvdXRlciA/ICdvdXRlcicgOiAnaW5uZXInKSArIHByb3A7XG5cbiAgICBmbltuYW1lXSA9IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgaWYgKCF0aGlzWzBdKSByZXR1cm47XG4gICAgICBpZiAoaXNXaW5kb3codGhpc1swXSkpIHJldHVybiBvdXRlciA/IHRoaXNbMF1bXCJpbm5lclwiICsgcHJvcF0gOiB0aGlzWzBdLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtcImNsaWVudFwiICsgcHJvcF07XG4gICAgICBpZiAoaXNEb2N1bWVudCh0aGlzWzBdKSkgcmV0dXJuIGdldERvY3VtZW50RGltZW5zaW9uKHRoaXNbMF0sIHByb3ApO1xuICAgICAgcmV0dXJuIHRoaXNbMF1bXCJcIiArIChvdXRlciA/ICdvZmZzZXQnIDogJ2NsaWVudCcpICsgcHJvcF0gKyAoaW5jbHVkZU1hcmdpbnMgJiYgb3V0ZXIgPyBjb21wdXRlU3R5bGVJbnQodGhpc1swXSwgXCJtYXJnaW5cIiArIChpID8gJ1RvcCcgOiAnTGVmdCcpKSArIGNvbXB1dGVTdHlsZUludCh0aGlzWzBdLCBcIm1hcmdpblwiICsgKGkgPyAnQm90dG9tJyA6ICdSaWdodCcpKSA6IDApO1xuICAgIH07XG4gIH0pO1xufSk7XG5lYWNoKFsnV2lkdGgnLCAnSGVpZ2h0J10sIGZ1bmN0aW9uIChpbmRleCwgcHJvcCkge1xuICB2YXIgcHJvcExDID0gcHJvcC50b0xvd2VyQ2FzZSgpO1xuXG4gIGZuW3Byb3BMQ10gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgPyB1bmRlZmluZWQgOiB0aGlzO1xuXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBpZiAoaXNXaW5kb3codGhpc1swXSkpIHJldHVybiB0aGlzWzBdLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudFtcImNsaWVudFwiICsgcHJvcF07XG4gICAgICBpZiAoaXNEb2N1bWVudCh0aGlzWzBdKSkgcmV0dXJuIGdldERvY3VtZW50RGltZW5zaW9uKHRoaXNbMF0sIHByb3ApO1xuICAgICAgcmV0dXJuIHRoaXNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbcHJvcExDXSAtIGdldEV4dHJhU3BhY2UodGhpc1swXSwgIWluZGV4KTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVOdW1iZXIgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgICAgdmFyIGJveFNpemluZyA9IGNvbXB1dGVTdHlsZShlbGUsICdib3hTaXppbmcnKTtcbiAgICAgIGVsZS5zdHlsZVtwcm9wTENdID0gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wTEMsIHZhbHVlTnVtYmVyICsgKGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnID8gZ2V0RXh0cmFTcGFjZShlbGUsICFpbmRleCkgOiAwKSk7XG4gICAgfSk7XG4gIH07XG59KTsgLy8gQG9wdGlvbmFsIC4vaW5uZXJfb3V0ZXIudHNcbi8vIEBvcHRpb25hbCAuL25vcm1hbC50c1xuLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS50c1xuXG52YXIgZGVmYXVsdERpc3BsYXkgPSB7fTtcblxuZnVuY3Rpb24gZ2V0RGVmYXVsdERpc3BsYXkodGFnTmFtZSkge1xuICBpZiAoZGVmYXVsdERpc3BsYXlbdGFnTmFtZV0pIHJldHVybiBkZWZhdWx0RGlzcGxheVt0YWdOYW1lXTtcbiAgdmFyIGVsZSA9IGNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIGRvYy5ib2R5Lmluc2VydEJlZm9yZShlbGUsIG51bGwpO1xuICB2YXIgZGlzcGxheSA9IGNvbXB1dGVTdHlsZShlbGUsICdkaXNwbGF5Jyk7XG4gIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGVsZSk7XG4gIHJldHVybiBkZWZhdWx0RGlzcGxheVt0YWdOYW1lXSA9IGRpc3BsYXkgIT09ICdub25lJyA/IGRpc3BsYXkgOiAnYmxvY2snO1xufSAvLyBAcmVxdWlyZSBjc3MvaGVscGVycy9jb21wdXRlX3N0eWxlLnRzXG5cblxuZnVuY3Rpb24gaXNIaWRkZW4oZWxlKSB7XG4gIHJldHVybiBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpID09PSAnbm9uZSc7XG59XG5cbnZhciBkaXNwbGF5UHJvcGVydHkgPSAnX19fY2QnO1xuXG5mbi50b2dnbGUgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIHZhciBzaG93ID0gaXNVbmRlZmluZWQoZm9yY2UpID8gaXNIaWRkZW4oZWxlKSA6IGZvcmNlO1xuXG4gICAgaWYgKHNob3cpIHtcbiAgICAgIGVsZS5zdHlsZS5kaXNwbGF5ID0gZWxlW2Rpc3BsYXlQcm9wZXJ0eV0gfHwgJyc7XG5cbiAgICAgIGlmIChpc0hpZGRlbihlbGUpKSB7XG4gICAgICAgIGVsZS5zdHlsZS5kaXNwbGF5ID0gZ2V0RGVmYXVsdERpc3BsYXkoZWxlLnRhZ05hbWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVbZGlzcGxheVByb3BlcnR5XSA9IGNvbXB1dGVTdHlsZShlbGUsICdkaXNwbGF5Jyk7XG4gICAgICBlbGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG4gIH0pO1xufTtcblxuZm4uaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudG9nZ2xlKGZhbHNlKTtcbn07XG5cbmZuLnNob3cgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZSh0cnVlKTtcbn07IC8vIEBvcHRpb25hbCAuL2hpZGUudHNcbi8vIEBvcHRpb25hbCAuL3Nob3cudHNcbi8vIEBvcHRpb25hbCAuL3RvZ2dsZS50c1xuXG5cbmZ1bmN0aW9uIGhhc05hbWVzcGFjZXMobnMxLCBuczIpIHtcbiAgcmV0dXJuICFuczIgfHwgIXNvbWUuY2FsbChuczIsIGZ1bmN0aW9uIChucykge1xuICAgIHJldHVybiBuczEuaW5kZXhPZihucykgPCAwO1xuICB9KTtcbn1cblxudmFyIGV2ZW50c05hbWVzcGFjZSA9ICdfX19jZScsXG4gICAgZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvciA9ICcuJyxcbiAgICBldmVudHNGb2N1cyA9IHtcbiAgZm9jdXM6ICdmb2N1c2luJyxcbiAgYmx1cjogJ2ZvY3Vzb3V0J1xufSxcbiAgICBldmVudHNIb3ZlciA9IHtcbiAgbW91c2VlbnRlcjogJ21vdXNlb3ZlcicsXG4gIG1vdXNlbGVhdmU6ICdtb3VzZW91dCdcbn0sXG4gICAgZXZlbnRzTW91c2VSZSA9IC9eKG1vdXNlfHBvaW50ZXJ8Y29udGV4dG1lbnV8ZHJhZ3xkcm9wfGNsaWNrfGRibGNsaWNrKS9pOyAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5mdW5jdGlvbiBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lKSB7XG4gIHJldHVybiBldmVudHNIb3ZlcltuYW1lXSB8fCBldmVudHNGb2N1c1tuYW1lXSB8fCBuYW1lO1xufSAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGdldEV2ZW50c0NhY2hlKGVsZSkge1xuICByZXR1cm4gZWxlW2V2ZW50c05hbWVzcGFjZV0gPSBlbGVbZXZlbnRzTmFtZXNwYWNlXSB8fCB7fTtcbn0gLy8gQHJlcXVpcmUgY29yZS9ndWlkLnRzXG4vLyBAcmVxdWlyZSBldmVudHMvaGVscGVycy9nZXRfZXZlbnRzX2NhY2hlLnRzXG5cblxuZnVuY3Rpb24gYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGV2ZW50Q2FjaGUgPSBnZXRFdmVudHNDYWNoZShlbGUpO1xuICBldmVudENhY2hlW25hbWVdID0gZXZlbnRDYWNoZVtuYW1lXSB8fCBbXTtcbiAgZXZlbnRDYWNoZVtuYW1lXS5wdXNoKFtuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2tdKTtcbiAgZWxlLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgY2FsbGJhY2spO1xufSAvLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIHBhcnNlRXZlbnROYW1lKGV2ZW50TmFtZSkge1xuICB2YXIgcGFydHMgPSBldmVudE5hbWUuc3BsaXQoZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gIHJldHVybiBbcGFydHNbMF0sIHBhcnRzLnNsaWNlKDEpLnNvcnQoKV07IC8vIFtuYW1lLCBuYW1lc3BhY2VbXV1cbn0gLy8gQHJlcXVpcmUgLi9nZXRfZXZlbnRzX2NhY2hlLnRzXG4vLyBAcmVxdWlyZSAuL2hhc19uYW1lc3BhY2VzLnRzXG4vLyBAcmVxdWlyZSAuL3BhcnNlX2V2ZW50X25hbWUudHNcblxuXG5mdW5jdGlvbiByZW1vdmVFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgY2FjaGUgPSBnZXRFdmVudHNDYWNoZShlbGUpO1xuXG4gIGlmICghbmFtZSkge1xuICAgIGZvciAobmFtZSBpbiBjYWNoZSkge1xuICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjYWNoZVtuYW1lXSkge1xuICAgIGNhY2hlW25hbWVdID0gY2FjaGVbbmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChfYSkge1xuICAgICAgdmFyIG5zID0gX2FbMF0sXG4gICAgICAgICAgc2VsID0gX2FbMV0sXG4gICAgICAgICAgY2IgPSBfYVsyXTtcbiAgICAgIGlmIChjYWxsYmFjayAmJiBjYi5ndWlkICE9PSBjYWxsYmFjay5ndWlkIHx8ICFoYXNOYW1lc3BhY2VzKG5zLCBuYW1lc3BhY2VzKSB8fCBzZWxlY3RvciAmJiBzZWxlY3RvciAhPT0gc2VsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGVsZS5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGNiKTtcbiAgICB9KTtcbiAgfVxufVxuXG5mbi5vZmYgPSBmdW5jdGlvbiAoZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgaWYgKGlzVW5kZWZpbmVkKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkgJiYgIWlzRG9jdW1lbnQoZWxlKSAmJiAhaXNXaW5kb3coZWxlKSkgcmV0dXJuO1xuICAgICAgcmVtb3ZlRXZlbnQoZWxlKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICghaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdGhpcy5vZmYoa2V5LCBldmVudEZ1bGxOYW1lW2tleV0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3I7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH1cblxuICAgIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIGZ1bmN0aW9uIChpLCBldmVudEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgX2EgPSBwYXJzZUV2ZW50TmFtZShldmVudEZ1bGxOYW1lKSxcbiAgICAgICAgICBuYW1lT3JpZ2luYWwgPSBfYVswXSxcbiAgICAgICAgICBuYW1lc3BhY2VzID0gX2FbMV0sXG4gICAgICAgICAgbmFtZSA9IGdldEV2ZW50TmFtZUJ1YmJsaW5nKG5hbWVPcmlnaW5hbCk7XG5cbiAgICAgIF90aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcbiAgICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIG9uKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaywgX29uZSkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmICghaXNTdHJpbmcoZXZlbnRGdWxsTmFtZSkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdGhpcy5vbihrZXksIHNlbGVjdG9yLCBkYXRhLCBldmVudEZ1bGxOYW1lW2tleV0sIF9vbmUpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgaWYgKCFpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoc2VsZWN0b3IpIHx8IGlzTnVsbChzZWxlY3RvcikpIHtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfSBlbHNlIGlmIChpc1VuZGVmaW5lZChkYXRhKSkge1xuICAgICAgZGF0YSA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgICAgZGF0YSA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9XG4gIH1cblxuICBpZiAoIWlzRnVuY3Rpb24oY2FsbGJhY2spKSB7XG4gICAgY2FsbGJhY2sgPSBkYXRhO1xuICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgZWFjaChnZXRTcGxpdFZhbHVlcyhldmVudEZ1bGxOYW1lKSwgZnVuY3Rpb24gKGksIGV2ZW50RnVsbE5hbWUpIHtcbiAgICB2YXIgX2EgPSBwYXJzZUV2ZW50TmFtZShldmVudEZ1bGxOYW1lKSxcbiAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgIG5hbWVzcGFjZXMgPSBfYVsxXSxcbiAgICAgICAgbmFtZSA9IGdldEV2ZW50TmFtZUJ1YmJsaW5nKG5hbWVPcmlnaW5hbCksXG4gICAgICAgIGlzRXZlbnRIb3ZlciA9IG5hbWVPcmlnaW5hbCBpbiBldmVudHNIb3ZlcixcbiAgICAgICAgaXNFdmVudEZvY3VzID0gbmFtZU9yaWdpbmFsIGluIGV2ZW50c0ZvY3VzO1xuXG4gICAgaWYgKCFuYW1lKSByZXR1cm47XG5cbiAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkgJiYgIWlzRG9jdW1lbnQoZWxlKSAmJiAhaXNXaW5kb3coZWxlKSkgcmV0dXJuO1xuXG4gICAgICB2YXIgZmluYWxDYWxsYmFjayA9IGZ1bmN0aW9uIGZpbmFsQ2FsbGJhY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldFtcIl9fX2lcIiArIGV2ZW50LnR5cGVdKSByZXR1cm4gZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7IC8vIElnbm9yaW5nIG5hdGl2ZSBldmVudCBpbiBmYXZvciBvZiB0aGUgdXBjb21pbmcgY3VzdG9tIG9uZVxuXG4gICAgICAgIGlmIChldmVudC5uYW1lc3BhY2UgJiYgIWhhc05hbWVzcGFjZXMobmFtZXNwYWNlcywgZXZlbnQubmFtZXNwYWNlLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXNlbGVjdG9yICYmIChpc0V2ZW50Rm9jdXMgJiYgKGV2ZW50LnRhcmdldCAhPT0gZWxlIHx8IGV2ZW50Ll9fX290ID09PSBuYW1lKSB8fCBpc0V2ZW50SG92ZXIgJiYgZXZlbnQucmVsYXRlZFRhcmdldCAmJiBlbGUuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpKSByZXR1cm47XG4gICAgICAgIHZhciB0aGlzQXJnID0gZWxlO1xuXG4gICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICB3aGlsZSAoIW1hdGNoZXModGFyZ2V0LCBzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXNBcmcgPSB0YXJnZXQ7XG4gICAgICAgICAgZXZlbnQuX19fY2QgPSB0cnVlOyAvLyBEZWxlZ2F0ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50Ll9fX2NkKSB7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV2ZW50LCAnY3VycmVudFRhcmdldCcsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc0FyZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2RhdGEnLCB7XG4gICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gY2FsbGJhY2suY2FsbCh0aGlzQXJnLCBldmVudCwgZXZlbnQuX19fdGQpO1xuXG4gICAgICAgIGlmIChfb25lKSB7XG4gICAgICAgICAgcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgZmluYWxDYWxsYmFjayk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV0dXJuVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmluYWxDYWxsYmFjay5ndWlkID0gY2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrLmd1aWQgfHwgY2FzaC5ndWlkKys7XG4gICAgICBhZGRFdmVudChlbGUsIG5hbWUsIG5hbWVzcGFjZXMsIHNlbGVjdG9yLCBmaW5hbENhbGxiYWNrKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5mbi5vbiA9IG9uO1xuXG5mdW5jdGlvbiBvbmUoZXZlbnRGdWxsTmFtZSwgc2VsZWN0b3IsIGRhdGEsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB0aGlzLm9uKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaywgdHJ1ZSk7XG59XG5cbjtcbmZuLm9uZSA9IG9uZTtcblxuZm4ucmVhZHkgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgdmFyIGNiID0gZnVuY3Rpb24gY2IoKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDAsIGNhc2gpO1xuICB9O1xuXG4gIGlmIChkb2MucmVhZHlTdGF0ZSAhPT0gJ2xvYWRpbmcnKSB7XG4gICAgY2IoKTtcbiAgfSBlbHNlIHtcbiAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4udHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICBpZiAoaXNTdHJpbmcoZXZlbnQpKSB7XG4gICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnQpLFxuICAgICAgICBuYW1lT3JpZ2luYWwgPSBfYVswXSxcbiAgICAgICAgbmFtZXNwYWNlcyA9IF9hWzFdLFxuICAgICAgICBuYW1lXzEgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpO1xuXG4gICAgaWYgKCFuYW1lXzEpIHJldHVybiB0aGlzO1xuICAgIHZhciB0eXBlID0gZXZlbnRzTW91c2VSZS50ZXN0KG5hbWVfMSkgPyAnTW91c2VFdmVudHMnIDogJ0hUTUxFdmVudHMnO1xuICAgIGV2ZW50ID0gZG9jLmNyZWF0ZUV2ZW50KHR5cGUpO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lXzEsIHRydWUsIHRydWUpO1xuICAgIGV2ZW50Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuam9pbihldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKTtcbiAgICBldmVudC5fX19vdCA9IG5hbWVPcmlnaW5hbDtcbiAgfVxuXG4gIGV2ZW50Ll9fX3RkID0gZGF0YTtcbiAgdmFyIGlzRXZlbnRGb2N1cyA9IGV2ZW50Ll9fX290IGluIGV2ZW50c0ZvY3VzO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoaXNFdmVudEZvY3VzICYmIGlzRnVuY3Rpb24oZWxlW2V2ZW50Ll9fX290XSkpIHtcbiAgICAgIGVsZVtcIl9fX2lcIiArIGV2ZW50LnR5cGVdID0gdHJ1ZTsgLy8gRW5zdXJpbmcgdGhlIG5hdGl2ZSBldmVudCBpcyBpZ25vcmVkXG5cbiAgICAgIGVsZVtldmVudC5fX19vdF0oKTtcblxuICAgICAgZWxlW1wiX19faVwiICsgZXZlbnQudHlwZV0gPSBmYWxzZTsgLy8gRW5zdXJpbmcgdGhlIGN1c3RvbSBldmVudCBpcyBub3QgaWdub3JlZFxuICAgIH1cblxuICAgIGVsZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfSk7XG59OyAvLyBAb3B0aW9uYWwgLi9vZmYudHNcbi8vIEBvcHRpb25hbCAuL29uLnRzXG4vLyBAb3B0aW9uYWwgLi9vbmUudHNcbi8vIEBvcHRpb25hbCAuL3JlYWR5LnRzXG4vLyBAb3B0aW9uYWwgLi90cmlnZ2VyLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3BsdWNrLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGdldFZhbHVlKGVsZSkge1xuICBpZiAoZWxlLm11bHRpcGxlICYmIGVsZS5vcHRpb25zKSByZXR1cm4gcGx1Y2soZmlsdGVyLmNhbGwoZWxlLm9wdGlvbnMsIGZ1bmN0aW9uIChvcHRpb24pIHtcbiAgICByZXR1cm4gb3B0aW9uLnNlbGVjdGVkICYmICFvcHRpb24uZGlzYWJsZWQgJiYgIW9wdGlvbi5wYXJlbnROb2RlLmRpc2FibGVkO1xuICB9KSwgJ3ZhbHVlJyk7XG4gIHJldHVybiBlbGUudmFsdWUgfHwgJyc7XG59XG5cbnZhciBxdWVyeUVuY29kZVNwYWNlUmUgPSAvJTIwL2csXG4gICAgcXVlcnlFbmNvZGVDUkxGUmUgPSAvXFxyP1xcbi9nO1xuXG5mdW5jdGlvbiBxdWVyeUVuY29kZShwcm9wLCB2YWx1ZSkge1xuICByZXR1cm4gXCImXCIgKyBlbmNvZGVVUklDb21wb25lbnQocHJvcCkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZS5yZXBsYWNlKHF1ZXJ5RW5jb2RlQ1JMRlJlLCAnXFxyXFxuJykpLnJlcGxhY2UocXVlcnlFbmNvZGVTcGFjZVJlLCAnKycpO1xufVxuXG52YXIgc2tpcHBhYmxlUmUgPSAvZmlsZXxyZXNldHxzdWJtaXR8YnV0dG9ufGltYWdlL2ksXG4gICAgY2hlY2thYmxlUmUgPSAvcmFkaW98Y2hlY2tib3gvaTtcblxuZm4uc2VyaWFsaXplID0gZnVuY3Rpb24gKCkge1xuICB2YXIgcXVlcnkgPSAnJztcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBlYWNoKGVsZS5lbGVtZW50cyB8fCBbZWxlXSwgZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgaWYgKGVsZS5kaXNhYmxlZCB8fCAhZWxlLm5hbWUgfHwgZWxlLnRhZ05hbWUgPT09ICdGSUVMRFNFVCcgfHwgc2tpcHBhYmxlUmUudGVzdChlbGUudHlwZSkgfHwgY2hlY2thYmxlUmUudGVzdChlbGUudHlwZSkgJiYgIWVsZS5jaGVja2VkKSByZXR1cm47XG4gICAgICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShlbGUpO1xuXG4gICAgICBpZiAoIWlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgICAgICB2YXIgdmFsdWVzID0gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG4gICAgICAgIGVhY2godmFsdWVzLCBmdW5jdGlvbiAoaSwgdmFsdWUpIHtcbiAgICAgICAgICBxdWVyeSArPSBxdWVyeUVuY29kZShlbGUubmFtZSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBxdWVyeS5zbGljZSgxKTtcbn07XG5cbmZ1bmN0aW9uIHZhbCh2YWx1ZSkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzWzBdICYmIGdldFZhbHVlKHRoaXNbMF0pO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgaXNTZWxlY3QgPSBlbGUubXVsdGlwbGUgJiYgZWxlLm9wdGlvbnM7XG5cbiAgICBpZiAoaXNTZWxlY3QgfHwgY2hlY2thYmxlUmUudGVzdChlbGUudHlwZSkpIHtcbiAgICAgIHZhciBlbGVWYWx1ZV8xID0gaXNBcnJheSh2YWx1ZSkgPyBtYXAuY2FsbCh2YWx1ZSwgU3RyaW5nKSA6IGlzTnVsbCh2YWx1ZSkgPyBbXSA6IFtTdHJpbmcodmFsdWUpXTtcblxuICAgICAgaWYgKGlzU2VsZWN0KSB7XG4gICAgICAgIGVhY2goZWxlLm9wdGlvbnMsIGZ1bmN0aW9uIChpLCBvcHRpb24pIHtcbiAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSBlbGVWYWx1ZV8xLmluZGV4T2Yob3B0aW9uLnZhbHVlKSA+PSAwO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZS5jaGVja2VkID0gZWxlVmFsdWVfMS5pbmRleE9mKGVsZS52YWx1ZSkgPj0gMDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlLnZhbHVlID0gaXNVbmRlZmluZWQodmFsdWUpIHx8IGlzTnVsbCh2YWx1ZSkgPyAnJyA6IHZhbHVlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZuLnZhbCA9IHZhbDtcblxuZm4uY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jbG9uZU5vZGUodHJ1ZSk7XG4gIH0pO1xufTtcblxuZm4uZGV0YWNoID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgZmlsdGVyZWQodGhpcywgY29tcGFyYXRvcikuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGVsZS5wYXJlbnROb2RlKSB7XG4gICAgICBlbGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxudmFyIGZyYWdtZW50UmUgPSAvXlxccyo8KFxcdyspW14+XSo+LyxcbiAgICBzaW5nbGVUYWdSZSA9IC9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+KT8kLztcbnZhciBjb250YWluZXJzID0ge1xuICAnKic6IGRpdixcbiAgdHI6IHRib2R5LFxuICB0ZDogdHIsXG4gIHRoOiB0cixcbiAgdGhlYWQ6IHRhYmxlLFxuICB0Ym9keTogdGFibGUsXG4gIHRmb290OiB0YWJsZVxufTsgLy9UT0RPOiBDcmVhdGUgZWxlbWVudHMgaW5zaWRlIGEgZG9jdW1lbnQgZnJhZ21lbnQsIGluIG9yZGVyIHRvIHByZXZlbnQgaW5saW5lIGV2ZW50IGhhbmRsZXJzIGZyb20gZmlyaW5nXG4vL1RPRE86IEVuc3VyZSB0aGUgY3JlYXRlZCBlbGVtZW50cyBoYXZlIHRoZSBmcmFnbWVudCBhcyB0aGVpciBwYXJlbnQgaW5zdGVhZCBvZiBudWxsLCB0aGlzIGFsc28gZW5zdXJlcyB3ZSBjYW4gZGVhbCB3aXRoIGRldGF0Y2hlZCBub2RlcyBtb3JlIHJlbGlhYmx5XG5cbmZ1bmN0aW9uIHBhcnNlSFRNTChodG1sKSB7XG4gIGlmICghaXNTdHJpbmcoaHRtbCkpIHJldHVybiBbXTtcbiAgaWYgKHNpbmdsZVRhZ1JlLnRlc3QoaHRtbCkpIHJldHVybiBbY3JlYXRlRWxlbWVudChSZWdFeHAuJDEpXTtcbiAgdmFyIGZyYWdtZW50ID0gZnJhZ21lbnRSZS50ZXN0KGh0bWwpICYmIFJlZ0V4cC4kMSxcbiAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lcnNbZnJhZ21lbnRdIHx8IGNvbnRhaW5lcnNbJyonXTtcbiAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gIHJldHVybiBjYXNoKGNvbnRhaW5lci5jaGlsZE5vZGVzKS5kZXRhY2goKS5nZXQoKTtcbn1cblxuY2FzaC5wYXJzZUhUTUwgPSBwYXJzZUhUTUw7XG5cbmZuLmVtcHR5ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB3aGlsZSAoZWxlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGVsZS5yZW1vdmVDaGlsZChlbGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGh0bWwoaHRtbCkge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzWzBdICYmIHRoaXNbMF0uaW5uZXJIVE1MO1xuICBpZiAoaXNVbmRlZmluZWQoaHRtbCkpIHJldHVybiB0aGlzO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWxlLmlubmVySFRNTCA9IGh0bWw7XG4gIH0pO1xufVxuXG5mbi5odG1sID0gaHRtbDtcblxuZm4ucmVtb3ZlID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgZmlsdGVyZWQodGhpcywgY29tcGFyYXRvcikuZGV0YWNoKCkub2ZmKCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gdGV4dCh0ZXh0KSB7XG4gIGlmIChpc1VuZGVmaW5lZCh0ZXh0KSkgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLnRleHRDb250ZW50IDogJyc7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlbGUudGV4dENvbnRlbnQgPSB0ZXh0O1xuICB9KTtcbn1cblxuO1xuZm4udGV4dCA9IHRleHQ7XG5cbmZuLnVud3JhcCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wYXJlbnQoKS5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoZWxlLnRhZ05hbWUgPT09ICdCT0RZJykgcmV0dXJuO1xuICAgIHZhciAkZWxlID0gY2FzaChlbGUpO1xuICAgICRlbGUucmVwbGFjZVdpdGgoJGVsZS5jaGlsZHJlbigpKTtcbiAgfSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuZm4ub2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWxlID0gdGhpc1swXTtcbiAgaWYgKCFlbGUpIHJldHVybjtcbiAgdmFyIHJlY3QgPSBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgdG9wOiByZWN0LnRvcCArIHdpbi5wYWdlWU9mZnNldCxcbiAgICBsZWZ0OiByZWN0LmxlZnQgKyB3aW4ucGFnZVhPZmZzZXRcbiAgfTtcbn07XG5cbmZuLm9mZnNldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlLm9mZnNldFBhcmVudDtcblxuICAgIHdoaWxlIChvZmZzZXRQYXJlbnQgJiYgY29tcHV0ZVN0eWxlKG9mZnNldFBhcmVudCwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZG9jRWxlO1xuICB9KTtcbn07XG5cbmZuLnBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZWxlID0gdGhpc1swXTtcbiAgaWYgKCFlbGUpIHJldHVybjtcbiAgdmFyIGlzRml4ZWQgPSBjb21wdXRlU3R5bGUoZWxlLCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJyxcbiAgICAgIG9mZnNldCA9IGlzRml4ZWQgPyBlbGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiB0aGlzLm9mZnNldCgpO1xuXG4gIGlmICghaXNGaXhlZCkge1xuICAgIHZhciBkb2NfMSA9IGVsZS5vd25lckRvY3VtZW50O1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBlbGUub2Zmc2V0UGFyZW50IHx8IGRvY18xLmRvY3VtZW50RWxlbWVudDtcblxuICAgIHdoaWxlICgob2Zmc2V0UGFyZW50ID09PSBkb2NfMS5ib2R5IHx8IG9mZnNldFBhcmVudCA9PT0gZG9jXzEuZG9jdW1lbnRFbGVtZW50KSAmJiBjb21wdXRlU3R5bGUob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudC5wYXJlbnROb2RlO1xuICAgIH1cblxuICAgIGlmIChvZmZzZXRQYXJlbnQgIT09IGVsZSAmJiBpc0VsZW1lbnQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgdmFyIHBhcmVudE9mZnNldCA9IGNhc2gob2Zmc2V0UGFyZW50KS5vZmZzZXQoKTtcbiAgICAgIG9mZnNldC50b3AgLT0gcGFyZW50T2Zmc2V0LnRvcCArIGNvbXB1dGVTdHlsZUludChvZmZzZXRQYXJlbnQsICdib3JkZXJUb3BXaWR0aCcpO1xuICAgICAgb2Zmc2V0LmxlZnQgLT0gcGFyZW50T2Zmc2V0LmxlZnQgKyBjb21wdXRlU3R5bGVJbnQob2Zmc2V0UGFyZW50LCAnYm9yZGVyTGVmdFdpZHRoJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IG9mZnNldC50b3AgLSBjb21wdXRlU3R5bGVJbnQoZWxlLCAnbWFyZ2luVG9wJyksXG4gICAgbGVmdDogb2Zmc2V0LmxlZnQgLSBjb21wdXRlU3R5bGVJbnQoZWxlLCAnbWFyZ2luTGVmdCcpXG4gIH07XG59O1xuXG5mbi5jaGlsZHJlbiA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jaGlsZHJlbjtcbiAgfSkpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5jb250ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHBsdWNrKHRoaXMsIGZ1bmN0aW9uIChlbGUpIHtcbiAgICByZXR1cm4gZWxlLnRhZ05hbWUgPT09ICdJRlJBTUUnID8gW2VsZS5jb250ZW50RG9jdW1lbnRdIDogZWxlLnRhZ05hbWUgPT09ICdURU1QTEFURScgPyBlbGUuY29udGVudC5jaGlsZE5vZGVzIDogZWxlLmNoaWxkTm9kZXM7XG4gIH0pKSk7XG59O1xuXG5mbi5maW5kID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGZpbmQoc2VsZWN0b3IsIGVsZSk7XG4gIH0pKSk7XG59OyAvLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuLy8gQHJlcXVpcmUgY29sbGVjdGlvbi9maWx0ZXIudHNcbi8vIEByZXF1aXJlIHRyYXZlcnNhbC9maW5kLnRzXG5cblxudmFyIEhUTUxDREFUQVJlID0gL15cXHMqPCEoPzpcXFtDREFUQVxcW3wtLSl8KD86XFxdXFxdfC0tKT5cXHMqJC9nLFxuICAgIHNjcmlwdFR5cGVSZSA9IC9eJHxebW9kdWxlJHxcXC8oamF2YXxlY21hKXNjcmlwdC9pLFxuICAgIHNjcmlwdEF0dHJpYnV0ZXMgPSBbJ3R5cGUnLCAnc3JjJywgJ25vbmNlJywgJ25vTW9kdWxlJ107XG5cbmZ1bmN0aW9uIGV2YWxTY3JpcHRzKG5vZGUsIGRvYykge1xuICB2YXIgY29sbGVjdGlvbiA9IGNhc2gobm9kZSk7XG4gIGNvbGxlY3Rpb24uZmlsdGVyKCdzY3JpcHQnKS5hZGQoY29sbGVjdGlvbi5maW5kKCdzY3JpcHQnKSkuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKHNjcmlwdFR5cGVSZS50ZXN0KGVsZS50eXBlKSAmJiBkb2NFbGUuY29udGFpbnMoZWxlKSkge1xuICAgICAgLy8gVGhlIHNjcmlwdCB0eXBlIGlzIHN1cHBvcnRlZCAvLyBUaGUgZWxlbWVudCBpcyBhdHRhY2hlZCB0byB0aGUgRE9NIC8vIFVzaW5nIGBkb2N1bWVudEVsZW1lbnRgIGZvciBicm9hZGVyIGJyb3dzZXIgc3VwcG9ydFxuICAgICAgdmFyIHNjcmlwdF8xID0gY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHRfMS50ZXh0ID0gZWxlLnRleHRDb250ZW50LnJlcGxhY2UoSFRNTENEQVRBUmUsICcnKTtcbiAgICAgIGVhY2goc2NyaXB0QXR0cmlidXRlcywgZnVuY3Rpb24gKGksIGF0dHIpIHtcbiAgICAgICAgaWYgKGVsZVthdHRyXSkgc2NyaXB0XzFbYXR0cl0gPSBlbGVbYXR0cl07XG4gICAgICB9KTtcbiAgICAgIGRvYy5oZWFkLmluc2VydEJlZm9yZShzY3JpcHRfMSwgbnVsbCk7XG4gICAgICBkb2MuaGVhZC5yZW1vdmVDaGlsZChzY3JpcHRfMSk7XG4gICAgfVxuICB9KTtcbn0gLy8gQHJlcXVpcmUgLi9ldmFsX3NjcmlwdHMudHNcblxuXG5mdW5jdGlvbiBpbnNlcnRFbGVtZW50KGFuY2hvciwgdGFyZ2V0LCBsZWZ0LCBpbnNpZGUsIGV2YWx1YXRlKSB7XG4gIGlmIChpbnNpZGUpIHtcbiAgICAvLyBwcmVwZW5kL2FwcGVuZFxuICAgIGFuY2hvci5pbnNlcnRCZWZvcmUodGFyZ2V0LCBsZWZ0ID8gYW5jaG9yLmZpcnN0Q2hpbGQgOiBudWxsKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBiZWZvcmUvYWZ0ZXJcbiAgICBhbmNob3IucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFyZ2V0LCBsZWZ0ID8gYW5jaG9yIDogYW5jaG9yLm5leHRTaWJsaW5nKTtcbiAgfVxuXG4gIGlmIChldmFsdWF0ZSkge1xuICAgIGV2YWxTY3JpcHRzKHRhcmdldCwgYW5jaG9yLm93bmVyRG9jdW1lbnQpO1xuICB9XG59IC8vIEByZXF1aXJlIC4vaW5zZXJ0X2VsZW1lbnQudHNcblxuXG5mdW5jdGlvbiBpbnNlcnRTZWxlY3RvcnMoc2VsZWN0b3JzLCBhbmNob3JzLCBpbnZlcnNlLCBsZWZ0LCBpbnNpZGUsIHJldmVyc2VMb29wMSwgcmV2ZXJzZUxvb3AyLCByZXZlcnNlTG9vcDMpIHtcbiAgZWFjaChzZWxlY3RvcnMsIGZ1bmN0aW9uIChzaSwgc2VsZWN0b3IpIHtcbiAgICBlYWNoKGNhc2goc2VsZWN0b3IpLCBmdW5jdGlvbiAodGksIHRhcmdldCkge1xuICAgICAgZWFjaChjYXNoKGFuY2hvcnMpLCBmdW5jdGlvbiAoYWksIGFuY2hvcikge1xuICAgICAgICB2YXIgYW5jaG9yRmluYWwgPSBpbnZlcnNlID8gdGFyZ2V0IDogYW5jaG9yLFxuICAgICAgICAgICAgdGFyZ2V0RmluYWwgPSBpbnZlcnNlID8gYW5jaG9yIDogdGFyZ2V0LFxuICAgICAgICAgICAgaW5kZXhGaW5hbCA9IGludmVyc2UgPyB0aSA6IGFpO1xuICAgICAgICBpbnNlcnRFbGVtZW50KGFuY2hvckZpbmFsLCAhaW5kZXhGaW5hbCA/IHRhcmdldEZpbmFsIDogdGFyZ2V0RmluYWwuY2xvbmVOb2RlKHRydWUpLCBsZWZ0LCBpbnNpZGUsICFpbmRleEZpbmFsKTtcbiAgICAgIH0sIHJldmVyc2VMb29wMyk7XG4gICAgfSwgcmV2ZXJzZUxvb3AyKTtcbiAgfSwgcmV2ZXJzZUxvb3AxKTtcbiAgcmV0dXJuIGFuY2hvcnM7XG59XG5cbmZuLmFmdGVyID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5mbi5hcHBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uYXBwZW5kVG8gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmJlZm9yZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmluc2VydEFmdGVyID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5pbnNlcnRCZWZvcmUgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIHRydWUpO1xufTtcblxuZm4ucHJlcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCB0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKTtcbn07XG5cbmZuLnByZXBlbmRUbyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLnJlcGxhY2VXaXRoID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmJlZm9yZShzZWxlY3RvcikucmVtb3ZlKCk7XG59O1xuXG5mbi5yZXBsYWNlQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIGNhc2goc2VsZWN0b3IpLnJlcGxhY2VXaXRoKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLndyYXBBbGwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgdmFyIHN0cnVjdHVyZSA9IGNhc2goc2VsZWN0b3IpLFxuICAgICAgd3JhcHBlciA9IHN0cnVjdHVyZVswXTtcblxuICB3aGlsZSAod3JhcHBlci5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICB3cmFwcGVyID0gd3JhcHBlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgfVxuXG4gIHRoaXMuZmlyc3QoKS5iZWZvcmUoc3RydWN0dXJlKTtcbiAgcmV0dXJuIHRoaXMuYXBwZW5kVG8od3JhcHBlcik7XG59O1xuXG5mbi53cmFwID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHZhciB3cmFwcGVyID0gY2FzaChzZWxlY3RvcilbMF07XG4gICAgY2FzaChlbGUpLndyYXBBbGwoIWkgPyB3cmFwcGVyIDogd3JhcHBlci5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9KTtcbn07XG5cbmZuLndyYXBJbm5lciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgJGVsZSA9IGNhc2goZWxlKSxcbiAgICAgICAgY29udGVudHMgPSAkZWxlLmNvbnRlbnRzKCk7XG4gICAgY29udGVudHMubGVuZ3RoID8gY29udGVudHMud3JhcEFsbChzZWxlY3RvcikgOiAkZWxlLmFwcGVuZChzZWxlY3Rvcik7XG4gIH0pO1xufTtcblxuZm4uaGFzID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBjb21wYXJhdG9yID0gaXNTdHJpbmcoc2VsZWN0b3IpID8gZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbGUpLmxlbmd0aDtcbiAgfSA6IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZWxlLmNvbnRhaW5zKHNlbGVjdG9yKTtcbiAgfTtcbiAgcmV0dXJuIHRoaXMuZmlsdGVyKGNvbXBhcmF0b3IpO1xufTtcblxuZm4uaXMgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIHNvbWUuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlLCBpKSB7XG4gICAgcmV0dXJuIGNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pO1xufTtcblxuZm4ubmV4dCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yLCBfYWxsLCBfdW50aWwpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICduZXh0RWxlbWVudFNpYmxpbmcnLCBfYWxsLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ubmV4dEFsbCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLm5leHQoY29tcGFyYXRvciwgdHJ1ZSk7XG59O1xuXG5mbi5uZXh0VW50aWwgPSBmdW5jdGlvbiAodW50aWwsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMubmV4dChjb21wYXJhdG9yLCB0cnVlLCB1bnRpbCk7XG59O1xuXG5mbi5ub3QgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIHRoaXMuZmlsdGVyKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gKCFpc1N0cmluZyhjb21wYXJhdG9yKSB8fCBpc0VsZW1lbnQoZWxlKSkgJiYgIWNvbXBhcmUuY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pO1xufTtcblxuZm4ucGFyZW50ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwYXJlbnROb2RlJykpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5pbmRleCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgY2hpbGQgPSBzZWxlY3RvciA/IGNhc2goc2VsZWN0b3IpWzBdIDogdGhpc1swXSxcbiAgICAgIGNvbGxlY3Rpb24gPSBzZWxlY3RvciA/IHRoaXMgOiBjYXNoKGNoaWxkKS5wYXJlbnQoKS5jaGlsZHJlbigpO1xuICByZXR1cm4gaW5kZXhPZi5jYWxsKGNvbGxlY3Rpb24sIGNoaWxkKTtcbn07XG5cbmZuLmNsb3Nlc3QgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgZmlsdGVyZWQgPSB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbiAgaWYgKGZpbHRlcmVkLmxlbmd0aCkgcmV0dXJuIGZpbHRlcmVkO1xuICB2YXIgJHBhcmVudCA9IHRoaXMucGFyZW50KCk7XG4gIGlmICghJHBhcmVudC5sZW5ndGgpIHJldHVybiBmaWx0ZXJlZDtcbiAgcmV0dXJuICRwYXJlbnQuY2xvc2VzdChjb21wYXJhdG9yKTtcbn07XG5cbmZuLnBhcmVudHMgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX3VudGlsKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAncGFyZW50RWxlbWVudCcsIHRydWUsIF91bnRpbCkpKSwgY29tcGFyYXRvcik7XG59O1xuXG5mbi5wYXJlbnRzVW50aWwgPSBmdW5jdGlvbiAodW50aWwsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMucGFyZW50cyhjb21wYXJhdG9yLCB1bnRpbCk7XG59O1xuXG5mbi5wcmV2ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF9hbGwsIF91bnRpbCkge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnLCBfYWxsLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ucHJldkFsbCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnByZXYoY29tcGFyYXRvciwgdHJ1ZSk7XG59O1xuXG5mbi5wcmV2VW50aWwgPSBmdW5jdGlvbiAodW50aWwsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIHRoaXMucHJldihjb21wYXJhdG9yLCB0cnVlLCB1bnRpbCk7XG59O1xuXG5mbi5zaWJsaW5ncyA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGNhc2goZWxlKS5wYXJlbnQoKS5jaGlsZHJlbigpLm5vdChlbGUpO1xuICB9KSkpLCBjb21wYXJhdG9yKTtcbn07IC8vIEBvcHRpb25hbCAuL2NoaWxkcmVuLnRzXG4vLyBAb3B0aW9uYWwgLi9jbG9zZXN0LnRzXG4vLyBAb3B0aW9uYWwgLi9jb250ZW50cy50c1xuLy8gQG9wdGlvbmFsIC4vZmluZC50c1xuLy8gQG9wdGlvbmFsIC4vaGFzLnRzXG4vLyBAb3B0aW9uYWwgLi9pcy50c1xuLy8gQG9wdGlvbmFsIC4vbmV4dC50c1xuLy8gQG9wdGlvbmFsIC4vbmV4dF9hbGwudHNcbi8vIEBvcHRpb25hbCAuL25leHRfdW50aWwudHNcbi8vIEBvcHRpb25hbCAuL25vdC50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50LnRzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnRzLnRzXG4vLyBAb3B0aW9uYWwgLi9wYXJlbnRzX3VudGlsLnRzXG4vLyBAb3B0aW9uYWwgLi9wcmV2LnRzXG4vLyBAb3B0aW9uYWwgLi9wcmV2X2FsbC50c1xuLy8gQG9wdGlvbmFsIC4vcHJldl91bnRpbC50c1xuLy8gQG9wdGlvbmFsIC4vc2libGluZ3MudHNcbi8vIEBvcHRpb25hbCBhdHRyaWJ1dGVzL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgY29sbGVjdGlvbi9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGNzcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGRhdGEvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBkaW1lbnNpb25zL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZWZmZWN0cy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGV2ZW50cy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGZvcm1zL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgbWFuaXB1bGF0aW9uL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgb2Zmc2V0L2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgdHJhdmVyc2FsL2luZGV4LnRzXG4vLyBAcmVxdWlyZSBjb3JlL2luZGV4LnRzXG4vLyBAcHJpb3JpdHkgLTEwMFxuLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG4vLyBAcmVxdWlyZSAuL3ZhcmlhYmxlcy50c1xuXG5cbmlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgLy8gTm9kZS5qc1xuICBtb2R1bGUuZXhwb3J0cyA9IGNhc2g7XG59IGVsc2Uge1xuICAvLyBCcm93c2VyXG4gIHdpblsnY2FzaCddID0gd2luWyckJ10gPSBjYXNoO1xufVxufSkoKTsiLCJleHBvcnQgZGVmYXVsdCBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiYnVuZGxlLmNzc1wiOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxudmFyIHJ1bnRpbWUgPSAoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICBmdW5jdGlvbiBkZWZpbmUob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbiAgdHJ5IHtcbiAgICAvLyBJRSA4IGhhcyBhIGJyb2tlbiBPYmplY3QuZGVmaW5lUHJvcGVydHkgdGhhdCBvbmx5IHdvcmtzIG9uIERPTSBvYmplY3RzLlxuICAgIGRlZmluZSh7fSwgXCJcIik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGRlZmluZSA9IGZ1bmN0aW9uKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIG9ialtrZXldID0gdmFsdWU7XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIGV4cG9ydHMud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uLmRpc3BsYXlOYW1lID0gZGVmaW5lKFxuICAgIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLFxuICAgIHRvU3RyaW5nVGFnU3ltYm9sLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICApO1xuXG4gIC8vIEhlbHBlciBmb3IgZGVmaW5pbmcgdGhlIC5uZXh0LCAudGhyb3csIGFuZCAucmV0dXJuIG1ldGhvZHMgb2YgdGhlXG4gIC8vIEl0ZXJhdG9yIGludGVyZmFjZSBpbiB0ZXJtcyBvZiBhIHNpbmdsZSAuX2ludm9rZSBtZXRob2QuXG4gIGZ1bmN0aW9uIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhwcm90b3R5cGUpIHtcbiAgICBbXCJuZXh0XCIsIFwidGhyb3dcIiwgXCJyZXR1cm5cIl0uZm9yRWFjaChmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIGRlZmluZShwcm90b3R5cGUsIG1ldGhvZCwgZnVuY3Rpb24oYXJnKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnZva2UobWV0aG9kLCBhcmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGRlZmluZShnZW5GdW4sIHRvU3RyaW5nVGFnU3ltYm9sLCBcIkdlbmVyYXRvckZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICBnZW5GdW4ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShHcCk7XG4gICAgcmV0dXJuIGdlbkZ1bjtcbiAgfTtcblxuICAvLyBXaXRoaW4gdGhlIGJvZHkgb2YgYW55IGFzeW5jIGZ1bmN0aW9uLCBgYXdhaXQgeGAgaXMgdHJhbnNmb3JtZWQgdG9cbiAgLy8gYHlpZWxkIHJlZ2VuZXJhdG9yUnVudGltZS5hd3JhcCh4KWAsIHNvIHRoYXQgdGhlIHJ1bnRpbWUgY2FuIHRlc3RcbiAgLy8gYGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIilgIHRvIGRldGVybWluZSBpZiB0aGUgeWllbGRlZCB2YWx1ZSBpc1xuICAvLyBtZWFudCB0byBiZSBhd2FpdGVkLlxuICBleHBvcnRzLmF3cmFwID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIHsgX19hd2FpdDogYXJnIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gQXN5bmNJdGVyYXRvcihnZW5lcmF0b3IsIFByb21pc2VJbXBsKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZUltcGwucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2VJbXBsLnJlc29sdmUodmFsdWUpLnRoZW4oZnVuY3Rpb24odW53cmFwcGVkKSB7XG4gICAgICAgICAgLy8gV2hlbiBhIHlpZWxkZWQgUHJvbWlzZSBpcyByZXNvbHZlZCwgaXRzIGZpbmFsIHZhbHVlIGJlY29tZXNcbiAgICAgICAgICAvLyB0aGUgLnZhbHVlIG9mIHRoZSBQcm9taXNlPHt2YWx1ZSxkb25lfT4gcmVzdWx0IGZvciB0aGVcbiAgICAgICAgICAvLyBjdXJyZW50IGl0ZXJhdGlvbi5cbiAgICAgICAgICByZXN1bHQudmFsdWUgPSB1bndyYXBwZWQ7XG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIC8vIElmIGEgcmVqZWN0ZWQgUHJvbWlzZSB3YXMgeWllbGRlZCwgdGhyb3cgdGhlIHJlamVjdGlvbiBiYWNrXG4gICAgICAgICAgLy8gaW50byB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBoYW5kbGVkIHRoZXJlLlxuICAgICAgICAgIHJldHVybiBpbnZva2UoXCJ0aHJvd1wiLCBlcnJvciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2VJbXBsKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCwgUHJvbWlzZUltcGwpIHtcbiAgICBpZiAoUHJvbWlzZUltcGwgPT09IHZvaWQgMCkgUHJvbWlzZUltcGwgPSBQcm9taXNlO1xuXG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpLFxuICAgICAgUHJvbWlzZUltcGxcbiAgICApO1xuXG4gICAgcmV0dXJuIGV4cG9ydHMuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIC8vIE5vdGU6IFtcInJldHVyblwiXSBtdXN0IGJlIHVzZWQgZm9yIEVTMyBwYXJzaW5nIGNvbXBhdGliaWxpdHkuXG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvcltcInJldHVyblwiXSkge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIGRlZmluZShHcCwgdG9TdHJpbmdUYWdTeW1ib2wsIFwiR2VuZXJhdG9yXCIpO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIGV4cG9ydHMua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBleHBvcnRzLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGlzIHNjcmlwdCBpcyBleGVjdXRpbmcgYXMgYSBDb21tb25KUyBtb2R1bGVcbiAgLy8gb3Igbm90LCByZXR1cm4gdGhlIHJ1bnRpbWUgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIGRlY2xhcmUgdGhlIHZhcmlhYmxlXG4gIC8vIHJlZ2VuZXJhdG9yUnVudGltZSBpbiB0aGUgb3V0ZXIgc2NvcGUsIHdoaWNoIGFsbG93cyB0aGlzIG1vZHVsZSB0byBiZVxuICAvLyBpbmplY3RlZCBlYXNpbHkgYnkgYGJpbi9yZWdlbmVyYXRvciAtLWluY2x1ZGUtcnVudGltZSBzY3JpcHQuanNgLlxuICByZXR1cm4gZXhwb3J0cztcblxufShcbiAgLy8gSWYgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlLCB1c2UgbW9kdWxlLmV4cG9ydHNcbiAgLy8gYXMgdGhlIHJlZ2VuZXJhdG9yUnVudGltZSBuYW1lc3BhY2UuIE90aGVyd2lzZSBjcmVhdGUgYSBuZXcgZW1wdHlcbiAgLy8gb2JqZWN0LiBFaXRoZXIgd2F5LCB0aGUgcmVzdWx0aW5nIG9iamVjdCB3aWxsIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZVxuICAvLyB0aGUgcmVnZW5lcmF0b3JSdW50aW1lIHZhcmlhYmxlIGF0IHRoZSB0b3Agb2YgdGhpcyBmaWxlLlxuICB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiID8gbW9kdWxlLmV4cG9ydHMgOiB7fVxuKSk7XG5cbnRyeSB7XG4gIHJlZ2VuZXJhdG9yUnVudGltZSA9IHJ1bnRpbWU7XG59IGNhdGNoIChhY2NpZGVudGFsU3RyaWN0TW9kZSkge1xuICAvLyBUaGlzIG1vZHVsZSBzaG91bGQgbm90IGJlIHJ1bm5pbmcgaW4gc3RyaWN0IG1vZGUsIHNvIHRoZSBhYm92ZVxuICAvLyBhc3NpZ25tZW50IHNob3VsZCBhbHdheXMgd29yayB1bmxlc3Mgc29tZXRoaW5nIGlzIG1pc2NvbmZpZ3VyZWQuIEp1c3RcbiAgLy8gaW4gY2FzZSBydW50aW1lLmpzIGFjY2lkZW50YWxseSBydW5zIGluIHN0cmljdCBtb2RlLCB3ZSBjYW4gZXNjYXBlXG4gIC8vIHN0cmljdCBtb2RlIHVzaW5nIGEgZ2xvYmFsIEZ1bmN0aW9uIGNhbGwuIFRoaXMgY291bGQgY29uY2VpdmFibHkgZmFpbFxuICAvLyBpZiBhIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5IGZvcmJpZHMgdXNpbmcgRnVuY3Rpb24sIGJ1dCBpbiB0aGF0IGNhc2VcbiAgLy8gdGhlIHByb3BlciBzb2x1dGlvbiBpcyB0byBmaXggdGhlIGFjY2lkZW50YWwgc3RyaWN0IG1vZGUgcHJvYmxlbS4gSWZcbiAgLy8geW91J3ZlIG1pc2NvbmZpZ3VyZWQgeW91ciBidW5kbGVyIHRvIGZvcmNlIHN0cmljdCBtb2RlIGFuZCBhcHBsaWVkIGFcbiAgLy8gQ1NQIHRvIGZvcmJpZCBGdW5jdGlvbiwgYW5kIHlvdSdyZSBub3Qgd2lsbGluZyB0byBmaXggZWl0aGVyIG9mIHRob3NlXG4gIC8vIHByb2JsZW1zLCBwbGVhc2UgZGV0YWlsIHlvdXIgdW5pcXVlIHByZWRpY2FtZW50IGluIGEgR2l0SHViIGlzc3VlLlxuICBGdW5jdGlvbihcInJcIiwgXCJyZWdlbmVyYXRvclJ1bnRpbWUgPSByXCIpKHJ1bnRpbWUpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJCBmcm9tICdjYXNoLWRvbSc7XHJcbmltcG9ydCAnLi4vc2Nzcy9tYWluLnNjc3MnO1xyXG5cclxubGV0IGNvbnRyb2xsZXI7XHJcbmxldCBzb2NrZXQ7XHJcblxyXG4kKCcjdXJsJykub24oJ2tleXVwJywgZSA9PiB7XHJcbiAgICBpZiAoZS5rZXkgPT0gJ0VudGVyJykgJCgnI2J0bi1nbycpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbn0pO1xyXG4kKCcjYnRuLWdvJykub24oJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xyXG4gICAgc29ja2V0Py5jbG9zZSgpO1xyXG4gICAgY29udHJvbGxlcj8uYWJvcnQoKTtcclxuICAgIGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgY29uc3QgJG11c2ljID0gJCgnLm11c2ljJykuaGlkZSgpO1xyXG4gICAgY29uc3QgJGRvd25sb2FkID0gJCgnI2Rvd25sb2FkJykuYXR0cignY2xhc3MnLCAnaGlkZScpO1xyXG4gICAgY29uc3QgJG1lc3NhZ2UgPSAkKCcubWVzc2FnZScpLmhpZGUoKTtcclxuICAgIGNvbnN0ICRsb2FkZXIgPSAkKCcubG9hZGVyJykuYWRkQ2xhc3MoJ2xvYWQnKTtcclxuXHJcbiAgICBjb25zdCBlcnJvciA9IChtc2cgPSAnU29tZXRoaW5nIHdlbnQgd3JvbmcnKSA9PiB7XHJcbiAgICAgICAgJG11c2ljLmhpZGUoKTtcclxuICAgICAgICAkZG93bmxvYWQuYXR0cignY2xhc3MnLCAnaGlkZScpO1xyXG4gICAgICAgICRtZXNzYWdlLnRleHQobXNnKS5zaG93KCk7XHJcbiAgICAgICAgJGxvYWRlci5yZW1vdmVDbGFzcygnbG9hZCcpO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHVybCA9ICQoJyN1cmwnKS52YWwoKTtcclxuXHJcbiAgICBpZiAoIXVybCkgcmV0dXJuIGVycm9yKFwiVGhlIHVybCBjYW4ndCBiZSBlbXB0eVwiKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBwJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmwgfSksXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxyXG4gICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gICAgICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgICAgIGlmICghYm9keS5tc2cpIHRocm93IGJvZHk7XHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvcihib2R5Lm1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghYm9keS5tdXNpYykgdGhyb3cgYm9keTtcclxuXHJcbiAgICAgICAgY29uc3QgbXVzaWMgPSBib2R5Lm11c2ljO1xyXG4gICAgICAgIGNvbnN0ICRpbWcgPSAkbXVzaWMuY2hpbGRyZW4oKS5maXJzdCgpLmNoaWxkcmVuKCkuZmlyc3QoKTtcclxuICAgICAgICBjb25zdCAkaW5mbyA9ICRtdXNpYy5jaGlsZHJlbigpLmxhc3QoKTtcclxuXHJcbiAgICAgICAgJGluZm8uZmluZCgnLmdlbnJlJykudGV4dChgIyR7bXVzaWMuZ2VucmUgfHwgJ05vR2VucmUnfSBgKTtcclxuICAgICAgICAkaW5mby5maW5kKCcudGl0bGUnKS50ZXh0KG11c2ljLnRpdGxlKTtcclxuICAgICAgICAkaW5mby5maW5kKCcuYXJ0aXN0JykudGV4dChgJHttdXNpYy5hcnRpc3QgfHwgJ1Vua25vd24gQXJ0aXN0J30g4oCiICR7bXVzaWMuYWxidW0gfHwgJ1Vua25vd24gQWxidW0nfWApO1xyXG4gICAgICAgICRpbmZvLmZpbmQoJy55ZWFyJykudGV4dChtdXNpYy55ZWFyKTtcclxuXHJcbiAgICAgICAgJGltZy5oaWRlKCk7XHJcbiAgICAgICAgJGltZy5uZXh0KCkudGV4dCgnTm8gVHJhY2sgQXJ0d29yaycpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgaWYgKG11c2ljLmFydHdvcmspIHtcclxuICAgICAgICAgICAgJGltZy5vbignbG9hZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICRpbWcubmV4dCgpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICRpbWcucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRpbWcuYXR0cignc3JjJywgbXVzaWMuYXJ0d29yayk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbXVzaWMucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkZG93bmxvYWQuYXR0cignY2xhc3MnLCAnbG9hZCcpO1xyXG4gICAgICAgICRtZXNzYWdlLmhpZGUoKTtcclxuXHJcbiAgICAgICAgc29ja2V0ID0gbmV3IFdlYlNvY2tldChgJHtkb2N1bWVudC5VUkwucmVwbGFjZSgvaHR0cC8sICd3cycpfS8ke211c2ljLmJ1enp5SWR9YCk7XHJcbiAgICAgICAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUuZGF0YSA9PSAncmVhZHknKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9hZGVyLnJlbW92ZUNsYXNzKCdsb2FkJyk7XHJcbiAgICAgICAgICAgICAgICAkZG93bmxvYWQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICRkb3dubG9hZC5maW5kKCdhJykuYXR0cignaHJlZicsIGAvZC8ke211c2ljLmJ1enp5SWR9YCk7XHJcbiAgICAgICAgICAgICAgICAkZG93bmxvYWQuYXR0cignY2xhc3MnLCAncmVhZHknKTtcclxuICAgICAgICAgICAgICAgIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICgpID0+IGVycm9yKCdZb3VyIGZpbGUgaGFzIGV4cGlyZWQnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiBlcnJvcigpKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbikgcmV0dXJuO1xyXG4gICAgICAgIGVycm9yKCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9