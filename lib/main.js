const DOMNodeCollection = require('./dom_node_collection.js');

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
