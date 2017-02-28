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

	// import DOMNodeCollection from './dom_node_collection.js';
	const DOMNodeCollection = __webpack_require__(1);


	// boot command - webpack --watch lib/main.js lib/jquery_lite.js
	// this creates jquery_lite.js

	const functions = [];

	const $l = function (arg) {
	  if (typeof arg === "function") {
	    functions.push(arg);
	  } else {
	    let htmlArray = [];
	    if (typeof arg === "string") {
	      const nodeList = document.querySelectorAll(arg);
	      htmlArray = Array.from(nodeList);
	    } else if (arg instanceof HTMLElement) {
	      htmlArray = [arg];
	    } else if (arg instanceof Array) {

	    }

	    return new DOMNodeCollection(htmlArray);
	  }
	};

	window.$l = $l;

	$l.extend = (initialObj, ...mergeObjs) => {
	  mergeObjs.forEach( obj => {
	    for (let prop in obj) {
	      initialObj[prop] = obj[prop];
	    }
	  });
	  return initialObj;
	};

	$l.ajax = (options) => {
	  const defaults = {
	    success: () => {},
	    error: () => {},
	    method: 'GET',
	    data: {},
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	    url: ""
	  };

	  let values = $l.extend(defaults, options);
	  values.method = values.method.toUpperCase();
	  const xhr = new XMLHttpRequest();
	  // xhr.open('POST', 'api/path/to/resource');
	  xhr.open(values.method, values.url);

	  xhr.onload = () => {
	    if (xhr.status === 200) {
	      values.success(xhr.response);
	    } else {
	      values.error(xhr.response);
	    }
	  };

	  xhr.send(values.data);
	};


	document.addEventListener("DOMContentLoaded", () => {
	  functions.forEach ( (fn) => {
	    fn();
	  });
	});

	//
	// $.ajax({
	//       type: 'GET',
	//       url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
	//       success(data) {
	//         console.log("We have your weather!")
	//         console.log(data);
	//       },
	//       error() {
	//         console.error("An error occurred.");
	//       },
	//    });


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor (htmlArray) {
	    this.htmlArray = htmlArray;
	  }

	  // if an argument is given to jQuery it will replace whatever is inside of that html tag with the input.
	  // example <h2<Hi</h2> $("h2").html("bye") === <h2>bye</h2>
	  html (string) {
	    if (string === undefined) {
	      // getter
	      return this.htmlArray[0].innerHTML;
	    } else {
	      // setter
	      this.htmlArray.forEach( (el) => {
	        el.innerHTML = string;
	      });
	    }
	  }

	  empty() {
	    this.htmlArray.forEach( (el) => {
	      el.html = "";
	    });
	  }

	  // let html = this.htmlArray;
	  // debugger
	  // htmlNode.appendChild(argNode);
	  append (args) {
	    if (args instanceof DOMNodeCollection) {
	      args.htmlArray.forEach( (argNode) => {
	        this.htmlArray.forEach( (htmlNode, index) => {
	          if (index === 0) {
	            htmlNode.appendChild(argNode);
	          } else {
	            htmlNode.innerHTML += argNode.outerHTML;
	          }
	        });
	      });
	    } else if ((args instanceof HTMLElement) || (typeof args === 'string') ) {
	      this.htmlArray.forEach ( (htmlNode) => {
	        htmlNode.append(args);
	      });
	    }

	  }

	  attr (name, value) {
	    if (value === undefined) {
	      let node = this.htmlArray[0];
	      return node.attributes.name;
	    } else {
	      this.htmlArray.forEach( (node) => {
	      node.attributes.name = value;
	      });
	    }
	  }

	  addClass(value) {
	    if (value === undefined) {
	      return this.htmlArray[0].className;
	    } else {
	      this.htmlArray.forEach( (node) => {
	        node.className = value;
	      });
	    }
	  }

	  removeClass() {
	    this.htmlArray.forEach ( (node) => {
	      node.className = "";
	    });
	  }

	  children() {
	    let childrenHTMLArray = [];
	    this.htmlArray.forEach ( (node) => {
	      for (var i = 0; i < node.children.length; i++) {
	        childrenHTMLArray.push(node.children[i]);
	      }
	    });

	    return new DOMNodeCollection(childrenHTMLArray);
	  }

	  parent() {
	    let parentHTMLArray = [];
	    this.htmlArray.forEach ( (node) => {
	      parentHTMLArray.push(node.parentNode);
	    });

	    return new DOMNodeCollection(parentHTMLArray);
	  }

	  find (selector) {
	    let foundHtmlArray = [];
	    this.htmlArray.forEach ( (node) => {
	      const nodes = node.querySelectorAll(selector);
	      for (var i = 0; i < nodes.length; i++) {
	        foundHtmlArray.push(nodes[i]);
	      }
	    });

	    return new DOMNodeCollection(foundHtmlArray);
	  }

	  remove () {
	    // clear all of the HTML from all of the node elements
	    this.htmlArray.forEach ( (node) => {
	      node.remove();
	    });
	  }

	  on (e, callback) {
	    this.htmlArray.forEach ( (node) => {
	      node.addEventListener(e, callback);
	      node.listener = callback;
	    });
	  }

	  off (e) {
	    this.htmlArray.forEach ( (node) => {
	      node.removeEventListener(e, node.listener);
	    });
	  }
	}
	// off(eventName) {
	//    this.each(node => {
	//      const eventKey = `jqliteEvents-${eventName}`;
	//      if (node[eventKey]) {
	//        node[eventKey].forEach(callback => {
	//          node.removeEventListener(eventName, callback);
	//        });
	//      }
	//      node[eventKey] = [];
	//    });
	//  }

	// export default DOMNodeCollection;
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);