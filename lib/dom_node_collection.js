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
