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
    this.htmlArray.forEach( (el) => {
      el.html = "";
    });
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
