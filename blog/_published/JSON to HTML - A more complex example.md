# JSON to HTML - A more complex example
## 2019/08/07
### web development, javascript, html

With this function, you'll be able to insert any JSON into an HTML template in a way that's quick and performant.

Recently, I wrote about how to easily get values from a JSON object and place them inside elements with a matching classname in your HTML.

[You can read it here.](/blog/append-json-values-to-matching-html-elements-with-object.keys)

That approach is great and all, but API's will never respond with exactly what we need in the format we need. What if we want our HTML template to populate with data that's a little more complex, like urls, arrays, and nested objects?

For example, how would you generate a collection of movies with self-links and thumbnails from the JSON below?

```javascript
// Array of movies
[{
        "title": "Star Wars Episode I",
        "subtitle": "The Phantom Menace",
        "meta": {
            "link": "https://www.imdb.com/title/tt0120915/",
            "tags": [
                "tatooine",
                "podracing",
                "gungans",
                "naboo"
            ],
            "thumbnail": "https://m.media-amazon.com/images/M/MV5BMTM1NTQzNDU3OV5BMl5BanBnXkFtZTcwODcyMzA4NA@@._V1_SY1000_CR0,0,1513,1000_AL_.jpg"
        }
    }
    ///...more movies
]
```

Our first option doesn't account for two things that are pretty common in JSON:
1. Nested objects
2. URLs (for images or links) that need to be added to an attribute, not inserted as text

Obviously we want this function to work on as many structures as possible, so it won't break if there's a change in our JSON.

#### Handling urls
We know that a URL has to be a string, so let's start with an `if` statement that will check if the value is a string.  Then, we'll check if the string begins with 'http', or if the object key is called 'link'. If so, we'll make sure it's not an image, then add set the `href` value on the matching HTML element.

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

Try out the demo on CodePen below!

<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="bradeneast" data-slug-hash="KOQMBN" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="More JSON to HTML with Object.keys()">
  <span>See the Pen <a href="https://codepen.io/bradeneast/pen/KOQMBN/">
  More JSON to HTML with Object.keys()</a> by Braden (<a href="https://codepen.io/bradeneast">@bradeneast</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

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