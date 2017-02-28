// import DOMNodeCollection from './dom_node_collection.js';
const DOMNodeCollection = require('./dom_node_collection.js');


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
