var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod3) => function __require() {
  return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));

// node_modules/jquery/dist/jquery.js
var require_jquery = __commonJS({
  "node_modules/jquery/dist/jquery.js"(exports, module2) {
    (function(global2, factory) {
      "use strict";
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        module2.exports = global2.document ? factory(global2, true) : function(w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
      } else {
        factory(global2);
      }
    })(typeof window !== "undefined" ? window : exports, function(window2, noGlobal) {
      "use strict";
      var arr = [];
      var getProto = Object.getPrototypeOf;
      var slice = arr.slice;
      var flat = arr.flat ? function(array) {
        return arr.flat.call(array);
      } : function(array) {
        return arr.concat.apply([], array);
      };
      var push = arr.push;
      var indexOf = arr.indexOf;
      var class2type = {};
      var toString = class2type.toString;
      var hasOwn = class2type.hasOwnProperty;
      var fnToString = hasOwn.toString;
      var ObjectFunctionString = fnToString.call(Object);
      var support = {};
      var isFunction2 = /* @__PURE__ */ __name(function isFunction3(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
      }, "isFunction");
      var isWindow = /* @__PURE__ */ __name(function isWindow2(obj) {
        return obj != null && obj === obj.window;
      }, "isWindow");
      var document2 = window2.document;
      var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
      };
      function DOMEval(code, node, doc) {
        doc = doc || document2;
        var i, val, script = doc.createElement("script");
        script.text = code;
        if (node) {
          for (i in preservedScriptAttributes) {
            val = node[i] || node.getAttribute && node.getAttribute(i);
            if (val) {
              script.setAttribute(i, val);
            }
          }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
      }
      __name(DOMEval, "DOMEval");
      function toType(obj) {
        if (obj == null) {
          return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
      }
      __name(toType, "toType");
      var version = "3.6.1", jQuery = /* @__PURE__ */ __name(function(selector, context) {
        return new jQuery.fn.init(selector, context);
      }, "jQuery");
      jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,
        constructor: jQuery,
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function() {
          return slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
          if (num == null) {
            return slice.call(this);
          }
          return num < 0 ? this[num + this.length] : this[num];
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {
          var ret = jQuery.merge(this.constructor(), elems);
          ret.prevObject = this;
          return ret;
        },
        // Execute a callback for every element in the matched set.
        each: function(callback) {
          return jQuery.each(this, callback);
        },
        map: function(callback) {
          return this.pushStack(jQuery.map(this, function(elem, i) {
            return callback.call(elem, i, elem);
          }));
        },
        slice: function() {
          return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        even: function() {
          return this.pushStack(jQuery.grep(this, function(_elem, i) {
            return (i + 1) % 2;
          }));
        },
        odd: function() {
          return this.pushStack(jQuery.grep(this, function(_elem, i) {
            return i % 2;
          }));
        },
        eq: function(i) {
          var len = this.length, j = +i + (i < 0 ? len : 0);
          return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function() {
          return this.prevObject || this.constructor();
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push,
        sort: arr.sort,
        splice: arr.splice
      };
      jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[i] || {};
          i++;
        }
        if (typeof target !== "object" && !isFunction2(target)) {
          target = {};
        }
        if (i === length) {
          target = this;
          i--;
        }
        for (; i < length; i++) {
          if ((options = arguments[i]) != null) {
            for (name in options) {
              copy = options[name];
              if (name === "__proto__" || target === copy) {
                continue;
              }
              if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                src = target[name];
                if (copyIsArray && !Array.isArray(src)) {
                  clone = [];
                } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                  clone = {};
                } else {
                  clone = src;
                }
                copyIsArray = false;
                target[name] = jQuery.extend(deep, clone, copy);
              } else if (copy !== void 0) {
                target[name] = copy;
              }
            }
          }
        }
        return target;
      };
      jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        // Assume jQuery is ready without the ready module
        isReady: true,
        error: function(msg) {
          throw new Error(msg);
        },
        noop: function() {
        },
        isPlainObject: function(obj) {
          var proto, Ctor;
          if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
          }
          proto = getProto(obj);
          if (!proto) {
            return true;
          }
          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function(obj) {
          var name;
          for (name in obj) {
            return false;
          }
          return true;
        },
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function(code, options, doc) {
          DOMEval(code, { nonce: options && options.nonce }, doc);
        },
        each: function(obj, callback) {
          var length, i = 0;
          if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          } else {
            for (i in obj) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          }
          return obj;
        },
        // results is for internal usage only
        makeArray: function(arr2, results) {
          var ret = results || [];
          if (arr2 != null) {
            if (isArrayLike(Object(arr2))) {
              jQuery.merge(
                ret,
                typeof arr2 === "string" ? [arr2] : arr2
              );
            } else {
              push.call(ret, arr2);
            }
          }
          return ret;
        },
        inArray: function(elem, arr2, i) {
          return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
        },
        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function(first, second) {
          var len = +second.length, j = 0, i = first.length;
          for (; j < len; j++) {
            first[i++] = second[j];
          }
          first.length = i;
          return first;
        },
        grep: function(elems, callback, invert) {
          var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
          for (; i < length; i++) {
            callbackInverse = !callback(elems[i], i);
            if (callbackInverse !== callbackExpect) {
              matches.push(elems[i]);
            }
          }
          return matches;
        },
        // arg is for internal usage only
        map: function(elems, callback, arg) {
          var length, value, i = 0, ret = [];
          if (isArrayLike(elems)) {
            length = elems.length;
            for (; i < length; i++) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          } else {
            for (i in elems) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          }
          return flat(ret);
        },
        // A global GUID counter for objects
        guid: 1,
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support
      });
      if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
      }
      jQuery.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(_i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase();
        }
      );
      function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = toType(obj);
        if (isFunction2(obj) || isWindow(obj)) {
          return false;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
      }
      __name(isArrayLike, "isArrayLike");
      var Sizzle = (
        /*!
         * Sizzle CSS Selector Engine v2.3.6
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://js.foundation/
         *
         * Date: 2021-02-16
         */
        function(window3) {
          var i, support2, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document3, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * /* @__PURE__ */ new Date(), preferredDoc = window3.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = /* @__PURE__ */ __name(function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, "sortOrder"), hasOwn2 = {}.hasOwnProperty, arr2 = [], pop = arr2.pop, pushNative = arr2.push, push2 = arr2.push, slice2 = arr2.slice, indexOf2 = /* @__PURE__ */ __name(function(list, elem) {
            var i2 = 0, len = list.length;
            for (; i2 < len; i2++) {
              if (list[i2] === elem) {
                return i2;
              }
            }
            return -1;
          }, "indexOf"), booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace2 = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace2 + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace2 + "*(" + identifier + ")(?:" + whitespace2 + // Operator (capture 2)
          "*([*^$|!~]?=)" + whitespace2 + // "Attribute values must be CSS identifiers [capture 5]
          // or strings [capture 3 or capture 4]"
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace2 + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace2 + "+", "g"), rtrim2 = new RegExp("^" + whitespace2 + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace2 + "+$", "g"), rcomma = new RegExp("^" + whitespace2 + "*," + whitespace2 + "*"), rcombinators = new RegExp("^" + whitespace2 + "*([>+~]|" + whitespace2 + ")" + whitespace2 + "*"), rdescend = new RegExp(whitespace2 + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace2 + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace2 + "*(?:([+-]|)" + whitespace2 + "*(\\d+)|))" + whitespace2 + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            "needsContext": new RegExp("^" + whitespace2 + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace2 + "*((?:-\\d)?\\d*)" + whitespace2 + "*\\)|)(?=[^-]|$)", "i")
          }, rhtml2 = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace2 + "?|\\\\([^\\r\\n\\f])", "g"), funescape = /* @__PURE__ */ __name(function(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 65536;
            return nonHex ? (
              // Strip the backslash prefix from a non-hex escape sequence
              nonHex
            ) : (
              // Replace a hexadecimal escape sequence with the encoded Unicode code point
              // Support: IE <=11+
              // For values outside the Basic Multilingual Plane (BMP), manually construct a
              // surrogate pair
              high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
            );
          }, "funescape"), rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = /* @__PURE__ */ __name(function(ch, asCodePoint) {
            if (asCodePoint) {
              if (ch === "\0") {
                return "\uFFFD";
              }
              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
          }, "fcssescape"), unloadHandler = /* @__PURE__ */ __name(function() {
            setDocument();
          }, "unloadHandler"), inDisabledFieldset = addCombinator(
            function(elem) {
              return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
            },
            { dir: "parentNode", next: "legend" }
          );
          try {
            push2.apply(
              arr2 = slice2.call(preferredDoc.childNodes),
              preferredDoc.childNodes
            );
            arr2[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: arr2.length ? (
                // Leverage slice if possible
                function(target, els) {
                  pushNative.apply(target, slice2.call(els));
                }
              ) : (
                // Support: IE<9
                // Otherwise append directly
                function(target, els) {
                  var j = target.length, i2 = 0;
                  while (target[j++] = els[i2++]) {
                  }
                  target.length = j - 1;
                }
              )
            };
          }
          function Sizzle2(selector, context, results, seed) {
            var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m = match[1]) {
                    if (nodeType === 9) {
                      if (elem = context.getElementById(m)) {
                        if (elem.id === m) {
                          results.push(elem);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                        results.push(elem);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m = match[3]) && support2.getElementsByClassName && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }
                if (support2.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && // Support: IE 8 only
                // Exclude object elements
                (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext !== context || !support2.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = nid.replace(rcssescape, fcssescape);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i2 = groups.length;
                    while (i2--) {
                      groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrim2, "$1"), context, results, seed);
          }
          __name(Sizzle2, "Sizzle");
          function createCache() {
            var keys = [];
            function cache(key, value) {
              if (keys.push(key + " ") > Expr.cacheLength) {
                delete cache[keys.shift()];
              }
              return cache[key + " "] = value;
            }
            __name(cache, "cache");
            return cache;
          }
          __name(createCache, "createCache");
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          __name(markFunction, "markFunction");
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          __name(assert, "assert");
          function addHandle(attrs, handler) {
            var arr3 = attrs.split("|"), i2 = arr3.length;
            while (i2--) {
              Expr.attrHandle[arr3[i2]] = handler;
            }
          }
          __name(addHandle, "addHandle");
          function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
            if (diff) {
              return diff;
            }
            if (cur) {
              while (cur = cur.nextSibling) {
                if (cur === b) {
                  return -1;
                }
              }
            }
            return a ? 1 : -1;
          }
          __name(siblingCheck, "siblingCheck");
          function createInputPseudo(type) {
            return function(elem) {
              var name = elem.nodeName.toLowerCase();
              return name === "input" && elem.type === type;
            };
          }
          __name(createInputPseudo, "createInputPseudo");
          function createButtonPseudo(type) {
            return function(elem) {
              var name = elem.nodeName.toLowerCase();
              return (name === "input" || name === "button") && elem.type === type;
            };
          }
          __name(createButtonPseudo, "createButtonPseudo");
          function createDisabledPseudo(disabled) {
            return function(elem) {
              if ("form" in elem) {
                if (elem.parentNode && elem.disabled === false) {
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }
                  return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                  /* jshint -W018 */
                  elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                }
                return elem.disabled === disabled;
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }
              return false;
            };
          }
          __name(createDisabledPseudo, "createDisabledPseudo");
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
                while (i2--) {
                  if (seed[j = matchIndexes[i2]]) {
                    seed[j] = !(matches2[j] = seed[j]);
                  }
                }
              });
            });
          }
          __name(createPositionalPseudo, "createPositionalPseudo");
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          __name(testContext, "testContext");
          support2 = Sizzle2.support = {};
          isXML = Sizzle2.isXML = function(elem) {
            var namespace = elem && elem.namespaceURI, docElem2 = elem && (elem.ownerDocument || elem).documentElement;
            return !rhtml2.test(namespace || docElem2 && docElem2.nodeName || "HTML");
          };
          setDocument = Sizzle2.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            docElem = document3.documentElement;
            documentIsHTML = !isXML(document3);
            if (preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              if (subWindow.addEventListener) {
                subWindow.addEventListener("unload", unloadHandler, false);
              } else if (subWindow.attachEvent) {
                subWindow.attachEvent("onunload", unloadHandler);
              }
            }
            support2.scope = assert(function(el) {
              docElem.appendChild(el).appendChild(document3.createElement("div"));
              return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
            });
            support2.attributes = assert(function(el) {
              el.className = "i";
              return !el.getAttribute("className");
            });
            support2.getElementsByTagName = assert(function(el) {
              el.appendChild(document3.createComment(""));
              return !el.getElementsByTagName("*").length;
            });
            support2.getElementsByClassName = rnative.test(document3.getElementsByClassName);
            support2.getById = assert(function(el) {
              docElem.appendChild(el).id = expando;
              return !document3.getElementsByName || !document3.getElementsByName(expando).length;
            });
            if (support2.getById) {
              Expr.filter["ID"] = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find["ID"] = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter["ID"] = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find["ID"] = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i2, elems, elem = context.getElementById(id);
                  if (elem) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                    elems = context.getElementsByName(id);
                    i2 = 0;
                    while (elem = elems[i2++]) {
                      node2 = elem.getAttributeNode("id");
                      if (node2 && node2.value === id) {
                        return [elem];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find["TAG"] = support2.getElementsByTagName ? function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else if (support2.qsa) {
                return context.querySelectorAll(tag);
              }
            } : function(tag, context) {
              var elem, tmp = [], i2 = 0, results = context.getElementsByTagName(tag);
              if (tag === "*") {
                while (elem = results[i2++]) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem);
                  }
                }
                return tmp;
              }
              return results;
            };
            Expr.find["CLASS"] = support2.getElementsByClassName && function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support2.qsa = rnative.test(document3.querySelectorAll)) {
              assert(function(el) {
                var input;
                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                if (el.querySelectorAll("[msallowcapture^='']").length) {
                  rbuggyQSA.push("[*^$]=" + whitespace2 + `*(?:''|"")`);
                }
                if (!el.querySelectorAll("[selected]").length) {
                  rbuggyQSA.push("\\[" + whitespace2 + "*(?:value|" + booleans + ")");
                }
                if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                  rbuggyQSA.push("~=");
                }
                input = document3.createElement("input");
                input.setAttribute("name", "");
                el.appendChild(input);
                if (!el.querySelectorAll("[name='']").length) {
                  rbuggyQSA.push("\\[" + whitespace2 + "*name" + whitespace2 + "*=" + whitespace2 + `*(?:''|"")`);
                }
                if (!el.querySelectorAll(":checked").length) {
                  rbuggyQSA.push(":checked");
                }
                if (!el.querySelectorAll("a#" + expando + "+*").length) {
                  rbuggyQSA.push(".#.+[+~]");
                }
                el.querySelectorAll("\\\f");
                rbuggyQSA.push("[\\r\\n\\f]");
              });
              assert(function(el) {
                el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var input = document3.createElement("input");
                input.setAttribute("type", "hidden");
                el.appendChild(input).setAttribute("name", "D");
                if (el.querySelectorAll("[name=d]").length) {
                  rbuggyQSA.push("name" + whitespace2 + "*[*^$|!~]?=");
                }
                if (el.querySelectorAll(":enabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                docElem.appendChild(el).disabled = true;
                if (el.querySelectorAll(":disabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                el.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
              });
            }
            if (support2.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
              assert(function(el) {
                support2.disconnectedMatch = matches.call(el, "*");
                matches.call(el, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
              });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
              return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
              if (b) {
                while (b = b.parentNode) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };
            sortOrder = hasCompare ? function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
                // Otherwise we know they are disconnected
                1
              );
              if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a == document3 || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
                  return -1;
                }
                if (b == document3 || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            } : function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var cur, i2 = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
              if (!aup || !bup) {
                return a == document3 ? -1 : b == document3 ? 1 : (
                  /* eslint-enable eqeqeq */
                  aup ? -1 : bup ? 1 : sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0
                );
              } else if (aup === bup) {
                return siblingCheck(a, b);
              }
              cur = a;
              while (cur = cur.parentNode) {
                ap.unshift(cur);
              }
              cur = b;
              while (cur = cur.parentNode) {
                bp.unshift(cur);
              }
              while (ap[i2] === bp[i2]) {
                i2++;
              }
              return i2 ? (
                // Do a sibling check if the nodes have a common ancestor
                siblingCheck(ap[i2], bp[i2])
              ) : (
                // Otherwise nodes in our document sort first
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                /* eslint-disable eqeqeq */
                ap[i2] == preferredDoc ? -1 : bp[i2] == preferredDoc ? 1 : (
                  /* eslint-enable eqeqeq */
                  0
                )
              );
            };
            return document3;
          };
          Sizzle2.matches = function(expr, elements) {
            return Sizzle2(expr, null, null, elements);
          };
          Sizzle2.matchesSelector = function(elem, expr) {
            setDocument(elem);
            if (support2.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || support2.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                // fragment in IE 9
                elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return Sizzle2(expr, document3, null, [elem]).length > 0;
          };
          Sizzle2.contains = function(context, elem) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return contains(context, elem);
          };
          Sizzle2.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document3) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn2.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return val !== void 0 ? val : support2.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
          };
          Sizzle2.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
          };
          Sizzle2.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          Sizzle2.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i2 = 0;
            hasDuplicate = !support2.detectDuplicates;
            sortInput = !support2.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
              while (elem = results[i2++]) {
                if (elem === results[i2]) {
                  j = duplicates.push(i2);
                }
              }
              while (j--) {
                results.splice(duplicates[j], 1);
              }
            }
            sortInput = null;
            return results;
          };
          getText = Sizzle2.getText = function(elem) {
            var node, ret = "", i2 = 0, nodeType = elem.nodeType;
            if (!nodeType) {
              while (node = elem[i2++]) {
                ret += getText(node);
              }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
              if (typeof elem.textContent === "string") {
                return elem.textContent;
              } else {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  ret += getText(elem);
                }
              }
            } else if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue;
            }
            return ret;
          };
          Expr = Sizzle2.selectors = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              "ATTR": function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              "CHILD": function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    Sizzle2.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  Sizzle2.error(match[0]);
                }
                return match;
              },
              "PSEUDO": function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr["CHILD"].test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              "TAG": function(nodeNameSelector) {
                var nodeName2 = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === nodeName2;
                };
              },
              "CLASS": function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace2 + ")" + className + "(" + whitespace2 + "|$)")) && classCache(
                  className,
                  function(elem) {
                    return pattern.test(
                      typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                    );
                  }
                );
              },
              "ATTR": function(name, operator, check) {
                return function(elem) {
                  var result = Sizzle2.attr(elem, name);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                };
              },
              "CHILD": function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? (
                  // Shortcut for :nth-*(n)
                  function(elem) {
                    return !!elem.parentNode;
                  }
                ) : function(elem, _context, xml) {
                  var cache, uniqueCache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir2) {
                        node = elem;
                        while (node = node[dir2]) {
                          if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      node = parent;
                      outerCache = node[expando] || (node[expando] = {});
                      uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                      cache = uniqueCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                      (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        node = elem;
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        cache = uniqueCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                              uniqueCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              "PSEUDO": function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle2.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i2 = matched.length;
                    while (i2--) {
                      idx = indexOf2(seed, matched[i2]);
                      seed[idx] = !(matches2[idx] = matched[i2]);
                    }
                  }) : function(elem) {
                    return fn(elem, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              // Potentially complex pseudos
              "not": markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrim2, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                  while (i2--) {
                    if (elem = unmatched[i2]) {
                      seed[i2] = !(matches2[i2] = elem);
                    }
                  }
                }) : function(elem, _context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              "has": markFunction(function(selector) {
                return function(elem) {
                  return Sizzle2(selector, elem).length > 0;
                };
              }),
              "contains": markFunction(function(text) {
                text = text.replace(runescape, funescape);
                return function(elem) {
                  return (elem.textContent || getText(elem)).indexOf(text) > -1;
                };
              }),
              // "Whether an element is represented by a :lang() selector
              // is based solely on the element's language value
              // being equal to the identifier C,
              // or beginning with the identifier C immediately followed by "-".
              // The matching of C against the element's language value is performed case-insensitively.
              // The identifier C does not have to be a valid language name."
              // http://www.w3.org/TR/selectors/#lang-pseudo
              "lang": markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  Sizzle2.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),
              // Miscellaneous
              "target": function(elem) {
                var hash = window3.location && window3.location.hash;
                return hash && hash.slice(1) === elem.id;
              },
              "root": function(elem) {
                return elem === docElem;
              },
              "focus": function(elem) {
                return elem === document3.activeElement && (!document3.hasFocus || document3.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              // Boolean properties
              "enabled": createDisabledPseudo(false),
              "disabled": createDisabledPseudo(true),
              "checked": function(elem) {
                var nodeName2 = elem.nodeName.toLowerCase();
                return nodeName2 === "input" && !!elem.checked || nodeName2 === "option" && !!elem.selected;
              },
              "selected": function(elem) {
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
              },
              // Contents
              "empty": function(elem) {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              "parent": function(elem) {
                return !Expr.pseudos["empty"](elem);
              },
              // Element/input types
              "header": function(elem) {
                return rheader.test(elem.nodeName);
              },
              "input": function(elem) {
                return rinputs.test(elem.nodeName);
              },
              "button": function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === "button" || name === "button";
              },
              "text": function(elem) {
                var attr;
                return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && // Support: IE<8
                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              // Position-in-collection
              "first": createPositionalPseudo(function() {
                return [0];
              }),
              "last": createPositionalPseudo(function(_matchIndexes, length) {
                return [length - 1];
              }),
              "eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
              }),
              "even": createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 0;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "odd": createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 1;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument > length ? length : argument;
                for (; --i2 >= 0; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument;
                for (; ++i2 < length; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos["nth"] = Expr.pseudos["eq"];
          for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          function setFilters() {
          }
          __name(setFilters, "setFilters");
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          tokenize = Sizzle2.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rcombinators.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  // Cast descendant combinators to space
                  type: match[0].replace(rtrim2, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle2.error(selector) : (
              // Cache the tokens
              tokenCache(selector, groups).slice(0)
            );
          };
          function toSelector(tokens) {
            var i2 = 0, len = tokens.length, selector = "";
            for (; i2 < len; i2++) {
              selector += tokens[i2].value;
            }
            return selector;
          }
          __name(toSelector, "toSelector");
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ? (
              // Check against closest ancestor/preceding element
              function(elem, context, xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    return matcher(elem, context, xml);
                  }
                }
                return false;
              }
            ) : (
              // Check against all ancestor/preceding elements
              function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      if (matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                } else {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                      if (skip && skip === elem.nodeName.toLowerCase()) {
                        elem = elem[dir2] || elem;
                      } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                        return newCache[2] = oldCache[2];
                      } else {
                        uniqueCache[key] = newCache;
                        if (newCache[2] = matcher(elem, context, xml)) {
                          return true;
                        }
                      }
                    }
                  }
                }
                return false;
              }
            );
          }
          __name(addCombinator, "addCombinator");
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i2 = matchers.length;
              while (i2--) {
                if (!matchers[i2](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          __name(elementMatcher, "elementMatcher");
          function multipleContexts(selector, contexts, results) {
            var i2 = 0, len = contexts.length;
            for (; i2 < len; i2++) {
              Sizzle2(selector, contexts[i2], results);
            }
            return results;
          }
          __name(multipleContexts, "multipleContexts");
          function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
            for (; i2 < len; i2++) {
              if (elem = unmatched[i2]) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i2);
                  }
                }
              }
            }
            return newUnmatched;
          }
          __name(condense, "condense");
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i2, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? (
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                  // ...intermediate processing is necessary
                  []
                ) : (
                  // ...otherwise use results directly
                  results
                )
              ) : matcherIn;
              if (matcher) {
                matcher(matcherIn, matcherOut, context, xml);
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i2 = temp.length;
                while (i2--) {
                  if (elem = temp[i2]) {
                    matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i2 = matcherOut.length;
                    while (i2--) {
                      if (elem = matcherOut[i2]) {
                        temp.push(matcherIn[i2] = elem);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i2 = matcherOut.length;
                  while (i2--) {
                    if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf2(seed, elem) : preMap[i2]) > -1) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }
              } else {
                matcherOut = condense(
                  matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          __name(setMatcher, "setMatcher");
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
              return indexOf2(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
              var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i2 < len; i2++) {
              if (matcher = Expr.relative[tokens[i2].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                if (matcher[expando]) {
                  j = ++i2;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i2 > 1 && elementMatcher(matchers),
                    i2 > 1 && toSelector(
                      // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                      tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                    ).replace(rtrim2, "$1"),
                    matcher,
                    i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                    j < len && matcherFromTokens(tokens = tokens.slice(j)),
                    j < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          __name(matcherFromTokens, "matcherFromTokens");
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = /* @__PURE__ */ __name(function(seed, context, xml, results, outermost) {
              var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
                if (byElement && elem) {
                  j = 0;
                  if (!context && elem.ownerDocument != document3) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem, context || document3, xml)) {
                      results.push(elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }
              matchedCount += i2;
              if (bySet && i2 !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i2--) {
                      if (!(unmatched[i2] || setMatched[i2])) {
                        setMatched[i2] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  Sizzle2.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            }, "superMatcher");
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          __name(matcherFromGroupMatchers, "matcherFromGroupMatchers");
          compile = Sizzle2.compile = function(selector, match) {
            var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i2 = match.length;
              while (i2--) {
                cached = matcherFromTokens(match[i2]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );
              cached.selector = selector;
            }
            return cached;
          };
          select = Sizzle2.select = function(selector, context, results, seed) {
            var i2, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i2 = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
              while (i2--) {
                token = tokens[i2];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find = Expr.find[type]) {
                  if (seed = find(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  )) {
                    tokens.splice(i2, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context || rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
          };
          support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          support2.detectDuplicates = !!hasDuplicate;
          setDocument();
          support2.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          if (!assert(function(el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
          })) {
            addHandle("type|href|height|width", function(elem, name, isXML2) {
              if (!isXML2) {
                return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
              }
            });
          }
          if (!support2.attributes || !assert(function(el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
          })) {
            addHandle("value", function(elem, _name, isXML2) {
              if (!isXML2 && elem.nodeName.toLowerCase() === "input") {
                return elem.defaultValue;
              }
            });
          }
          if (!assert(function(el) {
            return el.getAttribute("disabled") == null;
          })) {
            addHandle(booleans, function(elem, name, isXML2) {
              var val;
              if (!isXML2) {
                return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
              }
            });
          }
          return Sizzle2;
        }(window2)
      );
      jQuery.find = Sizzle;
      jQuery.expr = Sizzle.selectors;
      jQuery.expr[":"] = jQuery.expr.pseudos;
      jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
      jQuery.text = Sizzle.getText;
      jQuery.isXMLDoc = Sizzle.isXML;
      jQuery.contains = Sizzle.contains;
      jQuery.escapeSelector = Sizzle.escape;
      var dir = /* @__PURE__ */ __name(function(elem, dir2, until) {
        var matched = [], truncate = until !== void 0;
        while ((elem = elem[dir2]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && jQuery(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      }, "dir");
      var siblings = /* @__PURE__ */ __name(function(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            matched.push(n);
          }
        }
        return matched;
      }, "siblings");
      var rneedsContext = jQuery.expr.match.needsContext;
      function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      }
      __name(nodeName, "nodeName");
      var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function winnow(elements, qualifier, not) {
        if (isFunction2(qualifier)) {
          return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
          });
        }
        if (qualifier.nodeType) {
          return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
          });
        }
        if (typeof qualifier !== "string") {
          return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
          });
        }
        return jQuery.filter(qualifier, elements, not);
      }
      __name(winnow, "winnow");
      jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
          expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
          return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
          return elem2.nodeType === 1;
        }));
      };
      jQuery.fn.extend({
        find: function(selector) {
          var i, ret, len = this.length, self2 = this;
          if (typeof selector !== "string") {
            return this.pushStack(jQuery(selector).filter(function() {
              for (i = 0; i < len; i++) {
                if (jQuery.contains(self2[i], this)) {
                  return true;
                }
              }
            }));
          }
          ret = this.pushStack([]);
          for (i = 0; i < len; i++) {
            jQuery.find(selector, self2[i], ret);
          }
          return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
          return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
          return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
          return !!winnow(
            this,
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
            false
          ).length;
        }
      });
      var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document2,
                true
              ));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (isFunction2(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document2.getElementById(match[2]);
              if (elem) {
                this[0] = elem;
                this.length = 1;
              }
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
          return this;
        } else if (isFunction2(selector)) {
          return root.ready !== void 0 ? root.ready(selector) : (
            // Execute immediately if ready is not present
            selector(jQuery)
          );
        }
        return jQuery.makeArray(selector, this);
      };
      init.prototype = jQuery.fn;
      rootjQuery = jQuery(document2);
      var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
      jQuery.fn.extend({
        has: function(target) {
          var targets = jQuery(target, this), l = targets.length;
          return this.filter(function() {
            var i = 0;
            for (; i < l; i++) {
              if (jQuery.contains(this, targets[i])) {
                return true;
              }
            }
          });
        },
        closest: function(selectors, context) {
          var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
          if (!rneedsContext.test(selectors)) {
            for (; i < l; i++) {
              for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                  // Don't pass non-elements to Sizzle
                  cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors)
                ))) {
                  matched.push(cur);
                  break;
                }
              }
            }
          }
          return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        // Determine the position of an element within the set
        index: function(elem) {
          if (!elem) {
            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          }
          if (typeof elem === "string") {
            return indexOf.call(jQuery(elem), this[0]);
          }
          return indexOf.call(
            this,
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem
          );
        },
        add: function(selector, context) {
          return this.pushStack(
            jQuery.uniqueSort(
              jQuery.merge(this.get(), jQuery(selector, context))
            )
          );
        },
        addBack: function(selector) {
          return this.add(
            selector == null ? this.prevObject : this.prevObject.filter(selector)
          );
        }
      });
      function sibling(cur, dir2) {
        while ((cur = cur[dir2]) && cur.nodeType !== 1) {
        }
        return cur;
      }
      __name(sibling, "sibling");
      jQuery.each({
        parent: function(elem) {
          var parent = elem.parentNode;
          return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
          return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, _i, until) {
          return dir(elem, "parentNode", until);
        },
        next: function(elem) {
          return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
          return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
          return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
          return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, _i, until) {
          return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, _i, until) {
          return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
          return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
          return siblings(elem.firstChild);
        },
        contents: function(elem) {
          if (elem.contentDocument != null && // Support: IE 11+
          // <object> elements with no `data` attribute has an object
          // `contentDocument` with a `null` prototype.
          getProto(elem.contentDocument)) {
            return elem.contentDocument;
          }
          if (nodeName(elem, "template")) {
            elem = elem.content || elem;
          }
          return jQuery.merge([], elem.childNodes);
        }
      }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
          var matched = jQuery.map(this, fn, until);
          if (name.slice(-5) !== "Until") {
            selector = until;
          }
          if (selector && typeof selector === "string") {
            matched = jQuery.filter(selector, matched);
          }
          if (this.length > 1) {
            if (!guaranteedUnique[name]) {
              jQuery.uniqueSort(matched);
            }
            if (rparentsprev.test(name)) {
              matched.reverse();
            }
          }
          return this.pushStack(matched);
        };
      });
      var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
      function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function(_4, flag) {
          object[flag] = true;
        });
        return object;
      }
      __name(createOptions, "createOptions");
      jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = /* @__PURE__ */ __name(function() {
          locked = locked || options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        }, "fire"), self2 = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (/* @__PURE__ */ __name(function add(args) {
                jQuery.each(args, function(_4, arg) {
                  if (isFunction2(arg)) {
                    if (!options.unique || !self2.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && toType(arg) !== "string") {
                    add(arg);
                  }
                });
              }, "add"))(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function() {
            jQuery.each(arguments, function(_4, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          // Remove all callbacks from the list
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function() {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            self2.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };
        return self2;
      };
      function Identity(v) {
        return v;
      }
      __name(Identity, "Identity");
      function Thrower(ex) {
        throw ex;
      }
      __name(Thrower, "Thrower");
      function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
          if (value && isFunction2(method = value.promise)) {
            method.call(value).done(resolve).fail(reject);
          } else if (value && isFunction2(method = value.then)) {
            method.call(value, resolve, reject);
          } else {
            resolve.apply(void 0, [value].slice(noValue));
          }
        } catch (value2) {
          reject.apply(void 0, [value2]);
        }
      }
      __name(adoptValue, "adoptValue");
      jQuery.extend({
        Deferred: function(func) {
          var tuples = [
            // action, add listener, callbacks,
            // ... .then handlers, argument index, [final state]
            [
              "notify",
              "progress",
              jQuery.Callbacks("memory"),
              jQuery.Callbacks("memory"),
              2
            ],
            [
              "resolve",
              "done",
              jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"),
              0,
              "resolved"
            ],
            [
              "reject",
              "fail",
              jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"),
              1,
              "rejected"
            ]
          ], state = "pending", promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            "catch": function(fn) {
              return promise.then(null, fn);
            },
            // Keep pipe for back-compat
            pipe: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(_i, tuple) {
                  var fn = isFunction2(fns[tuple[4]]) && fns[tuple[4]];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && isFunction2(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function(onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;
              function resolve(depth, deferred2, handler, special) {
                return function() {
                  var that = this, args = arguments, mightThrow = /* @__PURE__ */ __name(function() {
                    var returned, then;
                    if (depth < maxDepth) {
                      return;
                    }
                    returned = handler.apply(that, args);
                    if (returned === deferred2.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }
                    then = returned && // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    (typeof returned === "object" || typeof returned === "function") && returned.then;
                    if (isFunction2(then)) {
                      if (special) {
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special)
                        );
                      } else {
                        maxDepth++;
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special),
                          resolve(
                            maxDepth,
                            deferred2,
                            Identity,
                            deferred2.notifyWith
                          )
                        );
                      }
                    } else {
                      if (handler !== Identity) {
                        that = void 0;
                        args = [returned];
                      }
                      (special || deferred2.resolveWith)(that, args);
                    }
                  }, "mightThrow"), process = special ? mightThrow : function() {
                    try {
                      mightThrow();
                    } catch (e) {
                      if (jQuery.Deferred.exceptionHook) {
                        jQuery.Deferred.exceptionHook(
                          e,
                          process.stackTrace
                        );
                      }
                      if (depth + 1 >= maxDepth) {
                        if (handler !== Thrower) {
                          that = void 0;
                          args = [e];
                        }
                        deferred2.rejectWith(that, args);
                      }
                    }
                  };
                  if (depth) {
                    process();
                  } else {
                    if (jQuery.Deferred.getStackHook) {
                      process.stackTrace = jQuery.Deferred.getStackHook();
                    }
                    window2.setTimeout(process);
                  }
                };
              }
              __name(resolve, "resolve");
              return jQuery.Deferred(function(newDefer) {
                tuples[0][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction2(onProgress) ? onProgress : Identity,
                    newDefer.notifyWith
                  )
                );
                tuples[1][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction2(onFulfilled) ? onFulfilled : Identity
                  )
                );
                tuples[2][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction2(onRejected) ? onRejected : Thrower
                  )
                );
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          }, deferred = {};
          jQuery.each(tuples, function(i, tuple) {
            var list = tuple[2], stateString = tuple[5];
            promise[tuple[1]] = list.add;
            if (stateString) {
              list.add(
                function() {
                  state = stateString;
                },
                // rejected_callbacks.disable
                // fulfilled_callbacks.disable
                tuples[3 - i][2].disable,
                // rejected_handlers.disable
                // fulfilled_handlers.disable
                tuples[3 - i][3].disable,
                // progress_callbacks.lock
                tuples[0][2].lock,
                // progress_handlers.lock
                tuples[0][3].lock
              );
            }
            list.add(tuple[3].fire);
            deferred[tuple[0]] = function() {
              deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
              return this;
            };
            deferred[tuple[0] + "With"] = list.fireWith;
          });
          promise.promise(deferred);
          if (func) {
            func.call(deferred, deferred);
          }
          return deferred;
        },
        // Deferred helper
        when: function(singleValue) {
          var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = /* @__PURE__ */ __name(function(i2) {
            return function(value) {
              resolveContexts[i2] = this;
              resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
              if (!--remaining) {
                primary.resolveWith(resolveContexts, resolveValues);
              }
            };
          }, "updateFunc");
          if (remaining <= 1) {
            adoptValue(
              singleValue,
              primary.done(updateFunc(i)).resolve,
              primary.reject,
              !remaining
            );
            if (primary.state() === "pending" || isFunction2(resolveValues[i] && resolveValues[i].then)) {
              return primary.then();
            }
          }
          while (i--) {
            adoptValue(resolveValues[i], updateFunc(i), primary.reject);
          }
          return primary.promise();
        }
      });
      var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      jQuery.Deferred.exceptionHook = function(error, stack) {
        if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
          window2.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
      };
      jQuery.readyException = function(error) {
        window2.setTimeout(function() {
          throw error;
        });
      };
      var readyList = jQuery.Deferred();
      jQuery.fn.ready = function(fn) {
        readyList.then(fn).catch(function(error) {
          jQuery.readyException(error);
        });
        return this;
      };
      jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See trac-6781
        readyWait: 1,
        // Handle when the DOM is ready
        ready: function(wait) {
          if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
            return;
          }
          jQuery.isReady = true;
          if (wait !== true && --jQuery.readyWait > 0) {
            return;
          }
          readyList.resolveWith(document2, [jQuery]);
        }
      });
      jQuery.ready.then = readyList.then;
      function completed() {
        document2.removeEventListener("DOMContentLoaded", completed);
        window2.removeEventListener("load", completed);
        jQuery.ready();
      }
      __name(completed, "completed");
      if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
        window2.setTimeout(jQuery.ready);
      } else {
        document2.addEventListener("DOMContentLoaded", completed);
        window2.addEventListener("load", completed);
      }
      var access = /* @__PURE__ */ __name(function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = key == null;
        if (toType(key) === "object") {
          chainable = true;
          for (i in key) {
            access(elems, fn, i, key[i], true, emptyGet, raw);
          }
        } else if (value !== void 0) {
          chainable = true;
          if (!isFunction2(value)) {
            raw = true;
          }
          if (bulk) {
            if (raw) {
              fn.call(elems, value);
              fn = null;
            } else {
              bulk = fn;
              fn = /* @__PURE__ */ __name(function(elem, _key, value2) {
                return bulk.call(jQuery(elem), value2);
              }, "fn");
            }
          }
          if (fn) {
            for (; i < len; i++) {
              fn(
                elems[i],
                key,
                raw ? value : value.call(elems[i], i, fn(elems[i], key))
              );
            }
          }
        }
        if (chainable) {
          return elems;
        }
        if (bulk) {
          return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
      }, "access");
      var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
      function fcamelCase(_all, letter) {
        return letter.toUpperCase();
      }
      __name(fcamelCase, "fcamelCase");
      function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      }
      __name(camelCase, "camelCase");
      var acceptData = /* @__PURE__ */ __name(function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
      }, "acceptData");
      function Data() {
        this.expando = jQuery.expando + Data.uid++;
      }
      __name(Data, "Data");
      Data.uid = 1;
      Data.prototype = {
        cache: function(owner) {
          var value = owner[this.expando];
          if (!value) {
            value = {};
            if (acceptData(owner)) {
              if (owner.nodeType) {
                owner[this.expando] = value;
              } else {
                Object.defineProperty(owner, this.expando, {
                  value,
                  configurable: true
                });
              }
            }
          }
          return value;
        },
        set: function(owner, data, value) {
          var prop, cache = this.cache(owner);
          if (typeof data === "string") {
            cache[camelCase(data)] = value;
          } else {
            for (prop in data) {
              cache[camelCase(prop)] = data[prop];
            }
          }
          return cache;
        },
        get: function(owner, key) {
          return key === void 0 ? this.cache(owner) : (
            // Always use camelCase key (gh-2257)
            owner[this.expando] && owner[this.expando][camelCase(key)]
          );
        },
        access: function(owner, key, value) {
          if (key === void 0 || key && typeof key === "string" && value === void 0) {
            return this.get(owner, key);
          }
          this.set(owner, key, value);
          return value !== void 0 ? value : key;
        },
        remove: function(owner, key) {
          var i, cache = owner[this.expando];
          if (cache === void 0) {
            return;
          }
          if (key !== void 0) {
            if (Array.isArray(key)) {
              key = key.map(camelCase);
            } else {
              key = camelCase(key);
              key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
            }
            i = key.length;
            while (i--) {
              delete cache[key[i]];
            }
          }
          if (key === void 0 || jQuery.isEmptyObject(cache)) {
            if (owner.nodeType) {
              owner[this.expando] = void 0;
            } else {
              delete owner[this.expando];
            }
          }
        },
        hasData: function(owner) {
          var cache = owner[this.expando];
          return cache !== void 0 && !jQuery.isEmptyObject(cache);
        }
      };
      var dataPriv = new Data();
      var dataUser = new Data();
      var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
      function getData(data) {
        if (data === "true") {
          return true;
        }
        if (data === "false") {
          return false;
        }
        if (data === "null") {
          return null;
        }
        if (data === +data + "") {
          return +data;
        }
        if (rbrace.test(data)) {
          return JSON.parse(data);
        }
        return data;
      }
      __name(getData, "getData");
      function dataAttr(elem, key, data) {
        var name;
        if (data === void 0 && elem.nodeType === 1) {
          name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
          data = elem.getAttribute(name);
          if (typeof data === "string") {
            try {
              data = getData(data);
            } catch (e) {
            }
            dataUser.set(elem, key, data);
          } else {
            data = void 0;
          }
        }
        return data;
      }
      __name(dataAttr, "dataAttr");
      jQuery.extend({
        hasData: function(elem) {
          return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function(elem, name, data) {
          return dataUser.access(elem, name, data);
        },
        removeData: function(elem, name) {
          dataUser.remove(elem, name);
        },
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function(elem, name, data) {
          return dataPriv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
          dataPriv.remove(elem, name);
        }
      });
      jQuery.fn.extend({
        data: function(key, value) {
          var i, name, data, elem = this[0], attrs = elem && elem.attributes;
          if (key === void 0) {
            if (this.length) {
              data = dataUser.get(elem);
              if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                i = attrs.length;
                while (i--) {
                  if (attrs[i]) {
                    name = attrs[i].name;
                    if (name.indexOf("data-") === 0) {
                      name = camelCase(name.slice(5));
                      dataAttr(elem, name, data[name]);
                    }
                  }
                }
                dataPriv.set(elem, "hasDataAttrs", true);
              }
            }
            return data;
          }
          if (typeof key === "object") {
            return this.each(function() {
              dataUser.set(this, key);
            });
          }
          return access(this, function(value2) {
            var data2;
            if (elem && value2 === void 0) {
              data2 = dataUser.get(elem, key);
              if (data2 !== void 0) {
                return data2;
              }
              data2 = dataAttr(elem, key);
              if (data2 !== void 0) {
                return data2;
              }
              return;
            }
            this.each(function() {
              dataUser.set(this, key, value2);
            });
          }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
          return this.each(function() {
            dataUser.remove(this, key);
          });
        }
      });
      jQuery.extend({
        queue: function(elem, type, data) {
          var queue;
          if (elem) {
            type = (type || "fx") + "queue";
            queue = dataPriv.get(elem, type);
            if (data) {
              if (!queue || Array.isArray(data)) {
                queue = dataPriv.access(elem, type, jQuery.makeArray(data));
              } else {
                queue.push(data);
              }
            }
            return queue || [];
          }
        },
        dequeue: function(elem, type) {
          type = type || "fx";
          var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = /* @__PURE__ */ __name(function() {
            jQuery.dequeue(elem, type);
          }, "next");
          if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
          }
          if (fn) {
            if (type === "fx") {
              queue.unshift("inprogress");
            }
            delete hooks.stop;
            fn.call(elem, next, hooks);
          }
          if (!startLength && hooks) {
            hooks.empty.fire();
          }
        },
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function(elem, type) {
          var key = type + "queueHooks";
          return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
            empty: jQuery.Callbacks("once memory").add(function() {
              dataPriv.remove(elem, [type + "queue", key]);
            })
          });
        }
      });
      jQuery.fn.extend({
        queue: function(type, data) {
          var setter = 2;
          if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
          }
          if (arguments.length < setter) {
            return jQuery.queue(this[0], type);
          }
          return data === void 0 ? this : this.each(function() {
            var queue = jQuery.queue(this, type, data);
            jQuery._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
        },
        dequeue: function(type) {
          return this.each(function() {
            jQuery.dequeue(this, type);
          });
        },
        clearQueue: function(type) {
          return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
          var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = /* @__PURE__ */ __name(function() {
            if (!--count) {
              defer.resolveWith(elements, [elements]);
            }
          }, "resolve");
          if (typeof type !== "string") {
            obj = type;
            type = void 0;
          }
          type = type || "fx";
          while (i--) {
            tmp = dataPriv.get(elements[i], type + "queueHooks");
            if (tmp && tmp.empty) {
              count++;
              tmp.empty.add(resolve);
            }
          }
          resolve();
          return defer.promise(obj);
        }
      });
      var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
      var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
      var cssExpand = ["Top", "Right", "Bottom", "Left"];
      var documentElement = document2.documentElement;
      var isAttached = /* @__PURE__ */ __name(function(elem) {
        return jQuery.contains(elem.ownerDocument, elem);
      }, "isAttached"), composed = { composed: true };
      if (documentElement.getRootNode) {
        isAttached = /* @__PURE__ */ __name(function(elem) {
          return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
        }, "isAttached");
      }
      var isHiddenWithinTree = /* @__PURE__ */ __name(function(elem, el) {
        elem = el || elem;
        return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
        // Support: Firefox <=43 - 45
        // Disconnected elements can have computed display: none, so first confirm that elem is
        // in the document.
        isAttached(elem) && jQuery.css(elem, "display") === "none";
      }, "isHiddenWithinTree");
      function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
          initial = initial / 2;
          unit = unit || initialInUnit[3];
          initialInUnit = +initial || 1;
          while (maxIterations--) {
            jQuery.style(elem, prop, initialInUnit + unit);
            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
              maxIterations = 0;
            }
            initialInUnit = initialInUnit / scale;
          }
          initialInUnit = initialInUnit * 2;
          jQuery.style(elem, prop, initialInUnit + unit);
          valueParts = valueParts || [];
        }
        if (valueParts) {
          initialInUnit = +initialInUnit || +initial || 0;
          adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
          if (tween) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
          }
        }
        return adjusted;
      }
      __name(adjustCSS, "adjustCSS");
      var defaultDisplayMap = {};
      function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
        if (display) {
          return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName2));
        display = jQuery.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
          display = "block";
        }
        defaultDisplayMap[nodeName2] = display;
        return display;
      }
      __name(getDefaultDisplay, "getDefaultDisplay");
      function showHide(elements, show) {
        var display, elem, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
          elem = elements[index];
          if (!elem.style) {
            continue;
          }
          display = elem.style.display;
          if (show) {
            if (display === "none") {
              values[index] = dataPriv.get(elem, "display") || null;
              if (!values[index]) {
                elem.style.display = "";
              }
            }
            if (elem.style.display === "" && isHiddenWithinTree(elem)) {
              values[index] = getDefaultDisplay(elem);
            }
          } else {
            if (display !== "none") {
              values[index] = "none";
              dataPriv.set(elem, "display", display);
            }
          }
        }
        for (index = 0; index < length; index++) {
          if (values[index] != null) {
            elements[index].style.display = values[index];
          }
        }
        return elements;
      }
      __name(showHide, "showHide");
      jQuery.fn.extend({
        show: function() {
          return showHide(this, true);
        },
        hide: function() {
          return showHide(this);
        },
        toggle: function(state) {
          if (typeof state === "boolean") {
            return state ? this.show() : this.hide();
          }
          return this.each(function() {
            if (isHiddenWithinTree(this)) {
              jQuery(this).show();
            } else {
              jQuery(this).hide();
            }
          });
        }
      });
      var rcheckableType = /^(?:checkbox|radio)$/i;
      var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
      (function() {
        var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
      })();
      var wrapMap = {
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
      wrapMap.th = wrapMap.td;
      if (!support.option) {
        wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
      }
      function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
          ret = context.getElementsByTagName(tag || "*");
        } else if (typeof context.querySelectorAll !== "undefined") {
          ret = context.querySelectorAll(tag || "*");
        } else {
          ret = [];
        }
        if (tag === void 0 || tag && nodeName(context, tag)) {
          return jQuery.merge([context], ret);
        }
        return ret;
      }
      __name(getAll, "getAll");
      function setGlobalEval(elems, refElements) {
        var i = 0, l = elems.length;
        for (; i < l; i++) {
          dataPriv.set(
            elems[i],
            "globalEval",
            !refElements || dataPriv.get(refElements[i], "globalEval")
          );
        }
      }
      __name(setGlobalEval, "setGlobalEval");
      var rhtml = /<|&#?\w+;/;
      function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
          elem = elems[i];
          if (elem || elem === 0) {
            if (toType(elem) === "object") {
              jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
            } else if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem));
            } else {
              tmp = tmp || fragment.appendChild(context.createElement("div"));
              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
              j = wrap[0];
              while (j--) {
                tmp = tmp.lastChild;
              }
              jQuery.merge(nodes, tmp.childNodes);
              tmp = fragment.firstChild;
              tmp.textContent = "";
            }
          }
        }
        fragment.textContent = "";
        i = 0;
        while (elem = nodes[i++]) {
          if (selection && jQuery.inArray(elem, selection) > -1) {
            if (ignored) {
              ignored.push(elem);
            }
            continue;
          }
          attached = isAttached(elem);
          tmp = getAll(fragment.appendChild(elem), "script");
          if (attached) {
            setGlobalEval(tmp);
          }
          if (scripts) {
            j = 0;
            while (elem = tmp[j++]) {
              if (rscriptType.test(elem.type || "")) {
                scripts.push(elem);
              }
            }
          }
        }
        return fragment;
      }
      __name(buildFragment, "buildFragment");
      var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
      function returnTrue() {
        return true;
      }
      __name(returnTrue, "returnTrue");
      function returnFalse() {
        return false;
      }
      __name(returnFalse, "returnFalse");
      function expectSync(elem, type) {
        return elem === safeActiveElement() === (type === "focus");
      }
      __name(expectSync, "expectSync");
      function safeActiveElement() {
        try {
          return document2.activeElement;
        } catch (err) {
        }
      }
      __name(safeActiveElement, "safeActiveElement");
      function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
          if (typeof selector !== "string") {
            data = data || selector;
            selector = void 0;
          }
          for (type in types) {
            on(elem, type, selector, data, types[type], one);
          }
          return elem;
        }
        if (data == null && fn == null) {
          fn = selector;
          data = selector = void 0;
        } else if (fn == null) {
          if (typeof selector === "string") {
            fn = data;
            data = void 0;
          } else {
            fn = data;
            data = selector;
            selector = void 0;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return elem;
        }
        if (one === 1) {
          origFn = fn;
          fn = /* @__PURE__ */ __name(function(event) {
            jQuery().off(event);
            return origFn.apply(this, arguments);
          }, "fn");
          fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function() {
          jQuery.event.add(this, types, fn, data, selector);
        });
      }
      __name(on, "on");
      jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
          var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
          if (!acceptData(elem)) {
            return;
          }
          if (handler.handler) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
          }
          if (selector) {
            jQuery.find.matchesSelector(documentElement, selector);
          }
          if (!handler.guid) {
            handler.guid = jQuery.guid++;
          }
          if (!(events = elemData.events)) {
            events = elemData.events = /* @__PURE__ */ Object.create(null);
          }
          if (!(eventHandle = elemData.handle)) {
            eventHandle = elemData.handle = function(e) {
              return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            };
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery.event.special[type] || {};
            handleObj = jQuery.extend({
              type,
              origType,
              data,
              handler,
              guid: handler.guid,
              selector,
              needsContext: selector && jQuery.expr.match.needsContext.test(selector),
              namespace: namespaces.join(".")
            }, handleObjIn);
            if (!(handlers = events[type])) {
              handlers = events[type] = [];
              handlers.delegateCount = 0;
              if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle);
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }
            jQuery.event.global[type] = true;
          }
        },
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
          var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
          if (!elemData || !(events = elemData.events)) {
            return;
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              for (type in events) {
                jQuery.event.remove(elem, type + types[t], handler, selector, true);
              }
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            while (j--) {
              handleObj = handlers[j];
              if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                jQuery.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          }
          if (jQuery.isEmptyObject(events)) {
            dataPriv.remove(elem, "handle events");
          }
        },
        dispatch: function(nativeEvent) {
          var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
          args[0] = event;
          for (i = 1; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
          event.delegateTarget = this;
          if (special.preDispatch && special.preDispatch.call(this, event) === false) {
            return;
          }
          handlerQueue = jQuery.event.handlers.call(this, event, handlers);
          i = 0;
          while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
            event.currentTarget = matched.elem;
            j = 0;
            while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
              if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                event.handleObj = handleObj;
                event.data = handleObj.data;
                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                if (ret !== void 0) {
                  if ((event.result = ret) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }
              }
            }
          }
          if (special.postDispatch) {
            special.postDispatch.call(this, event);
          }
          return event.result;
        },
        handlers: function(event, handlers) {
          var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
          if (delegateCount && // Support: IE <=9
          // Black-hole SVG <use> instance trees (trac-13180)
          cur.nodeType && // Support: Firefox <=42
          // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
          // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
          // Support: IE 11 only
          // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
          !(event.type === "click" && event.button >= 1)) {
            for (; cur !== this; cur = cur.parentNode || this) {
              if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                matchedHandlers = [];
                matchedSelectors = {};
                for (i = 0; i < delegateCount; i++) {
                  handleObj = handlers[i];
                  sel = handleObj.selector + " ";
                  if (matchedSelectors[sel] === void 0) {
                    matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                  }
                  if (matchedSelectors[sel]) {
                    matchedHandlers.push(handleObj);
                  }
                }
                if (matchedHandlers.length) {
                  handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                }
              }
            }
          }
          cur = this;
          if (delegateCount < handlers.length) {
            handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
          }
          return handlerQueue;
        },
        addProp: function(name, hook) {
          Object.defineProperty(jQuery.Event.prototype, name, {
            enumerable: true,
            configurable: true,
            get: isFunction2(hook) ? function() {
              if (this.originalEvent) {
                return hook(this.originalEvent);
              }
            } : function() {
              if (this.originalEvent) {
                return this.originalEvent[name];
              }
            },
            set: function(value) {
              Object.defineProperty(this, name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value
              });
            }
          });
        },
        fix: function(originalEvent) {
          return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
          load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
          },
          click: {
            // Utilize native event to ensure correct state for checkable inputs
            setup: function(data) {
              var el = this || data;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click", returnTrue);
              }
              return false;
            },
            trigger: function(data) {
              var el = this || data;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click");
              }
              return true;
            },
            // For cross-browser consistency, suppress native .click() on links
            // Also prevent it if we're currently inside a leveraged native-event stack
            _default: function(event) {
              var target = event.target;
              return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
            }
          },
          beforeunload: {
            postDispatch: function(event) {
              if (event.result !== void 0 && event.originalEvent) {
                event.originalEvent.returnValue = event.result;
              }
            }
          }
        }
      };
      function leverageNative(el, type, expectSync2) {
        if (!expectSync2) {
          if (dataPriv.get(el, type) === void 0) {
            jQuery.event.add(el, type, returnTrue);
          }
          return;
        }
        dataPriv.set(el, type, false);
        jQuery.event.add(el, type, {
          namespace: false,
          handler: function(event) {
            var notAsync, result, saved = dataPriv.get(this, type);
            if (event.isTrigger & 1 && this[type]) {
              if (!saved.length) {
                saved = slice.call(arguments);
                dataPriv.set(this, type, saved);
                notAsync = expectSync2(this, type);
                this[type]();
                result = dataPriv.get(this, type);
                if (saved !== result || notAsync) {
                  dataPriv.set(this, type, false);
                } else {
                  result = {};
                }
                if (saved !== result) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  return result && result.value;
                }
              } else if ((jQuery.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }
            } else if (saved.length) {
              dataPriv.set(this, type, {
                value: jQuery.event.trigger(
                  // Support: IE <=9 - 11+
                  // Extend with the prototype to reset the above stopImmediatePropagation()
                  jQuery.extend(saved[0], jQuery.Event.prototype),
                  saved.slice(1),
                  this
                )
              });
              event.stopImmediatePropagation();
            }
          }
        });
      }
      __name(leverageNative, "leverageNative");
      jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(type, handle);
        }
      };
      jQuery.Event = function(src, props) {
        if (!(this instanceof jQuery.Event)) {
          return new jQuery.Event(src, props);
        }
        if (src && src.type) {
          this.originalEvent = src;
          this.type = src.type;
          this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && // Support: Android <=2.3 only
          src.returnValue === false ? returnTrue : returnFalse;
          this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
          this.currentTarget = src.currentTarget;
          this.relatedTarget = src.relatedTarget;
        } else {
          this.type = src;
        }
        if (props) {
          jQuery.extend(this, props);
        }
        this.timeStamp = src && src.timeStamp || Date.now();
        this[jQuery.expando] = true;
      };
      jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function() {
          var e = this.originalEvent;
          this.isDefaultPrevented = returnTrue;
          if (e && !this.isSimulated) {
            e.preventDefault();
          }
        },
        stopPropagation: function() {
          var e = this.originalEvent;
          this.isPropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopPropagation();
          }
        },
        stopImmediatePropagation: function() {
          var e = this.originalEvent;
          this.isImmediatePropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopImmediatePropagation();
          }
          this.stopPropagation();
        }
      };
      jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
      }, jQuery.event.addProp);
      jQuery.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
        jQuery.event.special[type] = {
          // Utilize native event if possible so blur/focus sequence is correct
          setup: function() {
            leverageNative(this, type, expectSync);
            return false;
          },
          trigger: function() {
            leverageNative(this, type);
            return true;
          },
          // Suppress native focus or blur if we're currently inside
          // a leveraged native-event stack
          _default: function(event) {
            return dataPriv.get(event.target, type);
          },
          delegateType
        };
      });
      jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function(orig, fix) {
        jQuery.event.special[orig] = {
          delegateType: fix,
          bindType: fix,
          handle: function(event) {
            var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
            if (!related || related !== target && !jQuery.contains(target, related)) {
              event.type = handleObj.origType;
              ret = handleObj.handler.apply(this, arguments);
              event.type = fix;
            }
            return ret;
          }
        };
      });
      jQuery.fn.extend({
        on: function(types, selector, data, fn) {
          return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
          return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
          var handleObj, type;
          if (types && types.preventDefault && types.handleObj) {
            handleObj = types.handleObj;
            jQuery(types.delegateTarget).off(
              handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
              handleObj.selector,
              handleObj.handler
            );
            return this;
          }
          if (typeof types === "object") {
            for (type in types) {
              this.off(type, selector, types[type]);
            }
            return this;
          }
          if (selector === false || typeof selector === "function") {
            fn = selector;
            selector = void 0;
          }
          if (fn === false) {
            fn = returnFalse;
          }
          return this.each(function() {
            jQuery.event.remove(this, types, fn, selector);
          });
        }
      });
      var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
          return jQuery(elem).children("tbody")[0] || elem;
        }
        return elem;
      }
      __name(manipulationTarget, "manipulationTarget");
      function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
      }
      __name(disableScript, "disableScript");
      function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
          elem.type = elem.type.slice(5);
        } else {
          elem.removeAttribute("type");
        }
        return elem;
      }
      __name(restoreScript, "restoreScript");
      function cloneCopyEvent(src, dest) {
        var i, l, type, pdataOld, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
          return;
        }
        if (dataPriv.hasData(src)) {
          pdataOld = dataPriv.get(src);
          events = pdataOld.events;
          if (events) {
            dataPriv.remove(dest, "handle events");
            for (type in events) {
              for (i = 0, l = events[type].length; i < l; i++) {
                jQuery.event.add(dest, type, events[type][i]);
              }
            }
          }
        }
        if (dataUser.hasData(src)) {
          udataOld = dataUser.access(src);
          udataCur = jQuery.extend({}, udataOld);
          dataUser.set(dest, udataCur);
        }
      }
      __name(cloneCopyEvent, "cloneCopyEvent");
      function fixInput(src, dest) {
        var nodeName2 = dest.nodeName.toLowerCase();
        if (nodeName2 === "input" && rcheckableType.test(src.type)) {
          dest.checked = src.checked;
        } else if (nodeName2 === "input" || nodeName2 === "textarea") {
          dest.defaultValue = src.defaultValue;
        }
      }
      __name(fixInput, "fixInput");
      function domManip(collection, args, callback, ignored) {
        args = flat(args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction2(value);
        if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
          return collection.each(function(index) {
            var self2 = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self2.html());
            }
            domManip(self2, args, callback, ignored);
          });
        }
        if (l) {
          fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
          first = fragment.firstChild;
          if (fragment.childNodes.length === 1) {
            fragment = first;
          }
          if (first || ignored) {
            scripts = jQuery.map(getAll(fragment, "script"), disableScript);
            hasScripts = scripts.length;
            for (; i < l; i++) {
              node = fragment;
              if (i !== iNoClone) {
                node = jQuery.clone(node, true, true);
                if (hasScripts) {
                  jQuery.merge(scripts, getAll(node, "script"));
                }
              }
              callback.call(collection[i], node, i);
            }
            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;
              jQuery.map(scripts, restoreScript);
              for (i = 0; i < hasScripts; i++) {
                node = scripts[i];
                if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                  if (node.src && (node.type || "").toLowerCase() !== "module") {
                    if (jQuery._evalUrl && !node.noModule) {
                      jQuery._evalUrl(node.src, {
                        nonce: node.nonce || node.getAttribute("nonce")
                      }, doc);
                    }
                  } else {
                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                  }
                }
              }
            }
          }
        }
        return collection;
      }
      __name(domManip, "domManip");
      function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
        for (; (node = nodes[i]) != null; i++) {
          if (!keepData && node.nodeType === 1) {
            jQuery.cleanData(getAll(node));
          }
          if (node.parentNode) {
            if (keepData && isAttached(node)) {
              setGlobalEval(getAll(node, "script"));
            }
            node.parentNode.removeChild(node);
          }
        }
        return elem;
      }
      __name(remove, "remove");
      jQuery.extend({
        htmlPrefilter: function(html) {
          return html;
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
          var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
          if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
            destElements = getAll(clone);
            srcElements = getAll(elem);
            for (i = 0, l = srcElements.length; i < l; i++) {
              fixInput(srcElements[i], destElements[i]);
            }
          }
          if (dataAndEvents) {
            if (deepDataAndEvents) {
              srcElements = srcElements || getAll(elem);
              destElements = destElements || getAll(clone);
              for (i = 0, l = srcElements.length; i < l; i++) {
                cloneCopyEvent(srcElements[i], destElements[i]);
              }
            } else {
              cloneCopyEvent(elem, clone);
            }
          }
          destElements = getAll(clone, "script");
          if (destElements.length > 0) {
            setGlobalEval(destElements, !inPage && getAll(elem, "script"));
          }
          return clone;
        },
        cleanData: function(elems) {
          var data, elem, type, special = jQuery.event.special, i = 0;
          for (; (elem = elems[i]) !== void 0; i++) {
            if (acceptData(elem)) {
              if (data = elem[dataPriv.expando]) {
                if (data.events) {
                  for (type in data.events) {
                    if (special[type]) {
                      jQuery.event.remove(elem, type);
                    } else {
                      jQuery.removeEvent(elem, type, data.handle);
                    }
                  }
                }
                elem[dataPriv.expando] = void 0;
              }
              if (elem[dataUser.expando]) {
                elem[dataUser.expando] = void 0;
              }
            }
          }
        }
      });
      jQuery.fn.extend({
        detach: function(selector) {
          return remove(this, selector, true);
        },
        remove: function(selector) {
          return remove(this, selector);
        },
        text: function(value) {
          return access(this, function(value2) {
            return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value2;
              }
            });
          }, null, value, arguments.length);
        },
        append: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.appendChild(elem);
            }
          });
        },
        prepend: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.insertBefore(elem, target.firstChild);
            }
          });
        },
        before: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this);
            }
          });
        },
        after: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this.nextSibling);
            }
          });
        },
        empty: function() {
          var elem, i = 0;
          for (; (elem = this[i]) != null; i++) {
            if (elem.nodeType === 1) {
              jQuery.cleanData(getAll(elem, false));
              elem.textContent = "";
            }
          }
          return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
          dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
          deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
          return this.map(function() {
            return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
          });
        },
        html: function(value) {
          return access(this, function(value2) {
            var elem = this[0] || {}, i = 0, l = this.length;
            if (value2 === void 0 && elem.nodeType === 1) {
              return elem.innerHTML;
            }
            if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
              value2 = jQuery.htmlPrefilter(value2);
              try {
                for (; i < l; i++) {
                  elem = this[i] || {};
                  if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.innerHTML = value2;
                  }
                }
                elem = 0;
              } catch (e) {
              }
            }
            if (elem) {
              this.empty().append(value2);
            }
          }, null, value, arguments.length);
        },
        replaceWith: function() {
          var ignored = [];
          return domManip(this, arguments, function(elem) {
            var parent = this.parentNode;
            if (jQuery.inArray(this, ignored) < 0) {
              jQuery.cleanData(getAll(this));
              if (parent) {
                parent.replaceChild(elem, this);
              }
            }
          }, ignored);
        }
      });
      jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function(name, original) {
        jQuery.fn[name] = function(selector) {
          var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
          for (; i <= last; i++) {
            elems = i === last ? this : this.clone(true);
            jQuery(insert[i])[original](elems);
            push.apply(ret, elems.get());
          }
          return this.pushStack(ret);
        };
      });
      var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
      var rcustomProp = /^--/;
      var getStyles = /* @__PURE__ */ __name(function(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
          view = window2;
        }
        return view.getComputedStyle(elem);
      }, "getStyles");
      var swap = /* @__PURE__ */ __name(function(elem, options, callback) {
        var ret, name, old = {};
        for (name in options) {
          old[name] = elem.style[name];
          elem.style[name] = options[name];
        }
        ret = callback.call(elem);
        for (name in options) {
          elem.style[name] = old[name];
        }
        return ret;
      }, "swap");
      var rboxStyle = new RegExp(cssExpand.join("|"), "i");
      var whitespace = "[\\x20\\t\\r\\n\\f]";
      var rtrimCSS = new RegExp(
        "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
        "g"
      );
      (function() {
        function computeStyleTests() {
          if (!div) {
            return;
          }
          container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
          div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
          documentElement.appendChild(container).appendChild(div);
          var divStyle = window2.getComputedStyle(div);
          pixelPositionVal = divStyle.top !== "1%";
          reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
          div.style.right = "60%";
          pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
          boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
          div.style.position = "absolute";
          scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
          documentElement.removeChild(container);
          div = null;
        }
        __name(computeStyleTests, "computeStyleTests");
        function roundPixelMeasures(measure) {
          return Math.round(parseFloat(measure));
        }
        __name(roundPixelMeasures, "roundPixelMeasures");
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
        if (!div.style) {
          return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery.extend(support, {
          boxSizingReliable: function() {
            computeStyleTests();
            return boxSizingReliableVal;
          },
          pixelBoxStyles: function() {
            computeStyleTests();
            return pixelBoxStylesVal;
          },
          pixelPosition: function() {
            computeStyleTests();
            return pixelPositionVal;
          },
          reliableMarginLeft: function() {
            computeStyleTests();
            return reliableMarginLeftVal;
          },
          scrollboxSize: function() {
            computeStyleTests();
            return scrollboxSizeVal;
          },
          // Support: IE 9 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Behavior in IE 9 is more subtle than in newer versions & it passes
          // some versions of this test; make sure not to make it pass there!
          //
          // Support: Firefox 70+
          // Only Firefox includes border widths
          // in computed dimensions. (gh-4529)
          reliableTrDimensions: function() {
            var table, tr, trChild, trStyle;
            if (reliableTrDimensionsVal == null) {
              table = document2.createElement("table");
              tr = document2.createElement("tr");
              trChild = document2.createElement("div");
              table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
              tr.style.cssText = "border:1px solid";
              tr.style.height = "1px";
              trChild.style.height = "9px";
              trChild.style.display = "block";
              documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
              trStyle = window2.getComputedStyle(tr);
              reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
              documentElement.removeChild(table);
            }
            return reliableTrDimensionsVal;
          }
        });
      })();
      function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
          ret = computed.getPropertyValue(name) || computed[name];
          if (isCustomProp) {
            ret = ret.replace(rtrimCSS, "$1");
          }
          if (ret === "" && !isAttached(elem)) {
            ret = jQuery.style(elem, name);
          }
          if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;
            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;
            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        return ret !== void 0 ? (
          // Support: IE <=9 - 11 only
          // IE returns zIndex value as an integer.
          ret + ""
        ) : ret;
      }
      __name(curCSS, "curCSS");
      function addGetHookIf(conditionFn, hookFn) {
        return {
          get: function() {
            if (conditionFn()) {
              delete this.get;
              return;
            }
            return (this.get = hookFn).apply(this, arguments);
          }
        };
      }
      __name(addGetHookIf, "addGetHookIf");
      var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
      function vendorPropName(name) {
        var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
        while (i--) {
          name = cssPrefixes[i] + capName;
          if (name in emptyStyle) {
            return name;
          }
        }
      }
      __name(vendorPropName, "vendorPropName");
      function finalPropName(name) {
        var final = jQuery.cssProps[name] || vendorProps[name];
        if (final) {
          return final;
        }
        if (name in emptyStyle) {
          return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
      }
      __name(finalPropName, "finalPropName");
      var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      };
      function setPositiveNumber(_elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? (
          // Guard against undefined "subtract", e.g., when used as in cssHooks
          Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
        ) : value;
      }
      __name(setPositiveNumber, "setPositiveNumber");
      function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
        var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0;
        if (box === (isBorderBox ? "border" : "content")) {
          return 0;
        }
        for (; i < 4; i += 2) {
          if (box === "margin") {
            delta += jQuery.css(elem, box + cssExpand[i], true, styles);
          }
          if (!isBorderBox) {
            delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);
            if (box !== "padding") {
              delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            } else {
              extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
          } else {
            if (box === "content") {
              delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
            }
            if (box !== "margin") {
              delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
            }
          }
        }
        if (!isBorderBox && computedVal >= 0) {
          delta += Math.max(0, Math.ceil(
            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
            // Use an explicit zero to avoid NaN (gh-3964)
          )) || 0;
        }
        return delta;
      }
      __name(boxModelAdjustment, "boxModelAdjustment");
      function getWidthOrHeight(elem, dimension, extra) {
        var styles = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
        if (rnumnonpx.test(val)) {
          if (!extra) {
            return val;
          }
          val = "auto";
        }
        if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Interestingly, in some cases IE 9 doesn't suffer from this issue.
        !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        val === "auto" || // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") && // Make sure the element is visible & connected
        elem.getClientRects().length) {
          isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";
          valueIsBorderBox = offsetProp in elem;
          if (valueIsBorderBox) {
            val = elem[offsetProp];
          }
        }
        val = parseFloat(val) || 0;
        return val + boxModelAdjustment(
          elem,
          dimension,
          extra || (isBorderBox ? "border" : "content"),
          valueIsBorderBox,
          styles,
          // Provide the current computed size to request scroll gutter calculation (gh-3589)
          val
        ) + "px";
      }
      __name(getWidthOrHeight, "getWidthOrHeight");
      jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
          opacity: {
            get: function(elem, computed) {
              if (computed) {
                var ret = curCSS(elem, "opacity");
                return ret === "" ? "1" : ret;
              }
            }
          }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
          "animationIterationCount": true,
          "columnCount": true,
          "fillOpacity": true,
          "flexGrow": true,
          "flexShrink": true,
          "fontWeight": true,
          "gridArea": true,
          "gridColumn": true,
          "gridColumnEnd": true,
          "gridColumnStart": true,
          "gridRow": true,
          "gridRowEnd": true,
          "gridRowStart": true,
          "lineHeight": true,
          "opacity": true,
          "order": true,
          "orphans": true,
          "widows": true,
          "zIndex": true,
          "zoom": true
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {
          if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
          }
          var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
          if (value !== void 0) {
            type = typeof value;
            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
              value = adjustCSS(elem, name, ret);
              type = "number";
            }
            if (value == null || value !== value) {
              return;
            }
            if (type === "number" && !isCustomProp) {
              value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
            }
            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
              style[name] = "inherit";
            }
            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== void 0) {
              if (isCustomProp) {
                style.setProperty(name, value);
              } else {
                style[name] = value;
              }
            }
          } else {
            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== void 0) {
              return ret;
            }
            return style[name];
          }
        },
        css: function(elem, name, extra, styles) {
          var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
          if (hooks && "get" in hooks) {
            val = hooks.get(elem, true, extra);
          }
          if (val === void 0) {
            val = curCSS(elem, name, styles);
          }
          if (val === "normal" && name in cssNormalTransform) {
            val = cssNormalTransform[name];
          }
          if (extra === "" || extra) {
            num = parseFloat(val);
            return extra === true || isFinite(num) ? num || 0 : val;
          }
          return val;
        }
      });
      jQuery.each(["height", "width"], function(_i, dimension) {
        jQuery.cssHooks[dimension] = {
          get: function(elem, computed, extra) {
            if (computed) {
              return rdisplayswap.test(jQuery.css(elem, "display")) && // Support: Safari 8+
              // Table columns in Safari have non-zero offsetWidth & zero
              // getBoundingClientRect().width unless display is changed.
              // Support: IE <=11 only
              // Running getBoundingClientRect on a disconnected node
              // in IE throws an error.
              (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, dimension, extra);
              }) : getWidthOrHeight(elem, dimension, extra);
            }
          },
          set: function(elem, value, extra) {
            var matches, styles = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
              elem,
              dimension,
              extra,
              isBorderBox,
              styles
            ) : 0;
            if (isBorderBox && scrollboxSizeBuggy) {
              subtract -= Math.ceil(
                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5
              );
            }
            if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
              elem.style[dimension] = value;
              value = jQuery.css(elem, dimension);
            }
            return setPositiveNumber(elem, value, subtract);
          }
        };
      });
      jQuery.cssHooks.marginLeft = addGetHookIf(
        support.reliableMarginLeft,
        function(elem, computed) {
          if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
              return elem.getBoundingClientRect().left;
            })) + "px";
          }
        }
      );
      jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
          expand: function(value) {
            var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
            for (; i < 4; i++) {
              expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
            }
            return expanded;
          }
        };
        if (prefix !== "margin") {
          jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
      });
      jQuery.fn.extend({
        css: function(name, value) {
          return access(this, function(elem, name2, value2) {
            var styles, len, map = {}, i = 0;
            if (Array.isArray(name2)) {
              styles = getStyles(elem);
              len = name2.length;
              for (; i < len; i++) {
                map[name2[i]] = jQuery.css(elem, name2[i], false, styles);
              }
              return map;
            }
            return value2 !== void 0 ? jQuery.style(elem, name2, value2) : jQuery.css(elem, name2);
          }, name, value, arguments.length > 1);
        }
      });
      function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
      }
      __name(Tween, "Tween");
      jQuery.Tween = Tween;
      Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
          this.elem = elem;
          this.prop = prop;
          this.easing = easing || jQuery.easing._default;
          this.options = options;
          this.start = this.now = this.cur();
          this.end = end;
          this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
          var hooks = Tween.propHooks[this.prop];
          return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
          var eased, hooks = Tween.propHooks[this.prop];
          if (this.options.duration) {
            this.pos = eased = jQuery.easing[this.easing](
              percent,
              this.options.duration * percent,
              0,
              1,
              this.options.duration
            );
          } else {
            this.pos = eased = percent;
          }
          this.now = (this.end - this.start) * eased + this.start;
          if (this.options.step) {
            this.options.step.call(this.elem, this.now, this);
          }
          if (hooks && hooks.set) {
            hooks.set(this);
          } else {
            Tween.propHooks._default.set(this);
          }
          return this;
        }
      };
      Tween.prototype.init.prototype = Tween.prototype;
      Tween.propHooks = {
        _default: {
          get: function(tween) {
            var result;
            if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
              return tween.elem[tween.prop];
            }
            result = jQuery.css(tween.elem, tween.prop, "");
            return !result || result === "auto" ? 0 : result;
          },
          set: function(tween) {
            if (jQuery.fx.step[tween.prop]) {
              jQuery.fx.step[tween.prop](tween);
            } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
              jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            } else {
              tween.elem[tween.prop] = tween.now;
            }
          }
        }
      };
      Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
          if (tween.elem.nodeType && tween.elem.parentNode) {
            tween.elem[tween.prop] = tween.now;
          }
        }
      };
      jQuery.easing = {
        linear: function(p) {
          return p;
        },
        swing: function(p) {
          return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
      };
      jQuery.fx = Tween.prototype.init;
      jQuery.fx.step = {};
      var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
      function schedule() {
        if (inProgress) {
          if (document2.hidden === false && window2.requestAnimationFrame) {
            window2.requestAnimationFrame(schedule);
          } else {
            window2.setTimeout(schedule, jQuery.fx.interval);
          }
          jQuery.fx.tick();
        }
      }
      __name(schedule, "schedule");
      function createFxNow() {
        window2.setTimeout(function() {
          fxNow = void 0;
        });
        return fxNow = Date.now();
      }
      __name(createFxNow, "createFxNow");
      function genFx(type, includeWidth) {
        var which, i = 0, attrs = { height: type };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
          which = cssExpand[i];
          attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
          attrs.opacity = attrs.width = type;
        }
        return attrs;
      }
      __name(genFx, "genFx");
      function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
        for (; index < length; index++) {
          if (tween = collection[index].call(animation, prop, value)) {
            return tween;
          }
        }
      }
      __name(createTween, "createTween");
      function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
          hooks = jQuery._queueHooks(elem, "fx");
          if (hooks.unqueued == null) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function() {
              if (!hooks.unqueued) {
                oldfire();
              }
            };
          }
          hooks.unqueued++;
          anim.always(function() {
            anim.always(function() {
              hooks.unqueued--;
              if (!jQuery.queue(elem, "fx").length) {
                hooks.empty.fire();
              }
            });
          });
        }
        for (prop in props) {
          value = props[prop];
          if (rfxtypes.test(value)) {
            delete props[prop];
            toggle = toggle || value === "toggle";
            if (value === (hidden ? "hide" : "show")) {
              if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                hidden = true;
              } else {
                continue;
              }
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
          }
        }
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
          return;
        }
        if (isBox && elem.nodeType === 1) {
          opts.overflow = [style.overflow, style.overflowX, style.overflowY];
          restoreDisplay = dataShow && dataShow.display;
          if (restoreDisplay == null) {
            restoreDisplay = dataPriv.get(elem, "display");
          }
          display = jQuery.css(elem, "display");
          if (display === "none") {
            if (restoreDisplay) {
              display = restoreDisplay;
            } else {
              showHide([elem], true);
              restoreDisplay = elem.style.display || restoreDisplay;
              display = jQuery.css(elem, "display");
              showHide([elem]);
            }
          }
          if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
            if (jQuery.css(elem, "float") === "none") {
              if (!propTween) {
                anim.done(function() {
                  style.display = restoreDisplay;
                });
                if (restoreDisplay == null) {
                  display = style.display;
                  restoreDisplay = display === "none" ? "" : display;
                }
              }
              style.display = "inline-block";
            }
          }
        }
        if (opts.overflow) {
          style.overflow = "hidden";
          anim.always(function() {
            style.overflow = opts.overflow[0];
            style.overflowX = opts.overflow[1];
            style.overflowY = opts.overflow[2];
          });
        }
        propTween = false;
        for (prop in orig) {
          if (!propTween) {
            if (dataShow) {
              if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
              }
            } else {
              dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
            }
            if (toggle) {
              dataShow.hidden = !hidden;
            }
            if (hidden) {
              showHide([elem], true);
            }
            anim.done(function() {
              if (!hidden) {
                showHide([elem]);
              }
              dataPriv.remove(elem, "fxshow");
              for (prop in orig) {
                jQuery.style(elem, prop, orig[prop]);
              }
            });
          }
          propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
          if (!(prop in dataShow)) {
            dataShow[prop] = propTween.start;
            if (hidden) {
              propTween.end = propTween.start;
              propTween.start = 0;
            }
          }
        }
      }
      __name(defaultPrefilter, "defaultPrefilter");
      function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
          name = camelCase(index);
          easing = specialEasing[name];
          value = props[index];
          if (Array.isArray(value)) {
            easing = value[1];
            value = props[index] = value[0];
          }
          if (index !== name) {
            props[name] = value;
            delete props[index];
          }
          hooks = jQuery.cssHooks[name];
          if (hooks && "expand" in hooks) {
            value = hooks.expand(value);
            delete props[name];
            for (index in value) {
              if (!(index in props)) {
                props[index] = value[index];
                specialEasing[index] = easing;
              }
            }
          } else {
            specialEasing[name] = easing;
          }
        }
      }
      __name(propFilter, "propFilter");
      function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }), tick = /* @__PURE__ */ __name(function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length2) {
            return remaining;
          }
          if (!length2) {
            deferred.notifyWith(elem, [animation, 1, 0]);
          }
          deferred.resolveWith(elem, [animation]);
          return false;
        }, "tick"), animation = deferred.promise({
          elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(
              elem,
              animation.opts,
              prop,
              end,
              animation.opts.specialEasing[prop] || animation.opts.easing
            );
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
          result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
          if (result) {
            if (isFunction2(result.stop)) {
              jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
            }
            return result;
          }
        }
        jQuery.map(props, createTween, animation);
        if (isFunction2(animation.opts.start)) {
          animation.opts.start.call(elem, animation);
        }
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        jQuery.fx.timer(
          jQuery.extend(tick, {
            elem,
            anim: animation,
            queue: animation.opts.queue
          })
        );
        return animation;
      }
      __name(Animation, "Animation");
      jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
          "*": [function(prop, value) {
            var tween = this.createTween(prop, value);
            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
            return tween;
          }]
        },
        tweener: function(props, callback) {
          if (isFunction2(props)) {
            callback = props;
            props = ["*"];
          } else {
            props = props.match(rnothtmlwhite);
          }
          var prop, index = 0, length = props.length;
          for (; index < length; index++) {
            prop = props[index];
            Animation.tweeners[prop] = Animation.tweeners[prop] || [];
            Animation.tweeners[prop].unshift(callback);
          }
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
          if (prepend) {
            Animation.prefilters.unshift(callback);
          } else {
            Animation.prefilters.push(callback);
          }
        }
      });
      jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
          complete: fn || !fn && easing || isFunction2(speed) && speed,
          duration: speed,
          easing: fn && easing || easing && !isFunction2(easing) && easing
        };
        if (jQuery.fx.off) {
          opt.duration = 0;
        } else {
          if (typeof opt.duration !== "number") {
            if (opt.duration in jQuery.fx.speeds) {
              opt.duration = jQuery.fx.speeds[opt.duration];
            } else {
              opt.duration = jQuery.fx.speeds._default;
            }
          }
        }
        if (opt.queue == null || opt.queue === true) {
          opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
          if (isFunction2(opt.old)) {
            opt.old.call(this);
          }
          if (opt.queue) {
            jQuery.dequeue(this, opt.queue);
          }
        };
        return opt;
      };
      jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
          return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
          var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = /* @__PURE__ */ __name(function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          }, "doAnimation");
          doAnimation.finish = doAnimation;
          return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
          var stopQueue = /* @__PURE__ */ __name(function(hooks) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop(gotoEnd);
          }, "stopQueue");
          if (typeof type !== "string") {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = void 0;
          }
          if (clearQueue) {
            this.queue(type || "fx", []);
          }
          return this.each(function() {
            var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
            if (index) {
              if (data[index] && data[index].stop) {
                stopQueue(data[index]);
              }
            } else {
              for (index in data) {
                if (data[index] && data[index].stop && rrun.test(index)) {
                  stopQueue(data[index]);
                }
              }
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                timers[index].anim.stop(gotoEnd);
                dequeue = false;
                timers.splice(index, 1);
              }
            }
            if (dequeue || !gotoEnd) {
              jQuery.dequeue(this, type);
            }
          });
        },
        finish: function(type) {
          if (type !== false) {
            type = type || "fx";
          }
          return this.each(function() {
            var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
            data.finish = true;
            jQuery.queue(this, type, []);
            if (hooks && hooks.stop) {
              hooks.stop.call(this, true);
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && timers[index].queue === type) {
                timers[index].anim.stop(true);
                timers.splice(index, 1);
              }
            }
            for (index = 0; index < length; index++) {
              if (queue[index] && queue[index].finish) {
                queue[index].finish.call(this);
              }
            }
            delete data.finish;
          });
        }
      });
      jQuery.each(["toggle", "show", "hide"], function(_i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
          return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
      });
      jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
      }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
          return this.animate(props, speed, easing, callback);
        };
      });
      jQuery.timers = [];
      jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = Date.now();
        for (; i < timers.length; i++) {
          timer = timers[i];
          if (!timer() && timers[i] === timer) {
            timers.splice(i--, 1);
          }
        }
        if (!timers.length) {
          jQuery.fx.stop();
        }
        fxNow = void 0;
      };
      jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
      };
      jQuery.fx.interval = 13;
      jQuery.fx.start = function() {
        if (inProgress) {
          return;
        }
        inProgress = true;
        schedule();
      };
      jQuery.fx.stop = function() {
        inProgress = null;
      };
      jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
      };
      jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
          var timeout = window2.setTimeout(next, time);
          hooks.stop = function() {
            window2.clearTimeout(timeout);
          };
        });
      };
      (function() {
        var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        input = document2.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
      })();
      var boolHook, attrHandle = jQuery.expr.attrHandle;
      jQuery.fn.extend({
        attr: function(name, value) {
          return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
          return this.each(function() {
            jQuery.removeAttr(this, name);
          });
        }
      });
      jQuery.extend({
        attr: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (typeof elem.getAttribute === "undefined") {
            return jQuery.prop(elem, name, value);
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0);
          }
          if (value !== void 0) {
            if (value === null) {
              jQuery.removeAttr(elem, name);
              return;
            }
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            elem.setAttribute(name, value + "");
            return value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          ret = jQuery.find.attr(elem, name);
          return ret == null ? void 0 : ret;
        },
        attrHooks: {
          type: {
            set: function(elem, value) {
              if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                var val = elem.value;
                elem.setAttribute("type", value);
                if (val) {
                  elem.value = val;
                }
                return value;
              }
            }
          }
        },
        removeAttr: function(elem, value) {
          var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
          if (attrNames && elem.nodeType === 1) {
            while (name = attrNames[i++]) {
              elem.removeAttribute(name);
            }
          }
        }
      });
      boolHook = {
        set: function(elem, value, name) {
          if (value === false) {
            jQuery.removeAttr(elem, name);
          } else {
            elem.setAttribute(name, name);
          }
          return name;
        }
      };
      jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name2, isXML) {
          var ret, handle, lowercaseName = name2.toLowerCase();
          if (!isXML) {
            handle = attrHandle[lowercaseName];
            attrHandle[lowercaseName] = ret;
            ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
            attrHandle[lowercaseName] = handle;
          }
          return ret;
        };
      });
      var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
      jQuery.fn.extend({
        prop: function(name, value) {
          return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
          return this.each(function() {
            delete this[jQuery.propFix[name] || name];
          });
        }
      });
      jQuery.extend({
        prop: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            name = jQuery.propFix[name] || name;
            hooks = jQuery.propHooks[name];
          }
          if (value !== void 0) {
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            return elem[name] = value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          return elem[name];
        },
        propHooks: {
          tabIndex: {
            get: function(elem) {
              var tabindex = jQuery.find.attr(elem, "tabindex");
              if (tabindex) {
                return parseInt(tabindex, 10);
              }
              if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                return 0;
              }
              return -1;
            }
          }
        },
        propFix: {
          "for": "htmlFor",
          "class": "className"
        }
      });
      if (!support.optSelected) {
        jQuery.propHooks.selected = {
          get: function(elem) {
            var parent = elem.parentNode;
            if (parent && parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
            return null;
          },
          set: function(elem) {
            var parent = elem.parentNode;
            if (parent) {
              parent.selectedIndex;
              if (parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
            }
          }
        };
      }
      jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
      ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
      });
      function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
      }
      __name(stripAndCollapse, "stripAndCollapse");
      function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
      }
      __name(getClass, "getClass");
      function classesToArray(value) {
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === "string") {
          return value.match(rnothtmlwhite) || [];
        }
        return [];
      }
      __name(classesToArray, "classesToArray");
      jQuery.fn.extend({
        addClass: function(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction2(value)) {
            return this.each(function(j) {
              jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  if (cur.indexOf(" " + className + " ") < 0) {
                    cur += className + " ";
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        removeClass: function(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction2(value)) {
            return this.each(function(j) {
              jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
          }
          if (!arguments.length) {
            return this.attr("class", "");
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  while (cur.indexOf(" " + className + " ") > -1) {
                    cur = cur.replace(" " + className + " ", " ");
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        toggleClass: function(value, stateVal) {
          var classNames, className, i, self2, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
          if (isFunction2(value)) {
            return this.each(function(i2) {
              jQuery(this).toggleClass(
                value.call(this, i2, getClass(this), stateVal),
                stateVal
              );
            });
          }
          if (typeof stateVal === "boolean" && isValidValue) {
            return stateVal ? this.addClass(value) : this.removeClass(value);
          }
          classNames = classesToArray(value);
          return this.each(function() {
            if (isValidValue) {
              self2 = jQuery(this);
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];
                if (self2.hasClass(className)) {
                  self2.removeClass(className);
                } else {
                  self2.addClass(className);
                }
              }
            } else if (value === void 0 || type === "boolean") {
              className = getClass(this);
              if (className) {
                dataPriv.set(this, "__className__", className);
              }
              if (this.setAttribute) {
                this.setAttribute(
                  "class",
                  className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                );
              }
            }
          });
        },
        hasClass: function(selector) {
          var className, elem, i = 0;
          className = " " + selector + " ";
          while (elem = this[i++]) {
            if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
              return true;
            }
          }
          return false;
        }
      });
      var rreturn = /\r/g;
      jQuery.fn.extend({
        val: function(value) {
          var hooks, ret, valueIsFunction, elem = this[0];
          if (!arguments.length) {
            if (elem) {
              hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
              if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                return ret;
              }
              ret = elem.value;
              if (typeof ret === "string") {
                return ret.replace(rreturn, "");
              }
              return ret == null ? "" : ret;
            }
            return;
          }
          valueIsFunction = isFunction2(value);
          return this.each(function(i) {
            var val;
            if (this.nodeType !== 1) {
              return;
            }
            if (valueIsFunction) {
              val = value.call(this, i, jQuery(this).val());
            } else {
              val = value;
            }
            if (val == null) {
              val = "";
            } else if (typeof val === "number") {
              val += "";
            } else if (Array.isArray(val)) {
              val = jQuery.map(val, function(value2) {
                return value2 == null ? "" : value2 + "";
              });
            }
            hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
            if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
              this.value = val;
            }
          });
        }
      });
      jQuery.extend({
        valHooks: {
          option: {
            get: function(elem) {
              var val = jQuery.find.attr(elem, "value");
              return val != null ? val : (
                // Support: IE <=10 - 11 only
                // option.text throws exceptions (trac-14686, trac-14858)
                // Strip and collapse whitespace
                // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                stripAndCollapse(jQuery.text(elem))
              );
            }
          },
          select: {
            get: function(elem) {
              var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
              if (index < 0) {
                i = max;
              } else {
                i = one ? index : 0;
              }
              for (; i < max; i++) {
                option = options[i];
                if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
                !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                  value = jQuery(option).val();
                  if (one) {
                    return value;
                  }
                  values.push(value);
                }
              }
              return values;
            },
            set: function(elem, value) {
              var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
              while (i--) {
                option = options[i];
                if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                  optionSet = true;
                }
              }
              if (!optionSet) {
                elem.selectedIndex = -1;
              }
              return values;
            }
          }
        }
      });
      jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
          set: function(elem, value) {
            if (Array.isArray(value)) {
              return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
          }
        };
        if (!support.checkOn) {
          jQuery.valHooks[this].get = function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
          };
        }
      });
      support.focusin = "onfocusin" in window2;
      var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = /* @__PURE__ */ __name(function(e) {
        e.stopPropagation();
      }, "stopPropagationCallback");
      jQuery.extend(jQuery.event, {
        trigger: function(event, data, elem, onlyHandlers) {
          var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
          cur = lastElement = tmp = elem = elem || document2;
          if (elem.nodeType === 3 || elem.nodeType === 8) {
            return;
          }
          if (rfocusMorph.test(type + jQuery.event.triggered)) {
            return;
          }
          if (type.indexOf(".") > -1) {
            namespaces = type.split(".");
            type = namespaces.shift();
            namespaces.sort();
          }
          ontype = type.indexOf(":") < 0 && "on" + type;
          event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
          event.isTrigger = onlyHandlers ? 2 : 3;
          event.namespace = namespaces.join(".");
          event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
          event.result = void 0;
          if (!event.target) {
            event.target = elem;
          }
          data = data == null ? [event] : jQuery.makeArray(data, [event]);
          special = jQuery.event.special[type] || {};
          if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
            return;
          }
          if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
            bubbleType = special.delegateType || type;
            if (!rfocusMorph.test(bubbleType + type)) {
              cur = cur.parentNode;
            }
            for (; cur; cur = cur.parentNode) {
              eventPath.push(cur);
              tmp = cur;
            }
            if (tmp === (elem.ownerDocument || document2)) {
              eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
            }
          }
          i = 0;
          while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
            lastElement = cur;
            event.type = i > 1 ? bubbleType : special.bindType || type;
            handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
            if (handle) {
              handle.apply(cur, data);
            }
            handle = ontype && cur[ontype];
            if (handle && handle.apply && acceptData(cur)) {
              event.result = handle.apply(cur, data);
              if (event.result === false) {
                event.preventDefault();
              }
            }
          }
          event.type = type;
          if (!onlyHandlers && !event.isDefaultPrevented()) {
            if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
              if (ontype && isFunction2(elem[type]) && !isWindow(elem)) {
                tmp = elem[ontype];
                if (tmp) {
                  elem[ontype] = null;
                }
                jQuery.event.triggered = type;
                if (event.isPropagationStopped()) {
                  lastElement.addEventListener(type, stopPropagationCallback);
                }
                elem[type]();
                if (event.isPropagationStopped()) {
                  lastElement.removeEventListener(type, stopPropagationCallback);
                }
                jQuery.event.triggered = void 0;
                if (tmp) {
                  elem[ontype] = tmp;
                }
              }
            }
          }
          return event.result;
        },
        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function(type, elem, event) {
          var e = jQuery.extend(
            new jQuery.Event(),
            event,
            {
              type,
              isSimulated: true
            }
          );
          jQuery.event.trigger(e, null, elem);
        }
      });
      jQuery.fn.extend({
        trigger: function(type, data) {
          return this.each(function() {
            jQuery.event.trigger(type, data, this);
          });
        },
        triggerHandler: function(type, data) {
          var elem = this[0];
          if (elem) {
            return jQuery.event.trigger(type, data, elem, true);
          }
        }
      });
      if (!support.focusin) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
          var handler = /* @__PURE__ */ __name(function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
          }, "handler");
          jQuery.event.special[fix] = {
            setup: function() {
              var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix);
              if (!attaches) {
                doc.addEventListener(orig, handler, true);
              }
              dataPriv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
              var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix) - 1;
              if (!attaches) {
                doc.removeEventListener(orig, handler, true);
                dataPriv.remove(doc, fix);
              } else {
                dataPriv.access(doc, fix, attaches);
              }
            }
          };
        });
      }
      var location2 = window2.location;
      var nonce = { guid: Date.now() };
      var rquery = /\?/;
      jQuery.parseXML = function(data) {
        var xml, parserErrorElem;
        if (!data || typeof data !== "string") {
          return null;
        }
        try {
          xml = new window2.DOMParser().parseFromString(data, "text/xml");
        } catch (e) {
        }
        parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
        if (!xml || parserErrorElem) {
          jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
            return el.textContent;
          }).join("\n") : data));
        }
        return xml;
      };
      var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
      function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
          jQuery.each(obj, function(i, v) {
            if (traditional || rbracket.test(prefix)) {
              add(prefix, v);
            } else {
              buildParams(
                prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                v,
                traditional,
                add
              );
            }
          });
        } else if (!traditional && toType(obj) === "object") {
          for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
          }
        } else {
          add(prefix, obj);
        }
      }
      __name(buildParams, "buildParams");
      jQuery.param = function(a, traditional) {
        var prefix, s = [], add = /* @__PURE__ */ __name(function(key, valueOrFunction) {
          var value = isFunction2(valueOrFunction) ? valueOrFunction() : valueOrFunction;
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
        }, "add");
        if (a == null) {
          return "";
        }
        if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
          jQuery.each(a, function() {
            add(this.name, this.value);
          });
        } else {
          for (prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
          }
        }
        return s.join("&");
      };
      jQuery.fn.extend({
        serialize: function() {
          return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
          return this.map(function() {
            var elements = jQuery.prop(this, "elements");
            return elements ? jQuery.makeArray(elements) : this;
          }).filter(function() {
            var type = this.type;
            return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
          }).map(function(_i, elem) {
            var val = jQuery(this).val();
            if (val == null) {
              return null;
            }
            if (Array.isArray(val)) {
              return jQuery.map(val, function(val2) {
                return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
              });
            }
            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
          }).get();
        }
      });
      var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
      originAnchor.href = location2.href;
      function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
          if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
          }
          var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
          if (isFunction2(func)) {
            while (dataType = dataTypes[i++]) {
              if (dataType[0] === "+") {
                dataType = dataType.slice(1) || "*";
                (structure[dataType] = structure[dataType] || []).unshift(func);
              } else {
                (structure[dataType] = structure[dataType] || []).push(func);
              }
            }
          }
        };
      }
      __name(addToPrefiltersOrTransports, "addToPrefiltersOrTransports");
      function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
          var selected;
          inspected[dataType] = true;
          jQuery.each(structure[dataType] || [], function(_4, prefilterOrFactory) {
            var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
            if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
              options.dataTypes.unshift(dataTypeOrTransport);
              inspect(dataTypeOrTransport);
              return false;
            } else if (seekingTransport) {
              return !(selected = dataTypeOrTransport);
            }
          });
          return selected;
        }
        __name(inspect, "inspect");
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
      }
      __name(inspectPrefiltersOrTransports, "inspectPrefiltersOrTransports");
      function ajaxExtend(target, src) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src) {
          if (src[key] !== void 0) {
            (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
          }
        }
        if (deep) {
          jQuery.extend(true, target, deep);
        }
        return target;
      }
      __name(ajaxExtend, "ajaxExtend");
      function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
          dataTypes.shift();
          if (ct === void 0) {
            ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
          }
        }
        if (ct) {
          for (type in contents) {
            if (contents[type] && contents[type].test(ct)) {
              dataTypes.unshift(type);
              break;
            }
          }
        }
        if (dataTypes[0] in responses) {
          finalDataType = dataTypes[0];
        } else {
          for (type in responses) {
            if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
              finalDataType = type;
              break;
            }
            if (!firstDataType) {
              firstDataType = type;
            }
          }
          finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
          if (finalDataType !== dataTypes[0]) {
            dataTypes.unshift(finalDataType);
          }
          return responses[finalDataType];
        }
      }
      __name(ajaxHandleResponses, "ajaxHandleResponses");
      function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
          for (conv in s.converters) {
            converters[conv.toLowerCase()] = s.converters[conv];
          }
        }
        current = dataTypes.shift();
        while (current) {
          if (s.responseFields[current]) {
            jqXHR[s.responseFields[current]] = response;
          }
          if (!prev && isSuccess && s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
          }
          prev = current;
          current = dataTypes.shift();
          if (current) {
            if (current === "*") {
              current = prev;
            } else if (prev !== "*" && prev !== current) {
              conv = converters[prev + " " + current] || converters["* " + current];
              if (!conv) {
                for (conv2 in converters) {
                  tmp = conv2.split(" ");
                  if (tmp[1] === current) {
                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                    if (conv) {
                      if (conv === true) {
                        conv = converters[conv2];
                      } else if (converters[conv2] !== true) {
                        current = tmp[0];
                        dataTypes.unshift(tmp[1]);
                      }
                      break;
                    }
                  }
                }
              }
              if (conv !== true) {
                if (conv && s.throws) {
                  response = conv(response);
                } else {
                  try {
                    response = conv(response);
                  } catch (e) {
                    return {
                      state: "parsererror",
                      error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                  }
                }
              }
            }
          }
        }
        return { state: "success", data: response };
      }
      __name(ajaxConvert, "ajaxConvert");
      jQuery.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: location2.href,
          type: "GET",
          isLocal: rlocalProtocol.test(location2.protocol),
          global: true,
          processData: true,
          async: true,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          /*
          timeout: 0,
          data: null,
          dataType: null,
          username: null,
          password: null,
          cache: null,
          throws: false,
          traditional: false,
          headers: {},
          */
          accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          // Data converters
          // Keys separate source (or catchall "*") and destination types with a single space
          converters: {
            // Convert anything to text
            "* text": String,
            // Text to html (true = no transformation)
            "text html": true,
            // Evaluate text as a json expression
            "text json": JSON.parse,
            // Parse text as xml
            "text xml": jQuery.parseXML
          },
          // For options that shouldn't be deep extended:
          // you can add your own custom options here if
          // and when you create one that shouldn't be
          // deep extended (see ajaxExtend)
          flatOptions: {
            url: true,
            context: true
          }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
          return settings ? (
            // Building a settings object
            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
          ) : (
            // Extending ajaxSettings
            ajaxExtend(jQuery.ajaxSettings, target)
          );
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        // Main method
        ajax: function(url, options) {
          if (typeof url === "object") {
            options = url;
            url = void 0;
          }
          options = options || {};
          var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
            readyState: 0,
            // Builds headers hashtable if needed
            getResponseHeader: function(key) {
              var match;
              if (completed2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while (match = rheaders.exec(responseHeadersString)) {
                    responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                  }
                }
                match = responseHeaders[key.toLowerCase() + " "];
              }
              return match == null ? null : match.join(", ");
            },
            // Raw string
            getAllResponseHeaders: function() {
              return completed2 ? responseHeadersString : null;
            },
            // Caches the header
            setRequestHeader: function(name, value) {
              if (completed2 == null) {
                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            // Overrides response content-type header
            overrideMimeType: function(type) {
              if (completed2 == null) {
                s.mimeType = type;
              }
              return this;
            },
            // Status-dependent callbacks
            statusCode: function(map) {
              var code;
              if (map) {
                if (completed2) {
                  jqXHR.always(map[jqXHR.status]);
                } else {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                }
              }
              return this;
            },
            // Cancel the request
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
          deferred.promise(jqXHR);
          s.url = ((url || s.url || location2.href) + "").replace(rprotocol, location2.protocol + "//");
          s.type = options.method || options.type || s.method || s.type;
          s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
          if (s.crossDomain == null) {
            urlAnchor = document2.createElement("a");
            try {
              urlAnchor.href = s.url;
              urlAnchor.href = urlAnchor.href;
              s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
            } catch (e) {
              s.crossDomain = true;
            }
          }
          if (s.data && s.processData && typeof s.data !== "string") {
            s.data = jQuery.param(s.data, s.traditional);
          }
          inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
          if (completed2) {
            return jqXHR;
          }
          fireGlobals = jQuery.event && s.global;
          if (fireGlobals && jQuery.active++ === 0) {
            jQuery.event.trigger("ajaxStart");
          }
          s.type = s.type.toUpperCase();
          s.hasContent = !rnoContent.test(s.type);
          cacheURL = s.url.replace(rhash, "");
          if (!s.hasContent) {
            uncached = s.url.slice(cacheURL.length);
            if (s.data && (s.processData || typeof s.data === "string")) {
              cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
              delete s.data;
            }
            if (s.cache === false) {
              cacheURL = cacheURL.replace(rantiCache, "$1");
              uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
            }
            s.url = cacheURL + uncached;
          } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
            s.data = s.data.replace(r20, "+");
          }
          if (s.ifModified) {
            if (jQuery.lastModified[cacheURL]) {
              jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
            }
            if (jQuery.etag[cacheURL]) {
              jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
            }
          }
          if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
            jqXHR.setRequestHeader("Content-Type", s.contentType);
          }
          jqXHR.setRequestHeader(
            "Accept",
            s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
          );
          for (i in s.headers) {
            jqXHR.setRequestHeader(i, s.headers[i]);
          }
          if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
            return jqXHR.abort();
          }
          strAbort = "abort";
          completeDeferred.add(s.complete);
          jqXHR.done(s.success);
          jqXHR.fail(s.error);
          transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
          if (!transport) {
            done(-1, "No Transport");
          } else {
            jqXHR.readyState = 1;
            if (fireGlobals) {
              globalEventContext.trigger("ajaxSend", [jqXHR, s]);
            }
            if (completed2) {
              return jqXHR;
            }
            if (s.async && s.timeout > 0) {
              timeoutTimer = window2.setTimeout(function() {
                jqXHR.abort("timeout");
              }, s.timeout);
            }
            try {
              completed2 = false;
              transport.send(requestHeaders, done);
            } catch (e) {
              if (completed2) {
                throw e;
              }
              done(-1, e);
            }
          }
          function done(status, nativeStatusText, responses, headers) {
            var isSuccess, success, error, response, modified, statusText = nativeStatusText;
            if (completed2) {
              return;
            }
            completed2 = true;
            if (timeoutTimer) {
              window2.clearTimeout(timeoutTimer);
            }
            transport = void 0;
            responseHeadersString = headers || "";
            jqXHR.readyState = status > 0 ? 4 : 0;
            isSuccess = status >= 200 && status < 300 || status === 304;
            if (responses) {
              response = ajaxHandleResponses(s, jqXHR, responses);
            }
            if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
              s.converters["text script"] = function() {
              };
            }
            response = ajaxConvert(s, response, jqXHR, isSuccess);
            if (isSuccess) {
              if (s.ifModified) {
                modified = jqXHR.getResponseHeader("Last-Modified");
                if (modified) {
                  jQuery.lastModified[cacheURL] = modified;
                }
                modified = jqXHR.getResponseHeader("etag");
                if (modified) {
                  jQuery.etag[cacheURL] = modified;
                }
              }
              if (status === 204 || s.type === "HEAD") {
                statusText = "nocontent";
              } else if (status === 304) {
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                isSuccess = !error;
              }
            } else {
              error = statusText;
              if (status || !statusText) {
                statusText = "error";
                if (status < 0) {
                  status = 0;
                }
              }
            }
            jqXHR.status = status;
            jqXHR.statusText = (nativeStatusText || statusText) + "";
            if (isSuccess) {
              deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
            } else {
              deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
            }
            jqXHR.statusCode(statusCode);
            statusCode = void 0;
            if (fireGlobals) {
              globalEventContext.trigger(
                isSuccess ? "ajaxSuccess" : "ajaxError",
                [jqXHR, s, isSuccess ? success : error]
              );
            }
            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
            if (fireGlobals) {
              globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
              if (!--jQuery.active) {
                jQuery.event.trigger("ajaxStop");
              }
            }
          }
          __name(done, "done");
          return jqXHR;
        },
        getJSON: function(url, data, callback) {
          return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
          return jQuery.get(url, void 0, callback, "script");
        }
      });
      jQuery.each(["get", "post"], function(_i, method) {
        jQuery[method] = function(url, data, callback, type) {
          if (isFunction2(data)) {
            type = type || callback;
            callback = data;
            data = void 0;
          }
          return jQuery.ajax(jQuery.extend({
            url,
            type: method,
            dataType: type,
            data,
            success: callback
          }, jQuery.isPlainObject(url) && url));
        };
      });
      jQuery.ajaxPrefilter(function(s) {
        var i;
        for (i in s.headers) {
          if (i.toLowerCase() === "content-type") {
            s.contentType = s.headers[i] || "";
          }
        }
      });
      jQuery._evalUrl = function(url, options, doc) {
        return jQuery.ajax({
          url,
          // Make this explicit, since user can override this through ajaxSetup (trac-11264)
          type: "GET",
          dataType: "script",
          cache: true,
          async: false,
          global: false,
          // Only evaluate the response if it is successful (gh-4126)
          // dataFilter is not invoked for failure responses, so using it instead
          // of the default converter is kludgy but it works.
          converters: {
            "text script": function() {
            }
          },
          dataFilter: function(response) {
            jQuery.globalEval(response, options, doc);
          }
        });
      };
      jQuery.fn.extend({
        wrapAll: function(html) {
          var wrap;
          if (this[0]) {
            if (isFunction2(html)) {
              html = html.call(this[0]);
            }
            wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
              wrap.insertBefore(this[0]);
            }
            wrap.map(function() {
              var elem = this;
              while (elem.firstElementChild) {
                elem = elem.firstElementChild;
              }
              return elem;
            }).append(this);
          }
          return this;
        },
        wrapInner: function(html) {
          if (isFunction2(html)) {
            return this.each(function(i) {
              jQuery(this).wrapInner(html.call(this, i));
            });
          }
          return this.each(function() {
            var self2 = jQuery(this), contents = self2.contents();
            if (contents.length) {
              contents.wrapAll(html);
            } else {
              self2.append(html);
            }
          });
        },
        wrap: function(html) {
          var htmlIsFunction = isFunction2(html);
          return this.each(function(i) {
            jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
          });
        },
        unwrap: function(selector) {
          this.parent(selector).not("body").each(function() {
            jQuery(this).replaceWith(this.childNodes);
          });
          return this;
        }
      });
      jQuery.expr.pseudos.hidden = function(elem) {
        return !jQuery.expr.pseudos.visible(elem);
      };
      jQuery.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      };
      jQuery.ajaxSettings.xhr = function() {
        try {
          return new window2.XMLHttpRequest();
        } catch (e) {
        }
      };
      var xhrSuccessStatus = {
        // File protocol always yields status code 0, assume 200
        0: 200,
        // Support: IE <=9 only
        // trac-1450: sometimes IE returns 1223 when it should be 204
        1223: 204
      }, xhrSupported = jQuery.ajaxSettings.xhr();
      support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
      support.ajax = xhrSupported = !!xhrSupported;
      jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
          return {
            send: function(headers, complete) {
              var i, xhr = options.xhr();
              xhr.open(
                options.type,
                options.url,
                options.async,
                options.username,
                options.password
              );
              if (options.xhrFields) {
                for (i in options.xhrFields) {
                  xhr[i] = options.xhrFields[i];
                }
              }
              if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
              }
              if (!options.crossDomain && !headers["X-Requested-With"]) {
                headers["X-Requested-With"] = "XMLHttpRequest";
              }
              for (i in headers) {
                xhr.setRequestHeader(i, headers[i]);
              }
              callback = /* @__PURE__ */ __name(function(type) {
                return function() {
                  if (callback) {
                    callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                    if (type === "abort") {
                      xhr.abort();
                    } else if (type === "error") {
                      if (typeof xhr.status !== "number") {
                        complete(0, "error");
                      } else {
                        complete(
                          // File: protocol always yields status 0; see trac-8605, trac-14207
                          xhr.status,
                          xhr.statusText
                        );
                      }
                    } else {
                      complete(
                        xhrSuccessStatus[xhr.status] || xhr.status,
                        xhr.statusText,
                        // Support: IE <=9 only
                        // IE9 has no XHR2 but throws on binary (trac-11426)
                        // For XHR2 non-text, let the caller handle it (gh-2498)
                        (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                        xhr.getAllResponseHeaders()
                      );
                    }
                  }
                };
              }, "callback");
              xhr.onload = callback();
              errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
              if (xhr.onabort !== void 0) {
                xhr.onabort = errorCallback;
              } else {
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    window2.setTimeout(function() {
                      if (callback) {
                        errorCallback();
                      }
                    });
                  }
                };
              }
              callback = callback("abort");
              try {
                xhr.send(options.hasContent && options.data || null);
              } catch (e) {
                if (callback) {
                  throw e;
                }
              }
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      jQuery.ajaxPrefilter(function(s) {
        if (s.crossDomain) {
          s.contents.script = false;
        }
      });
      jQuery.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function(text) {
            jQuery.globalEval(text);
            return text;
          }
        }
      });
      jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === void 0) {
          s.cache = false;
        }
        if (s.crossDomain) {
          s.type = "GET";
        }
      });
      jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain || s.scriptAttrs) {
          var script, callback;
          return {
            send: function(_4, complete) {
              script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = /* @__PURE__ */ __name(function(evt) {
                script.remove();
                callback = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              }, "callback"));
              document2.head.appendChild(script[0]);
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
      jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
          var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
          this[callback] = true;
          return callback;
        }
      });
      jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
          callbackName = s.jsonpCallback = isFunction2(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
          if (jsonProp) {
            s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
          } else if (s.jsonp !== false) {
            s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
          }
          s.converters["script json"] = function() {
            if (!responseContainer) {
              jQuery.error(callbackName + " was not called");
            }
            return responseContainer[0];
          };
          s.dataTypes[0] = "json";
          overwritten = window2[callbackName];
          window2[callbackName] = function() {
            responseContainer = arguments;
          };
          jqXHR.always(function() {
            if (overwritten === void 0) {
              jQuery(window2).removeProp(callbackName);
            } else {
              window2[callbackName] = overwritten;
            }
            if (s[callbackName]) {
              s.jsonpCallback = originalSettings.jsonpCallback;
              oldCallbacks.push(callbackName);
            }
            if (responseContainer && isFunction2(overwritten)) {
              overwritten(responseContainer[0]);
            }
            responseContainer = overwritten = void 0;
          });
          return "script";
        }
      });
      support.createHTMLDocument = function() {
        var body = document2.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
      }();
      jQuery.parseHTML = function(data, context, keepScripts) {
        if (typeof data !== "string") {
          return [];
        }
        if (typeof context === "boolean") {
          keepScripts = context;
          context = false;
        }
        var base, parsed, scripts;
        if (!context) {
          if (support.createHTMLDocument) {
            context = document2.implementation.createHTMLDocument("");
            base = context.createElement("base");
            base.href = document2.location.href;
            context.head.appendChild(base);
          } else {
            context = document2;
          }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];
        if (parsed) {
          return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
          jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
      };
      jQuery.fn.load = function(url, params, callback) {
        var selector, type, response, self2 = this, off = url.indexOf(" ");
        if (off > -1) {
          selector = stripAndCollapse(url.slice(off));
          url = url.slice(0, off);
        }
        if (isFunction2(params)) {
          callback = params;
          params = void 0;
        } else if (params && typeof params === "object") {
          type = "POST";
        }
        if (self2.length > 0) {
          jQuery.ajax({
            url,
            // If "type" variable is undefined, then "GET" method will be used.
            // Make value of this field explicit since
            // user can override it through ajaxSetup method
            type: type || "GET",
            dataType: "html",
            data: params
          }).done(function(responseText) {
            response = arguments;
            self2.html(selector ? (
              // If a selector was specified, locate the right elements in a dummy div
              // Exclude scripts to avoid IE 'Permission Denied' errors
              jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
            ) : (
              // Otherwise use the full result
              responseText
            ));
          }).always(callback && function(jqXHR, status) {
            self2.each(function() {
              callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
            });
          });
        }
        return this;
      };
      jQuery.expr.pseudos.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
          return elem === fn.elem;
        }).length;
      };
      jQuery.offset = {
        setOffset: function(elem, options, i) {
          var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
          if (position === "static") {
            elem.style.position = "relative";
          }
          curOffset = curElem.offset();
          curCSSTop = jQuery.css(elem, "top");
          curCSSLeft = jQuery.css(elem, "left");
          calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
          if (calculatePosition) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
          } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
          }
          if (isFunction2(options)) {
            options = options.call(elem, i, jQuery.extend({}, curOffset));
          }
          if (options.top != null) {
            props.top = options.top - curOffset.top + curTop;
          }
          if (options.left != null) {
            props.left = options.left - curOffset.left + curLeft;
          }
          if ("using" in options) {
            options.using.call(elem, props);
          } else {
            curElem.css(props);
          }
        }
      };
      jQuery.fn.extend({
        // offset() relates an element's border box to the document origin
        offset: function(options) {
          if (arguments.length) {
            return options === void 0 ? this : this.each(function(i) {
              jQuery.offset.setOffset(this, options, i);
            });
          }
          var rect, win, elem = this[0];
          if (!elem) {
            return;
          }
          if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
          }
          rect = elem.getBoundingClientRect();
          win = elem.ownerDocument.defaultView;
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        },
        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
          if (!this[0]) {
            return;
          }
          var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
          if (jQuery.css(elem, "position") === "fixed") {
            offset = elem.getBoundingClientRect();
          } else {
            offset = this.offset();
            doc = elem.ownerDocument;
            offsetParent = elem.offsetParent || doc.documentElement;
            while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
              parentOffset = jQuery(offsetParent).offset();
              parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
              parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
            }
          }
          return {
            top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
          };
        },
        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
          return this.map(function() {
            var offsetParent = this.offsetParent;
            while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || documentElement;
          });
        }
      });
      jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
          return access(this, function(elem, method2, val2) {
            var win;
            if (isWindow(elem)) {
              win = elem;
            } else if (elem.nodeType === 9) {
              win = elem.defaultView;
            }
            if (val2 === void 0) {
              return win ? win[prop] : elem[method2];
            }
            if (win) {
              win.scrollTo(
                !top ? val2 : win.pageXOffset,
                top ? val2 : win.pageYOffset
              );
            } else {
              elem[method2] = val2;
            }
          }, method, val, arguments.length);
        };
      });
      jQuery.each(["top", "left"], function(_i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(
          support.pixelPosition,
          function(elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
          }
        );
      });
      jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
        jQuery.each({
          padding: "inner" + name,
          content: type,
          "": "outer" + name
        }, function(defaultExtra, funcName) {
          jQuery.fn[funcName] = function(margin, value) {
            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
            return access(this, function(elem, type2, value2) {
              var doc;
              if (isWindow(elem)) {
                return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
              }
              if (elem.nodeType === 9) {
                doc = elem.documentElement;
                return Math.max(
                  elem.body["scroll" + name],
                  doc["scroll" + name],
                  elem.body["offset" + name],
                  doc["offset" + name],
                  doc["client" + name]
                );
              }
              return value2 === void 0 ? (
                // Get width or height on the element, requesting but not forcing parseFloat
                jQuery.css(elem, type2, extra)
              ) : (
                // Set width or height on the element
                jQuery.style(elem, type2, value2, extra)
              );
            }, type, chainable ? margin : void 0, chainable);
          };
        });
      });
      jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
      ], function(_i, type) {
        jQuery.fn[type] = function(fn) {
          return this.on(type, fn);
        };
      });
      jQuery.fn.extend({
        bind: function(types, data, fn) {
          return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
          return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
          return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
          return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        hover: function(fnOver, fnOut) {
          return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
      });
      jQuery.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
        function(_i, name) {
          jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
          };
        }
      );
      var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      jQuery.proxy = function(fn, context) {
        var tmp, args, proxy;
        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }
        if (!isFunction2(fn)) {
          return void 0;
        }
        args = slice.call(arguments, 2);
        proxy = /* @__PURE__ */ __name(function() {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        }, "proxy");
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
      };
      jQuery.holdReady = function(hold) {
        if (hold) {
          jQuery.readyWait++;
        } else {
          jQuery.ready(true);
        }
      };
      jQuery.isArray = Array.isArray;
      jQuery.parseJSON = JSON.parse;
      jQuery.nodeName = nodeName;
      jQuery.isFunction = isFunction2;
      jQuery.isWindow = isWindow;
      jQuery.camelCase = camelCase;
      jQuery.type = toType;
      jQuery.now = Date.now;
      jQuery.isNumeric = function(obj) {
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        !isNaN(obj - parseFloat(obj));
      };
      jQuery.trim = function(text) {
        return text == null ? "" : (text + "").replace(rtrim, "$1");
      };
      if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
          return jQuery;
        });
      }
      var _jQuery = window2.jQuery, _$ = window2.$;
      jQuery.noConflict = function(deep) {
        if (window2.$ === jQuery) {
          window2.$ = _$;
        }
        if (deep && window2.jQuery === jQuery) {
          window2.jQuery = _jQuery;
        }
        return jQuery;
      };
      if (typeof noGlobal === "undefined") {
        window2.jQuery = window2.$ = jQuery;
      }
      return jQuery;
    });
  }
});

// node_modules/animejs/lib/anime.js
var require_anime = __commonJS({
  "node_modules/animejs/lib/anime.js"(exports, module2) {
    "use strict";
    var defaultInstanceSettings = {
      update: null,
      begin: null,
      loopBegin: null,
      changeBegin: null,
      change: null,
      changeComplete: null,
      loopComplete: null,
      complete: null,
      loop: 1,
      direction: "normal",
      autoplay: true,
      timelineOffset: 0
    };
    var defaultTweenSettings = {
      duration: 1e3,
      delay: 0,
      endDelay: 0,
      easing: "easeOutElastic(1, .5)",
      round: 0
    };
    var validTransforms = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"];
    var cache = {
      CSS: {},
      springs: {}
    };
    function minMax(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }
    __name(minMax, "minMax");
    function stringContains(str, text) {
      return str.indexOf(text) > -1;
    }
    __name(stringContains, "stringContains");
    function applyArguments(func, args) {
      return func.apply(null, args);
    }
    __name(applyArguments, "applyArguments");
    var is = {
      arr: function(a) {
        return Array.isArray(a);
      },
      obj: function(a) {
        return stringContains(Object.prototype.toString.call(a), "Object");
      },
      pth: function(a) {
        return is.obj(a) && a.hasOwnProperty("totalLength");
      },
      svg: function(a) {
        return a instanceof SVGElement;
      },
      inp: function(a) {
        return a instanceof HTMLInputElement;
      },
      dom: function(a) {
        return a.nodeType || is.svg(a);
      },
      str: function(a) {
        return typeof a === "string";
      },
      fnc: function(a) {
        return typeof a === "function";
      },
      und: function(a) {
        return typeof a === "undefined";
      },
      nil: function(a) {
        return is.und(a) || a === null;
      },
      hex: function(a) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
      },
      rgb: function(a) {
        return /^rgb/.test(a);
      },
      hsl: function(a) {
        return /^hsl/.test(a);
      },
      col: function(a) {
        return is.hex(a) || is.rgb(a) || is.hsl(a);
      },
      key: function(a) {
        return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== "targets" && a !== "keyframes";
      }
    };
    function parseEasingParameters(string) {
      var match = /\(([^)]+)\)/.exec(string);
      return match ? match[1].split(",").map(function(p) {
        return parseFloat(p);
      }) : [];
    }
    __name(parseEasingParameters, "parseEasingParameters");
    function spring(string, duration) {
      var params = parseEasingParameters(string);
      var mass = minMax(is.und(params[0]) ? 1 : params[0], 0.1, 100);
      var stiffness = minMax(is.und(params[1]) ? 100 : params[1], 0.1, 100);
      var damping = minMax(is.und(params[2]) ? 10 : params[2], 0.1, 100);
      var velocity = minMax(is.und(params[3]) ? 0 : params[3], 0.1, 100);
      var w0 = Math.sqrt(stiffness / mass);
      var zeta = damping / (2 * Math.sqrt(stiffness * mass));
      var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
      var a = 1;
      var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;
      function solver(t) {
        var progress = duration ? duration * t / 1e3 : t;
        if (zeta < 1) {
          progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
        } else {
          progress = (a + b * progress) * Math.exp(-progress * w0);
        }
        if (t === 0 || t === 1) {
          return t;
        }
        return 1 - progress;
      }
      __name(solver, "solver");
      function getDuration() {
        var cached = cache.springs[string];
        if (cached) {
          return cached;
        }
        var frame = 1 / 6;
        var elapsed = 0;
        var rest = 0;
        while (true) {
          elapsed += frame;
          if (solver(elapsed) === 1) {
            rest++;
            if (rest >= 16) {
              break;
            }
          } else {
            rest = 0;
          }
        }
        var duration2 = elapsed * frame * 1e3;
        cache.springs[string] = duration2;
        return duration2;
      }
      __name(getDuration, "getDuration");
      return duration ? solver : getDuration;
    }
    __name(spring, "spring");
    function steps(steps2) {
      if (steps2 === void 0)
        steps2 = 10;
      return function(t) {
        return Math.ceil(minMax(t, 1e-6, 1) * steps2) * (1 / steps2);
      };
    }
    __name(steps, "steps");
    var bezier = function() {
      var kSplineTableSize = 11;
      var kSampleStepSize = 1 / (kSplineTableSize - 1);
      function A(aA1, aA2) {
        return 1 - 3 * aA2 + 3 * aA1;
      }
      __name(A, "A");
      function B(aA1, aA2) {
        return 3 * aA2 - 6 * aA1;
      }
      __name(B, "B");
      function C(aA1) {
        return 3 * aA1;
      }
      __name(C, "C");
      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }
      __name(calcBezier, "calcBezier");
      function getSlope(aT, aA1, aA2) {
        return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
      }
      __name(getSlope, "getSlope");
      function binarySubdivide(aX, aA, aB, mX1, mX2) {
        var currentX, currentT, i = 0;
        do {
          currentT = aA + (aB - aA) / 2;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > 1e-7 && ++i < 10);
        return currentT;
      }
      __name(binarySubdivide, "binarySubdivide");
      function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
        for (var i = 0; i < 4; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);
          if (currentSlope === 0) {
            return aGuessT;
          }
          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }
        return aGuessT;
      }
      __name(newtonRaphsonIterate, "newtonRaphsonIterate");
      function bezier2(mX1, mY1, mX2, mY2) {
        if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
          return;
        }
        var sampleValues = new Float32Array(kSplineTableSize);
        if (mX1 !== mY1 || mX2 !== mY2) {
          for (var i = 0; i < kSplineTableSize; ++i) {
            sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
          }
        }
        function getTForX(aX) {
          var intervalStart = 0;
          var currentSample = 1;
          var lastSample = kSplineTableSize - 1;
          for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
            intervalStart += kSampleStepSize;
          }
          --currentSample;
          var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
          var guessForT = intervalStart + dist * kSampleStepSize;
          var initialSlope = getSlope(guessForT, mX1, mX2);
          if (initialSlope >= 1e-3) {
            return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
          } else if (initialSlope === 0) {
            return guessForT;
          } else {
            return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
          }
        }
        __name(getTForX, "getTForX");
        return function(x) {
          if (mX1 === mY1 && mX2 === mY2) {
            return x;
          }
          if (x === 0 || x === 1) {
            return x;
          }
          return calcBezier(getTForX(x), mY1, mY2);
        };
      }
      __name(bezier2, "bezier");
      return bezier2;
    }();
    var penner = function() {
      var eases = { linear: function() {
        return function(t) {
          return t;
        };
      } };
      var functionEasings = {
        Sine: function() {
          return function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
          };
        },
        Circ: function() {
          return function(t) {
            return 1 - Math.sqrt(1 - t * t);
          };
        },
        Back: function() {
          return function(t) {
            return t * t * (3 * t - 2);
          };
        },
        Bounce: function() {
          return function(t) {
            var pow2, b = 4;
            while (t < ((pow2 = Math.pow(2, --b)) - 1) / 11) {
            }
            return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
          };
        },
        Elastic: function(amplitude, period) {
          if (amplitude === void 0)
            amplitude = 1;
          if (period === void 0)
            period = 0.5;
          var a = minMax(amplitude, 1, 10);
          var p = minMax(period, 0.1, 2);
          return function(t) {
            return t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
          };
        }
      };
      var baseEasings = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
      baseEasings.forEach(function(name, i) {
        functionEasings[name] = function() {
          return function(t) {
            return Math.pow(t, i + 2);
          };
        };
      });
      Object.keys(functionEasings).forEach(function(name) {
        var easeIn = functionEasings[name];
        eases["easeIn" + name] = easeIn;
        eases["easeOut" + name] = function(a, b) {
          return function(t) {
            return 1 - easeIn(a, b)(1 - t);
          };
        };
        eases["easeInOut" + name] = function(a, b) {
          return function(t) {
            return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
          };
        };
        eases["easeOutIn" + name] = function(a, b) {
          return function(t) {
            return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
          };
        };
      });
      return eases;
    }();
    function parseEasings(easing, duration) {
      if (is.fnc(easing)) {
        return easing;
      }
      var name = easing.split("(")[0];
      var ease = penner[name];
      var args = parseEasingParameters(easing);
      switch (name) {
        case "spring":
          return spring(easing, duration);
        case "cubicBezier":
          return applyArguments(bezier, args);
        case "steps":
          return applyArguments(steps, args);
        default:
          return applyArguments(ease, args);
      }
    }
    __name(parseEasings, "parseEasings");
    function selectString(str) {
      try {
        var nodes = document.querySelectorAll(str);
        return nodes;
      } catch (e) {
        return;
      }
    }
    __name(selectString, "selectString");
    function filterArray(arr, callback) {
      var len = arr.length;
      var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
      var result = [];
      for (var i = 0; i < len; i++) {
        if (i in arr) {
          var val = arr[i];
          if (callback.call(thisArg, val, i, arr)) {
            result.push(val);
          }
        }
      }
      return result;
    }
    __name(filterArray, "filterArray");
    function flattenArray(arr) {
      return arr.reduce(function(a, b) {
        return a.concat(is.arr(b) ? flattenArray(b) : b);
      }, []);
    }
    __name(flattenArray, "flattenArray");
    function toArray(o) {
      if (is.arr(o)) {
        return o;
      }
      if (is.str(o)) {
        o = selectString(o) || o;
      }
      if (o instanceof NodeList || o instanceof HTMLCollection) {
        return [].slice.call(o);
      }
      return [o];
    }
    __name(toArray, "toArray");
    function arrayContains(arr, val) {
      return arr.some(function(a) {
        return a === val;
      });
    }
    __name(arrayContains, "arrayContains");
    function cloneObject(o) {
      var clone = {};
      for (var p in o) {
        clone[p] = o[p];
      }
      return clone;
    }
    __name(cloneObject, "cloneObject");
    function replaceObjectProps(o1, o2) {
      var o = cloneObject(o1);
      for (var p in o1) {
        o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
      }
      return o;
    }
    __name(replaceObjectProps, "replaceObjectProps");
    function mergeObjects(o1, o2) {
      var o = cloneObject(o1);
      for (var p in o2) {
        o[p] = is.und(o1[p]) ? o2[p] : o1[p];
      }
      return o;
    }
    __name(mergeObjects, "mergeObjects");
    function rgbToRgba(rgbValue) {
      var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
      return rgb ? "rgba(" + rgb[1] + ",1)" : rgbValue;
    }
    __name(rgbToRgba, "rgbToRgba");
    function hexToRgba(hexValue) {
      var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      var hex = hexValue.replace(rgx, function(m, r2, g2, b2) {
        return r2 + r2 + g2 + g2 + b2 + b2;
      });
      var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      var r = parseInt(rgb[1], 16);
      var g = parseInt(rgb[2], 16);
      var b = parseInt(rgb[3], 16);
      return "rgba(" + r + "," + g + "," + b + ",1)";
    }
    __name(hexToRgba, "hexToRgba");
    function hslToRgba(hslValue) {
      var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
      var h = parseInt(hsl[1], 10) / 360;
      var s = parseInt(hsl[2], 10) / 100;
      var l = parseInt(hsl[3], 10) / 100;
      var a = hsl[4] || 1;
      function hue2rgb(p2, q2, t) {
        if (t < 0) {
          t += 1;
        }
        if (t > 1) {
          t -= 1;
        }
        if (t < 1 / 6) {
          return p2 + (q2 - p2) * 6 * t;
        }
        if (t < 1 / 2) {
          return q2;
        }
        if (t < 2 / 3) {
          return p2 + (q2 - p2) * (2 / 3 - t) * 6;
        }
        return p2;
      }
      __name(hue2rgb, "hue2rgb");
      var r, g, b;
      if (s == 0) {
        r = g = b = l;
      } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return "rgba(" + r * 255 + "," + g * 255 + "," + b * 255 + "," + a + ")";
    }
    __name(hslToRgba, "hslToRgba");
    function colorToRgb(val) {
      if (is.rgb(val)) {
        return rgbToRgba(val);
      }
      if (is.hex(val)) {
        return hexToRgba(val);
      }
      if (is.hsl(val)) {
        return hslToRgba(val);
      }
    }
    __name(colorToRgb, "colorToRgb");
    function getUnit(val) {
      var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
      if (split) {
        return split[1];
      }
    }
    __name(getUnit, "getUnit");
    function getTransformUnit(propName) {
      if (stringContains(propName, "translate") || propName === "perspective") {
        return "px";
      }
      if (stringContains(propName, "rotate") || stringContains(propName, "skew")) {
        return "deg";
      }
    }
    __name(getTransformUnit, "getTransformUnit");
    function getFunctionValue(val, animatable) {
      if (!is.fnc(val)) {
        return val;
      }
      return val(animatable.target, animatable.id, animatable.total);
    }
    __name(getFunctionValue, "getFunctionValue");
    function getAttribute(el, prop) {
      return el.getAttribute(prop);
    }
    __name(getAttribute, "getAttribute");
    function convertPxToUnit(el, value, unit) {
      var valueUnit = getUnit(value);
      if (arrayContains([unit, "deg", "rad", "turn"], valueUnit)) {
        return value;
      }
      var cached = cache.CSS[value + unit];
      if (!is.und(cached)) {
        return cached;
      }
      var baseline = 100;
      var tempEl = document.createElement(el.tagName);
      var parentEl = el.parentNode && el.parentNode !== document ? el.parentNode : document.body;
      parentEl.appendChild(tempEl);
      tempEl.style.position = "absolute";
      tempEl.style.width = baseline + unit;
      var factor = baseline / tempEl.offsetWidth;
      parentEl.removeChild(tempEl);
      var convertedUnit = factor * parseFloat(value);
      cache.CSS[value + unit] = convertedUnit;
      return convertedUnit;
    }
    __name(convertPxToUnit, "convertPxToUnit");
    function getCSSValue(el, prop, unit) {
      if (prop in el.style) {
        var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || "0";
        return unit ? convertPxToUnit(el, value, unit) : value;
      }
    }
    __name(getCSSValue, "getCSSValue");
    function getAnimationType(el, prop) {
      if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || is.svg(el) && el[prop])) {
        return "attribute";
      }
      if (is.dom(el) && arrayContains(validTransforms, prop)) {
        return "transform";
      }
      if (is.dom(el) && (prop !== "transform" && getCSSValue(el, prop))) {
        return "css";
      }
      if (el[prop] != null) {
        return "object";
      }
    }
    __name(getAnimationType, "getAnimationType");
    function getElementTransforms(el) {
      if (!is.dom(el)) {
        return;
      }
      var str = el.style.transform || "";
      var reg = /(\w+)\(([^)]*)\)/g;
      var transforms = /* @__PURE__ */ new Map();
      var m;
      while (m = reg.exec(str)) {
        transforms.set(m[1], m[2]);
      }
      return transforms;
    }
    __name(getElementTransforms, "getElementTransforms");
    function getTransformValue(el, propName, animatable, unit) {
      var defaultVal = stringContains(propName, "scale") ? 1 : 0 + getTransformUnit(propName);
      var value = getElementTransforms(el).get(propName) || defaultVal;
      if (animatable) {
        animatable.transforms.list.set(propName, value);
        animatable.transforms["last"] = propName;
      }
      return unit ? convertPxToUnit(el, value, unit) : value;
    }
    __name(getTransformValue, "getTransformValue");
    function getOriginalTargetValue(target, propName, unit, animatable) {
      switch (getAnimationType(target, propName)) {
        case "transform":
          return getTransformValue(target, propName, animatable, unit);
        case "css":
          return getCSSValue(target, propName, unit);
        case "attribute":
          return getAttribute(target, propName);
        default:
          return target[propName] || 0;
      }
    }
    __name(getOriginalTargetValue, "getOriginalTargetValue");
    function getRelativeValue(to, from) {
      var operator = /^(\*=|\+=|-=)/.exec(to);
      if (!operator) {
        return to;
      }
      var u = getUnit(to) || 0;
      var x = parseFloat(from);
      var y = parseFloat(to.replace(operator[0], ""));
      switch (operator[0][0]) {
        case "+":
          return x + y + u;
        case "-":
          return x - y + u;
        case "*":
          return x * y + u;
      }
    }
    __name(getRelativeValue, "getRelativeValue");
    function validateValue(val, unit) {
      if (is.col(val)) {
        return colorToRgb(val);
      }
      if (/\s/g.test(val)) {
        return val;
      }
      var originalUnit = getUnit(val);
      var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
      if (unit) {
        return unitLess + unit;
      }
      return unitLess;
    }
    __name(validateValue, "validateValue");
    function getDistance(p1, p2) {
      return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    }
    __name(getDistance, "getDistance");
    function getCircleLength(el) {
      return Math.PI * 2 * getAttribute(el, "r");
    }
    __name(getCircleLength, "getCircleLength");
    function getRectLength(el) {
      return getAttribute(el, "width") * 2 + getAttribute(el, "height") * 2;
    }
    __name(getRectLength, "getRectLength");
    function getLineLength(el) {
      return getDistance(
        { x: getAttribute(el, "x1"), y: getAttribute(el, "y1") },
        { x: getAttribute(el, "x2"), y: getAttribute(el, "y2") }
      );
    }
    __name(getLineLength, "getLineLength");
    function getPolylineLength(el) {
      var points = el.points;
      var totalLength = 0;
      var previousPos;
      for (var i = 0; i < points.numberOfItems; i++) {
        var currentPos = points.getItem(i);
        if (i > 0) {
          totalLength += getDistance(previousPos, currentPos);
        }
        previousPos = currentPos;
      }
      return totalLength;
    }
    __name(getPolylineLength, "getPolylineLength");
    function getPolygonLength(el) {
      var points = el.points;
      return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
    }
    __name(getPolygonLength, "getPolygonLength");
    function getTotalLength(el) {
      if (el.getTotalLength) {
        return el.getTotalLength();
      }
      switch (el.tagName.toLowerCase()) {
        case "circle":
          return getCircleLength(el);
        case "rect":
          return getRectLength(el);
        case "line":
          return getLineLength(el);
        case "polyline":
          return getPolylineLength(el);
        case "polygon":
          return getPolygonLength(el);
      }
    }
    __name(getTotalLength, "getTotalLength");
    function setDashoffset(el) {
      var pathLength = getTotalLength(el);
      el.setAttribute("stroke-dasharray", pathLength);
      return pathLength;
    }
    __name(setDashoffset, "setDashoffset");
    function getParentSvgEl(el) {
      var parentEl = el.parentNode;
      while (is.svg(parentEl)) {
        if (!is.svg(parentEl.parentNode)) {
          break;
        }
        parentEl = parentEl.parentNode;
      }
      return parentEl;
    }
    __name(getParentSvgEl, "getParentSvgEl");
    function getParentSvg(pathEl, svgData) {
      var svg = svgData || {};
      var parentSvgEl = svg.el || getParentSvgEl(pathEl);
      var rect = parentSvgEl.getBoundingClientRect();
      var viewBoxAttr = getAttribute(parentSvgEl, "viewBox");
      var width = rect.width;
      var height = rect.height;
      var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(" ") : [0, 0, width, height]);
      return {
        el: parentSvgEl,
        viewBox,
        x: viewBox[0] / 1,
        y: viewBox[1] / 1,
        w: width,
        h: height,
        vW: viewBox[2],
        vH: viewBox[3]
      };
    }
    __name(getParentSvg, "getParentSvg");
    function getPath(path, percent) {
      var pathEl = is.str(path) ? selectString(path)[0] : path;
      var p = percent || 100;
      return function(property) {
        return {
          property,
          el: pathEl,
          svg: getParentSvg(pathEl),
          totalLength: getTotalLength(pathEl) * (p / 100)
        };
      };
    }
    __name(getPath, "getPath");
    function getPathProgress(path, progress, isPathTargetInsideSVG) {
      function point(offset) {
        if (offset === void 0)
          offset = 0;
        var l = progress + offset >= 1 ? progress + offset : 0;
        return path.el.getPointAtLength(l);
      }
      __name(point, "point");
      var svg = getParentSvg(path.el, path.svg);
      var p = point();
      var p0 = point(-1);
      var p1 = point(1);
      var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
      var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
      switch (path.property) {
        case "x":
          return (p.x - svg.x) * scaleX;
        case "y":
          return (p.y - svg.y) * scaleY;
        case "angle":
          return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
      }
    }
    __name(getPathProgress, "getPathProgress");
    function decomposeValue(val, unit) {
      var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
      var value = validateValue(is.pth(val) ? val.totalLength : val, unit) + "";
      return {
        original: value,
        numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
        strings: is.str(val) || unit ? value.split(rgx) : []
      };
    }
    __name(decomposeValue, "decomposeValue");
    function parseTargets(targets) {
      var targetsArray = targets ? flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets)) : [];
      return filterArray(targetsArray, function(item, pos, self2) {
        return self2.indexOf(item) === pos;
      });
    }
    __name(parseTargets, "parseTargets");
    function getAnimatables(targets) {
      var parsed = parseTargets(targets);
      return parsed.map(function(t, i) {
        return { target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
      });
    }
    __name(getAnimatables, "getAnimatables");
    function normalizePropertyTweens(prop, tweenSettings) {
      var settings = cloneObject(tweenSettings);
      if (/^spring/.test(settings.easing)) {
        settings.duration = spring(settings.easing);
      }
      if (is.arr(prop)) {
        var l = prop.length;
        var isFromTo = l === 2 && !is.obj(prop[0]);
        if (!isFromTo) {
          if (!is.fnc(tweenSettings.duration)) {
            settings.duration = tweenSettings.duration / l;
          }
        } else {
          prop = { value: prop };
        }
      }
      var propArray = is.arr(prop) ? prop : [prop];
      return propArray.map(function(v, i) {
        var obj = is.obj(v) && !is.pth(v) ? v : { value: v };
        if (is.und(obj.delay)) {
          obj.delay = !i ? tweenSettings.delay : 0;
        }
        if (is.und(obj.endDelay)) {
          obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0;
        }
        return obj;
      }).map(function(k) {
        return mergeObjects(k, settings);
      });
    }
    __name(normalizePropertyTweens, "normalizePropertyTweens");
    function flattenKeyframes(keyframes) {
      var propertyNames = filterArray(flattenArray(keyframes.map(function(key) {
        return Object.keys(key);
      })), function(p) {
        return is.key(p);
      }).reduce(function(a, b) {
        if (a.indexOf(b) < 0) {
          a.push(b);
        }
        return a;
      }, []);
      var properties = {};
      var loop = /* @__PURE__ */ __name(function(i2) {
        var propName = propertyNames[i2];
        properties[propName] = keyframes.map(function(key) {
          var newKey = {};
          for (var p in key) {
            if (is.key(p)) {
              if (p == propName) {
                newKey.value = key[p];
              }
            } else {
              newKey[p] = key[p];
            }
          }
          return newKey;
        });
      }, "loop");
      for (var i = 0; i < propertyNames.length; i++)
        loop(i);
      return properties;
    }
    __name(flattenKeyframes, "flattenKeyframes");
    function getProperties(tweenSettings, params) {
      var properties = [];
      var keyframes = params.keyframes;
      if (keyframes) {
        params = mergeObjects(flattenKeyframes(keyframes), params);
      }
      for (var p in params) {
        if (is.key(p)) {
          properties.push({
            name: p,
            tweens: normalizePropertyTweens(params[p], tweenSettings)
          });
        }
      }
      return properties;
    }
    __name(getProperties, "getProperties");
    function normalizeTweenValues(tween, animatable) {
      var t = {};
      for (var p in tween) {
        var value = getFunctionValue(tween[p], animatable);
        if (is.arr(value)) {
          value = value.map(function(v) {
            return getFunctionValue(v, animatable);
          });
          if (value.length === 1) {
            value = value[0];
          }
        }
        t[p] = value;
      }
      t.duration = parseFloat(t.duration);
      t.delay = parseFloat(t.delay);
      return t;
    }
    __name(normalizeTweenValues, "normalizeTweenValues");
    function normalizeTweens(prop, animatable) {
      var previousTween;
      return prop.tweens.map(function(t) {
        var tween = normalizeTweenValues(t, animatable);
        var tweenValue = tween.value;
        var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
        var toUnit = getUnit(to);
        var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
        var previousValue = previousTween ? previousTween.to.original : originalValue;
        var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
        var fromUnit = getUnit(from) || getUnit(originalValue);
        var unit = toUnit || fromUnit;
        if (is.und(to)) {
          to = previousValue;
        }
        tween.from = decomposeValue(from, unit);
        tween.to = decomposeValue(getRelativeValue(to, from), unit);
        tween.start = previousTween ? previousTween.end : 0;
        tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
        tween.easing = parseEasings(tween.easing, tween.duration);
        tween.isPath = is.pth(tweenValue);
        tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
        tween.isColor = is.col(tween.from.original);
        if (tween.isColor) {
          tween.round = 1;
        }
        previousTween = tween;
        return tween;
      });
    }
    __name(normalizeTweens, "normalizeTweens");
    var setProgressValue = {
      css: function(t, p, v) {
        return t.style[p] = v;
      },
      attribute: function(t, p, v) {
        return t.setAttribute(p, v);
      },
      object: function(t, p, v) {
        return t[p] = v;
      },
      transform: function(t, p, v, transforms, manual) {
        transforms.list.set(p, v);
        if (p === transforms.last || manual) {
          var str = "";
          transforms.list.forEach(function(value, prop) {
            str += prop + "(" + value + ") ";
          });
          t.style.transform = str;
        }
      }
    };
    function setTargetsValue(targets, properties) {
      var animatables = getAnimatables(targets);
      animatables.forEach(function(animatable) {
        for (var property in properties) {
          var value = getFunctionValue(properties[property], animatable);
          var target = animatable.target;
          var valueUnit = getUnit(value);
          var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
          var unit = valueUnit || getUnit(originalValue);
          var to = getRelativeValue(validateValue(value, unit), originalValue);
          var animType = getAnimationType(target, property);
          setProgressValue[animType](target, property, to, animatable.transforms, true);
        }
      });
    }
    __name(setTargetsValue, "setTargetsValue");
    function createAnimation(animatable, prop) {
      var animType = getAnimationType(animatable.target, prop.name);
      if (animType) {
        var tweens = normalizeTweens(prop, animatable);
        var lastTween = tweens[tweens.length - 1];
        return {
          type: animType,
          property: prop.name,
          animatable,
          tweens,
          duration: lastTween.end,
          delay: tweens[0].delay,
          endDelay: lastTween.endDelay
        };
      }
    }
    __name(createAnimation, "createAnimation");
    function getAnimations(animatables, properties) {
      return filterArray(flattenArray(animatables.map(function(animatable) {
        return properties.map(function(prop) {
          return createAnimation(animatable, prop);
        });
      })), function(a) {
        return !is.und(a);
      });
    }
    __name(getAnimations, "getAnimations");
    function getInstanceTimings(animations, tweenSettings) {
      var animLength = animations.length;
      var getTlOffset = /* @__PURE__ */ __name(function(anim) {
        return anim.timelineOffset ? anim.timelineOffset : 0;
      }, "getTlOffset");
      var timings = {};
      timings.duration = animLength ? Math.max.apply(Math, animations.map(function(anim) {
        return getTlOffset(anim) + anim.duration;
      })) : tweenSettings.duration;
      timings.delay = animLength ? Math.min.apply(Math, animations.map(function(anim) {
        return getTlOffset(anim) + anim.delay;
      })) : tweenSettings.delay;
      timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function(anim) {
        return getTlOffset(anim) + anim.duration - anim.endDelay;
      })) : tweenSettings.endDelay;
      return timings;
    }
    __name(getInstanceTimings, "getInstanceTimings");
    var instanceID = 0;
    function createNewInstance(params) {
      var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
      var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
      var properties = getProperties(tweenSettings, params);
      var animatables = getAnimatables(params.targets);
      var animations = getAnimations(animatables, properties);
      var timings = getInstanceTimings(animations, tweenSettings);
      var id = instanceID;
      instanceID++;
      return mergeObjects(instanceSettings, {
        id,
        children: [],
        animatables,
        animations,
        duration: timings.duration,
        delay: timings.delay,
        endDelay: timings.endDelay
      });
    }
    __name(createNewInstance, "createNewInstance");
    var activeInstances = [];
    var engine = function() {
      var raf;
      function play() {
        if (!raf && (!isDocumentHidden() || !anime3.suspendWhenDocumentHidden) && activeInstances.length > 0) {
          raf = requestAnimationFrame(step);
        }
      }
      __name(play, "play");
      function step(t) {
        var activeInstancesLength = activeInstances.length;
        var i = 0;
        while (i < activeInstancesLength) {
          var activeInstance = activeInstances[i];
          if (!activeInstance.paused) {
            activeInstance.tick(t);
            i++;
          } else {
            activeInstances.splice(i, 1);
            activeInstancesLength--;
          }
        }
        raf = i > 0 ? requestAnimationFrame(step) : void 0;
      }
      __name(step, "step");
      function handleVisibilityChange() {
        if (!anime3.suspendWhenDocumentHidden) {
          return;
        }
        if (isDocumentHidden()) {
          raf = cancelAnimationFrame(raf);
        } else {
          activeInstances.forEach(
            function(instance) {
              return instance._onDocumentVisibility();
            }
          );
          engine();
        }
      }
      __name(handleVisibilityChange, "handleVisibilityChange");
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", handleVisibilityChange);
      }
      return play;
    }();
    function isDocumentHidden() {
      return !!document && document.hidden;
    }
    __name(isDocumentHidden, "isDocumentHidden");
    function anime3(params) {
      if (params === void 0)
        params = {};
      var startTime = 0, lastTime = 0, now = 0;
      var children, childrenLength = 0;
      var resolve = null;
      function makePromise(instance2) {
        var promise2 = window.Promise && new Promise(function(_resolve) {
          return resolve = _resolve;
        });
        instance2.finished = promise2;
        return promise2;
      }
      __name(makePromise, "makePromise");
      var instance = createNewInstance(params);
      var promise = makePromise(instance);
      function toggleInstanceDirection() {
        var direction = instance.direction;
        if (direction !== "alternate") {
          instance.direction = direction !== "normal" ? "normal" : "reverse";
        }
        instance.reversed = !instance.reversed;
        children.forEach(function(child) {
          return child.reversed = instance.reversed;
        });
      }
      __name(toggleInstanceDirection, "toggleInstanceDirection");
      function adjustTime(time) {
        return instance.reversed ? instance.duration - time : time;
      }
      __name(adjustTime, "adjustTime");
      function resetTime() {
        startTime = 0;
        lastTime = adjustTime(instance.currentTime) * (1 / anime3.speed);
      }
      __name(resetTime, "resetTime");
      function seekChild(time, child) {
        if (child) {
          child.seek(time - child.timelineOffset);
        }
      }
      __name(seekChild, "seekChild");
      function syncInstanceChildren(time) {
        if (!instance.reversePlayback) {
          for (var i = 0; i < childrenLength; i++) {
            seekChild(time, children[i]);
          }
        } else {
          for (var i$1 = childrenLength; i$1--; ) {
            seekChild(time, children[i$1]);
          }
        }
      }
      __name(syncInstanceChildren, "syncInstanceChildren");
      function setAnimationsProgress(insTime) {
        var i = 0;
        var animations = instance.animations;
        var animationsLength = animations.length;
        while (i < animationsLength) {
          var anim = animations[i];
          var animatable = anim.animatable;
          var tweens = anim.tweens;
          var tweenLength = tweens.length - 1;
          var tween = tweens[tweenLength];
          if (tweenLength) {
            tween = filterArray(tweens, function(t) {
              return insTime < t.end;
            })[0] || tween;
          }
          var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
          var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
          var strings = tween.to.strings;
          var round = tween.round;
          var numbers = [];
          var toNumbersLength = tween.to.numbers.length;
          var progress = void 0;
          for (var n = 0; n < toNumbersLength; n++) {
            var value = void 0;
            var toNumber = tween.to.numbers[n];
            var fromNumber = tween.from.numbers[n] || 0;
            if (!tween.isPath) {
              value = fromNumber + eased * (toNumber - fromNumber);
            } else {
              value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
            }
            if (round) {
              if (!(tween.isColor && n > 2)) {
                value = Math.round(value * round) / round;
              }
            }
            numbers.push(value);
          }
          var stringsLength = strings.length;
          if (!stringsLength) {
            progress = numbers[0];
          } else {
            progress = strings[0];
            for (var s = 0; s < stringsLength; s++) {
              var a = strings[s];
              var b = strings[s + 1];
              var n$1 = numbers[s];
              if (!isNaN(n$1)) {
                if (!b) {
                  progress += n$1 + " ";
                } else {
                  progress += n$1 + b;
                }
              }
            }
          }
          setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
          anim.currentValue = progress;
          i++;
        }
      }
      __name(setAnimationsProgress, "setAnimationsProgress");
      function setCallback(cb) {
        if (instance[cb] && !instance.passThrough) {
          instance[cb](instance);
        }
      }
      __name(setCallback, "setCallback");
      function countIteration() {
        if (instance.remaining && instance.remaining !== true) {
          instance.remaining--;
        }
      }
      __name(countIteration, "countIteration");
      function setInstanceProgress(engineTime) {
        var insDuration = instance.duration;
        var insDelay = instance.delay;
        var insEndDelay = insDuration - instance.endDelay;
        var insTime = adjustTime(engineTime);
        instance.progress = minMax(insTime / insDuration * 100, 0, 100);
        instance.reversePlayback = insTime < instance.currentTime;
        if (children) {
          syncInstanceChildren(insTime);
        }
        if (!instance.began && instance.currentTime > 0) {
          instance.began = true;
          setCallback("begin");
        }
        if (!instance.loopBegan && instance.currentTime > 0) {
          instance.loopBegan = true;
          setCallback("loopBegin");
        }
        if (insTime <= insDelay && instance.currentTime !== 0) {
          setAnimationsProgress(0);
        }
        if (insTime >= insEndDelay && instance.currentTime !== insDuration || !insDuration) {
          setAnimationsProgress(insDuration);
        }
        if (insTime > insDelay && insTime < insEndDelay) {
          if (!instance.changeBegan) {
            instance.changeBegan = true;
            instance.changeCompleted = false;
            setCallback("changeBegin");
          }
          setCallback("change");
          setAnimationsProgress(insTime);
        } else {
          if (instance.changeBegan) {
            instance.changeCompleted = true;
            instance.changeBegan = false;
            setCallback("changeComplete");
          }
        }
        instance.currentTime = minMax(insTime, 0, insDuration);
        if (instance.began) {
          setCallback("update");
        }
        if (engineTime >= insDuration) {
          lastTime = 0;
          countIteration();
          if (!instance.remaining) {
            instance.paused = true;
            if (!instance.completed) {
              instance.completed = true;
              setCallback("loopComplete");
              setCallback("complete");
              if (!instance.passThrough && "Promise" in window) {
                resolve();
                promise = makePromise(instance);
              }
            }
          } else {
            startTime = now;
            setCallback("loopComplete");
            instance.loopBegan = false;
            if (instance.direction === "alternate") {
              toggleInstanceDirection();
            }
          }
        }
      }
      __name(setInstanceProgress, "setInstanceProgress");
      instance.reset = function() {
        var direction = instance.direction;
        instance.passThrough = false;
        instance.currentTime = 0;
        instance.progress = 0;
        instance.paused = true;
        instance.began = false;
        instance.loopBegan = false;
        instance.changeBegan = false;
        instance.completed = false;
        instance.changeCompleted = false;
        instance.reversePlayback = false;
        instance.reversed = direction === "reverse";
        instance.remaining = instance.loop;
        children = instance.children;
        childrenLength = children.length;
        for (var i = childrenLength; i--; ) {
          instance.children[i].reset();
        }
        if (instance.reversed && instance.loop !== true || direction === "alternate" && instance.loop === 1) {
          instance.remaining++;
        }
        setAnimationsProgress(instance.reversed ? instance.duration : 0);
      };
      instance._onDocumentVisibility = resetTime;
      instance.set = function(targets, properties) {
        setTargetsValue(targets, properties);
        return instance;
      };
      instance.tick = function(t) {
        now = t;
        if (!startTime) {
          startTime = now;
        }
        setInstanceProgress((now + (lastTime - startTime)) * anime3.speed);
      };
      instance.seek = function(time) {
        setInstanceProgress(adjustTime(time));
      };
      instance.pause = function() {
        instance.paused = true;
        resetTime();
      };
      instance.play = function() {
        if (!instance.paused) {
          return;
        }
        if (instance.completed) {
          instance.reset();
        }
        instance.paused = false;
        activeInstances.push(instance);
        resetTime();
        engine();
      };
      instance.reverse = function() {
        toggleInstanceDirection();
        instance.completed = instance.reversed ? false : true;
        resetTime();
      };
      instance.restart = function() {
        instance.reset();
        instance.play();
      };
      instance.remove = function(targets) {
        var targetsArray = parseTargets(targets);
        removeTargetsFromInstance(targetsArray, instance);
      };
      instance.reset();
      if (instance.autoplay) {
        instance.play();
      }
      return instance;
    }
    __name(anime3, "anime");
    function removeTargetsFromAnimations(targetsArray, animations) {
      for (var a = animations.length; a--; ) {
        if (arrayContains(targetsArray, animations[a].animatable.target)) {
          animations.splice(a, 1);
        }
      }
    }
    __name(removeTargetsFromAnimations, "removeTargetsFromAnimations");
    function removeTargetsFromInstance(targetsArray, instance) {
      var animations = instance.animations;
      var children = instance.children;
      removeTargetsFromAnimations(targetsArray, animations);
      for (var c = children.length; c--; ) {
        var child = children[c];
        var childAnimations = child.animations;
        removeTargetsFromAnimations(targetsArray, childAnimations);
        if (!childAnimations.length && !child.children.length) {
          children.splice(c, 1);
        }
      }
      if (!animations.length && !children.length) {
        instance.pause();
      }
    }
    __name(removeTargetsFromInstance, "removeTargetsFromInstance");
    function removeTargetsFromActiveInstances(targets) {
      var targetsArray = parseTargets(targets);
      for (var i = activeInstances.length; i--; ) {
        var instance = activeInstances[i];
        removeTargetsFromInstance(targetsArray, instance);
      }
    }
    __name(removeTargetsFromActiveInstances, "removeTargetsFromActiveInstances");
    function stagger(val, params) {
      if (params === void 0)
        params = {};
      var direction = params.direction || "normal";
      var easing = params.easing ? parseEasings(params.easing) : null;
      var grid = params.grid;
      var axis = params.axis;
      var fromIndex = params.from || 0;
      var fromFirst = fromIndex === "first";
      var fromCenter = fromIndex === "center";
      var fromLast = fromIndex === "last";
      var isRange = is.arr(val);
      var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
      var val2 = isRange ? parseFloat(val[1]) : 0;
      var unit = getUnit(isRange ? val[1] : val) || 0;
      var start = params.start || 0 + (isRange ? val1 : 0);
      var values = [];
      var maxValue = 0;
      return function(el, i, t) {
        if (fromFirst) {
          fromIndex = 0;
        }
        if (fromCenter) {
          fromIndex = (t - 1) / 2;
        }
        if (fromLast) {
          fromIndex = t - 1;
        }
        if (!values.length) {
          for (var index = 0; index < t; index++) {
            if (!grid) {
              values.push(Math.abs(fromIndex - index));
            } else {
              var fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
              var fromY = !fromCenter ? Math.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
              var toX = index % grid[0];
              var toY = Math.floor(index / grid[0]);
              var distanceX = fromX - toX;
              var distanceY = fromY - toY;
              var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
              if (axis === "x") {
                value = -distanceX;
              }
              if (axis === "y") {
                value = -distanceY;
              }
              values.push(value);
            }
            maxValue = Math.max.apply(Math, values);
          }
          if (easing) {
            values = values.map(function(val3) {
              return easing(val3 / maxValue) * maxValue;
            });
          }
          if (direction === "reverse") {
            values = values.map(function(val3) {
              return axis ? val3 < 0 ? val3 * -1 : -val3 : Math.abs(maxValue - val3);
            });
          }
        }
        var spacing = isRange ? (val2 - val1) / maxValue : val1;
        return start + spacing * (Math.round(values[i] * 100) / 100) + unit;
      };
    }
    __name(stagger, "stagger");
    function timeline(params) {
      if (params === void 0)
        params = {};
      var tl = anime3(params);
      tl.duration = 0;
      tl.add = function(instanceParams, timelineOffset) {
        var tlIndex = activeInstances.indexOf(tl);
        var children = tl.children;
        if (tlIndex > -1) {
          activeInstances.splice(tlIndex, 1);
        }
        function passThrough(ins2) {
          ins2.passThrough = true;
        }
        __name(passThrough, "passThrough");
        for (var i = 0; i < children.length; i++) {
          passThrough(children[i]);
        }
        var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
        insParams.targets = insParams.targets || params.targets;
        var tlDuration = tl.duration;
        insParams.autoplay = false;
        insParams.direction = tl.direction;
        insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
        passThrough(tl);
        tl.seek(insParams.timelineOffset);
        var ins = anime3(insParams);
        passThrough(ins);
        children.push(ins);
        var timings = getInstanceTimings(children, params);
        tl.delay = timings.delay;
        tl.endDelay = timings.endDelay;
        tl.duration = timings.duration;
        tl.seek(0);
        tl.reset();
        if (tl.autoplay) {
          tl.play();
        }
        return tl;
      };
      return tl;
    }
    __name(timeline, "timeline");
    anime3.version = "3.2.1";
    anime3.speed = 1;
    anime3.suspendWhenDocumentHidden = true;
    anime3.running = activeInstances;
    anime3.remove = removeTargetsFromActiveInstances;
    anime3.get = getOriginalTargetValue;
    anime3.set = setTargetsValue;
    anime3.convertPx = convertPxToUnit;
    anime3.path = getPath;
    anime3.setDashoffset = setDashoffset;
    anime3.stagger = stagger;
    anime3.timeline = timeline;
    anime3.easing = parseEasings;
    anime3.penner = penner;
    anime3.random = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    module2.exports = anime3;
  }
});

// node_modules/svg-path-parser/parser.js
var require_parser = __commonJS({
  "node_modules/svg-path-parser/parser.js"(exports, module2) {
    "use strict";
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      __name(ctor, "ctor");
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    __name(peg$subclass, "peg$subclass");
    function peg$SyntaxError(message, expected, found, location2) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location2;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    __name(peg$SyntaxError, "peg$SyntaxError");
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function(expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        "class": function(expectation) {
          var escapedParts = "", i;
          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
          }
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function(expectation) {
          return "any character";
        },
        end: function(expectation) {
          return "end of input";
        },
        other: function(expectation) {
          return expectation.description;
        }
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      __name(hex, "hex");
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      __name(literalEscape, "literalEscape");
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      __name(classEscape, "classEscape");
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      __name(describeExpectation, "describeExpectation");
      function describeExpected(expected2) {
        var descriptions = new Array(expected2.length), i, j;
        for (i = 0; i < expected2.length; i++) {
          descriptions[i] = describeExpectation(expected2[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      __name(describeExpected, "describeExpected");
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      __name(describeFound, "describeFound");
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {}, peg$startRuleFunctions = { svg_path: peg$parsesvg_path }, peg$startRuleFunction = peg$parsesvg_path, peg$c0 = /* @__PURE__ */ __name(function(data) {
        if (!data)
          return [];
        for (var cmds2 = [], i = 0; i < data.length; i++)
          cmds2 = cmds2.concat.apply(cmds2, data[i]);
        var first = cmds2[0];
        if (first && first.code == "m") {
          delete first.relative;
          first.code = "M";
        }
        return cmds2;
      }, "peg$c0"), peg$c1 = /* @__PURE__ */ __name(function(first, more) {
        return merge(first, more);
      }, "peg$c1"), peg$c2 = /^[Mm]/, peg$c3 = peg$classExpectation(["M", "m"], false, false), peg$c4 = /* @__PURE__ */ __name(function(c, first, more) {
        var move = commands(c, [first]);
        if (more)
          move = move.concat(commands(c == "M" ? "L" : "l", more[1]));
        return move;
      }, "peg$c4"), peg$c5 = /^[Zz]/, peg$c6 = peg$classExpectation(["Z", "z"], false, false), peg$c7 = /* @__PURE__ */ __name(function() {
        return commands("Z");
      }, "peg$c7"), peg$c8 = /^[Ll]/, peg$c9 = peg$classExpectation(["L", "l"], false, false), peg$c10 = /* @__PURE__ */ __name(function(c, args) {
        return commands(c, args);
      }, "peg$c10"), peg$c11 = /^[Hh]/, peg$c12 = peg$classExpectation(["H", "h"], false, false), peg$c13 = /* @__PURE__ */ __name(function(c, args) {
        return commands(c, args.map(function(x) {
          return { x };
        }));
      }, "peg$c13"), peg$c14 = /^[Vv]/, peg$c15 = peg$classExpectation(["V", "v"], false, false), peg$c16 = /* @__PURE__ */ __name(function(c, args) {
        return commands(c, args.map(function(y) {
          return { y };
        }));
      }, "peg$c16"), peg$c17 = /^[Cc]/, peg$c18 = peg$classExpectation(["C", "c"], false, false), peg$c19 = /* @__PURE__ */ __name(function(a, b, c) {
        return { x1: a.x, y1: a.y, x2: b.x, y2: b.y, x: c.x, y: c.y };
      }, "peg$c19"), peg$c20 = /^[Ss]/, peg$c21 = peg$classExpectation(["S", "s"], false, false), peg$c22 = /* @__PURE__ */ __name(function(b, c) {
        return { x2: b.x, y2: b.y, x: c.x, y: c.y };
      }, "peg$c22"), peg$c23 = /^[Qq]/, peg$c24 = peg$classExpectation(["Q", "q"], false, false), peg$c25 = /* @__PURE__ */ __name(function(a, b) {
        return { x1: a.x, y1: a.y, x: b.x, y: b.y };
      }, "peg$c25"), peg$c26 = /^[Tt]/, peg$c27 = peg$classExpectation(["T", "t"], false, false), peg$c28 = /^[Aa]/, peg$c29 = peg$classExpectation(["A", "a"], false, false), peg$c30 = /* @__PURE__ */ __name(function(rx, ry, xrot, large, sweep, xy) {
        return { rx, ry, xAxisRotation: xrot, largeArc: large, sweep, x: xy.x, y: xy.y };
      }, "peg$c30"), peg$c31 = /* @__PURE__ */ __name(function(x, y) {
        return { x, y };
      }, "peg$c31"), peg$c32 = /* @__PURE__ */ __name(function(n) {
        return n * 1;
      }, "peg$c32"), peg$c33 = /* @__PURE__ */ __name(function(parts) {
        return parts.join("") * 1;
      }, "peg$c33"), peg$c34 = /^[01]/, peg$c35 = peg$classExpectation(["0", "1"], false, false), peg$c36 = /* @__PURE__ */ __name(function(bit) {
        return bit == "1";
      }, "peg$c36"), peg$c37 = /* @__PURE__ */ __name(function() {
        return "";
      }, "peg$c37"), peg$c38 = ",", peg$c39 = peg$literalExpectation(",", false), peg$c40 = /* @__PURE__ */ __name(function(parts) {
        return parts.join("");
      }, "peg$c40"), peg$c41 = ".", peg$c42 = peg$literalExpectation(".", false), peg$c43 = /^[eE]/, peg$c44 = peg$classExpectation(["e", "E"], false, false), peg$c45 = /^[+\-]/, peg$c46 = peg$classExpectation(["+", "-"], false, false), peg$c47 = /^[0-9]/, peg$c48 = peg$classExpectation([["0", "9"]], false, false), peg$c49 = /* @__PURE__ */ __name(function(digits) {
        return digits.join("");
      }, "peg$c49"), peg$c50 = /^[ \t\n\r]/, peg$c51 = peg$classExpectation([" ", "	", "\n", "\r"], false, false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      __name(text, "text");
      function location2() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      __name(location2, "location");
      function expected(description, location3) {
        location3 = location3 !== void 0 ? location3 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError(
          [peg$otherExpectation(description)],
          input.substring(peg$savedPos, peg$currPos),
          location3
        );
      }
      __name(expected, "expected");
      function error(message, location3) {
        location3 = location3 !== void 0 ? location3 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location3);
      }
      __name(error, "error");
      function peg$literalExpectation(text2, ignoreCase) {
        return { type: "literal", text: text2, ignoreCase };
      }
      __name(peg$literalExpectation, "peg$literalExpectation");
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      __name(peg$classExpectation, "peg$classExpectation");
      function peg$anyExpectation() {
        return { type: "any" };
      }
      __name(peg$anyExpectation, "peg$anyExpectation");
      function peg$endExpectation() {
        return { type: "end" };
      }
      __name(peg$endExpectation, "peg$endExpectation");
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      __name(peg$otherExpectation, "peg$otherExpectation");
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      __name(peg$computePosDetails, "peg$computePosDetails");
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      __name(peg$computeLocation, "peg$computeLocation");
      function peg$fail(expected2) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected2);
      }
      __name(peg$fail, "peg$fail");
      function peg$buildSimpleError(message, location3) {
        return new peg$SyntaxError(message, null, null, location3);
      }
      __name(peg$buildSimpleError, "peg$buildSimpleError");
      function peg$buildStructuredError(expected2, found, location3) {
        return new peg$SyntaxError(
          peg$SyntaxError.buildMessage(expected2, found),
          expected2,
          found,
          location3
        );
      }
      __name(peg$buildStructuredError, "peg$buildStructuredError");
      function peg$parsesvg_path() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewsp();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsewsp();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsemoveTo_drawTo_commandGroups();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewsp();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewsp();
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c0(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesvg_path, "peg$parsesvg_path");
      function peg$parsemoveTo_drawTo_commandGroups() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsemoveTo_drawTo_commandGroup();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsemoveTo_drawTo_commandGroup();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsemoveTo_drawTo_commandGroup();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsemoveTo_drawTo_commandGroups, "peg$parsemoveTo_drawTo_commandGroups");
      function peg$parsemoveTo_drawTo_commandGroup() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsemoveto();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = [];
          s5 = peg$parsewsp();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsewsp();
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsedrawto_command();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = [];
            s5 = peg$parsewsp();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsewsp();
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsedrawto_command();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsemoveTo_drawTo_commandGroup, "peg$parsemoveTo_drawTo_commandGroup");
      function peg$parsedrawto_command() {
        var s0;
        s0 = peg$parseclosepath();
        if (s0 === peg$FAILED) {
          s0 = peg$parselineto();
          if (s0 === peg$FAILED) {
            s0 = peg$parsehorizontal_lineto();
            if (s0 === peg$FAILED) {
              s0 = peg$parsevertical_lineto();
              if (s0 === peg$FAILED) {
                s0 = peg$parsecurveto();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsesmooth_curveto();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsequadratic_bezier_curveto();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsesmooth_quadratic_bezier_curveto();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseelliptical_arc();
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      __name(peg$parsedrawto_command, "peg$parsedrawto_command");
      function peg$parsemoveto() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (peg$c2.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c3);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              s4 = peg$currPos;
              s5 = peg$parsecomma_wsp();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parselineto_argument_sequence();
                if (s6 !== peg$FAILED) {
                  s5 = [s5, s6];
                  s4 = s5;
                } else {
                  peg$currPos = s4;
                  s4 = peg$FAILED;
                }
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c4(s1, s3, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsemoveto, "peg$parsemoveto");
      function peg$parseclosepath() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c5.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c7();
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parseclosepath, "peg$parseclosepath");
      function peg$parselineto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c8.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c9);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parselineto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parselineto, "peg$parselineto");
      function peg$parselineto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecoordinate_pair();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parselineto_argument_sequence, "peg$parselineto_argument_sequence");
      function peg$parsehorizontal_lineto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c11.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c12);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c13(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsehorizontal_lineto, "peg$parsehorizontal_lineto");
      function peg$parsecoordinate_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsenumber();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsenumber();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecoordinate_sequence, "peg$parsecoordinate_sequence");
      function peg$parsevertical_lineto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c14.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c15);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c16(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsevertical_lineto, "peg$parsevertical_lineto");
      function peg$parsecurveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c17.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c18);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecurveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecurveto, "peg$parsecurveto");
      function peg$parsecurveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecurveto_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecurveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecurveto_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecurveto_argument_sequence, "peg$parsecurveto_argument_sequence");
      function peg$parsecurveto_argument() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsecomma_wsp();
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecoordinate_pair();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c19(s1, s3, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecurveto_argument, "peg$parsecurveto_argument");
      function peg$parsesmooth_curveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c20.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c21);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesmooth_curveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_curveto, "peg$parsesmooth_curveto");
      function peg$parsesmooth_curveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsesmooth_curveto_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsesmooth_curveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsesmooth_curveto_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_curveto_argument_sequence, "peg$parsesmooth_curveto_argument_sequence");
      function peg$parsesmooth_curveto_argument() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c22(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_curveto_argument, "peg$parsesmooth_curveto_argument");
      function peg$parsequadratic_bezier_curveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c23.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsequadratic_bezier_curveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsequadratic_bezier_curveto, "peg$parsequadratic_bezier_curveto");
      function peg$parsequadratic_bezier_curveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsequadratic_bezier_curveto_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsequadratic_bezier_curveto_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsequadratic_bezier_curveto_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsequadratic_bezier_curveto_argument_sequence, "peg$parsequadratic_bezier_curveto_argument_sequence");
      function peg$parsequadratic_bezier_curveto_argument() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsecoordinate_pair();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c25(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsequadratic_bezier_curveto_argument, "peg$parsequadratic_bezier_curveto_argument");
      function peg$parsesmooth_quadratic_bezier_curveto() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c26.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesmooth_quadratic_bezier_curveto_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_quadratic_bezier_curveto, "peg$parsesmooth_quadratic_bezier_curveto");
      function peg$parsesmooth_quadratic_bezier_curveto_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsecoordinate_pair();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parsecoordinate_pair();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parsecoordinate_pair();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsesmooth_quadratic_bezier_curveto_argument_sequence, "peg$parsesmooth_quadratic_bezier_curveto_argument_sequence");
      function peg$parseelliptical_arc() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (peg$c28.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parsewsp();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsewsp();
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseelliptical_arc_argument_sequence();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c10(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parseelliptical_arc, "peg$parseelliptical_arc");
      function peg$parseelliptical_arc_argument_sequence() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parseelliptical_arc_argument();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parsecomma_wsp();
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseelliptical_arc_argument();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parsecomma_wsp();
            if (s4 === peg$FAILED) {
              s4 = null;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseelliptical_arc_argument();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c1(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parseelliptical_arc_argument_sequence, "peg$parseelliptical_arc_argument_sequence");
      function peg$parseelliptical_arc_argument() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        s1 = peg$parsenonnegative_number();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenonnegative_number();
            if (s3 !== peg$FAILED) {
              s4 = peg$parsecomma_wsp();
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsecomma_wsp();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseflag();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parsecomma_wsp();
                      if (s8 === peg$FAILED) {
                        s8 = null;
                      }
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseflag();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsecomma_wsp();
                          if (s10 === peg$FAILED) {
                            s10 = null;
                          }
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsecoordinate_pair();
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c30(s1, s3, s5, s7, s9, s11);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parseelliptical_arc_argument, "peg$parseelliptical_arc_argument");
      function peg$parsecoordinate_pair() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma_wsp();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c31(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      __name(peg$parsecoordinate_pair, "peg$parsecoordinate_pair");
      function peg$parsenonnegative_number() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsefloating_point_constant();
        if (s1 === peg$FAILED) {
          s1 = peg$parsedigit_sequence();
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c32(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsenonnegative_number, "peg$parsenonnegative_number");
      function peg$parsenumber() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsesign();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsefloating_point_constant();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parsesign();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsedigit_sequence();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c33(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsenumber, "peg$parsenumber");
      function peg$parseflag() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c34.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c35);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c36(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parseflag, "peg$parseflag");
      function peg$parsecomma_wsp() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parsewsp();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parsewsp();
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsecomma();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewsp();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewsp();
            }
            if (s3 !== peg$FAILED) {
              s1 = [s1, s2, s3];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$currPos;
          s2 = peg$parsecomma();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsewsp();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsewsp();
            }
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37();
          }
          s0 = s1;
        }
        return s0;
      }
      __name(peg$parsecomma_wsp, "peg$parsecomma_wsp");
      function peg$parsecomma() {
        var s0;
        if (input.charCodeAt(peg$currPos) === 44) {
          s0 = peg$c38;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c39);
          }
        }
        return s0;
      }
      __name(peg$parsecomma, "peg$parsecomma");
      function peg$parsefloating_point_constant() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsefractional_constant();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseexponent();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parsedigit_sequence();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseexponent();
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsefloating_point_constant, "peg$parsefloating_point_constant");
      function peg$parsefractional_constant() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$parsedigit_sequence();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c41;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c42);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedigit_sequence();
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 === peg$FAILED) {
          s1 = peg$currPos;
          s2 = peg$parsedigit_sequence();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s3 = peg$c41;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c42);
              }
            }
            if (s3 !== peg$FAILED) {
              s2 = [s2, s3];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsefractional_constant, "peg$parsefractional_constant");
      function peg$parseexponent() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (peg$c43.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parsesign();
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedigit_sequence();
            if (s4 !== peg$FAILED) {
              s2 = [s2, s3, s4];
              s1 = s2;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c40(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parseexponent, "peg$parseexponent");
      function peg$parsesign() {
        var s0;
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }
        return s0;
      }
      __name(peg$parsesign, "peg$parsesign");
      function peg$parsedigit_sequence() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c47.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c48);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c47.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c48);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c49(s1);
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsedigit_sequence, "peg$parsedigit_sequence");
      function peg$parsewsp() {
        var s0, s1;
        s0 = peg$currPos;
        if (peg$c50.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c51);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c37();
        }
        s0 = s1;
        return s0;
      }
      __name(peg$parsewsp, "peg$parsewsp");
      function merge(first, more) {
        if (!more)
          return [first];
        for (var a = [first], i = 0, l = more.length; i < l; i++)
          a[i + 1] = more[i][1];
        return a;
      }
      __name(merge, "merge");
      var cmds = { m: "moveto", l: "lineto", h: "horizontal lineto", v: "vertical lineto", c: "curveto", s: "smooth curveto", q: "quadratic curveto", t: "smooth quadratic curveto", a: "elliptical arc", z: "closepath" };
      for (var code in cmds)
        cmds[code.toUpperCase()] = cmds[code];
      function commands(code2, args) {
        if (!args)
          args = [{}];
        for (var i = args.length; i--; ) {
          var cmd = { code: code2, command: cmds[code2] };
          if (code2 == code2.toLowerCase())
            cmd.relative = true;
          for (var k in args[i])
            cmd[k] = args[i][k];
          args[i] = cmd;
        }
        return args;
      }
      __name(commands, "commands");
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
        );
      }
    }
    __name(peg$parse, "peg$parse");
    module2.exports = {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }
});

// node_modules/svg-path-parser/index.js
var require_svg_path_parser = __commonJS({
  "node_modules/svg-path-parser/index.js"(exports, module2) {
    var parserFunction = require_parser().parse;
    parserFunction.parseSVG = parserFunction;
    parserFunction.makeAbsolute = makeSVGPathCommandsAbsolute;
    module2.exports = parserFunction;
    function makeSVGPathCommandsAbsolute(commands) {
      var subpathStart, prevCmd = { x: 0, y: 0 };
      var attr = { x: "x0", y: "y0", x1: "x0", y1: "y0", x2: "x0", y2: "y0" };
      commands.forEach(function(cmd) {
        if (cmd.command === "moveto")
          subpathStart = cmd;
        cmd.x0 = prevCmd.x;
        cmd.y0 = prevCmd.y;
        for (var a in attr)
          if (a in cmd)
            cmd[a] += cmd.relative ? cmd[attr[a]] : 0;
        if (!("x" in cmd))
          cmd.x = prevCmd.x;
        if (!("y" in cmd))
          cmd.y = prevCmd.y;
        cmd.relative = false;
        cmd.code = cmd.code.toUpperCase();
        if (cmd.command == "closepath") {
          cmd.x = subpathStart.x;
          cmd.y = subpathStart.y;
        }
        prevCmd = cmd;
      });
      return commands;
    }
    __name(makeSVGPathCommandsAbsolute, "makeSVGPathCommandsAbsolute");
  }
});

// node_modules/lodash/lodash.js
var require_lodash = __commonJS({
  "node_modules/lodash/lodash.js"(exports, module2) {
    (function() {
      var undefined2;
      var VERSION = "4.17.21";
      var LARGE_ARRAY_SIZE = 200;
      var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var MAX_MEMOIZE_SIZE = 500;
      var PLACEHOLDER = "__lodash_placeholder__";
      var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
      var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
      var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
      var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
      var HOT_COUNT = 800, HOT_SPAN = 16;
      var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
      var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
      var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
      var wrapFlags = [
        ["ary", WRAP_ARY_FLAG],
        ["bind", WRAP_BIND_FLAG],
        ["bindKey", WRAP_BIND_KEY_FLAG],
        ["curry", WRAP_CURRY_FLAG],
        ["curryRight", WRAP_CURRY_RIGHT_FLAG],
        ["flip", WRAP_FLIP_FLAG],
        ["partial", WRAP_PARTIAL_FLAG],
        ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
        ["rearg", WRAP_REARG_FLAG]
      ];
      var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
      var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
      var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
      var reTrimStart = /^\s+/;
      var reWhitespace = /\s/;
      var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
      var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
      var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
      var reEscapeChar = /\\(\\)?/g;
      var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
      var reFlags = /\w*$/;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var reIsOctal = /^0o[0-7]+$/i;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
      var reNoMatch = /($^)/;
      var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
      var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
      var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
      var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
      var reApos = RegExp(rsApos, "g");
      var reComboMark = RegExp(rsCombo, "g");
      var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
      var reUnicodeWord = RegExp([
        rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
        rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
        rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
        rsUpper + "+" + rsOptContrUpper,
        rsOrdUpper,
        rsOrdLower,
        rsDigits,
        rsEmoji
      ].join("|"), "g");
      var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
      var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
      var contextProps = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout"
      ];
      var templateCounter = -1;
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      var cloneableTags = {};
      cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
      cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
      var deburredLetters = {
        // Latin-1 Supplement block.
        "\xC0": "A",
        "\xC1": "A",
        "\xC2": "A",
        "\xC3": "A",
        "\xC4": "A",
        "\xC5": "A",
        "\xE0": "a",
        "\xE1": "a",
        "\xE2": "a",
        "\xE3": "a",
        "\xE4": "a",
        "\xE5": "a",
        "\xC7": "C",
        "\xE7": "c",
        "\xD0": "D",
        "\xF0": "d",
        "\xC8": "E",
        "\xC9": "E",
        "\xCA": "E",
        "\xCB": "E",
        "\xE8": "e",
        "\xE9": "e",
        "\xEA": "e",
        "\xEB": "e",
        "\xCC": "I",
        "\xCD": "I",
        "\xCE": "I",
        "\xCF": "I",
        "\xEC": "i",
        "\xED": "i",
        "\xEE": "i",
        "\xEF": "i",
        "\xD1": "N",
        "\xF1": "n",
        "\xD2": "O",
        "\xD3": "O",
        "\xD4": "O",
        "\xD5": "O",
        "\xD6": "O",
        "\xD8": "O",
        "\xF2": "o",
        "\xF3": "o",
        "\xF4": "o",
        "\xF5": "o",
        "\xF6": "o",
        "\xF8": "o",
        "\xD9": "U",
        "\xDA": "U",
        "\xDB": "U",
        "\xDC": "U",
        "\xF9": "u",
        "\xFA": "u",
        "\xFB": "u",
        "\xFC": "u",
        "\xDD": "Y",
        "\xFD": "y",
        "\xFF": "y",
        "\xC6": "Ae",
        "\xE6": "ae",
        "\xDE": "Th",
        "\xFE": "th",
        "\xDF": "ss",
        // Latin Extended-A block.
        "\u0100": "A",
        "\u0102": "A",
        "\u0104": "A",
        "\u0101": "a",
        "\u0103": "a",
        "\u0105": "a",
        "\u0106": "C",
        "\u0108": "C",
        "\u010A": "C",
        "\u010C": "C",
        "\u0107": "c",
        "\u0109": "c",
        "\u010B": "c",
        "\u010D": "c",
        "\u010E": "D",
        "\u0110": "D",
        "\u010F": "d",
        "\u0111": "d",
        "\u0112": "E",
        "\u0114": "E",
        "\u0116": "E",
        "\u0118": "E",
        "\u011A": "E",
        "\u0113": "e",
        "\u0115": "e",
        "\u0117": "e",
        "\u0119": "e",
        "\u011B": "e",
        "\u011C": "G",
        "\u011E": "G",
        "\u0120": "G",
        "\u0122": "G",
        "\u011D": "g",
        "\u011F": "g",
        "\u0121": "g",
        "\u0123": "g",
        "\u0124": "H",
        "\u0126": "H",
        "\u0125": "h",
        "\u0127": "h",
        "\u0128": "I",
        "\u012A": "I",
        "\u012C": "I",
        "\u012E": "I",
        "\u0130": "I",
        "\u0129": "i",
        "\u012B": "i",
        "\u012D": "i",
        "\u012F": "i",
        "\u0131": "i",
        "\u0134": "J",
        "\u0135": "j",
        "\u0136": "K",
        "\u0137": "k",
        "\u0138": "k",
        "\u0139": "L",
        "\u013B": "L",
        "\u013D": "L",
        "\u013F": "L",
        "\u0141": "L",
        "\u013A": "l",
        "\u013C": "l",
        "\u013E": "l",
        "\u0140": "l",
        "\u0142": "l",
        "\u0143": "N",
        "\u0145": "N",
        "\u0147": "N",
        "\u014A": "N",
        "\u0144": "n",
        "\u0146": "n",
        "\u0148": "n",
        "\u014B": "n",
        "\u014C": "O",
        "\u014E": "O",
        "\u0150": "O",
        "\u014D": "o",
        "\u014F": "o",
        "\u0151": "o",
        "\u0154": "R",
        "\u0156": "R",
        "\u0158": "R",
        "\u0155": "r",
        "\u0157": "r",
        "\u0159": "r",
        "\u015A": "S",
        "\u015C": "S",
        "\u015E": "S",
        "\u0160": "S",
        "\u015B": "s",
        "\u015D": "s",
        "\u015F": "s",
        "\u0161": "s",
        "\u0162": "T",
        "\u0164": "T",
        "\u0166": "T",
        "\u0163": "t",
        "\u0165": "t",
        "\u0167": "t",
        "\u0168": "U",
        "\u016A": "U",
        "\u016C": "U",
        "\u016E": "U",
        "\u0170": "U",
        "\u0172": "U",
        "\u0169": "u",
        "\u016B": "u",
        "\u016D": "u",
        "\u016F": "u",
        "\u0171": "u",
        "\u0173": "u",
        "\u0174": "W",
        "\u0175": "w",
        "\u0176": "Y",
        "\u0177": "y",
        "\u0178": "Y",
        "\u0179": "Z",
        "\u017B": "Z",
        "\u017D": "Z",
        "\u017A": "z",
        "\u017C": "z",
        "\u017E": "z",
        "\u0132": "IJ",
        "\u0133": "ij",
        "\u0152": "Oe",
        "\u0153": "oe",
        "\u0149": "'n",
        "\u017F": "s"
      };
      var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      var htmlUnescapes = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'"
      };
      var stringEscapes = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };
      var freeParseFloat = parseFloat, freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module2 == "object" && module2 && !module2.nodeType && module2;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      __name(apply, "apply");
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          var value = array[index];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      __name(arrayAggregator, "arrayAggregator");
      function arrayEach(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (iteratee(array[index], index, array) === false) {
            break;
          }
        }
        return array;
      }
      __name(arrayEach, "arrayEach");
      function arrayEachRight(array, iteratee) {
        var length = array == null ? 0 : array.length;
        while (length--) {
          if (iteratee(array[length], length, array) === false) {
            break;
          }
        }
        return array;
      }
      __name(arrayEachRight, "arrayEachRight");
      function arrayEvery(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (!predicate(array[index], index, array)) {
            return false;
          }
        }
        return true;
      }
      __name(arrayEvery, "arrayEvery");
      function arrayFilter(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (predicate(value, index, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      __name(arrayFilter, "arrayFilter");
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      __name(arrayIncludes, "arrayIncludes");
      function arrayIncludesWith(array, value, comparator) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (comparator(value, array[index])) {
            return true;
          }
        }
        return false;
      }
      __name(arrayIncludesWith, "arrayIncludesWith");
      function arrayMap(array, iteratee) {
        var index = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index < length) {
          result[index] = iteratee(array[index], index, array);
        }
        return result;
      }
      __name(arrayMap, "arrayMap");
      function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
          array[offset + index] = values[index];
        }
        return array;
      }
      __name(arrayPush, "arrayPush");
      function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[++index];
        }
        while (++index < length) {
          accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
      }
      __name(arrayReduce, "arrayReduce");
      function arrayReduceRight(array, iteratee, accumulator, initAccum) {
        var length = array == null ? 0 : array.length;
        if (initAccum && length) {
          accumulator = array[--length];
        }
        while (length--) {
          accumulator = iteratee(accumulator, array[length], length, array);
        }
        return accumulator;
      }
      __name(arrayReduceRight, "arrayReduceRight");
      function arraySome(array, predicate) {
        var index = -1, length = array == null ? 0 : array.length;
        while (++index < length) {
          if (predicate(array[index], index, array)) {
            return true;
          }
        }
        return false;
      }
      __name(arraySome, "arraySome");
      var asciiSize = baseProperty("length");
      function asciiToArray(string) {
        return string.split("");
      }
      __name(asciiToArray, "asciiToArray");
      function asciiWords(string) {
        return string.match(reAsciiWord) || [];
      }
      __name(asciiWords, "asciiWords");
      function baseFindKey(collection, predicate, eachFunc) {
        var result;
        eachFunc(collection, function(value, key, collection2) {
          if (predicate(value, key, collection2)) {
            result = key;
            return false;
          }
        });
        return result;
      }
      __name(baseFindKey, "baseFindKey");
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index-- : ++index < length) {
          if (predicate(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }
      __name(baseFindIndex, "baseFindIndex");
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      __name(baseIndexOf, "baseIndexOf");
      function baseIndexOfWith(array, value, fromIndex, comparator) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (comparator(array[index], value)) {
            return index;
          }
        }
        return -1;
      }
      __name(baseIndexOfWith, "baseIndexOfWith");
      function baseIsNaN(value) {
        return value !== value;
      }
      __name(baseIsNaN, "baseIsNaN");
      function baseMean(array, iteratee) {
        var length = array == null ? 0 : array.length;
        return length ? baseSum(array, iteratee) / length : NAN;
      }
      __name(baseMean, "baseMean");
      function baseProperty(key) {
        return function(object) {
          return object == null ? undefined2 : object[key];
        };
      }
      __name(baseProperty, "baseProperty");
      function basePropertyOf(object) {
        return function(key) {
          return object == null ? undefined2 : object[key];
        };
      }
      __name(basePropertyOf, "basePropertyOf");
      function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
        eachFunc(collection, function(value, index, collection2) {
          accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
        });
        return accumulator;
      }
      __name(baseReduce, "baseReduce");
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      __name(baseSortBy, "baseSortBy");
      function baseSum(array, iteratee) {
        var result, index = -1, length = array.length;
        while (++index < length) {
          var current = iteratee(array[index]);
          if (current !== undefined2) {
            result = result === undefined2 ? current : result + current;
          }
        }
        return result;
      }
      __name(baseSum, "baseSum");
      function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
          result[index] = iteratee(index);
        }
        return result;
      }
      __name(baseTimes, "baseTimes");
      function baseToPairs(object, props) {
        return arrayMap(props, function(key) {
          return [key, object[key]];
        });
      }
      __name(baseToPairs, "baseToPairs");
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      __name(baseTrim, "baseTrim");
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      __name(baseUnary, "baseUnary");
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      __name(baseValues, "baseValues");
      function cacheHas(cache, key) {
        return cache.has(key);
      }
      __name(cacheHas, "cacheHas");
      function charsStartIndex(strSymbols, chrSymbols) {
        var index = -1, length = strSymbols.length;
        while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      __name(charsStartIndex, "charsStartIndex");
      function charsEndIndex(strSymbols, chrSymbols) {
        var index = strSymbols.length;
        while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        }
        return index;
      }
      __name(charsEndIndex, "charsEndIndex");
      function countHolders(array, placeholder) {
        var length = array.length, result = 0;
        while (length--) {
          if (array[length] === placeholder) {
            ++result;
          }
        }
        return result;
      }
      __name(countHolders, "countHolders");
      var deburrLetter = basePropertyOf(deburredLetters);
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      function escapeStringChar(chr) {
        return "\\" + stringEscapes[chr];
      }
      __name(escapeStringChar, "escapeStringChar");
      function getValue(object, key) {
        return object == null ? undefined2 : object[key];
      }
      __name(getValue, "getValue");
      function hasUnicode(string) {
        return reHasUnicode.test(string);
      }
      __name(hasUnicode, "hasUnicode");
      function hasUnicodeWord(string) {
        return reHasUnicodeWord.test(string);
      }
      __name(hasUnicodeWord, "hasUnicodeWord");
      function iteratorToArray(iterator) {
        var data, result = [];
        while (!(data = iterator.next()).done) {
          result.push(data.value);
        }
        return result;
      }
      __name(iteratorToArray, "iteratorToArray");
      function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function(value, key) {
          result[++index] = [key, value];
        });
        return result;
      }
      __name(mapToArray, "mapToArray");
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      __name(overArg, "overArg");
      function replaceHolders(array, placeholder) {
        var index = -1, length = array.length, resIndex = 0, result = [];
        while (++index < length) {
          var value = array[index];
          if (value === placeholder || value === PLACEHOLDER) {
            array[index] = PLACEHOLDER;
            result[resIndex++] = index;
          }
        }
        return result;
      }
      __name(replaceHolders, "replaceHolders");
      function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = value;
        });
        return result;
      }
      __name(setToArray, "setToArray");
      function setToPairs(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function(value) {
          result[++index] = [value, value];
        });
        return result;
      }
      __name(setToPairs, "setToPairs");
      function strictIndexOf(array, value, fromIndex) {
        var index = fromIndex - 1, length = array.length;
        while (++index < length) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }
      __name(strictIndexOf, "strictIndexOf");
      function strictLastIndexOf(array, value, fromIndex) {
        var index = fromIndex + 1;
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return index;
      }
      __name(strictLastIndexOf, "strictLastIndexOf");
      function stringSize(string) {
        return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
      }
      __name(stringSize, "stringSize");
      function stringToArray(string) {
        return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
      }
      __name(stringToArray, "stringToArray");
      function trimmedEndIndex(string) {
        var index = string.length;
        while (index-- && reWhitespace.test(string.charAt(index))) {
        }
        return index;
      }
      __name(trimmedEndIndex, "trimmedEndIndex");
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      function unicodeSize(string) {
        var result = reUnicode.lastIndex = 0;
        while (reUnicode.test(string)) {
          ++result;
        }
        return result;
      }
      __name(unicodeSize, "unicodeSize");
      function unicodeToArray(string) {
        return string.match(reUnicode) || [];
      }
      __name(unicodeToArray, "unicodeToArray");
      function unicodeWords(string) {
        return string.match(reUnicodeWord) || [];
      }
      __name(unicodeWords, "unicodeWords");
      var runInContext = /* @__PURE__ */ __name(function runInContext2(context) {
        context = context == null ? root : _4.defaults(root.Object(), context, _4.pick(root, contextProps));
        var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
        var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
        var coreJsData = context["__core-js_shared__"];
        var funcToString = funcProto.toString;
        var hasOwnProperty = objectProto.hasOwnProperty;
        var idCounter = 0;
        var maskSrcKey = function() {
          var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
          return uid ? "Symbol(src)_1." + uid : "";
        }();
        var nativeObjectToString = objectProto.toString;
        var objectCtorString = funcToString.call(Object2);
        var oldDash = root._;
        var reIsNative = RegExp2(
          "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
        );
        var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
        var defineProperty = function() {
          try {
            var func = getNative(Object2, "defineProperty");
            func({}, "", {});
            return func;
          } catch (e) {
          }
        }();
        var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
        var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
        var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set = getNative(context, "Set"), WeakMap = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
        var metaMap = WeakMap && new WeakMap();
        var realNames = {};
        var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
        var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
        function lodash(value) {
          if (isObjectLike(value) && !isArray3(value) && !(value instanceof LazyWrapper)) {
            if (value instanceof LodashWrapper) {
              return value;
            }
            if (hasOwnProperty.call(value, "__wrapped__")) {
              return wrapperClone(value);
            }
          }
          return new LodashWrapper(value);
        }
        __name(lodash, "lodash");
        var baseCreate = /* @__PURE__ */ function() {
          function object() {
          }
          __name(object, "object");
          return function(proto) {
            if (!isObject2(proto)) {
              return {};
            }
            if (objectCreate) {
              return objectCreate(proto);
            }
            object.prototype = proto;
            var result2 = new object();
            object.prototype = undefined2;
            return result2;
          };
        }();
        function baseLodash() {
        }
        __name(baseLodash, "baseLodash");
        function LodashWrapper(value, chainAll) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__chain__ = !!chainAll;
          this.__index__ = 0;
          this.__values__ = undefined2;
        }
        __name(LodashWrapper, "LodashWrapper");
        lodash.templateSettings = {
          /**
           * Used to detect `data` property values to be HTML-escaped.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "escape": reEscape,
          /**
           * Used to detect code to be evaluated.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "evaluate": reEvaluate,
          /**
           * Used to detect `data` property values to inject.
           *
           * @memberOf _.templateSettings
           * @type {RegExp}
           */
          "interpolate": reInterpolate,
          /**
           * Used to reference the data object in the template text.
           *
           * @memberOf _.templateSettings
           * @type {string}
           */
          "variable": "",
          /**
           * Used to import variables into the compiled template.
           *
           * @memberOf _.templateSettings
           * @type {Object}
           */
          "imports": {
            /**
             * A reference to the `lodash` function.
             *
             * @memberOf _.templateSettings.imports
             * @type {Function}
             */
            "_": lodash
          }
        };
        lodash.prototype = baseLodash.prototype;
        lodash.prototype.constructor = lodash;
        LodashWrapper.prototype = baseCreate(baseLodash.prototype);
        LodashWrapper.prototype.constructor = LodashWrapper;
        function LazyWrapper(value) {
          this.__wrapped__ = value;
          this.__actions__ = [];
          this.__dir__ = 1;
          this.__filtered__ = false;
          this.__iteratees__ = [];
          this.__takeCount__ = MAX_ARRAY_LENGTH;
          this.__views__ = [];
        }
        __name(LazyWrapper, "LazyWrapper");
        function lazyClone() {
          var result2 = new LazyWrapper(this.__wrapped__);
          result2.__actions__ = copyArray(this.__actions__);
          result2.__dir__ = this.__dir__;
          result2.__filtered__ = this.__filtered__;
          result2.__iteratees__ = copyArray(this.__iteratees__);
          result2.__takeCount__ = this.__takeCount__;
          result2.__views__ = copyArray(this.__views__);
          return result2;
        }
        __name(lazyClone, "lazyClone");
        function lazyReverse() {
          if (this.__filtered__) {
            var result2 = new LazyWrapper(this);
            result2.__dir__ = -1;
            result2.__filtered__ = true;
          } else {
            result2 = this.clone();
            result2.__dir__ *= -1;
          }
          return result2;
        }
        __name(lazyReverse, "lazyReverse");
        function lazyValue() {
          var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray3(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
          if (!isArr || !isRight && arrLength == length && takeCount == length) {
            return baseWrapperValue(array, this.__actions__);
          }
          var result2 = [];
          outer:
            while (length-- && resIndex < takeCount) {
              index += dir;
              var iterIndex = -1, value = array[index];
              while (++iterIndex < iterLength) {
                var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                if (type == LAZY_MAP_FLAG) {
                  value = computed;
                } else if (!computed) {
                  if (type == LAZY_FILTER_FLAG) {
                    continue outer;
                  } else {
                    break outer;
                  }
                }
              }
              result2[resIndex++] = value;
            }
          return result2;
        }
        __name(lazyValue, "lazyValue");
        LazyWrapper.prototype = baseCreate(baseLodash.prototype);
        LazyWrapper.prototype.constructor = LazyWrapper;
        function Hash(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        __name(Hash, "Hash");
        function hashClear() {
          this.__data__ = nativeCreate ? nativeCreate(null) : {};
          this.size = 0;
        }
        __name(hashClear, "hashClear");
        function hashDelete(key) {
          var result2 = this.has(key) && delete this.__data__[key];
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        __name(hashDelete, "hashDelete");
        function hashGet(key) {
          var data = this.__data__;
          if (nativeCreate) {
            var result2 = data[key];
            return result2 === HASH_UNDEFINED ? undefined2 : result2;
          }
          return hasOwnProperty.call(data, key) ? data[key] : undefined2;
        }
        __name(hashGet, "hashGet");
        function hashHas(key) {
          var data = this.__data__;
          return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
        }
        __name(hashHas, "hashHas");
        function hashSet(key, value) {
          var data = this.__data__;
          this.size += this.has(key) ? 0 : 1;
          data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
          return this;
        }
        __name(hashSet, "hashSet");
        Hash.prototype.clear = hashClear;
        Hash.prototype["delete"] = hashDelete;
        Hash.prototype.get = hashGet;
        Hash.prototype.has = hashHas;
        Hash.prototype.set = hashSet;
        function ListCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        __name(ListCache, "ListCache");
        function listCacheClear() {
          this.__data__ = [];
          this.size = 0;
        }
        __name(listCacheClear, "listCacheClear");
        function listCacheDelete(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            return false;
          }
          var lastIndex = data.length - 1;
          if (index == lastIndex) {
            data.pop();
          } else {
            splice.call(data, index, 1);
          }
          --this.size;
          return true;
        }
        __name(listCacheDelete, "listCacheDelete");
        function listCacheGet(key) {
          var data = this.__data__, index = assocIndexOf(data, key);
          return index < 0 ? undefined2 : data[index][1];
        }
        __name(listCacheGet, "listCacheGet");
        function listCacheHas(key) {
          return assocIndexOf(this.__data__, key) > -1;
        }
        __name(listCacheHas, "listCacheHas");
        function listCacheSet(key, value) {
          var data = this.__data__, index = assocIndexOf(data, key);
          if (index < 0) {
            ++this.size;
            data.push([key, value]);
          } else {
            data[index][1] = value;
          }
          return this;
        }
        __name(listCacheSet, "listCacheSet");
        ListCache.prototype.clear = listCacheClear;
        ListCache.prototype["delete"] = listCacheDelete;
        ListCache.prototype.get = listCacheGet;
        ListCache.prototype.has = listCacheHas;
        ListCache.prototype.set = listCacheSet;
        function MapCache(entries) {
          var index = -1, length = entries == null ? 0 : entries.length;
          this.clear();
          while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
          }
        }
        __name(MapCache, "MapCache");
        function mapCacheClear() {
          this.size = 0;
          this.__data__ = {
            "hash": new Hash(),
            "map": new (Map2 || ListCache)(),
            "string": new Hash()
          };
        }
        __name(mapCacheClear, "mapCacheClear");
        function mapCacheDelete(key) {
          var result2 = getMapData(this, key)["delete"](key);
          this.size -= result2 ? 1 : 0;
          return result2;
        }
        __name(mapCacheDelete, "mapCacheDelete");
        function mapCacheGet(key) {
          return getMapData(this, key).get(key);
        }
        __name(mapCacheGet, "mapCacheGet");
        function mapCacheHas(key) {
          return getMapData(this, key).has(key);
        }
        __name(mapCacheHas, "mapCacheHas");
        function mapCacheSet(key, value) {
          var data = getMapData(this, key), size2 = data.size;
          data.set(key, value);
          this.size += data.size == size2 ? 0 : 1;
          return this;
        }
        __name(mapCacheSet, "mapCacheSet");
        MapCache.prototype.clear = mapCacheClear;
        MapCache.prototype["delete"] = mapCacheDelete;
        MapCache.prototype.get = mapCacheGet;
        MapCache.prototype.has = mapCacheHas;
        MapCache.prototype.set = mapCacheSet;
        function SetCache(values2) {
          var index = -1, length = values2 == null ? 0 : values2.length;
          this.__data__ = new MapCache();
          while (++index < length) {
            this.add(values2[index]);
          }
        }
        __name(SetCache, "SetCache");
        function setCacheAdd(value) {
          this.__data__.set(value, HASH_UNDEFINED);
          return this;
        }
        __name(setCacheAdd, "setCacheAdd");
        function setCacheHas(value) {
          return this.__data__.has(value);
        }
        __name(setCacheHas, "setCacheHas");
        SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
        SetCache.prototype.has = setCacheHas;
        function Stack(entries) {
          var data = this.__data__ = new ListCache(entries);
          this.size = data.size;
        }
        __name(Stack, "Stack");
        function stackClear() {
          this.__data__ = new ListCache();
          this.size = 0;
        }
        __name(stackClear, "stackClear");
        function stackDelete(key) {
          var data = this.__data__, result2 = data["delete"](key);
          this.size = data.size;
          return result2;
        }
        __name(stackDelete, "stackDelete");
        function stackGet(key) {
          return this.__data__.get(key);
        }
        __name(stackGet, "stackGet");
        function stackHas(key) {
          return this.__data__.has(key);
        }
        __name(stackHas, "stackHas");
        function stackSet(key, value) {
          var data = this.__data__;
          if (data instanceof ListCache) {
            var pairs = data.__data__;
            if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
              pairs.push([key, value]);
              this.size = ++data.size;
              return this;
            }
            data = this.__data__ = new MapCache(pairs);
          }
          data.set(key, value);
          this.size = data.size;
          return this;
        }
        __name(stackSet, "stackSet");
        Stack.prototype.clear = stackClear;
        Stack.prototype["delete"] = stackDelete;
        Stack.prototype.get = stackGet;
        Stack.prototype.has = stackHas;
        Stack.prototype.set = stackSet;
        function arrayLikeKeys(value, inherited) {
          var isArr = isArray3(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
          for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
            isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
            isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
            isIndex(key, length)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(arrayLikeKeys, "arrayLikeKeys");
        function arraySample(array) {
          var length = array.length;
          return length ? array[baseRandom(0, length - 1)] : undefined2;
        }
        __name(arraySample, "arraySample");
        function arraySampleSize(array, n) {
          return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
        }
        __name(arraySampleSize, "arraySampleSize");
        function arrayShuffle(array) {
          return shuffleSelf(copyArray(array));
        }
        __name(arrayShuffle, "arrayShuffle");
        function assignMergeValue(object, key, value) {
          if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        __name(assignMergeValue, "assignMergeValue");
        function assignValue(object, key, value) {
          var objValue = object[key];
          if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
            baseAssignValue(object, key, value);
          }
        }
        __name(assignValue, "assignValue");
        function assocIndexOf(array, key) {
          var length = array.length;
          while (length--) {
            if (eq(array[length][0], key)) {
              return length;
            }
          }
          return -1;
        }
        __name(assocIndexOf, "assocIndexOf");
        function baseAggregator(collection, setter, iteratee2, accumulator) {
          baseEach(collection, function(value, key, collection2) {
            setter(accumulator, value, iteratee2(value), collection2);
          });
          return accumulator;
        }
        __name(baseAggregator, "baseAggregator");
        function baseAssign(object, source) {
          return object && copyObject(source, keys(source), object);
        }
        __name(baseAssign, "baseAssign");
        function baseAssignIn(object, source) {
          return object && copyObject(source, keysIn(source), object);
        }
        __name(baseAssignIn, "baseAssignIn");
        function baseAssignValue(object, key, value) {
          if (key == "__proto__" && defineProperty) {
            defineProperty(object, key, {
              "configurable": true,
              "enumerable": true,
              "value": value,
              "writable": true
            });
          } else {
            object[key] = value;
          }
        }
        __name(baseAssignValue, "baseAssignValue");
        function baseAt(object, paths) {
          var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
          while (++index < length) {
            result2[index] = skip ? undefined2 : get(object, paths[index]);
          }
          return result2;
        }
        __name(baseAt, "baseAt");
        function baseClamp(number, lower, upper) {
          if (number === number) {
            if (upper !== undefined2) {
              number = number <= upper ? number : upper;
            }
            if (lower !== undefined2) {
              number = number >= lower ? number : lower;
            }
          }
          return number;
        }
        __name(baseClamp, "baseClamp");
        function baseClone(value, bitmask, customizer, key, object, stack) {
          var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
          if (customizer) {
            result2 = object ? customizer(value, key, object, stack) : customizer(value);
          }
          if (result2 !== undefined2) {
            return result2;
          }
          if (!isObject2(value)) {
            return value;
          }
          var isArr = isArray3(value);
          if (isArr) {
            result2 = initCloneArray(value);
            if (!isDeep) {
              return copyArray(value, result2);
            }
          } else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
              return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || isFunc && !object) {
              result2 = isFlat || isFunc ? {} : initCloneObject(value);
              if (!isDeep) {
                return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
              }
            } else {
              if (!cloneableTags[tag]) {
                return object ? value : {};
              }
              result2 = initCloneByTag(value, tag, isDeep);
            }
          }
          stack || (stack = new Stack());
          var stacked = stack.get(value);
          if (stacked) {
            return stacked;
          }
          stack.set(value, result2);
          if (isSet(value)) {
            value.forEach(function(subValue) {
              result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
            });
          } else if (isMap(value)) {
            value.forEach(function(subValue, key2) {
              result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
          }
          var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
          var props = isArr ? undefined2 : keysFunc(value);
          arrayEach(props || value, function(subValue, key2) {
            if (props) {
              key2 = subValue;
              subValue = value[key2];
            }
            assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
          });
          return result2;
        }
        __name(baseClone, "baseClone");
        function baseConforms(source) {
          var props = keys(source);
          return function(object) {
            return baseConformsTo(object, source, props);
          };
        }
        __name(baseConforms, "baseConforms");
        function baseConformsTo(object, source, props) {
          var length = props.length;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (length--) {
            var key = props[length], predicate = source[key], value = object[key];
            if (value === undefined2 && !(key in object) || !predicate(value)) {
              return false;
            }
          }
          return true;
        }
        __name(baseConformsTo, "baseConformsTo");
        function baseDelay(func, wait, args) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return setTimeout2(function() {
            func.apply(undefined2, args);
          }, wait);
        }
        __name(baseDelay, "baseDelay");
        function baseDifference(array, values2, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
          if (!length) {
            return result2;
          }
          if (iteratee2) {
            values2 = arrayMap(values2, baseUnary(iteratee2));
          }
          if (comparator) {
            includes2 = arrayIncludesWith;
            isCommon = false;
          } else if (values2.length >= LARGE_ARRAY_SIZE) {
            includes2 = cacheHas;
            isCommon = false;
            values2 = new SetCache(values2);
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var valuesIndex = valuesLength;
                while (valuesIndex--) {
                  if (values2[valuesIndex] === computed) {
                    continue outer;
                  }
                }
                result2.push(value);
              } else if (!includes2(values2, computed, comparator)) {
                result2.push(value);
              }
            }
          return result2;
        }
        __name(baseDifference, "baseDifference");
        var baseEach = createBaseEach(baseForOwn);
        var baseEachRight = createBaseEach(baseForOwnRight, true);
        function baseEvery(collection, predicate) {
          var result2 = true;
          baseEach(collection, function(value, index, collection2) {
            result2 = !!predicate(value, index, collection2);
            return result2;
          });
          return result2;
        }
        __name(baseEvery, "baseEvery");
        function baseExtremum(array, iteratee2, comparator) {
          var index = -1, length = array.length;
          while (++index < length) {
            var value = array[index], current = iteratee2(value);
            if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
              var computed = current, result2 = value;
            }
          }
          return result2;
        }
        __name(baseExtremum, "baseExtremum");
        function baseFill(array, value, start, end) {
          var length = array.length;
          start = toInteger(start);
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end === undefined2 || end > length ? length : toInteger(end);
          if (end < 0) {
            end += length;
          }
          end = start > end ? 0 : toLength(end);
          while (start < end) {
            array[start++] = value;
          }
          return array;
        }
        __name(baseFill, "baseFill");
        function baseFilter(collection, predicate) {
          var result2 = [];
          baseEach(collection, function(value, index, collection2) {
            if (predicate(value, index, collection2)) {
              result2.push(value);
            }
          });
          return result2;
        }
        __name(baseFilter, "baseFilter");
        function baseFlatten(array, depth, predicate, isStrict, result2) {
          var index = -1, length = array.length;
          predicate || (predicate = isFlattenable);
          result2 || (result2 = []);
          while (++index < length) {
            var value = array[index];
            if (depth > 0 && predicate(value)) {
              if (depth > 1) {
                baseFlatten(value, depth - 1, predicate, isStrict, result2);
              } else {
                arrayPush(result2, value);
              }
            } else if (!isStrict) {
              result2[result2.length] = value;
            }
          }
          return result2;
        }
        __name(baseFlatten, "baseFlatten");
        var baseFor = createBaseFor();
        var baseForRight = createBaseFor(true);
        function baseForOwn(object, iteratee2) {
          return object && baseFor(object, iteratee2, keys);
        }
        __name(baseForOwn, "baseForOwn");
        function baseForOwnRight(object, iteratee2) {
          return object && baseForRight(object, iteratee2, keys);
        }
        __name(baseForOwnRight, "baseForOwnRight");
        function baseFunctions(object, props) {
          return arrayFilter(props, function(key) {
            return isFunction2(object[key]);
          });
        }
        __name(baseFunctions, "baseFunctions");
        function baseGet(object, path) {
          path = castPath(path, object);
          var index = 0, length = path.length;
          while (object != null && index < length) {
            object = object[toKey(path[index++])];
          }
          return index && index == length ? object : undefined2;
        }
        __name(baseGet, "baseGet");
        function baseGetAllKeys(object, keysFunc, symbolsFunc) {
          var result2 = keysFunc(object);
          return isArray3(object) ? result2 : arrayPush(result2, symbolsFunc(object));
        }
        __name(baseGetAllKeys, "baseGetAllKeys");
        function baseGetTag(value) {
          if (value == null) {
            return value === undefined2 ? undefinedTag : nullTag;
          }
          return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
        }
        __name(baseGetTag, "baseGetTag");
        function baseGt(value, other) {
          return value > other;
        }
        __name(baseGt, "baseGt");
        function baseHas(object, key) {
          return object != null && hasOwnProperty.call(object, key);
        }
        __name(baseHas, "baseHas");
        function baseHasIn(object, key) {
          return object != null && key in Object2(object);
        }
        __name(baseHasIn, "baseHasIn");
        function baseInRange(number, start, end) {
          return number >= nativeMin(start, end) && number < nativeMax(start, end);
        }
        __name(baseInRange, "baseInRange");
        function baseIntersection(arrays, iteratee2, comparator) {
          var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
          while (othIndex--) {
            var array = arrays[othIndex];
            if (othIndex && iteratee2) {
              array = arrayMap(array, baseUnary(iteratee2));
            }
            maxLength = nativeMin(array.length, maxLength);
            caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
          }
          array = arrays[0];
          var index = -1, seen = caches[0];
          outer:
            while (++index < length && result2.length < maxLength) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                othIndex = othLength;
                while (--othIndex) {
                  var cache = caches[othIndex];
                  if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                    continue outer;
                  }
                }
                if (seen) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        __name(baseIntersection, "baseIntersection");
        function baseInverter(object, setter, iteratee2, accumulator) {
          baseForOwn(object, function(value, key, object2) {
            setter(accumulator, iteratee2(value), key, object2);
          });
          return accumulator;
        }
        __name(baseInverter, "baseInverter");
        function baseInvoke(object, path, args) {
          path = castPath(path, object);
          object = parent(object, path);
          var func = object == null ? object : object[toKey(last(path))];
          return func == null ? undefined2 : apply(func, object, args);
        }
        __name(baseInvoke, "baseInvoke");
        function baseIsArguments(value) {
          return isObjectLike(value) && baseGetTag(value) == argsTag;
        }
        __name(baseIsArguments, "baseIsArguments");
        function baseIsArrayBuffer(value) {
          return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
        }
        __name(baseIsArrayBuffer, "baseIsArrayBuffer");
        function baseIsDate(value) {
          return isObjectLike(value) && baseGetTag(value) == dateTag;
        }
        __name(baseIsDate, "baseIsDate");
        function baseIsEqual(value, other, bitmask, customizer, stack) {
          if (value === other) {
            return true;
          }
          if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
            return value !== value && other !== other;
          }
          return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
        }
        __name(baseIsEqual, "baseIsEqual");
        function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
          var objIsArr = isArray3(object), othIsArr = isArray3(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
          objTag = objTag == argsTag ? objectTag : objTag;
          othTag = othTag == argsTag ? objectTag : othTag;
          var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
          if (isSameTag && isBuffer(object)) {
            if (!isBuffer(other)) {
              return false;
            }
            objIsArr = true;
            objIsObj = false;
          }
          if (isSameTag && !objIsObj) {
            stack || (stack = new Stack());
            return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
          }
          if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
            var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
            if (objIsWrapped || othIsWrapped) {
              var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
              stack || (stack = new Stack());
              return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
            }
          }
          if (!isSameTag) {
            return false;
          }
          stack || (stack = new Stack());
          return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
        }
        __name(baseIsEqualDeep, "baseIsEqualDeep");
        function baseIsMap(value) {
          return isObjectLike(value) && getTag(value) == mapTag;
        }
        __name(baseIsMap, "baseIsMap");
        function baseIsMatch(object, source, matchData, customizer) {
          var index = matchData.length, length = index, noCustomizer = !customizer;
          if (object == null) {
            return !length;
          }
          object = Object2(object);
          while (index--) {
            var data = matchData[index];
            if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
              return false;
            }
          }
          while (++index < length) {
            data = matchData[index];
            var key = data[0], objValue = object[key], srcValue = data[1];
            if (noCustomizer && data[2]) {
              if (objValue === undefined2 && !(key in object)) {
                return false;
              }
            } else {
              var stack = new Stack();
              if (customizer) {
                var result2 = customizer(objValue, srcValue, key, object, source, stack);
              }
              if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                return false;
              }
            }
          }
          return true;
        }
        __name(baseIsMatch, "baseIsMatch");
        function baseIsNative(value) {
          if (!isObject2(value) || isMasked(value)) {
            return false;
          }
          var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
          return pattern.test(toSource(value));
        }
        __name(baseIsNative, "baseIsNative");
        function baseIsRegExp(value) {
          return isObjectLike(value) && baseGetTag(value) == regexpTag;
        }
        __name(baseIsRegExp, "baseIsRegExp");
        function baseIsSet(value) {
          return isObjectLike(value) && getTag(value) == setTag;
        }
        __name(baseIsSet, "baseIsSet");
        function baseIsTypedArray(value) {
          return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
        }
        __name(baseIsTypedArray, "baseIsTypedArray");
        function baseIteratee(value) {
          if (typeof value == "function") {
            return value;
          }
          if (value == null) {
            return identity;
          }
          if (typeof value == "object") {
            return isArray3(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
          }
          return property(value);
        }
        __name(baseIteratee, "baseIteratee");
        function baseKeys(object) {
          if (!isPrototype(object)) {
            return nativeKeys(object);
          }
          var result2 = [];
          for (var key in Object2(object)) {
            if (hasOwnProperty.call(object, key) && key != "constructor") {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(baseKeys, "baseKeys");
        function baseKeysIn(object) {
          if (!isObject2(object)) {
            return nativeKeysIn(object);
          }
          var isProto = isPrototype(object), result2 = [];
          for (var key in object) {
            if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(baseKeysIn, "baseKeysIn");
        function baseLt(value, other) {
          return value < other;
        }
        __name(baseLt, "baseLt");
        function baseMap(collection, iteratee2) {
          var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value, key, collection2) {
            result2[++index] = iteratee2(value, key, collection2);
          });
          return result2;
        }
        __name(baseMap, "baseMap");
        function baseMatches(source) {
          var matchData = getMatchData(source);
          if (matchData.length == 1 && matchData[0][2]) {
            return matchesStrictComparable(matchData[0][0], matchData[0][1]);
          }
          return function(object) {
            return object === source || baseIsMatch(object, source, matchData);
          };
        }
        __name(baseMatches, "baseMatches");
        function baseMatchesProperty(path, srcValue) {
          if (isKey(path) && isStrictComparable(srcValue)) {
            return matchesStrictComparable(toKey(path), srcValue);
          }
          return function(object) {
            var objValue = get(object, path);
            return objValue === undefined2 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
          };
        }
        __name(baseMatchesProperty, "baseMatchesProperty");
        function baseMerge(object, source, srcIndex, customizer, stack) {
          if (object === source) {
            return;
          }
          baseFor(source, function(srcValue, key) {
            stack || (stack = new Stack());
            if (isObject2(srcValue)) {
              baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
            } else {
              var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
              if (newValue === undefined2) {
                newValue = srcValue;
              }
              assignMergeValue(object, key, newValue);
            }
          }, keysIn);
        }
        __name(baseMerge, "baseMerge");
        function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
          var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
          if (stacked) {
            assignMergeValue(object, key, stacked);
            return;
          }
          var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
          var isCommon = newValue === undefined2;
          if (isCommon) {
            var isArr = isArray3(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
            newValue = srcValue;
            if (isArr || isBuff || isTyped) {
              if (isArray3(objValue)) {
                newValue = objValue;
              } else if (isArrayLikeObject(objValue)) {
                newValue = copyArray(objValue);
              } else if (isBuff) {
                isCommon = false;
                newValue = cloneBuffer(srcValue, true);
              } else if (isTyped) {
                isCommon = false;
                newValue = cloneTypedArray(srcValue, true);
              } else {
                newValue = [];
              }
            } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
              newValue = objValue;
              if (isArguments(objValue)) {
                newValue = toPlainObject(objValue);
              } else if (!isObject2(objValue) || isFunction2(objValue)) {
                newValue = initCloneObject(srcValue);
              }
            } else {
              isCommon = false;
            }
          }
          if (isCommon) {
            stack.set(srcValue, newValue);
            mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
            stack["delete"](srcValue);
          }
          assignMergeValue(object, key, newValue);
        }
        __name(baseMergeDeep, "baseMergeDeep");
        function baseNth(array, n) {
          var length = array.length;
          if (!length) {
            return;
          }
          n += n < 0 ? length : 0;
          return isIndex(n, length) ? array[n] : undefined2;
        }
        __name(baseNth, "baseNth");
        function baseOrderBy(collection, iteratees, orders) {
          if (iteratees.length) {
            iteratees = arrayMap(iteratees, function(iteratee2) {
              if (isArray3(iteratee2)) {
                return function(value) {
                  return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                };
              }
              return iteratee2;
            });
          } else {
            iteratees = [identity];
          }
          var index = -1;
          iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
          var result2 = baseMap(collection, function(value, key, collection2) {
            var criteria = arrayMap(iteratees, function(iteratee2) {
              return iteratee2(value);
            });
            return { "criteria": criteria, "index": ++index, "value": value };
          });
          return baseSortBy(result2, function(object, other) {
            return compareMultiple(object, other, orders);
          });
        }
        __name(baseOrderBy, "baseOrderBy");
        function basePick(object, paths) {
          return basePickBy(object, paths, function(value, path) {
            return hasIn(object, path);
          });
        }
        __name(basePick, "basePick");
        function basePickBy(object, paths, predicate) {
          var index = -1, length = paths.length, result2 = {};
          while (++index < length) {
            var path = paths[index], value = baseGet(object, path);
            if (predicate(value, path)) {
              baseSet(result2, castPath(path, object), value);
            }
          }
          return result2;
        }
        __name(basePickBy, "basePickBy");
        function basePropertyDeep(path) {
          return function(object) {
            return baseGet(object, path);
          };
        }
        __name(basePropertyDeep, "basePropertyDeep");
        function basePullAll(array, values2, iteratee2, comparator) {
          var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
          if (array === values2) {
            values2 = copyArray(values2);
          }
          if (iteratee2) {
            seen = arrayMap(array, baseUnary(iteratee2));
          }
          while (++index < length) {
            var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
            while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
              if (seen !== array) {
                splice.call(seen, fromIndex, 1);
              }
              splice.call(array, fromIndex, 1);
            }
          }
          return array;
        }
        __name(basePullAll, "basePullAll");
        function basePullAt(array, indexes) {
          var length = array ? indexes.length : 0, lastIndex = length - 1;
          while (length--) {
            var index = indexes[length];
            if (length == lastIndex || index !== previous) {
              var previous = index;
              if (isIndex(index)) {
                splice.call(array, index, 1);
              } else {
                baseUnset(array, index);
              }
            }
          }
          return array;
        }
        __name(basePullAt, "basePullAt");
        function baseRandom(lower, upper) {
          return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
        }
        __name(baseRandom, "baseRandom");
        function baseRange(start, end, step, fromRight) {
          var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
          while (length--) {
            result2[fromRight ? length : ++index] = start;
            start += step;
          }
          return result2;
        }
        __name(baseRange, "baseRange");
        function baseRepeat(string, n) {
          var result2 = "";
          if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
            return result2;
          }
          do {
            if (n % 2) {
              result2 += string;
            }
            n = nativeFloor(n / 2);
            if (n) {
              string += string;
            }
          } while (n);
          return result2;
        }
        __name(baseRepeat, "baseRepeat");
        function baseRest(func, start) {
          return setToString(overRest(func, start, identity), func + "");
        }
        __name(baseRest, "baseRest");
        function baseSample(collection) {
          return arraySample(values(collection));
        }
        __name(baseSample, "baseSample");
        function baseSampleSize(collection, n) {
          var array = values(collection);
          return shuffleSelf(array, baseClamp(n, 0, array.length));
        }
        __name(baseSampleSize, "baseSampleSize");
        function baseSet(object, path, value, customizer) {
          if (!isObject2(object)) {
            return object;
          }
          path = castPath(path, object);
          var index = -1, length = path.length, lastIndex = length - 1, nested = object;
          while (nested != null && ++index < length) {
            var key = toKey(path[index]), newValue = value;
            if (key === "__proto__" || key === "constructor" || key === "prototype") {
              return object;
            }
            if (index != lastIndex) {
              var objValue = nested[key];
              newValue = customizer ? customizer(objValue, key, nested) : undefined2;
              if (newValue === undefined2) {
                newValue = isObject2(objValue) ? objValue : isIndex(path[index + 1]) ? [] : {};
              }
            }
            assignValue(nested, key, newValue);
            nested = nested[key];
          }
          return object;
        }
        __name(baseSet, "baseSet");
        var baseSetData = !metaMap ? identity : function(func, data) {
          metaMap.set(func, data);
          return func;
        };
        var baseSetToString = !defineProperty ? identity : function(func, string) {
          return defineProperty(func, "toString", {
            "configurable": true,
            "enumerable": false,
            "value": constant(string),
            "writable": true
          });
        };
        function baseShuffle(collection) {
          return shuffleSelf(values(collection));
        }
        __name(baseShuffle, "baseShuffle");
        function baseSlice(array, start, end) {
          var index = -1, length = array.length;
          if (start < 0) {
            start = -start > length ? 0 : length + start;
          }
          end = end > length ? length : end;
          if (end < 0) {
            end += length;
          }
          length = start > end ? 0 : end - start >>> 0;
          start >>>= 0;
          var result2 = Array2(length);
          while (++index < length) {
            result2[index] = array[index + start];
          }
          return result2;
        }
        __name(baseSlice, "baseSlice");
        function baseSome(collection, predicate) {
          var result2;
          baseEach(collection, function(value, index, collection2) {
            result2 = predicate(value, index, collection2);
            return !result2;
          });
          return !!result2;
        }
        __name(baseSome, "baseSome");
        function baseSortedIndex(array, value, retHighest) {
          var low = 0, high = array == null ? low : array.length;
          if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
            while (low < high) {
              var mid = low + high >>> 1, computed = array[mid];
              if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return high;
          }
          return baseSortedIndexBy(array, value, identity, retHighest);
        }
        __name(baseSortedIndex, "baseSortedIndex");
        function baseSortedIndexBy(array, value, iteratee2, retHighest) {
          var low = 0, high = array == null ? 0 : array.length;
          if (high === 0) {
            return 0;
          }
          value = iteratee2(value);
          var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
          while (low < high) {
            var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
            if (valIsNaN) {
              var setLow = retHighest || othIsReflexive;
            } else if (valIsUndefined) {
              setLow = othIsReflexive && (retHighest || othIsDefined);
            } else if (valIsNull) {
              setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
            } else if (valIsSymbol) {
              setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
            } else if (othIsNull || othIsSymbol) {
              setLow = false;
            } else {
              setLow = retHighest ? computed <= value : computed < value;
            }
            if (setLow) {
              low = mid + 1;
            } else {
              high = mid;
            }
          }
          return nativeMin(high, MAX_ARRAY_INDEX);
        }
        __name(baseSortedIndexBy, "baseSortedIndexBy");
        function baseSortedUniq(array, iteratee2) {
          var index = -1, length = array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
            if (!index || !eq(computed, seen)) {
              var seen = computed;
              result2[resIndex++] = value === 0 ? 0 : value;
            }
          }
          return result2;
        }
        __name(baseSortedUniq, "baseSortedUniq");
        function baseToNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          return +value;
        }
        __name(baseToNumber, "baseToNumber");
        function baseToString(value) {
          if (typeof value == "string") {
            return value;
          }
          if (isArray3(value)) {
            return arrayMap(value, baseToString) + "";
          }
          if (isSymbol(value)) {
            return symbolToString ? symbolToString.call(value) : "";
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        __name(baseToString, "baseToString");
        function baseUniq(array, iteratee2, comparator) {
          var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
          if (comparator) {
            isCommon = false;
            includes2 = arrayIncludesWith;
          } else if (length >= LARGE_ARRAY_SIZE) {
            var set2 = iteratee2 ? null : createSet(array);
            if (set2) {
              return setToArray(set2);
            }
            isCommon = false;
            includes2 = cacheHas;
            seen = new SetCache();
          } else {
            seen = iteratee2 ? [] : result2;
          }
          outer:
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              value = comparator || value !== 0 ? value : 0;
              if (isCommon && computed === computed) {
                var seenIndex = seen.length;
                while (seenIndex--) {
                  if (seen[seenIndex] === computed) {
                    continue outer;
                  }
                }
                if (iteratee2) {
                  seen.push(computed);
                }
                result2.push(value);
              } else if (!includes2(seen, computed, comparator)) {
                if (seen !== result2) {
                  seen.push(computed);
                }
                result2.push(value);
              }
            }
          return result2;
        }
        __name(baseUniq, "baseUniq");
        function baseUnset(object, path) {
          path = castPath(path, object);
          object = parent(object, path);
          return object == null || delete object[toKey(last(path))];
        }
        __name(baseUnset, "baseUnset");
        function baseUpdate(object, path, updater, customizer) {
          return baseSet(object, path, updater(baseGet(object, path)), customizer);
        }
        __name(baseUpdate, "baseUpdate");
        function baseWhile(array, predicate, isDrop, fromRight) {
          var length = array.length, index = fromRight ? length : -1;
          while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
          }
          return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
        }
        __name(baseWhile, "baseWhile");
        function baseWrapperValue(value, actions) {
          var result2 = value;
          if (result2 instanceof LazyWrapper) {
            result2 = result2.value();
          }
          return arrayReduce(actions, function(result3, action) {
            return action.func.apply(action.thisArg, arrayPush([result3], action.args));
          }, result2);
        }
        __name(baseWrapperValue, "baseWrapperValue");
        function baseXor(arrays, iteratee2, comparator) {
          var length = arrays.length;
          if (length < 2) {
            return length ? baseUniq(arrays[0]) : [];
          }
          var index = -1, result2 = Array2(length);
          while (++index < length) {
            var array = arrays[index], othIndex = -1;
            while (++othIndex < length) {
              if (othIndex != index) {
                result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
              }
            }
          }
          return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
        }
        __name(baseXor, "baseXor");
        function baseZipObject(props, values2, assignFunc) {
          var index = -1, length = props.length, valsLength = values2.length, result2 = {};
          while (++index < length) {
            var value = index < valsLength ? values2[index] : undefined2;
            assignFunc(result2, props[index], value);
          }
          return result2;
        }
        __name(baseZipObject, "baseZipObject");
        function castArrayLikeObject(value) {
          return isArrayLikeObject(value) ? value : [];
        }
        __name(castArrayLikeObject, "castArrayLikeObject");
        function castFunction(value) {
          return typeof value == "function" ? value : identity;
        }
        __name(castFunction, "castFunction");
        function castPath(value, object) {
          if (isArray3(value)) {
            return value;
          }
          return isKey(value, object) ? [value] : stringToPath(toString(value));
        }
        __name(castPath, "castPath");
        var castRest = baseRest;
        function castSlice(array, start, end) {
          var length = array.length;
          end = end === undefined2 ? length : end;
          return !start && end >= length ? array : baseSlice(array, start, end);
        }
        __name(castSlice, "castSlice");
        var clearTimeout2 = ctxClearTimeout || function(id) {
          return root.clearTimeout(id);
        };
        function cloneBuffer(buffer, isDeep) {
          if (isDeep) {
            return buffer.slice();
          }
          var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
          buffer.copy(result2);
          return result2;
        }
        __name(cloneBuffer, "cloneBuffer");
        function cloneArrayBuffer(arrayBuffer) {
          var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
          new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
          return result2;
        }
        __name(cloneArrayBuffer, "cloneArrayBuffer");
        function cloneDataView(dataView, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
          return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
        }
        __name(cloneDataView, "cloneDataView");
        function cloneRegExp(regexp) {
          var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
          result2.lastIndex = regexp.lastIndex;
          return result2;
        }
        __name(cloneRegExp, "cloneRegExp");
        function cloneSymbol(symbol) {
          return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
        }
        __name(cloneSymbol, "cloneSymbol");
        function cloneTypedArray(typedArray, isDeep) {
          var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
          return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
        }
        __name(cloneTypedArray, "cloneTypedArray");
        function compareAscending(value, other) {
          if (value !== other) {
            var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
            var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
            if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
              return 1;
            }
            if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
              return -1;
            }
          }
          return 0;
        }
        __name(compareAscending, "compareAscending");
        function compareMultiple(object, other, orders) {
          var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
          while (++index < length) {
            var result2 = compareAscending(objCriteria[index], othCriteria[index]);
            if (result2) {
              if (index >= ordersLength) {
                return result2;
              }
              var order = orders[index];
              return result2 * (order == "desc" ? -1 : 1);
            }
          }
          return object.index - other.index;
        }
        __name(compareMultiple, "compareMultiple");
        function composeArgs(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
          while (++leftIndex < leftLength) {
            result2[leftIndex] = partials[leftIndex];
          }
          while (++argsIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[holders[argsIndex]] = args[argsIndex];
            }
          }
          while (rangeLength--) {
            result2[leftIndex++] = args[argsIndex++];
          }
          return result2;
        }
        __name(composeArgs, "composeArgs");
        function composeArgsRight(args, partials, holders, isCurried) {
          var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
          while (++argsIndex < rangeLength) {
            result2[argsIndex] = args[argsIndex];
          }
          var offset = argsIndex;
          while (++rightIndex < rightLength) {
            result2[offset + rightIndex] = partials[rightIndex];
          }
          while (++holdersIndex < holdersLength) {
            if (isUncurried || argsIndex < argsLength) {
              result2[offset + holders[holdersIndex]] = args[argsIndex++];
            }
          }
          return result2;
        }
        __name(composeArgsRight, "composeArgsRight");
        function copyArray(source, array) {
          var index = -1, length = source.length;
          array || (array = Array2(length));
          while (++index < length) {
            array[index] = source[index];
          }
          return array;
        }
        __name(copyArray, "copyArray");
        function copyObject(source, props, object, customizer) {
          var isNew = !object;
          object || (object = {});
          var index = -1, length = props.length;
          while (++index < length) {
            var key = props[index];
            var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
            if (newValue === undefined2) {
              newValue = source[key];
            }
            if (isNew) {
              baseAssignValue(object, key, newValue);
            } else {
              assignValue(object, key, newValue);
            }
          }
          return object;
        }
        __name(copyObject, "copyObject");
        function copySymbols(source, object) {
          return copyObject(source, getSymbols(source), object);
        }
        __name(copySymbols, "copySymbols");
        function copySymbolsIn(source, object) {
          return copyObject(source, getSymbolsIn(source), object);
        }
        __name(copySymbolsIn, "copySymbolsIn");
        function createAggregator(setter, initializer) {
          return function(collection, iteratee2) {
            var func = isArray3(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
            return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
          };
        }
        __name(createAggregator, "createAggregator");
        function createAssigner(assigner) {
          return baseRest(function(object, sources) {
            var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
            customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              customizer = length < 3 ? undefined2 : customizer;
              length = 1;
            }
            object = Object2(object);
            while (++index < length) {
              var source = sources[index];
              if (source) {
                assigner(object, source, index, customizer);
              }
            }
            return object;
          });
        }
        __name(createAssigner, "createAssigner");
        function createBaseEach(eachFunc, fromRight) {
          return function(collection, iteratee2) {
            if (collection == null) {
              return collection;
            }
            if (!isArrayLike(collection)) {
              return eachFunc(collection, iteratee2);
            }
            var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
            while (fromRight ? index-- : ++index < length) {
              if (iteratee2(iterable[index], index, iterable) === false) {
                break;
              }
            }
            return collection;
          };
        }
        __name(createBaseEach, "createBaseEach");
        function createBaseFor(fromRight) {
          return function(object, iteratee2, keysFunc) {
            var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
            while (length--) {
              var key = props[fromRight ? length : ++index];
              if (iteratee2(iterable[key], key, iterable) === false) {
                break;
              }
            }
            return object;
          };
        }
        __name(createBaseFor, "createBaseFor");
        function createBind(func, bitmask, thisArg) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return fn.apply(isBind ? thisArg : this, arguments);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createBind, "createBind");
        function createCaseFirst(methodName) {
          return function(string) {
            string = toString(string);
            var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
            var chr = strSymbols ? strSymbols[0] : string.charAt(0);
            var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
            return chr[methodName]() + trailing;
          };
        }
        __name(createCaseFirst, "createCaseFirst");
        function createCompounder(callback) {
          return function(string) {
            return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
          };
        }
        __name(createCompounder, "createCompounder");
        function createCtor(Ctor) {
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return new Ctor();
              case 1:
                return new Ctor(args[0]);
              case 2:
                return new Ctor(args[0], args[1]);
              case 3:
                return new Ctor(args[0], args[1], args[2]);
              case 4:
                return new Ctor(args[0], args[1], args[2], args[3]);
              case 5:
                return new Ctor(args[0], args[1], args[2], args[3], args[4]);
              case 6:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
              case 7:
                return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
            }
            var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
            return isObject2(result2) ? result2 : thisBinding;
          };
        }
        __name(createCtor, "createCtor");
        function createCurry(func, bitmask, arity) {
          var Ctor = createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
            while (index--) {
              args[index] = arguments[index];
            }
            var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
            length -= holders.length;
            if (length < arity) {
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                undefined2,
                args,
                holders,
                undefined2,
                undefined2,
                arity - length
              );
            }
            var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            return apply(fn, this, args);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createCurry, "createCurry");
        function createFind(findIndexFunc) {
          return function(collection, predicate, fromIndex) {
            var iterable = Object2(collection);
            if (!isArrayLike(collection)) {
              var iteratee2 = getIteratee(predicate, 3);
              collection = keys(collection);
              predicate = /* @__PURE__ */ __name(function(key) {
                return iteratee2(iterable[key], key, iterable);
              }, "predicate");
            }
            var index = findIndexFunc(collection, predicate, fromIndex);
            return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
          };
        }
        __name(createFind, "createFind");
        function createFlow(fromRight) {
          return flatRest(function(funcs) {
            var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
            if (fromRight) {
              funcs.reverse();
            }
            while (index--) {
              var func = funcs[index];
              if (typeof func != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                var wrapper = new LodashWrapper([], true);
              }
            }
            index = wrapper ? index : length;
            while (++index < length) {
              func = funcs[index];
              var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
              if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
              } else {
                wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
              }
            }
            return function() {
              var args = arguments, value = args[0];
              if (wrapper && args.length == 1 && isArray3(value)) {
                return wrapper.plant(value).value();
              }
              var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
              while (++index2 < length) {
                result2 = funcs[index2].call(this, result2);
              }
              return result2;
            };
          });
        }
        __name(createFlow, "createFlow");
        function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
          var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
          function wrapper() {
            var length = arguments.length, args = Array2(length), index = length;
            while (index--) {
              args[index] = arguments[index];
            }
            if (isCurried) {
              var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
            }
            if (partials) {
              args = composeArgs(args, partials, holders, isCurried);
            }
            if (partialsRight) {
              args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
            }
            length -= holdersCount;
            if (isCurried && length < arity) {
              var newHolders = replaceHolders(args, placeholder);
              return createRecurry(
                func,
                bitmask,
                createHybrid,
                wrapper.placeholder,
                thisArg,
                args,
                newHolders,
                argPos,
                ary2,
                arity - length
              );
            }
            var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
            length = args.length;
            if (argPos) {
              args = reorder(args, argPos);
            } else if (isFlip && length > 1) {
              args.reverse();
            }
            if (isAry && ary2 < length) {
              args.length = ary2;
            }
            if (this && this !== root && this instanceof wrapper) {
              fn = Ctor || createCtor(fn);
            }
            return fn.apply(thisBinding, args);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createHybrid, "createHybrid");
        function createInverter(setter, toIteratee) {
          return function(object, iteratee2) {
            return baseInverter(object, setter, toIteratee(iteratee2), {});
          };
        }
        __name(createInverter, "createInverter");
        function createMathOperation(operator, defaultValue) {
          return function(value, other) {
            var result2;
            if (value === undefined2 && other === undefined2) {
              return defaultValue;
            }
            if (value !== undefined2) {
              result2 = value;
            }
            if (other !== undefined2) {
              if (result2 === undefined2) {
                return other;
              }
              if (typeof value == "string" || typeof other == "string") {
                value = baseToString(value);
                other = baseToString(other);
              } else {
                value = baseToNumber(value);
                other = baseToNumber(other);
              }
              result2 = operator(value, other);
            }
            return result2;
          };
        }
        __name(createMathOperation, "createMathOperation");
        function createOver(arrayFunc) {
          return flatRest(function(iteratees) {
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            return baseRest(function(args) {
              var thisArg = this;
              return arrayFunc(iteratees, function(iteratee2) {
                return apply(iteratee2, thisArg, args);
              });
            });
          });
        }
        __name(createOver, "createOver");
        function createPadding(length, chars) {
          chars = chars === undefined2 ? " " : baseToString(chars);
          var charsLength = chars.length;
          if (charsLength < 2) {
            return charsLength ? baseRepeat(chars, length) : chars;
          }
          var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
          return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
        }
        __name(createPadding, "createPadding");
        function createPartial(func, bitmask, thisArg, partials) {
          var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
          function wrapper() {
            var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
            while (++leftIndex < leftLength) {
              args[leftIndex] = partials[leftIndex];
            }
            while (argsLength--) {
              args[leftIndex++] = arguments[++argsIndex];
            }
            return apply(fn, isBind ? thisArg : this, args);
          }
          __name(wrapper, "wrapper");
          return wrapper;
        }
        __name(createPartial, "createPartial");
        function createRange(fromRight) {
          return function(start, end, step) {
            if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
              end = step = undefined2;
            }
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
            return baseRange(start, end, step, fromRight);
          };
        }
        __name(createRange, "createRange");
        function createRelationalOperation(operator) {
          return function(value, other) {
            if (!(typeof value == "string" && typeof other == "string")) {
              value = toNumber(value);
              other = toNumber(other);
            }
            return operator(value, other);
          };
        }
        __name(createRelationalOperation, "createRelationalOperation");
        function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
          var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
          bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
          bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
          if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
            bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
          }
          var newData = [
            func,
            bitmask,
            thisArg,
            newPartials,
            newHolders,
            newPartialsRight,
            newHoldersRight,
            argPos,
            ary2,
            arity
          ];
          var result2 = wrapFunc.apply(undefined2, newData);
          if (isLaziable(func)) {
            setData(result2, newData);
          }
          result2.placeholder = placeholder;
          return setWrapToString(result2, func, bitmask);
        }
        __name(createRecurry, "createRecurry");
        function createRound(methodName) {
          var func = Math2[methodName];
          return function(number, precision) {
            number = toNumber(number);
            precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
            if (precision && nativeIsFinite(number)) {
              var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
              pair = (toString(value) + "e").split("e");
              return +(pair[0] + "e" + (+pair[1] - precision));
            }
            return func(number);
          };
        }
        __name(createRound, "createRound");
        var createSet = !(Set && 1 / setToArray(new Set([, -0]))[1] == INFINITY) ? noop : function(values2) {
          return new Set(values2);
        };
        function createToPairs(keysFunc) {
          return function(object) {
            var tag = getTag(object);
            if (tag == mapTag) {
              return mapToArray(object);
            }
            if (tag == setTag) {
              return setToPairs(object);
            }
            return baseToPairs(object, keysFunc(object));
          };
        }
        __name(createToPairs, "createToPairs");
        function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
          var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
          if (!isBindKey && typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var length = partials ? partials.length : 0;
          if (!length) {
            bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
            partials = holders = undefined2;
          }
          ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
          arity = arity === undefined2 ? arity : toInteger(arity);
          length -= holders ? holders.length : 0;
          if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
            var partialsRight = partials, holdersRight = holders;
            partials = holders = undefined2;
          }
          var data = isBindKey ? undefined2 : getData(func);
          var newData = [
            func,
            bitmask,
            thisArg,
            partials,
            holders,
            partialsRight,
            holdersRight,
            argPos,
            ary2,
            arity
          ];
          if (data) {
            mergeData(newData, data);
          }
          func = newData[0];
          bitmask = newData[1];
          thisArg = newData[2];
          partials = newData[3];
          holders = newData[4];
          arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
          if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
            bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
          }
          if (!bitmask || bitmask == WRAP_BIND_FLAG) {
            var result2 = createBind(func, bitmask, thisArg);
          } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
            result2 = createCurry(func, bitmask, arity);
          } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
            result2 = createPartial(func, bitmask, thisArg, partials);
          } else {
            result2 = createHybrid.apply(undefined2, newData);
          }
          var setter = data ? baseSetData : setData;
          return setWrapToString(setter(result2, newData), func, bitmask);
        }
        __name(createWrap, "createWrap");
        function customDefaultsAssignIn(objValue, srcValue, key, object) {
          if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
            return srcValue;
          }
          return objValue;
        }
        __name(customDefaultsAssignIn, "customDefaultsAssignIn");
        function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
          if (isObject2(objValue) && isObject2(srcValue)) {
            stack.set(srcValue, objValue);
            baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
            stack["delete"](srcValue);
          }
          return objValue;
        }
        __name(customDefaultsMerge, "customDefaultsMerge");
        function customOmitClone(value) {
          return isPlainObject(value) ? undefined2 : value;
        }
        __name(customOmitClone, "customOmitClone");
        function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
          if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
            return false;
          }
          var arrStacked = stack.get(array);
          var othStacked = stack.get(other);
          if (arrStacked && othStacked) {
            return arrStacked == other && othStacked == array;
          }
          var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
          stack.set(array, other);
          stack.set(other, array);
          while (++index < arrLength) {
            var arrValue = array[index], othValue = other[index];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
            }
            if (compared !== undefined2) {
              if (compared) {
                continue;
              }
              result2 = false;
              break;
            }
            if (seen) {
              if (!arraySome(other, function(othValue2, othIndex) {
                if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                  return seen.push(othIndex);
                }
              })) {
                result2 = false;
                break;
              }
            } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              result2 = false;
              break;
            }
          }
          stack["delete"](array);
          stack["delete"](other);
          return result2;
        }
        __name(equalArrays, "equalArrays");
        function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
          switch (tag) {
            case dataViewTag:
              if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                return false;
              }
              object = object.buffer;
              other = other.buffer;
            case arrayBufferTag:
              if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                return false;
              }
              return true;
            case boolTag:
            case dateTag:
            case numberTag:
              return eq(+object, +other);
            case errorTag:
              return object.name == other.name && object.message == other.message;
            case regexpTag:
            case stringTag:
              return object == other + "";
            case mapTag:
              var convert = mapToArray;
            case setTag:
              var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
              convert || (convert = setToArray);
              if (object.size != other.size && !isPartial) {
                return false;
              }
              var stacked = stack.get(object);
              if (stacked) {
                return stacked == other;
              }
              bitmask |= COMPARE_UNORDERED_FLAG;
              stack.set(object, other);
              var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
              stack["delete"](object);
              return result2;
            case symbolTag:
              if (symbolValueOf) {
                return symbolValueOf.call(object) == symbolValueOf.call(other);
              }
          }
          return false;
        }
        __name(equalByTag, "equalByTag");
        function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
          if (objLength != othLength && !isPartial) {
            return false;
          }
          var index = objLength;
          while (index--) {
            var key = objProps[index];
            if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
              return false;
            }
          }
          var objStacked = stack.get(object);
          var othStacked = stack.get(other);
          if (objStacked && othStacked) {
            return objStacked == other && othStacked == object;
          }
          var result2 = true;
          stack.set(object, other);
          stack.set(other, object);
          var skipCtor = isPartial;
          while (++index < objLength) {
            key = objProps[index];
            var objValue = object[key], othValue = other[key];
            if (customizer) {
              var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
            }
            if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
              result2 = false;
              break;
            }
            skipCtor || (skipCtor = key == "constructor");
          }
          if (result2 && !skipCtor) {
            var objCtor = object.constructor, othCtor = other.constructor;
            if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
              result2 = false;
            }
          }
          stack["delete"](object);
          stack["delete"](other);
          return result2;
        }
        __name(equalObjects, "equalObjects");
        function flatRest(func) {
          return setToString(overRest(func, undefined2, flatten), func + "");
        }
        __name(flatRest, "flatRest");
        function getAllKeys(object) {
          return baseGetAllKeys(object, keys, getSymbols);
        }
        __name(getAllKeys, "getAllKeys");
        function getAllKeysIn(object) {
          return baseGetAllKeys(object, keysIn, getSymbolsIn);
        }
        __name(getAllKeysIn, "getAllKeysIn");
        var getData = !metaMap ? noop : function(func) {
          return metaMap.get(func);
        };
        function getFuncName(func) {
          var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
          while (length--) {
            var data = array[length], otherFunc = data.func;
            if (otherFunc == null || otherFunc == func) {
              return data.name;
            }
          }
          return result2;
        }
        __name(getFuncName, "getFuncName");
        function getHolder(func) {
          var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
          return object.placeholder;
        }
        __name(getHolder, "getHolder");
        function getIteratee() {
          var result2 = lodash.iteratee || iteratee;
          result2 = result2 === iteratee ? baseIteratee : result2;
          return arguments.length ? result2(arguments[0], arguments[1]) : result2;
        }
        __name(getIteratee, "getIteratee");
        function getMapData(map2, key) {
          var data = map2.__data__;
          return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
        }
        __name(getMapData, "getMapData");
        function getMatchData(object) {
          var result2 = keys(object), length = result2.length;
          while (length--) {
            var key = result2[length], value = object[key];
            result2[length] = [key, value, isStrictComparable(value)];
          }
          return result2;
        }
        __name(getMatchData, "getMatchData");
        function getNative(object, key) {
          var value = getValue(object, key);
          return baseIsNative(value) ? value : undefined2;
        }
        __name(getNative, "getNative");
        function getRawTag(value) {
          var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
          try {
            value[symToStringTag] = undefined2;
            var unmasked = true;
          } catch (e) {
          }
          var result2 = nativeObjectToString.call(value);
          if (unmasked) {
            if (isOwn) {
              value[symToStringTag] = tag;
            } else {
              delete value[symToStringTag];
            }
          }
          return result2;
        }
        __name(getRawTag, "getRawTag");
        var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
          if (object == null) {
            return [];
          }
          object = Object2(object);
          return arrayFilter(nativeGetSymbols(object), function(symbol) {
            return propertyIsEnumerable.call(object, symbol);
          });
        };
        var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
          var result2 = [];
          while (object) {
            arrayPush(result2, getSymbols(object));
            object = getPrototype(object);
          }
          return result2;
        };
        var getTag = baseGetTag;
        if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
          getTag = /* @__PURE__ */ __name(function(value) {
            var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
            if (ctorString) {
              switch (ctorString) {
                case dataViewCtorString:
                  return dataViewTag;
                case mapCtorString:
                  return mapTag;
                case promiseCtorString:
                  return promiseTag;
                case setCtorString:
                  return setTag;
                case weakMapCtorString:
                  return weakMapTag;
              }
            }
            return result2;
          }, "getTag");
        }
        function getView(start, end, transforms) {
          var index = -1, length = transforms.length;
          while (++index < length) {
            var data = transforms[index], size2 = data.size;
            switch (data.type) {
              case "drop":
                start += size2;
                break;
              case "dropRight":
                end -= size2;
                break;
              case "take":
                end = nativeMin(end, start + size2);
                break;
              case "takeRight":
                start = nativeMax(start, end - size2);
                break;
            }
          }
          return { "start": start, "end": end };
        }
        __name(getView, "getView");
        function getWrapDetails(source) {
          var match = source.match(reWrapDetails);
          return match ? match[1].split(reSplitDetails) : [];
        }
        __name(getWrapDetails, "getWrapDetails");
        function hasPath(object, path, hasFunc) {
          path = castPath(path, object);
          var index = -1, length = path.length, result2 = false;
          while (++index < length) {
            var key = toKey(path[index]);
            if (!(result2 = object != null && hasFunc(object, key))) {
              break;
            }
            object = object[key];
          }
          if (result2 || ++index != length) {
            return result2;
          }
          length = object == null ? 0 : object.length;
          return !!length && isLength(length) && isIndex(key, length) && (isArray3(object) || isArguments(object));
        }
        __name(hasPath, "hasPath");
        function initCloneArray(array) {
          var length = array.length, result2 = new array.constructor(length);
          if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
            result2.index = array.index;
            result2.input = array.input;
          }
          return result2;
        }
        __name(initCloneArray, "initCloneArray");
        function initCloneObject(object) {
          return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
        }
        __name(initCloneObject, "initCloneObject");
        function initCloneByTag(object, tag, isDeep) {
          var Ctor = object.constructor;
          switch (tag) {
            case arrayBufferTag:
              return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
              return new Ctor(+object);
            case dataViewTag:
              return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
              return cloneTypedArray(object, isDeep);
            case mapTag:
              return new Ctor();
            case numberTag:
            case stringTag:
              return new Ctor(object);
            case regexpTag:
              return cloneRegExp(object);
            case setTag:
              return new Ctor();
            case symbolTag:
              return cloneSymbol(object);
          }
        }
        __name(initCloneByTag, "initCloneByTag");
        function insertWrapDetails(source, details) {
          var length = details.length;
          if (!length) {
            return source;
          }
          var lastIndex = length - 1;
          details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
          details = details.join(length > 2 ? ", " : " ");
          return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
        }
        __name(insertWrapDetails, "insertWrapDetails");
        function isFlattenable(value) {
          return isArray3(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
        }
        __name(isFlattenable, "isFlattenable");
        function isIndex(value, length) {
          var type = typeof value;
          length = length == null ? MAX_SAFE_INTEGER : length;
          return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
        }
        __name(isIndex, "isIndex");
        function isIterateeCall(value, index, object) {
          if (!isObject2(object)) {
            return false;
          }
          var type = typeof index;
          if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
            return eq(object[index], value);
          }
          return false;
        }
        __name(isIterateeCall, "isIterateeCall");
        function isKey(value, object) {
          if (isArray3(value)) {
            return false;
          }
          var type = typeof value;
          if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
            return true;
          }
          return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
        }
        __name(isKey, "isKey");
        function isKeyable(value) {
          var type = typeof value;
          return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
        }
        __name(isKeyable, "isKeyable");
        function isLaziable(func) {
          var funcName = getFuncName(func), other = lodash[funcName];
          if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
            return false;
          }
          if (func === other) {
            return true;
          }
          var data = getData(other);
          return !!data && func === data[0];
        }
        __name(isLaziable, "isLaziable");
        function isMasked(func) {
          return !!maskSrcKey && maskSrcKey in func;
        }
        __name(isMasked, "isMasked");
        var isMaskable = coreJsData ? isFunction2 : stubFalse;
        function isPrototype(value) {
          var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
          return value === proto;
        }
        __name(isPrototype, "isPrototype");
        function isStrictComparable(value) {
          return value === value && !isObject2(value);
        }
        __name(isStrictComparable, "isStrictComparable");
        function matchesStrictComparable(key, srcValue) {
          return function(object) {
            if (object == null) {
              return false;
            }
            return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
          };
        }
        __name(matchesStrictComparable, "matchesStrictComparable");
        function memoizeCapped(func) {
          var result2 = memoize(func, function(key) {
            if (cache.size === MAX_MEMOIZE_SIZE) {
              cache.clear();
            }
            return key;
          });
          var cache = result2.cache;
          return result2;
        }
        __name(memoizeCapped, "memoizeCapped");
        function mergeData(data, source) {
          var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
          var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
          if (!(isCommon || isCombo)) {
            return data;
          }
          if (srcBitmask & WRAP_BIND_FLAG) {
            data[2] = source[2];
            newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
          }
          var value = source[3];
          if (value) {
            var partials = data[3];
            data[3] = partials ? composeArgs(partials, value, source[4]) : value;
            data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
          }
          value = source[5];
          if (value) {
            partials = data[5];
            data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
            data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
          }
          value = source[7];
          if (value) {
            data[7] = value;
          }
          if (srcBitmask & WRAP_ARY_FLAG) {
            data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
          }
          if (data[9] == null) {
            data[9] = source[9];
          }
          data[0] = source[0];
          data[1] = newBitmask;
          return data;
        }
        __name(mergeData, "mergeData");
        function nativeKeysIn(object) {
          var result2 = [];
          if (object != null) {
            for (var key in Object2(object)) {
              result2.push(key);
            }
          }
          return result2;
        }
        __name(nativeKeysIn, "nativeKeysIn");
        function objectToString(value) {
          return nativeObjectToString.call(value);
        }
        __name(objectToString, "objectToString");
        function overRest(func, start, transform2) {
          start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
          return function() {
            var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
            while (++index < length) {
              array[index] = args[start + index];
            }
            index = -1;
            var otherArgs = Array2(start + 1);
            while (++index < start) {
              otherArgs[index] = args[index];
            }
            otherArgs[start] = transform2(array);
            return apply(func, this, otherArgs);
          };
        }
        __name(overRest, "overRest");
        function parent(object, path) {
          return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
        }
        __name(parent, "parent");
        function reorder(array, indexes) {
          var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
          while (length--) {
            var index = indexes[length];
            array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
          }
          return array;
        }
        __name(reorder, "reorder");
        function safeGet(object, key) {
          if (key === "constructor" && typeof object[key] === "function") {
            return;
          }
          if (key == "__proto__") {
            return;
          }
          return object[key];
        }
        __name(safeGet, "safeGet");
        var setData = shortOut(baseSetData);
        var setTimeout2 = ctxSetTimeout || function(func, wait) {
          return root.setTimeout(func, wait);
        };
        var setToString = shortOut(baseSetToString);
        function setWrapToString(wrapper, reference, bitmask) {
          var source = reference + "";
          return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
        }
        __name(setWrapToString, "setWrapToString");
        function shortOut(func) {
          var count = 0, lastCalled = 0;
          return function() {
            var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
            lastCalled = stamp;
            if (remaining > 0) {
              if (++count >= HOT_COUNT) {
                return arguments[0];
              }
            } else {
              count = 0;
            }
            return func.apply(undefined2, arguments);
          };
        }
        __name(shortOut, "shortOut");
        function shuffleSelf(array, size2) {
          var index = -1, length = array.length, lastIndex = length - 1;
          size2 = size2 === undefined2 ? length : size2;
          while (++index < size2) {
            var rand = baseRandom(index, lastIndex), value = array[rand];
            array[rand] = array[index];
            array[index] = value;
          }
          array.length = size2;
          return array;
        }
        __name(shuffleSelf, "shuffleSelf");
        var stringToPath = memoizeCapped(function(string) {
          var result2 = [];
          if (string.charCodeAt(0) === 46) {
            result2.push("");
          }
          string.replace(rePropName, function(match, number, quote, subString) {
            result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
          });
          return result2;
        });
        function toKey(value) {
          if (typeof value == "string" || isSymbol(value)) {
            return value;
          }
          var result2 = value + "";
          return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
        }
        __name(toKey, "toKey");
        function toSource(func) {
          if (func != null) {
            try {
              return funcToString.call(func);
            } catch (e) {
            }
            try {
              return func + "";
            } catch (e) {
            }
          }
          return "";
        }
        __name(toSource, "toSource");
        function updateWrapDetails(details, bitmask) {
          arrayEach(wrapFlags, function(pair) {
            var value = "_." + pair[0];
            if (bitmask & pair[1] && !arrayIncludes(details, value)) {
              details.push(value);
            }
          });
          return details.sort();
        }
        __name(updateWrapDetails, "updateWrapDetails");
        function wrapperClone(wrapper) {
          if (wrapper instanceof LazyWrapper) {
            return wrapper.clone();
          }
          var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
          result2.__actions__ = copyArray(wrapper.__actions__);
          result2.__index__ = wrapper.__index__;
          result2.__values__ = wrapper.__values__;
          return result2;
        }
        __name(wrapperClone, "wrapperClone");
        function chunk(array, size2, guard) {
          if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
            size2 = 1;
          } else {
            size2 = nativeMax(toInteger(size2), 0);
          }
          var length = array == null ? 0 : array.length;
          if (!length || size2 < 1) {
            return [];
          }
          var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
          while (index < length) {
            result2[resIndex++] = baseSlice(array, index, index += size2);
          }
          return result2;
        }
        __name(chunk, "chunk");
        function compact(array) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
          while (++index < length) {
            var value = array[index];
            if (value) {
              result2[resIndex++] = value;
            }
          }
          return result2;
        }
        __name(compact, "compact");
        function concat() {
          var length = arguments.length;
          if (!length) {
            return [];
          }
          var args = Array2(length - 1), array = arguments[0], index = length;
          while (index--) {
            args[index - 1] = arguments[index];
          }
          return arrayPush(isArray3(array) ? copyArray(array) : [array], baseFlatten(args, 1));
        }
        __name(concat, "concat");
        var difference = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
        });
        var differenceBy = baseRest(function(array, values2) {
          var iteratee2 = last(values2);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
        });
        var differenceWith = baseRest(function(array, values2) {
          var comparator = last(values2);
          if (isArrayLikeObject(comparator)) {
            comparator = undefined2;
          }
          return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
        });
        function drop(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        __name(drop, "drop");
        function dropRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        __name(dropRight, "dropRight");
        function dropRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
        }
        __name(dropRightWhile, "dropRightWhile");
        function dropWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
        }
        __name(dropWhile, "dropWhile");
        function fill(array, value, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
            start = 0;
            end = length;
          }
          return baseFill(array, value, start, end);
        }
        __name(fill, "fill");
        function findIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index);
        }
        __name(findIndex, "findIndex");
        function findLastIndex(array, predicate, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length - 1;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return baseFindIndex(array, getIteratee(predicate, 3), index, true);
        }
        __name(findLastIndex, "findLastIndex");
        function flatten(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, 1) : [];
        }
        __name(flatten, "flatten");
        function flattenDeep(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseFlatten(array, INFINITY) : [];
        }
        __name(flattenDeep, "flattenDeep");
        function flattenDepth(array, depth) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(array, depth);
        }
        __name(flattenDepth, "flattenDepth");
        function fromPairs(pairs) {
          var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
          while (++index < length) {
            var pair = pairs[index];
            result2[pair[0]] = pair[1];
          }
          return result2;
        }
        __name(fromPairs, "fromPairs");
        function head(array) {
          return array && array.length ? array[0] : undefined2;
        }
        __name(head, "head");
        function indexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = fromIndex == null ? 0 : toInteger(fromIndex);
          if (index < 0) {
            index = nativeMax(length + index, 0);
          }
          return baseIndexOf(array, value, index);
        }
        __name(indexOf, "indexOf");
        function initial(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 0, -1) : [];
        }
        __name(initial, "initial");
        var intersection = baseRest(function(arrays) {
          var mapped = arrayMap(arrays, castArrayLikeObject);
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
        });
        var intersectionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          if (iteratee2 === last(mapped)) {
            iteratee2 = undefined2;
          } else {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
        });
        var intersectionWith = baseRest(function(arrays) {
          var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          if (comparator) {
            mapped.pop();
          }
          return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
        });
        function join(array, separator) {
          return array == null ? "" : nativeJoin.call(array, separator);
        }
        __name(join, "join");
        function last(array) {
          var length = array == null ? 0 : array.length;
          return length ? array[length - 1] : undefined2;
        }
        __name(last, "last");
        function lastIndexOf(array, value, fromIndex) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return -1;
          }
          var index = length;
          if (fromIndex !== undefined2) {
            index = toInteger(fromIndex);
            index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
          }
          return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
        }
        __name(lastIndexOf, "lastIndexOf");
        function nth(array, n) {
          return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
        }
        __name(nth, "nth");
        var pull = baseRest(pullAll);
        function pullAll(array, values2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
        }
        __name(pullAll, "pullAll");
        function pullAllBy(array, values2, iteratee2) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
        }
        __name(pullAllBy, "pullAllBy");
        function pullAllWith(array, values2, comparator) {
          return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
        }
        __name(pullAllWith, "pullAllWith");
        var pullAt = flatRest(function(array, indexes) {
          var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
          basePullAt(array, arrayMap(indexes, function(index) {
            return isIndex(index, length) ? +index : index;
          }).sort(compareAscending));
          return result2;
        });
        function remove(array, predicate) {
          var result2 = [];
          if (!(array && array.length)) {
            return result2;
          }
          var index = -1, indexes = [], length = array.length;
          predicate = getIteratee(predicate, 3);
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result2.push(value);
              indexes.push(index);
            }
          }
          basePullAt(array, indexes);
          return result2;
        }
        __name(remove, "remove");
        function reverse(array) {
          return array == null ? array : nativeReverse.call(array);
        }
        __name(reverse, "reverse");
        function slice(array, start, end) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
            start = 0;
            end = length;
          } else {
            start = start == null ? 0 : toInteger(start);
            end = end === undefined2 ? length : toInteger(end);
          }
          return baseSlice(array, start, end);
        }
        __name(slice, "slice");
        function sortedIndex(array, value) {
          return baseSortedIndex(array, value);
        }
        __name(sortedIndex, "sortedIndex");
        function sortedIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
        }
        __name(sortedIndexBy, "sortedIndexBy");
        function sortedIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value);
            if (index < length && eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(sortedIndexOf, "sortedIndexOf");
        function sortedLastIndex(array, value) {
          return baseSortedIndex(array, value, true);
        }
        __name(sortedLastIndex, "sortedLastIndex");
        function sortedLastIndexBy(array, value, iteratee2) {
          return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
        }
        __name(sortedLastIndexBy, "sortedLastIndexBy");
        function sortedLastIndexOf(array, value) {
          var length = array == null ? 0 : array.length;
          if (length) {
            var index = baseSortedIndex(array, value, true) - 1;
            if (eq(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        __name(sortedLastIndexOf, "sortedLastIndexOf");
        function sortedUniq(array) {
          return array && array.length ? baseSortedUniq(array) : [];
        }
        __name(sortedUniq, "sortedUniq");
        function sortedUniqBy(array, iteratee2) {
          return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        __name(sortedUniqBy, "sortedUniqBy");
        function tail(array) {
          var length = array == null ? 0 : array.length;
          return length ? baseSlice(array, 1, length) : [];
        }
        __name(tail, "tail");
        function take(array, n, guard) {
          if (!(array && array.length)) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          return baseSlice(array, 0, n < 0 ? 0 : n);
        }
        __name(take, "take");
        function takeRight(array, n, guard) {
          var length = array == null ? 0 : array.length;
          if (!length) {
            return [];
          }
          n = guard || n === undefined2 ? 1 : toInteger(n);
          n = length - n;
          return baseSlice(array, n < 0 ? 0 : n, length);
        }
        __name(takeRight, "takeRight");
        function takeRightWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
        }
        __name(takeRightWhile, "takeRightWhile");
        function takeWhile(array, predicate) {
          return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
        }
        __name(takeWhile, "takeWhile");
        var union = baseRest(function(arrays) {
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
        });
        var unionBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
        });
        var unionWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
        });
        function uniq(array) {
          return array && array.length ? baseUniq(array) : [];
        }
        __name(uniq, "uniq");
        function uniqBy(array, iteratee2) {
          return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
        }
        __name(uniqBy, "uniqBy");
        function uniqWith(array, comparator) {
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return array && array.length ? baseUniq(array, undefined2, comparator) : [];
        }
        __name(uniqWith, "uniqWith");
        function unzip(array) {
          if (!(array && array.length)) {
            return [];
          }
          var length = 0;
          array = arrayFilter(array, function(group) {
            if (isArrayLikeObject(group)) {
              length = nativeMax(group.length, length);
              return true;
            }
          });
          return baseTimes(length, function(index) {
            return arrayMap(array, baseProperty(index));
          });
        }
        __name(unzip, "unzip");
        function unzipWith(array, iteratee2) {
          if (!(array && array.length)) {
            return [];
          }
          var result2 = unzip(array);
          if (iteratee2 == null) {
            return result2;
          }
          return arrayMap(result2, function(group) {
            return apply(iteratee2, undefined2, group);
          });
        }
        __name(unzipWith, "unzipWith");
        var without = baseRest(function(array, values2) {
          return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
        });
        var xor = baseRest(function(arrays) {
          return baseXor(arrayFilter(arrays, isArrayLikeObject));
        });
        var xorBy = baseRest(function(arrays) {
          var iteratee2 = last(arrays);
          if (isArrayLikeObject(iteratee2)) {
            iteratee2 = undefined2;
          }
          return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
        });
        var xorWith = baseRest(function(arrays) {
          var comparator = last(arrays);
          comparator = typeof comparator == "function" ? comparator : undefined2;
          return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
        });
        var zip = baseRest(unzip);
        function zipObject(props, values2) {
          return baseZipObject(props || [], values2 || [], assignValue);
        }
        __name(zipObject, "zipObject");
        function zipObjectDeep(props, values2) {
          return baseZipObject(props || [], values2 || [], baseSet);
        }
        __name(zipObjectDeep, "zipObjectDeep");
        var zipWith = baseRest(function(arrays) {
          var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
          iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
          return unzipWith(arrays, iteratee2);
        });
        function chain(value) {
          var result2 = lodash(value);
          result2.__chain__ = true;
          return result2;
        }
        __name(chain, "chain");
        function tap(value, interceptor) {
          interceptor(value);
          return value;
        }
        __name(tap, "tap");
        function thru(value, interceptor) {
          return interceptor(value);
        }
        __name(thru, "thru");
        var wrapperAt = flatRest(function(paths) {
          var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = /* @__PURE__ */ __name(function(object) {
            return baseAt(object, paths);
          }, "interceptor");
          if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
            return this.thru(interceptor);
          }
          value = value.slice(start, +start + (length ? 1 : 0));
          value.__actions__.push({
            "func": thru,
            "args": [interceptor],
            "thisArg": undefined2
          });
          return new LodashWrapper(value, this.__chain__).thru(function(array) {
            if (length && !array.length) {
              array.push(undefined2);
            }
            return array;
          });
        });
        function wrapperChain() {
          return chain(this);
        }
        __name(wrapperChain, "wrapperChain");
        function wrapperCommit() {
          return new LodashWrapper(this.value(), this.__chain__);
        }
        __name(wrapperCommit, "wrapperCommit");
        function wrapperNext() {
          if (this.__values__ === undefined2) {
            this.__values__ = toArray(this.value());
          }
          var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
          return { "done": done, "value": value };
        }
        __name(wrapperNext, "wrapperNext");
        function wrapperToIterator() {
          return this;
        }
        __name(wrapperToIterator, "wrapperToIterator");
        function wrapperPlant(value) {
          var result2, parent2 = this;
          while (parent2 instanceof baseLodash) {
            var clone2 = wrapperClone(parent2);
            clone2.__index__ = 0;
            clone2.__values__ = undefined2;
            if (result2) {
              previous.__wrapped__ = clone2;
            } else {
              result2 = clone2;
            }
            var previous = clone2;
            parent2 = parent2.__wrapped__;
          }
          previous.__wrapped__ = value;
          return result2;
        }
        __name(wrapperPlant, "wrapperPlant");
        function wrapperReverse() {
          var value = this.__wrapped__;
          if (value instanceof LazyWrapper) {
            var wrapped = value;
            if (this.__actions__.length) {
              wrapped = new LazyWrapper(this);
            }
            wrapped = wrapped.reverse();
            wrapped.__actions__.push({
              "func": thru,
              "args": [reverse],
              "thisArg": undefined2
            });
            return new LodashWrapper(wrapped, this.__chain__);
          }
          return this.thru(reverse);
        }
        __name(wrapperReverse, "wrapperReverse");
        function wrapperValue() {
          return baseWrapperValue(this.__wrapped__, this.__actions__);
        }
        __name(wrapperValue, "wrapperValue");
        var countBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            ++result2[key];
          } else {
            baseAssignValue(result2, key, 1);
          }
        });
        function every(collection, predicate, guard) {
          var func = isArray3(collection) ? arrayEvery : baseEvery;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        __name(every, "every");
        function filter(collection, predicate) {
          var func = isArray3(collection) ? arrayFilter : baseFilter;
          return func(collection, getIteratee(predicate, 3));
        }
        __name(filter, "filter");
        var find = createFind(findIndex);
        var findLast = createFind(findLastIndex);
        function flatMap(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), 1);
        }
        __name(flatMap, "flatMap");
        function flatMapDeep(collection, iteratee2) {
          return baseFlatten(map(collection, iteratee2), INFINITY);
        }
        __name(flatMapDeep, "flatMapDeep");
        function flatMapDepth(collection, iteratee2, depth) {
          depth = depth === undefined2 ? 1 : toInteger(depth);
          return baseFlatten(map(collection, iteratee2), depth);
        }
        __name(flatMapDepth, "flatMapDepth");
        function forEach(collection, iteratee2) {
          var func = isArray3(collection) ? arrayEach : baseEach;
          return func(collection, getIteratee(iteratee2, 3));
        }
        __name(forEach, "forEach");
        function forEachRight(collection, iteratee2) {
          var func = isArray3(collection) ? arrayEachRight : baseEachRight;
          return func(collection, getIteratee(iteratee2, 3));
        }
        __name(forEachRight, "forEachRight");
        var groupBy = createAggregator(function(result2, value, key) {
          if (hasOwnProperty.call(result2, key)) {
            result2[key].push(value);
          } else {
            baseAssignValue(result2, key, [value]);
          }
        });
        function includes(collection, value, fromIndex, guard) {
          collection = isArrayLike(collection) ? collection : values(collection);
          fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
          var length = collection.length;
          if (fromIndex < 0) {
            fromIndex = nativeMax(length + fromIndex, 0);
          }
          return isString2(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
        }
        __name(includes, "includes");
        var invokeMap = baseRest(function(collection, path, args) {
          var index = -1, isFunc = typeof path == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
          baseEach(collection, function(value) {
            result2[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
          });
          return result2;
        });
        var keyBy = createAggregator(function(result2, value, key) {
          baseAssignValue(result2, key, value);
        });
        function map(collection, iteratee2) {
          var func = isArray3(collection) ? arrayMap : baseMap;
          return func(collection, getIteratee(iteratee2, 3));
        }
        __name(map, "map");
        function orderBy(collection, iteratees, orders, guard) {
          if (collection == null) {
            return [];
          }
          if (!isArray3(iteratees)) {
            iteratees = iteratees == null ? [] : [iteratees];
          }
          orders = guard ? undefined2 : orders;
          if (!isArray3(orders)) {
            orders = orders == null ? [] : [orders];
          }
          return baseOrderBy(collection, iteratees, orders);
        }
        __name(orderBy, "orderBy");
        var partition = createAggregator(function(result2, value, key) {
          result2[key ? 0 : 1].push(value);
        }, function() {
          return [[], []];
        });
        function reduce(collection, iteratee2, accumulator) {
          var func = isArray3(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
        }
        __name(reduce, "reduce");
        function reduceRight(collection, iteratee2, accumulator) {
          var func = isArray3(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
          return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
        }
        __name(reduceRight, "reduceRight");
        function reject(collection, predicate) {
          var func = isArray3(collection) ? arrayFilter : baseFilter;
          return func(collection, negate(getIteratee(predicate, 3)));
        }
        __name(reject, "reject");
        function sample(collection) {
          var func = isArray3(collection) ? arraySample : baseSample;
          return func(collection);
        }
        __name(sample, "sample");
        function sampleSize(collection, n, guard) {
          if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          var func = isArray3(collection) ? arraySampleSize : baseSampleSize;
          return func(collection, n);
        }
        __name(sampleSize, "sampleSize");
        function shuffle(collection) {
          var func = isArray3(collection) ? arrayShuffle : baseShuffle;
          return func(collection);
        }
        __name(shuffle, "shuffle");
        function size(collection) {
          if (collection == null) {
            return 0;
          }
          if (isArrayLike(collection)) {
            return isString2(collection) ? stringSize(collection) : collection.length;
          }
          var tag = getTag(collection);
          if (tag == mapTag || tag == setTag) {
            return collection.size;
          }
          return baseKeys(collection).length;
        }
        __name(size, "size");
        function some(collection, predicate, guard) {
          var func = isArray3(collection) ? arraySome : baseSome;
          if (guard && isIterateeCall(collection, predicate, guard)) {
            predicate = undefined2;
          }
          return func(collection, getIteratee(predicate, 3));
        }
        __name(some, "some");
        var sortBy = baseRest(function(collection, iteratees) {
          if (collection == null) {
            return [];
          }
          var length = iteratees.length;
          if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
            iteratees = [];
          } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
            iteratees = [iteratees[0]];
          }
          return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
        });
        var now = ctxNow || function() {
          return root.Date.now();
        };
        function after(n, func) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n < 1) {
              return func.apply(this, arguments);
            }
          };
        }
        __name(after, "after");
        function ary(func, n, guard) {
          n = guard ? undefined2 : n;
          n = func && n == null ? func.length : n;
          return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
        }
        __name(ary, "ary");
        function before(n, func) {
          var result2;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          n = toInteger(n);
          return function() {
            if (--n > 0) {
              result2 = func.apply(this, arguments);
            }
            if (n <= 1) {
              func = undefined2;
            }
            return result2;
          };
        }
        __name(before, "before");
        var bind = baseRest(function(func, thisArg, partials) {
          var bitmask = WRAP_BIND_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bind));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(func, bitmask, thisArg, partials, holders);
        });
        var bindKey = baseRest(function(object, key, partials) {
          var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
          if (partials.length) {
            var holders = replaceHolders(partials, getHolder(bindKey));
            bitmask |= WRAP_PARTIAL_FLAG;
          }
          return createWrap(key, bitmask, object, partials, holders);
        });
        function curry(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curry.placeholder;
          return result2;
        }
        __name(curry, "curry");
        function curryRight(func, arity, guard) {
          arity = guard ? undefined2 : arity;
          var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
          result2.placeholder = curryRight.placeholder;
          return result2;
        }
        __name(curryRight, "curryRight");
        function debounce(func, wait, options) {
          var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          wait = toNumber(wait) || 0;
          if (isObject2(options)) {
            leading = !!options.leading;
            maxing = "maxWait" in options;
            maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          function invokeFunc(time) {
            var args = lastArgs, thisArg = lastThis;
            lastArgs = lastThis = undefined2;
            lastInvokeTime = time;
            result2 = func.apply(thisArg, args);
            return result2;
          }
          __name(invokeFunc, "invokeFunc");
          function leadingEdge(time) {
            lastInvokeTime = time;
            timerId = setTimeout2(timerExpired, wait);
            return leading ? invokeFunc(time) : result2;
          }
          __name(leadingEdge, "leadingEdge");
          function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
            return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
          }
          __name(remainingWait, "remainingWait");
          function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
            return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
          }
          __name(shouldInvoke, "shouldInvoke");
          function timerExpired() {
            var time = now();
            if (shouldInvoke(time)) {
              return trailingEdge(time);
            }
            timerId = setTimeout2(timerExpired, remainingWait(time));
          }
          __name(timerExpired, "timerExpired");
          function trailingEdge(time) {
            timerId = undefined2;
            if (trailing && lastArgs) {
              return invokeFunc(time);
            }
            lastArgs = lastThis = undefined2;
            return result2;
          }
          __name(trailingEdge, "trailingEdge");
          function cancel() {
            if (timerId !== undefined2) {
              clearTimeout2(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined2;
          }
          __name(cancel, "cancel");
          function flush() {
            return timerId === undefined2 ? result2 : trailingEdge(now());
          }
          __name(flush, "flush");
          function debounced() {
            var time = now(), isInvoking = shouldInvoke(time);
            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;
            if (isInvoking) {
              if (timerId === undefined2) {
                return leadingEdge(lastCallTime);
              }
              if (maxing) {
                clearTimeout2(timerId);
                timerId = setTimeout2(timerExpired, wait);
                return invokeFunc(lastCallTime);
              }
            }
            if (timerId === undefined2) {
              timerId = setTimeout2(timerExpired, wait);
            }
            return result2;
          }
          __name(debounced, "debounced");
          debounced.cancel = cancel;
          debounced.flush = flush;
          return debounced;
        }
        __name(debounce, "debounce");
        var defer = baseRest(function(func, args) {
          return baseDelay(func, 1, args);
        });
        var delay = baseRest(function(func, wait, args) {
          return baseDelay(func, toNumber(wait) || 0, args);
        });
        function flip(func) {
          return createWrap(func, WRAP_FLIP_FLAG);
        }
        __name(flip, "flip");
        function memoize(func, resolver) {
          if (typeof func != "function" || resolver != null && typeof resolver != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          var memoized = /* @__PURE__ */ __name(function() {
            var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
            if (cache.has(key)) {
              return cache.get(key);
            }
            var result2 = func.apply(this, args);
            memoized.cache = cache.set(key, result2) || cache;
            return result2;
          }, "memoized");
          memoized.cache = new (memoize.Cache || MapCache)();
          return memoized;
        }
        __name(memoize, "memoize");
        memoize.Cache = MapCache;
        function negate(predicate) {
          if (typeof predicate != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          return function() {
            var args = arguments;
            switch (args.length) {
              case 0:
                return !predicate.call(this);
              case 1:
                return !predicate.call(this, args[0]);
              case 2:
                return !predicate.call(this, args[0], args[1]);
              case 3:
                return !predicate.call(this, args[0], args[1], args[2]);
            }
            return !predicate.apply(this, args);
          };
        }
        __name(negate, "negate");
        function once(func) {
          return before(2, func);
        }
        __name(once, "once");
        var overArgs = castRest(function(func, transforms) {
          transforms = transforms.length == 1 && isArray3(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
          var funcsLength = transforms.length;
          return baseRest(function(args) {
            var index = -1, length = nativeMin(args.length, funcsLength);
            while (++index < length) {
              args[index] = transforms[index].call(this, args[index]);
            }
            return apply(func, this, args);
          });
        });
        var partial = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partial));
          return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
        });
        var partialRight = baseRest(function(func, partials) {
          var holders = replaceHolders(partials, getHolder(partialRight));
          return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
        });
        var rearg = flatRest(function(func, indexes) {
          return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
        });
        function rest(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start === undefined2 ? start : toInteger(start);
          return baseRest(func, start);
        }
        __name(rest, "rest");
        function spread(func, start) {
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          start = start == null ? 0 : nativeMax(toInteger(start), 0);
          return baseRest(function(args) {
            var array = args[start], otherArgs = castSlice(args, 0, start);
            if (array) {
              arrayPush(otherArgs, array);
            }
            return apply(func, this, otherArgs);
          });
        }
        __name(spread, "spread");
        function throttle(func, wait, options) {
          var leading = true, trailing = true;
          if (typeof func != "function") {
            throw new TypeError2(FUNC_ERROR_TEXT);
          }
          if (isObject2(options)) {
            leading = "leading" in options ? !!options.leading : leading;
            trailing = "trailing" in options ? !!options.trailing : trailing;
          }
          return debounce(func, wait, {
            "leading": leading,
            "maxWait": wait,
            "trailing": trailing
          });
        }
        __name(throttle, "throttle");
        function unary(func) {
          return ary(func, 1);
        }
        __name(unary, "unary");
        function wrap(value, wrapper) {
          return partial(castFunction(wrapper), value);
        }
        __name(wrap, "wrap");
        function castArray() {
          if (!arguments.length) {
            return [];
          }
          var value = arguments[0];
          return isArray3(value) ? value : [value];
        }
        __name(castArray, "castArray");
        function clone(value) {
          return baseClone(value, CLONE_SYMBOLS_FLAG);
        }
        __name(clone, "clone");
        function cloneWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
        }
        __name(cloneWith, "cloneWith");
        function cloneDeep(value) {
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
        }
        __name(cloneDeep, "cloneDeep");
        function cloneDeepWith(value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
        }
        __name(cloneDeepWith, "cloneDeepWith");
        function conformsTo(object, source) {
          return source == null || baseConformsTo(object, source, keys(source));
        }
        __name(conformsTo, "conformsTo");
        function eq(value, other) {
          return value === other || value !== value && other !== other;
        }
        __name(eq, "eq");
        var gt = createRelationalOperation(baseGt);
        var gte = createRelationalOperation(function(value, other) {
          return value >= other;
        });
        var isArguments = baseIsArguments(/* @__PURE__ */ function() {
          return arguments;
        }()) ? baseIsArguments : function(value) {
          return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
        };
        var isArray3 = Array2.isArray;
        var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
        function isArrayLike(value) {
          return value != null && isLength(value.length) && !isFunction2(value);
        }
        __name(isArrayLike, "isArrayLike");
        function isArrayLikeObject(value) {
          return isObjectLike(value) && isArrayLike(value);
        }
        __name(isArrayLikeObject, "isArrayLikeObject");
        function isBoolean(value) {
          return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
        }
        __name(isBoolean, "isBoolean");
        var isBuffer = nativeIsBuffer || stubFalse;
        var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
        function isElement(value) {
          return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
        }
        __name(isElement, "isElement");
        function isEmpty(value) {
          if (value == null) {
            return true;
          }
          if (isArrayLike(value) && (isArray3(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
            return !value.length;
          }
          var tag = getTag(value);
          if (tag == mapTag || tag == setTag) {
            return !value.size;
          }
          if (isPrototype(value)) {
            return !baseKeys(value).length;
          }
          for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        __name(isEmpty, "isEmpty");
        function isEqual(value, other) {
          return baseIsEqual(value, other);
        }
        __name(isEqual, "isEqual");
        function isEqualWith(value, other, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          var result2 = customizer ? customizer(value, other) : undefined2;
          return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
        }
        __name(isEqualWith, "isEqualWith");
        function isError(value) {
          if (!isObjectLike(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
        }
        __name(isError, "isError");
        function isFinite2(value) {
          return typeof value == "number" && nativeIsFinite(value);
        }
        __name(isFinite2, "isFinite");
        function isFunction2(value) {
          if (!isObject2(value)) {
            return false;
          }
          var tag = baseGetTag(value);
          return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
        }
        __name(isFunction2, "isFunction");
        function isInteger(value) {
          return typeof value == "number" && value == toInteger(value);
        }
        __name(isInteger, "isInteger");
        function isLength(value) {
          return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
        }
        __name(isLength, "isLength");
        function isObject2(value) {
          var type = typeof value;
          return value != null && (type == "object" || type == "function");
        }
        __name(isObject2, "isObject");
        function isObjectLike(value) {
          return value != null && typeof value == "object";
        }
        __name(isObjectLike, "isObjectLike");
        var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
        function isMatch(object, source) {
          return object === source || baseIsMatch(object, source, getMatchData(source));
        }
        __name(isMatch, "isMatch");
        function isMatchWith(object, source, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return baseIsMatch(object, source, getMatchData(source), customizer);
        }
        __name(isMatchWith, "isMatchWith");
        function isNaN2(value) {
          return isNumber2(value) && value != +value;
        }
        __name(isNaN2, "isNaN");
        function isNative(value) {
          if (isMaskable(value)) {
            throw new Error2(CORE_ERROR_TEXT);
          }
          return baseIsNative(value);
        }
        __name(isNative, "isNative");
        function isNull(value) {
          return value === null;
        }
        __name(isNull, "isNull");
        function isNil(value) {
          return value == null;
        }
        __name(isNil, "isNil");
        function isNumber2(value) {
          return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
        }
        __name(isNumber2, "isNumber");
        function isPlainObject(value) {
          if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
            return false;
          }
          var proto = getPrototype(value);
          if (proto === null) {
            return true;
          }
          var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
          return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
        }
        __name(isPlainObject, "isPlainObject");
        var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
        function isSafeInteger(value) {
          return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
        }
        __name(isSafeInteger, "isSafeInteger");
        var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
        function isString2(value) {
          return typeof value == "string" || !isArray3(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
        }
        __name(isString2, "isString");
        function isSymbol(value) {
          return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
        }
        __name(isSymbol, "isSymbol");
        var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
        function isUndefined(value) {
          return value === undefined2;
        }
        __name(isUndefined, "isUndefined");
        function isWeakMap(value) {
          return isObjectLike(value) && getTag(value) == weakMapTag;
        }
        __name(isWeakMap, "isWeakMap");
        function isWeakSet(value) {
          return isObjectLike(value) && baseGetTag(value) == weakSetTag;
        }
        __name(isWeakSet, "isWeakSet");
        var lt = createRelationalOperation(baseLt);
        var lte = createRelationalOperation(function(value, other) {
          return value <= other;
        });
        function toArray(value) {
          if (!value) {
            return [];
          }
          if (isArrayLike(value)) {
            return isString2(value) ? stringToArray(value) : copyArray(value);
          }
          if (symIterator && value[symIterator]) {
            return iteratorToArray(value[symIterator]());
          }
          var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
          return func(value);
        }
        __name(toArray, "toArray");
        function toFinite(value) {
          if (!value) {
            return value === 0 ? value : 0;
          }
          value = toNumber(value);
          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }
          return value === value ? value : 0;
        }
        __name(toFinite, "toFinite");
        function toInteger(value) {
          var result2 = toFinite(value), remainder = result2 % 1;
          return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
        }
        __name(toInteger, "toInteger");
        function toLength(value) {
          return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
        }
        __name(toLength, "toLength");
        function toNumber(value) {
          if (typeof value == "number") {
            return value;
          }
          if (isSymbol(value)) {
            return NAN;
          }
          if (isObject2(value)) {
            var other = typeof value.valueOf == "function" ? value.valueOf() : value;
            value = isObject2(other) ? other + "" : other;
          }
          if (typeof value != "string") {
            return value === 0 ? value : +value;
          }
          value = baseTrim(value);
          var isBinary = reIsBinary.test(value);
          return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
        }
        __name(toNumber, "toNumber");
        function toPlainObject(value) {
          return copyObject(value, keysIn(value));
        }
        __name(toPlainObject, "toPlainObject");
        function toSafeInteger(value) {
          return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
        }
        __name(toSafeInteger, "toSafeInteger");
        function toString(value) {
          return value == null ? "" : baseToString(value);
        }
        __name(toString, "toString");
        var assign = createAssigner(function(object, source) {
          if (isPrototype(source) || isArrayLike(source)) {
            copyObject(source, keys(source), object);
            return;
          }
          for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
              assignValue(object, key, source[key]);
            }
          }
        });
        var assignIn = createAssigner(function(object, source) {
          copyObject(source, keysIn(source), object);
        });
        var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keysIn(source), object, customizer);
        });
        var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
          copyObject(source, keys(source), object, customizer);
        });
        var at = flatRest(baseAt);
        function create(prototype, properties) {
          var result2 = baseCreate(prototype);
          return properties == null ? result2 : baseAssign(result2, properties);
        }
        __name(create, "create");
        var defaults = baseRest(function(object, sources) {
          object = Object2(object);
          var index = -1;
          var length = sources.length;
          var guard = length > 2 ? sources[2] : undefined2;
          if (guard && isIterateeCall(sources[0], sources[1], guard)) {
            length = 1;
          }
          while (++index < length) {
            var source = sources[index];
            var props = keysIn(source);
            var propsIndex = -1;
            var propsLength = props.length;
            while (++propsIndex < propsLength) {
              var key = props[propsIndex];
              var value = object[key];
              if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                object[key] = source[key];
              }
            }
          }
          return object;
        });
        var defaultsDeep = baseRest(function(args) {
          args.push(undefined2, customDefaultsMerge);
          return apply(mergeWith, undefined2, args);
        });
        function findKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
        }
        __name(findKey, "findKey");
        function findLastKey(object, predicate) {
          return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
        }
        __name(findLastKey, "findLastKey");
        function forIn(object, iteratee2) {
          return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
        }
        __name(forIn, "forIn");
        function forInRight(object, iteratee2) {
          return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
        }
        __name(forInRight, "forInRight");
        function forOwn(object, iteratee2) {
          return object && baseForOwn(object, getIteratee(iteratee2, 3));
        }
        __name(forOwn, "forOwn");
        function forOwnRight(object, iteratee2) {
          return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
        }
        __name(forOwnRight, "forOwnRight");
        function functions(object) {
          return object == null ? [] : baseFunctions(object, keys(object));
        }
        __name(functions, "functions");
        function functionsIn(object) {
          return object == null ? [] : baseFunctions(object, keysIn(object));
        }
        __name(functionsIn, "functionsIn");
        function get(object, path, defaultValue) {
          var result2 = object == null ? undefined2 : baseGet(object, path);
          return result2 === undefined2 ? defaultValue : result2;
        }
        __name(get, "get");
        function has(object, path) {
          return object != null && hasPath(object, path, baseHas);
        }
        __name(has, "has");
        function hasIn(object, path) {
          return object != null && hasPath(object, path, baseHasIn);
        }
        __name(hasIn, "hasIn");
        var invert = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          result2[value] = key;
        }, constant(identity));
        var invertBy = createInverter(function(result2, value, key) {
          if (value != null && typeof value.toString != "function") {
            value = nativeObjectToString.call(value);
          }
          if (hasOwnProperty.call(result2, value)) {
            result2[value].push(key);
          } else {
            result2[value] = [key];
          }
        }, getIteratee);
        var invoke = baseRest(baseInvoke);
        function keys(object) {
          return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
        }
        __name(keys, "keys");
        function keysIn(object) {
          return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
        }
        __name(keysIn, "keysIn");
        function mapKeys(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, iteratee2(value, key, object2), value);
          });
          return result2;
        }
        __name(mapKeys, "mapKeys");
        function mapValues(object, iteratee2) {
          var result2 = {};
          iteratee2 = getIteratee(iteratee2, 3);
          baseForOwn(object, function(value, key, object2) {
            baseAssignValue(result2, key, iteratee2(value, key, object2));
          });
          return result2;
        }
        __name(mapValues, "mapValues");
        var merge = createAssigner(function(object, source, srcIndex) {
          baseMerge(object, source, srcIndex);
        });
        var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
          baseMerge(object, source, srcIndex, customizer);
        });
        var omit = flatRest(function(object, paths) {
          var result2 = {};
          if (object == null) {
            return result2;
          }
          var isDeep = false;
          paths = arrayMap(paths, function(path) {
            path = castPath(path, object);
            isDeep || (isDeep = path.length > 1);
            return path;
          });
          copyObject(object, getAllKeysIn(object), result2);
          if (isDeep) {
            result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
          }
          var length = paths.length;
          while (length--) {
            baseUnset(result2, paths[length]);
          }
          return result2;
        });
        function omitBy(object, predicate) {
          return pickBy(object, negate(getIteratee(predicate)));
        }
        __name(omitBy, "omitBy");
        var pick = flatRest(function(object, paths) {
          return object == null ? {} : basePick(object, paths);
        });
        function pickBy(object, predicate) {
          if (object == null) {
            return {};
          }
          var props = arrayMap(getAllKeysIn(object), function(prop) {
            return [prop];
          });
          predicate = getIteratee(predicate);
          return basePickBy(object, props, function(value, path) {
            return predicate(value, path[0]);
          });
        }
        __name(pickBy, "pickBy");
        function result(object, path, defaultValue) {
          path = castPath(path, object);
          var index = -1, length = path.length;
          if (!length) {
            length = 1;
            object = undefined2;
          }
          while (++index < length) {
            var value = object == null ? undefined2 : object[toKey(path[index])];
            if (value === undefined2) {
              index = length;
              value = defaultValue;
            }
            object = isFunction2(value) ? value.call(object) : value;
          }
          return object;
        }
        __name(result, "result");
        function set(object, path, value) {
          return object == null ? object : baseSet(object, path, value);
        }
        __name(set, "set");
        function setWith(object, path, value, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseSet(object, path, value, customizer);
        }
        __name(setWith, "setWith");
        var toPairs = createToPairs(keys);
        var toPairsIn = createToPairs(keysIn);
        function transform(object, iteratee2, accumulator) {
          var isArr = isArray3(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
          iteratee2 = getIteratee(iteratee2, 4);
          if (accumulator == null) {
            var Ctor = object && object.constructor;
            if (isArrLike) {
              accumulator = isArr ? new Ctor() : [];
            } else if (isObject2(object)) {
              accumulator = isFunction2(Ctor) ? baseCreate(getPrototype(object)) : {};
            } else {
              accumulator = {};
            }
          }
          (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
            return iteratee2(accumulator, value, index, object2);
          });
          return accumulator;
        }
        __name(transform, "transform");
        function unset(object, path) {
          return object == null ? true : baseUnset(object, path);
        }
        __name(unset, "unset");
        function update(object, path, updater) {
          return object == null ? object : baseUpdate(object, path, castFunction(updater));
        }
        __name(update, "update");
        function updateWith(object, path, updater, customizer) {
          customizer = typeof customizer == "function" ? customizer : undefined2;
          return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
        }
        __name(updateWith, "updateWith");
        function values(object) {
          return object == null ? [] : baseValues(object, keys(object));
        }
        __name(values, "values");
        function valuesIn(object) {
          return object == null ? [] : baseValues(object, keysIn(object));
        }
        __name(valuesIn, "valuesIn");
        function clamp(number, lower, upper) {
          if (upper === undefined2) {
            upper = lower;
            lower = undefined2;
          }
          if (upper !== undefined2) {
            upper = toNumber(upper);
            upper = upper === upper ? upper : 0;
          }
          if (lower !== undefined2) {
            lower = toNumber(lower);
            lower = lower === lower ? lower : 0;
          }
          return baseClamp(toNumber(number), lower, upper);
        }
        __name(clamp, "clamp");
        function inRange(number, start, end) {
          start = toFinite(start);
          if (end === undefined2) {
            end = start;
            start = 0;
          } else {
            end = toFinite(end);
          }
          number = toNumber(number);
          return baseInRange(number, start, end);
        }
        __name(inRange, "inRange");
        function random(lower, upper, floating) {
          if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
            upper = floating = undefined2;
          }
          if (floating === undefined2) {
            if (typeof upper == "boolean") {
              floating = upper;
              upper = undefined2;
            } else if (typeof lower == "boolean") {
              floating = lower;
              lower = undefined2;
            }
          }
          if (lower === undefined2 && upper === undefined2) {
            lower = 0;
            upper = 1;
          } else {
            lower = toFinite(lower);
            if (upper === undefined2) {
              upper = lower;
              lower = 0;
            } else {
              upper = toFinite(upper);
            }
          }
          if (lower > upper) {
            var temp = lower;
            lower = upper;
            upper = temp;
          }
          if (floating || lower % 1 || upper % 1) {
            var rand = nativeRandom();
            return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
          }
          return baseRandom(lower, upper);
        }
        __name(random, "random");
        var camelCase = createCompounder(function(result2, word, index) {
          word = word.toLowerCase();
          return result2 + (index ? capitalize(word) : word);
        });
        function capitalize(string) {
          return upperFirst(toString(string).toLowerCase());
        }
        __name(capitalize, "capitalize");
        function deburr(string) {
          string = toString(string);
          return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
        }
        __name(deburr, "deburr");
        function endsWith(string, target, position) {
          string = toString(string);
          target = baseToString(target);
          var length = string.length;
          position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
          var end = position;
          position -= target.length;
          return position >= 0 && string.slice(position, end) == target;
        }
        __name(endsWith, "endsWith");
        function escape(string) {
          string = toString(string);
          return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
        }
        __name(escape, "escape");
        function escapeRegExp(string) {
          string = toString(string);
          return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
        }
        __name(escapeRegExp, "escapeRegExp");
        var kebabCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "-" : "") + word.toLowerCase();
        });
        var lowerCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toLowerCase();
        });
        var lowerFirst = createCaseFirst("toLowerCase");
        function pad(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          if (!length || strLength >= length) {
            return string;
          }
          var mid = (length - strLength) / 2;
          return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
        }
        __name(pad, "pad");
        function padEnd(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
        }
        __name(padEnd, "padEnd");
        function padStart(string, length, chars) {
          string = toString(string);
          length = toInteger(length);
          var strLength = length ? stringSize(string) : 0;
          return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
        }
        __name(padStart, "padStart");
        function parseInt2(string, radix, guard) {
          if (guard || radix == null) {
            radix = 0;
          } else if (radix) {
            radix = +radix;
          }
          return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
        }
        __name(parseInt2, "parseInt");
        function repeat(string, n, guard) {
          if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
            n = 1;
          } else {
            n = toInteger(n);
          }
          return baseRepeat(toString(string), n);
        }
        __name(repeat, "repeat");
        function replace() {
          var args = arguments, string = toString(args[0]);
          return args.length < 3 ? string : string.replace(args[1], args[2]);
        }
        __name(replace, "replace");
        var snakeCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? "_" : "") + word.toLowerCase();
        });
        function split(string, separator, limit) {
          if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
            separator = limit = undefined2;
          }
          limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
          if (!limit) {
            return [];
          }
          string = toString(string);
          if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
            separator = baseToString(separator);
            if (!separator && hasUnicode(string)) {
              return castSlice(stringToArray(string), 0, limit);
            }
          }
          return string.split(separator, limit);
        }
        __name(split, "split");
        var startCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + upperFirst(word);
        });
        function startsWith(string, target, position) {
          string = toString(string);
          position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
          target = baseToString(target);
          return string.slice(position, position + target.length) == target;
        }
        __name(startsWith, "startsWith");
        function template(string, options, guard) {
          var settings = lodash.templateSettings;
          if (guard && isIterateeCall(string, options, guard)) {
            options = undefined2;
          }
          string = toString(string);
          options = assignInWith({}, options, settings, customDefaultsAssignIn);
          var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
          var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
          var reDelimiters = RegExp2(
            (options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$",
            "g"
          );
          var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
          string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
            interpolateValue || (interpolateValue = esTemplateValue);
            source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
            if (escapeValue) {
              isEscaping = true;
              source += "' +\n__e(" + escapeValue + ") +\n'";
            }
            if (evaluateValue) {
              isEvaluating = true;
              source += "';\n" + evaluateValue + ";\n__p += '";
            }
            if (interpolateValue) {
              source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
            }
            index = offset + match.length;
            return match;
          });
          source += "';\n";
          var variable = hasOwnProperty.call(options, "variable") && options.variable;
          if (!variable) {
            source = "with (obj) {\n" + source + "\n}\n";
          } else if (reForbiddenIdentifierChars.test(variable)) {
            throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
          }
          source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
          source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
          var result2 = attempt(function() {
            return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
          });
          result2.source = source;
          if (isError(result2)) {
            throw result2;
          }
          return result2;
        }
        __name(template, "template");
        function toLower(value) {
          return toString(value).toLowerCase();
        }
        __name(toLower, "toLower");
        function toUpper(value) {
          return toString(value).toUpperCase();
        }
        __name(toUpper, "toUpper");
        function trim(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return baseTrim(string);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
          return castSlice(strSymbols, start, end).join("");
        }
        __name(trim, "trim");
        function trimEnd(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.slice(0, trimmedEndIndex(string) + 1);
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
          return castSlice(strSymbols, 0, end).join("");
        }
        __name(trimEnd, "trimEnd");
        function trimStart(string, chars, guard) {
          string = toString(string);
          if (string && (guard || chars === undefined2)) {
            return string.replace(reTrimStart, "");
          }
          if (!string || !(chars = baseToString(chars))) {
            return string;
          }
          var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
          return castSlice(strSymbols, start).join("");
        }
        __name(trimStart, "trimStart");
        function truncate(string, options) {
          var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
          if (isObject2(options)) {
            var separator = "separator" in options ? options.separator : separator;
            length = "length" in options ? toInteger(options.length) : length;
            omission = "omission" in options ? baseToString(options.omission) : omission;
          }
          string = toString(string);
          var strLength = string.length;
          if (hasUnicode(string)) {
            var strSymbols = stringToArray(string);
            strLength = strSymbols.length;
          }
          if (length >= strLength) {
            return string;
          }
          var end = length - stringSize(omission);
          if (end < 1) {
            return omission;
          }
          var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
          if (separator === undefined2) {
            return result2 + omission;
          }
          if (strSymbols) {
            end += result2.length - end;
          }
          if (isRegExp(separator)) {
            if (string.slice(end).search(separator)) {
              var match, substring = result2;
              if (!separator.global) {
                separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
              }
              separator.lastIndex = 0;
              while (match = separator.exec(substring)) {
                var newEnd = match.index;
              }
              result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
            }
          } else if (string.indexOf(baseToString(separator), end) != end) {
            var index = result2.lastIndexOf(separator);
            if (index > -1) {
              result2 = result2.slice(0, index);
            }
          }
          return result2 + omission;
        }
        __name(truncate, "truncate");
        function unescape(string) {
          string = toString(string);
          return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
        }
        __name(unescape, "unescape");
        var upperCase = createCompounder(function(result2, word, index) {
          return result2 + (index ? " " : "") + word.toUpperCase();
        });
        var upperFirst = createCaseFirst("toUpperCase");
        function words(string, pattern, guard) {
          string = toString(string);
          pattern = guard ? undefined2 : pattern;
          if (pattern === undefined2) {
            return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
          }
          return string.match(pattern) || [];
        }
        __name(words, "words");
        var attempt = baseRest(function(func, args) {
          try {
            return apply(func, undefined2, args);
          } catch (e) {
            return isError(e) ? e : new Error2(e);
          }
        });
        var bindAll = flatRest(function(object, methodNames) {
          arrayEach(methodNames, function(key) {
            key = toKey(key);
            baseAssignValue(object, key, bind(object[key], object));
          });
          return object;
        });
        function cond(pairs) {
          var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
          pairs = !length ? [] : arrayMap(pairs, function(pair) {
            if (typeof pair[1] != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return [toIteratee(pair[0]), pair[1]];
          });
          return baseRest(function(args) {
            var index = -1;
            while (++index < length) {
              var pair = pairs[index];
              if (apply(pair[0], this, args)) {
                return apply(pair[1], this, args);
              }
            }
          });
        }
        __name(cond, "cond");
        function conforms(source) {
          return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
        }
        __name(conforms, "conforms");
        function constant(value) {
          return function() {
            return value;
          };
        }
        __name(constant, "constant");
        function defaultTo(value, defaultValue) {
          return value == null || value !== value ? defaultValue : value;
        }
        __name(defaultTo, "defaultTo");
        var flow = createFlow();
        var flowRight = createFlow(true);
        function identity(value) {
          return value;
        }
        __name(identity, "identity");
        function iteratee(func) {
          return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
        }
        __name(iteratee, "iteratee");
        function matches(source) {
          return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
        }
        __name(matches, "matches");
        function matchesProperty(path, srcValue) {
          return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
        }
        __name(matchesProperty, "matchesProperty");
        var method = baseRest(function(path, args) {
          return function(object) {
            return baseInvoke(object, path, args);
          };
        });
        var methodOf = baseRest(function(object, args) {
          return function(path) {
            return baseInvoke(object, path, args);
          };
        });
        function mixin(object, source, options) {
          var props = keys(source), methodNames = baseFunctions(source, props);
          if (options == null && !(isObject2(source) && (methodNames.length || !props.length))) {
            options = source;
            source = object;
            object = this;
            methodNames = baseFunctions(source, keys(source));
          }
          var chain2 = !(isObject2(options) && "chain" in options) || !!options.chain, isFunc = isFunction2(object);
          arrayEach(methodNames, function(methodName) {
            var func = source[methodName];
            object[methodName] = func;
            if (isFunc) {
              object.prototype[methodName] = function() {
                var chainAll = this.__chain__;
                if (chain2 || chainAll) {
                  var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                  actions.push({ "func": func, "args": arguments, "thisArg": object });
                  result2.__chain__ = chainAll;
                  return result2;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
              };
            }
          });
          return object;
        }
        __name(mixin, "mixin");
        function noConflict() {
          if (root._ === this) {
            root._ = oldDash;
          }
          return this;
        }
        __name(noConflict, "noConflict");
        function noop() {
        }
        __name(noop, "noop");
        function nthArg(n) {
          n = toInteger(n);
          return baseRest(function(args) {
            return baseNth(args, n);
          });
        }
        __name(nthArg, "nthArg");
        var over = createOver(arrayMap);
        var overEvery = createOver(arrayEvery);
        var overSome = createOver(arraySome);
        function property(path) {
          return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
        }
        __name(property, "property");
        function propertyOf(object) {
          return function(path) {
            return object == null ? undefined2 : baseGet(object, path);
          };
        }
        __name(propertyOf, "propertyOf");
        var range = createRange();
        var rangeRight = createRange(true);
        function stubArray() {
          return [];
        }
        __name(stubArray, "stubArray");
        function stubFalse() {
          return false;
        }
        __name(stubFalse, "stubFalse");
        function stubObject() {
          return {};
        }
        __name(stubObject, "stubObject");
        function stubString() {
          return "";
        }
        __name(stubString, "stubString");
        function stubTrue() {
          return true;
        }
        __name(stubTrue, "stubTrue");
        function times(n, iteratee2) {
          n = toInteger(n);
          if (n < 1 || n > MAX_SAFE_INTEGER) {
            return [];
          }
          var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
          iteratee2 = getIteratee(iteratee2);
          n -= MAX_ARRAY_LENGTH;
          var result2 = baseTimes(length, iteratee2);
          while (++index < n) {
            iteratee2(index);
          }
          return result2;
        }
        __name(times, "times");
        function toPath(value) {
          if (isArray3(value)) {
            return arrayMap(value, toKey);
          }
          return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
        }
        __name(toPath, "toPath");
        function uniqueId(prefix) {
          var id = ++idCounter;
          return toString(prefix) + id;
        }
        __name(uniqueId, "uniqueId");
        var add = createMathOperation(function(augend, addend) {
          return augend + addend;
        }, 0);
        var ceil = createRound("ceil");
        var divide = createMathOperation(function(dividend, divisor) {
          return dividend / divisor;
        }, 1);
        var floor = createRound("floor");
        function max(array) {
          return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
        }
        __name(max, "max");
        function maxBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
        }
        __name(maxBy, "maxBy");
        function mean(array) {
          return baseMean(array, identity);
        }
        __name(mean, "mean");
        function meanBy(array, iteratee2) {
          return baseMean(array, getIteratee(iteratee2, 2));
        }
        __name(meanBy, "meanBy");
        function min(array) {
          return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
        }
        __name(min, "min");
        function minBy(array, iteratee2) {
          return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
        }
        __name(minBy, "minBy");
        var multiply = createMathOperation(function(multiplier, multiplicand) {
          return multiplier * multiplicand;
        }, 1);
        var round = createRound("round");
        var subtract = createMathOperation(function(minuend, subtrahend) {
          return minuend - subtrahend;
        }, 0);
        function sum(array) {
          return array && array.length ? baseSum(array, identity) : 0;
        }
        __name(sum, "sum");
        function sumBy(array, iteratee2) {
          return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
        }
        __name(sumBy, "sumBy");
        lodash.after = after;
        lodash.ary = ary;
        lodash.assign = assign;
        lodash.assignIn = assignIn;
        lodash.assignInWith = assignInWith;
        lodash.assignWith = assignWith;
        lodash.at = at;
        lodash.before = before;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.castArray = castArray;
        lodash.chain = chain;
        lodash.chunk = chunk;
        lodash.compact = compact;
        lodash.concat = concat;
        lodash.cond = cond;
        lodash.conforms = conforms;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.curry = curry;
        lodash.curryRight = curryRight;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defaultsDeep = defaultsDeep;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.differenceBy = differenceBy;
        lodash.differenceWith = differenceWith;
        lodash.drop = drop;
        lodash.dropRight = dropRight;
        lodash.dropRightWhile = dropRightWhile;
        lodash.dropWhile = dropWhile;
        lodash.fill = fill;
        lodash.filter = filter;
        lodash.flatMap = flatMap;
        lodash.flatMapDeep = flatMapDeep;
        lodash.flatMapDepth = flatMapDepth;
        lodash.flatten = flatten;
        lodash.flattenDeep = flattenDeep;
        lodash.flattenDepth = flattenDepth;
        lodash.flip = flip;
        lodash.flow = flow;
        lodash.flowRight = flowRight;
        lodash.fromPairs = fromPairs;
        lodash.functions = functions;
        lodash.functionsIn = functionsIn;
        lodash.groupBy = groupBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.intersectionBy = intersectionBy;
        lodash.intersectionWith = intersectionWith;
        lodash.invert = invert;
        lodash.invertBy = invertBy;
        lodash.invokeMap = invokeMap;
        lodash.iteratee = iteratee;
        lodash.keyBy = keyBy;
        lodash.keys = keys;
        lodash.keysIn = keysIn;
        lodash.map = map;
        lodash.mapKeys = mapKeys;
        lodash.mapValues = mapValues;
        lodash.matches = matches;
        lodash.matchesProperty = matchesProperty;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.mergeWith = mergeWith;
        lodash.method = method;
        lodash.methodOf = methodOf;
        lodash.mixin = mixin;
        lodash.negate = negate;
        lodash.nthArg = nthArg;
        lodash.omit = omit;
        lodash.omitBy = omitBy;
        lodash.once = once;
        lodash.orderBy = orderBy;
        lodash.over = over;
        lodash.overArgs = overArgs;
        lodash.overEvery = overEvery;
        lodash.overSome = overSome;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.partition = partition;
        lodash.pick = pick;
        lodash.pickBy = pickBy;
        lodash.property = property;
        lodash.propertyOf = propertyOf;
        lodash.pull = pull;
        lodash.pullAll = pullAll;
        lodash.pullAllBy = pullAllBy;
        lodash.pullAllWith = pullAllWith;
        lodash.pullAt = pullAt;
        lodash.range = range;
        lodash.rangeRight = rangeRight;
        lodash.rearg = rearg;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.reverse = reverse;
        lodash.sampleSize = sampleSize;
        lodash.set = set;
        lodash.setWith = setWith;
        lodash.shuffle = shuffle;
        lodash.slice = slice;
        lodash.sortBy = sortBy;
        lodash.sortedUniq = sortedUniq;
        lodash.sortedUniqBy = sortedUniqBy;
        lodash.split = split;
        lodash.spread = spread;
        lodash.tail = tail;
        lodash.take = take;
        lodash.takeRight = takeRight;
        lodash.takeRightWhile = takeRightWhile;
        lodash.takeWhile = takeWhile;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.thru = thru;
        lodash.toArray = toArray;
        lodash.toPairs = toPairs;
        lodash.toPairsIn = toPairsIn;
        lodash.toPath = toPath;
        lodash.toPlainObject = toPlainObject;
        lodash.transform = transform;
        lodash.unary = unary;
        lodash.union = union;
        lodash.unionBy = unionBy;
        lodash.unionWith = unionWith;
        lodash.uniq = uniq;
        lodash.uniqBy = uniqBy;
        lodash.uniqWith = uniqWith;
        lodash.unset = unset;
        lodash.unzip = unzip;
        lodash.unzipWith = unzipWith;
        lodash.update = update;
        lodash.updateWith = updateWith;
        lodash.values = values;
        lodash.valuesIn = valuesIn;
        lodash.without = without;
        lodash.words = words;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.xorBy = xorBy;
        lodash.xorWith = xorWith;
        lodash.zip = zip;
        lodash.zipObject = zipObject;
        lodash.zipObjectDeep = zipObjectDeep;
        lodash.zipWith = zipWith;
        lodash.entries = toPairs;
        lodash.entriesIn = toPairsIn;
        lodash.extend = assignIn;
        lodash.extendWith = assignInWith;
        mixin(lodash, lodash);
        lodash.add = add;
        lodash.attempt = attempt;
        lodash.camelCase = camelCase;
        lodash.capitalize = capitalize;
        lodash.ceil = ceil;
        lodash.clamp = clamp;
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.cloneDeepWith = cloneDeepWith;
        lodash.cloneWith = cloneWith;
        lodash.conformsTo = conformsTo;
        lodash.deburr = deburr;
        lodash.defaultTo = defaultTo;
        lodash.divide = divide;
        lodash.endsWith = endsWith;
        lodash.eq = eq;
        lodash.escape = escape;
        lodash.escapeRegExp = escapeRegExp;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.floor = floor;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.get = get;
        lodash.gt = gt;
        lodash.gte = gte;
        lodash.has = has;
        lodash.hasIn = hasIn;
        lodash.head = head;
        lodash.identity = identity;
        lodash.includes = includes;
        lodash.indexOf = indexOf;
        lodash.inRange = inRange;
        lodash.invoke = invoke;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray3;
        lodash.isArrayBuffer = isArrayBuffer;
        lodash.isArrayLike = isArrayLike;
        lodash.isArrayLikeObject = isArrayLikeObject;
        lodash.isBoolean = isBoolean;
        lodash.isBuffer = isBuffer;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isEqualWith = isEqualWith;
        lodash.isError = isError;
        lodash.isFinite = isFinite2;
        lodash.isFunction = isFunction2;
        lodash.isInteger = isInteger;
        lodash.isLength = isLength;
        lodash.isMap = isMap;
        lodash.isMatch = isMatch;
        lodash.isMatchWith = isMatchWith;
        lodash.isNaN = isNaN2;
        lodash.isNative = isNative;
        lodash.isNil = isNil;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber2;
        lodash.isObject = isObject2;
        lodash.isObjectLike = isObjectLike;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isSafeInteger = isSafeInteger;
        lodash.isSet = isSet;
        lodash.isString = isString2;
        lodash.isSymbol = isSymbol;
        lodash.isTypedArray = isTypedArray;
        lodash.isUndefined = isUndefined;
        lodash.isWeakMap = isWeakMap;
        lodash.isWeakSet = isWeakSet;
        lodash.join = join;
        lodash.kebabCase = kebabCase;
        lodash.last = last;
        lodash.lastIndexOf = lastIndexOf;
        lodash.lowerCase = lowerCase;
        lodash.lowerFirst = lowerFirst;
        lodash.lt = lt;
        lodash.lte = lte;
        lodash.max = max;
        lodash.maxBy = maxBy;
        lodash.mean = mean;
        lodash.meanBy = meanBy;
        lodash.min = min;
        lodash.minBy = minBy;
        lodash.stubArray = stubArray;
        lodash.stubFalse = stubFalse;
        lodash.stubObject = stubObject;
        lodash.stubString = stubString;
        lodash.stubTrue = stubTrue;
        lodash.multiply = multiply;
        lodash.nth = nth;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.pad = pad;
        lodash.padEnd = padEnd;
        lodash.padStart = padStart;
        lodash.parseInt = parseInt2;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.repeat = repeat;
        lodash.replace = replace;
        lodash.result = result;
        lodash.round = round;
        lodash.runInContext = runInContext2;
        lodash.sample = sample;
        lodash.size = size;
        lodash.snakeCase = snakeCase;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.sortedIndexBy = sortedIndexBy;
        lodash.sortedIndexOf = sortedIndexOf;
        lodash.sortedLastIndex = sortedLastIndex;
        lodash.sortedLastIndexBy = sortedLastIndexBy;
        lodash.sortedLastIndexOf = sortedLastIndexOf;
        lodash.startCase = startCase;
        lodash.startsWith = startsWith;
        lodash.subtract = subtract;
        lodash.sum = sum;
        lodash.sumBy = sumBy;
        lodash.template = template;
        lodash.times = times;
        lodash.toFinite = toFinite;
        lodash.toInteger = toInteger;
        lodash.toLength = toLength;
        lodash.toLower = toLower;
        lodash.toNumber = toNumber;
        lodash.toSafeInteger = toSafeInteger;
        lodash.toString = toString;
        lodash.toUpper = toUpper;
        lodash.trim = trim;
        lodash.trimEnd = trimEnd;
        lodash.trimStart = trimStart;
        lodash.truncate = truncate;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;
        lodash.upperCase = upperCase;
        lodash.upperFirst = upperFirst;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.first = head;
        mixin(lodash, function() {
          var source = {};
          baseForOwn(lodash, function(func, methodName) {
            if (!hasOwnProperty.call(lodash.prototype, methodName)) {
              source[methodName] = func;
            }
          });
          return source;
        }(), { "chain": false });
        lodash.VERSION = VERSION;
        arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
          lodash[methodName].placeholder = lodash;
        });
        arrayEach(["drop", "take"], function(methodName, index) {
          LazyWrapper.prototype[methodName] = function(n) {
            n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
            var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
            if (result2.__filtered__) {
              result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
            } else {
              result2.__views__.push({
                "size": nativeMin(n, MAX_ARRAY_LENGTH),
                "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
              });
            }
            return result2;
          };
          LazyWrapper.prototype[methodName + "Right"] = function(n) {
            return this.reverse()[methodName](n).reverse();
          };
        });
        arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
          var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
          LazyWrapper.prototype[methodName] = function(iteratee2) {
            var result2 = this.clone();
            result2.__iteratees__.push({
              "iteratee": getIteratee(iteratee2, 3),
              "type": type
            });
            result2.__filtered__ = result2.__filtered__ || isFilter;
            return result2;
          };
        });
        arrayEach(["head", "last"], function(methodName, index) {
          var takeName = "take" + (index ? "Right" : "");
          LazyWrapper.prototype[methodName] = function() {
            return this[takeName](1).value()[0];
          };
        });
        arrayEach(["initial", "tail"], function(methodName, index) {
          var dropName = "drop" + (index ? "" : "Right");
          LazyWrapper.prototype[methodName] = function() {
            return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
          };
        });
        LazyWrapper.prototype.compact = function() {
          return this.filter(identity);
        };
        LazyWrapper.prototype.find = function(predicate) {
          return this.filter(predicate).head();
        };
        LazyWrapper.prototype.findLast = function(predicate) {
          return this.reverse().find(predicate);
        };
        LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
          if (typeof path == "function") {
            return new LazyWrapper(this);
          }
          return this.map(function(value) {
            return baseInvoke(value, path, args);
          });
        });
        LazyWrapper.prototype.reject = function(predicate) {
          return this.filter(negate(getIteratee(predicate)));
        };
        LazyWrapper.prototype.slice = function(start, end) {
          start = toInteger(start);
          var result2 = this;
          if (result2.__filtered__ && (start > 0 || end < 0)) {
            return new LazyWrapper(result2);
          }
          if (start < 0) {
            result2 = result2.takeRight(-start);
          } else if (start) {
            result2 = result2.drop(start);
          }
          if (end !== undefined2) {
            end = toInteger(end);
            result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
          }
          return result2;
        };
        LazyWrapper.prototype.takeRightWhile = function(predicate) {
          return this.reverse().takeWhile(predicate).reverse();
        };
        LazyWrapper.prototype.toArray = function() {
          return this.take(MAX_ARRAY_LENGTH);
        };
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
          if (!lodashFunc) {
            return;
          }
          lodash.prototype[methodName] = function() {
            var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray3(value);
            var interceptor = /* @__PURE__ */ __name(function(value2) {
              var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
              return isTaker && chainAll ? result3[0] : result3;
            }, "interceptor");
            if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
              isLazy = useLazy = false;
            }
            var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
            if (!retUnwrapped && useLazy) {
              value = onlyLazy ? value : new LazyWrapper(this);
              var result2 = func.apply(value, args);
              result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
              return new LodashWrapper(result2, chainAll);
            }
            if (isUnwrapped && onlyLazy) {
              return func.apply(this, args);
            }
            result2 = this.thru(interceptor);
            return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
          };
        });
        arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
          var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
          lodash.prototype[methodName] = function() {
            var args = arguments;
            if (retUnwrapped && !this.__chain__) {
              var value = this.value();
              return func.apply(isArray3(value) ? value : [], args);
            }
            return this[chainName](function(value2) {
              return func.apply(isArray3(value2) ? value2 : [], args);
            });
          };
        });
        baseForOwn(LazyWrapper.prototype, function(func, methodName) {
          var lodashFunc = lodash[methodName];
          if (lodashFunc) {
            var key = lodashFunc.name + "";
            if (!hasOwnProperty.call(realNames, key)) {
              realNames[key] = [];
            }
            realNames[key].push({ "name": methodName, "func": lodashFunc });
          }
        });
        realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
          "name": "wrapper",
          "func": undefined2
        }];
        LazyWrapper.prototype.clone = lazyClone;
        LazyWrapper.prototype.reverse = lazyReverse;
        LazyWrapper.prototype.value = lazyValue;
        lodash.prototype.at = wrapperAt;
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.commit = wrapperCommit;
        lodash.prototype.next = wrapperNext;
        lodash.prototype.plant = wrapperPlant;
        lodash.prototype.reverse = wrapperReverse;
        lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
        lodash.prototype.first = lodash.prototype.head;
        if (symIterator) {
          lodash.prototype[symIterator] = wrapperToIterator;
        }
        return lodash;
      }, "runInContext");
      var _4 = runInContext();
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        root._ = _4;
        define(function() {
          return _4;
        });
      } else if (freeModule) {
        (freeModule.exports = _4)._ = _4;
        freeExports._ = _4;
      } else {
        root._ = _4;
      }
    }).call(exports);
  }
});

// src/js/playscript.ts
var import_jquery2 = __toESM(require_jquery());
var import_animejs2 = __toESM(require_anime());

// node_modules/@catsums/my/lib/esm/MyHelperFunctions.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
function cout(...vars) {
  console.log(...vars);
}
__name(cout, "cout");
__name2(cout, "cout");
function clog(...x) {
  console.log(...x);
}
__name(clog, "clog");
__name2(clog, "clog");
try {
  if (typeof Storage !== "undefined") {
    Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
    };
    Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
    };
  }
} catch (err) {
  console.debug(err);
}
Array.prototype.midCeil = function() {
  return this[Math.ceil(this.length / 2)];
};
Array.prototype.midFloor = function() {
  return this[Math.floor(this.length / 2)];
};
Array.prototype.midRound = function() {
  return this[Math.round(this.length / 2)];
};
Array.prototype.last = function() {
  return this[this.length - 1];
};
Array.prototype.first = function() {
  return this[0];
};
Array.prototype.removeAt = function(index) {
  return this.splice(index, 1);
};
Array.prototype.removeItem = function(item) {
  let ind = this.indexOf(item);
  return this.splice(ind, 1) > 0;
};
BigInt.prototype.toJSON = function() {
  return this.toString();
};
Number.prototype.mod = function(n) {
  return (this % n + n) % n;
};
function mod(n, m) {
  return (n % m + m) % m;
}
__name(mod, "mod");
__name2(mod, "mod");
function isInfinity(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity, "isInfinity");
__name2(isInfinity, "isInfinity");
function safeDivide(a, b, useNaN = false) {
  let INF = Infinity;
  let res;
  if (a == 0 && b == 0) {
    if (useNaN)
      res = NaN;
    else
      res = 0;
  } else if (a == 0 && isInfinity(b)) {
    res = 0 * 1;
  } else if (isInfinity(a) && b == 0) {
    res = a * 1;
  } else if (isInfinity(a) && isInfinity(b)) {
    if (useNaN)
      res = NaN;
    else if (a == b)
      res = 1;
    else
      res = -1;
  } else if (b == 0) {
    if (useNaN)
      res = NaN;
    res = INF * a;
  } else if (isInfinity(b)) {
    if (useNaN)
      res = NaN;
    res = 0 * a;
  } else {
    res = a / b;
  }
  return res;
}
__name(safeDivide, "safeDivide");
__name2(safeDivide, "safeDivide");
function getAverageFrom(arr) {
  if (!isArray(arr))
    return null;
  if (!arr.length)
    return 0;
  let sum = arr.reduce((_sum, x) => {
    return _sum + x;
  }, 0);
  return sum / arr.length;
}
__name(getAverageFrom, "getAverageFrom");
__name2(getAverageFrom, "getAverageFrom");
function getCSSValueInPixels(str) {
  let num = 0;
  let val = parseFloat(str);
  let unit = str.replace(`${val}`, "").trim();
  switch (unit) {
    case "in":
      num = val * 96;
      break;
    case "cm":
      num = val / 2.54 * 96;
      break;
    case "mm":
      num = val / 100 / 2.54 * 96;
      break;
    case "pt":
      num = val * 72 * 96;
      break;
    case "pc":
      num = val * 12 * 72 * 96;
      break;
    default:
      num = val;
      break;
  }
  return num;
}
__name(getCSSValueInPixels, "getCSSValueInPixels");
__name2(getCSSValueInPixels, "getCSSValueInPixels");
function loadHTMLtoObject(query, url) {
  document.querySelector(query)?.setAttribute("data", url);
}
__name(loadHTMLtoObject, "loadHTMLtoObject");
__name2(loadHTMLtoObject, "loadHTMLtoObject");
function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
__name(docReady, "docReady");
__name2(docReady, "docReady");
var footstrapMediaQueries = {
  xs: "0px",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px"
};
function forMediaQuery(mediaQuery, matchFunc, unmatchFunc) {
  let match = window.matchMedia(mediaQuery);
  if (match.matches) {
    matchFunc();
  } else {
    unmatchFunc();
  }
}
__name(forMediaQuery, "forMediaQuery");
__name2(forMediaQuery, "forMediaQuery");
function checkBootstrapMedia() {
  let qVals = Object.values(footstrapMediaQueries);
  for (var c = qVals.length - 1; c >= 0; c--) {
    let qVal = qVals[c];
    let match = window.matchMedia(`(max-width: ${qVal})`);
    if (match.matches)
      return qVal;
  }
  return "xs";
}
__name(checkBootstrapMedia, "checkBootstrapMedia");
__name2(checkBootstrapMedia, "checkBootstrapMedia");
function getFormData(query) {
  let formElement;
  if (typeof query === "string")
    formElement = document.querySelector(query);
  else if (query instanceof HTMLFormElement)
    formElement = query;
  else
    return null;
  let formData = new FormData(formElement);
  return formData;
}
__name(getFormData, "getFormData");
__name2(getFormData, "getFormData");
function submitForm(query, callback, url) {
  let formElement = document.querySelector(query);
  let formData = new FormData(formElement);
  let methodType = formElement.getAttribute("method");
  ajax(formData, url, methodType, callback);
}
__name(submitForm, "submitForm");
__name2(submitForm, "submitForm");
var defectForm = /* @__PURE__ */ __name2(function(e) {
  e.preventDefault();
  console.debug("Submit has been defected. Please use JS to override form submit");
}, "defectForm");
function defectAllFormSubmits() {
  let allForms = document.getElementsByTagName("form");
  for (var form of allForms) {
    form.submit = () => {
    };
    form.addEventListener("submit", defectForm);
  }
}
__name(defectAllFormSubmits, "defectAllFormSubmits");
__name2(defectAllFormSubmits, "defectAllFormSubmits");
function formDataToJSON(formData, stringify = false) {
  let object = {};
  formData.forEach((value, key) => {
    if (!Reflect.has(object, key)) {
      object[key] = value;
      return;
    }
    if (!Array.isArray(object[key])) {
      object[key] = [object[key]];
    }
    object[key].push(value);
  });
  if (stringify)
    return JSON.stringify(object);
  return object;
}
__name(formDataToJSON, "formDataToJSON");
__name2(formDataToJSON, "formDataToJSON");
async function getBase64(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = () => {
      return res(reader.result);
    };
    reader.onerror = (err) => {
      rej(err);
    };
    reader.readAsDataURL(file);
  });
}
__name(getBase64, "getBase64");
__name2(getBase64, "getBase64");
function ajax(data, url = "", type = "POST", success = function(x) {
}, fail = function(x) {
}) {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      console.debug("STATUS:" + req.status);
      if (req.status >= 200 && req.status < 300) {
        success(req.responseText);
      } else if (req.status >= 300) {
        fail(req.responseText);
      } else {
        console.log(req.responseText);
      }
    } else {
    }
  };
  req.open(type, url, true);
  if (type.toUpperCase() == "POST") {
    req.send(data);
  } else {
    req.send();
  }
}
__name(ajax, "ajax");
__name2(ajax, "ajax");
function ajaxGET(url, callback, failback = function(x) {
}) {
  ajax("", url, "GET", callback, failback);
}
__name(ajaxGET, "ajaxGET");
__name2(ajaxGET, "ajaxGET");
function ajaxPOST(data, url, callback, failback = function(x) {
}) {
  ajax(data, url, "POST", callback, failback);
}
__name(ajaxPOST, "ajaxPOST");
__name2(ajaxPOST, "ajaxPOST");
function getFileBlob(url, type = "", callback = (uurl, bblob, bbytes) => {
}) {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", url, true);
  oReq.responseType = "arraybuffer";
  oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response;
    var byteArray = new Uint8Array(arrayBuffer);
    var _blob = new Blob([arrayBuffer], { type });
    var _url = URL.createObjectURL(_blob);
    callback(_url, _blob, byteArray);
  };
  oReq.send();
}
__name(getFileBlob, "getFileBlob");
__name2(getFileBlob, "getFileBlob");
function processAjaxData(contentElement, urlPath = "", response = null, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    if (contentElement)
      contentElement.innerHTML = response.html;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.pushState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(processAjaxData, "processAjaxData");
__name2(processAjaxData, "processAjaxData");
function setHistoryState(urlPath = "", response, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.replaceState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(setHistoryState, "setHistoryState");
__name2(setHistoryState, "setHistoryState");
function pushHistoryState(urlPath = "", response, state = {}, callback = function() {
}) {
  var newState = Object.assign({}, state);
  if (response) {
    newState.html = response.html;
    newState.pageTitle = response.pageTitle;
    document.title = response.pageTitle;
  } else {
    newState.html = "";
    newState.pageTitle = "";
  }
  window.history.pushState(newState, newState.pageTitle, urlPath);
  callback();
}
__name(pushHistoryState, "pushHistoryState");
__name2(pushHistoryState, "pushHistoryState");
function objectToURLParams(obj) {
  var parts = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
    }
  }
  return "?" + parts.join("&");
}
__name(objectToURLParams, "objectToURLParams");
__name2(objectToURLParams, "objectToURLParams");
function parseURLParams(url, typecast = false, autoParseObjects = false) {
  var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#") + 1 || url.length + 1, query = url.slice(queryStart, queryEnd - 1), pairs = query.replace(/\+/g, " ").split("&"), params = {}, i, n, v, nv, nx;
  if (query === url || query === "")
    return null;
  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=", 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);
    nx = null;
    if (typecast) {
      if (autoParseObjects) {
        if (n.includes("[")) {
          if (n.includes("[]")) {
            n = n.replace("[]", "");
            if (!params.hasOwnProperty(n))
              params[n] = [];
          } else if (n.includes("]")) {
            var nn = n.split("[", 2);
            n = nn[0];
            nx = nn[1].replace("]", "");
            if (!params.hasOwnProperty(n))
              params[n] = {};
            params[n][nx] = null;
          }
        }
      }
      if (!isNaN(v))
        v = Number(v);
      else {
        v = v === "true" || (v === "false" ? false : v);
        v = v === "undefined" ? void 0 : v === "null" ? null : v;
      }
    }
    if (!params.hasOwnProperty(n)) {
      params[n] = v;
    } else {
      if (typeof params[n] !== "object") {
        params[n] = [params[n]];
      } else if (params[n] instanceof Array)
        params[n].push(nv.length === 2 ? v : null);
      else if (nx != null)
        params[n][nx] = v;
    }
  }
  return params;
}
__name(parseURLParams, "parseURLParams");
__name2(parseURLParams, "parseURLParams");
function checkCookie(cname) {
  let cookey = getCookie(cname);
  if (cookey != "")
    return true;
  return false;
}
__name(checkCookie, "checkCookie");
__name2(checkCookie, "checkCookie");
function setCookie(cname, cvalue, exdays = 1) {
  let d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1e3);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + "; path=/";
}
__name(setCookie, "setCookie");
__name2(setCookie, "setCookie");
function deleteCookie(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
__name(deleteCookie, "deleteCookie");
__name2(deleteCookie, "deleteCookie");
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
__name(getCookie, "getCookie");
__name2(getCookie, "getCookie");
function isInt(val) {
  return isNumber(val) && Math.trunc(val) === val;
}
__name(isInt, "isInt");
__name2(isInt, "isInt");
function isNumber(val) {
  return !isNaN(Number(val));
}
__name(isNumber, "isNumber");
__name2(isNumber, "isNumber");
function isArray(arr) {
  return typeof arr === "object" && arr instanceof Array;
}
__name(isArray, "isArray");
__name2(isArray, "isArray");
function isString(str) {
  return typeof str === "string";
}
__name(isString, "isString");
__name2(isString, "isString");
function isFunction(func) {
  return typeof func === "function" || func instanceof Function;
}
__name(isFunction, "isFunction");
__name2(isFunction, "isFunction");
function isObject(object) {
  return object != null && typeof object === "object";
}
__name(isObject, "isObject");
__name2(isObject, "isObject");
function isInRange(num, min, max, inclusive = true) {
  if (inclusive)
    return num >= min && num <= max;
  else
    return num > min && num < max;
}
__name(isInRange, "isInRange");
__name2(isInRange, "isInRange");
function isJSON(str) {
  if (!isString(str)) {
    str = JSON.stringify(str);
  }
  let obj = null;
  try {
    obj = JSON.parse(str);
  } catch (e) {
    return false;
  }
  if (isObject(obj))
    return true;
  return false;
}
__name(isJSON, "isJSON");
__name2(isJSON, "isJSON");
function link_is_external(link_element, _location = window.location) {
  return link_element.host !== _location.host;
}
__name(link_is_external, "link_is_external");
__name2(link_is_external, "link_is_external");
function isExternalURLFast(url) {
  var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
  if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol)
    return true;
  if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[location.protocol] + ")?$"), "") !== location.host)
    return true;
  return false;
}
__name(isExternalURLFast, "isExternalURLFast");
__name2(isExternalURLFast, "isExternalURLFast");
function isExternalURL(url) {
  try {
    if (typeof URL === "undefined") {
    }
  } catch (e) {
    console.debug(e);
  }
  var res = false;
  try {
    res = new URL(url).origin !== location.origin;
  } catch (e) {
    return false;
  }
  return res;
}
__name(isExternalURL, "isExternalURL");
__name2(isExternalURL, "isExternalURL");
function JSONobjectsAreEqual(objA, objB) {
  var jsonA = JSON.stringify(objA);
  var jsonB = JSON.stringify(objB);
  if (jsonA === jsonB)
    return true;
  return false;
}
__name(JSONobjectsAreEqual, "JSONobjectsAreEqual");
__name2(JSONobjectsAreEqual, "JSONobjectsAreEqual");
function randomId(_prefix = "", _suffix = "") {
  return _prefix + Math.random().toString(36).substr(2, 9) + _suffix;
}
__name(randomId, "randomId");
__name2(randomId, "randomId");
function randomID(_prefix = "", _suffix = "", _length = 9) {
  return `${_prefix}${randomString(9)}${_suffix}`;
}
__name(randomID, "randomID");
__name2(randomID, "randomID");
function hexadecimalID(_len = 16, _pow = 4) {
  return Math.floor((1 + Math.random()) * Math.pow(_len, _pow)).toString(16).substring(1);
}
__name(hexadecimalID, "hexadecimalID");
__name2(hexadecimalID, "hexadecimalID");
function randomString(length, chars = null) {
  if (!chars)
    chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  else
    chars = String(chars);
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
__name(randomString, "randomString");
__name2(randomString, "randomString");
function randomCharFrom(str) {
  return randomString(1, str);
}
__name(randomCharFrom, "randomCharFrom");
__name2(randomCharFrom, "randomCharFrom");
function rndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
__name(rndInt, "rndInt");
__name2(rndInt, "rndInt");
function randomItemFrom(arr) {
  return arr[rndInt(0, arr.length - 1)];
}
__name(randomItemFrom, "randomItemFrom");
__name2(randomItemFrom, "randomItemFrom");
function safeStringify(obj) {
  let cache = [];
  let s = JSON.stringify(obj, (key, value) => {
    if (isObject(value)) {
      if (cache.includes(value))
        return;
      cache.push(value);
    }
    return value;
  });
  cache = [];
  return s;
}
__name(safeStringify, "safeStringify");
__name2(safeStringify, "safeStringify");
function hash32(str) {
  var hash = 0, i, chr;
  str = JSON.stringify(str);
  if (str.length === 0)
    return String(hash);
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return String(hash);
}
__name(hash32, "hash32");
__name2(hash32, "hash32");
function hash64(str) {
  var h1 = hash32(str);
  return h1 + hash32(h1 + str);
}
__name(hash64, "hash64");
__name2(hash64, "hash64");
function hash128(str) {
  var h1 = hash64(str);
  return h1 + hash64(h1 + str);
}
__name(hash128, "hash128");
__name2(hash128, "hash128");
function stringTrimToLength(_str, _len) {
  if (_len == null)
    _len = String(_str).length;
  _str = String(_str);
  return _str.substring(0, _len);
}
__name(stringTrimToLength, "stringTrimToLength");
__name2(stringTrimToLength, "stringTrimToLength");
function jsonFix(str) {
  str = String(str);
  let regex = /\,(?!\s*?[\{\[\"\'\w])/g;
  var newStr = str.replace(regex, "");
  return newStr;
}
__name(jsonFix, "jsonFix");
__name2(jsonFix, "jsonFix");
function deg2rad(deg) {
  var res = deg * Math.PI / 180;
  return res;
}
__name(deg2rad, "deg2rad");
__name2(deg2rad, "deg2rad");
function rad2deg(rad) {
  var res = rad * 180 / Math.PI;
  return res;
}
__name(rad2deg, "rad2deg");
__name2(rad2deg, "rad2deg");
function stepify(value, step) {
  if (step == 0)
    return value;
  if (step == Infinity)
    return 1;
  return Math.round((value + Number.EPSILON) / step) * step;
}
__name(stepify, "stepify");
__name2(stepify, "stepify");
function splitStringByLength(str, len) {
  var parts = [];
  for (var i = 0; i < str.length; i += len) {
    parts.push(str.substring(i, i + len));
  }
  return parts;
}
__name(splitStringByLength, "splitStringByLength");
__name2(splitStringByLength, "splitStringByLength");
function sanitizeString(str) {
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str.trim();
}
__name(sanitizeString, "sanitizeString");
__name2(sanitizeString, "sanitizeString");
function validateEmail(email) {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}
__name(validateEmail, "validateEmail");
__name2(validateEmail, "validateEmail");
function mysql_real_escape_string(str) {
  return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
    switch (char) {
      case "\0":
        return "\\0";
      case "\b":
        return "\\b";
      case "	":
        return "\\t";
      case "":
        return "\\z";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case '"':
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  });
}
__name(mysql_real_escape_string, "mysql_real_escape_string");
__name2(mysql_real_escape_string, "mysql_real_escape_string");
function areSimilar(objA, objB) {
  if (objA == objB)
    return true;
  if (isObject(objA) && isObject(objB)) {
    objA = JSON.parse(JSON.stringify(objA));
    objB = JSON.parse(JSON.stringify(objB));
    for (let k of Object.keys(objA)) {
      if (!(k in objB))
        return false;
      if (!areSimilar(objA[k], objB[k]))
        return false;
    }
    return true;
  } else {
    if (typeof objA === typeof objB) {
      return objA === objB;
    }
  }
  return false;
}
__name(areSimilar, "areSimilar");
__name2(areSimilar, "areSimilar");
function hardPush(arr, item, compareProps) {
  if (!arr || !(arr instanceof Array))
    return false;
  if (!item)
    return false;
  if (!arr.length) {
    arr.push(item);
    return true;
  }
  if (arr.indexOf(item) >= 0)
    return false;
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    if (isObject(arrItem) && isObject(item)) {
      if (compareProps && isArray(compareProps)) {
        for (let prop of compareProps) {
          if (prop in arrItem && areSimilar(arrItem[prop], item[prop])) {
            return false;
          }
        }
      }
    } else if (arrItem === item) {
      return false;
    }
  }
  arr.push(item);
  return true;
}
__name(hardPush, "hardPush");
__name2(hardPush, "hardPush");
function shallowEqual(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}
__name(shallowEqual, "shallowEqual");
__name2(shallowEqual, "shallowEqual");
function deepEqual(object1, object2) {
  let keys1 = Object.keys(object1);
  let keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    let val1 = object1[key];
    let val2 = object2[key];
    let areObjects = isObject(val1) && isObject(val2);
    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2) {
      return false;
    }
  }
  return true;
}
__name(deepEqual, "deepEqual");
__name2(deepEqual, "deepEqual");
function findItemIndex(arr, item) {
  if (!arr || !(arr instanceof Array))
    return -1;
  if (!item)
    return -1;
  for (let i = 0; i < arr.length; i++) {
    let arrItem = arr[i];
    if (isObject(arrItem) && isObject(item)) {
      if (shallowEqual(arrItem, item))
        return i;
      else if (arrItem === item)
        return i;
    }
  }
  return -1;
}
__name(findItemIndex, "findItemIndex");
__name2(findItemIndex, "findItemIndex");
function findItem(arr, item) {
  var res = findItemIndex(arr, item);
  if (res < 0)
    return false;
  return true;
}
__name(findItem, "findItem");
__name2(findItem, "findItem");
function arrayRemove(arr, item) {
  var res = arr.indexOf(item);
  if (res < 0)
    return false;
  let x = arr.splice(res, 1);
  return x.length > 0;
}
__name(arrayRemove, "arrayRemove");
__name2(arrayRemove, "arrayRemove");
function findItemObject(arr, item, compareProperties = null) {
  var res = findItemObjectIndex(arr, item, compareProperties);
  if (res < 0)
    return false;
  return true;
}
__name(findItemObject, "findItemObject");
__name2(findItemObject, "findItemObject");
function findItemObjectIndex(arr, item, compareProperties = null) {
  if (!arr || !(arr instanceof Array))
    return -1;
  if (!item)
    return -1;
  if (arr.length == 0) {
    return -1;
  }
  for (var i = 0; i < arr.length; i++) {
    let arrItem = arr[i];
    if (arrItem instanceof Object && item instanceof Object) {
      if (compareProperties && compareProperties instanceof Array) {
        for (let pproperty of compareProperties) {
          if (arrItem.hasOwnProperty(pproperty) && arrItem[pproperty] === item[pproperty])
            return i;
        }
      } else if (shallowEqual(arrItem, item))
        return i;
    } else if (arrItem === item)
      return i;
  }
  return -1;
}
__name(findItemObjectIndex, "findItemObjectIndex");
__name2(findItemObjectIndex, "findItemObjectIndex");
function getObjectFromArray(arr, properties) {
  if (!arr || !(arr instanceof Array))
    return false;
  if (!properties)
    return false;
  if (arr.length == 0) {
    return false;
  }
  var item = properties;
  var compareProperties = Object.keys(item);
  for (var i = 0; i < arr.length; i++) {
    var arrItem = arr[i];
    if (arrItem instanceof Object && item instanceof Object) {
      if (compareProperties && compareProperties instanceof Array) {
        for (let prop of compareProperties) {
          if (arrItem.hasOwnProperty(prop) && arrItem[prop] === item[prop])
            return arrItem;
        }
      } else if (shallowEqual(arrItem, item))
        return arrItem;
    } else if (arrItem === item)
      return arrItem;
  }
  return false;
}
__name(getObjectFromArray, "getObjectFromArray");
__name2(getObjectFromArray, "getObjectFromArray");
function getClosestPathInCircle(arr, _from, _to, bias = 0) {
  if (!(arr instanceof Array)) {
    return [];
  }
  if (_from < 0 || _from >= arr.length) {
    return [];
  }
  if (_to < 0 || _to >= arr.length) {
    return [];
  }
  let iL, iR;
  iL = iR = _from;
  let arrL = [], arrR = [];
  let arrX;
  while (arrL.length < arr.length) {
    let _i = mod(iL, arr.length);
    arrL.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iL--;
  }
  while (arrR.length < arr.length) {
    let _i = mod(iR, arr.length);
    arrR.push(arr[_i]);
    if (Math.abs(_i) == _to)
      break;
    iR++;
  }
  if (Math.abs(arrL.length) < Math.abs(arrR.length)) {
    arrX = arrL;
  } else if (Math.abs(arrL.length) > Math.abs(arrR.length)) {
    arrX = arrR;
  } else {
    if (bias > 0)
      arrX = arrR;
    else
      arrX = arrL;
  }
  return arrX;
}
__name(getClosestPathInCircle, "getClosestPathInCircle");
__name2(getClosestPathInCircle, "getClosestPathInCircle");
function roundTo(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo, "roundTo");
__name2(roundTo, "roundTo");

// node_modules/@catsums/targetobservers/lib/esm/ProcessingTarget.js
var __defProp3 = Object.defineProperty;
var __name3 = /* @__PURE__ */ __name((target, value) => __defProp3(target, "name", { value, configurable: true }), "__name");
var ProcessingTargetEvent = class extends CustomEvent {
  static {
    __name(this, "ProcessingTargetEvent");
  }
  static {
    __name3(this, "ProcessingTargetEvent");
  }
  data;
  constructor(a, b) {
    super(a, b);
    this.data = b?.detail || {};
  }
};
var ProcessingTarget = class extends EventTarget {
  static {
    __name(this, "ProcessingTarget");
  }
  static {
    __name3(this, "ProcessingTarget");
  }
  FPS = 12;
  targetName = randomID("[ProcessingTarget:", "]");
  connectId = randomID("ConnectID:");
  // onProcessTimer; onPhysicsProcessTimer;
  _connectedObjects = {};
  _signals = {};
  _startSysTime = 0;
  _lastSysTime = 0;
  _currSysTime = 0;
  _deltaSysTime = 0;
  _fixedDeltaSysTime = 0;
  _initDeltaSysTime = 0;
  _elapsedDeltaTime = 0;
  _elapsedFixedDeltaTime = 0;
  _frameTolerance = Math.sqrt(Math.E) / 1e3;
  _logs = false;
  _active = false;
  _isReady = false;
  _animFrame;
  get deltaTime() {
    return this._deltaSysTime;
  }
  get fixedDeltaTime() {
    return this._fixedDeltaSysTime;
  }
  get frameTime() {
    return safeDivide(1, this.FPS);
  }
  get elapsedTime() {
    return this._elapsedDeltaTime;
  }
  get elapsedFixedTime() {
    return this._elapsedFixedDeltaTime;
  }
  constructor(opts = {}) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false } = opts;
    super();
    this.FPS = FPS;
    this._frameTolerance = frameTolerance;
    if (active) {
      this.activate();
    }
  }
  onPreProcess(timestamp) {
    try {
      this._animFrame = requestAnimationFrame(this.onPreProcess.bind(this));
      if (!this._isReady) {
        this._isReady = true;
        this.onReady();
      }
      this._currSysTime = window.performance.now();
      let fixedDelta = safeDivide(1, this.FPS);
      this._deltaSysTime = (this._currSysTime - this._lastSysTime) / 1e3;
      this._initDeltaSysTime += this._deltaSysTime;
      this.onProcess(this.deltaTime);
      this._elapsedDeltaTime += this.deltaTime;
      if (this._initDeltaSysTime >= this.frameTime) {
        this._fixedDeltaSysTime = this._initDeltaSysTime;
        this.onPhysicsProcess(this.fixedDeltaTime);
        this._elapsedFixedDeltaTime += this.fixedDeltaTime;
        this._initDeltaSysTime = 0;
      }
      this._lastSysTime = this._currSysTime;
    } catch (err) {
      console.log(err);
    }
  }
  onReady() {
  }
  onProcess(delta) {
  }
  onPhysicsProcess(delta) {
  }
  createSignal(name, ...vars) {
    let varsObj = {};
    for (let vvar of vars)
      varsObj[vvar] = null;
    let event = new ProcessingTargetEvent(name, {
      detail: varsObj
    });
    event.data = varsObj;
    this._signals[name] = event;
    if (this._logs)
      console.log("Signal " + name + " in " + this.targetName + " created");
  }
  removeSignal(name) {
    if (this._signals.hasOwnProperty(name)) {
      this._signals[name] = null;
      if (this._logs)
        console.log("Signal " + name + " in " + this.targetName + " removed");
    }
  }
  emitSignal(name, vars = {}, elems = Object.values(this._connectedObjects)) {
    let event = null;
    if (!this._signals.hasOwnProperty(name)) {
      let varKeys = Object.keys(vars);
      this.createSignal(name, ...varKeys);
    }
    event = this._signals[name];
    for (let kkey of Object.keys(vars))
      event.data[kkey] = vars[kkey];
    for (let elem of elems) {
      if (elem instanceof EventTarget)
        elem.dispatchEvent(event);
    }
  }
  connectElement(element) {
    let connectId = randomID("ConnectID:");
    if (element && element instanceof EventTarget) {
      let identifier = "";
      if (!("connectId" in element)) {
        if (element instanceof HTMLElement) {
          element.dataset.connectId = connectId;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id(" + element.id + ")";
        }
        if (String(element.className)) {
          identifier += " class(" + element.className + ")";
        }
        if (String(element.localName)) {
          identifier += " tag(" + element.localName + ")";
        } else {
          identifier += " tagName(" + element.tagName + ")";
        }
      }
      identifier += " (" + connectId + ")";
      if (this._connectedObjects.hasOwnProperty(connectId)) {
        if (this._logs)
          console.log("Element " + identifier + " is already connected");
        return connectId;
      } else {
        this._connectedObjects[connectId] = element;
        if (this._logs)
          console.log("Element " + identifier + " connected!");
        return connectId;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return null;
  }
  disconnectElement(element) {
    if (element && element instanceof EventTarget) {
      let identifier = "";
      let isDisconnected = false;
      let connectedIds = Object.keys(this._connectedObjects);
      for (let i = 0; i < connectedIds.length; i++) {
        let elem = this._connectedObjects[connectedIds[i]];
        if (elem === element) {
          delete this._connectedObjects[connectedIds[i]];
          isDisconnected = true;
        }
      }
      if (element instanceof Element) {
        if (String(element.id)) {
          identifier += " id: " + element.id;
        }
        if (String(element.className)) {
          identifier += " class: " + element.className;
        }
        if (String(element.localName)) {
          identifier += " tag: " + element.localName;
        } else {
          identifier += " tagName:" + element.tagName;
        }
      }
      if (!isDisconnected) {
        if (this._logs)
          console.log("Element " + element + " was not connected/already disconnected");
        return false;
      } else {
        if (this._logs)
          console.log("Element " + element + " successfully disconnected!");
        return true;
      }
    } else {
      if (this._logs)
        console.log("Element was not valid");
    }
    return false;
  }
  disconnectAllElements() {
    for (let el of Object.values(this._connectedObjects)) {
      this.disconnectElement(el);
    }
  }
  connectElements(elementArr) {
    if (elementArr && elementArr instanceof Array) {
      for (let el of elementArr) {
        this.connectElement(el);
      }
    }
  }
  isConnectedToElement(element) {
    return findItem(Object.values(this._connectedObjects), element);
  }
  logsOn() {
    this._logs = true;
  }
  logsOff() {
    this._logs = false;
  }
  isActive() {
    return this._active;
  }
  activate() {
    if (this.isActive())
      return;
    this._active = true;
    this._lastSysTime = window.performance.now();
    this._startSysTime = this._lastSysTime;
    this._elapsedDeltaTime = 0;
    this._elapsedFixedDeltaTime = 0;
    this.onPreProcess(this._lastSysTime);
  }
  deactivate() {
    if (!this.isActive())
      return;
    this._active = false;
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }
};

// node_modules/@catsums/targetobservers/lib/esm/ElementFunctions.js
var ElementFunctions_exports = {};
__export(ElementFunctions_exports, {
  compareJSON: () => compareJSON,
  decomposeMatrix: () => decomposeMatrix,
  deltaTransformPoint: () => deltaTransformPoint,
  getAnchor: () => getAnchor,
  getBasicShapeProps: () => getBasicShapeProps,
  getElemExpandedTransformFromCSSStyle: () => getElemExpandedTransformFromCSSStyle,
  getElemExpandedTransformFromMatrix: () => getElemExpandedTransformFromMatrix,
  getElemPointsBasedOnBasicShape: () => getElemPointsBasedOnBasicShape,
  getElemTransformFromCSSStyle: () => getElemTransformFromCSSStyle,
  getElemTransformFromMatrix: () => getElemTransformFromMatrix,
  getGlobalBoundingRect: () => getGlobalBoundingRect,
  getGlobalOffsetRect: () => getGlobalOffsetRect,
  getLocalBoundingRect: () => getLocalBoundingRect,
  getLocalOffsetRect: () => getLocalOffsetRect,
  getPointsEllipse: () => getPointsEllipse,
  getPointsInset: () => getPointsInset,
  getPointsPath: () => getPointsPath,
  getPointsPolygon: () => getPointsPolygon,
  getPolygonIntersect: () => getPolygonIntersect,
  isPointInsidePolygon: () => isPointInsidePolygon,
  parseCSSTransform: () => parseCSSTransform,
  roundTo: () => roundTo3,
  transformCSSCoord: () => transformCSSCoord
});

// node_modules/@catsums/vector2/lib/esm/MY.js
var __defProp4 = Object.defineProperty;
var __name4 = /* @__PURE__ */ __name((target, value) => __defProp4(target, "name", { value, configurable: true }), "__name");
function mod2(n, m) {
  return (n % m + m) % m;
}
__name(mod2, "mod");
__name4(mod2, "mod");
function safeDivide2(a, b, useNaN = false) {
  let INF = Infinity;
  let res;
  if (a == 0 && b == 0) {
    if (useNaN)
      res = NaN;
    else
      res = 0;
  } else if (a == 0 && isInfinity2(b)) {
    res = 0 * 1;
  } else if (isInfinity2(a) && b == 0) {
    res = a * 1;
  } else if (isInfinity2(a) && isInfinity2(b)) {
    if (useNaN)
      res = NaN;
    else if (a == b)
      res = 1;
    else
      res = -1;
  } else if (b == 0) {
    if (useNaN)
      res = NaN;
    res = INF * a;
  } else if (isInfinity2(b)) {
    if (useNaN)
      res = NaN;
    res = 0 * a;
  } else {
    res = a / b;
  }
  return res;
}
__name(safeDivide2, "safeDivide");
__name4(safeDivide2, "safeDivide");
function isInfinity2(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity2, "isInfinity");
__name4(isInfinity2, "isInfinity");
function roundTo2(num, step) {
  if (step == 0)
    return num;
  if (isInfinity2(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo2, "roundTo");
__name4(roundTo2, "roundTo");

// node_modules/@catsums/vector2/lib/esm/Vector2.js
var __defProp5 = Object.defineProperty;
var __name5 = /* @__PURE__ */ __name((target, value) => __defProp5(target, "name", { value, configurable: true }), "__name");
var Vector2 = class _Vector2 {
  static {
    __name(this, "Vector2");
  }
  static {
    __name5(this, "Vector2");
  }
  x;
  y;
  static get ZERO() {
    return new _Vector2(0, 0);
  }
  static get ONE() {
    return new _Vector2(1, 1);
  }
  static get NEG_ONE() {
    return new _Vector2(-1, -1);
  }
  static get INF() {
    return new _Vector2(Infinity, Infinity);
  }
  static get NEG_INF() {
    return new _Vector2(-Infinity, -Infinity);
  }
  static get EPSILON() {
    return new _Vector2(Number.MIN_VALUE, Number.MIN_VALUE);
  }
  static get UP() {
    return new _Vector2(0, -1);
  }
  static get DOWN() {
    return new _Vector2(0, 1);
  }
  static get LEFT() {
    return new _Vector2(-1, 0);
  }
  static get RIGHT() {
    return new _Vector2(1, 0);
  }
  static ADD(v1, v2) {
    return new _Vector2(v1.x + v2.x, v1.y + v2.y);
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
  }
  static SUBTRACT(v1, v2) {
    return new _Vector2(v1.x - v2.x, v1.y - v2.y);
  }
  subtract(other) {
    this.x -= other.x;
    this.y -= other.y;
  }
  static MULTIPLY(v1, v2) {
    if (typeof v2 === "number")
      v2 = new _Vector2(v2, v2);
    return new _Vector2(v1.x * v2.x, v1.y * v2.y);
  }
  multiply(other) {
    if (typeof other === "number") {
      return this.scaled(other);
    }
    this.x *= other.x;
    this.y *= other.y;
  }
  static DIVIDE(v1, v2) {
    if (typeof v2 === "number")
      v2 = new _Vector2(v2, v2);
    return new _Vector2(v1.x / v2.x, v1.y / v2.y);
  }
  divide(other) {
    if (typeof other === "number") {
      return this.scaled(1 / other);
    }
    this.x /= other.x;
    this.y /= other.y;
  }
  static SCALE(v1, n) {
    return new _Vector2(v1.x * n, v1.y * n);
  }
  scaleBy(n) {
    this.x *= n;
    this.y *= n;
  }
  scaled(n) {
    return new _Vector2(this.x * n, this.y * n);
  }
  static MOD(v1, v2) {
    return new _Vector2(
      mod2(v1.x, v2.x),
      mod2(v1.y, v2.y)
    );
  }
  mod(other) {
    this.x = mod2(this.x, other.x);
    this.y = mod2(this.y, other.y);
  }
  static MODBY(v1, n) {
    return new _Vector2(
      mod2(v1.x, n),
      mod2(v1.y, n)
    );
  }
  modBy(n) {
    this.x = mod2(this.x, n);
    this.y = mod2(this.y, n);
  }
  static DOT(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static EQUALS(v1, v2, precision = 0) {
    let p = precision;
    if (v1 === v2)
      return true;
    if (!v1 || !v2)
      return false;
    if (v1?.x === v2?.x && v1?.y === v2?.y)
      return true;
    if (roundTo2(v1.x, p) === roundTo2(v2.x, p) && roundTo2(v1.y, p) === roundTo2(v2.y, p))
      return true;
    if (Math.abs(v1?.x - v2?.x) < Number.EPSILON && Math.abs(v1?.y - v2?.y) < Number.EPSILON)
      return true;
    return false;
  }
  equals(other, precision = 0) {
    return _Vector2.EQUALS(this, other, precision);
  }
  static SortAlgo(a, b) {
    if (a.isGreaterThan(b))
      return 1;
    else if (a.isLesserThan(b))
      return -1;
    return 0;
  }
  static SortAlgoX(a, b) {
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    return 0;
  }
  static SortAlgoY(a, b) {
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    return 0;
  }
  static SortAlgoXY(a, b) {
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    return 0;
  }
  static SortAlgoYX(a, b) {
    if (a.y > b.y)
      return 1;
    else if (a.y < b.y)
      return -1;
    if (a.x > b.x)
      return 1;
    else if (a.x < b.x)
      return -1;
    return 0;
  }
  static SortAlgoAvg(a, b) {
    let x, y;
    if (a.x > b.x)
      x = 1;
    else if (a.x < b.x)
      x = -1;
    else
      x = 0;
    if (a.y > b.y)
      y = 1;
    else if (a.y < b.y)
      y = -1;
    else
      y = 0;
    let avg = x + y / 2;
    return Math.trunc(avg);
  }
  constructor(...args) {
    if (args[0] instanceof Object) {
      let v = args[0];
      this.x = v?.x || 0;
      this.y = v?.y || 0;
    } else if (args[0] instanceof Array) {
      let arr = args[0];
      this.x = arr[0];
      this.y = arr[1];
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      let [x, y] = args;
      this.x = x;
      this.y = y;
    } else {
      this.x = 0;
      this.y = 0;
    }
  }
  abs() {
    var v = new _Vector2(Math.abs(this.x), Math.abs(this.y));
    return v;
  }
  lengthSquared() {
    var llengthSquared = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    return llengthSquared;
  }
  length() {
    return Math.sqrt(this.lengthSquared());
  }
  lerp(other, t) {
    let x = this.x + (other.x - this.x) * t;
    let y = this.y + (other.y - this.y) * t;
    return new _Vector2(x, y);
  }
  sumOfParts() {
    return this.x + this.y;
  }
  ratioed() {
    var sum = this.sumOfParts();
    return new _Vector2(
      safeDivide2(this.x, sum),
      safeDivide2(this.y, sum)
    );
  }
  isNormalised() {
    return Math.abs(this.lengthSquared() - 1) == 0;
  }
  normalized() {
    var llen = this.length();
    return new _Vector2(
      safeDivide2(this.x, llen),
      safeDivide2(this.y, llen)
    );
  }
  normalised() {
    return this.normalized();
  }
  magnitude() {
    return this.length();
  }
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }
  lineTo(other) {
    return _Vector2.SUBTRACT(other, this);
  }
  gradient() {
    return safeDivide2(this.y, this.x);
  }
  angle() {
    return Math.atan2(this.y, this.x);
  }
  angleTo(other) {
    return Math.atan2(this.y, this.x) - Math.atan2(other.y, other.x);
  }
  angleToPoint(other) {
    return this.lineTo(other).angle();
  }
  angleBetween(a, b) {
    let c = new _Vector2(this);
    let top = a.y * (c.x - b.x) + c.y * (b.x - a.x) + b.y * (a.x - c.x);
    let bot = (a.x - c.x) * (c.x - b.x) + (a.y - c.y) * (c.y - b.y);
    let angle = Math.atan2(top, bot);
    return angle;
  }
  distanceSquaredTo(other) {
    return _Vector2.SUBTRACT(other, this).lengthSquared();
  }
  distanceTo(other) {
    return _Vector2.SUBTRACT(other, this).length();
  }
  directionTo(other) {
    return _Vector2.SUBTRACT(other, this).normalized();
  }
  rotateAround(pivot, angle) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x * cosO - pt.y * sinO + ct.x;
    this.y = pt.x * sinO + pt.y * cosO + ct.y;
  }
  rotated(pivot, angle) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    let sinO = Math.sin(angle);
    let cosO = Math.cos(angle);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x * cosO - pt.y * sinO + ct.x;
    let _y = pt.x * sinO + pt.y * cosO + ct.y;
    return new _Vector2(_x, _y);
  }
  skewed(pivot, skewer) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    let _x = pt.x + pt.y * skewer.x + ct.x;
    let _y = pt.x * skewer.y + pt.y + ct.y;
    return new _Vector2(_x, _y);
  }
  skew(pivot, skewer) {
    let pt = new _Vector2(this);
    let ct = new _Vector2(pivot);
    pt.x -= ct.x;
    pt.y -= ct.y;
    this.x = pt.x + pt.y * skewer.x + ct.x;
    this.y = pt.x * skewer.y + pt.y + ct.y;
  }
  static INVERSE(v1) {
    let ix = safeDivide2(1, v1.x);
    let iy = safeDivide2(1, v1.y);
    return new _Vector2(ix, iy);
  }
  inverse() {
    let ix = safeDivide2(1, this.x);
    let iy = safeDivide2(1, this.y);
    return new _Vector2(ix, iy);
  }
  static FLIPPED(v1) {
    return new _Vector2(v1.y, v1.x);
  }
  flipped() {
    return new _Vector2(this.y, this.x);
  }
  static MIDPOINT(arr) {
    if (arr instanceof Array == false) {
      arr = [];
    }
    let _x = 0, _y = 0;
    for (let v of arr) {
      _x += v.x;
      _y += v.y;
    }
    let x = safeDivide2(_x, arr.length);
    let y = safeDivide2(_y, arr.length);
    return new _Vector2(x, y);
  }
  midPoint(other) {
    let arr = [];
    if (other instanceof Array) {
      arr = arr.concat(other);
    } else {
      arr.push(other);
    }
    let _x = 0, _y = 0;
    for (let v of arr) {
      _x += v.x;
      _y += v.y;
    }
    _x += this.x;
    _y += this.y;
    let x = safeDivide2(_x, arr.length + 1);
    let y = safeDivide2(_y, arr.length + 1);
    return new _Vector2(x, y);
  }
  floor() {
    return new _Vector2(Math.floor(this.x), Math.floor(this.y));
  }
  ceil() {
    return new _Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }
  reflect(other) {
    return _Vector2.SUBTRACT(this, _Vector2.SCALE(other, 2 * _Vector2.DOT(this, other)));
  }
  project(norm) {
    let normLengthSquared = Math.pow(this.x, 2) + Math.pow(this.y, 2);
    return _Vector2.SCALE(norm, this.dot(norm) / normLengthSquared);
  }
  slide(other) {
    return _Vector2.SUBTRACT(this, _Vector2.SCALE(other, this.dot(other)));
  }
  bounce(other) {
    return _Vector2.NEG(this.reflect(other));
  }
  closestPoint(arr, exclusive = false) {
    if (!arr?.length)
      return null;
    let pt = null;
    let dist = Infinity;
    for (let v of arr) {
      if (exclusive && _Vector2.EQUALS(v, this)) {
        continue;
      }
      let _dist = Math.abs(this.distanceTo(v));
      if (_dist < dist) {
        pt = v;
        dist = _dist;
      }
    }
    return pt;
  }
  sortPointsByClosest(points) {
    if (!points?.length)
      return null;
    let arr = points.slice();
    let len = arr.length;
    let newArr = [];
    for (let i = 0; i < len; i++) {
      let pt = this.closestPoint(arr);
      if (!pt)
        continue;
      newArr.push(pt);
      let index = arr.indexOf(pt);
      arr.splice(index, 1);
      i--;
    }
    return newArr;
  }
  toString() {
    let out = "( " + String(this.x) + " , " + String(this.y) + " )";
    return out;
  }
  asObject() {
    return { x: this.x, y: this.y };
  }
  asArray() {
    return [this.x, this.y];
  }
  toJSON() {
    return this.asObject();
  }
  isGreaterThan(other) {
    return this.lengthSquared() > other.lengthSquared();
  }
  isLesserThan(other) {
    return this.lengthSquared() < other.lengthSquared();
  }
  static NEG(v1) {
    return new _Vector2(-v1.x, -v1.y);
  }
  neg() {
    return new _Vector2(-this.x, -this.y);
  }
  static quadraticBezier(points, t) {
    let qPoints = [];
    for (let i = 0; i < points.length - 1; i++) {
      let pA = new _Vector2(points[i]);
      let pB = new _Vector2(points[i + 1]);
      let pt = pA.lerp(pB, t);
      qPoints.push(pt);
    }
    if (qPoints.length < 2) {
      return qPoints[0];
    }
    return _Vector2.quadraticBezier(qPoints, t);
  }
  static quadraticBezierPoints(points, inc) {
    let qPoints = [];
    if (points instanceof Array && typeof inc === "number" && inc > 0) {
      let t = 0;
      let last = false;
      while (t <= 1) {
        qPoints.push(_Vector2.quadraticBezier(points, t));
        t += inc;
        if (t > 1 && !last) {
          t = 1;
          last = true;
        }
      }
    }
    return qPoints;
  }
  static getSVGAngle(_u, _v) {
    let u = new _Vector2(_u);
    let v = new _Vector2(_v);
    let dot = _Vector2.DOT(u, v);
    let len = u.length() * v.length();
    var clamp = /* @__PURE__ */ __name5(function(n, min, max) {
      max = Math.max(min, max);
      min = Math.min(min, max);
      return Math.min(Math.max(n, min), max);
    }, "clamp");
    let ang = Math.acos(clamp(dot / len, -1, 1));
    if (u.x * v.y - u.y * v.x < 0) {
      ang = -ang;
    }
    return ang;
  }
};

// node_modules/@catsums/vector2/lib/esm/Vector2Line.js
var __defProp6 = Object.defineProperty;
var __name6 = /* @__PURE__ */ __name((target, value) => __defProp6(target, "name", { value, configurable: true }), "__name");
var Vector2Line = class _Vector2Line {
  static {
    __name(this, "Vector2Line");
  }
  static {
    __name6(this, "Vector2Line");
  }
  a = 1;
  b = -1;
  c = 0;
  // f //x intercept
  // e //y intercept
  // m //gradient
  static get Y_AXIS() {
    return new _Vector2Line(1, 0, 0);
  }
  static get X_AXIS() {
    return new _Vector2Line(0, -1, 0);
  }
  static get ONE() {
    return new _Vector2Line(1, -1, 0);
  }
  static get NEG_ONE() {
    return new _Vector2Line(1, 1, 0);
  }
  get gradient() {
    return safeDivide2(-this.a, this.b);
  }
  get m() {
    return this.gradient;
  }
  get xIntercept() {
    return safeDivide2(-this.c, this.a);
  }
  get f() {
    return this.xIntercept;
  }
  get yIntercept() {
    return safeDivide2(-this.c, this.b);
  }
  get e() {
    return this.yIntercept;
  }
  constructor(...args) {
    if (args[0] instanceof _Vector2Line) {
      let obj = args[0];
      this.a = obj.a;
      this.b = obj.b;
      this.c = obj.c;
    } else if (args[0] instanceof Object && args[1] instanceof Object) {
      let x = args[0], y = args[1];
      let a, b, c;
      let v1 = new Vector2(
        x.x || x[0] || 0,
        x.y || x[1] || 0
      );
      let v2 = new Vector2(
        y.x || y[0] || 0,
        y.y || y[1] || 0
      );
      let m = Vector2.SUBTRACT(v2, v1).gradient();
      let e, f;
      if (isInfinity2(m)) {
        c = -(v1.x || v2.x);
        b = 0;
        a = 1;
      } else if (m == 0) {
        a = 0;
        b = -1;
        c = v1.y || v2.y;
      } else {
        e = v1.y - m * v1.x;
        f = safeDivide2(-e, m);
        c = -(f * m);
        b = safeDivide2(-c, e) || 1;
        a = -(b * m);
      }
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (args[0] instanceof Object) {
      let x = args[0];
      if ("a" in x && "b" in x && "c" in x) {
        let obj = x;
        this.a = obj.a;
        this.b = obj.b;
        this.c = obj.c;
      } else if (("gradient" in x || "m" in x) && ("e" in x || "c" in x || "yIntercept" in x)) {
        let obj = x;
        let a, b, c;
        let m = obj.gradient || obj.m || 0;
        let e = obj.e || obj.c || obj.yIntercept || 0;
        let f;
        if ("f" in obj || "xIntercept" in obj) {
          f = obj.f || obj.xIntercept || 0;
          c = -(f * m);
        } else {
          c = 1;
          f = safeDivide2(-c, m);
        }
        b = safeDivide2(-c, e);
        a = -(b * m);
        this.a = a;
        this.b = b;
        this.c = c;
      } else if (("f" in x || "x" in x || "c" in x || "xIntercept" in x) && ("e" in x || "y" in x || "yIntercept" in x)) {
        let obj = x;
        let a, b, c;
        let e = obj.e || obj.c || obj.y || obj.yIntercept || 0;
        let f = obj.f || obj.x || obj.xIntercept || 0;
        let m = new Vector2(0 - e, f - 0).gradient();
        c = -(f * m);
        b = safeDivide2(-c, e);
        a = -(b * m);
        this.a = a;
        this.b = b;
        this.c = c;
      }
    } else if (typeof args[0] === "number" && typeof args[1] === "number" && typeof args[2] === "number") {
      let x = args[0], y = args[1], z = args[2];
      let a, b, c;
      a = x;
      b = y;
      c = z;
      this.a = a;
      this.b = b;
      this.c = c;
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      let x = args[0], y = args[1];
      let a, b, c;
      let e = y;
      let f = x;
      let m = new Vector2(0 - e, f - 0).gradient();
      c = -(f * m);
      b = safeDivide2(-c, e);
      a = -(b * m);
      this.a = a;
      this.b = b;
      this.c = c;
    }
  }
  getX(y) {
    let x;
    if (this.b != 0) {
      let m = this.gradient;
      let e = this.yIntercept;
      x = safeDivide2(y - e, m);
    } else {
      let c = this.c;
      let a = this.a;
      x = safeDivide2(-c, a);
    }
    return x;
  }
  getY(x) {
    let y;
    if (this.a != 0) {
      let m = this.gradient;
      let e = this.yIntercept;
      y = m * x + e;
    } else {
      let c = this.c;
      let b = this.b;
      y = safeDivide2(-c, b);
    }
    return y;
  }
  equals(other) {
    return this.gradient == other.gradient && this.yIntercept == other.yIntercept && this.xIntercept == other.xIntercept;
  }
  isHorizontal() {
    return this.a === 0;
  }
  isVertical() {
    return this.b === 0;
  }
  hasPoint(point) {
    let v = new Vector2(point);
    let res;
    if (isInfinity2(this.a) && isInfinity2(this.b)) {
      if (this.a == this.b) {
        res = Infinity + this.c;
      } else {
        res = 0 + this.c;
      }
    } else {
      let ax = this.a * v.x;
      let by = this.b * v.y;
      let c = this.c;
      res = ax + by + c;
      res = Number(res);
    }
    return res == 0;
  }
  angle() {
    let xInt = this.xIntercept;
    let yInt = this.yIntercept;
    if (xInt == Infinity)
      return 0;
    if (xInt == -Infinity)
      return Math.PI;
    if (yInt == Infinity)
      return Math.PI / 2;
    if (yInt == -Infinity)
      return -(Math.PI / 2);
    let vx = new Vector2(xInt, 0);
    let vy = new Vector2(0, yInt);
    return vx.angleToPoint(vy);
  }
  static INTERSECT(l1, l2) {
    return l1.intersect(l2);
  }
  static INTERSECTS(arr) {
    if (!arr?.length) {
      return [];
    }
    let pts = [];
    for (let lineA of arr) {
      for (let lineB of arr) {
        if (lineA == lineB)
          continue;
        let ab = _Vector2Line.INTERSECT(lineA, lineB);
        if (ab)
          pts.push(ab);
      }
    }
    return pts;
  }
  intersect(other) {
    if (other.gradient == this.gradient) {
      return null;
    }
    let a1 = this.a, a2 = other.a;
    let b1 = this.b, b2 = other.b;
    let c1 = this.c, c2 = other.c;
    let b1c2 = b1 * c2;
    let b2c1 = b2 * c1;
    let a1b2 = a1 * b2;
    let a2b1 = a2 * b1;
    let a2c1 = a2 * c1;
    let a1c2 = a1 * c2;
    let BC, AB, AC;
    if (isInfinity2(b1c2) && isInfinity2(b2c1) && b1c2 == b2c1) {
      BC = b1c2;
    } else {
      BC = b1c2 - b2c1;
    }
    if (isInfinity2(a1b2) && isInfinity2(a2b1) && a1b2 == a2b1) {
      AB = a1b2;
    } else {
      AB = a1b2 - a2b1;
    }
    if (isInfinity2(a2c1) && isInfinity2(a1c2) && a2c1 == a1c2) {
      AC = a2c1;
    } else {
      AC = a2c1 - a1c2;
    }
    let x = safeDivide2(BC, AB);
    let y = safeDivide2(AC, AB);
    return new Vector2(x, y);
  }
  perpendicular(point) {
    point = new Vector2(point);
    if (this.a == 0) {
      let a = this.b, b = this.a, c = point.x;
      return new _Vector2Line({ a, b, c });
    } else if (this.b == 0) {
      let a = this.b, b = this.a, c = point.y;
      return new _Vector2Line({ a, b, c });
    } else {
      let m = safeDivide2(-1, this.gradient);
      let e = point.y + 1 / m * point.x;
      let f = safeDivide2(-e, m);
      return new _Vector2Line({
        gradient: m,
        xIntercept: f,
        yIntercept: f
      });
    }
  }
  normal() {
    return new Vector2(this.a, this.b);
  }
  mirror(point) {
    point = new Vector2(point);
    if (this.hasPoint(point)) {
      return new Vector2(point);
    }
    let _normal = this.normal();
    let unitNormal = _normal.normalized();
    let unitC = safeDivide2(this.c, _normal.length());
    let signedDist = unitNormal.x * point.x + unitNormal.y * point.y + unitC;
    let mx = point.x - 2 * unitNormal.x * signedDist;
    let my = point.y - 2 * unitNormal.y * signedDist;
    return new Vector2(mx, my);
  }
  asObject() {
    return { a: this.a, b: this.b, c: this.c };
  }
  toString() {
    return `(${this.a}x + ${this.b}y + ${this.c})`;
  }
  toJSON() {
    return this.asObject();
  }
};

// node_modules/@catsums/vector2/lib/esm/Rect2.js
var __defProp7 = Object.defineProperty;
var __name7 = /* @__PURE__ */ __name((target, value) => __defProp7(target, "name", { value, configurable: true }), "__name");
var Rect2 = class _Rect2 {
  static {
    __name(this, "Rect2");
  }
  static {
    __name7(this, "Rect2");
  }
  position;
  size;
  static get ORIGIN() {
    return new _Rect2(0, 0, 1, 1);
  }
  static EQUALS(r1, r2, p = 0) {
    if (r1 === r2)
      return true;
    if (!r1 || !r2)
      return false;
    let a = new _Rect2(r1);
    let b = new _Rect2(r2);
    if (Vector2.EQUALS(a.position, b.position, p) && Vector2.EQUALS(a.size, b.size, p))
      return true;
    return false;
  }
  static COMBINE(rects) {
    let pts = [];
    for (let r of rects) {
      if (r instanceof _Rect2) {
        pts = pts.concat(r.getCorners());
      }
    }
    return _Rect2.from(pts);
  }
  static from(pts) {
    return _Rect2.getFromPoints(pts);
  }
  static getFromPoints(points) {
    if (points instanceof Array == false)
      return null;
    let xMin, xMax, yMin, yMax;
    xMax = yMax = -Infinity;
    xMin = yMin = Infinity;
    for (let pt of points) {
      pt = new Vector2(pt);
      if (xMin == null || xMin > pt.x)
        xMin = pt.x;
      if (yMin == null || yMin > pt.y)
        yMin = pt.y;
      if (xMax == null || xMax < pt.x)
        xMax = pt.x;
      if (yMax == null || yMax < pt.y)
        yMax = pt.y;
    }
    let w = xMax - xMin;
    let h = yMax - yMin;
    return new _Rect2(xMin, yMin, w, h);
  }
  get start() {
    return new Vector2(this.left, this.top);
  }
  get end() {
    return new Vector2(this.right, this.bottom);
  }
  get center() {
    return Vector2.MIDPOINT([this.start, this.end]);
  }
  get extents() {
    return Vector2.SUBTRACT(this.center, this.start);
  }
  get topLeft() {
    return new Vector2(this.left, this.top);
  }
  get topRight() {
    return new Vector2(this.right, this.top);
  }
  get bottomLeft() {
    return new Vector2(this.left, this.bottom);
  }
  get bottomRight() {
    return new Vector2(this.right, this.bottom);
  }
  get x() {
    return this.position.x;
  }
  set x(n) {
    this.position.x = n;
  }
  get y() {
    return this.position.y;
  }
  set y(n) {
    this.position.y = n;
  }
  get w() {
    return this.size.x;
  }
  set w(n) {
    this.size.x = n;
  }
  get h() {
    return this.size.y;
  }
  set h(n) {
    this.size.y = n;
  }
  get width() {
    return this.w;
  }
  set width(n) {
    this.w = n;
  }
  get height() {
    return this.h;
  }
  set height(n) {
    this.h = n;
  }
  get left() {
    return this.x;
  }
  set left(n) {
    this.w = this.right - n;
    this.x = n;
  }
  get top() {
    return this.y;
  }
  set top(n) {
    this.h = this.bottom - n;
    this.y = n;
  }
  get right() {
    return this.x + this.w;
  }
  set right(n) {
    this.w = n - this.left;
  }
  get bottom() {
    return this.y + this.h;
  }
  set bottom(n) {
    this.h = n - this.top;
  }
  constructor(...args) {
    let [p, s, w, h] = args;
    if (p instanceof Object) {
      if ("position" in p && "size" in p) {
        this.position = new Vector2(p.position);
        this.size = new Vector2(p.size);
      } else if ("x" in p && "y" in p && "w" in p && "h" in p) {
        this.position = new Vector2(p.x, p.y);
        this.size = new Vector2(p.w, p.h);
      } else if ("x" in p && "y" in p && "x" in s && "y" in s) {
        this.position = new Vector2(p);
        this.size = new Vector2(s);
      } else if ("top" in p && "left" in p && "right" in p && "bottom" in p) {
        this.position = new Vector2(p.left, p.top);
        this.size = new Vector2(p.right - p.left, p.bottom - p.top);
      } else if ("t" in p && "l" in p && "r" in p && "b" in p) {
        this.position = new Vector2(p.l, p.t);
        this.size = new Vector2(p.r - p.l, p.b - p.t);
      }
    } else if (typeof p === "number" && typeof s === "number" && typeof w === "number" && typeof h === "number") {
      this.position = new Vector2(p, s);
      this.size = new Vector2(w, h);
    } else {
      this.position = new Vector2();
      this.size = new Vector2();
    }
  }
  equals(other, p = 0) {
    return _Rect2.EQUALS(this, other, p);
  }
  abs() {
    return new _Rect2(this.position, this.size.abs());
  }
  containsPoint(v) {
    v = new Vector2(v);
    if (v.x < this.left || v.x > this.right || v.y < this.top || v.y > this.bottom)
      return false;
    return true;
  }
  getIntersectWith(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (!this.intersectsWith(other, threshold))
      return null;
    let yMin = this.top > other.top ? this.top : other.top;
    let yMax = this.bottom < other.bottom ? this.bottom : other.bottom;
    let xMin = this.left > other.left ? this.left : other.left;
    let xMax = this.right < other.right ? this.right : other.right;
    return new _Rect2(
      new Vector2(xMin, yMin),
      new Vector2(xMax - xMin, yMax - yMin)
    );
  }
  intersectsWith(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (this.right + threshold < other.left || this.left - threshold > other.right || this.bottom + threshold < other.top || this.top - threshold > other.bottom)
      return false;
    return true;
  }
  isTouching(other, threshold = 0) {
    return this.touches(other, threshold);
  }
  touches(rect, threshold = 0) {
    let other = new _Rect2(rect);
    if (this.right + threshold == other.left || this.left - threshold == other.right || this.bottom + threshold == other.top || this.top - threshold == other.bottom)
      return true;
    return false;
  }
  combine(other) {
    return _Rect2.COMBINE([this, other]);
  }
  getCorners() {
    return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
  }
  clampPoints(pts) {
    let rect = this;
    let newPts = pts.map((pt) => {
      pt = new Vector2(pt);
      if (pt.y > rect.bottom)
        pt.y = rect.bottom;
      if (pt.x > rect.right)
        pt.x = rect.right;
      if (pt.y < rect.top)
        pt.y = rect.top;
      if (pt.x < rect.left)
        pt.x = rect.left;
      return pt;
    });
    return newPts;
  }
  asObject() {
    let rect = {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    };
    rect = Object.assign(rect, {
      get top() {
        return rect.y;
      },
      get bottom() {
        return rect.y + rect.h;
      },
      get left() {
        return rect.x;
      },
      get right() {
        return rect.x + rect.w;
      }
    });
    return rect;
  }
  asArray() {
    return [this.x, this.y, this.w, this.h];
  }
  toString() {
    var out = `Rect2( ${this.position} ${this.size})`;
    return out;
  }
  toJSON() {
    return {
      position: this.position?.toJSON() || null,
      size: this.size?.toJSON() || null
    };
  }
};

// node_modules/@catsums/vector2/lib/esm/Transform2.js
var __defProp8 = Object.defineProperty;
var __name8 = /* @__PURE__ */ __name((target, value) => __defProp8(target, "name", { value, configurable: true }), "__name");
var Transform2 = class _Transform2 {
  static {
    __name(this, "Transform2");
  }
  static {
    __name8(this, "Transform2");
  }
  _position;
  _rotation;
  _scale;
  _skew;
  _anchor;
  _parent = null;
  _childs = [];
  static get ORIGIN() {
    return new _Transform2(Vector2.ZERO, 0, Vector2.ONE, Vector2.ZERO, Vector2.ZERO);
  }
  static EQUALS(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (Vector2.EQUALS(t1.position, t2.position, p) && Vector2.EQUALS(t1.scale, t2.scale, p) && Vector2.EQUALS(t1.skew, t2.skew, p) && Vector2.EQUALS(t1.anchor, t2.anchor, p))
      return true;
    return false;
  }
  static SIMILAR(t1, t2, p = 0) {
    if (t1 === t2)
      return true;
    if (!t2 || !t2)
      return false;
    if (Vector2.EQUALS(t1.position, t2.position, p) && Vector2.EQUALS(t1.scale, t2.scale, p) && Vector2.EQUALS(t1.skew, t2.skew, p))
      return true;
    return false;
  }
  static INVERSE(t) {
    let p = Vector2.NEG(t.position);
    let s = Vector2.INVERSE(t.scale);
    let r = -t.rotation;
    let k = Vector2.NEG(t.skew);
    let a = t.anchor;
    return new _Transform2(p, r, s, k, a);
  }
  get parent() {
    return this._parent;
  }
  set parent(x) {
    if (x instanceof _Transform2)
      this._parent = x;
  }
  get position() {
    return this._position;
  }
  set position(x) {
    if (x instanceof Vector2)
      this._position = new Vector2(x);
  }
  get rotation() {
    return this._rotation;
  }
  set rotation(x) {
    this._rotation = Number(x);
  }
  get scale() {
    return this._scale;
  }
  set scale(x) {
    if (x instanceof Vector2)
      this._scale = new Vector2(x);
  }
  get skew() {
    return this._skew;
  }
  set skew(x) {
    if (x instanceof Vector2)
      this._skew = new Vector2(x);
  }
  get anchor() {
    return this._anchor;
  }
  set anchor(x) {
    if (x instanceof Vector2)
      this._anchor = new Vector2(x);
  }
  get children() {
    return this._childs;
  }
  get childs() {
    return this.children;
  }
  get a() {
    return this.scale.x * (Math.cos(this.rotation) - Math.sin(this.rotation) * Math.tan(this.skew.x));
  }
  get b() {
    return this.scale.y * (Math.sin(this.rotation) + Math.cos(this.rotation) * Math.tan(this.skew.y));
  }
  get c() {
    return this.scale.x * (Math.cos(this.rotation) * Math.tan(this.skew.x) - Math.sin(this.rotation));
  }
  get d() {
    return this.scale.y * (Math.sin(this.rotation) * Math.tan(this.skew.y) + Math.cos(this.rotation));
  }
  get tx() {
    return this.position.x;
  }
  get ty() {
    return this.position.y;
  }
  get matrix() {
    return [
      [this.a, this.c, this.tx],
      [this.b, this.d, this.ty],
      [0, 0, 1]
    ];
  }
  constructor(...args) {
    if (args[0] instanceof _Transform2) {
      let p = args[0];
      this.position = new Vector2(p.position);
      this.rotation = p.rotation;
      this.scale = new Vector2(p.scale);
      this.skew = new Vector2(p.skew);
      this.anchor = new Vector2(p.anchor);
    } else {
      let [p, r, s, k, a] = args;
      this.position = new Vector2(p);
      this.rotation = r;
      this.scale = new Vector2(s);
      this.skew = new Vector2(k);
      this.anchor = new Vector2(a);
    }
  }
  inverted() {
    return _Transform2.INVERSE(this);
  }
  setParent(x) {
    if (!(x instanceof _Transform2))
      return;
    if (x == this)
      return;
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = x;
  }
  addChild(x) {
    if (!(x instanceof _Transform2))
      return;
    if (x == this)
      return;
    x.setParent(this);
    this._childs.push(x);
  }
  removeChild(x) {
    if (x == this)
      return null;
    let ind;
    let out = null;
    if (x instanceof _Transform2) {
      ind = this._childs.indexOf(x);
    } else if (typeof x === "number") {
      ind = x;
    }
    if (ind >= 0 && ind < this._childs.length) {
      out = this._childs[ind];
      this._childs.splice(ind, 1);
      out._parent = null;
    }
    return out;
  }
  getGlobalTransform() {
    let parentTransform = this.parent?.getGlobalTransform() || new _Transform2();
    let pt = parentTransform;
    let p = Vector2.ADD(pt.position, this.position);
    let r = pt.rotation + this.rotation;
    let s = Vector2.MULTIPLY(pt.scale, this.scale);
    let k = new Vector2(
      Math.tan(Math.atan(this.skew.x) + Math.atan(pt.skew.x)),
      Math.tan(Math.atan(this.skew.y) + Math.atan(pt.skew.y))
    );
    let a = pt.applyTransform(this.anchor, pt.anchor);
    return new _Transform2(p, r, s, k, a);
  }
  applyGlobalTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let globalTrans = this.getGlobalTransform();
    let newPt = new Vector2(pt);
    newPt = globalTrans.applyTransform(pt, anchor, order);
    return newPt;
  }
  applyTranslate(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = Vector2.ADD(newPt, this.position);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyRotate(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.rotated(Vector2.ZERO, this.rotation);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applySkew(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = newPt.skewed(Vector2.ZERO, this.skew);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyScale(pt, anchor = this.anchor) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    newPt = Vector2.MULTIPLY(newPt, this.scale);
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  applyInverseTransform(pt, anchor = this._anchor, order = ["T", "R", "K", "S"]) {
    let inv = this.inverted();
    return inv.applyTransform(pt, anchor, order.slice());
  }
  applyTransform(pt, anchor = this.anchor, order = ["S", "K", "R", "T"]) {
    let newPt = new Vector2(pt);
    newPt = Vector2.SUBTRACT(newPt, anchor);
    for (let trans of order) {
      if (!trans)
        continue;
      switch (trans?.toUpperCase()) {
        case "T":
        case "TRANSLATE":
        case "POSITION":
          newPt = this.applyTranslate(newPt, Vector2.ZERO);
          break;
        case "R":
        case "ROTATE":
        case "ROTATION":
          newPt = this.applyRotate(newPt, Vector2.ZERO);
          break;
        case "K":
        case "SKEW":
          newPt = this.applySkew(newPt, Vector2.ZERO);
          break;
        case "S":
        case "SCALE":
        case "SIZE":
          newPt = this.applyScale(newPt, Vector2.ZERO);
          break;
        default:
          newPt = newPt;
          break;
      }
    }
    newPt = Vector2.ADD(newPt, anchor);
    return newPt;
  }
  asMatrix() {
    return this.matrix;
  }
  asArray() {
    return [this.a, this.b, this.c, this.d, this.tx, this.ty];
  }
  asObject() {
    return {
      position: this.position?.toJSON() || null,
      rotation: typeof this.rotation === "number" ? this.rotation : null,
      scale: this.scale?.toJSON() || null,
      skew: this.skew?.toJSON() || null,
      anchor: this.anchor?.toJSON() || null
    };
  }
  toString() {
    return `( Translate: ${this.position} Rotate: (${this.rotation}) Scale: ${this.scale} Skew: ${this.skew} Anchor: ${this.anchor} )`;
  }
  toJSON() {
    return this.asObject();
  }
};

// node_modules/@catsums/targetobservers/lib/esm/ElementFunctions.js
var import_svg_path_parser = __toESM(require_svg_path_parser());
var __defProp9 = Object.defineProperty;
var __name9 = /* @__PURE__ */ __name((target, value) => __defProp9(target, "name", { value, configurable: true }), "__name");
function compareJSON(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
__name(compareJSON, "compareJSON");
__name9(compareJSON, "compareJSON");
function getAnchor(elem, opts = { global: false }) {
  let { global: global2 } = opts;
  let rect = getLocalOffsetRect(elem);
  if (global2) {
    rect = getGlobalOffsetRect(elem);
  }
  let compStyle = window.getComputedStyle(elem);
  let tOrigin = compStyle["transform-origin"].split(" ");
  let extents = rect.extents;
  let offset = new Vector2(extents);
  for (let i = 0; i < tOrigin.length; i++) {
    let val;
    if (!tOrigin[i])
      continue;
    switch (tOrigin[i].toLowerCase()) {
      case "top":
        offset.y = extents.y * 0;
        break;
      case "bottom":
        offset.y = extents.y * 2;
        break;
      case "left":
        offset.x = extents.y * 0;
        break;
      case "right":
        offset.x = extents.y * 2;
        break;
      case "center":
        if (i == 0)
          offset.x = extents.x;
        if (i == 1)
          offset.y = extents.y;
        break;
      default:
        if (tOrigin[i].endsWith("%")) {
          val = parseFloat(tOrigin[i]) / 100;
        } else {
          val = getCSSValueInPixels(tOrigin[i]);
        }
        if (i == 0)
          offset.x = val;
        if (i == 1)
          offset.y = val;
        break;
    }
  }
  let anchor = Vector2.ADD(rect.start, offset);
  return anchor;
}
__name(getAnchor, "getAnchor");
__name9(getAnchor, "getAnchor");
function getGlobalOffsetRect(elem) {
  let localRect = getLocalOffsetRect(elem);
  let globalRect = new Rect2(localRect);
  let parent = elem?.parentElement || null;
  if (parent && parent != document.body && parent != document.documentElement) {
    let parentRect = getLocalOffsetRect(parent);
    globalRect.position = Vector2.ADD(
      parentRect.position,
      globalRect.position
    );
  }
  return globalRect;
}
__name(getGlobalOffsetRect, "getGlobalOffsetRect");
__name9(getGlobalOffsetRect, "getGlobalOffsetRect");
function getLocalOffsetRect(elem) {
  let localRect;
  if (elem instanceof HTMLElement) {
    localRect = new Rect2(
      elem.offsetLeft,
      elem.offsetTop,
      elem.offsetWidth,
      elem.offsetHeight
    );
  } else if (elem instanceof SVGGraphicsElement) {
    let bbox = elem.getBBox();
    localRect = new Rect2(
      bbox.x,
      bbox.y,
      bbox.width,
      bbox.height
    );
  } else {
    localRect = getLocalBoundingRect(elem);
  }
  return localRect;
}
__name(getLocalOffsetRect, "getLocalOffsetRect");
__name9(getLocalOffsetRect, "getLocalOffsetRect");
function getGlobalBoundingRect(elem) {
  let _rect = elem.getBoundingClientRect();
  let globalRect = new Rect2(
    _rect.x,
    _rect.y,
    _rect.width,
    _rect.height
  );
  return globalRect;
}
__name(getGlobalBoundingRect, "getGlobalBoundingRect");
__name9(getGlobalBoundingRect, "getGlobalBoundingRect");
function getLocalBoundingRect(elem) {
  let globalRect = getGlobalBoundingRect(elem);
  let compStyle = window.getComputedStyle(elem);
  let positionType = compStyle.position?.toLowerCase();
  let parentRect = new Rect2(Vector2.ZERO, Vector2.ZERO);
  switch (positionType) {
    case "static":
    case "relative":
    case "absolute":
    case "sticky":
      {
        let parent = elem?.parentElement || null;
        if (positionType == "absolute") {
          while (parent && parent != elem && parent != document.body && parent != document.documentElement) {
            let parentPosType = window.getComputedStyle(parent)?.position?.toLowerCase();
            if (parentPosType == "static") {
              parent = parent?.parentElement || null;
            } else {
              break;
            }
          }
        }
        if (parent) {
          let prect = parent.getBoundingClientRect();
          parentRect = new Rect2(
            prect.x,
            prect.y,
            prect.width,
            prect.height
          );
        }
      }
      break;
    case "fixed":
      {
        let parent = elem.parentElement || null;
        if (parent) {
          let prect = document.body?.getBoundingClientRect() || document.documentElement?.getBoundingClientRect() || null;
          parentRect = new Rect2(
            prect.x,
            prect.y,
            prect.width,
            prect.height
          );
        }
      }
      break;
    default:
      break;
  }
  let localRect = new Rect2(
    Vector2.SUBTRACT(globalRect.position, parentRect.position),
    globalRect.size
  );
  return localRect;
}
__name(getLocalBoundingRect, "getLocalBoundingRect");
__name9(getLocalBoundingRect, "getLocalBoundingRect");
function roundTo3(num, step) {
  if (step == 0)
    return num;
  if (isInfinity(step))
    return Infinity;
  let invStep = Math.pow(step, -1);
  let invMiniStep = Math.pow(step / 10, -1);
  let initNum = Math.round(num * invMiniStep) / invMiniStep;
  let init = Math.round(initNum * invStep) / invStep;
  let res = Math.round((init + Number.EPSILON) * invStep) / invStep;
  return res;
}
__name(roundTo3, "roundTo");
__name9(roundTo3, "roundTo");
function deltaTransformPoint(matrix, point) {
  var dx = point.x * matrix[0] + point.y * matrix[2] + 0;
  var dy = point.x * matrix[1] + point.y * matrix[3] + 0;
  return { x: dx, y: dy };
}
__name(deltaTransformPoint, "deltaTransformPoint");
__name9(deltaTransformPoint, "deltaTransformPoint");
function decomposeMatrix(matrix, _t = 0) {
  if (matrix?.length !== 6) {
    matrix = [1, 0, 0, 1, 0, 0];
  }
  var px = deltaTransformPoint(matrix, { x: 0, y: 1 });
  var py = deltaTransformPoint(matrix, { x: 1, y: 0 });
  let [a, b, c, d, tx, ty] = matrix;
  let det = a * d - c * b;
  let sx = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  let sy = det / sx;
  let r = Math.atan2(b, a);
  let kx = Math.tan(
    Math.atan2(a * c + b * d, a * a + b * b)
  );
  let ky = Math.tan(0);
  return {
    translate: new Vector2(roundTo3(tx, _t), roundTo3(ty, _t)),
    scale: new Vector2(roundTo3(sx, _t), roundTo3(sy, _t)),
    skew: new Vector2(roundTo3(kx, _t), roundTo3(ky, _t)),
    rotation: roundTo3(r, _t / 10)
    // rotation is the same as skew x
    // rotation: (Math.atan2(matrix[]))
  };
}
__name(decomposeMatrix, "decomposeMatrix");
__name9(decomposeMatrix, "decomposeMatrix");
function parseCSSTransform(transform) {
  return transform.split(/\(|,|\)/).slice(1, -1).map(function(v) {
    return parseFloat(v);
  });
}
__name(parseCSSTransform, "parseCSSTransform");
__name9(parseCSSTransform, "parseCSSTransform");
function transformCSSCoord(transformArr, v) {
  v = new Vector2(v);
  let x = v.x, y = v.y;
  if (transformArr.length == 6) {
    var t = transformArr, det = t[0] * t[3] - t[1] * t[2];
    return new Vector2({
      x: safeDivide(x * t[3] - y * t[2] + t[2] * t[5] - t[4] * t[3], det),
      y: safeDivide(-x * t[1] + y * t[0] + t[4] * t[1] - t[0] * t[5], det)
    });
  } else {
    return v;
  }
}
__name(transformCSSCoord, "transformCSSCoord");
__name9(transformCSSCoord, "transformCSSCoord");
function getElemExpandedTransformFromMatrix(elem, _t = 0) {
  let localTransform = getElemTransformFromMatrix(elem, _t);
  if (elem != document.body && elem != document.documentElement) {
    let parent = elem?.parentElement || null;
    if (parent && parent != elem) {
      let parentTransform = getElemExpandedTransformFromMatrix(parent, _t);
      parentTransform.addChild(localTransform);
    }
  }
  return localTransform;
}
__name(getElemExpandedTransformFromMatrix, "getElemExpandedTransformFromMatrix");
__name9(getElemExpandedTransformFromMatrix, "getElemExpandedTransformFromMatrix");
function getElemExpandedTransformFromCSSStyle(elem, _t = 0) {
  let localTransform = getElemTransformFromCSSStyle(elem, _t);
  if (elem != document.body && elem != document.documentElement) {
    let parent = elem?.parentElement || null;
    if (parent && parent != elem) {
      let parentTransform = getElemExpandedTransformFromCSSStyle(parent, _t);
      parentTransform.addChild(localTransform);
    }
  }
  return localTransform;
}
__name(getElemExpandedTransformFromCSSStyle, "getElemExpandedTransformFromCSSStyle");
__name9(getElemExpandedTransformFromCSSStyle, "getElemExpandedTransformFromCSSStyle");
function getElemTransformFromCSSStyle(elem, _t = 0) {
  let compStyle = window.getComputedStyle(elem);
  let rect = getLocalOffsetRect(elem);
  let anchor = getAnchor(elem);
  let p, s, r;
  let cssTranslate = compStyle.translate.trim().split(" ");
  if (cssTranslate.length == 1) {
    let _x = parseFloat(compStyle.translate.split(" ")[0]);
    if (isNaN(_x))
      _x = 0;
    p = new Vector2(_x, 0);
  } else {
    let _x = parseFloat(compStyle.translate.split(" ")[0]);
    let _y = parseFloat(compStyle.translate.split(" ")[1]);
    if (isNaN(_x))
      _x = 0;
    if (isNaN(_y))
      _y = 0;
    p = new Vector2(_x, _y);
  }
  let cssRotate = compStyle.rotate.trim().split(" ");
  if (cssRotate.length == 1) {
    let _r = parseFloat(compStyle.rotate.split(" ")[0]);
    if (isNaN(_r))
      _r = 0;
    r = deg2rad(_r);
  } else {
    r = 0;
  }
  let cssScale = compStyle.scale.trim().split(" ");
  if (cssScale.length == 1) {
    let _x = parseFloat(compStyle.scale.split(" ")[0]);
    if (isNaN(_x))
      _x = 1;
    s = new Vector2(_x, _x);
  } else {
    let _x = parseFloat(compStyle.scale.split(" ")[0]);
    let _y = parseFloat(compStyle.scale.split(" ")[1]);
    if (isNaN(_x))
      _x = 0;
    if (isNaN(_y))
      _y = 0;
    s = new Vector2(_x, _y);
  }
  p = new Vector2(roundTo3(p.x, _t), roundTo3(p.y, _t));
  r = roundTo3(r, _t / 10);
  s = new Vector2(roundTo3(s.x, _t), roundTo3(s.y, _t));
  let transform = new Transform2(
    p,
    r,
    s,
    Vector2.ZERO,
    anchor
  );
  return transform;
}
__name(getElemTransformFromCSSStyle, "getElemTransformFromCSSStyle");
__name9(getElemTransformFromCSSStyle, "getElemTransformFromCSSStyle");
function getElemTransformFromMatrix(elem, precision = 0) {
  let compStyle = window.getComputedStyle(elem);
  let parsedTrans = parseCSSTransform(compStyle["transform"]);
  if (!parsedTrans.length) {
    parsedTrans = [1, 0, 0, 1, 0, 0];
  } else if (parsedTrans.length == 16) {
    let t = parsedTrans;
    parsedTrans = [
      t[0],
      t[1],
      t[4],
      t[5],
      t[12],
      t[13]
    ];
  }
  let [a, b, c, d, tx, ty] = parsedTrans;
  let det = a * d - c * b;
  let decomp = decomposeMatrix(parsedTrans, precision);
  let {
    translate: p,
    rotation: r,
    scale: s,
    skew: k
  } = decomp;
  let rect = getLocalOffsetRect(elem);
  let anchor = getAnchor(elem);
  let transform = new Transform2(p, r, s, k, anchor);
  return transform;
}
__name(getElemTransformFromMatrix, "getElemTransformFromMatrix");
__name9(getElemTransformFromMatrix, "getElemTransformFromMatrix");
function getBasicShapeProps(cssValueString) {
  let cssBasicShapeStr = "";
  let _comps = cssValueString.split(" ");
  for (let s of _comps) {
    if (s.includes("(")) {
      cssBasicShapeStr = s;
      break;
    }
  }
  let cssBS = cssBasicShapeStr.split("(");
  let shape = cssBS[0] || "none";
  let propsString = cssValueString.split("(")[1]?.replaceAll(")", "") || "";
  let props = [propsString];
  switch (shape) {
    case "polygon":
      props = propsString.split(",");
      break;
    case "path":
      try {
        propsString = propsString.replaceAll(`"`, ``);
        props = import_svg_path_parser.default.parseSVG(propsString);
        props = import_svg_path_parser.default.makeAbsolute(props);
      } catch (e) {
        console.log(e);
        props = [];
      }
      break;
    default:
      props = propsString.split(" ");
      break;
  }
  props = props.map((prop) => {
    if (prop)
      prop = prop.trim();
    return prop;
  });
  return [shape, props];
}
__name(getBasicShapeProps, "getBasicShapeProps");
__name9(getBasicShapeProps, "getBasicShapeProps");
function getElemPointsBasedOnBasicShape(elem, shape, props = [], { transform = true, global: global2 = true, opts = {} }) {
  let rect;
  if (global2)
    rect = getGlobalOffsetRect(elem);
  else
    rect = getLocalOffsetRect(elem);
  let mTransform, sTransform;
  if (transform) {
    mTransform = getElemTransformFromMatrix(elem);
    sTransform = getElemTransformFromCSSStyle(elem);
  } else {
    mTransform = new Transform2();
    sTransform = new Transform2();
  }
  let points = [];
  switch (shape) {
    case "inset":
      points = getPointsInset(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "circle":
    case "ellipse":
      points = getPointsEllipse(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "polygon":
      points = getPointsPolygon(rect, props, opts);
      points.push(new Vector2(points[0]));
      break;
    case "path":
      points = getPointsPath(rect, props, opts);
      break;
    default:
      points = rect.getCorners();
      points.push(new Vector2(points[0]));
      break;
  }
  points = rect.clampPoints(points);
  let anchor = getAnchor(elem, { global: true });
  let newPoints = points.map((pt) => {
    return mTransform.applyTransform(pt, anchor);
  }).map((pt) => {
    return sTransform.applyTransform(pt, anchor);
  });
  return newPoints;
}
__name(getElemPointsBasedOnBasicShape, "getElemPointsBasedOnBasicShape");
__name9(getElemPointsBasedOnBasicShape, "getElemPointsBasedOnBasicShape");
function getPointsPath(r, props = [], { increment = 0.125, vertices = 8 }) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let pts = [];
  let paths = [];
  for (let prop of props) {
    if (!prop || !prop.command || !prop.code)
      continue;
    switch (prop.code) {
      case "V":
      case "H":
      case "L":
        {
          let pt = new Vector2(prop.x, prop.y);
          pts.push(pt);
        }
        break;
      case "S":
      case "C":
        {
          increment = Math.abs(increment);
          let _pts = Vector2.quadraticBezierPoints([
            new Vector2(prop.x0, prop.y0),
            new Vector2(prop.x1, prop.y1),
            new Vector2(prop.x2, prop.y2),
            new Vector2(prop.x, prop.y)
          ], increment);
          pts = pts.concat(_pts);
        }
        break;
      case "T":
      case "Q":
        {
          increment = Math.abs(increment);
          let _pts = Vector2.quadraticBezierPoints([
            new Vector2(prop.x0, prop.y0),
            new Vector2(prop.x1, prop.y1),
            new Vector2(prop.x, prop.y)
          ], increment);
          pts = pts.concat(_pts);
        }
        break;
      case "A":
        {
          pts.push(prop.x, prop.y);
        }
        break;
      case "Z": {
        pts.push(pts[0]);
      }
      case "M":
        {
          paths.push(pts);
          let pt = new Vector2(prop.x, prop.y);
          pts = [pt];
        }
        break;
    }
  }
  if (!paths.length)
    paths = [rect.getCorners()];
  let newPts = [];
  for (let path of paths) {
    for (let _pt of path) {
      newPts.push(new Vector2(_pt));
    }
  }
  let t1 = new Transform2(new Vector2(rect.left, rect.top));
  newPts = newPts.map((pt) => t1.applyTranslate(pt));
  return newPts;
}
__name(getPointsPath, "getPointsPath");
__name9(getPointsPath, "getPointsPath");
function getPointsPolygon(r, props = [], opts) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let pts = [];
  for (let prop of props) {
    if (prop == "nonzero" || prop == "evenodd") {
      continue;
    }
    let ptsStr = prop.split(" ");
    if (ptsStr.length != 2)
      return rect.getCorners();
    let _x = parseFloat(ptsStr[0]);
    let _y = parseFloat(ptsStr[1]);
    if (ptsStr[0].includes("%")) {
      _x = rect.width * (parseFloat(ptsStr[0]) / 100);
    }
    if (ptsStr[1].includes("%")) {
      _y = rect.height * (parseFloat(ptsStr[1]) / 100);
    }
    let x = rect.left + _x;
    let y = rect.top + _y;
    pts.push(new Vector2(x, y));
  }
  return pts;
}
__name(getPointsPolygon, "getPointsPolygon");
__name9(getPointsPolygon, "getPointsPolygon");
function getPointsEllipse(r, props = [], { vertices = 8 }) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(r);
  let rx, ry, cx, cy;
  let radVals = [];
  let posVals = [];
  let hasAt = false;
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (prop == "at") {
      hasAt = true;
      continue;
    }
    if (isNaN(parseFloat(prop))) {
      if (hasAt)
        posVals.push(prop);
      else
        break;
    }
    if (hasAt)
      posVals.push(prop);
    else
      radVals.push(prop);
  }
  if (!radVals.length) {
    return rect.getCorners();
  }
  {
    let val = parseFloat(radVals[0]);
    if (radVals[0].startsWith("%")) {
      val = rect.width * (val / 100);
    }
    rx = val;
  }
  if (radVals[1]) {
    let val = parseFloat(radVals[1]);
    if (radVals[1].startsWith("%")) {
      val = rect.height * (val / 100);
    }
    ry = val;
  } else {
    ry = rx;
  }
  if (!posVals.length) {
    cx = rect.center.x;
    cy = rect.center.y;
  } else {
    let val = parseFloat(posVals[0]);
    if (posVals[0].startsWith("%")) {
      val = rect.width * (val / 100);
    } else {
      val = val;
    }
    cx = val;
    val = parseFloat(posVals[1]);
    if (!posVals[1]) {
      val = cx;
    } else if (posVals[1].startsWith("%")) {
      val = rect.height * (val / 100);
    } else {
      val = val;
    }
    cy = val;
  }
  let pts = [];
  let vertexCount = vertices ?? 10;
  if (vertexCount < 4)
    vertexCount = 4;
  vertexCount = Math.trunc(Number(vertexCount));
  for (let i = 0; i < vertexCount; i++) {
    let angl = i * (Math.PI * 2) / vertexCount;
    let pt = new Vector2(
      rx * Math.cos(angl),
      ry * Math.sin(angl)
    );
    pts.push(pt);
  }
  let t0 = new Transform2(new Vector2(cx, cy));
  let t1 = new Transform2(new Vector2(rect.left, rect.top));
  pts = pts.map((pt) => t1.applyTranslate(pt));
  pts = pts.map((pt) => t0.applyTranslate(pt));
  return pts;
}
__name(getPointsEllipse, "getPointsEllipse");
__name9(getPointsEllipse, "getPointsEllipse");
function getPointsInset(_rect, props = [], opts) {
  if (!props?.length) {
    if (props)
      props = [props];
    else
      props = [];
  }
  let rect = new Rect2(_rect);
  let t = 0, l = 0, r = 0, b = 0;
  let vals = [];
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (isNaN(parseFloat(prop)))
      break;
    vals.push(prop);
  }
  switch (vals.length) {
    case 1:
      {
        if (vals[0].endsWith("%")) {
          let n = parseFloat(vals[0]) / 100;
          t = rect.top + rect.height * n;
          l = rect.left + rect.width * n;
          r = rect.right - rect.width * n;
          b = rect.bottom - rect.height * n;
        } else {
          let n = parseFloat(vals[0]);
          t = rect.top + n;
          l = rect.left + n;
          r = rect.right - n;
          b = rect.bottom - n;
        }
      }
      break;
    case 2:
      {
        if (vals[0].endsWith("%")) {
          let n = parseFloat(vals[0]) / 100;
          t = rect.top + rect.height * n;
          b = rect.bottom - rect.height * n;
        } else {
          let n = parseFloat(vals[0]);
          t = rect.top + n;
          b = rect.bottom - n;
        }
        if (vals[1].endsWith("%")) {
          let n = parseFloat(vals[1]) / 100;
          l = rect.left + rect.width * n;
          r = rect.right - rect.width * n;
        } else {
          let n = parseFloat(vals[1]);
          l = rect.left + n;
          r = rect.right - n;
        }
      }
      break;
    case 3:
      {
        if (vals[0].endsWith("%"))
          t = rect.top + rect.height * (parseFloat(vals[0]) / 100);
        else
          t = rect.top + parseFloat(vals[0]);
        if (vals[1].endsWith("%")) {
          l = rect.left + rect.width * (parseFloat(vals[1]) / 100);
          r = rect.right - rect.width * (parseFloat(vals[1]) / 100);
        } else {
          l = rect.left + parseFloat(vals[1]);
          r = rect.right - parseFloat(vals[1]);
        }
        if (vals[2].endsWith("%"))
          b = rect.bottom - rect.height * (parseFloat(vals[2]) / 100);
        else
          b = rect.bottom + parseFloat(vals[2]);
      }
      break;
    case 4:
      {
        if (vals[0].endsWith("%"))
          t = rect.top + rect.height * (parseFloat(vals[0]) / 100);
        else
          t = rect.top + parseFloat(vals[0]);
        if (vals[1].endsWith("%"))
          r = rect.right - rect.width * (parseFloat(vals[1]) / 100);
        else
          r = rect.right - parseFloat(vals[1]);
        if (vals[2].endsWith("%"))
          b = rect.bottom - rect.height * (parseFloat(vals[2]) / 100);
        else
          b = rect.bottom - parseFloat(vals[2]);
        if (vals[3].endsWith("%"))
          l = rect.left + rect.width * (parseFloat(vals[3]) / 100);
        else
          l = rect.left + parseFloat(vals[3]);
      }
      break;
    default:
      {
        t = rect.top;
        r = rect.right;
        b = rect.bottom;
        l = rect.left;
      }
      break;
  }
  let newPts = new Rect2(l, t, r - l, b - t).getCorners();
  return newPts;
}
__name(getPointsInset, "getPointsInset");
__name9(getPointsInset, "getPointsInset");
function isPointInsidePolygon(polygon, vec) {
  let arr = polygon.map((pt) => new Vector2(pt));
  let len = arr.length;
  let v = new Vector2(vec);
  let rect = Rect2.from(arr);
  if (!rect.containsPoint(v)) {
    return false;
  }
  let castLine = new Vector2Line(
    new Vector2(v),
    new Vector2(v.x + 1, v.y)
  );
  let intersects = [];
  for (let i = 0; i < len; i++) {
    let a = new Vector2(arr[i]);
    let b = new Vector2(arr[i + 1]);
    let line = new Vector2Line(a, b);
    if (line.hasPoint(v))
      return true;
    let intersect = line.intersect(castLine);
    if (intersect && intersect.x > v.x) {
      let rectAB = Rect2.from([a, b]);
      if (rectAB.containsPoint(intersect)) {
        intersects.push(intersect);
      }
    }
  }
  return intersects.length % 2 != 0;
}
__name(isPointInsidePolygon, "isPointInsidePolygon");
__name9(isPointInsidePolygon, "isPointInsidePolygon");
function getPolygonIntersect(pA, pB, precision = Number.EPSILON) {
  if (pA.every((v) => v instanceof Array)) {
    let rects = [];
    for (let _pA of pA) {
      let _rect = getPolygonIntersect(_pA, pB);
      if (_rect) {
        if (_rect instanceof Array)
          rects = rects.concat(_rect);
      }
    }
    return rects;
  } else if (pB.every((v) => v instanceof Array)) {
    let rects = [];
    for (let _pB of pB) {
      let _rect = getPolygonIntersect(pA, _pB);
      if (_rect) {
        if (_rect instanceof Array)
          rects = rects.concat(_rect);
      }
    }
    return rects;
  } else {
    let rectA = Rect2.from(pA);
    let rectB = Rect2.from(pB);
    let intersectRect = rectA.getIntersectWith(rectB, precision);
    if (!intersectRect)
      return null;
    let intersects = [];
    for (let i = 0; i < pA.length - 1; i++) {
      let aa = new Vector2(pA[i]);
      let ab = new Vector2(pA[i + 1]);
      let lineA = new Vector2Line(aa, ab);
      let lineARect = Rect2.from([aa, ab]);
      for (let j = 0; j < pB.length - 1; j++) {
        let ba = new Vector2(pB[j]);
        let bb = new Vector2(pB[j + 1]);
        let lineB = new Vector2Line(ba, bb);
        let lineBRect = Rect2.from([ba, bb]);
        let v = lineB.intersect(lineA);
        if (!v)
          continue;
        if (lineBRect.containsPoint(v) && lineARect.containsPoint(v)) {
          intersects.push(v);
        }
      }
      if (intersectRect.containsPoint(aa)) {
        if (isPointInsidePolygon(pB, aa)) {
          intersects.push(aa);
        }
      }
    }
    for (let j = 0; j < pB.length - 1; j++) {
      let ba = new Vector2(pB[j]);
      if (intersectRect.containsPoint(ba)) {
        if (isPointInsidePolygon(pA, ba)) {
          intersects.push(ba);
        }
      }
    }
    if (!intersects.length)
      return null;
    let resPolygon = intersects;
    return resPolygon;
  }
}
__name(getPolygonIntersect, "getPolygonIntersect");
__name9(getPolygonIntersect, "getPolygonIntersect");

// node_modules/@catsums/targetobservers/lib/esm/TransformObserver.js
var import_lodash = __toESM(require_lodash());
var __defProp10 = Object.defineProperty;
var __name10 = /* @__PURE__ */ __name((target, value) => __defProp10(target, "name", { value, configurable: true }), "__name");
var defaultObserveOpts = {
  boundingrect: {
    globalposition: false,
    gp: false,
    localposition: false,
    lp: false,
    size: false,
    s: false
  },
  offsetrect: {
    globalposition: false,
    gp: false,
    localposition: false,
    lp: false,
    size: false,
    s: false
  },
  transform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  localtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  globaltransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  matrixtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  localmatrixtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  },
  globalmatrixtransform: {
    translation: false,
    position: false,
    translate: false,
    p: false,
    t: false,
    rotation: false,
    rotate: false,
    r: false,
    scale: false,
    size: false,
    s: false,
    anchor: false,
    origin: false,
    a: false
  }
};
var TransformObserver = class extends ProcessingTarget {
  static {
    __name(this, "TransformObserver");
  }
  static {
    __name10(this, "TransformObserver");
  }
  targetName = randomID("[TransformObserver:", "]");
  _precision = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (entries, obs) => {
  }, opts) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3 } = opts;
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._callback = callback;
  }
  onPhysicsProcess(delta) {
    this.checkUpdates(Object.values(this._observedElements));
  }
  async checkUpdates(elements) {
    let entries = [];
    let promises = [];
    for (let elem of elements) {
      promises.push(
        this.checkUpdate(elem)
      );
    }
    let results = await Promise.all(promises);
    for (let res of results) {
      if (res && res instanceof Object) {
        entries.push(res);
      }
    }
    if (entries.length) {
      try {
        this.handleEntries(entries);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
  async checkUpdate(elem) {
    if (!elem)
      return null;
    let processTime = this.elapsedFixedTime;
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return null;
    let entry = {
      id: proxy.id,
      target: elem,
      changes: {}
    };
    for (let optK of Object.keys(proxy)) {
      let optObj = proxy[optK];
      if (!optObj || !import_lodash.default.isObject(optObj) || !Object.keys(optObj).length)
        continue;
      let _change = {};
      switch (optK) {
        case "boundingrect":
          {
            let localBoundingRect = getLocalBoundingRect(elem).toJSON();
            let globalBoundingRect = getLocalBoundingRect(elem).toJSON();
            if (optObj.globalposition) {
              if (!compareJSON(optObj.globalposition, globalBoundingRect.position)) {
                _change.globalposition = {
                  old: optObj.globalposition,
                  new: globalBoundingRect.position
                };
              }
            }
            if (optObj.localposition) {
              if (!compareJSON(optObj.localposition, localBoundingRect.position)) {
                _change.localposition = {
                  old: optObj.localposition,
                  new: localBoundingRect.position
                };
              }
            }
            if (optObj.size) {
              if (!compareJSON(optObj.size, localBoundingRect.size)) {
                _change.size = {
                  old: optObj.size,
                  new: localBoundingRect.size
                };
              }
            }
          }
          break;
        case "offsetrect":
          {
            let localOffsetRect = getLocalOffsetRect(elem).toJSON();
            let globalOffsetRect = getGlobalOffsetRect(elem).toJSON();
            if (optObj.globalposition) {
              if (!compareJSON(optObj.globalposition, globalOffsetRect.position)) {
                _change.globalposition = {
                  old: optObj.globalposition,
                  new: globalOffsetRect.position
                };
              }
            }
            if (optObj.localposition) {
              if (!compareJSON(optObj.localposition, localOffsetRect.position)) {
                _change.localposition = {
                  old: optObj.localposition,
                  new: localOffsetRect.position
                };
              }
            }
            if (optObj.size) {
              if (!compareJSON(optObj.size, localOffsetRect.size)) {
                _change.size = {
                  old: optObj.size,
                  new: localOffsetRect.size
                };
              }
            }
          }
          break;
        case "localtransform":
          {
            let t = getElemTransformFromCSSStyle(elem, this._precision);
            let localTransform = t.toJSON();
            if (optObj.translation) {
              if (!compareJSON(optObj.translation, localTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: localTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!compareJSON(optObj.rotation, localTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: localTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!compareJSON(optObj.scale, localTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: localTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!compareJSON(optObj.anchor, localTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: localTransform.anchor
                };
              }
            }
          }
          break;
        case "globaltransform":
          {
            let localTransform = getElemExpandedTransformFromCSSStyle(elem, this._precision);
            let globalTransform = localTransform.getGlobalTransform().toJSON();
            if (optObj.translation) {
              if (!compareJSON(optObj.translation, globalTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: globalTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!compareJSON(optObj.rotation, globalTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: globalTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!compareJSON(optObj.scale, globalTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: globalTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!compareJSON(optObj.anchor, globalTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: globalTransform.anchor
                };
              }
            }
          }
          break;
        case "localmatrixtransform":
          {
            let localTransform = getElemTransformFromMatrix(elem, this._precision).toJSON();
            if (optObj.translation) {
              if (!compareJSON(optObj.translation, localTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: localTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!compareJSON(optObj.rotation, localTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: localTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!compareJSON(optObj.scale, localTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: localTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!compareJSON(optObj.anchor, localTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: localTransform.anchor
                };
              }
            }
          }
          break;
        case "globalmatrixtransform":
          {
            let localTransform = getElemExpandedTransformFromMatrix(elem, this._precision);
            let globalTransform = localTransform.getGlobalTransform().toJSON();
            if (optObj.translation) {
              if (!compareJSON(optObj.translation, globalTransform.position)) {
                _change.translation = {
                  old: optObj.translation,
                  new: globalTransform.position
                };
              }
            }
            if (optObj.rotation) {
              if (!compareJSON(optObj.rotation, globalTransform.rotation)) {
                _change.rotation = {
                  old: optObj.rotation,
                  new: globalTransform.rotation
                };
              }
            }
            if (optObj.scale) {
              if (!compareJSON(optObj.scale, globalTransform.scale)) {
                _change.scale = {
                  old: optObj.scale,
                  new: globalTransform.scale
                };
              }
            }
            if (optObj.anchor) {
              if (!compareJSON(optObj.anchor, globalTransform.anchor)) {
                _change.anchor = {
                  old: optObj.anchor,
                  new: globalTransform.anchor
                };
              }
            }
          }
          break;
        default:
          break;
      }
      if (Object.keys(_change).length) {
        entry.changes[optK] = _change;
      }
    }
    this.processEntry(elem, entry, {
      processTime,
      logTime: /* @__PURE__ */ new Date()
    });
    if (Object.keys(entry.changes).length) {
      return entry;
    }
    return null;
  }
  handleEntries(ents) {
    if (!import_lodash.default.isArray(ents))
      return;
    try {
      this._callback(ents, this);
    } catch (err) {
      console.log(err);
    }
    for (let ent of ents) {
      if (!ent)
        return;
      this.emitSignal("transformChange", {
        changes: ent?.changes
      }, [ent.target]);
    }
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let k of Object.keys(entry.changes)) {
        let _change = entry.changes[k];
        for (let _k of Object.keys(_change)) {
          if (import_lodash.default.isObject(_change[_k].new))
            proxy[k][_k] = Object.assign({}, _change[_k].new);
          else
            proxy[k][_k] = _change[_k].new;
        }
      }
      entry.process = {
        processTime: process.processTime,
        logTime: process.logTime,
        timeTaken: process.processTime - proxy._process.processTime
      };
    }
    proxy._process.processTime = process.processTime;
    proxy._process.logTime = process.logTime;
  }
  observe(elem, opts = defaultObserveOpts) {
    let proxies = [];
    if (opts instanceof Array) {
      let arr = opts;
      opts = {};
      for (let k of arr) {
        k = k.toLowerCase();
        opts[k] = true;
      }
    }
    if (opts instanceof Object == false)
      opts = defaultObserveOpts;
    if (elem instanceof Array) {
      proxies = [];
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Element) {
      let obsOpts = Object.assign({}, defaultObserveOpts);
      for (let k of Object.keys(opts)) {
        k = k.toLowerCase();
        if (!(k in obsOpts))
          continue;
        if (typeof opts[k] === "boolean") {
          for (let _k of Object.keys(obsOpts[k])) {
            _k = _k.toLowerCase();
            obsOpts[k][_k] = opts[k];
          }
        } else if (import_lodash.default.isArray(opts[k])) {
          for (let _k of opts[k]) {
            _k = _k.toLowerCase();
            if (!(_k in obsOpts[k]))
              continue;
            obsOpts[k][_k] = true;
          }
        } else if (import_lodash.default.isObject(opts[k])) {
          for (let _k of Object.keys(opts[k])) {
            _k = _k.toLowerCase();
            if (!(_k in obsOpts[k]))
              continue;
            obsOpts[k][_k] = opts[k][_k] ? true : false;
          }
        }
      }
      let connectId = this.connectElement(elem);
      let proxy = {
        id: connectId,
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        }
      };
      this._observedElements[proxy.id] = elem;
      for (let opt of Object.keys(obsOpts)) {
        let isFalse = true;
        for (let k of Object.keys(obsOpts[opt])) {
          if (obsOpts[opt][k] == true) {
            isFalse = false;
          } else {
            delete obsOpts[opt][k];
          }
        }
        if (isFalse) {
          delete obsOpts[opt];
        }
      }
      for (let opt of Object.keys(obsOpts)) {
        opt = opt.toLowerCase();
        if (!proxy[opt])
          proxy[opt] = {};
        let optObj = obsOpts[opt];
        switch (opt) {
          case "boundingrect":
            {
              let globalRect = getGlobalBoundingRect(elem);
              let localRect = getLocalBoundingRect(elem);
              if (optObj.globalposition || optObj.gp) {
                proxy.boundingrect.globalposition = globalRect.position.toJSON();
              }
              if (optObj.localposition || optObj.lp) {
                proxy.boundingrect.localposition = localRect.position.toJSON();
              }
              if (optObj.size || optObj.s) {
                proxy.boundingrect.size = localRect.size.toJSON();
              }
            }
            break;
          case "offsetrect":
            {
              let globalRect = getGlobalOffsetRect(elem);
              let localRect = getLocalOffsetRect(elem);
              if (optObj.globalposition || optObj.gp) {
                proxy.offsetrect.globalposition = globalRect.position.toJSON();
              }
              if (optObj.localposition || optObj.lp) {
                proxy.offsetrect.localposition = localRect.position.toJSON();
              }
              if (optObj.size || optObj.s) {
                proxy.offsetrect.size = localRect.size.toJSON();
              }
            }
            break;
          case "transform":
          case "localtransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = getElemTransformFromCSSStyle(elem, precision);
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.localtransform.translation = localtransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.localtransform.scale = localtransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.localtransform.rotation = localtransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.localtransform.anchor = localtransform.anchor.toJSON();
              }
            }
            break;
          case "globaltransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = getElemExpandedTransformFromCSSStyle(elem, precision);
              let globaltransform = localtransform.getGlobalTransform();
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.globaltransform.translation = globaltransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.globaltransform.scale = globaltransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.globaltransform.rotation = globaltransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.globaltransform.anchor = globaltransform.anchor.toJSON();
              }
            }
            break;
          case "matrixtransform":
          case "localmatrixtransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = getElemTransformFromMatrix(elem, precision);
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.localmatrixtransform.translation = localtransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.localmatrixtransform.scale = localtransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.localmatrixtransform.rotation = localtransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.localmatrixtransform.anchor = localtransform.anchor.toJSON();
              }
            }
            break;
          case "globalmatrixtransform":
            {
              let precision = opts.precision || this._precision;
              let localtransform = getElemExpandedTransformFromMatrix(elem, precision);
              let globaltransform = localtransform.getGlobalTransform();
              if (optObj.translation || optObj.position || optObj.p || optObj.translate || optObj.t) {
                proxy.globalmatrixtransform.translation = globaltransform.position.toJSON();
              }
              if (optObj.scale || optObj.s || optObj.size) {
                proxy.globalmatrixtransform.scale = globaltransform.scale.toJSON();
              }
              if (optObj.rotation || optObj.r || optObj.rotate) {
                proxy.globalmatrixtransform.rotation = globaltransform.rotation;
              }
              if (optObj.anchor || optObj.a || optObj.origin) {
                proxy.globalmatrixtransform.anchor = globaltransform.anchor.toJSON();
              }
            }
            break;
          default:
            break;
        }
      }
      this._proxies.set(elem, proxy);
      proxies = [proxy];
    }
    return proxies;
  }
  disconnect(elem) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    delete this._observedElements[proxy.id];
    this.disconnectElement(elem);
    this._proxies.delete(elem);
  }
};

// node_modules/@catsums/targetobservers/lib/esm/PropertyObserver.js
var import_lodash2 = __toESM(require_lodash());
var __defProp11 = Object.defineProperty;
var __name11 = /* @__PURE__ */ __name((target, value) => __defProp11(target, "name", { value, configurable: true }), "__name");
Object.entries(ElementFunctions_exports).forEach(([name, exported]) => window[name] = exported);
var PropertyObserver = class extends ProcessingTarget {
  static {
    __name(this, "PropertyObserver");
  }
  static {
    __name11(this, "PropertyObserver");
  }
  targetName = randomID("[PropertyObserver:", "]");
  _precision = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (ent, obs) => {
  }, opts = {}) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3 } = opts;
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._callback = callback;
  }
  onPhysicsProcess(delta) {
    this.checkUpdates(Object.values(this._observedElements));
  }
  async checkUpdates(elements) {
    let entries = [];
    let promises = [];
    for (let elem of elements) {
      promises.push(
        this.checkUpdate(elem)
      );
    }
    let results = await Promise.all(promises);
    for (let res of results) {
      if (res && res instanceof Object) {
        entries.push(res);
      }
    }
    if (entries.length) {
      try {
        this.handleEntries(entries);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
  async checkUpdate(elem) {
    if (!elem)
      return null;
    let processTime = this.elapsedFixedTime;
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return null;
    let entry = {
      id: proxy.id,
      target: elem,
      changes: {}
    };
    for (let _prop of Object.keys(proxy.properties)) {
      let optObj = proxy[_prop];
      if (!optObj || import_lodash2.default.isObject(optObj) || !Object.keys(optObj).length)
        continue;
      let _change = {};
      if (_prop.startsWith("$")) {
        let _flag = _prop.replace("$", "");
        switch (_flag) {
          case "self":
            {
            }
            break;
          default:
            break;
        }
      } else {
        let curr = elem[_prop];
        let prev = proxy.properties[_prop];
        if (!compareJSON(curr, prev)) {
          _change = {
            old: prev,
            new: curr
          };
        }
      }
      if (Object.keys(_change).length) {
        entry.changes[_prop] = _change;
      }
    }
    this.processEntry(elem, entry, {
      processTime,
      logTime: /* @__PURE__ */ new Date()
    });
    if (Object.keys(entry.changes).length) {
      return entry;
    }
    return null;
  }
  handleEntries(ents) {
    if (!import_lodash2.default.isArray(ents))
      return;
    try {
      this._callback(ents, this);
    } catch (err) {
      console.log(err);
    }
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let k of Object.keys(entry.changes)) {
        let _change = entry.changes[k];
        for (let _prop of Object.keys(_change)) {
          if (import_lodash2.default.isObject(_change[_prop].new))
            proxy.properties[_prop] = Object.assign({}, _change[_prop].new);
          else
            proxy.properties[_prop] = _change[k].new;
        }
      }
      entry.process = {
        processTime: process.processTime,
        logTime: process.logTime,
        timeTaken: process.processTime - proxy._process.processTime
      };
    }
    proxy._process.processTime = process.processTime;
    proxy._process.logTime = process.logTime;
  }
  observe(elem, opts) {
    let proxies = null;
    if (opts instanceof Array) {
      let arr = opts;
      opts = {};
      for (let k of arr) {
        if (typeof k !== "string")
          continue;
        opts[k] = true;
      }
    }
    if (opts instanceof Object)
      opts = {};
    if (elem instanceof Array) {
      proxies = [];
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Object) {
      let proxy = {
        id: hash64(JSON.stringify(elem)),
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        },
        properties: {}
      };
      for (let opt of Object.keys(opts)) {
        if (opts[opt] == true && elem.hasOwnProperty(opt)) {
          proxy.properties[opt] = elem[opt];
        }
      }
      return [proxy];
    }
    return proxies;
  }
  disconnect(elem) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    this._proxies.delete(elem);
  }
};

// node_modules/@catsums/targetobservers/lib/esm/CollisionObserver.js
var import_lodash3 = __toESM(require_lodash());
var __defProp12 = Object.defineProperty;
var __name12 = /* @__PURE__ */ __name((target, value) => __defProp12(target, "name", { value, configurable: true }), "__name");
var defaultObserveOpts2 = {
  rects: {
    boundingrect: false,
    offsetrect: false,
    transformrect: false,
    clippath: false,
    shapeoutside: false
    // svgshape: false,
  },
  collisionLayers: [],
  targetLayers: [],
  targets: [],
  tolerance: 1e-3
};
var CollisionObserver = class extends ProcessingTarget {
  static {
    __name(this, "CollisionObserver");
  }
  static {
    __name12(this, "CollisionObserver");
  }
  targetName = randomID("[CollisionObserver:", "]");
  _precision = 1e-3;
  _tolerance = 1e-3;
  _observedElements = {};
  // {String(connectID):Element}
  _proxies = /* @__PURE__ */ new Map();
  // {String(connectID):ProxyObject} or Map({Element:ProxyObject})
  _collisionLayers = {};
  // {String:String[connectID]}
  _entriesQueue = [];
  _callback = (entries, obs) => {
  };
  constructor(callback = (entries, obs) => {
  }, opts) {
    let { FPS = 12, frameTolerance = Math.sqrt(Math.E) / 1e3, active = false, precision = 1e-3, tolerance = 1e-3 } = opts;
    super({ FPS, frameTolerance, active });
    this._precision = precision;
    this._tolerance = tolerance;
    this._callback = callback;
  }
  onPhysicsProcess(delta) {
    this.checkUpdates(Object.values(this._observedElements));
  }
  async checkUpdates(elements) {
    let entries = [];
    let promises = [];
    for (let elem of elements) {
      promises.push(
        this.checkUpdate(elem)
      );
    }
    let results = await Promise.all(promises);
    for (let res of results) {
      if (res && import_lodash3.default.isObject(res)) {
        entries.push(res);
      }
    }
    if (entries.length) {
      try {
        this.handleEntries(entries);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
  async checkUpdate(elem) {
    if (!elem)
      return null;
    let processTime = this.elapsedFixedTime;
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return null;
    let entry = {
      id: proxy.id,
      target: elem,
      collisions: []
      // {target:Elem, type:CollisionType, layers:[String], intersect:Rect2, intersectPoints:[{x,y}]}
    };
    let targetLayers = proxy.collision.targetLayers;
    for (let _layer of targetLayers) {
      let collLayer = this._collisionLayers[_layer];
      if (!collLayer)
        continue;
      for (let targID of collLayer) {
        let targElem = this._observedElements[targID];
        if (!targElem)
          continue;
        let targProxy = this._proxies.get(targElem);
        if (!targProxy)
          continue;
        let _collisionData = {};
        for (let opt of Object.keys(proxy.rects)) {
          if (!proxy.rects[opt])
            continue;
          let existingCollData = entry.collisions.find((collData) => collData.target == targElem && collData.rect == opt);
          if (existingCollData) {
            existingCollData.layers.push(_layer);
            continue;
          }
          switch (opt) {
            case "boundingrect":
              {
                let currRect = getGlobalBoundingRect(elem);
                let targRect = getGlobalBoundingRect(targElem);
                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                if (_intersect && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                } else if (!_intersect && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersect && !compareJSON(_intersect, proxy.currentCollisions.find((_c) => _c.id == targID))) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                }
              }
              break;
            case "offsetrect":
              {
                let currRect = getGlobalOffsetRect(elem);
                let targRect = getGlobalOffsetRect(targElem);
                let _intersect = currRect.getIntersectWith(targRect, this._tolerance);
                if (_intersect && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                } else if (!_intersect && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersect && !compareJSON(_intersect, proxy.currentCollisions.find((_c) => _c.id == targID))) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersect.toJSON();
                }
              }
              break;
            case "transformrect":
              {
                let currRect = getGlobalOffsetRect(elem);
                let targRect = getGlobalOffsetRect(targElem);
                let elemT0 = getElemTransformFromCSSStyle(elem, this._tolerance);
                let elemT1 = getElemTransformFromMatrix(elem, this._tolerance);
                let targT0 = getElemTransformFromCSSStyle(targElem, this._tolerance);
                let targT1 = getElemTransformFromMatrix(targElem, this._tolerance);
                let elemPts = currRect.getCorners().map((pt) => {
                  return elemT1.applyTransform(pt, elemT1.anchor);
                }).map((pt) => {
                  return elemT0.applyTransform(pt, elemT0.anchor);
                });
                let targPts = targRect.getCorners().map((pt) => {
                  return targT1.applyTransform(pt, targT1.anchor);
                }).map((pt) => {
                  return targT0.applyTransform(pt, targT0.anchor);
                });
                let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);
                if (_intersects && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                } else if (!_intersects && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersects && !compareJSON(_intersects, proxy.currentCollisions.find((_c) => _c.id == targID))) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 0,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                }
              }
              break;
            case "shapeoutside":
            case "clippath":
              {
                let sOpt = "clippath";
                if (opt == "clippath")
                  sOpt = "clip-path";
                if (opt == "shapeoutside")
                  sOpt = "shape-outside";
                let elemClipPath = window.getComputedStyle(elem)[sOpt];
                let targClipPath = window.getComputedStyle(targElem)[sOpt];
                let [elemClipPathShape, elemClipPathProps] = getBasicShapeProps(elemClipPath);
                let [targClipPathShape, targClipPathProps] = getBasicShapeProps(targClipPath);
                let elemPts = getElemPointsBasedOnBasicShape(elem, elemClipPathShape, elemClipPathProps, { opts: {
                  vertices: 8,
                  increment: 0.125
                } });
                let targPts = getElemPointsBasedOnBasicShape(targElem, targClipPathShape, targClipPathProps, { opts: {
                  vertices: 8,
                  increment: 0.125
                } });
                let _intersects = getPolygonIntersect(elemPts, targPts, this._precision);
                if (_intersects && !proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: 1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                } else if (!_intersects && proxy.currentCollisions.find((_c) => _c.id == targID)) {
                  _collisionData = {
                    targetID: targID,
                    target: targElem,
                    rect: opt,
                    type: -1,
                    layers: [_layer]
                  };
                  _collisionData.intersect = null;
                } else if (_intersects) {
                  let _x = proxy.currentCollisions.find((_c) => _c.id == targID);
                  if (!compareJSON(_intersects, _x?.intersect)) {
                    _collisionData = {
                      targetID: targID,
                      target: targElem,
                      rect: opt,
                      type: 0,
                      layers: [_layer]
                    };
                    _collisionData.intersect = _intersects.map((v) => v.toJSON?.() ?? v);
                  }
                }
              }
              break;
            default:
              break;
          }
        }
        if (Object.keys(_collisionData).length) {
          entry.collisions.push(_collisionData);
        }
      }
    }
    this.processEntry(elem, entry, {
      processTime,
      logTime: /* @__PURE__ */ new Date()
    });
    if (entry.collisions.length) {
      return entry;
    }
    return null;
  }
  handleEntries(ents) {
    this._callback(ents, this);
    let obs = this;
    ents.forEach((ent) => {
      ent.collisions.forEach((collData) => {
        if (!collData)
          return;
        switch (collData.type) {
          case 1:
            {
              obs.emitSignal("collisionIn", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
          case -1:
            {
              obs.emitSignal("collisionOut", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
          case 0:
            {
              obs.emitSignal("collisionChange", {
                collisionData: collData
              }, [ent.target]);
            }
            break;
        }
        obs.emitSignal("collision", {
          collisionData: collData
        }, [ent.target]);
      });
    });
  }
  processEntry(elem, entry, process) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    if (entry) {
      for (let collData of entry.collisions) {
        let targID = collData.targetID;
        if (collData.type == 1) {
          proxy.currentCollisions.push({
            id: targID,
            intersect: collData.intersect,
            rect: collData.rect
          });
        } else if (collData.type == -1) {
          let _coll = proxy.currentCollisions.find((_c) => _c.id == targID);
          let ind = proxy.currentCollisions.indexOf(_coll);
          proxy.currentCollisions.splice(ind, 1);
        } else if (collData.type == 0) {
          let _coll = proxy.currentCollisions.find((_c) => _c.id == targID);
          Object.assign(_coll, {
            id: targID,
            intersect: collData.intersect,
            rect: collData.rect
          });
        }
      }
      entry.process = {
        processTime: process.processTime,
        logTime: process.logTime,
        timeTaken: process.processTime - proxy._process.processTime
      };
    }
    proxy._process.processTime = process.processTime;
    proxy._process.logTime = process.logTime;
  }
  observe(elem, opts = defaultObserveOpts2) {
    let proxies = [];
    if (!import_lodash3.default.isObject(opts))
      opts = defaultObserveOpts2;
    if (elem instanceof Array) {
      let arr = elem;
      for (let _elem of arr) {
        let p = this.observe(_elem, opts);
        if (p)
          proxies.concat(p);
      }
    } else if (elem instanceof Element) {
      let obsOpts = Object.assign({}, defaultObserveOpts2);
      if (opts.rects instanceof Array) {
        for (let r of opts.rects) {
          r = r.toLowerCase();
          if (!(r in obsOpts.rects))
            continue;
          obsOpts.rects[r] = true;
        }
      } else if (import_lodash3.default.isObject(opts.rects)) {
        for (let r of Object.keys(opts.rects)) {
          r = r.toLowerCase();
          if (!(r in obsOpts.rects))
            continue;
          obsOpts.rects[r] = opts.rects[r] ? true : false;
        }
      }
      if (import_lodash3.default.isArray(opts.targets)) {
        obsOpts.targets = opts.targets.filter((_targ) => _targ instanceof Element);
      }
      if (import_lodash3.default.isArray(opts.collisionLayers)) {
        obsOpts.collisionLayers = opts.collisionLayers.map((_layer) => `${_layer}`);
      }
      if (import_lodash3.default.isArray(opts.targetLayers)) {
        obsOpts.targetLayers = opts.targetLayers.map((_layer) => `${_layer}`);
      }
      if (typeof opts.tolerance === "number") {
        obsOpts.tolerance = opts.tolerance;
      }
      let connectId = this.connectElement(elem);
      let proxy = {
        id: connectId,
        _process: {
          processTime: this.elapsedFixedTime,
          logTime: /* @__PURE__ */ new Date()
        },
        currentCollisions: [],
        rects: {},
        tolerance: 0,
        collision: {}
      };
      this._observedElements[proxy.id] = elem;
      for (let k of Object.keys(obsOpts.rects)) {
        if (obsOpts.rects[k] == false) {
          delete obsOpts.rects[k];
        } else {
          k = k.toLowerCase();
          proxy.rects[k] = obsOpts.rects[k] ? true : false;
        }
      }
      for (let _layer of obsOpts.collisionLayers) {
        if (!(_layer in this._collisionLayers)) {
          this._collisionLayers[_layer] = [];
        }
        this._collisionLayers[_layer].push(proxy.id);
      }
      proxy.collision = {
        layers: obsOpts.collisionLayers,
        targets: obsOpts.targets,
        targetLayers: obsOpts.targetLayers
      };
      proxy.tolerance = obsOpts.tolerance;
      this._proxies.set(elem, proxy);
      proxies = [proxy];
    }
    return proxies;
  }
  disconnect(elem) {
    let proxy = this._proxies.get(elem);
    if (!proxy)
      return;
    delete this._observedElements[proxy.id];
    this.disconnectElement(elem);
    this._proxies.delete(elem);
    for (let _layer of proxy.collision?.layers) {
      if (!this._collisionLayers[_layer])
        continue;
      let ind = this._collisionLayers[_layer].indexOf(proxy.id);
      if (ind >= 0) {
        this._collisionLayers[_layer].splice(ind, 1);
      }
    }
  }
};

// node_modules/@catsums/conductorjs/lib/esm/Conductor.js
var __defProp13 = Object.defineProperty;
var __name13 = /* @__PURE__ */ __name((target, value) => __defProp13(target, "name", { value, configurable: true }), "__name");
function shuffleArray(arr) {
  let array = arr.slice();
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
}
__name(shuffleArray, "shuffleArray");
__name13(shuffleArray, "shuffleArray");
var Conductor = class extends ProcessingTarget {
  static {
    __name(this, "Conductor");
  }
  static {
    __name13(this, "Conductor");
  }
  targetName = randomID("[Conductor:", "]");
  bpm = 100;
  measure = 4;
  audio = null;
  audioContext = null;
  source = null;
  analyser = null;
  volumeControl = null;
  volume = 0;
  _mute = false;
  musicContainer = null;
  get crotchet() {
    return 60 / this.bpm;
  }
  get stepCrotchet() {
    return this.crotchet / this.measure;
  }
  get bps() {
    return this.bpm / 60;
  }
  get currStep() {
    return Math.trunc(this.songPos / this.stepCrotchet);
  }
  get currBeat() {
    return Math.trunc(this.currStep / this.measure);
  }
  get currBar() {
    return Math.trunc(this.currBeat / 4);
  }
  lastStep = -1;
  lastBeat = -1;
  get totalSteps() {
    return Math.ceil(this.songLength * this.bps * this.measure);
  }
  get totalBeats() {
    return Math.ceil(this.totalSteps / this.measure);
  }
  timeElapsed = 0;
  songPos = 0;
  songLength = 0;
  _isSeeking = false;
  constructor(bpm = 100, measure = 4, audioElement = null) {
    super();
    this.connectElement(document.querySelector("body"));
    this.audioContext = new window.AudioContext({ latencyHint: "interactive" });
    this.changeStats(bpm, measure);
    this.connectAudioObject(audioElement);
    this.connectMusicContainer(new MusicContainer());
  }
  onReady() {
    super.onReady();
  }
  onProcess(delta) {
    super.onProcess(delta);
  }
  onPhysicsProcess(delta) {
    if (!this.audioIsConnected())
      return;
    this.timeElapsed += delta;
    this.songPos = this.audio.currentTime;
    if (this.isPlaying() || this._isSeeking) {
      var contextOutputTime = this.audioContext.getOutputTimestamp().contextTime;
      var contextProcessTime = this.audioContext.currentTime;
      this.songPos += contextProcessTime - contextOutputTime;
      this.songPos -= this.audioContext.baseLatency;
      this.processStep();
    }
  }
  //Process Functions
  processStep() {
    this.songLength = this.audio?.duration;
    if (this.currStep >= this.totalSteps) {
      if (this.isPlaying()) {
        this.stop();
        this.songEnd();
      }
    }
    if (this.currStep != this.lastStep || this._isSeeking) {
      this.stepHit();
      this.lastStep = this.currStep;
    }
    if (this.currBeat != this.lastBeat || this._isSeeking) {
      this.beatHit();
      this.lastBeat = this.currBeat;
      if (this.currBeat % 4 == 0)
        this.barHit();
    }
  }
  //Emitting/Event Functions
  stepHit() {
    let data = shuffleArray(Array.from(this.frequencyData()));
    let delay = this.stepDelay();
    this.emitSignal("stepHit", {
      step: this.currStep,
      crotchet: this.crotchet,
      stepCrotchet: this.stepCrotchet,
      semibreve: this.crotchet * 4,
      frequencyData: data,
      bpm: this.bpm,
      measure: this.measure,
      delay,
      volume: this.getVolume()
    });
  }
  beatHit() {
    let data = shuffleArray(Array.from(this.frequencyData()));
    let delay = this.stepDelay();
    this.emitSignal("beatHit", {
      beat: this.currBeat,
      crotchet: this.crotchet,
      stepCrotchet: this.stepCrotchet,
      semibreve: this.crotchet * 4,
      frequencyData: data,
      bpm: this.bpm,
      measure: this.measure,
      delay,
      volume: this.getVolume(),
      seeking: this._isSeeking
    });
  }
  barHit() {
    let data = shuffleArray(Array.from(this.frequencyData()));
    let delay = this.stepDelay();
    this.emitSignal("barHit", {
      bar: this.currBar,
      crotchet: this.crotchet,
      stepCrotchet: this.stepCrotchet,
      semibreve: this.crotchet * 4,
      frequencyData: data,
      bpm: this.bpm,
      measure: this.measure,
      delay,
      volume: this.getVolume(),
      seeking: this._isSeeking
    });
  }
  songEnd() {
    let data = shuffleArray(Array.from(this.frequencyData()));
    let delay = this.stepDelay();
    this.emitSignal("songEnd", {
      step: this.currStep,
      beat: this.currBeat,
      bar: Math.trunc(this.currBeat / 4),
      crotchet: this.crotchet,
      stepCrotchet: this.stepCrotchet,
      semibreve: this.crotchet * 4,
      frequencyData: data,
      bpm: this.bpm,
      measure: this.measure,
      delay,
      volume: this.getVolume(),
      seeking: this._isSeeking
    });
  }
  //Change and Connection Functions
  changeStats(bpm, measure) {
    if (bpm < 1)
      bpm = 1;
    if (measure < 1)
      measure = 1;
    this.bpm = Math.round(Number(bpm));
    this.measure = Math.round(Number(measure));
    this.emitSignal("bpmChange", {
      bpm: this.bpm,
      measure: this.measure
    });
    this.connectAudioObject(this.audio);
  }
  connectMusicContainer(container) {
    if (container instanceof MusicContainer === false)
      return;
    this.connectElement(container);
    this.musicContainer = container;
    container.conductor = this;
    if (this._logs)
      console.log("MusicContainer Connected");
    this.emitSignal("musicContainerConnect", {
      container: container.connectId
    });
    container.addEventListener("barHit", container.onBarHit);
    container.addEventListener("stepHit", container.onStepHit);
    container.addEventListener("beatHit", container.onBeatHit);
    container.addEventListener("bpmChange", container.onBpmChange);
  }
  connectAudioObject(audioElement) {
    if (!audioElement || typeof audioElement !== "object" || audioElement instanceof Audio === false)
      return;
    if (audioElement != this.audio) {
      this.audio = audioElement;
      this.source = this.audioContext.createMediaElementSource(this.audio);
      this.analyser = this.audioContext.createAnalyser();
      this.volumeControl = this.audioContext.createGain();
      this.source.connect(this.volumeControl);
      this.volumeControl.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      if (this._logs)
        console.log("AudioElement Connected");
      this.emitSignal("audioConnect", {
        audioFile: this.audio.src
      });
    }
    this.audio = audioElement;
    this.songLength = this.audio.duration;
    this.audio.onplay = () => {
      this.audioContext.resume();
    };
    this.audio.onpause = () => {
      this.audioContext.suspend();
    };
    this.audio.ontimeupdate = () => {
    };
    this.audio.ondurationchange = () => {
      this.songLength = this.audio.duration;
      this.resetConductor();
    };
    this.audio.onseeking = () => {
      this._isSeeking = true;
      this.processStep();
    };
    this.audio.onseeked = () => {
      this.processStep();
      this._isSeeking = false;
    };
  }
  resetConductor() {
    this.lastStep = -1;
    this.lastBeat = -1;
    this.timeElapsed = 0;
    this.songPos = 0;
  }
  resetBeat() {
    this.lastStep = -1;
    this.lastBeat = -1;
  }
  //Playing functions
  resume() {
    this.playOn();
  }
  playOn() {
    this.playFromStep(this.currStep);
  }
  pause() {
    if (this.audioIsConnected()) {
      this.audioContext.suspend();
      if (!this.audio.paused) {
        this.audio.pause();
      }
    }
  }
  stop() {
    if (this.audioIsConnected())
      this.audio.currentTime = 0;
    this.pause();
    this.resetConductor();
  }
  setStep(step) {
    if (step < 0 || isNaN(step))
      step = 0;
    if (this.audioIsConnected()) {
      this.audio.currentTime = step * this.stepCrotchet;
    }
    this.resetBeat();
    this.emitSignal("stepChange");
  }
  setBeat(beat) {
    this.setStep(beat * this.measure);
  }
  playFromStep(step) {
    if (!this.audioIsConnected())
      return;
    this.audioContext.resume();
    if (this.audio.paused) {
      this.audio.play();
    }
    this.setStep(step);
  }
  playFromBeat(beat) {
    this.playFromStep(beat * this.measure);
  }
  mute() {
    this._mute = true;
    if (!this.volumeControl)
      return;
    this.volumeControl.gain.value = 0;
  }
  unmute() {
    this._mute = false;
    if (!this.volumeControl)
      return;
    this.volumeControl.gain.value = this.volume;
  }
  isMuted() {
    return this._mute;
  }
  setVolume(val) {
    if (val < 0 || isNaN(val))
      return;
    this.volume = val;
    if (this.volumeControl && !this.isMuted()) {
      this.volumeControl.gain.value = this.volume;
    }
  }
  getVolume() {
    return this.volume;
  }
  //Checkers
  frequencyData() {
    let data = new Uint8Array();
    if (this.analyser) {
      data = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(data);
    }
    return data;
  }
  stepDelay() {
    return this.audio.currentTime - this.currStep * this.stepCrotchet;
  }
  audioIsConnected() {
    if (this.audio && typeof this.audio === "object" && this.audio instanceof Audio)
      return true;
    return false;
  }
  isPlaying() {
    if (!this.audio?.paused)
      return true;
    return false;
  }
};
var MusicContainer = class extends ProcessingTarget {
  static {
    __name(this, "MusicContainer");
  }
  static {
    __name13(this, "MusicContainer");
  }
  targetName = randomID("[MusicContainer:", "]");
  steps = [];
  slots = {};
  bpm = null;
  measure = null;
  conductor = null;
  constructor(conductor2, steps = []) {
    super();
    this.conductor = conductor2 instanceof Conductor ? conductor2 : null;
    this.slots = {};
    if (this.conductor) {
      this.steps = new Array(conductor2.totalSteps);
      if (steps instanceof Array && steps[0] instanceof Object) {
        this.setSteps(steps);
      }
      this.syncConductor();
    }
  }
  setSteps(steps) {
    if (this.conductor) {
      if (steps instanceof Array && steps[0] instanceof Object) {
        for (let coll of steps) {
          if (!coll.step)
            continue;
          this.addSlot(coll);
        }
      } else if (steps instanceof Object) {
        for (let collID of Object.keys(steps)) {
          let coll = steps[collID];
          if (!coll.step)
            continue;
          this.addSlot(coll);
        }
      }
      this.updateSlots();
      this.syncConductor();
    }
  }
  getNotes(index) {
    if (index < 0 || index >= this.conductor.totalSteps)
      return null;
    return this.steps[index];
  }
  getSlot(id) {
    if (typeof id === "string") {
      return this.slots[id] || null;
    }
    if (typeof id === "number") {
      return id >= 0 && id < this.conductor.totalSteps ? this.steps[id] : null;
    }
  }
  getNote(index, noteName) {
    let coll = this.getNotes(index);
    if (coll && coll instanceof MusicNoteCollection) {
      return coll.getNote(noteName);
    }
    return null;
  }
  updateSlots() {
    for (let slotID of Object.keys(this.slots)) {
      let coll = this.slots[slotID];
      if (!coll || !(coll instanceof MusicNoteCollection)) {
        this.steps[coll.step] = null;
        delete this.slots[slotID];
        continue;
      } else {
        this.setNext(coll);
      }
    }
  }
  setNext(coll) {
    if (!(coll instanceof MusicNoteCollection)) {
      return;
    }
    if (!this.slots[coll.id]) {
      return;
    }
    let _next = null;
    for (let slotID of Object.keys(this.slots)) {
      let initColl = this.slots[slotID];
      if (initColl && initColl.step > coll.step) {
        if (!_next || _next.step > initColl.step) {
          _next = initColl;
        }
      }
    }
    if (!_next) {
    } else {
    }
    coll.next = _next;
  }
  addSlot(coll) {
    let newColl = null;
    if (coll instanceof MusicNoteCollection) {
      newColl = coll;
    } else if (coll instanceof Object) {
      newColl = new MusicNoteCollection(coll);
    } else if (typeof coll === "number") {
      if (coll < 0 || coll >= this.conductor.totalSteps)
        return false;
      newColl = new MusicNoteCollection({
        step: coll,
        delay: 0,
        notes: null,
        targets: []
      });
    } else {
      return false;
    }
    this.steps[newColl.step] = newColl;
    this.slots[newColl.id] = newColl;
    this.updateSlots();
    return true;
  }
  removeSlot(coll) {
    let initColl = null;
    if (coll instanceof MusicNoteCollection) {
      initColl = coll;
    } else if (coll instanceof Object) {
      initColl = this.slots[coll.id];
    } else if (typeof coll === "number") {
      if (coll < 0 || coll >= this.conductor.totalSteps)
        return false;
      initColl = this.steps[coll];
    }
    if (initColl) {
      this.steps[initColl.step] = null;
      delete this.slots[initColl.id];
      this.updateSlots();
      return true;
    }
    return false;
  }
  addNote(index, note) {
    if (index < 0 || index >= this.conductor.totalSteps)
      return false;
    let coll = this.steps[index];
    if (!coll || !(coll instanceof MusicNoteCollection)) {
      if (this.addSlot(index)) {
        coll = this.steps[index];
      }
    }
    let _note = null;
    if (typeof note === "string") {
      _note = new MusicNote({
        note,
        step: coll.step,
        targets: coll.targets,
        next: null,
        intensity: 1
      });
    } else if (note instanceof MusicNote) {
      _note = note;
    } else if (note instanceof Object) {
      _note = new MusicNote(note);
    }
    if (_note && coll) {
      if (coll.addNote(_note)) {
        this.updateSlots();
        return true;
      }
      return false;
    }
    return false;
  }
  removeNote(index, note) {
    if (index < 0 || index >= this.conductor.totalSteps)
      return false;
    let _note;
    if (!this.steps[index])
      return false;
    let coll = this.steps[index];
    if (!coll)
      return false;
    if (typeof note === "string") {
      _note = coll.notes[note];
    } else if (note instanceof MusicNote) {
      _note = coll.notes[note.note];
    }
    if (_note && coll) {
      if (coll.removeNote(_note)) {
        if (!coll.notes || !Object.keys(coll.notes).length) {
          this.removeSlot(coll);
        }
        this.updateSlots();
        return true;
      }
    }
    return false;
  }
  syncConductor = () => {
    if (this.conductor) {
      this.bpm = this.conductor.bpm;
      this.measure = this.conductor.measure;
    }
  };
  // EVENT FUNCTIONS
  onStepHit(event) {
    let currStep = event.detail?.step || null;
    if (currStep === null)
      return;
    let coll = this.getSlot(currStep);
    if (!coll)
      return;
    coll.delay = event.detail.delay;
    coll.step = currStep;
    this.emitSignal(`noteHit`, {
      // notes: coll.asJSON(),
      notes: coll,
      step: currStep,
      crotchet: event.detail.crotchet,
      stepCrotchet: event.detail.stepCrotchet,
      semibreve: event.detail.semibreve,
      frequencyData: event.detail.data,
      bpm: event.detail.bpm,
      measure: event.detail.measure,
      delay: event.detail.delay
    });
  }
  onBeatHit(event) {
    let currBeat = event.detail?.beat || null;
    if (currBeat === null)
      return;
    let currStep = currBeat * this.conductor.measure;
    let coll = this.getSlot(currStep);
    if (!coll)
      return;
    coll.delay = event.detail.delay;
    coll.step = currStep;
    this.emitSignal(`noteBeatHit`, {
      // notes: coll.asJSON(),
      notes: coll,
      step: currStep,
      beat: currBeat,
      crotchet: event.detail.crotchet,
      stepCrotchet: event.detail.stepCrotchet,
      semibreve: event.detail.semibreve,
      frequencyData: event.detail.data,
      bpm: event.detail.bpm,
      measure: event.detail.measure,
      delay: event.detail.delay
    });
  }
  onBarHit(event) {
    let currBar = event.detail?.bar || null;
    if (currBar === null)
      return;
    let currStep = currBar * this.conductor.measure * 4;
    let coll = this.getSlot(currStep);
    if (!coll)
      return;
    coll.delay = event.detail.delay;
    coll.step = currStep;
    this.emitSignal(`noteBarHit`, {
      // notes: coll.asJSON(),
      notes: coll,
      bar: currBar,
      step: currStep,
      crotchet: event.detail.crotchet,
      stepCrotchet: event.detail.stepCrotchet,
      semibreve: event.detail.semibreve,
      frequencyData: event.detail.data,
      bpm: event.detail.bpm,
      measure: event.detail.measure,
      delay: event.detail.delay
    });
  }
  onBpmChange(event) {
    let totalSteps = Math.ceil(this.conductor.songLength * this.conductor.bps * this.conductor.measure);
    let newSteps = [];
    let bpmRatio = this.conductor.bpm / this.bpm;
    let measureRatio = this.conductor.measure / this.measure;
    this.steps.forEach((item, index) => {
      let newStep = Math.trunc(bpmRatio * measureRatio * index);
      newSteps[newStep] = item;
    });
    this.steps = newSteps;
    this.syncConductor();
  }
  //other
  asJSON() {
    let obj = {
      name: this.targetName,
      slots: {}
    };
    for (let slotID of Object.keys(this.slots)) {
      let coll = this.slots[slotID];
      obj.slots[slotID] = coll.asJSON();
    }
    return obj;
  }
};
var MusicNoteCollection = class _MusicNoteCollection {
  static {
    __name(this, "MusicNoteCollection");
  }
  static {
    __name13(this, "MusicNoteCollection");
  }
  id = "";
  step = 0;
  delay = 0;
  targets = [];
  notes = {};
  next = null;
  constructor({
    id = randomID("MNoteCollection-", "", 9),
    step = 0,
    delay = 0,
    notes = {},
    targets = [],
    next = null
  }) {
    this.id = id;
    this.step = step;
    this.delay = delay;
    this.notes = notes;
    this.targets = targets;
    if (next instanceof _MusicNoteCollection) {
      this.next = next;
    } else if (typeof next === "string") {
      this.next = next;
    }
    if (notes instanceof Object) {
      for (let noteName of Object.keys(notes)) {
        if (notes[noteName] instanceof MusicNote) {
          this.addNote(notes[noteName]);
        }
        if (notes[noteName] instanceof Object) {
          this.addNote(new MusicNote(notes[noteName]));
        }
      }
    }
  }
  addNote(note) {
    if (typeof note === "string") {
      let _note = new MusicNote({
        note,
        step: this.step,
        targets: this.targets,
        next: null,
        intensity: 1
      });
      this.notes[note] = _note;
      _note.step = this.step;
      return true;
    } else if (note instanceof MusicNote) {
      this.notes[note.note] = note;
      note.step = this.step;
      return true;
    }
    return false;
  }
  removeNote(note) {
    if (typeof note === "string") {
      if (this.notes[note]) {
        delete this.notes[note];
        return true;
      }
    } else if (note instanceof MusicNote) {
      if (this.notes[note.note]) {
        delete this.notes[note.note];
        return true;
      }
    }
    return false;
  }
  getNote(noteName) {
    if (this.notes[noteName]) {
      return this.notes[noteName];
    }
    return null;
  }
  toString() {
    return JSON.stringify(this.asJSON());
  }
  asJSON() {
    let obj = {
      id: this.id,
      step: this.step,
      delay: this.delay,
      targets: this.targets,
      next: null,
      notes: {}
    };
    if (this.next instanceof _MusicNoteCollection)
      obj.next = this.next.id;
    else if (typeof this.next === "string")
      obj.next = this.next;
    for (let noteName of Object.keys(this.notes)) {
      if (this.notes[noteName] instanceof MusicNote) {
        obj.notes[noteName] = this.notes[noteName].asJSON();
      }
    }
    return obj;
  }
};
var MusicNote = class _MusicNote {
  static {
    __name(this, "MusicNote");
  }
  static {
    __name13(this, "MusicNote");
  }
  id = "";
  step = 0;
  next = null;
  note = "beat";
  targets = [];
  intensity = 0;
  detail = {};
  constructor({
    id = randomID("MNote-", "", 9),
    step = 0,
    note = "beat",
    targets = [],
    detail = {},
    intensity = 0,
    next = null
  }) {
    this.id = id;
    this.step = step;
    this.note = note;
    this.targets = targets;
    this.detail = detail;
    this.intensity = intensity;
    if (next instanceof _MusicNote) {
      this.next = next;
    } else if (typeof next === "string") {
      this.next = next;
    }
  }
  toString() {
    return JSON.stringify(this.asJSON());
  }
  asJSON() {
    let obj = {
      id: this.id,
      step: this.step,
      note: this.note,
      targets: this.targets,
      next: null,
      intensity: this.intensity,
      detail: JSON.parse(JSON.stringify(this.detail))
    };
    if (this.next instanceof _MusicNote) {
      obj.next = this.next.id;
    } else if (typeof this.next === "string") {
      obj.next = this.next;
    }
    return obj;
  }
};

// src/js/mainscript.ts
var import_jquery = __toESM(require_jquery());
var import_animejs = __toESM(require_anime());
function loadUserPreferences() {
  if (!localStorage.getItem("JBQ_color") && !localStorage.getItem("JBQ_shape")) {
    console.log("DEFAULTING");
    localStorage.setItem("JBQ_color", "A");
    localStorage.setItem("JBQ_shape", "A");
  }
  var cI = `var(--c${localStorage.getItem("JBQ_color")})`;
  var pI = `var(--p${localStorage.getItem("JBQ_color")})`;
  var sI = `var(--s${localStorage.getItem("JBQ_shape")})`;
  var ssI = `var(--ss${localStorage.getItem("JBQ_shape")})`;
  (0, import_jquery.default)("body").get(0).style.setProperty("--cI", cI);
  (0, import_jquery.default)("body").get(0).style.setProperty("--pI", pI);
  (0, import_jquery.default)("body").get(0).style.setProperty("--sI", sI);
  (0, import_jquery.default)("body").get(0).style.setProperty("--ssI", ssI);
  return;
}
__name(loadUserPreferences, "loadUserPreferences");
function setSlidableContent({
  group = [],
  container = null,
  leftButton = ".moveBtnLeft",
  rightButton = ".moveBtnRight",
  indexButtons = [],
  displayOther = false,
  forceCenter = false,
  positioning = "absolute"
}, _cont = null) {
  if (!container) {
    container = _cont;
  }
  var _groupElems = [];
  var _container;
  var mainContentAmt = 0;
  var currentContentIndex = 0;
  if (group instanceof import_jquery.default || group instanceof Element) {
    _groupElems = (0, import_jquery.default)(group).toArray();
  } else if (typeof group === "string") {
    _groupElems = (0, import_jquery.default)(group).toArray();
  } else if (group instanceof HTMLCollection || group instanceof Array) {
    _groupElems = Array.from(group);
  } else {
    console.log("Group Elements were not valid");
    console.log(group);
    return null;
  }
  if (!container || container === "") {
    _container = (0, import_jquery.default)(_groupElems[0]).parent();
  } else if (typeof container === "string" || container instanceof import_jquery.default || container instanceof Element) {
    if (typeof container === "string") {
      _container = (0, import_jquery.default)(container);
    } else {
      _container = (0, import_jquery.default)(container);
    }
    if (_container.length < 1) {
      let initCont = (0, import_jquery.default)("<div>", { class: `slider${randomString(3)}` }).appendTo(
        (0, import_jquery.default)(_groupElems[0]).parent()
      );
      _container = (0, import_jquery.default)(initCont);
    }
  } else {
    console.log("Container Element was not valid");
    return null;
  }
  if (!leftButton || leftButton === "") {
    return null;
  } else if (isString(leftButton) || leftButton instanceof import_jquery.default) {
    leftButton = (0, import_jquery.default)(leftButton);
  } else if (leftButton instanceof HTMLElement) {
    leftButton = leftButton;
  } else {
    console.log("L Button was not valid");
    return null;
  }
  if (!rightButton || rightButton === "") {
    return null;
  } else if (typeof rightButton === "string" || rightButton instanceof import_jquery.default) {
    rightButton = (0, import_jquery.default)(rightButton);
  } else if (rightButton instanceof HTMLElement) {
    rightButton = rightButton;
  } else {
    console.log("R Button was not valid");
    return null;
  }
  for (let indButton of indexButtons) {
    if (!indButton || !indButton.button || !indButton.index || isNaN(indButton.index)) {
      continue;
    } else if (typeof indButton.button === "string" || indButton.button instanceof import_jquery.default || indButton.button instanceof Element) {
      indexButtons.push({
        button: (0, import_jquery.default)(indButton.button),
        index: Number(indButton.index)
      });
    } else {
      continue;
    }
  }
  for (let _groupElem of _groupElems) {
    (0, import_jquery.default)(_groupElem).css({
      "position": `${positioning}`,
      "transition-timing-function": "ease-out-in",
      "transition": "all 0.5s",
      "transform-origin": "center",
      "z-index": "1500"
    }).appendTo((0, import_jquery.default)(_container));
  }
  setContentPositions();
  (0, import_jquery.default)(leftButton).on("click", (event) => {
    moveContentBy(-1);
  });
  (0, import_jquery.default)(rightButton).on("click", (event) => {
    moveContentBy(1);
  });
  for (let i = 0; i < indexButtons.length; i++) {
    let indBtn = indexButtons[i];
    (0, import_jquery.default)(indBtn.button).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setContentIndex(indBtn.index);
    }).css("display", "flex");
  }
  function moveContentBy(count) {
    setContentIndex(currentContentIndex + count);
  }
  __name(moveContentBy, "moveContentBy");
  function setContentIndex(index) {
    currentContentIndex = index;
    if (currentContentIndex >= mainContentAmt - 1)
      currentContentIndex = mainContentAmt - 1;
    if (currentContentIndex <= 0)
      currentContentIndex = 0;
    setContentPositions();
  }
  __name(setContentIndex, "setContentIndex");
  function currentContent() {
    return _groupElems[currentContentIndex];
  }
  __name(currentContent, "currentContent");
  function getContentAtIndex(index) {
    return _groupElems[index];
  }
  __name(getContentAtIndex, "getContentAtIndex");
  function getCurrentContentIndex() {
    return currentContentIndex;
  }
  __name(getCurrentContentIndex, "getCurrentContentIndex");
  function setContentPositions() {
    let properIndex = 0;
    for (let index = 0; index < _groupElems.length; index++) {
      var _groupElem = _groupElems[index];
      if (!_groupElem) {
        _groupElems.splice(index, 1);
        console.log(`removed ${index}`);
        continue;
      }
      var _diff = properIndex - currentContentIndex;
      if (!(0, import_jquery.default)(_groupElem).attr("data-sliderID")) {
        (0, import_jquery.default)(_groupElem).attr("data-sliderID", randomID("SliderContent", "", 4));
      }
      (0, import_jquery.default)(_groupElem).css({
        "left": `${_diff * 100}%`,
        "transform": `scale(${1 / (Math.abs(_diff) + 1)}) ${forceCenter ? `translateX(50%)` : ``}`,
        "z-index": `${1500 + _diff}`,
        "opacity": `${1 / (Math.abs(_diff) + 1)}`
      });
      if (!displayOther) {
        (0, import_jquery.default)(_groupElem).css("visibility", "hidden");
      }
      properIndex++;
    }
    (0, import_jquery.default)(currentContent()).css("visibility", "visible");
    mainContentAmt = _groupElems.length;
  }
  __name(setContentPositions, "setContentPositions");
  function addContent(obj, position = _groupElems.length - 1) {
    (0, import_jquery.default)(obj).css({
      "position": `${positioning}`,
      "transition-timing-function": "ease-out-in",
      "transition": "all 0.5s",
      "transform-origin": "center",
      "z-index": "1500"
    }).appendTo((0, import_jquery.default)(_container));
    _groupElems.splice(position, 0, (0, import_jquery.default)(obj)[0]);
    setContentPositions();
  }
  __name(addContent, "addContent");
  function removeContent(obj) {
    if (typeof obj === "number") {
      let _obj = _groupElems[obj];
      _groupElems[obj] = null;
      (0, import_jquery.default)(_obj).remove();
    } else {
      (0, import_jquery.default)(obj).remove();
    }
    setContentPositions();
  }
  __name(removeContent, "removeContent");
  function addIndexButton(index, button) {
    var indBtn = {
      index,
      button: (0, import_jquery.default)(button)
    };
    (0, import_jquery.default)(indBtn.button).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      setContentIndex(indBtn.index);
    }).css("display", "flex");
  }
  __name(addIndexButton, "addIndexButton");
  var returnObject = {
    group: _groupElems,
    container: (0, import_jquery.default)(_container)[0],
    leftButton: (0, import_jquery.default)(leftButton)[0],
    rightButton: (0, import_jquery.default)(rightButton)[0],
    indexButtons,
    setContentPositions,
    setContentIndex,
    moveContentBy,
    currentContent,
    getContentAtIndex,
    content: getContentAtIndex,
    getCurrentContentIndex,
    currentContentIndex: getCurrentContentIndex,
    addContent,
    removeContent,
    addIndexButton
  };
  return returnObject;
}
__name(setSlidableContent, "setSlidableContent");
function displayPopUpBox({
  messageText = "",
  acceptText = null,
  cancelText = "Close",
  onAccept = null,
  onCancel = /* @__PURE__ */ __name(() => {
    console.log("Canceled");
  }, "onCancel")
}) {
  var popUpBox = (0, import_jquery.default)("<div>", { class: "popUpBox card cI-bg pt-5 px-5 pb-3 font-120" }).append([
    (0, import_jquery.default)("<div>", { class: "btn formBtn popUpBtnClose p-2 m-0 text-right cI-txt" }).html(`<i class="fas fa-window-close"></i>`),
    (0, import_jquery.default)("<div>", { class: "card-title" }),
    (0, import_jquery.default)("<div>", { class: "row card-body text-right" })
  ]);
  var popUpElem = (0, import_jquery.default)("<div>", { class: "popUpArea container-fluid", id: randomID("popUp", "", 4) }).append([
    (0, import_jquery.default)("<div>", { class: "popUpOverlay opacity-60 h-100 w-100 c0-bg" }),
    popUpBox
  ]);
  (0, import_jquery.default)(popUpBox).find(".card-title").text(messageText);
  (0, import_jquery.default)(popUpBox).find(".popUpBtnClose").on("click", function(event) {
    console.log("Closed");
    closePopUpBox(popUpElem);
  });
  var popUpBoxBody = (0, import_jquery.default)(popUpBox).find(".card-body");
  if (acceptText && onAccept) {
    (0, import_jquery.default)("<button>", { class: "col btn formBtn font-100 mx-3 popUpBtnYes cI-txt" }).on("click", function(event) {
      onAccept();
      closePopUpBox(popUpElem);
    }).text(acceptText).appendTo(popUpBoxBody);
  }
  (0, import_jquery.default)("<button>", { class: "col btn formBtn font-100 mx-3 popUpBtnNo cI-txt" }).on("click", function(event) {
    onCancel();
    closePopUpBox(popUpElem);
  }).text(cancelText).appendTo(popUpBoxBody);
  (0, import_jquery.default)(popUpElem).css("display", "flex").appendTo("body");
  (0, import_animejs.default)({
    targets: (0, import_jquery.default)(popUpBox)[0],
    opacity: ["0", "1"],
    top: ["-100px", "0px"],
    duration: 400,
    easing: "easeOutQuad",
    direction: "normal"
  });
}
__name(displayPopUpBox, "displayPopUpBox");
function closePopUpBox(popUpElem) {
  (0, import_animejs.default)({
    targets: (0, import_jquery.default)(popUpElem).find(".popUpBox")[0],
    opacity: ["0", "1"],
    top: ["-100px", "0px"],
    duration: 200,
    easing: "easeOutQuad",
    direction: "reverse",
    complete: () => {
      (0, import_jquery.default)(popUpElem).css("display", "none");
      (0, import_jquery.default)(popUpElem).remove();
    }
  });
}
__name(closePopUpBox, "closePopUpBox");
function easyPopUpBox(_text) {
  displayPopUpBox({
    messageText: String(_text),
    cancelText: "Okay"
  });
}
__name(easyPopUpBox, "easyPopUpBox");
async function myAPI(_type, _subtype = "", _data = {}, _url = "/api") {
  var username = localStorage.getItem("JBQ_username");
  var userID = localStorage.getItem("JBQ_userId");
  var apikey = localStorage.getItem("JBQ_apikey");
  if (!username || !apikey || !userID) {
    window.location.href = "/";
    console.log("No API/Userdata in system");
    return;
  }
  switch (_type) {
    case "signup":
      break;
    case "login":
    case "logout":
      break;
    case "playlist":
      break;
    case "user":
    case "quiz":
    case "song":
    case "list":
      if (!_subtype) {
        return Promise.reject(_response(false, "Subtype is missing from request"));
      }
    case "verify":
    case "search":
    case "connect":
    case "activity":
      if (!username || !apikey || !userID) {
        console.log("No API/Userdata in system");
        return Promise.reject(_response(false, "Login is not verified"));
      }
      break;
    default:
      return Promise.reject(_response(false, "Invalid API request"));
      break;
  }
  var formDat = {
    key: apikey,
    type: _type,
    subType: _subtype,
    id: userID,
    data: _data
  };
  let ajaxCall = fetch(_url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDat)
  }).then(async (res) => {
    let resData = await res.text();
    if (isJSON(resData)) {
      return JSON.parse(resData);
    }
    return resData;
  }).then(async (res) => {
    console.log("success");
    return Promise.resolve(res);
  }, (res) => {
    console.log("unsuccess");
    return Promise.resolve(res);
  }).catch((err) => {
    console.log("error");
    return Promise.reject(_response(false, "An error occured in the request"));
  });
  return await ajaxCall;
}
__name(myAPI, "myAPI");
async function myHandler({
  type = "",
  subType = "",
  data = {},
  url = "/api"
}, onSuccess = (m, d) => {
}, onFail = (m, d) => {
}, onErr = (err, d) => {
}) {
  return myAPI(type, subType, data, url).then((data2) => {
    if (!isObject(data2)) {
      onErr("Data is not a response object");
      return Promise.resolve(_response(false, "Data is not a response object"));
    } else {
      if (data2 && "success" in data2) {
        if (data2.success) {
          onSuccess(data2.message, data2.data);
          return Promise.resolve(_response(true, data2.message, data2.data));
        } else {
          onFail(data2.message, data2.data);
          return Promise.resolve(_response(false, data2.message, data2.data));
        }
      } else {
        onErr("Invalid Data from server", data2);
        return Promise.resolve(_response(false, "Invalid Data from server", data2));
      }
    }
  }, (res) => {
    onErr("Error in server request", res);
    return Promise.resolve(_response(false, "Error in server request", res));
  }).catch((err) => {
    onErr("Error in request handler", err);
    return Promise.resolve(_response(false, "Error in request handler", err));
  });
}
__name(myHandler, "myHandler");
async function saveActivity({
  userID,
  type,
  info,
  details
}, onSuccess = (m, d) => {
}, onFail = (m, d) => {
}, onErr = (err, d) => {
}) {
  let opts = {
    id: randomString(8),
    userID,
    type,
    info,
    details: {
      quizID: details.quizID || null,
      friendID: details.friendID || null,
      listID: details.listID || null,
      songID: details.songID || null,
      score: details.score || null
    }
  };
  switch (type) {
    case "Created Quiz":
    case "Played Quiz":
    case "Completed Quiz":
    case "Edited Quiz":
    case "Deleted Quiz":
      if (!details.quizID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    case "Created Playlist":
    case "Edited Playlist":
    case "Deleted Playlist":
    case "Played Playlist":
      if (!details.listID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    case "Added Song":
    case "Edited Song":
    case "Deleted Song":
      if (!details.songID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    case "Added Friend":
    case "Friend Request":
      if (!details.friendID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    case "Created User":
      if (!details.friendID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    case "Followed":
      if (!details.friendID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    case "Maxed Score":
      if (!details.score || !details.quizID) {
        onFail("Invalid API Request");
        return Promise.resolve(_response(false, "Invalid API Request"));
      }
      break;
    default:
      onFail("Invalid API Request");
      return Promise.resolve(_response(false, "Invalid API Request"));
      break;
  }
  return myHandler({
    type: "activity",
    subType: "set",
    data: opts
  }, onSuccess, onFail, onErr).then((res) => {
    return Promise.resolve(res);
  });
}
__name(saveActivity, "saveActivity");
function _response(success = false, message = "", data = null) {
  return {
    success: success ? true : false,
    message: String(message),
    data
  };
}
__name(_response, "_response");

// src/js/playscript.ts
var conductor;
var thisQuiz;
var thisList;
var thisSong;
var answeredFlags = [];
var listIndex = 0;
var listQuizzes = [];
var thisUser;
var quizCtrl = {
  isEnded: false,
  isPaused: false,
  isStarted: false,
  multiplier: 10
};
var questionSlider;
var sectionSlider;
var thisScore = 0;
var maxScore = 0;
var passingScore = 0;
var DebugMode = false;
var playlistMode = false;
var holdDown = {
  timer: null,
  startTimer: null,
  startTime: 400,
  time: 100,
  down: false
};
var frequency = {
  max: 255,
  min: 50
};
var urlParams = parseURLParams(window.location.href);
console.log(urlParams);
verifyLogin((data) => {
  loadUserPreferences();
  myHandler({
    type: "user",
    subType: "get",
    data: {
      id: data.userID
    }
  }, (msg, data2) => {
    console.log("User is Authenticated");
    thisUser = data2[0];
    console.log(thisUser);
    docReady(main);
  }, (msg, data2) => {
    displayPopUpBox({
      messageText: `User login failed. Returning to splash screen so you can log in.`,
      cancelText: `Return to Splash Screen`,
      onCancel: () => {
        window.location.href = "./index.php";
      }
    });
  }, (err, data2) => {
    displayPopUpBox({
      messageText: `Error in user login. Returning to splash screen so you can log in.`,
      cancelText: `Return to Splash Screen`,
      onCancel: () => {
        window.location.href = "./index.php";
      }
    });
  });
});
function main() {
  console.log("Main");
  if (urlParams.playlist) {
    playlistMode = true;
  }
  if (urlParams.debug && urlParams.debug == "DEBUG") {
    DebugMode = true;
  }
  (0, import_jquery2.default)("#myMouse").on("beatHit", (event) => {
    let e = event;
    var myMouse = e.currentTarget;
    var animBox = (0, import_animejs2.default)({
      targets: myMouse,
      translateY: ["1", "7"],
      duration: e.detail.stepCrotchet * 1e3,
      easing: "easeInOutQuad",
      direction: "alternate"
    });
  });
  myHandler({
    type: "quiz",
    subType: "get",
    data: {
      id: urlParams.quiz ? urlParams.quiz : ""
    }
  }).then((res) => {
    if (!res?.success || !res?.data || !res?.data[0]) {
      displayPopUpBox({
        messageText: `Error loading quiz. Quiz might be broken or none existent.`,
        cancelText: `Return to Home Screen`,
        onCancel: () => {
          window.location.href = "./home.php";
        }
      });
    }
    console.log(`SUCCESS`);
    thisQuiz = res.data[0];
    (0, import_jquery2.default)(".play-quizName").text(`${thisQuiz?.name}`);
    let cont = (0, import_jquery2.default)("<div>", { class: "sliderContainer mx-3 w-100 h-80 centerFlexCont" });
    let questionData;
    if (!thisQuiz?.questions) {
      displayPopUpBox({
        messageText: `This quiz seems to be missing its questions so it's unplayable.`,
        cancelText: `Return to Home Screen`,
        onCancel: () => {
          window.location.href = "./home.php";
        }
      });
      return;
    }
    questionData = thisQuiz?.questions;
    console.log(questionData);
    if (!questionData || !questionData.length) {
      displayPopUpBox({
        messageText: `This quiz seems to be missing its questions so it's unplayable.`,
        cancelText: `Return to Home Screen`,
        onCancel: () => {
          window.location.href = "./home.php";
        }
      });
      return;
    }
    let questionDivs = [];
    for (let q = 0; q < questionData.length; q++) {
      let _question = questionData[q];
      let answerDivCont = (0, import_jquery2.default)("<div>", {
        class: "answerDivContainer formRadioContainer w-100 h-80 p-3"
      });
      for (let a = 0; a < _question.answers.length; a++) {
        let _answer = _question.answers[a];
        let answerDiv = (0, import_jquery2.default)("<div>", {
          class: "row answerDiv w-100 mx-2"
        }).append([
          (0, import_jquery2.default)("<input>").attr({
            "class": `formRadioBtn dontShow`,
            "id": `q${q}a${a}`,
            "name": `q${q}Answer`,
            "type": `${_question.type == "multiple" ? `checkbox` : `radio`}`
          }),
          (0, import_jquery2.default)("<label>").attr({
            "class": `col-10 answerName inputBox px-4 fixWrap formRadioLabel`,
            "for": `q${q}a${a}`
          }).text(`${_answer.answer}`)
        ]).attr("data-correct", `${_answer.correct ? true : false}`);
        answerDivCont.append(answerDiv);
      }
      let questionDiv = (0, import_jquery2.default)("<form>", {
        class: "questionCard h-80 h-md-90 w-90 w-sm-80 w-md-70 w-lg-50"
      }).append([
        (0, import_jquery2.default)("<div>", { class: "card my-1 mx-5 quizCard h-100" }).append([
          (0, import_jquery2.default)("<div>", {
            class: "card-header"
          }).append([
            (0, import_jquery2.default)("<div>", {
              class: "card-img-top centerFlexCont"
            }).css({ "background": `url('./data/image/${_question.imageURL}')` })
          ]),
          (0, import_jquery2.default)("<h5>", {
            class: "card-title questionName"
          }).css({ "background-color": `var(--cI)` }).text(`${_question.question}`),
          (0, import_jquery2.default)("<div>", { class: "card-body my-1 mx-3 w-100" }).append(answerDivCont)
        ])
        //.css('background-color','transparent')
      ]);
      questionDivs.push(questionDiv);
    }
    maxScore = quizCtrl.multiplier * questionDivs.length;
    passingScore = thisQuiz?.passingGrade;
    questionSlider = setSlidableContent({
      group: questionDivs,
      container: cont,
      leftButton: (0, import_jquery2.default)("<div>"),
      rightButton: (0, import_jquery2.default)("<div>"),
      forceCenter: true
      // positioning:'relative',
    });
    (0, import_jquery2.default)(".quizContCard").append(cont);
    setScore(0);
    console.log(thisQuiz?.songID);
    answeredFlags = new Array(questionDivs.length);
    for (let i = 0; i < questionDivs.length; i++) {
      answeredFlags[i] = false;
    }
    return myHandler({
      type: "song",
      subType: "get",
      data: {
        id: thisQuiz?.songID
      }
    }).then((sres) => {
      if (!sres || !sres?.success || !sres?.data) {
        playDefaultSong();
      } else {
        console.log("FOUND");
        let song = sres.data[0];
        thisSong = song;
        console.log(song);
        playSong(song);
      }
    });
  }).then(async () => {
    loadEvents();
    if (playlistMode) {
      return myHandler({
        type: "list",
        subType: "get",
        data: { id: urlParams.playlist ? urlParams.playlist : "" }
      }).then((pres) => {
        console.log(pres);
        if (!pres || !pres?.success || !pres?.data) {
          displayPopUpBox({
            messageText: `Error loading playlist. Playlist might be broken or none existent.`,
            cancelText: `Return to Home Screen`,
            onCancel: () => {
              window.location.href = "./home.php";
            }
          });
        }
        thisList = pres.data[0];
        if (!thisList?.quizzes) {
          displayPopUpBox({
            messageText: `Error loading playlist. Playlist might be broken or none existent.`,
            cancelText: `Return to Home Screen`,
            onCancel: () => {
              window.location.href = "./home.php";
            }
          });
          return;
        }
        let _quizzes = thisList?.quizzes;
        let isValid = false;
        for (let q = 0; q < _quizzes.length; q++) {
          let _q = _quizzes[q];
          if (_q == thisQuiz?.id) {
            isValid = true;
            listIndex = q;
            break;
          }
        }
        listQuizzes = _quizzes;
        if (!isValid) {
          displayPopUpBox({
            messageText: `Page link might be invalid for playlist. Please check if you have played the playlist correctly.`,
            cancelText: `Return to Home Screen`,
            onCancel: () => {
              window.location.href = "./home.php";
            }
          });
          return;
        }
      });
    } else {
      return Promise.resolve(true);
    }
  }).then(() => {
    onMusicLoad();
    if (conductor && !conductor.isPlaying()) {
      conductor.setStep(0);
    }
    loadEvents();
  });
  function onMusicLoad() {
    let playBtn = {
      startIntro: (0, import_jquery2.default)("<button>", { class: "btn formBtn p-3 startIntroPlayBtn thiccBtn font-150" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-play mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-300 font-md-0" }).text(`Play`)
      ]),
      quitIntro: (0, import_jquery2.default)("<button>", { class: "btn formBtn p-2 px-3 quitIntroPlayBtn thiccBtn" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-times mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-100 font-md-0" }).text(`Quit`)
      ]),
      continuePause: (0, import_jquery2.default)("<button>", { class: "btn formBtn p-3 continuePausePlayBtn thiccBtn" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-play mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-100 font-md-0" }).text(`Continue`)
      ]),
      quitPause: (0, import_jquery2.default)("<button>", { class: "btn formBtn p-3 quitPausePlayBtn thiccBtn" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-stop mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-100 font-md-0" }).text(`Quit`)
      ]),
      retryComplete: (0, import_jquery2.default)("<button>", { class: "btn formBtn p-3 retryCompletePlayBtn thiccBtn" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-redo-alt mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-100 font-md-0" }).text(`Retry`)
      ]),
      quitComplete: (0, import_jquery2.default)("<button>", { class: "btn formBtn p-3 quitCompletePlayBtn thiccBtn" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-stop mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-100 font-md-0" }).text(`Quit`)
      ]),
      nextComplete: (0, import_jquery2.default)("<button>", { class: "dontShow" }),
      mutePlay: (0, import_jquery2.default)("#mutePlayBtn"),
      prevPlay: (0, import_jquery2.default)("#prevPlayBtn"),
      pausePlay: (0, import_jquery2.default)("#pausePlayBtn"),
      nextPlay: (0, import_jquery2.default)("#nextPlayBtn"),
      quitPlay: (0, import_jquery2.default)("#quitPlayBtn"),
      confirmPlay: (0, import_jquery2.default)("#confirmPlayBtn")
    };
    if (playlistMode && listQuizzes.length - 1 > listIndex) {
      playBtn.nextComplete = (0, import_jquery2.default)("<button>", { class: "btn formBtn p-3 nextCompletePlayBtn thiccBtn" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas fa-forward mx-2" }),
        (0, import_jquery2.default)("<span>", { class: "thiccBtnText font-xs-100 font-md-0" }).text(`Next Quiz`)
      ]);
      (0, import_jquery2.default)(playBtn.nextComplete).on("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        displayPopUpBox({
          messageText: "Go to the next quiz?",
          acceptText: "Go to Next Quiz",
          cancelText: "Return to End Screen",
          onAccept: () => {
            window.location.href = `./play.php?playlist=${thisList?.id}&quiz=${listQuizzes[listIndex + 1]}`;
          },
          onCancel: () => {
          }
        });
        loadEvents();
      });
    }
    let introCard = (0, import_jquery2.default)("<div>", { class: "introCard sectionCard h-80 h-md-90 w-90 rounded" }).append([
      (0, import_jquery2.default)("<div>", { class: "card my-1 mx-5 quizCard h-100 w-100" }).append([
        (0, import_jquery2.default)("<div>", { class: "card-header p-2" }).append([
          (0, import_jquery2.default)("<div>", { class: "play-quizName c3-bg p-1 c0-txt rounded font-125" }).text(`${thisQuiz?.name}`),
          (0, import_jquery2.default)("<div>", { class: "play-quizAuthor c2-bg p-1 m-1 c0-txt rounded text-right" }).append([
            "by ",
            (0, import_jquery2.default)("<span>", { class: '"play-quizAuthor' }).text(`${thisQuiz?.username}`)
          ])
        ]),
        (0, import_jquery2.default)("<div>", { class: "card-body w-100 h-100 centerFlexCont" }).append([
          (0, import_jquery2.default)("<div>", { class: "m-1 p-1 w-70 h-95" }).append([
            (0, import_jquery2.default)("<div>", { class: "play-disclaimer p-2 c3-bg c0-txt rounded" }).text(`The quiz needs you to complete all the questions before the song ends. While you could try to play without music, it's recommended have it unmuted so you can keep track of the time and get the full experience. This quiz is best experienced with headphones.`),
            (0, import_jquery2.default)("<div>", { class: "play-instruction p-2 c2-bg c0-txt rounded" }).text(`To select an answer, click on it and hit the Confirm button below to know if its correct or wrong. This quiz needs ${passingScore} points to pass as completed successfully.`),
            (0, import_jquery2.default)("<div>", { class: "h3 font-200 p-3 centerFlexCont" }).text("Ready?"),
            (0, import_jquery2.default)("<div>", { class: "play-intro p-2 centerFlexCont" }).append([
              playBtn.startIntro
            ]),
            (0, import_jquery2.default)("<div>", { class: "play-intro p-2 centerFlexCont" }).append([
              playBtn.quitIntro
            ])
          ])
        ])
      ])
    ]);
    let pauseCard = (0, import_jquery2.default)("<div>", { class: "pauseCard sectionCard h-80 h-md-90 w-90 rounded" }).append([
      (0, import_jquery2.default)("<div>", { class: "card my-1 mx-5 quizCard h-100 w-100" }).append([
        (0, import_jquery2.default)("<div>", { class: "card-body w-100 h-100 centerFlexCont" }).append([
          (0, import_jquery2.default)("<div>", { class: "centerFlexCont w-100" }).append([
            (0, import_jquery2.default)("<div>", { class: "m-1 p-2 w-95 h-9" }).append([
              (0, import_jquery2.default)("<div>", { class: "h4 p-3 centerFlexCont" }).text(`Quiz has been Paused`),
              (0, import_jquery2.default)("<div>", { class: "play-intro p-2 centerFlexCont" }).append([
                playBtn.continuePause,
                playBtn.quitPause
              ])
            ])
          ])
        ])
      ])
    ]);
    let completeCard = (0, import_jquery2.default)("<div>", { class: "completeCard sectionCard h-80 h-md-90 w-90 rounded" }).append([
      (0, import_jquery2.default)("<div>", { class: "card my-1 mx-5 quizCard h-100 w-100" }).append([
        (0, import_jquery2.default)("<div>", { class: "card-body w-100 h-100 centerFlexCont p-3" }).append([
          (0, import_jquery2.default)("<div>", { class: "centerFlexCont w-40" }).append([
            (0, import_jquery2.default)("<div>", { class: "m-1 p-2 w-95 h-95" }).append([
              (0, import_jquery2.default)("<div>", { class: "row w-80 rounded" }).append([
                (0, import_jquery2.default)("<div>", { class: "col h3 p-2" }).text(`${thisUser.username}`)
              ]),
              (0, import_jquery2.default)("<div>", { class: "row w-100 m-1" }).append([
                (0, import_jquery2.default)("<div>", { class: "col c2-bg c0-txt p-2 play-quizName rounded font-125" }).text(`${thisQuiz?.name}`)
              ]),
              (0, import_jquery2.default)("<div>", { class: "row w-100 m-1 text-right" }).append([
                (0, import_jquery2.default)("<div>", { class: "col c0-bg c3-txt p-1 rounded" }).append([
                  "by ",
                  (0, import_jquery2.default)("<span>", { class: "play-Username" }).text(`${thisQuiz?.username}`)
                ])
              ]),
              (0, import_jquery2.default)("<div>", { class: "row rowGap m-3" }),
              (0, import_jquery2.default)("<div>", { class: "row w-100 text-center" }).append([
                (0, import_jquery2.default)("<div>", { class: "col p-2" }).text(`Score`),
                (0, import_jquery2.default)("<div>", { class: "col c3-bg c0-txt p-2 rounded play-Score" }).text(`${thisScore}`)
              ]),
              (0, import_jquery2.default)("<div>", { class: "row rowGap m-3" }),
              (0, import_jquery2.default)("<div>", { class: "row m-0" }).text(`Song`),
              (0, import_jquery2.default)("<div>", { class: "row w-100 m-1 text-center" }).append([
                (0, import_jquery2.default)("<div>", { class: "col c2-bg c0-txt p-2 play-songAuthor" }).text(`${thisSong?.author}`),
                (0, import_jquery2.default)("<div>", { class: "col c3-bg c0-txt p-2 play-songTitle" }).text(`${thisSong?.title}`)
              ])
            ])
          ]),
          (0, import_jquery2.default)("<div>", { class: "centerFlexCont w-60" }).append([
            (0, import_jquery2.default)("<div>", { class: "m-1 p-2 w-95 h-95" }).append([
              (0, import_jquery2.default)("<div>", { class: "h4 p-3 centerFlexCont" }).text(`${playlistMode && listQuizzes.length - 1 <= listIndex ? `Playlist Completed` : `Quiz Completed`}`),
              (0, import_jquery2.default)("<div>", { class: "completeResults centerFlexCont" }).append([
                (0, import_jquery2.default)("<div>", { class: "completeResultsGrade cI-txt m-4 font-400 font-weight-bold" }).text("F"),
                (0, import_jquery2.default)("<div>", { class: "completeResultsPass font-110 c0-txt m-4 p-2 rounded" }).text("FAIL")
              ]),
              (0, import_jquery2.default)("<div>", { class: "play-intro p-2 centerFlexCont" }).append([
                playBtn.retryComplete,
                playBtn.nextComplete,
                playBtn.quitComplete
              ])
            ])
          ])
        ])
      ])
    ]);
    let quizContCard = (0, import_jquery2.default)(".quizContCard").css("background", "transparent");
    (0, import_jquery2.default)(".play-songDetails").text(`${thisSong?.author} - ${thisSong?.title}`);
    (0, import_jquery2.default)(".play-Username").text(`${thisUser.username}`);
    sectionSlider = setSlidableContent({
      container: (0, import_jquery2.default)(".quizCont"),
      group: [introCard, quizContCard, pauseCard, completeCard],
      leftButton: (0, import_jquery2.default)("<div>"),
      rightButton: (0, import_jquery2.default)("<div>")
    });
    (0, import_jquery2.default)(".quizCont").append((0, import_jquery2.default)(".barrCont"));
    loadEvents();
    (0, import_jquery2.default)(playBtn.confirmPlay).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (quizCtrl.isStarted && !quizCtrl.isEnded) {
        if (!quizCtrl.isPaused) {
          checkQuestion();
        } else {
          unpauseQuiz();
        }
      } else if (quizCtrl.isEnded) {
        (0, import_jquery2.default)(playBtn.quitComplete).trigger("click");
      }
    });
    (0, import_jquery2.default)(playBtn.startIntro).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!quizCtrl.isStarted) {
        startQuiz();
        saveActivity({
          userID: thisUser.id,
          type: "Played Quiz",
          info: `${thisUser.username} started playing a quiz: ${thisQuiz?.name} by ${thisQuiz?.username}`,
          details: {
            quizID: thisQuiz?.id
          }
        }, (msg, _dat) => {
          console.log("Saved Activity");
          console.log(_dat);
        }, (msg, _dat) => {
          console.log("Failed to save the Activity");
          console.log(msg);
          console.log(_dat);
        }, (err, msg) => {
          console.log("Error saving Activity");
          console.log(err);
          console.log(msg);
        });
        if (playlistMode && listIndex == 0) {
          saveActivity({
            userID: thisUser.id,
            type: "Played Playlist",
            info: `${thisUser.username} started playing a playlist: ${thisList?.name} by ${thisList?.username}`,
            details: {
              listID: thisList?.id
            }
          }, (msg, _dat) => {
            console.log("Saved Activity");
            console.log(_dat);
          }, (msg, _dat) => {
            console.log("Failed to save the Activity");
            console.log(msg);
            console.log(_dat);
          }, (err, msg) => {
            console.log("Error saving Activity");
            console.log(err);
            console.log(msg);
          });
        }
      }
    });
    (0, import_jquery2.default)(playBtn.prevPlay).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (quizCtrl.isStarted && !quizCtrl.isPaused && !quizCtrl.isEnded) {
        questionSlider.moveContentBy(-1);
      }
    });
    (0, import_jquery2.default)(playBtn.nextPlay).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (quizCtrl.isStarted && !quizCtrl.isPaused && !quizCtrl.isEnded) {
        questionSlider.moveContentBy(1);
      }
    });
    (0, import_jquery2.default)(playBtn.continuePause).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (quizCtrl.isStarted) {
        (0, import_jquery2.default)(playBtn.confirmPlay).find(".thiccBtnText").text("Confirm");
        unpauseQuiz();
      }
    });
    (0, import_jquery2.default)(playBtn.pausePlay).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (quizCtrl.isStarted) {
        if (!quizCtrl.isPaused) {
          (0, import_jquery2.default)(playBtn.confirmPlay).find(".thiccBtnText").text("Continue");
          pauseQuiz();
        } else {
          (0, import_jquery2.default)(playBtn.confirmPlay).find(".thiccBtnText").text("Confirm");
          unpauseQuiz();
        }
      }
    });
    (0, import_jquery2.default)(playBtn.retryComplete).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (quizCtrl.isEnded) {
        displayPopUpBox({
          messageText: "Retry quiz? Your score has been saved but you are welcome to redo it.",
          acceptText: "Retry this quiz",
          cancelText: "Return to screen",
          onAccept: () => {
            window.location.href = window.location.href;
          },
          onCancel: () => {
          }
        });
        loadEvents();
      }
    });
    (0, import_jquery2.default)(playBtn.mutePlay).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      muteQuiz();
    });
    (0, import_jquery2.default)(playBtn.quitPlay).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!quizCtrl.isEnded) {
        displayPopUpBox({
          messageText: "Stop playing quiz? This will end the quiz with your current score.",
          acceptText: "End this quiz",
          cancelText: "Return to quiz",
          onAccept: () => {
            (0, import_jquery2.default)(playBtn.confirmPlay).find(".thiccBtnText").text("Quit");
            endQuiz();
          },
          onCancel: () => {
          }
        });
        loadEvents();
      }
    });
    (0, import_jquery2.default)(playBtn.quitIntro).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!quizCtrl.isEnded) {
        displayPopUpBox({
          messageText: "Stop playing quiz? This will not save your score and will return you to the home page.",
          acceptText: "End this quiz",
          cancelText: "Return to quiz",
          onAccept: () => {
            window.location.href = "./home.php";
          },
          onCancel: () => {
          }
        });
        loadEvents();
      }
    });
    (0, import_jquery2.default)(playBtn.quitPause).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (!quizCtrl.isEnded) {
        displayPopUpBox({
          messageText: "Stop playing quiz? This will end the quiz with your current score.",
          acceptText: "End this quiz",
          cancelText: "Return to quiz",
          onAccept: () => {
            (0, import_jquery2.default)(playBtn.confirmPlay).find(".thiccBtnText").text("Quit");
            endQuiz();
          },
          onCancel: () => {
          }
        });
        loadEvents();
      }
    });
    (0, import_jquery2.default)(playBtn.quitComplete).on("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = "./home.php";
    });
    loadEvents();
  }
  __name(onMusicLoad, "onMusicLoad");
}
__name(main, "main");
function loadEvents() {
  if (conductor && conductor instanceof Conductor) {
    (0, import_jquery2.default)(`.playBar-progress`).css({
      "transition": `all ${conductor.crotchet}s`
    });
    if (holdDown.down) {
      (0, import_jquery2.default)(`.playBar-node`).css({
        "transition": `all ${conductor.stepCrotchet}s`
      });
    } else {
      (0, import_jquery2.default)(`.playBar-node`).css({
        "transition": `all ${conductor.crotchet}s`
      });
    }
    (0, import_jquery2.default)("body").on("songEnd", (event) => {
      endQuiz();
    });
    conductor.audio.ontimeupdate = (event) => {
      let progress = conductor.currStep / conductor.totalSteps * 100;
      (0, import_jquery2.default)(".playBar .playBar-progress").attr({
        "data-progress": `${progress}`
      }).css({
        "width": `${progress}%`
      }).find(".playBar-node").css(
        progress <= 50 ? { right: `auto`, left: `${progress}%` } : { left: `auto`, right: `${100 - progress}%` }
      );
    };
    conductor.connectElements((0, import_jquery2.default)(".barr").toArray());
    for (let i = 0; i < 32; i++) {
      (0, import_jquery2.default)(`.barr.step-${i + 1}`).on("stepHit", (event) => {
        let e = event;
        if (e.detail.step % (i + 1) == 0)
          animateStepBar(event);
      });
    }
    for (let i = 0; i < 8; i++) {
      (0, import_jquery2.default)(`.barr.beat-${i + 1}`).on("beatHit", (event) => {
        let e = event;
        if (e.detail.beat % (i + 1) == 0)
          animateBeatBar(event);
      });
    }
    for (let i = 0; i < 32; i++) {
      (0, import_jquery2.default)(`.barr.freq-${i + 1}`).on("beatHit", (event) => {
        let e = event;
        let K = i;
        if (e.detail.frequencyData[K] > frequency.min) {
          let freqDat = e.detail.frequencyData[K];
          animateFreqBar(e, freqDat, K);
        }
      });
    }
    conductor.connectElements((0, import_jquery2.default)(".formBtn").toArray());
    conductor.connectElement((0, import_jquery2.default)("#containerFooter")[0]);
    conductor.connectElements((0, import_jquery2.default)(".answerDiv").toArray());
    conductor.connectElements([
      (0, import_jquery2.default)("#myMouse")[0]
    ]);
  }
  (0, import_jquery2.default)(".playBar-bar").on("mousedown", (event) => {
    event.preventDefault();
    holdDown.down = true;
  }).on("mousemove", (event) => {
    if (holdDown.down) {
      onProgressBarChange(event);
    }
  }).on("click", (event) => {
    onProgressBarChange(event);
  }).bind("mouseup", () => {
    holdDown.down = false;
    clearInterval(holdDown.timer);
    clearTimeout(holdDown.startTimer);
  });
  (0, import_jquery2.default)(".thiccBtn").on("mouseenter", function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var quizBtnText = (0, import_jquery2.default)(this).children(".thiccBtnText");
    if ((0, import_jquery2.default)(quizBtnText).hasClass("font-md-0")) {
      (0, import_jquery2.default)(quizBtnText).removeClass("font-md-0");
    }
  });
  (0, import_jquery2.default)(".thiccBtn").on("mouseleave", function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    var quizBtnText = (0, import_jquery2.default)(this).children(".thiccBtnText");
    if (!(0, import_jquery2.default)(quizBtnText).hasClass("font-md-0")) {
      (0, import_jquery2.default)(quizBtnText).addClass("font-md-0");
    }
  });
  (0, import_jquery2.default)(".answerDiv").on("beatHit", (event) => {
    let e = event;
    var div = event.currentTarget;
    var animBox = (0, import_animejs2.default)({
      targets: [div],
      translateY: ["1", "8"],
      duration: e.detail.stepCrotchet * 1e3,
      easing: "easeInOutQuad",
      direction: "alternate"
    });
  });
  (0, import_jquery2.default)("#containerFooter").on("beatHit", (event) => {
    let e = event;
    var cont = event.currentTarget;
    var animBox = (0, import_animejs2.default)({
      targets: [cont],
      translateY: ["0", "-4"],
      duration: event.detail.stepCrotchet * 1e3,
      easing: "easeInOutQuad",
      direction: "alternate"
    });
  });
  (0, import_jquery2.default)(".formBtn").on("stepHit", (event) => {
    let e = event;
    var btn = e.currentTarget;
    var currStep = e.detail.step;
    if (currStep % 8 == 0) {
      var animBtn = (0, import_animejs2.default)({
        targets: [btn],
        scale: ["1", "1.225"],
        duration: event.detail.stepCrotchet * 1e3,
        easing: "easeInOutQuad",
        direction: "alternate"
      });
    }
  });
  (0, import_jquery2.default)(".barr.beat").on("beatHit", (event) => {
    let e = event;
    if (e.detail.beat)
      animateBeatBar(e);
  });
  (0, import_jquery2.default)(".barr.step").on("stepHit", (event) => {
    let e = event;
    if (e.detail.step)
      animateStepBar(e);
  });
  function animateBeatBar(event) {
    let h = [1, 5 * event.detail.volume + 1];
    let animBox = (0, import_animejs2.default)({
      targets: [event.currentTarget],
      scaleY: h,
      duration: event.detail.stepCrotchet * 1e3,
      easing: "easeInOutQuad",
      direction: "alternate"
    });
  }
  __name(animateBeatBar, "animateBeatBar");
  function animateStepBar(event) {
    let h = [1, rndInt(2, 5) * event.detail.volume + 1];
    let animBox = (0, import_animejs2.default)({
      targets: [event.currentTarget],
      scaleY: h,
      duration: event.detail.stepCrotchet * 1500,
      easing: "easeInOutCubic",
      direction: "alternate"
    });
  }
  __name(animateStepBar, "animateStepBar");
  function animateFreqBar(event, freqDat, pos) {
    let h = [1, 5 * event.detail.volume + 1];
    var m = freqDat > frequency.max ? frequency.max : freqDat;
    m = m / 255 * 4;
    let anim = (0, import_animejs2.default)({
      targets: [event.currentTarget],
      scaleY: h,
      duration: event.detail.stepCrotchet * (1e3 * (pos ? pos : 0.5)),
      easing: "easeInOutCubic",
      direction: "alternate"
    });
  }
  __name(animateFreqBar, "animateFreqBar");
  function onProgressBarChange(e) {
    if (!DebugMode)
      return;
    let thisBar = e.currentTarget;
    let parent = (0, import_jquery2.default)(thisBar).parent();
    let progressBar = (0, import_jquery2.default)(parent).find(".playBar-progress")[0];
    let thisRect = thisBar.getBoundingClientRect();
    let offset = (0, import_jquery2.default)(thisBar).offset();
    let windowQ = (0, import_jquery2.default)(window);
    let x = e.pageX - offset.left + windowQ.scrollLeft();
    let w = thisRect.width;
    if (x > 0 && x <= w) {
      let progress = (x ? x : 0) / (w ? w : 1) * 100;
      conductor.setStep(Math.trunc(conductor.totalSteps * progress / 100));
      (0, import_jquery2.default)(".playBar .playBar-progress").attr({
        "data-progress": `${progress}`
      }).css({
        "width": `${progress}%`
      }).find(".playBar-node").css(
        progress <= 50 ? { right: `auto`, left: `${progress}%` } : { left: `auto`, right: `${100 - progress}%` }
      );
    }
  }
  __name(onProgressBarChange, "onProgressBarChange");
}
__name(loadEvents, "loadEvents");
function addToScore(val) {
  if (isNaN(val))
    return;
  thisScore += val;
  updateScore();
}
__name(addToScore, "addToScore");
function setScore(val) {
  if (isNaN(val))
    return;
  thisScore = val;
  updateScore();
}
__name(setScore, "setScore");
function updateScore() {
  (0, import_jquery2.default)(".play-Score").text(`${thisScore}`).attr("data-play-score", `${thisScore}`);
}
__name(updateScore, "updateScore");
function getGrade() {
  let res = {
    pass: false,
    grade: "F"
  };
  res.pass = thisScore >= passingScore ? true : false;
  let percent = thisScore / (maxScore ? maxScore : 10) * 100;
  if (percent >= 100)
    res.grade = "S";
  else if (percent >= 90)
    res.grade = "A";
  else if (percent >= 75)
    res.grade = "B";
  else if (percent >= 50)
    res.grade = "C";
  else if (percent >= 47)
    res.grade = "D";
  else if (percent >= 25)
    res.grade = "E";
  else
    res.grade = "F";
  return res;
}
__name(getGrade, "getGrade");
function allAreAnswered() {
  for (let flag of answeredFlags) {
    if (!flag) {
      return false;
    }
  }
  return true;
}
__name(allAreAnswered, "allAreAnswered");
function checkQuestion() {
  if (questionSlider) {
    let qIndex = questionSlider.currentContentIndex();
    let thisQuizQuestions = thisQuiz?.questions;
    let thisQuestion = thisQuizQuestions[qIndex];
    let currQuestionDiv = questionSlider.currentContent();
    let answerDivs = (0, import_jquery2.default)(currQuestionDiv).find(".answerDiv").toArray();
    let checkedAnswers = [], correctAnswers = [];
    let checkedAnswerTexts = [];
    for (let an of answerDivs) {
      if ((0, import_jquery2.default)(an).find(".formRadioBtn")[0].checked) {
        checkedAnswers.push((0, import_jquery2.default)(an).find(".formRadioBtn")[0]);
        checkedAnswerTexts.push((0, import_jquery2.default)(an).find(".formRadioLabel").text());
      }
      if ((0, import_jquery2.default)(an).attr("data-correct") === "true") {
        correctAnswers.push((0, import_jquery2.default)(an).find(".formRadioBtn")[0]);
      }
    }
    if (!checkedAnswers.length) {
      easyPopUpBox("You did not select an answer!");
      loadEvents();
      return;
    }
    let isCorrect = true, correctCount = 0;
    for (let an of correctAnswers) {
      let isFound = false;
      for (let can of checkedAnswers) {
        if ((0, import_jquery2.default)(an).attr("id") == (0, import_jquery2.default)(can).attr("id")) {
          isFound = true;
          break;
        }
      }
      if (!isFound) {
        isCorrect = false;
      } else {
        correctCount++;
      }
    }
    if (isCorrect) {
      addToScore(correctCount * quizCtrl.multiplier);
    }
    let logTxt = thisQuestion.type == "multiple" ? checkedAnswerTexts.length : checkedAnswerTexts[0];
    (0, import_jquery2.default)(currQuestionDiv).removeClass("questionCard").addClass("confirmCard").html(createConfirmCard(isCorrect, logTxt).find(".card")[0]);
    answeredFlags[qIndex] = true;
    if (allAreAnswered()) {
      endQuiz();
    } else {
      setTimeout(() => {
        questionSlider.setContentIndex(qIndex + 1);
      }, 250);
    }
  }
}
__name(checkQuestion, "checkQuestion");
function createConfirmCard(isCorrect, logTxt) {
  let divText = "[blank]";
  if (!logTxt)
    divText = "[blank]";
  else if (typeof logTxt === "number") {
    divText = `${logTxt} answer(s)`;
  } else {
    divText = `${stringTrimToLength(logTxt, 30)}`;
  }
  let confirmCardDIV = (0, import_jquery2.default)("<div>", {
    class: "confirmCard h-80 h-md-90 w-90 w-sm-80 w-md-70 w-lg-50"
  }).append([
    (0, import_jquery2.default)("<div>", { class: "card my-1 mx-5 quizCard h-100" }).append([
      (0, import_jquery2.default)("<div>", { class: "card-body w-100 h-100 c0-txt centerFlexCont p-1 p-md-2" }).append([
        (0, import_jquery2.default)("<i>", { class: "fas font-750" }).addClass(`${isCorrect ? `fa-check-circle` : `fa-times-circle`}`)
      ]).addClass(`${isCorrect ? `c1-bg` : `c2-bg`}`),
      (0, import_jquery2.default)("<div>", { class: "card-body w-100 h-100 c0-txt centerFlexCont p-1 p-md-2" }).append([
        (0, import_jquery2.default)("<span>", { class: "p-2 c0-bg c1-txt rounded" }).addClass(`${isCorrect ? `c1-txt` : `c2-txt`}`).text(`${divText}`)
      ]).addClass(`${isCorrect ? `c1-bg` : `c2-bg`}`)
    ])
  ]);
  return confirmCardDIV;
}
__name(createConfirmCard, "createConfirmCard");
function createConductor() {
  conductor = new Conductor();
  conductor.connectElements([
    (0, import_jquery2.default)("#myMouse")[0]
  ]);
  conductor.activate();
}
__name(createConductor, "createConductor");
function playDefaultSong() {
  var currSong = {
    id: "",
    title: "Gizmo",
    author: "Syn Cole",
    bpm: 124,
    measure: 8,
    songURL: "./data/audio/default.dat"
  };
  playSong(currSong);
  thisSong = currSong;
  loadEvents();
  console.log("loaded default.dat");
}
__name(playDefaultSong, "playDefaultSong");
function playSong(currSong) {
  var audio = new Audio(`./data/audio/${currSong.songURL}`);
  if (!conductor)
    createConductor();
  conductor.changeStats(currSong.bpm, currSong.measure);
  conductor.connectAudioObject(audio);
  thisSong = currSong;
  loadEvents();
}
__name(playSong, "playSong");
function verifyLogin(callback) {
  var userID = localStorage.getItem("JBQ_userId");
  myHandler({
    type: "verify",
    data: { id: userID }
  }, (msg, data) => {
    console.log(data);
    console.log(msg);
    callback(data);
    loadEvents();
  }, (msg, data) => {
    console.log("Verification failed");
    console.log(msg);
    displayPopUpBox({
      messageText: `Authentication failed. You're not logged in. Returning to Splash Screen.`,
      cancelText: "Return to Splash Screen",
      onCancel: () => {
        window.location.href = "./index.php";
      }
    });
    loadEvents();
  }, (err, data) => {
    console.log(data);
    displayPopUpBox({
      messageText: "Error trying to verify login. Returning to Splash Screen",
      cancelText: "Return to Splash Screen",
      onCancel: () => {
        window.location.href = "./index.php";
      }
    });
    loadEvents();
  });
}
__name(verifyLogin, "verifyLogin");
function startQuiz() {
  sectionSlider.setContentIndex(1);
  quizCtrl.isStarted = true;
  quizCtrl.isEnded = false;
  quizCtrl.isPaused = false;
  if (conductor) {
    conductor.playOn();
    conductor.unmute();
  }
}
__name(startQuiz, "startQuiz");
function pauseQuiz() {
  if (!quizCtrl.isEnded) {
    sectionSlider.setContentIndex(2);
    quizCtrl.isPaused = true;
    if (conductor) {
      conductor.pause();
    }
  } else {
    endQuiz();
  }
}
__name(pauseQuiz, "pauseQuiz");
function unpauseQuiz() {
  if (!quizCtrl.isEnded) {
    sectionSlider.setContentIndex(1);
    quizCtrl.isPaused = false;
    if (conductor) {
      conductor.playOn();
    }
  } else {
    endQuiz();
  }
}
__name(unpauseQuiz, "unpauseQuiz");
function endQuiz() {
  if (!quizCtrl.isEnded) {
    quizCtrl.isEnded = true;
    if (conductor) {
      conductor.stop();
    }
    if (thisScore >= maxScore) {
      (0, import_jquery2.default)(".play-Score").css({
        "background-color": `white`
      });
    }
    let gradeResult = getGrade();
    (0, import_jquery2.default)(".completeCard .completeResults .completeResultsPass").text(`${gradeResult.pass ? `PASSED` : `FAILED`}`);
    (0, import_jquery2.default)(".completeCard .completeResults .completeResultsPass").css({
      "background-color": `var(--c${gradeResult.pass ? "1" : "2"})`
    });
    (0, import_jquery2.default)(".completeCard .completeResults .completeResultsGrade").text(`${gradeResult.grade}`);
    (0, import_jquery2.default)(".completeCard .completeResults .completeResultsGrade").css({
      "color": `var(--c${gradeResult.pass ? "1" : "2"})`
    });
    sectionSlider.setContentIndex(3);
    myHandler({
      type: "connect",
      subType: "addScore",
      data: {
        score: thisScore
      }
    }).then((res) => {
      if (res.success) {
        console.log(`Updated Score`);
      } else {
        console.log(`Failed to update Score`);
      }
      saveActivity({
        userID: thisUser.id,
        type: "Completed Quiz",
        info: `${thisUser.username} completed a quiz with a score of ${thisScore}: ${thisQuiz?.name} by ${thisQuiz?.username}`,
        details: {
          quizID: thisQuiz?.id
        }
      }, (msg, _dat) => {
        console.log("Saved Activity");
        console.log(_dat);
      }, (msg, _dat) => {
        console.log("Failed to save the Activity");
        console.log(msg);
        console.log(_dat);
      }, (err, msg) => {
        console.log("Error saving Activity");
        console.log(err);
      });
      console.log(res?.message);
    });
  }
}
__name(endQuiz, "endQuiz");
function muteQuiz() {
  if (conductor) {
    if (!conductor.isMuted()) {
      (0, import_jquery2.default)("#mutePlayBtn").find("i").removeClass("fa-volume-up").addClass("fa-volume-mute");
      conductor.mute();
      console.log(conductor.getVolume());
    } else {
      (0, import_jquery2.default)("#mutePlayBtn").find("i").removeClass("fa-volume-mute").addClass("fa-volume-up");
      conductor.unmute();
    }
  }
}
__name(muteQuiz, "muteQuiz");
/*! Bundled license information:

jquery/dist/jquery.js:
  (*!
   * jQuery JavaScript Library v3.6.1
   * https://jquery.com/
   *
   * Includes Sizzle.js
   * https://sizzlejs.com/
   *
   * Copyright OpenJS Foundation and other contributors
   * Released under the MIT license
   * https://jquery.org/license
   *
   * Date: 2022-08-26T17:52Z
   *)

lodash/lodash.js:
  (**
   * @license
   * Lodash <https://lodash.com/>
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
