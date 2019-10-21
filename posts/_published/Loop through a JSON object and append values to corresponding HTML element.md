# Object.keys()
## 2019/08/04
### javascript, html

Ever needed a quick way to convert data from JSON to HTML, with as few lines of code as possible? I find myself need a way to do this all the time, whether I'm wanting to display fetched API data, a list of posts, or something else.  Since the most common API response format is JSON data, I often unpack them using the Javascript object method, `Object.keys()`.

![a rubiks cube being solved](/_images/blog/rubiks-cube.jpg)

In a nutshell, we want to look for class names on DOM elements that match keys in a given JSON object.  Then, we want to get the value for that key and stick it into the matching element.  We also want it to be dynamic and customizable, so we can use it on multiple kinds of objects and elements.

Let's start with some barebones HTML to reference in the javascript.

```html

<main id="postWrapper">
    <template>
        <div class="post">
            <h1 class="title"></h1>
            <h2 class="date"></h2>
            <p class="body"></p>
        </div>
    </template>
</main>

```

Next, we'll need some data to work with. The goal is for it to end up wrapped inside the proper tags in our HTML.

Because JSON is based on Javascript (Javascript Object Notation), there are plenty of Javascript-native methods that will work out of the box. We'll use those in the example.

```javascript

const blogPosts = [
    {
        "title": "Post 1",
        "date": "1997/03/22",
        "body": "Today I was born."
    },
    {
        "title": "Post 2",
        "date": "2019/08/05",
        "body": "Today I'm writing a post about javascript."
    }
];

```

Here's where the magic happens.

In short, we're copying everything inside our template, looping over each key in the post object, and appending the element with a class name matching that key.  We do this for each post, and viola!

```javascript

const postWrapper = document.getElementById('postWrapper');
const template = postWrapper.querySelector('template');

blogPosts.forEach(post => {
    // this gives us a copy of the template ('true' is for a deep copy, which includes all descendants of the parent)
    let postFragment = document.importNode(template.content, true);
    
    // Object.keys() returns ['title', 'date', 'body'] because that's what we've named the key/value pairs for each post in our JSON
    Object.keys(post).forEach(key => {

        // looks for elements with a class name matching the key
        const correspondingElements = postFragment.querySelectorAll(`.${key}`);

        // if corresponding elements are found
        correspondingElements.forEach(e => e.innerHTML = post[key]);

    });

    // sticks our modified version of the template back in the DOM, at the end of our wrapper
    postWrapper.appendChild(postFragment);
})

```

There is so much you can do with the `Object.keys()` method. It's what makes this approach flexible and dynamic, because you only have to pay attention to naming in your original HTML template.

Try it out [on CodePen](https://codepen.io/bradeneast/pen/YmEBGY) and let me know what you use the `Object.keys()` method for, or if there's a better way to accomplish the same thing.

Just need the Javascript?  Here's a couple functions that will do what we laid out above.

```javascript
// loops over an array of JSON objects and appends a new copy of 
function jsonToHTML(JSONArray, parentElement) {

    JSONArray.forEach(item => {

        const template = parentElement.querySelector('template');
        const populatedFragment = populateTemplateWithJson(item, template);

        parentElement.append(populatedFragment);
    })
}

// Takes an HTML Template element and returns a document fragment populated with the object's content
function populateTemplateWithJson(JSONObject, template) {

    const frag = document.importNode(template.content, true);

    Object.keys(JSONObject).forEach(key => {
        const matchingElems = frag.querySelectorAll(`.${key}`);
        matchingElems.forEach(elem => elem.innerHTML = JSONObject[key]);
    })

    return frag;
}
```