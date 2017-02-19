(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("thru", [], factory);
	else if(typeof exports === 'object')
		exports["thru"] = factory();
	else
		root["thru"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__err__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ok__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Err", function() { return __WEBPACK_IMPORTED_MODULE_0__err__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ok", function() { return __WEBPACK_IMPORTED_MODULE_1__ok__["a"]; });





/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is_thennable__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = asyncCompose;


function fromThen(x, fn) {
    return x.then(fn);
}

function asyncCompose(...fns) {
    return v => fns.reverse().reduce((x, y) => {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__is_thennable__["a" /* default */])(x) ? fromThen(x, y) : y(x);
    }, v);
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = x => x;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__async_result__ = __webpack_require__(5);
/* harmony export (immutable) */ __webpack_exports__["a"] = isThennable;


function isThennable(resultingAsync) {
    return resultingAsync.then ? __WEBPACK_IMPORTED_MODULE_0__async_result__["a" /* default */].THENNABLE : __WEBPACK_IMPORTED_MODULE_0__async_result__["a" /* default */].NOT_THENNABLE;
}

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Result {
    constructor(x) {
        this.x = x;
    }

    unwrap() {
        return this.x;
    }

    isOk() {
        return this.constructor.name === 'Ok';
    }

    isErr() {
        return this.constructor.name === 'Err';
    }

    inspect() {
        return `${this.constructor.name}(${this.x})`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Result;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = {
    NOT_THENNABLE: 0,
    THENNABLE: 1
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__immediate__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__identity__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__is_thennable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipe__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__partial__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tuple__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__compose__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_3__identity__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__is_thennable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__constant__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__immediate__["a"]; });
/* unused harmony reexport pipe */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_6__partial__["a"]; });
/* unused harmony reexport Tuple */











/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Tuple;
function Tuple(a, b) {
    if (this instanceof Tuple) {
        this.a = a;
        this.b = b;
    } else {
        return new Tuple(a, b);
    }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = constant;
function constant(x) {
    return () => typeof x === 'function' ? x() : x;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__identity__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__result__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = immediate;



function immediate(lambda, middleware = __WEBPACK_IMPORTED_MODULE_0__identity__["a" /* default */]) {
    if (typeof lambda() !== 'undefined' && lambda() !== null) {
        return new __WEBPACK_IMPORTED_MODULE_1__result__["Ok"](middleware(lambda()));
    } else {
        return new __WEBPACK_IMPORTED_MODULE_1__result__["Err"]('Failed to retrieve any immediate value.');
    }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = partial;
function partial(fn) {
    let arity = fn.length;
    return getArgs([]);

    function getArgs(totalArgs) {
        return function stepTwo(...args) {
            let nextTotalArgs = totalArgs.concat(args);
            if (nextTotalArgs.length >= arity) {
                return fn(...nextTotalArgs);
            } else {
                return getArgs(nextTotalArgs);
            }
        };
    }
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(1);
/* unused harmony export default */


function pipe(...fns) {
    const reversed = fns.reverse();
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */])(reversed);
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__result__ = __webpack_require__(4);


class Err extends __WEBPACK_IMPORTED_MODULE_0__result__["a" /* default */] {
    constructor(x) {
        super(x);
    }

    map(_) {
        return new Err(this.x);
    }

    orElse(fn) {
        return new Err(fn(this.x));
    }

    andThen(_) {
        return new Err(this.x);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Err;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__result__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib__ = __webpack_require__(6);



class Ok extends __WEBPACK_IMPORTED_MODULE_0__result__["a" /* default */] {
    constructor(x) {
        super(x);
    }

    map(fn) {
        return new Ok(fn(this.x));
    }

    orElse(_) {
        return new Ok(this.x);
    }

    andThen(fn) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__lib__["a" /* isThennable */])(this.x) ? new Ok(this.x.then(fn)) : new Ok(fn(this.x));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ok;


/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_tuple__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__result__ = __webpack_require__(0);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Result", function() { return __WEBPACK_IMPORTED_MODULE_1__result__; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Tuple", function() { return __WEBPACK_IMPORTED_MODULE_0__lib_tuple__["a"]; });





/***/ })
/******/ ]);
});
//# sourceMappingURL=index.js.map