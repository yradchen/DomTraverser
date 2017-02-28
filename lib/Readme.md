# Dom Traverser - JS library for easy DOM traversing and manipulation

Dom Traverser is a jQuery inspired library that allows for easy manipulation of the DOM. This light-weight library allows for making ajax requests, event handling, and manipulating the DOM. Dom Traverser uses native DOM API that is built into every browser, ensuring functionality.


### API

`Use $l to obtain a DOM Node Collection`



* html()

  - without arguments

    `Returns the inner html of selected collection`

  - with arguments

    `Sets the inner html of selected collection`

* empty()

    `Deletes inner html of selected collection`

* append(args)

  - When arg is another collection

    `Removes from previous parent and appends as a child to selected collection`

  - When arg is a string or HTML Element

    `Appends as a child to the selected element`


* attr(name, value)

  - With a single argument

    `Gets the value of the first element in the collection`

  - With a values argument

    `Sets the value of every matched element in the collection`


* addClass(value)

  - without arguments

    `Returns the class(es) of the first matched element`

  - with arguments

    `Sets the class(es) of each matched element in the collection`

* removeClass()

  `Removes the class(es) from every matched element in the collection`

* children()

  `Returns the children in the collection of matched elements`

* parent()

  `Returns the parent in the collection of matched elements`

* find(selector)

  `Returns descendants, filtered by the selector, of each element in the currently matched collection`

* remove()

  `Removes all the matched elements from the DOM`

* on(eventHandler, callback)

  `Attaches an event handler function to the selected elements`

* off(eventHandler)

  `Remove an event handler from the selected elements`
  
