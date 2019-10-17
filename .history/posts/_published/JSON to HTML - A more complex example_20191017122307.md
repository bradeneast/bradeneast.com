# Convert JSON to HTML - Nested objects and URLs
## 2019/08/07
### javascript, html

No developer wants to debug code written for a single use case. Sometimes you have to bite the bullet and write an ultra-specific function, but the goal is to be kind to your future developer self.  Code you can reuse is code you don't have to write (or rewrite).

Recently, I posted about how to easily get values from a JSON object and place them dynamically in your HTML using `Object.keys()`. Let's expand my first approach to handle more complex JSON, inclduing URLS and nested objects, because sometimes we have to get that one value nested inside 5 other objects.

Let's make the safe assumption that an API isn't give us a responses in the exact format we'd like. What if we want to populate an HTML template with data that contains urls, arrays, and nested objects?  Or, what if the API changes their response structure?

![A star wars stormtrooper lost in the desert](/_images/blog/star-wars.jpg)

You might as well burn everything to the ground and start over.  Fortunately, there's a way to loop through multiple layers of JSON without too much excess javascript. Take this example:

```javascript
// Array of movies
[{
        "title": "Star Wars Episode I",
        "subtitle": "The Phantom Menace",
        "meta": {
            "link": "https://www.imdb.com/title/tt0120915/",
            "thumbnail": "/episode-1-thumbnail.jpg",
            "tags": [
                "tatooine",
                "podracing",
                "gungans",
                "naboo"
            ]
        }
    }
    ///...more movies
]
```

The simple way I talked about before doesn't account for two things that are pretty common in JSON, shown above:
1. Nested objects
2. URLs (for images or links) that need to be added to an attribute of the matching element, not inserted as text

#### Handling urls
We know that a URL has to be a string, so let's start with an `if` statement that will check if the value is a string.  Then, we'll check if the string begins with 'http'. If so, we'll make sure it's not an image, then add set the `href` value on the matching HTML element.

If the URL does reference an image, we'll set it as the background on the matching element. Sometimes, you might want this to be the `src` value on an `img` tag, but the same principle applies.

```javascript
let element = container.querySelector(`.${key}`);

// check if value is a string
if (typeof object[key] == 'string' && element) {

    // check if string is a url
    if (object[key].substring(0, 4) == 'http' || key == 'link') {

        // check if url is an image with .match() and some basic regex
        if (object[key].match(/\.*(jpg|png|svg|gif|webp)/g) == null) {
            element.setAttribute('href', object[key]);
        } else {
            element.setAttribute('style', `background-image: url(${object[key]});`);
        }

        // if not a link, do the standard thing
    } else {
        element.insertAdjacentHTML('beforeend', object[key]);
    }
}
```

#### Handling nested objects & arrays
Now, let's deal with the problem of how to loop through X layers of nested JSON and append the appropriate values to our HTML.  It's easier than you might think.

We need to be able to check if the value is an array.  With an array of strings, we can just use `array.join()` to combine the array into a single string.  In other situations, we'd add a check to see if the array contained more objects to loop through. 

```javascript
// first, we'll make the whole thing a function
function loopThroughKeys(object, container) {

  Object.keys(object).forEach(key => {
    let element = container.querySelector(`.${key}`);

    // check if value is a string
    if (typeof object[key] == "string" && element) {
      // stuff happens...
    }
    
    else if (Array.isArray(object[key]) && element) {
      // if value is an array, join it with a comma and a space (objects nested inside arrays would be handled a little differently)
      object[key] = object[key].join(", ");
      element.insertAdjacentHTML("beforeend", object[key]);
    }
    
    else if (typeof object[key] == "object") {
      // if value is an object, perform this function again on that object
      loopThroughKeys(object[key], container);
    }
  });
}
```

So, we solved the URL problem with a couple of `if` statements, and then collected our code in a function that can be invoked as many times as there are layers of JSON data.

[Try out the demo on CodePen.](https://codepen.io/bradeneast/pen/KOQMBN/)

Just here for the snippet?  Here it is without all the comments.

```javascript
function loopThroughKeys(object, container) {
  Object.keys(object).forEach(key => {
    let element = container.querySelector(`.${key}`);
    if (typeof object[key] == "string" && element) {
      if (object[key].substring(0, 4) == "http" || key == "link") {
        if (object[key].match(/\.*(jpg|png|svg|gif|webp)/g) == null) {
          element.setAttribute("href", object[key]);
        } else {
          element.setAttribute("style", `background-image: url(${object[key]});`);
        }
      } else {
        element.insertAdjacentHTML("beforeend", object[key]);
      }
    } else if (Array.isArray(object[key]) && element) {
      object[key] = object[key].join(", ");
      element.insertAdjacentHTML("beforeend", object[key]);
    } else if (typeof object[key] == "object") {
      loopThroughKeys(object[key], container);
    }
  });
}
```