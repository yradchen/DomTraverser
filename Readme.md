# Dom Traverser - JS library for easy DOM traversing and manipulation

Dom Traverser is a jQuery inspired library that allows for easy manipulation of the DOM. This light-weight library allows for making ajax requests, event handling, and manipulating the DOM. Dom Traverser uses native DOM API that is built into every browser, ensuring functionality.

### [Live DomTraverser Demo](https://yradchen.github.io/DomTraverser/)


### API

* #### DomTraverser.ajax()

  Performs an asynchronous HTTP request. The object accepts the following key, value pair associations;

  - success

  `A success callback used to signify what to do when a status 200 success is received.`

  - error

  `An error callback used to signify what to do when an error is received`

  - method

  `Method to send to the server. Default to 'GET'`

  - data

  `Data sent up to the server. Defaults to an empty object`

  - contentType

  `content type to send to the server. Defaults to "application/x-www-form-urlencoded; charset=UTF-8"`

  - url

  `A string containing the page to send the request. Defaults to the current page`

* #### DomTraverser(htmlElement/s)

  `Used to wrap into a DOM Traverser object. This allows for manipulation using the rest of this readme's API.`

* #### DomTraverser.create(string)

 `Creates an html tag with the passed in string`

### API - Manipulating DOM Traverser objects

* #### html()

  - without arguments

    `Returns the inner html of the first element of each matched collection`

  - with arguments

    `Sets the inner html of every matched element`

* #### value()

  - without arguments

    `Returns the value of the first element of each matched element`

  - with arguments

    `Sets the value of every matched element`

* #### empty()

     `Deletes inner html of element from the DOM`

* #### append(args)

  - When arg is an element in the DOM

    `Removes element from DOM and appends as a child to selected collection of elements`

  - When arg is a string or HTML Element

    `Appends as a child to each element in the collection of matched elements`


* #### attr(name, value)

  - With a single argument

    `Gets the value of the specific argument in the first element in the collection`

  - With a values argument

    `Sets the value of every matched element in the collection`

    * Example

    `<h2 id="hidden">My attribute is id with a value of hidden </h2>`


* #### addClass(value)

  - without arguments

    `Returns the class(es) of the first matched element`

  - with arguments

    `Sets the class(es) of each matched element in the collection of elements`

* #### removeClass()

  `Removes the class(es) from every matched element in the collection of elements`

* #### children()

  `Returns the children in the collection of matched elements`

* #### parent()

  `Returns the parent in the collection of matched elements`

* #### find(selector)

  `Returns descendants, filtered by the selector, of each element in the currently matched collection`

* #### remove()

  `Removes all the matched elements from the DOM`

* #### on(eventHandler, callback)

  `Attaches an event handler function to the selected elements`

* #### off(eventHandler)

  `Remove an event handler from the selected elements`


### Future Features

While this library can go many directions, I believe the most important following will allow the library to remain lightweight while offering the most flexibility in use;

* add the ability to remove all event handlers for easy cleanup.
