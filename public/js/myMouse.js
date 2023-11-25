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
      return filterArray(targetsArray, function(item, pos, self) {
        return self.indexOf(item) === pos;
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
        if (!raf && (!isDocumentHidden() || !anime2.suspendWhenDocumentHidden) && activeInstances.length > 0) {
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
        if (!anime2.suspendWhenDocumentHidden) {
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
    function anime2(params) {
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
        lastTime = adjustTime(instance.currentTime) * (1 / anime2.speed);
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
        setInstanceProgress((now + (lastTime - startTime)) * anime2.speed);
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
    __name(anime2, "anime");
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
      var tl = anime2(params);
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
        var ins = anime2(insParams);
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
    anime2.version = "3.2.1";
    anime2.speed = 1;
    anime2.suspendWhenDocumentHidden = true;
    anime2.running = activeInstances;
    anime2.remove = removeTargetsFromActiveInstances;
    anime2.get = getOriginalTargetValue;
    anime2.set = setTargetsValue;
    anime2.convertPx = convertPxToUnit;
    anime2.path = getPath;
    anime2.setDashoffset = setDashoffset;
    anime2.stagger = stagger;
    anime2.timeline = timeline;
    anime2.easing = parseEasings;
    anime2.penner = penner;
    anime2.random = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    module2.exports = anime2;
  }
});

// node_modules/jquery/dist/jquery.js
var require_jquery = __commonJS({
  "node_modules/jquery/dist/jquery.js"(exports, module2) {
    (function(global, factory) {
      "use strict";
      if (typeof module2 === "object" && typeof module2.exports === "object") {
        module2.exports = global.document ? factory(global, true) : function(w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
      } else {
        factory(global);
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
          var i, ret, len = this.length, self = this;
          if (typeof selector !== "string") {
            return this.pushStack(jQuery(selector).filter(function() {
              for (i = 0; i < len; i++) {
                if (jQuery.contains(self[i], this)) {
                  return true;
                }
              }
            }));
          }
          ret = this.pushStack([]);
          for (i = 0; i < len; i++) {
            jQuery.find(selector, self[i], ret);
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
        jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
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
        }, "fire"), self = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (/* @__PURE__ */ __name(function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (isFunction2(arg)) {
                    if (!options.unique || !self.has(arg)) {
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
            jQuery.each(arguments, function(_, arg) {
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
            self.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };
        return self;
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
            var self = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self.html());
            }
            domManip(self, args, callback, ignored);
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
          var classNames, className, i, self, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
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
              self = jQuery(this);
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];
                if (self.hasClass(className)) {
                  self.removeClass(className);
                } else {
                  self.addClass(className);
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
          jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
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
            var self = jQuery(this), contents = self.contents();
            if (contents.length) {
              contents.wrapAll(html);
            } else {
              self.append(html);
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
            send: function(_, complete) {
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
        var selector, type, response, self = this, off = url.indexOf(" ");
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
        if (self.length > 0) {
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
            self.html(selector ? (
              // If a selector was specified, locate the right elements in a dummy div
              // Exclude scripts to avoid IE 'Permission Denied' errors
              jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
            ) : (
              // Otherwise use the full result
              responseText
            ));
          }).always(callback && function(jqXHR, status) {
            self.each(function() {
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

// src/js/myMouse.ts
var import_animejs = __toESM(require_anime());
var import_jquery = __toESM(require_jquery());

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

// node_modules/@catsums/vector2/lib/esm/MY.js
var __defProp3 = Object.defineProperty;
var __name3 = /* @__PURE__ */ __name((target, value) => __defProp3(target, "name", { value, configurable: true }), "__name");
function mod2(n, m) {
  return (n % m + m) % m;
}
__name(mod2, "mod");
__name3(mod2, "mod");
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
__name3(safeDivide2, "safeDivide");
function isInfinity2(x) {
  return x === -Infinity || x === Infinity;
}
__name(isInfinity2, "isInfinity");
__name3(isInfinity2, "isInfinity");
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
__name3(roundTo2, "roundTo");

// node_modules/@catsums/vector2/lib/esm/Vector2.js
var __defProp4 = Object.defineProperty;
var __name4 = /* @__PURE__ */ __name((target, value) => __defProp4(target, "name", { value, configurable: true }), "__name");
var Vector2 = class _Vector2 {
  static {
    __name(this, "Vector2");
  }
  static {
    __name4(this, "Vector2");
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
    var clamp = /* @__PURE__ */ __name4(function(n, min, max) {
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
var __defProp5 = Object.defineProperty;
var __name5 = /* @__PURE__ */ __name((target, value) => __defProp5(target, "name", { value, configurable: true }), "__name");
var Vector2Line = class _Vector2Line {
  static {
    __name(this, "Vector2Line");
  }
  static {
    __name5(this, "Vector2Line");
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
var __defProp6 = Object.defineProperty;
var __name6 = /* @__PURE__ */ __name((target, value) => __defProp6(target, "name", { value, configurable: true }), "__name");
var Rect2 = class _Rect2 {
  static {
    __name(this, "Rect2");
  }
  static {
    __name6(this, "Rect2");
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
var __defProp7 = Object.defineProperty;
var __name7 = /* @__PURE__ */ __name((target, value) => __defProp7(target, "name", { value, configurable: true }), "__name");
var Transform2 = class _Transform2 {
  static {
    __name(this, "Transform2");
  }
  static {
    __name7(this, "Transform2");
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

// src/js/myMouse.ts
(function() {
  var mouseStopTimer;
  var isMouseMoving = false;
  var body = (0, import_jquery.default)("body")[0];
  var lastMousePos = new Vector2();
  var mousePos = new Vector2();
  var mouseDir = new Vector2();
  var lastX, lastY;
  var particles = [];
  var particleAmt = 10;
  var spread = 8;
  var wX = (0, import_jquery.default)("#myMouse").css("width").slice(0, -2);
  var wY = (0, import_jquery.default)("#myMouse").css("height").slice(0, -2);
  (0, import_jquery.default)("body").on("ready", (e) => {
    (0, import_jquery.default)("body").css("cursor", "none");
  }).on("mousemove", (e) => {
    clearTimeout(mouseStopTimer);
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
    onMouseMove(e);
    lastMousePos.x = mousePos.x;
    lastMousePos.y = mousePos.y;
    mouseStopTimer = setTimeout(() => {
      onMouseStop(e);
    }, 10);
  });
  (0, import_jquery.default)("*").click((e) => {
    onMouseClick(e);
  });
  var anim_move, anim_stop;
  function onMouseMove(event) {
    mouseDir = mousePos.lineTo(lastMousePos).normalized();
    var angK = `${rad2deg(mouseDir.angle())}deg`;
    (0, import_jquery.default)("#myMouse").css("transform", `scaleY(0.75) scaleX(1.25) rotate(${angK})`);
    if (!isMouseMoving) {
      isMouseMoving = true;
    }
    mouseParticles_Move(event);
  }
  __name(onMouseMove, "onMouseMove");
  function onMouseStop(event) {
    isMouseMoving = false;
    mouseDir = mousePos.lineTo(lastMousePos).normalized();
    (0, import_jquery.default)("#myMouse").css("transform", "rotate(0deg)");
    anim_stop = (0, import_animejs.default)({
      targets: "#myMouse",
      scaleY: ["1", "1.35", "0.65", "1.225", "0.725", "1.112", "0.906", "1"],
      scaleX: ["1", "1.09", "0.93", "1.075", "0.955", "1.043", "0.973", "1"],
      duration: 800,
      easing: "easeInOutQuad",
      direction: "normal"
    });
  }
  __name(onMouseStop, "onMouseStop");
  function onMouseClick(event) {
    mouseParticles_Click(event);
  }
  __name(onMouseClick, "onMouseClick");
  function mouseParticles_Move(event) {
    let posX = event.pageX - Number(wX) / 2;
    let posY = event.pageY - Number(wY) / 2;
    (0, import_jquery.default)("#myMouse").css("top", posY).css("left", posX);
    let x = posX + rndInt(-spread, spread) + Number(wX) / 2;
    let y = posY + rndInt(-spread, spread) + Number(wY) / 2;
    let rId = randomId("particle_");
    if (particleAmt < particles.length) {
      particles.pop()?.remove();
      return;
    }
    (0, import_jquery.default)("body").append("<div id='" + rId + "' class='mouseParticle'>");
    particles.unshift((0, import_jquery.default)("#" + rId));
    let pv = new Vector2(
      (0, import_jquery.default)("#" + rId)?.width(),
      (0, import_jquery.default)("#" + rId)?.height()
    );
    let offsetX = Math.floor(x - pv.x / 2);
    let offsetY = Math.floor(y - pv.y / 2);
    let to = new Vector2(
      Math.floor(lastX),
      Math.floor(lastY)
    );
    (0, import_jquery.default)("#" + rId).css("position", "absolute").css("top", offsetY).css("left", offsetX);
    (0, import_jquery.default)("#" + rId).fadeOut(500, function() {
      (0, import_jquery.default)("#" + rId).remove();
    });
    (0, import_jquery.default)("#" + rId).fadeOut({
      duration: 500,
      complete: () => {
        (0, import_jquery.default)("#" + rId).remove();
      }
    });
    (0, import_jquery.default)("#" + rId).css("top", to.y).css("left", to.x);
    lastX = x;
    lastY = y;
  }
  __name(mouseParticles_Move, "mouseParticles_Move");
  function mouseParticles_Click(event) {
    let x = event.pageX - Number(wX) / 2;
    let y = event.pageY - Number(wY) / 2;
    let rId = randomId("click_");
    (0, import_jquery.default)("body").append("<div id='" + rId + "' class='mouseClickCircle'>");
    particles.unshift((0, import_jquery.default)("#" + rId));
    let pv = new Vector2(
      (0, import_jquery.default)("#" + rId)?.width(),
      (0, import_jquery.default)("#" + rId)?.height()
    );
    let offsetX = Math.floor(x - pv.x / 2);
    let offsetY = Math.floor(y - pv.y / 2);
    (0, import_jquery.default)("#" + rId).css("position", "absolute").css("top", offsetY).css("left", offsetX);
    let initScale;
    (0, import_jquery.default)("#" + rId).fadeOut({
      duration: 500,
      easing: "swing",
      progress: (anim, pprogress) => {
        var sscale = 20 * pprogress;
        (0, import_jquery.default)("#" + rId).css("transform", "scale(" + sscale + ")");
      },
      fail: () => {
        (0, import_jquery.default)("#" + rId).remove();
      },
      complete: () => {
        (0, import_jquery.default)("#" + rId).remove();
      }
    });
  }
  __name(mouseParticles_Click, "mouseParticles_Click");
})();
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
*/
