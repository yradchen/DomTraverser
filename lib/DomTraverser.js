/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	const functions = [];
	let documentReady = false;

	const functionHandler = (func) => {
	  if (documentReady) {
	    func();
	  } else {
	    functions.push(func);
	  }
	};

	const DomTraverser = (arg) => {
	  let htmlArray = [];
	  if (typeof arg === "function") {
	    functionHandler(arg);
	  } else if (typeof arg === "string") {
	    const nodeList = document.querySelectorAll(arg);
	    htmlArray = Array.from(nodeList);
	  } else if (arg instanceof HTMLElement) {
	      htmlArray = [arg];
	  }
	  return new DOMNodeCollection(htmlArray);
	};

	DomTraverser.create = (string) => {
	  let htmlEl = document.createElement(string);
	  return DomTraverser(htmlEl);
	};

	window.DomTraverser = DomTraverser;

	DomTraverser.extend = (initialObj, ...mergeObjs) => {
	  mergeObjs.forEach( obj => {
	    for (let prop in obj) {
	      initialObj[prop] = obj[prop];
	    }
	  });
	  return initialObj;
	};

	DomTraverser.ajax = (options) => {
	  const defaults = {
	    success: () => {},
	    error: () => {},
	    method: 'GET',
	    data: {},
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    dataType: 'jsonp',
	    url: ""
	  };

	  options = DomTraverser.extend(defaults, options);
	  return new Promise((resolve, reject) => {
	    const req = new XMLHttpRequest();
	    req.open(options.method, options.url);
	    req.setRequestHeader('Content-Type', options.contentType);
	    req.onload = function () {
	      xhrLoad(req, options, resolve, reject);
	    };
	    req.onerror = () => reject(req.response);
	    req.send(JSON.stringify(options.data));
	  });
	};

	const xhrLoad = (req, options, resolve, reject) => {
	  req.onload = function () {
	    if (req.status >= 200 && req.status < 300) {
	      if (options.dataType === 'jsonp') {
	        return resolve(JSON.parse(req.response));
	      } else {
	        return resolve(req.response);
	      }
	    } else {
	      return reject(req.response);
	    }
	  };
	};

	document.addEventListener("DOMContentLoaded", () => {
	  documentReady = true;
	  functions.forEach ( (fn) => {
	    fn();
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor (htmlArray) {
	    this.htmlArray = htmlArray;
	  }

	  html (string) {
	    if (string === undefined) {
	      return this.htmlArray[0].innerHTML;
	    } else {
	      this.htmlArray.forEach( (el) => {
	        el.innerHTML = string;
	      });
	    }
	  }

	  empty() {
	    this.html("");
	  }

	  append (args) {
	    if (args instanceof DOMNodeCollection) {
	      this.appendCollections(args);
	    } else if ((args instanceof HTMLElement) || (typeof args === 'string') ) {
	      this.htmlArray.forEach ( (htmlNode) => {
	        htmlNode.append(args);
	      });
	    }
	  }

	  appendCollections(args) {
	    args.htmlArray.forEach( (argNode) => {
	      this.htmlArray.forEach( (htmlNode, index) => {
	        if (index === 0) {
	          htmlNode.appendChild(argNode);
	        } else {
	          htmlNode.innerHTML += argNode.outerHTML;
	        }
	      });
	    });
	  }

	  attr (name, value) {
	    if (value === undefined) {
	      const node = this.htmlArray[0];
	      return node.attributes.name;
	    } else {
	      this.htmlArray.forEach( (node) => {
	      node.attributes.name = value;
	      });
	    }
	  }

	  addClass(newClass) {
	    if (newClass === undefined) {
	      return this.htmlArray[0].className;
	    } else {
	      this.htmlArray.forEach(node => {
	        node.classList.add(newClass);
	      });
	    }
	  }

	  removeClass(oldClass) {
	    this.htmlArray.forEach ( (node) => {
	      node.classList.remove(oldClass);
	    });
	  }

	  children() {
	    const childrenHTMLArray = [];
	    this.htmlArray.forEach ( (node) => {
	      for (var i = 0; i < node.children.length; i++) {
	        childrenHTMLArray.push(node.children[i]);
	      }
	    });

	    return new DOMNodeCollection(childrenHTMLArray);
	  }

	  parent() {
	    const parentHTMLArray = [];
	    this.htmlArray.forEach ( (node) => {
	      parentHTMLArray.push(node.parentNode);
	    });

	    return new DOMNodeCollection(parentHTMLArray);
	  }
	  //
	  value(string) {
	    if (string === undefined) {
	      return this.htmlArray[0].value;
	    } else {
	      this.htmlArray.forEach( (el) => {
	        el.value = string;
	      });
	    }
	  }

	  find (selector) {
	    const foundHtmlArray = [];
	    this.htmlArray.forEach ( (node) => {
	      const nodes = node.querySelectorAll(selector);
	      for (var i = 0; i < nodes.length; i++) {
	        foundHtmlArray.push(nodes[i]);
	      }
	    });

	    return new DOMNodeCollection(foundHtmlArray);
	  }

	  remove () {
	    this.htmlArray.forEach ( (node) => {
	      node.remove();
	    });
	  }

	  on(eventName, callback) {
	    this.htmlArray.forEach(node => {
	      node.addEventListener(eventName, callback);
	      const eventKey = `dom-${eventName}`;
	      if (typeof node[eventKey] === "undefined") {
	        node[eventKey] = [];
	      }
	      node[eventKey].push(callback);
	    });
	  }

	  off(eventName) {
	    this.htmlArray.forEach(node => {
	      const eventKey = `dom-${eventName}`;
	      if (node[eventKey]) {
	        node[eventKey].forEach(callback => {
	          node.removeEventListener(eventName, callback);
	        });
	      }
	      node[eventKey] = [];
	    });
	  }
	}

	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);