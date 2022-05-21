/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\nfunction init() {\r\n    let scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\r\n    let camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);\r\n    let renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGL1Renderer();\r\n    renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_0__.Color(0xEEEEEE));\r\n    renderer.setSize(window.innerWidth, window.innerHeight);\r\n    let axes = new three__WEBPACK_IMPORTED_MODULE_0__.AxesHelper(20);\r\n    scene.add(axes);\r\n    // create the ground plane\r\n    let planeGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(60, 20);\r\n    let planeMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0xcccccc });\r\n    let plane = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(planeGeometry, planeMaterial);\r\n    plane.rotation.x = -0.5 * Math.PI;\r\n    plane.position.x = 15.0;\r\n    plane.position.y = 0.0;\r\n    plane.position.z = 0.0;\r\n    scene.add(plane);\r\n    // create a sphere\r\n    let sphereGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.SphereGeometry(4, 20, 20);\r\n    let sphereMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x7777ff, wireframe: true });\r\n    let sphere = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(sphereGeometry, sphereMaterial);\r\n    sphere.position.x = 20.0;\r\n    sphere.position.y = 4.0;\r\n    sphere.position.z = 2.0;\r\n    scene.add(sphere);\r\n    camera.position.x = -30.0;\r\n    camera.position.y = 40.0;\r\n    camera.position.z = 30.0;\r\n    camera.lookAt(scene.position);\r\n    // add the output of the renderer to the html element\r\n    let element = document.getElementById(\"WebGL-output\");\r\n    if (element !== null) {\r\n        element.appendChild(renderer.domElement);\r\n    }\r\n    // render the scene\r\n    renderer.render(scene, camera);\r\n}\r\nwindow.onload = init;\r\n\n\n//# sourceURL=webpack://spherical-harmonics/./src/main.ts?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;