/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/main.scss */ "./assets/scss/main.scss");



let controller;

cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#url').on('keyup', e => {
    if (e.key == 'Enter') cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#btn-go').trigger('click');
});
cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#btn-go').on('click', async () => {
    controller?.abort();
    controller = new AbortController();

    const $music = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.music').hide();
    const $download = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.download').hide();
    const $message = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.message').hide();
    const $loader = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('.loader').addClass('load');

    const error = msg => {
        $message.text(msg).show();
        $loader.removeClass('load');
    };
    const url = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#url').val();

    if (!url) return error("The url can't be empty");

    try {
        const res = await fetch('/app', {
            method: 'post',
            body: JSON.stringify({ url }),
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
        });
        const body = await res.json();
        if (!res.ok) {
            if (!body.msg) throw body;
            return error(body.msg);
        }
        if (!body.music) throw body;

        const music = body.music;
        const $img = $music.children().first().children().first();
        const $info = $music.children().last();

        $info.find('.genre').text(`#${music.genre || 'NoGenre'} `);
        $info.find('.title').text(music.title);
        $info.find('.artist').text(`${music.artist || 'Unknown Artist'} • ${music.album || 'Unknown Album'}`);
        $info.find('.year').text(music.year);

        $img.hide();
        $img.next().text('No Track Artwork').removeAttr('style');
        if (music.artwork) {
            $img.on('load', () => {
                $img.next().hide();
                $img.removeAttr('style');
            });
            $img.attr('src', music.artwork);
        }

        $download.find('a').attr('href', music.download);

        $music.removeAttr('style');
        $download.removeAttr('style');
        $loader.removeClass('load');
    } catch (e) {
        if (e instanceof DOMException) return;
        error('Something went wrong');
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9idXp6eS8uL25vZGVfbW9kdWxlcy9jYXNoLWRvbS9kaXN0L2Nhc2guanMiLCJ3ZWJwYWNrOi8vYnV6enkvLi9hc3NldHMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2J1enp5L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYnV6enkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9idXp6eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2J1enp5L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2J1enp5Ly4vYXNzZXRzL2pzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSw4QkFBOEI7O0FBRTlCO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLEVBQUU7OztBQUdGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOzs7QUFHRjtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDLE9BQU87QUFDeEM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBOztBQUVBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsRUFBRTtBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCw2RUFBNkU7O0FBRTdFO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0EsQ0FBQztBQUNEOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBLDJDQUEyQztBQUMzQyxDQUFDO0FBQ0Q7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsdUZBQXVGOztBQUV2RjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkJBQTZCO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDOztBQUV0Qzs7QUFFQSx1Q0FBdUM7QUFDdkM7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLElBQUksSUFBOEI7QUFDbEM7QUFDQTtBQUNBLENBQUMsTUFBTSxFQUdOO0FBQ0QsQ0FBQyxJOzs7Ozs7Ozs7Ozs7Ozs7QUM3MUNELGlFQUFlLHFCQUF1QixlQUFlLEU7Ozs7OztVQ0FyRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBO1dBQ0EsQ0FBQyxJOzs7OztXQ1BELHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGtDOzs7Ozs7Ozs7Ozs7Ozs7QUNmeUI7QUFDRTs7QUFFM0I7O0FBRUEsK0NBQUM7QUFDRCwwQkFBMEIsK0NBQUM7QUFDM0IsQ0FBQztBQUNELCtDQUFDO0FBQ0Q7QUFDQTs7QUFFQSxtQkFBbUIsK0NBQUM7QUFDcEIsc0JBQXNCLCtDQUFDO0FBQ3ZCLHFCQUFxQiwrQ0FBQztBQUN0QixvQkFBb0IsK0NBQUM7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtDQUFDOztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsTUFBTTtBQUN4QyxzQkFBc0IscUNBQXFDO0FBQzNEO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDLHlCQUF5QjtBQUMvRDtBQUNBLHNDQUFzQyxpQ0FBaUMsS0FBSywrQkFBK0I7QUFDM0c7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTUlUIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWJpb3NwYW1waW5hdG8vY2FzaCAqL1xuKGZ1bmN0aW9uKCl7XG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3BNYXAgPSB7XG4gIC8qIEdFTkVSQUwgKi9cbiAgXCJjbGFzc1wiOiAnY2xhc3NOYW1lJyxcbiAgY29udGVudGVkaXRhYmxlOiAnY29udGVudEVkaXRhYmxlJyxcblxuICAvKiBMQUJFTCAqL1xuICBcImZvclwiOiAnaHRtbEZvcicsXG5cbiAgLyogSU5QVVQgKi9cbiAgcmVhZG9ubHk6ICdyZWFkT25seScsXG4gIG1heGxlbmd0aDogJ21heExlbmd0aCcsXG4gIHRhYmluZGV4OiAndGFiSW5kZXgnLFxuXG4gIC8qIFRBQkxFICovXG4gIGNvbHNwYW46ICdjb2xTcGFuJyxcbiAgcm93c3BhbjogJ3Jvd1NwYW4nLFxuXG4gIC8qIElNQUdFICovXG4gIHVzZW1hcDogJ3VzZU1hcCdcbn07XG5cbmZ1bmN0aW9uIGF0dGVtcHQoZm4sIGFyZykge1xuICB0cnkge1xuICAgIHJldHVybiBmbihhcmcpO1xuICB9IGNhdGNoIChfYSkge1xuICAgIHJldHVybiBhcmc7XG4gIH1cbn1cblxudmFyIGRvYyA9IGRvY3VtZW50LFxuICAgIHdpbiA9IHdpbmRvdyxcbiAgICBkb2NFbGUgPSBkb2MuZG9jdW1lbnRFbGVtZW50LFxuICAgIGNyZWF0ZUVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudC5iaW5kKGRvYyksXG4gICAgZGl2ID0gY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgdGFibGUgPSBjcmVhdGVFbGVtZW50KCd0YWJsZScpLFxuICAgIHRib2R5ID0gY3JlYXRlRWxlbWVudCgndGJvZHknKSxcbiAgICB0ciA9IGNyZWF0ZUVsZW1lbnQoJ3RyJyksXG4gICAgaXNBcnJheSA9IEFycmF5LmlzQXJyYXksXG4gICAgQXJyYXlQcm90b3R5cGUgPSBBcnJheS5wcm90b3R5cGUsXG4gICAgY29uY2F0ID0gQXJyYXlQcm90b3R5cGUuY29uY2F0LFxuICAgIGZpbHRlciA9IEFycmF5UHJvdG90eXBlLmZpbHRlcixcbiAgICBpbmRleE9mID0gQXJyYXlQcm90b3R5cGUuaW5kZXhPZixcbiAgICBtYXAgPSBBcnJheVByb3RvdHlwZS5tYXAsXG4gICAgcHVzaCA9IEFycmF5UHJvdG90eXBlLnB1c2gsXG4gICAgc2xpY2UgPSBBcnJheVByb3RvdHlwZS5zbGljZSxcbiAgICBzb21lID0gQXJyYXlQcm90b3R5cGUuc29tZSxcbiAgICBzcGxpY2UgPSBBcnJheVByb3RvdHlwZS5zcGxpY2U7XG52YXIgaWRSZSA9IC9eIyg/OltcXHctXXxcXFxcLnxbXlxceDAwLVxceGEwXSkqJC8sXG4gICAgY2xhc3NSZSA9IC9eXFwuKD86W1xcdy1dfFxcXFwufFteXFx4MDAtXFx4YTBdKSokLyxcbiAgICBodG1sUmUgPSAvPC4rPi8sXG4gICAgdGFnUmUgPSAvXlxcdyskLzsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gZmluZChzZWxlY3RvciwgY29udGV4dCkge1xuICByZXR1cm4gIXNlbGVjdG9yIHx8ICFpc0RvY3VtZW50KGNvbnRleHQpICYmICFpc0VsZW1lbnQoY29udGV4dCkgPyBbXSA6IGNsYXNzUmUudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2VsZWN0b3Iuc2xpY2UoMSkpIDogdGFnUmUudGVzdChzZWxlY3RvcikgPyBjb250ZXh0LmdldEVsZW1lbnRzQnlUYWdOYW1lKHNlbGVjdG9yKSA6IGNvbnRleHQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59IC8vIEByZXF1aXJlIC4vZmluZC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG52YXIgQ2FzaCA9XG4vKiogQGNsYXNzICovXG5mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENhc2goc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIXNlbGVjdG9yKSByZXR1cm47XG4gICAgaWYgKGlzQ2FzaChzZWxlY3RvcikpIHJldHVybiBzZWxlY3RvcjtcbiAgICB2YXIgZWxlcyA9IHNlbGVjdG9yO1xuXG4gICAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgICAgdmFyIGN0eCA9IChpc0Nhc2goY29udGV4dCkgPyBjb250ZXh0WzBdIDogY29udGV4dCkgfHwgZG9jO1xuICAgICAgZWxlcyA9IGlkUmUudGVzdChzZWxlY3RvcikgPyBjdHguZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpIDogaHRtbFJlLnRlc3Qoc2VsZWN0b3IpID8gcGFyc2VIVE1MKHNlbGVjdG9yKSA6IGZpbmQoc2VsZWN0b3IsIGN0eCk7XG4gICAgICBpZiAoIWVsZXMpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWFkeShzZWxlY3Rvcik7IC8vRklYTUU6IGBmbi5yZWFkeWAgaXMgbm90IGluY2x1ZGVkIGluIGBjb3JlYCwgYnV0IGl0J3MgYWN0dWFsbHkgYSBjb3JlIGZ1bmN0aW9uYWxpdHlcbiAgICB9XG5cbiAgICBpZiAoZWxlcy5ub2RlVHlwZSB8fCBlbGVzID09PSB3aW4pIGVsZXMgPSBbZWxlc107XG4gICAgdGhpcy5sZW5ndGggPSBlbGVzLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXNbaV0gPSBlbGVzW2ldO1xuICAgIH1cbiAgfVxuXG4gIENhc2gucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gbmV3IENhc2goc2VsZWN0b3IsIGNvbnRleHQpO1xuICB9O1xuXG4gIHJldHVybiBDYXNoO1xufSgpO1xuXG52YXIgZm4gPSBDYXNoLnByb3RvdHlwZSxcbiAgICBjYXNoID0gZm4uaW5pdDtcbmNhc2guZm4gPSBjYXNoLnByb3RvdHlwZSA9IGZuOyAvLyBFbnN1cmluZyB0aGF0IGBjYXNoICgpIGluc3RhbmNlb2YgY2FzaGBcblxuZm4ubGVuZ3RoID0gMDtcbmZuLnNwbGljZSA9IHNwbGljZTsgLy8gRW5zdXJpbmcgYSBjYXNoIGNvbGxlY3Rpb24gZ2V0cyBwcmludGVkIGFzIGFycmF5LWxpa2UgaW4gQ2hyb21lJ3MgZGV2dG9vbHNcblxuaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gRW5zdXJpbmcgYSBjYXNoIGNvbGxlY3Rpb24gaXMgaXRlcmFibGVcbiAgZm5bU3ltYm9sWydpdGVyYXRvciddXSA9IEFycmF5UHJvdG90eXBlW1N5bWJvbFsnaXRlcmF0b3InXV07XG59XG5cbmZuLm1hcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gY2FzaChjb25jYXQuYXBwbHkoW10sIG1hcC5jYWxsKHRoaXMsIGZ1bmN0aW9uIChlbGUsIGkpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suY2FsbChlbGUsIGksIGVsZSk7XG4gIH0pKSk7XG59O1xuXG5mbi5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHJldHVybiBjYXNoKHNsaWNlLmNhbGwodGhpcywgc3RhcnQsIGVuZCkpO1xufTsgLy8gQHJlcXVpcmUgLi9jYXNoLnRzXG5cblxudmFyIGRhc2hBbHBoYVJlID0gLy0oW2Etel0pL2c7XG5cbmZ1bmN0aW9uIGNhbWVsQ2FzZShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGRhc2hBbHBoYVJlLCBmdW5jdGlvbiAobWF0Y2gsIGxldHRlcikge1xuICAgIHJldHVybiBsZXR0ZXIudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cbmNhc2guZ3VpZCA9IDE7IC8vIEByZXF1aXJlIC4vY2FzaC50c1xuXG5mdW5jdGlvbiBtYXRjaGVzKGVsZSwgc2VsZWN0b3IpIHtcbiAgdmFyIG1hdGNoZXMgPSBlbGUgJiYgKGVsZVsnbWF0Y2hlcyddIHx8IGVsZVsnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJ10gfHwgZWxlWydtc01hdGNoZXNTZWxlY3RvciddKTtcbiAgcmV0dXJuICEhbWF0Y2hlcyAmJiAhIXNlbGVjdG9yICYmIG1hdGNoZXMuY2FsbChlbGUsIHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gaXNDYXNoKHgpIHtcbiAgcmV0dXJuIHggaW5zdGFuY2VvZiBDYXNoO1xufVxuXG5mdW5jdGlvbiBpc1dpbmRvdyh4KSB7XG4gIHJldHVybiAhIXggJiYgeCA9PT0geC53aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGlzRG9jdW1lbnQoeCkge1xuICByZXR1cm4gISF4ICYmIHgubm9kZVR5cGUgPT09IDk7XG59XG5cbmZ1bmN0aW9uIGlzRWxlbWVudCh4KSB7XG4gIHJldHVybiAhIXggJiYgeC5ub2RlVHlwZSA9PT0gMTtcbn1cblxuZnVuY3Rpb24gaXNCb29sZWFuKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnYm9vbGVhbic7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oeCkge1xuICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHgpIHtcbiAgcmV0dXJuIHR5cGVvZiB4ID09PSAnc3RyaW5nJztcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoeCkge1xuICByZXR1cm4geCA9PT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBpc051bGwoeCkge1xuICByZXR1cm4geCA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNOdW1lcmljKHgpIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHgpKSAmJiBpc0Zpbml0ZSh4KTtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh4KSB7XG4gIGlmICh0eXBlb2YgeCAhPT0gJ29iamVjdCcgfHwgeCA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoeCk7XG4gIHJldHVybiBwcm90byA9PT0gbnVsbCB8fCBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuY2FzaC5pc1dpbmRvdyA9IGlzV2luZG93O1xuY2FzaC5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcbmNhc2guaXNBcnJheSA9IGlzQXJyYXk7XG5jYXNoLmlzTnVtZXJpYyA9IGlzTnVtZXJpYztcbmNhc2guaXNQbGFpbk9iamVjdCA9IGlzUGxhaW5PYmplY3Q7XG5cbmZuLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICBpZiAoaXNVbmRlZmluZWQoaW5kZXgpKSByZXR1cm4gc2xpY2UuY2FsbCh0aGlzKTtcbiAgaW5kZXggPSBOdW1iZXIoaW5kZXgpO1xuICByZXR1cm4gdGhpc1tpbmRleCA8IDAgPyBpbmRleCArIHRoaXMubGVuZ3RoIDogaW5kZXhdO1xufTtcblxuZm4uZXEgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgcmV0dXJuIGNhc2godGhpcy5nZXQoaW5kZXgpKTtcbn07XG5cbmZuLmZpcnN0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5lcSgwKTtcbn07XG5cbmZuLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmVxKC0xKTtcbn07XG5cbmZ1bmN0aW9uIGVhY2goYXJyLCBjYWxsYmFjaywgX3JldmVyc2UpIHtcbiAgaWYgKF9yZXZlcnNlKSB7XG4gICAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgaWYgKGNhbGxiYWNrLmNhbGwoYXJyW2ldLCBpLCBhcnJbaV0pID09PSBmYWxzZSkgcmV0dXJuIGFycjtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcnIpKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhcnIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoY2FsbGJhY2suY2FsbChhcnJba2V5XSwga2V5LCBhcnJba2V5XSkgPT09IGZhbHNlKSByZXR1cm4gYXJyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGFycltpXSwgaSwgYXJyW2ldKSA9PT0gZmFsc2UpIHJldHVybiBhcnI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuY2FzaC5lYWNoID0gZWFjaDtcblxuZm4uZWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICByZXR1cm4gZWFjaCh0aGlzLCBjYWxsYmFjayk7XG59O1xuXG5mbi5wcm9wID0gZnVuY3Rpb24gKHByb3AsIHZhbHVlKSB7XG4gIGlmICghcHJvcCkgcmV0dXJuO1xuXG4gIGlmIChpc1N0cmluZyhwcm9wKSkge1xuICAgIHByb3AgPSBwcm9wTWFwW3Byb3BdIHx8IHByb3A7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdW3Byb3BdO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgZWxlW3Byb3BdID0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMucHJvcChrZXksIHByb3Bba2V5XSk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnJlbW92ZVByb3AgPSBmdW5jdGlvbiAocHJvcCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBkZWxldGUgZWxlW3Byb3BNYXBbcHJvcF0gfHwgcHJvcF07XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICB2YXIgc291cmNlcyA9IFtdO1xuXG4gIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgc291cmNlc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICB9XG5cbiAgdmFyIGRlZXAgPSBpc0Jvb2xlYW4oc291cmNlc1swXSkgPyBzb3VyY2VzLnNoaWZ0KCkgOiBmYWxzZSxcbiAgICAgIHRhcmdldCA9IHNvdXJjZXMuc2hpZnQoKSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldCkgcmV0dXJuIHt9O1xuICBpZiAoIWxlbmd0aCkgcmV0dXJuIGV4dGVuZChkZWVwLCBjYXNoLCB0YXJnZXQpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gc291cmNlc1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChkZWVwICYmIChpc0FycmF5KHNvdXJjZVtrZXldKSB8fCBpc1BsYWluT2JqZWN0KHNvdXJjZVtrZXldKSkpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRba2V5XSB8fCB0YXJnZXRba2V5XS5jb25zdHJ1Y3RvciAhPT0gc291cmNlW2tleV0uY29uc3RydWN0b3IpIHRhcmdldFtrZXldID0gbmV3IHNvdXJjZVtrZXldLmNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGV4dGVuZChkZWVwLCB0YXJnZXRba2V5XSwgc291cmNlW2tleV0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5jYXNoLmV4dGVuZCA9IGV4dGVuZDtcblxuZm4uZXh0ZW5kID0gZnVuY3Rpb24gKHBsdWdpbnMpIHtcbiAgcmV0dXJuIGV4dGVuZChmbiwgcGx1Z2lucyk7XG59OyAvLyBAcmVxdWlyZSAuL21hdGNoZXMudHNcbi8vIEByZXF1aXJlIC4vdHlwZV9jaGVja2luZy50c1xuXG5cbmZ1bmN0aW9uIGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKSB7XG4gIHJldHVybiBpc1N0cmluZyhjb21wYXJhdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gbWF0Y2hlcyhlbGUsIGNvbXBhcmF0b3IpO1xuICB9IDogaXNGdW5jdGlvbihjb21wYXJhdG9yKSA/IGNvbXBhcmF0b3IgOiBpc0Nhc2goY29tcGFyYXRvcikgPyBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGNvbXBhcmF0b3IuaXMoZWxlKTtcbiAgfSA6ICFjb21wYXJhdG9yID8gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSA6IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZWxlID09PSBjb21wYXJhdG9yO1xuICB9O1xufVxuXG5mbi5maWx0ZXIgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICB2YXIgY29tcGFyZSA9IGdldENvbXBhcmVGdW5jdGlvbihjb21wYXJhdG9yKTtcbiAgcmV0dXJuIGNhc2goZmlsdGVyLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KSk7XG59OyAvLyBAcmVxdWlyZSBjb2xsZWN0aW9uL2ZpbHRlci50c1xuXG5cbmZ1bmN0aW9uIGZpbHRlcmVkKGNvbGxlY3Rpb24sIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuICFjb21wYXJhdG9yID8gY29sbGVjdGlvbiA6IGNvbGxlY3Rpb24uZmlsdGVyKGNvbXBhcmF0b3IpO1xufSAvLyBAcmVxdWlyZSAuL3R5cGVfY2hlY2tpbmcudHNcblxuXG52YXIgc3BsaXRWYWx1ZXNSZSA9IC9cXFMrL2c7XG5cbmZ1bmN0aW9uIGdldFNwbGl0VmFsdWVzKHN0cikge1xuICByZXR1cm4gaXNTdHJpbmcoc3RyKSA/IHN0ci5tYXRjaChzcGxpdFZhbHVlc1JlKSB8fCBbXSA6IFtdO1xufVxuXG5mbi5oYXNDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgcmV0dXJuICEhY2xzICYmIHNvbWUuY2FsbCh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGlzRWxlbWVudChlbGUpICYmIGVsZS5jbGFzc0xpc3QuY29udGFpbnMoY2xzKTtcbiAgfSk7XG59O1xuXG5mbi5yZW1vdmVBdHRyID0gZnVuY3Rpb24gKGF0dHIpIHtcbiAgdmFyIGF0dHJzID0gZ2V0U3BsaXRWYWx1ZXMoYXR0cik7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoaSwgYSkge1xuICAgICAgZWxlLnJlbW92ZUF0dHJpYnV0ZShhKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBhdHRyKGF0dHIsIHZhbHVlKSB7XG4gIGlmICghYXR0cikgcmV0dXJuO1xuXG4gIGlmIChpc1N0cmluZyhhdHRyKSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgaWYgKCF0aGlzWzBdIHx8ICFpc0VsZW1lbnQodGhpc1swXSkpIHJldHVybjtcbiAgICAgIHZhciB2YWx1ZV8xID0gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cik7XG4gICAgICByZXR1cm4gaXNOdWxsKHZhbHVlXzEpID8gdW5kZWZpbmVkIDogdmFsdWVfMTtcbiAgICB9XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodmFsdWUpKSByZXR1cm4gdGhpcztcbiAgICBpZiAoaXNOdWxsKHZhbHVlKSkgcmV0dXJuIHRoaXMucmVtb3ZlQXR0cihhdHRyKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICAgIGVsZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIGF0dHIpIHtcbiAgICB0aGlzLmF0dHIoa2V5LCBhdHRyW2tleV0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG5cbmZuLmF0dHIgPSBhdHRyO1xuXG5mbi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbHMsIGZvcmNlKSB7XG4gIHZhciBjbGFzc2VzID0gZ2V0U3BsaXRWYWx1ZXMoY2xzKSxcbiAgICAgIGlzRm9yY2UgPSAhaXNVbmRlZmluZWQoZm9yY2UpO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWFjaChjbGFzc2VzLCBmdW5jdGlvbiAoaSwgYykge1xuICAgICAgaWYgKGlzRm9yY2UpIHtcbiAgICAgICAgZm9yY2UgPyBlbGUuY2xhc3NMaXN0LmFkZChjKSA6IGVsZS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLmNsYXNzTGlzdC50b2dnbGUoYyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuZm4uYWRkQ2xhc3MgPSBmdW5jdGlvbiAoY2xzKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgdHJ1ZSk7XG59O1xuXG5mbi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChjbHMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLnRvZ2dsZUNsYXNzKGNscywgZmFsc2UpO1xuICByZXR1cm4gdGhpcy5hdHRyKCdjbGFzcycsICcnKTtcbn07XG5cbmZ1bmN0aW9uIHBsdWNrKGFyciwgcHJvcCwgZGVlcCwgdW50aWwpIHtcbiAgdmFyIHBsdWNrZWQgPSBbXSxcbiAgICAgIGlzQ2FsbGJhY2sgPSBpc0Z1bmN0aW9uKHByb3ApLFxuICAgICAgY29tcGFyZSA9IHVudGlsICYmIGdldENvbXBhcmVGdW5jdGlvbih1bnRpbCk7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgaWYgKGlzQ2FsbGJhY2spIHtcbiAgICAgIHZhciB2YWxfMSA9IHByb3AoYXJyW2ldKTtcbiAgICAgIGlmICh2YWxfMS5sZW5ndGgpIHB1c2guYXBwbHkocGx1Y2tlZCwgdmFsXzEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmFsXzIgPSBhcnJbaV1bcHJvcF07XG5cbiAgICAgIHdoaWxlICh2YWxfMiAhPSBudWxsKSB7XG4gICAgICAgIGlmICh1bnRpbCAmJiBjb21wYXJlKC0xLCB2YWxfMikpIGJyZWFrO1xuICAgICAgICBwbHVja2VkLnB1c2godmFsXzIpO1xuICAgICAgICB2YWxfMiA9IGRlZXAgPyB2YWxfMltwcm9wXSA6IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBsdWNrZWQ7XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgcmV0dXJuIGFyci5sZW5ndGggPiAxID8gZmlsdGVyLmNhbGwoYXJyLCBmdW5jdGlvbiAoaXRlbSwgaW5kZXgsIHNlbGYpIHtcbiAgICByZXR1cm4gaW5kZXhPZi5jYWxsKHNlbGYsIGl0ZW0pID09PSBpbmRleDtcbiAgfSkgOiBhcnI7XG59XG5cbmNhc2gudW5pcXVlID0gdW5pcXVlO1xuXG5mbi5hZGQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgcmV0dXJuIGNhc2godW5pcXVlKHRoaXMuZ2V0KCkuY29uY2F0KGNhc2goc2VsZWN0b3IsIGNvbnRleHQpLmdldCgpKSkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS90eXBlX2NoZWNraW5nLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuXG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZShlbGUsIHByb3AsIGlzVmFyaWFibGUpIHtcbiAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICB2YXIgc3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbGUsIG51bGwpO1xuICByZXR1cm4gaXNWYXJpYWJsZSA/IHN0eWxlLmdldFByb3BlcnR5VmFsdWUocHJvcCkgfHwgdW5kZWZpbmVkIDogc3R5bGVbcHJvcF0gfHwgZWxlLnN0eWxlW3Byb3BdO1xufSAvLyBAcmVxdWlyZSAuL2NvbXB1dGVfc3R5bGUudHNcblxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVJbnQoZWxlLCBwcm9wKSB7XG4gIHJldHVybiBwYXJzZUludChjb21wdXRlU3R5bGUoZWxlLCBwcm9wKSwgMTApIHx8IDA7XG59XG5cbnZhciBjc3NWYXJpYWJsZVJlID0gL14tLS87IC8vIEByZXF1aXJlIC4vdmFyaWFibGVzLnRzXG5cbmZ1bmN0aW9uIGlzQ1NTVmFyaWFibGUocHJvcCkge1xuICByZXR1cm4gY3NzVmFyaWFibGVSZS50ZXN0KHByb3ApO1xufSAvLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FzaC50c1xuLy8gQHJlcXVpcmUgY29yZS9lYWNoLnRzXG4vLyBAcmVxdWlyZSBjb3JlL3ZhcmlhYmxlcy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcblxuXG52YXIgcHJlZml4ZWRQcm9wcyA9IHt9LFxuICAgIHN0eWxlID0gZGl2LnN0eWxlLFxuICAgIHZlbmRvcnNQcmVmaXhlcyA9IFsnd2Via2l0JywgJ21veicsICdtcyddO1xuXG5mdW5jdGlvbiBnZXRQcmVmaXhlZFByb3AocHJvcCwgaXNWYXJpYWJsZSkge1xuICBpZiAoaXNWYXJpYWJsZSA9PT0gdm9pZCAwKSB7XG4gICAgaXNWYXJpYWJsZSA9IGlzQ1NTVmFyaWFibGUocHJvcCk7XG4gIH1cblxuICBpZiAoaXNWYXJpYWJsZSkgcmV0dXJuIHByb3A7XG5cbiAgaWYgKCFwcmVmaXhlZFByb3BzW3Byb3BdKSB7XG4gICAgdmFyIHByb3BDQyA9IGNhbWVsQ2FzZShwcm9wKSxcbiAgICAgICAgcHJvcFVDID0gXCJcIiArIHByb3BDQ1swXS50b1VwcGVyQ2FzZSgpICsgcHJvcENDLnNsaWNlKDEpLFxuICAgICAgICBwcm9wcyA9IChwcm9wQ0MgKyBcIiBcIiArIHZlbmRvcnNQcmVmaXhlcy5qb2luKHByb3BVQyArIFwiIFwiKSArIHByb3BVQykuc3BsaXQoJyAnKTtcbiAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoaSwgcCkge1xuICAgICAgaWYgKHAgaW4gc3R5bGUpIHtcbiAgICAgICAgcHJlZml4ZWRQcm9wc1twcm9wXSA9IHA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBwcmVmaXhlZFByb3BzW3Byb3BdO1xufVxuXG47IC8vIEByZXF1aXJlIGNvcmUvdHlwZV9jaGVja2luZy50c1xuLy8gQHJlcXVpcmUgLi9pc19jc3NfdmFyaWFibGUudHNcblxudmFyIG51bWVyaWNQcm9wcyA9IHtcbiAgYW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG4gIGNvbHVtbkNvdW50OiB0cnVlLFxuICBmbGV4R3JvdzogdHJ1ZSxcbiAgZmxleFNocmluazogdHJ1ZSxcbiAgZm9udFdlaWdodDogdHJ1ZSxcbiAgZ3JpZEFyZWE6IHRydWUsXG4gIGdyaWRDb2x1bW46IHRydWUsXG4gIGdyaWRDb2x1bW5FbmQ6IHRydWUsXG4gIGdyaWRDb2x1bW5TdGFydDogdHJ1ZSxcbiAgZ3JpZFJvdzogdHJ1ZSxcbiAgZ3JpZFJvd0VuZDogdHJ1ZSxcbiAgZ3JpZFJvd1N0YXJ0OiB0cnVlLFxuICBsaW5lSGVpZ2h0OiB0cnVlLFxuICBvcGFjaXR5OiB0cnVlLFxuICBvcmRlcjogdHJ1ZSxcbiAgb3JwaGFuczogdHJ1ZSxcbiAgd2lkb3dzOiB0cnVlLFxuICB6SW5kZXg6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGdldFN1ZmZpeGVkVmFsdWUocHJvcCwgdmFsdWUsIGlzVmFyaWFibGUpIHtcbiAgaWYgKGlzVmFyaWFibGUgPT09IHZvaWQgMCkge1xuICAgIGlzVmFyaWFibGUgPSBpc0NTU1ZhcmlhYmxlKHByb3ApO1xuICB9XG5cbiAgcmV0dXJuICFpc1ZhcmlhYmxlICYmICFudW1lcmljUHJvcHNbcHJvcF0gJiYgaXNOdW1lcmljKHZhbHVlKSA/IHZhbHVlICsgXCJweFwiIDogdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNzcyhwcm9wLCB2YWx1ZSkge1xuICBpZiAoaXNTdHJpbmcocHJvcCkpIHtcbiAgICB2YXIgaXNWYXJpYWJsZV8xID0gaXNDU1NWYXJpYWJsZShwcm9wKTtcbiAgICBwcm9wID0gZ2V0UHJlZml4ZWRQcm9wKHByb3AsIGlzVmFyaWFibGVfMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiBjb21wdXRlU3R5bGUodGhpc1swXSwgcHJvcCwgaXNWYXJpYWJsZV8xKTtcbiAgICBpZiAoIXByb3ApIHJldHVybiB0aGlzO1xuICAgIHZhbHVlID0gZ2V0U3VmZml4ZWRWYWx1ZShwcm9wLCB2YWx1ZSwgaXNWYXJpYWJsZV8xKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcblxuICAgICAgaWYgKGlzVmFyaWFibGVfMSkge1xuICAgICAgICBlbGUuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlLnN0eWxlW3Byb3BdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gcHJvcCkge1xuICAgIHRoaXMuY3NzKGtleSwgcHJvcFtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG47XG5mbi5jc3MgPSBjc3M7IC8vIEBvcHRpb25hbCAuL2Nzcy50c1xuLy8gQHJlcXVpcmUgY29yZS9hdHRlbXB0LnRzXG4vLyBAcmVxdWlyZSBjb3JlL2NhbWVsX2Nhc2UudHNcblxudmFyIEpTT05TdHJpbmdSZSA9IC9eXFxzK3xcXHMrJC87XG5cbmZ1bmN0aW9uIGdldERhdGEoZWxlLCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZWxlLmRhdGFzZXRba2V5XSB8fCBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV07XG4gIGlmIChKU09OU3RyaW5nUmUudGVzdCh2YWx1ZSkpIHJldHVybiB2YWx1ZTtcbiAgcmV0dXJuIGF0dGVtcHQoSlNPTi5wYXJzZSwgdmFsdWUpO1xufSAvLyBAcmVxdWlyZSBjb3JlL2F0dGVtcHQudHNcbi8vIEByZXF1aXJlIGNvcmUvY2FtZWxfY2FzZS50c1xuXG5cbmZ1bmN0aW9uIHNldERhdGEoZWxlLCBrZXksIHZhbHVlKSB7XG4gIHZhbHVlID0gYXR0ZW1wdChKU09OLnN0cmluZ2lmeSwgdmFsdWUpO1xuICBlbGUuZGF0YXNldFtjYW1lbENhc2Uoa2V5KV0gPSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gZGF0YShuYW1lLCB2YWx1ZSkge1xuICBpZiAoIW5hbWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHJldHVybjtcbiAgICB2YXIgZGF0YXMgPSB7fTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzWzBdLmRhdGFzZXQpIHtcbiAgICAgIGRhdGFzW2tleV0gPSBnZXREYXRhKHRoaXNbMF0sIGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGFzO1xuICB9XG5cbiAgaWYgKGlzU3RyaW5nKG5hbWUpKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gdGhpc1swXSAmJiBnZXREYXRhKHRoaXNbMF0sIG5hbWUpO1xuICAgIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiB0aGlzO1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgICAgc2V0RGF0YShlbGUsIG5hbWUsIHZhbHVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBuYW1lKSB7XG4gICAgdGhpcy5kYXRhKGtleSwgbmFtZVtrZXldKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufVxuXG5mbi5kYXRhID0gZGF0YTsgLy8gQG9wdGlvbmFsIC4vZGF0YS50c1xuXG5mdW5jdGlvbiBnZXREb2N1bWVudERpbWVuc2lvbihkb2MsIGRpbWVuc2lvbikge1xuICB2YXIgZG9jRWxlID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgcmV0dXJuIE1hdGgubWF4KGRvYy5ib2R5W1wic2Nyb2xsXCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJzY3JvbGxcIiArIGRpbWVuc2lvbl0sIGRvYy5ib2R5W1wib2Zmc2V0XCIgKyBkaW1lbnNpb25dLCBkb2NFbGVbXCJvZmZzZXRcIiArIGRpbWVuc2lvbl0sIGRvY0VsZVtcImNsaWVudFwiICsgZGltZW5zaW9uXSk7XG59IC8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGVfaW50LnRzXG5cblxuZnVuY3Rpb24gZ2V0RXh0cmFTcGFjZShlbGUsIHhBeGlzKSB7XG4gIHJldHVybiBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpICsgXCJXaWR0aFwiKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ0xlZnQnIDogJ1RvcCcpKSArIGNvbXB1dGVTdHlsZUludChlbGUsIFwicGFkZGluZ1wiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSkgKyBjb21wdXRlU3R5bGVJbnQoZWxlLCBcImJvcmRlclwiICsgKHhBeGlzID8gJ1JpZ2h0JyA6ICdCb3R0b20nKSArIFwiV2lkdGhcIik7XG59XG5cbmVhY2goW3RydWUsIGZhbHNlXSwgZnVuY3Rpb24gKGksIG91dGVyKSB7XG4gIGVhY2goWydXaWR0aCcsICdIZWlnaHQnXSwgZnVuY3Rpb24gKGksIHByb3ApIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIgKyAob3V0ZXIgPyAnb3V0ZXInIDogJ2lubmVyJykgKyBwcm9wO1xuXG4gICAgZm5bbmFtZV0gPSBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgIGlmICghdGhpc1swXSkgcmV0dXJuO1xuICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKSByZXR1cm4gb3V0ZXIgPyB0aGlzWzBdW1wiaW5uZXJcIiArIHByb3BdIDogdGhpc1swXS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIHByb3BdO1xuICAgICAgaWYgKGlzRG9jdW1lbnQodGhpc1swXSkpIHJldHVybiBnZXREb2N1bWVudERpbWVuc2lvbih0aGlzWzBdLCBwcm9wKTtcbiAgICAgIHJldHVybiB0aGlzWzBdW1wiXCIgKyAob3V0ZXIgPyAnb2Zmc2V0JyA6ICdjbGllbnQnKSArIHByb3BdICsgKGluY2x1ZGVNYXJnaW5zICYmIG91dGVyID8gY29tcHV0ZVN0eWxlSW50KHRoaXNbMF0sIFwibWFyZ2luXCIgKyAoaSA/ICdUb3AnIDogJ0xlZnQnKSkgKyBjb21wdXRlU3R5bGVJbnQodGhpc1swXSwgXCJtYXJnaW5cIiArIChpID8gJ0JvdHRvbScgOiAnUmlnaHQnKSkgOiAwKTtcbiAgICB9O1xuICB9KTtcbn0pO1xuZWFjaChbJ1dpZHRoJywgJ0hlaWdodCddLCBmdW5jdGlvbiAoaW5kZXgsIHByb3ApIHtcbiAgdmFyIHByb3BMQyA9IHByb3AudG9Mb3dlckNhc2UoKTtcblxuICBmbltwcm9wTENdID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF0aGlzWzBdKSByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpID8gdW5kZWZpbmVkIDogdGhpcztcblxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgaWYgKGlzV2luZG93KHRoaXNbMF0pKSByZXR1cm4gdGhpc1swXS5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnRbXCJjbGllbnRcIiArIHByb3BdO1xuICAgICAgaWYgKGlzRG9jdW1lbnQodGhpc1swXSkpIHJldHVybiBnZXREb2N1bWVudERpbWVuc2lvbih0aGlzWzBdLCBwcm9wKTtcbiAgICAgIHJldHVybiB0aGlzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3Byb3BMQ10gLSBnZXRFeHRyYVNwYWNlKHRoaXNbMF0sICFpbmRleCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlTnVtYmVyID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICAgIHZhciBib3hTaXppbmcgPSBjb21wdXRlU3R5bGUoZWxlLCAnYm94U2l6aW5nJyk7XG4gICAgICBlbGUuc3R5bGVbcHJvcExDXSA9IGdldFN1ZmZpeGVkVmFsdWUocHJvcExDLCB2YWx1ZU51bWJlciArIChib3hTaXppbmcgPT09ICdib3JkZXItYm94JyA/IGdldEV4dHJhU3BhY2UoZWxlLCAhaW5kZXgpIDogMCkpO1xuICAgIH0pO1xuICB9O1xufSk7IC8vIEBvcHRpb25hbCAuL2lubmVyX291dGVyLnRzXG4vLyBAb3B0aW9uYWwgLi9ub3JtYWwudHNcbi8vIEByZXF1aXJlIGNzcy9oZWxwZXJzL2NvbXB1dGVfc3R5bGUudHNcblxudmFyIGRlZmF1bHREaXNwbGF5ID0ge307XG5cbmZ1bmN0aW9uIGdldERlZmF1bHREaXNwbGF5KHRhZ05hbWUpIHtcbiAgaWYgKGRlZmF1bHREaXNwbGF5W3RhZ05hbWVdKSByZXR1cm4gZGVmYXVsdERpc3BsYXlbdGFnTmFtZV07XG4gIHZhciBlbGUgPSBjcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBkb2MuYm9keS5pbnNlcnRCZWZvcmUoZWxlLCBudWxsKTtcbiAgdmFyIGRpc3BsYXkgPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICBkb2MuYm9keS5yZW1vdmVDaGlsZChlbGUpO1xuICByZXR1cm4gZGVmYXVsdERpc3BsYXlbdGFnTmFtZV0gPSBkaXNwbGF5ICE9PSAnbm9uZScgPyBkaXNwbGF5IDogJ2Jsb2NrJztcbn0gLy8gQHJlcXVpcmUgY3NzL2hlbHBlcnMvY29tcHV0ZV9zdHlsZS50c1xuXG5cbmZ1bmN0aW9uIGlzSGlkZGVuKGVsZSkge1xuICByZXR1cm4gY29tcHV0ZVN0eWxlKGVsZSwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnO1xufVxuXG52YXIgZGlzcGxheVByb3BlcnR5ID0gJ19fX2NkJztcblxuZm4udG9nZ2xlID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmICghaXNFbGVtZW50KGVsZSkpIHJldHVybjtcbiAgICB2YXIgc2hvdyA9IGlzVW5kZWZpbmVkKGZvcmNlKSA/IGlzSGlkZGVuKGVsZSkgOiBmb3JjZTtcblxuICAgIGlmIChzaG93KSB7XG4gICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGVsZVtkaXNwbGF5UHJvcGVydHldIHx8ICcnO1xuXG4gICAgICBpZiAoaXNIaWRkZW4oZWxlKSkge1xuICAgICAgICBlbGUuc3R5bGUuZGlzcGxheSA9IGdldERlZmF1bHREaXNwbGF5KGVsZS50YWdOYW1lKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlW2Rpc3BsYXlQcm9wZXJ0eV0gPSBjb21wdXRlU3R5bGUoZWxlLCAnZGlzcGxheScpO1xuICAgICAgZWxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn07XG5cbmZuLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnRvZ2dsZShmYWxzZSk7XG59O1xuXG5mbi5zaG93ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSk7XG59OyAvLyBAb3B0aW9uYWwgLi9oaWRlLnRzXG4vLyBAb3B0aW9uYWwgLi9zaG93LnRzXG4vLyBAb3B0aW9uYWwgLi90b2dnbGUudHNcblxuXG5mdW5jdGlvbiBoYXNOYW1lc3BhY2VzKG5zMSwgbnMyKSB7XG4gIHJldHVybiAhbnMyIHx8ICFzb21lLmNhbGwobnMyLCBmdW5jdGlvbiAobnMpIHtcbiAgICByZXR1cm4gbnMxLmluZGV4T2YobnMpIDwgMDtcbiAgfSk7XG59XG5cbnZhciBldmVudHNOYW1lc3BhY2UgPSAnX19fY2UnLFxuICAgIGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IgPSAnLicsXG4gICAgZXZlbnRzRm9jdXMgPSB7XG4gIGZvY3VzOiAnZm9jdXNpbicsXG4gIGJsdXI6ICdmb2N1c291dCdcbn0sXG4gICAgZXZlbnRzSG92ZXIgPSB7XG4gIG1vdXNlZW50ZXI6ICdtb3VzZW92ZXInLFxuICBtb3VzZWxlYXZlOiAnbW91c2VvdXQnXG59LFxuICAgIGV2ZW50c01vdXNlUmUgPSAvXihtb3VzZXxwb2ludGVyfGNvbnRleHRtZW51fGRyYWd8ZHJvcHxjbGlja3xkYmxjbGljaykvaTsgLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuZnVuY3Rpb24gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZSkge1xuICByZXR1cm4gZXZlbnRzSG92ZXJbbmFtZV0gfHwgZXZlbnRzRm9jdXNbbmFtZV0gfHwgbmFtZTtcbn0gLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBnZXRFdmVudHNDYWNoZShlbGUpIHtcbiAgcmV0dXJuIGVsZVtldmVudHNOYW1lc3BhY2VdID0gZWxlW2V2ZW50c05hbWVzcGFjZV0gfHwge307XG59IC8vIEByZXF1aXJlIGNvcmUvZ3VpZC50c1xuLy8gQHJlcXVpcmUgZXZlbnRzL2hlbHBlcnMvZ2V0X2V2ZW50c19jYWNoZS50c1xuXG5cbmZ1bmN0aW9uIGFkZEV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gIHZhciBldmVudENhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcbiAgZXZlbnRDYWNoZVtuYW1lXSA9IGV2ZW50Q2FjaGVbbmFtZV0gfHwgW107XG4gIGV2ZW50Q2FjaGVbbmFtZV0ucHVzaChbbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrXSk7XG4gIGVsZS5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGNhbGxiYWNrKTtcbn0gLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBwYXJzZUV2ZW50TmFtZShldmVudE5hbWUpIHtcbiAgdmFyIHBhcnRzID0gZXZlbnROYW1lLnNwbGl0KGV2ZW50c05hbWVzcGFjZXNTZXBhcmF0b3IpO1xuICByZXR1cm4gW3BhcnRzWzBdLCBwYXJ0cy5zbGljZSgxKS5zb3J0KCldOyAvLyBbbmFtZSwgbmFtZXNwYWNlW11dXG59IC8vIEByZXF1aXJlIC4vZ2V0X2V2ZW50c19jYWNoZS50c1xuLy8gQHJlcXVpcmUgLi9oYXNfbmFtZXNwYWNlcy50c1xuLy8gQHJlcXVpcmUgLi9wYXJzZV9ldmVudF9uYW1lLnRzXG5cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgdmFyIGNhY2hlID0gZ2V0RXZlbnRzQ2FjaGUoZWxlKTtcblxuICBpZiAoIW5hbWUpIHtcbiAgICBmb3IgKG5hbWUgaW4gY2FjaGUpIHtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY2FjaGVbbmFtZV0pIHtcbiAgICBjYWNoZVtuYW1lXSA9IGNhY2hlW25hbWVdLmZpbHRlcihmdW5jdGlvbiAoX2EpIHtcbiAgICAgIHZhciBucyA9IF9hWzBdLFxuICAgICAgICAgIHNlbCA9IF9hWzFdLFxuICAgICAgICAgIGNiID0gX2FbMl07XG4gICAgICBpZiAoY2FsbGJhY2sgJiYgY2IuZ3VpZCAhPT0gY2FsbGJhY2suZ3VpZCB8fCAhaGFzTmFtZXNwYWNlcyhucywgbmFtZXNwYWNlcykgfHwgc2VsZWN0b3IgJiYgc2VsZWN0b3IgIT09IHNlbCkgcmV0dXJuIHRydWU7XG4gICAgICBlbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBjYik7XG4gICAgfSk7XG4gIH1cbn1cblxuZm4ub2ZmID0gZnVuY3Rpb24gKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIGlmIChpc1VuZGVmaW5lZChldmVudEZ1bGxOYW1lKSkge1xuICAgIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcbiAgICAgIHJlbW92ZUV2ZW50KGVsZSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub2ZmKGtleSwgZXZlbnRGdWxsTmFtZVtrZXldKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oc2VsZWN0b3IpKSB7XG4gICAgICBjYWxsYmFjayA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSAnJztcbiAgICB9XG5cbiAgICBlYWNoKGdldFNwbGl0VmFsdWVzKGV2ZW50RnVsbE5hbWUpLCBmdW5jdGlvbiAoaSwgZXZlbnRGdWxsTmFtZSkge1xuICAgICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksXG4gICAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgICAgbmFtZXNwYWNlcyA9IF9hWzFdLFxuICAgICAgICAgIG5hbWUgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpO1xuXG4gICAgICBfdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgICAgaWYgKCFpc0VsZW1lbnQoZWxlKSAmJiAhaXNEb2N1bWVudChlbGUpICYmICFpc1dpbmRvdyhlbGUpKSByZXR1cm47XG4gICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBvbihldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIF9vbmUpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoIWlzU3RyaW5nKGV2ZW50RnVsbE5hbWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGV2ZW50RnVsbE5hbWUpIHtcbiAgICAgIHRoaXMub24oa2V5LCBzZWxlY3RvciwgZGF0YSwgZXZlbnRGdWxsTmFtZVtrZXldLCBfb25lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICghaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHNlbGVjdG9yKSB8fCBpc051bGwoc2VsZWN0b3IpKSB7XG4gICAgICBzZWxlY3RvciA9ICcnO1xuICAgIH0gZWxzZSBpZiAoaXNVbmRlZmluZWQoZGF0YSkpIHtcbiAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICAgIGRhdGEgPSBzZWxlY3RvcjtcbiAgICAgIHNlbGVjdG9yID0gJyc7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGNhbGxiYWNrKSkge1xuICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gIGVhY2goZ2V0U3BsaXRWYWx1ZXMoZXZlbnRGdWxsTmFtZSksIGZ1bmN0aW9uIChpLCBldmVudEZ1bGxOYW1lKSB7XG4gICAgdmFyIF9hID0gcGFyc2VFdmVudE5hbWUoZXZlbnRGdWxsTmFtZSksXG4gICAgICAgIG5hbWVPcmlnaW5hbCA9IF9hWzBdLFxuICAgICAgICBuYW1lc3BhY2VzID0gX2FbMV0sXG4gICAgICAgIG5hbWUgPSBnZXRFdmVudE5hbWVCdWJibGluZyhuYW1lT3JpZ2luYWwpLFxuICAgICAgICBpc0V2ZW50SG92ZXIgPSBuYW1lT3JpZ2luYWwgaW4gZXZlbnRzSG92ZXIsXG4gICAgICAgIGlzRXZlbnRGb2N1cyA9IG5hbWVPcmlnaW5hbCBpbiBldmVudHNGb2N1cztcblxuICAgIGlmICghbmFtZSkgcmV0dXJuO1xuXG4gICAgX3RoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgICBpZiAoIWlzRWxlbWVudChlbGUpICYmICFpc0RvY3VtZW50KGVsZSkgJiYgIWlzV2luZG93KGVsZSkpIHJldHVybjtcblxuICAgICAgdmFyIGZpbmFsQ2FsbGJhY2sgPSBmdW5jdGlvbiBmaW5hbENhbGxiYWNrKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC50YXJnZXRbXCJfX19pXCIgKyBldmVudC50eXBlXSkgcmV0dXJuIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpOyAvLyBJZ25vcmluZyBuYXRpdmUgZXZlbnQgaW4gZmF2b3Igb2YgdGhlIHVwY29taW5nIGN1c3RvbSBvbmVcblxuICAgICAgICBpZiAoZXZlbnQubmFtZXNwYWNlICYmICFoYXNOYW1lc3BhY2VzKG5hbWVzcGFjZXMsIGV2ZW50Lm5hbWVzcGFjZS5zcGxpdChldmVudHNOYW1lc3BhY2VzU2VwYXJhdG9yKSkpIHJldHVybjtcbiAgICAgICAgaWYgKCFzZWxlY3RvciAmJiAoaXNFdmVudEZvY3VzICYmIChldmVudC50YXJnZXQgIT09IGVsZSB8fCBldmVudC5fX19vdCA9PT0gbmFtZSkgfHwgaXNFdmVudEhvdmVyICYmIGV2ZW50LnJlbGF0ZWRUYXJnZXQgJiYgZWxlLmNvbnRhaW5zKGV2ZW50LnJlbGF0ZWRUYXJnZXQpKSkgcmV0dXJuO1xuICAgICAgICB2YXIgdGhpc0FyZyA9IGVsZTtcblxuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgICAgICAgd2hpbGUgKCFtYXRjaGVzKHRhcmdldCwgc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGUpIHJldHVybjtcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzQXJnID0gdGFyZ2V0O1xuICAgICAgICAgIGV2ZW50Ll9fX2NkID0gdHJ1ZTsgLy8gRGVsZWdhdGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5fX19jZCkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShldmVudCwgJ2N1cnJlbnRUYXJnZXQnLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNBcmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXZlbnQsICdkYXRhJywge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciByZXR1cm5WYWx1ZSA9IGNhbGxiYWNrLmNhbGwodGhpc0FyZywgZXZlbnQsIGV2ZW50Ll9fX3RkKTtcblxuICAgICAgICBpZiAoX29uZSkge1xuICAgICAgICAgIHJlbW92ZUV2ZW50KGVsZSwgbmFtZSwgbmFtZXNwYWNlcywgc2VsZWN0b3IsIGZpbmFsQ2FsbGJhY2spO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJldHVyblZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGZpbmFsQ2FsbGJhY2suZ3VpZCA9IGNhbGxiYWNrLmd1aWQgPSBjYWxsYmFjay5ndWlkIHx8IGNhc2guZ3VpZCsrO1xuICAgICAgYWRkRXZlbnQoZWxlLCBuYW1lLCBuYW1lc3BhY2VzLCBzZWxlY3RvciwgZmluYWxDYWxsYmFjayk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn1cblxuZm4ub24gPSBvbjtcblxuZnVuY3Rpb24gb25lKGV2ZW50RnVsbE5hbWUsIHNlbGVjdG9yLCBkYXRhLCBjYWxsYmFjaykge1xuICByZXR1cm4gdGhpcy5vbihldmVudEZ1bGxOYW1lLCBzZWxlY3RvciwgZGF0YSwgY2FsbGJhY2ssIHRydWUpO1xufVxuXG47XG5mbi5vbmUgPSBvbmU7XG5cbmZuLnJlYWR5ID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHZhciBjYiA9IGZ1bmN0aW9uIGNiKCkge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwLCBjYXNoKTtcbiAgfTtcblxuICBpZiAoZG9jLnJlYWR5U3RhdGUgIT09ICdsb2FkaW5nJykge1xuICAgIGNiKCk7XG4gIH0gZWxzZSB7XG4gICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGRhdGEpIHtcbiAgaWYgKGlzU3RyaW5nKGV2ZW50KSkge1xuICAgIHZhciBfYSA9IHBhcnNlRXZlbnROYW1lKGV2ZW50KSxcbiAgICAgICAgbmFtZU9yaWdpbmFsID0gX2FbMF0sXG4gICAgICAgIG5hbWVzcGFjZXMgPSBfYVsxXSxcbiAgICAgICAgbmFtZV8xID0gZ2V0RXZlbnROYW1lQnViYmxpbmcobmFtZU9yaWdpbmFsKTtcblxuICAgIGlmICghbmFtZV8xKSByZXR1cm4gdGhpcztcbiAgICB2YXIgdHlwZSA9IGV2ZW50c01vdXNlUmUudGVzdChuYW1lXzEpID8gJ01vdXNlRXZlbnRzJyA6ICdIVE1MRXZlbnRzJztcbiAgICBldmVudCA9IGRvYy5jcmVhdGVFdmVudCh0eXBlKTtcbiAgICBldmVudC5pbml0RXZlbnQobmFtZV8xLCB0cnVlLCB0cnVlKTtcbiAgICBldmVudC5uYW1lc3BhY2UgPSBuYW1lc3BhY2VzLmpvaW4oZXZlbnRzTmFtZXNwYWNlc1NlcGFyYXRvcik7XG4gICAgZXZlbnQuX19fb3QgPSBuYW1lT3JpZ2luYWw7XG4gIH1cblxuICBldmVudC5fX190ZCA9IGRhdGE7XG4gIHZhciBpc0V2ZW50Rm9jdXMgPSBldmVudC5fX19vdCBpbiBldmVudHNGb2N1cztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGlzRXZlbnRGb2N1cyAmJiBpc0Z1bmN0aW9uKGVsZVtldmVudC5fX19vdF0pKSB7XG4gICAgICBlbGVbXCJfX19pXCIgKyBldmVudC50eXBlXSA9IHRydWU7IC8vIEVuc3VyaW5nIHRoZSBuYXRpdmUgZXZlbnQgaXMgaWdub3JlZFxuXG4gICAgICBlbGVbZXZlbnQuX19fb3RdKCk7XG5cbiAgICAgIGVsZVtcIl9fX2lcIiArIGV2ZW50LnR5cGVdID0gZmFsc2U7IC8vIEVuc3VyaW5nIHRoZSBjdXN0b20gZXZlbnQgaXMgbm90IGlnbm9yZWRcbiAgICB9XG5cbiAgICBlbGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH0pO1xufTsgLy8gQG9wdGlvbmFsIC4vb2ZmLnRzXG4vLyBAb3B0aW9uYWwgLi9vbi50c1xuLy8gQG9wdGlvbmFsIC4vb25lLnRzXG4vLyBAb3B0aW9uYWwgLi9yZWFkeS50c1xuLy8gQG9wdGlvbmFsIC4vdHJpZ2dlci50c1xuLy8gQHJlcXVpcmUgY29yZS9wbHVjay50c1xuLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcblxuXG5mdW5jdGlvbiBnZXRWYWx1ZShlbGUpIHtcbiAgaWYgKGVsZS5tdWx0aXBsZSAmJiBlbGUub3B0aW9ucykgcmV0dXJuIHBsdWNrKGZpbHRlci5jYWxsKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAob3B0aW9uKSB7XG4gICAgcmV0dXJuIG9wdGlvbi5zZWxlY3RlZCAmJiAhb3B0aW9uLmRpc2FibGVkICYmICFvcHRpb24ucGFyZW50Tm9kZS5kaXNhYmxlZDtcbiAgfSksICd2YWx1ZScpO1xuICByZXR1cm4gZWxlLnZhbHVlIHx8ICcnO1xufVxuXG52YXIgcXVlcnlFbmNvZGVTcGFjZVJlID0gLyUyMC9nLFxuICAgIHF1ZXJ5RW5jb2RlQ1JMRlJlID0gL1xccj9cXG4vZztcblxuZnVuY3Rpb24gcXVlcnlFbmNvZGUocHJvcCwgdmFsdWUpIHtcbiAgcmV0dXJuIFwiJlwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHByb3ApICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUucmVwbGFjZShxdWVyeUVuY29kZUNSTEZSZSwgJ1xcclxcbicpKS5yZXBsYWNlKHF1ZXJ5RW5jb2RlU3BhY2VSZSwgJysnKTtcbn1cblxudmFyIHNraXBwYWJsZVJlID0gL2ZpbGV8cmVzZXR8c3VibWl0fGJ1dHRvbnxpbWFnZS9pLFxuICAgIGNoZWNrYWJsZVJlID0gL3JhZGlvfGNoZWNrYm94L2k7XG5cbmZuLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gJyc7XG4gIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgZWFjaChlbGUuZWxlbWVudHMgfHwgW2VsZV0sIGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICAgIGlmIChlbGUuZGlzYWJsZWQgfHwgIWVsZS5uYW1lIHx8IGVsZS50YWdOYW1lID09PSAnRklFTERTRVQnIHx8IHNraXBwYWJsZVJlLnRlc3QoZWxlLnR5cGUpIHx8IGNoZWNrYWJsZVJlLnRlc3QoZWxlLnR5cGUpICYmICFlbGUuY2hlY2tlZCkgcmV0dXJuO1xuICAgICAgdmFyIHZhbHVlID0gZ2V0VmFsdWUoZWxlKTtcblxuICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWx1ZSkpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgICBlYWNoKHZhbHVlcywgZnVuY3Rpb24gKGksIHZhbHVlKSB7XG4gICAgICAgICAgcXVlcnkgKz0gcXVlcnlFbmNvZGUoZWxlLm5hbWUsIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gcXVlcnkuc2xpY2UoMSk7XG59O1xuXG5mdW5jdGlvbiB2YWwodmFsdWUpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpc1swXSAmJiBnZXRWYWx1ZSh0aGlzWzBdKTtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIGlzU2VsZWN0ID0gZWxlLm11bHRpcGxlICYmIGVsZS5vcHRpb25zO1xuXG4gICAgaWYgKGlzU2VsZWN0IHx8IGNoZWNrYWJsZVJlLnRlc3QoZWxlLnR5cGUpKSB7XG4gICAgICB2YXIgZWxlVmFsdWVfMSA9IGlzQXJyYXkodmFsdWUpID8gbWFwLmNhbGwodmFsdWUsIFN0cmluZykgOiBpc051bGwodmFsdWUpID8gW10gOiBbU3RyaW5nKHZhbHVlKV07XG5cbiAgICAgIGlmIChpc1NlbGVjdCkge1xuICAgICAgICBlYWNoKGVsZS5vcHRpb25zLCBmdW5jdGlvbiAoaSwgb3B0aW9uKSB7XG4gICAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gZWxlVmFsdWVfMS5pbmRleE9mKG9wdGlvbi52YWx1ZSkgPj0gMDtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGUuY2hlY2tlZCA9IGVsZVZhbHVlXzEuaW5kZXhPZihlbGUudmFsdWUpID49IDA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZS52YWx1ZSA9IGlzVW5kZWZpbmVkKHZhbHVlKSB8fCBpc051bGwodmFsdWUpID8gJycgOiB2YWx1ZTtcbiAgICB9XG4gIH0pO1xufVxuXG5mbi52YWwgPSB2YWw7XG5cbmZuLmNsb25lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIHJldHVybiBlbGUuY2xvbmVOb2RlKHRydWUpO1xuICB9KTtcbn07XG5cbmZuLmRldGFjaCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIGZpbHRlcmVkKHRoaXMsIGNvbXBhcmF0b3IpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChlbGUucGFyZW50Tm9kZSkge1xuICAgICAgZWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbnZhciBmcmFnbWVudFJlID0gL15cXHMqPChcXHcrKVtePl0qPi8sXG4gICAgc2luZ2xlVGFnUmUgPSAvXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPik/JC87XG52YXIgY29udGFpbmVycyA9IHtcbiAgJyonOiBkaXYsXG4gIHRyOiB0Ym9keSxcbiAgdGQ6IHRyLFxuICB0aDogdHIsXG4gIHRoZWFkOiB0YWJsZSxcbiAgdGJvZHk6IHRhYmxlLFxuICB0Zm9vdDogdGFibGVcbn07IC8vVE9ETzogQ3JlYXRlIGVsZW1lbnRzIGluc2lkZSBhIGRvY3VtZW50IGZyYWdtZW50LCBpbiBvcmRlciB0byBwcmV2ZW50IGlubGluZSBldmVudCBoYW5kbGVycyBmcm9tIGZpcmluZ1xuLy9UT0RPOiBFbnN1cmUgdGhlIGNyZWF0ZWQgZWxlbWVudHMgaGF2ZSB0aGUgZnJhZ21lbnQgYXMgdGhlaXIgcGFyZW50IGluc3RlYWQgb2YgbnVsbCwgdGhpcyBhbHNvIGVuc3VyZXMgd2UgY2FuIGRlYWwgd2l0aCBkZXRhdGNoZWQgbm9kZXMgbW9yZSByZWxpYWJseVxuXG5mdW5jdGlvbiBwYXJzZUhUTUwoaHRtbCkge1xuICBpZiAoIWlzU3RyaW5nKGh0bWwpKSByZXR1cm4gW107XG4gIGlmIChzaW5nbGVUYWdSZS50ZXN0KGh0bWwpKSByZXR1cm4gW2NyZWF0ZUVsZW1lbnQoUmVnRXhwLiQxKV07XG4gIHZhciBmcmFnbWVudCA9IGZyYWdtZW50UmUudGVzdChodG1sKSAmJiBSZWdFeHAuJDEsXG4gICAgICBjb250YWluZXIgPSBjb250YWluZXJzW2ZyYWdtZW50XSB8fCBjb250YWluZXJzWycqJ107XG4gIGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sO1xuICByZXR1cm4gY2FzaChjb250YWluZXIuY2hpbGROb2RlcykuZGV0YWNoKCkuZ2V0KCk7XG59XG5cbmNhc2gucGFyc2VIVE1MID0gcGFyc2VIVE1MO1xuXG5mbi5lbXB0eSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgd2hpbGUgKGVsZS5maXJzdENoaWxkKSB7XG4gICAgICBlbGUucmVtb3ZlQ2hpbGQoZWxlLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBodG1sKGh0bWwpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpc1swXSAmJiB0aGlzWzBdLmlubmVySFRNTDtcbiAgaWYgKGlzVW5kZWZpbmVkKGh0bWwpKSByZXR1cm4gdGhpcztcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKCFpc0VsZW1lbnQoZWxlKSkgcmV0dXJuO1xuICAgIGVsZS5pbm5lckhUTUwgPSBodG1sO1xuICB9KTtcbn1cblxuZm4uaHRtbCA9IGh0bWw7XG5cbmZuLnJlbW92ZSA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIGZpbHRlcmVkKHRoaXMsIGNvbXBhcmF0b3IpLmRldGFjaCgpLm9mZigpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIHRleHQodGV4dCkge1xuICBpZiAoaXNVbmRlZmluZWQodGV4dCkpIHJldHVybiB0aGlzWzBdID8gdGhpc1swXS50ZXh0Q29udGVudCA6ICcnO1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICBpZiAoIWlzRWxlbWVudChlbGUpKSByZXR1cm47XG4gICAgZWxlLnRleHRDb250ZW50ID0gdGV4dDtcbiAgfSk7XG59XG5cbjtcbmZuLnRleHQgPSB0ZXh0O1xuXG5mbi51bndyYXAgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucGFyZW50KCkuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgaWYgKGVsZS50YWdOYW1lID09PSAnQk9EWScpIHJldHVybjtcbiAgICB2YXIgJGVsZSA9IGNhc2goZWxlKTtcbiAgICAkZWxlLnJlcGxhY2VXaXRoKCRlbGUuY2hpbGRyZW4oKSk7XG4gIH0pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZuLm9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG4gIGlmICghZWxlKSByZXR1cm47XG4gIHZhciByZWN0ID0gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQsXG4gICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0XG4gIH07XG59O1xuXG5mbi5vZmZzZXRQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyIG9mZnNldFBhcmVudCA9IGVsZS5vZmZzZXRQYXJlbnQ7XG5cbiAgICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGNvbXB1dGVTdHlsZShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0UGFyZW50IHx8IGRvY0VsZTtcbiAgfSk7XG59O1xuXG5mbi5wb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGVsZSA9IHRoaXNbMF07XG4gIGlmICghZWxlKSByZXR1cm47XG4gIHZhciBpc0ZpeGVkID0gY29tcHV0ZVN0eWxlKGVsZSwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcsXG4gICAgICBvZmZzZXQgPSBpc0ZpeGVkID8gZWxlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogdGhpcy5vZmZzZXQoKTtcblxuICBpZiAoIWlzRml4ZWQpIHtcbiAgICB2YXIgZG9jXzEgPSBlbGUub3duZXJEb2N1bWVudDtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlLm9mZnNldFBhcmVudCB8fCBkb2NfMS5kb2N1bWVudEVsZW1lbnQ7XG5cbiAgICB3aGlsZSAoKG9mZnNldFBhcmVudCA9PT0gZG9jXzEuYm9keSB8fCBvZmZzZXRQYXJlbnQgPT09IGRvY18xLmRvY3VtZW50RWxlbWVudCkgJiYgY29tcHV0ZVN0eWxlKG9mZnNldFBhcmVudCwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBvZmZzZXRQYXJlbnQucGFyZW50Tm9kZTtcbiAgICB9XG5cbiAgICBpZiAob2Zmc2V0UGFyZW50ICE9PSBlbGUgJiYgaXNFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIHZhciBwYXJlbnRPZmZzZXQgPSBjYXNoKG9mZnNldFBhcmVudCkub2Zmc2V0KCk7XG4gICAgICBvZmZzZXQudG9wIC09IHBhcmVudE9mZnNldC50b3AgKyBjb21wdXRlU3R5bGVJbnQob2Zmc2V0UGFyZW50LCAnYm9yZGVyVG9wV2lkdGgnKTtcbiAgICAgIG9mZnNldC5sZWZ0IC09IHBhcmVudE9mZnNldC5sZWZ0ICsgY29tcHV0ZVN0eWxlSW50KG9mZnNldFBhcmVudCwgJ2JvcmRlckxlZnRXaWR0aCcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBvZmZzZXQudG9wIC0gY29tcHV0ZVN0eWxlSW50KGVsZSwgJ21hcmdpblRvcCcpLFxuICAgIGxlZnQ6IG9mZnNldC5sZWZ0IC0gY29tcHV0ZVN0eWxlSW50KGVsZSwgJ21hcmdpbkxlZnQnKVxuICB9O1xufTtcblxuZm4uY2hpbGRyZW4gPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBlbGUuY2hpbGRyZW47XG4gIH0pKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4uY29udGVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCBmdW5jdGlvbiAoZWxlKSB7XG4gICAgcmV0dXJuIGVsZS50YWdOYW1lID09PSAnSUZSQU1FJyA/IFtlbGUuY29udGVudERvY3VtZW50XSA6IGVsZS50YWdOYW1lID09PSAnVEVNUExBVEUnID8gZWxlLmNvbnRlbnQuY2hpbGROb2RlcyA6IGVsZS5jaGlsZE5vZGVzO1xuICB9KSkpO1xufTtcblxuZm4uZmluZCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBmaW5kKHNlbGVjdG9yLCBlbGUpO1xuICB9KSkpO1xufTsgLy8gQHJlcXVpcmUgY29yZS92YXJpYWJsZXMudHNcbi8vIEByZXF1aXJlIGNvbGxlY3Rpb24vZmlsdGVyLnRzXG4vLyBAcmVxdWlyZSB0cmF2ZXJzYWwvZmluZC50c1xuXG5cbnZhciBIVE1MQ0RBVEFSZSA9IC9eXFxzKjwhKD86XFxbQ0RBVEFcXFt8LS0pfCg/OlxcXVxcXXwtLSk+XFxzKiQvZyxcbiAgICBzY3JpcHRUeXBlUmUgPSAvXiR8Xm1vZHVsZSR8XFwvKGphdmF8ZWNtYSlzY3JpcHQvaSxcbiAgICBzY3JpcHRBdHRyaWJ1dGVzID0gWyd0eXBlJywgJ3NyYycsICdub25jZScsICdub01vZHVsZSddO1xuXG5mdW5jdGlvbiBldmFsU2NyaXB0cyhub2RlLCBkb2MpIHtcbiAgdmFyIGNvbGxlY3Rpb24gPSBjYXNoKG5vZGUpO1xuICBjb2xsZWN0aW9uLmZpbHRlcignc2NyaXB0JykuYWRkKGNvbGxlY3Rpb24uZmluZCgnc2NyaXB0JykpLmVhY2goZnVuY3Rpb24gKGksIGVsZSkge1xuICAgIGlmIChzY3JpcHRUeXBlUmUudGVzdChlbGUudHlwZSkgJiYgZG9jRWxlLmNvbnRhaW5zKGVsZSkpIHtcbiAgICAgIC8vIFRoZSBzY3JpcHQgdHlwZSBpcyBzdXBwb3J0ZWQgLy8gVGhlIGVsZW1lbnQgaXMgYXR0YWNoZWQgdG8gdGhlIERPTSAvLyBVc2luZyBgZG9jdW1lbnRFbGVtZW50YCBmb3IgYnJvYWRlciBicm93c2VyIHN1cHBvcnRcbiAgICAgIHZhciBzY3JpcHRfMSA9IGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0XzEudGV4dCA9IGVsZS50ZXh0Q29udGVudC5yZXBsYWNlKEhUTUxDREFUQVJlLCAnJyk7XG4gICAgICBlYWNoKHNjcmlwdEF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChpLCBhdHRyKSB7XG4gICAgICAgIGlmIChlbGVbYXR0cl0pIHNjcmlwdF8xW2F0dHJdID0gZWxlW2F0dHJdO1xuICAgICAgfSk7XG4gICAgICBkb2MuaGVhZC5pbnNlcnRCZWZvcmUoc2NyaXB0XzEsIG51bGwpO1xuICAgICAgZG9jLmhlYWQucmVtb3ZlQ2hpbGQoc2NyaXB0XzEpO1xuICAgIH1cbiAgfSk7XG59IC8vIEByZXF1aXJlIC4vZXZhbF9zY3JpcHRzLnRzXG5cblxuZnVuY3Rpb24gaW5zZXJ0RWxlbWVudChhbmNob3IsIHRhcmdldCwgbGVmdCwgaW5zaWRlLCBldmFsdWF0ZSkge1xuICBpZiAoaW5zaWRlKSB7XG4gICAgLy8gcHJlcGVuZC9hcHBlbmRcbiAgICBhbmNob3IuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbGVmdCA/IGFuY2hvci5maXJzdENoaWxkIDogbnVsbCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYmVmb3JlL2FmdGVyXG4gICAgYW5jaG9yLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhcmdldCwgbGVmdCA/IGFuY2hvciA6IGFuY2hvci5uZXh0U2libGluZyk7XG4gIH1cblxuICBpZiAoZXZhbHVhdGUpIHtcbiAgICBldmFsU2NyaXB0cyh0YXJnZXQsIGFuY2hvci5vd25lckRvY3VtZW50KTtcbiAgfVxufSAvLyBAcmVxdWlyZSAuL2luc2VydF9lbGVtZW50LnRzXG5cblxuZnVuY3Rpb24gaW5zZXJ0U2VsZWN0b3JzKHNlbGVjdG9ycywgYW5jaG9ycywgaW52ZXJzZSwgbGVmdCwgaW5zaWRlLCByZXZlcnNlTG9vcDEsIHJldmVyc2VMb29wMiwgcmV2ZXJzZUxvb3AzKSB7XG4gIGVhY2goc2VsZWN0b3JzLCBmdW5jdGlvbiAoc2ksIHNlbGVjdG9yKSB7XG4gICAgZWFjaChjYXNoKHNlbGVjdG9yKSwgZnVuY3Rpb24gKHRpLCB0YXJnZXQpIHtcbiAgICAgIGVhY2goY2FzaChhbmNob3JzKSwgZnVuY3Rpb24gKGFpLCBhbmNob3IpIHtcbiAgICAgICAgdmFyIGFuY2hvckZpbmFsID0gaW52ZXJzZSA/IHRhcmdldCA6IGFuY2hvcixcbiAgICAgICAgICAgIHRhcmdldEZpbmFsID0gaW52ZXJzZSA/IGFuY2hvciA6IHRhcmdldCxcbiAgICAgICAgICAgIGluZGV4RmluYWwgPSBpbnZlcnNlID8gdGkgOiBhaTtcbiAgICAgICAgaW5zZXJ0RWxlbWVudChhbmNob3JGaW5hbCwgIWluZGV4RmluYWwgPyB0YXJnZXRGaW5hbCA6IHRhcmdldEZpbmFsLmNsb25lTm9kZSh0cnVlKSwgbGVmdCwgaW5zaWRlLCAhaW5kZXhGaW5hbCk7XG4gICAgICB9LCByZXZlcnNlTG9vcDMpO1xuICAgIH0sIHJldmVyc2VMb29wMik7XG4gIH0sIHJldmVyc2VMb29wMSk7XG4gIHJldHVybiBhbmNob3JzO1xufVxuXG5mbi5hZnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUsIHRydWUpO1xufTtcblxuZm4uYXBwZW5kID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgZmFsc2UsIGZhbHNlLCB0cnVlKTtcbn07XG5cbmZuLmFwcGVuZFRvID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5iZWZvcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5pbnNlcnRBZnRlciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gaW5zZXJ0U2VsZWN0b3JzKGFyZ3VtZW50cywgdGhpcywgdHJ1ZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xufTtcblxuZm4uaW5zZXJ0QmVmb3JlID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCB0cnVlLCB0cnVlKTtcbn07XG5cbmZuLnByZXBlbmQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBpbnNlcnRTZWxlY3RvcnMoYXJndW1lbnRzLCB0aGlzLCBmYWxzZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSk7XG59O1xuXG5mbi5wcmVwZW5kVG8gPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGluc2VydFNlbGVjdG9ycyhhcmd1bWVudHMsIHRoaXMsIHRydWUsIHRydWUsIHRydWUsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG59O1xuXG5mbi5yZXBsYWNlV2l0aCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5iZWZvcmUoc2VsZWN0b3IpLnJlbW92ZSgpO1xufTtcblxuZm4ucmVwbGFjZUFsbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICBjYXNoKHNlbGVjdG9yKS5yZXBsYWNlV2l0aCh0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mbi53cmFwQWxsID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gIHZhciBzdHJ1Y3R1cmUgPSBjYXNoKHNlbGVjdG9yKSxcbiAgICAgIHdyYXBwZXIgPSBzdHJ1Y3R1cmVbMF07XG5cbiAgd2hpbGUgKHdyYXBwZXIuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgd3JhcHBlciA9IHdyYXBwZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIH1cblxuICB0aGlzLmZpcnN0KCkuYmVmb3JlKHN0cnVjdHVyZSk7XG4gIHJldHVybiB0aGlzLmFwcGVuZFRvKHdyYXBwZXIpO1xufTtcblxuZm4ud3JhcCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICB2YXIgd3JhcHBlciA9IGNhc2goc2VsZWN0b3IpWzBdO1xuICAgIGNhc2goZWxlKS53cmFwQWxsKCFpID8gd3JhcHBlciA6IHdyYXBwZXIuY2xvbmVOb2RlKHRydWUpKTtcbiAgfSk7XG59O1xuXG5mbi53cmFwSW5uZXIgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgdmFyICRlbGUgPSBjYXNoKGVsZSksXG4gICAgICAgIGNvbnRlbnRzID0gJGVsZS5jb250ZW50cygpO1xuICAgIGNvbnRlbnRzLmxlbmd0aCA/IGNvbnRlbnRzLndyYXBBbGwoc2VsZWN0b3IpIDogJGVsZS5hcHBlbmQoc2VsZWN0b3IpO1xuICB9KTtcbn07XG5cbmZuLmhhcyA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICB2YXIgY29tcGFyYXRvciA9IGlzU3RyaW5nKHNlbGVjdG9yKSA/IGZ1bmN0aW9uIChpLCBlbGUpIHtcbiAgICByZXR1cm4gZmluZChzZWxlY3RvciwgZWxlKS5sZW5ndGg7XG4gIH0gOiBmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuIGVsZS5jb250YWlucyhzZWxlY3Rvcik7XG4gIH07XG4gIHJldHVybiB0aGlzLmZpbHRlcihjb21wYXJhdG9yKTtcbn07XG5cbmZuLmlzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiBzb21lLmNhbGwodGhpcywgZnVuY3Rpb24gKGVsZSwgaSkge1xuICAgIHJldHVybiBjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KTtcbn07XG5cbmZuLm5leHQgPSBmdW5jdGlvbiAoY29tcGFyYXRvciwgX2FsbCwgX3VudGlsKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAnbmV4dEVsZW1lbnRTaWJsaW5nJywgX2FsbCwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLm5leHRBbGwgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5uZXh0KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcblxuZm4ubmV4dFVudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLm5leHQoY29tcGFyYXRvciwgdHJ1ZSwgdW50aWwpO1xufTtcblxuZm4ubm90ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGNvbXBhcmUgPSBnZXRDb21wYXJlRnVuY3Rpb24oY29tcGFyYXRvcik7XG4gIHJldHVybiB0aGlzLmZpbHRlcihmdW5jdGlvbiAoaSwgZWxlKSB7XG4gICAgcmV0dXJuICghaXNTdHJpbmcoY29tcGFyYXRvcikgfHwgaXNFbGVtZW50KGVsZSkpICYmICFjb21wYXJlLmNhbGwoZWxlLCBpLCBlbGUpO1xuICB9KTtcbn07XG5cbmZuLnBhcmVudCA9IGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gIHJldHVybiBmaWx0ZXJlZChjYXNoKHVuaXF1ZShwbHVjayh0aGlzLCAncGFyZW50Tm9kZScpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4uaW5kZXggPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgdmFyIGNoaWxkID0gc2VsZWN0b3IgPyBjYXNoKHNlbGVjdG9yKVswXSA6IHRoaXNbMF0sXG4gICAgICBjb2xsZWN0aW9uID0gc2VsZWN0b3IgPyB0aGlzIDogY2FzaChjaGlsZCkucGFyZW50KCkuY2hpbGRyZW4oKTtcbiAgcmV0dXJuIGluZGV4T2YuY2FsbChjb2xsZWN0aW9uLCBjaGlsZCk7XG59O1xuXG5mbi5jbG9zZXN0ID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgdmFyIGZpbHRlcmVkID0gdGhpcy5maWx0ZXIoY29tcGFyYXRvcik7XG4gIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHJldHVybiBmaWx0ZXJlZDtcbiAgdmFyICRwYXJlbnQgPSB0aGlzLnBhcmVudCgpO1xuICBpZiAoISRwYXJlbnQubGVuZ3RoKSByZXR1cm4gZmlsdGVyZWQ7XG4gIHJldHVybiAkcGFyZW50LmNsb3Nlc3QoY29tcGFyYXRvcik7XG59O1xuXG5mbi5wYXJlbnRzID0gZnVuY3Rpb24gKGNvbXBhcmF0b3IsIF91bnRpbCkge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgJ3BhcmVudEVsZW1lbnQnLCB0cnVlLCBfdW50aWwpKSksIGNvbXBhcmF0b3IpO1xufTtcblxuZm4ucGFyZW50c1VudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnBhcmVudHMoY29tcGFyYXRvciwgdW50aWwpO1xufTtcblxuZm4ucHJldiA9IGZ1bmN0aW9uIChjb21wYXJhdG9yLCBfYWxsLCBfdW50aWwpIHtcbiAgcmV0dXJuIGZpbHRlcmVkKGNhc2godW5pcXVlKHBsdWNrKHRoaXMsICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJywgX2FsbCwgX3VudGlsKSkpLCBjb21wYXJhdG9yKTtcbn07XG5cbmZuLnByZXZBbGwgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gdGhpcy5wcmV2KGNvbXBhcmF0b3IsIHRydWUpO1xufTtcblxuZm4ucHJldlVudGlsID0gZnVuY3Rpb24gKHVudGlsLCBjb21wYXJhdG9yKSB7XG4gIHJldHVybiB0aGlzLnByZXYoY29tcGFyYXRvciwgdHJ1ZSwgdW50aWwpO1xufTtcblxuZm4uc2libGluZ3MgPSBmdW5jdGlvbiAoY29tcGFyYXRvcikge1xuICByZXR1cm4gZmlsdGVyZWQoY2FzaCh1bmlxdWUocGx1Y2sodGhpcywgZnVuY3Rpb24gKGVsZSkge1xuICAgIHJldHVybiBjYXNoKGVsZSkucGFyZW50KCkuY2hpbGRyZW4oKS5ub3QoZWxlKTtcbiAgfSkpKSwgY29tcGFyYXRvcik7XG59OyAvLyBAb3B0aW9uYWwgLi9jaGlsZHJlbi50c1xuLy8gQG9wdGlvbmFsIC4vY2xvc2VzdC50c1xuLy8gQG9wdGlvbmFsIC4vY29udGVudHMudHNcbi8vIEBvcHRpb25hbCAuL2ZpbmQudHNcbi8vIEBvcHRpb25hbCAuL2hhcy50c1xuLy8gQG9wdGlvbmFsIC4vaXMudHNcbi8vIEBvcHRpb25hbCAuL25leHQudHNcbi8vIEBvcHRpb25hbCAuL25leHRfYWxsLnRzXG4vLyBAb3B0aW9uYWwgLi9uZXh0X3VudGlsLnRzXG4vLyBAb3B0aW9uYWwgLi9ub3QudHNcbi8vIEBvcHRpb25hbCAuL3BhcmVudC50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50cy50c1xuLy8gQG9wdGlvbmFsIC4vcGFyZW50c191bnRpbC50c1xuLy8gQG9wdGlvbmFsIC4vcHJldi50c1xuLy8gQG9wdGlvbmFsIC4vcHJldl9hbGwudHNcbi8vIEBvcHRpb25hbCAuL3ByZXZfdW50aWwudHNcbi8vIEBvcHRpb25hbCAuL3NpYmxpbmdzLnRzXG4vLyBAb3B0aW9uYWwgYXR0cmlidXRlcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGNvbGxlY3Rpb24vaW5kZXgudHNcbi8vIEBvcHRpb25hbCBjc3MvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBkYXRhL2luZGV4LnRzXG4vLyBAb3B0aW9uYWwgZGltZW5zaW9ucy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIGVmZmVjdHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBldmVudHMvaW5kZXgudHNcbi8vIEBvcHRpb25hbCBmb3Jtcy9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG1hbmlwdWxhdGlvbi9pbmRleC50c1xuLy8gQG9wdGlvbmFsIG9mZnNldC9pbmRleC50c1xuLy8gQG9wdGlvbmFsIHRyYXZlcnNhbC9pbmRleC50c1xuLy8gQHJlcXVpcmUgY29yZS9pbmRleC50c1xuLy8gQHByaW9yaXR5IC0xMDBcbi8vIEByZXF1aXJlIC4vY2FzaC50c1xuLy8gQHJlcXVpcmUgLi92YXJpYWJsZXMudHNcblxuXG5pZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIE5vZGUuanNcbiAgbW9kdWxlLmV4cG9ydHMgPSBjYXNoO1xufSBlbHNlIHtcbiAgLy8gQnJvd3NlclxuICB3aW5bJ2Nhc2gnXSA9IHdpblsnJCddID0gY2FzaDtcbn1cbn0pKCk7IiwiZXhwb3J0IGRlZmF1bHQgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImJ1bmRsZS5jc3NcIjsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsImltcG9ydCAkIGZyb20gJ2Nhc2gtZG9tJztcclxuaW1wb3J0ICcuLi9zY3NzL21haW4uc2Nzcyc7XHJcblxyXG5sZXQgY29udHJvbGxlcjtcclxuXHJcbiQoJyN1cmwnKS5vbigna2V5dXAnLCBlID0+IHtcclxuICAgIGlmIChlLmtleSA9PSAnRW50ZXInKSAkKCcjYnRuLWdvJykudHJpZ2dlcignY2xpY2snKTtcclxufSk7XHJcbiQoJyNidG4tZ28nKS5vbignY2xpY2snLCBhc3luYyAoKSA9PiB7XHJcbiAgICBjb250cm9sbGVyPy5hYm9ydCgpO1xyXG4gICAgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICBjb25zdCAkbXVzaWMgPSAkKCcubXVzaWMnKS5oaWRlKCk7XHJcbiAgICBjb25zdCAkZG93bmxvYWQgPSAkKCcuZG93bmxvYWQnKS5oaWRlKCk7XHJcbiAgICBjb25zdCAkbWVzc2FnZSA9ICQoJy5tZXNzYWdlJykuaGlkZSgpO1xyXG4gICAgY29uc3QgJGxvYWRlciA9ICQoJy5sb2FkZXInKS5hZGRDbGFzcygnbG9hZCcpO1xyXG5cclxuICAgIGNvbnN0IGVycm9yID0gbXNnID0+IHtcclxuICAgICAgICAkbWVzc2FnZS50ZXh0KG1zZykuc2hvdygpO1xyXG4gICAgICAgICRsb2FkZXIucmVtb3ZlQ2xhc3MoJ2xvYWQnKTtcclxuICAgIH07XHJcbiAgICBjb25zdCB1cmwgPSAkKCcjdXJsJykudmFsKCk7XHJcblxyXG4gICAgaWYgKCF1cmwpIHJldHVybiBlcnJvcihcIlRoZSB1cmwgY2FuJ3QgYmUgZW1wdHlcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwcCcsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsIH0pLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcclxuICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzLmpzb24oKTtcclxuICAgICAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgICAgICBpZiAoIWJvZHkubXNnKSB0aHJvdyBib2R5O1xyXG4gICAgICAgICAgICByZXR1cm4gZXJyb3IoYm9keS5tc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWJvZHkubXVzaWMpIHRocm93IGJvZHk7XHJcblxyXG4gICAgICAgIGNvbnN0IG11c2ljID0gYm9keS5tdXNpYztcclxuICAgICAgICBjb25zdCAkaW1nID0gJG11c2ljLmNoaWxkcmVuKCkuZmlyc3QoKS5jaGlsZHJlbigpLmZpcnN0KCk7XHJcbiAgICAgICAgY29uc3QgJGluZm8gPSAkbXVzaWMuY2hpbGRyZW4oKS5sYXN0KCk7XHJcblxyXG4gICAgICAgICRpbmZvLmZpbmQoJy5nZW5yZScpLnRleHQoYCMke211c2ljLmdlbnJlIHx8ICdOb0dlbnJlJ30gYCk7XHJcbiAgICAgICAgJGluZm8uZmluZCgnLnRpdGxlJykudGV4dChtdXNpYy50aXRsZSk7XHJcbiAgICAgICAgJGluZm8uZmluZCgnLmFydGlzdCcpLnRleHQoYCR7bXVzaWMuYXJ0aXN0IHx8ICdVbmtub3duIEFydGlzdCd9IOKAoiAke211c2ljLmFsYnVtIHx8ICdVbmtub3duIEFsYnVtJ31gKTtcclxuICAgICAgICAkaW5mby5maW5kKCcueWVhcicpLnRleHQobXVzaWMueWVhcik7XHJcblxyXG4gICAgICAgICRpbWcuaGlkZSgpO1xyXG4gICAgICAgICRpbWcubmV4dCgpLnRleHQoJ05vIFRyYWNrIEFydHdvcmsnKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xyXG4gICAgICAgIGlmIChtdXNpYy5hcnR3b3JrKSB7XHJcbiAgICAgICAgICAgICRpbWcub24oJ2xvYWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkaW1nLm5leHQoKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkaW1nLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkaW1nLmF0dHIoJ3NyYycsIG11c2ljLmFydHdvcmspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJGRvd25sb2FkLmZpbmQoJ2EnKS5hdHRyKCdocmVmJywgbXVzaWMuZG93bmxvYWQpO1xyXG5cclxuICAgICAgICAkbXVzaWMucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkZG93bmxvYWQucmVtb3ZlQXR0cignc3R5bGUnKTtcclxuICAgICAgICAkbG9hZGVyLnJlbW92ZUNsYXNzKCdsb2FkJyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24pIHJldHVybjtcclxuICAgICAgICBlcnJvcignU29tZXRoaW5nIHdlbnQgd3JvbmcnKTtcclxuICAgIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=