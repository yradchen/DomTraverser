// import DOMNodeCollection from './dom_node_collection.js';
const DOMNodeCollection = require('./dom_node_collection.js');


// boot command - webpack --watch lib/main.js lib/jquery_lite.js
// this creates jquery_lite.js

const functions = [];
let documentReady = false;

const functionHandler = (func) => {
  if (documentReady) {
    func();
  } else {
    functions.push(func);
  }
};

const $l = (arg) => {
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

window.$l = $l;

$l.extend = (initialObj, ...mergeObjs) => {
  mergeObjs.forEach( obj => {
    for (let prop in obj) {
      initialObj[prop] = obj[prop];
    }
  });
  return initialObj;
};

const xhrRequest = (values) => {
  const xhr = new XMLHttpRequest();
  xhr.open(values.method, values.url);
  xhrLoad(xhr, values);
  xhr.send(values.data);
};

const xhrLoad = (xhr, values) => {
  xhr.onload = () => {
    if (xhr.status === 200) {
      values.success(xhr.response);
    } else {
      values.error(xhr.response);
    }
  };
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
  xhrRequest(values);
};

document.addEventListener("DOMContentLoaded", () => {
  functions.forEach ( (fn) => {
    fn();
  });
});
