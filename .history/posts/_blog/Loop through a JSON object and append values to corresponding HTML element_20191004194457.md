# Append JSON values to matching HTML elements with Object.keys()
## 2019/08/04
### javascript, html

Ever needed a quick way to convert data from JSON to HTML, with as few lines of code as possible? I find myself need a way to do this all the time, whether I'm wanting to display fetched API data, a list of posts, or something else.  Since the most common API response format is JSON data, I often unpack them using the javascript `Object.keys()` method.

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

Next, you'll need some data to work with. The goal is for it to end up wrapped cozily inside the proper tags in our HTML.

I'm an advocate of JSON format for anyone doing their own content management, but any format that's easily converted to JSON will work. Because it's based on Javascript, there are plenty of native methods that work on JSON data out of the box. We'll make use of those in the example.

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
        const correspondingElement = postFragment.querySelector(`.${key}`);

        // if a corresponding element is found
        if (correspondingElement) {
            correspondingElement.insertAdjacentHTML('beforeend', post[key]);
        }
    });

    // sticks our modified version of the template back in the DOM, at the end of our wrapper
    postWrapper.appendChild(postFragment);
})

```

There is so much you can do with the `Object.keys()` method. It's what makes this approach flexible and dynamic, because you only have to pay attention to naming in your original HTML template.

Try it out [on CodePen](https://codepen.io/bradeneast/pen/YmEBGY) and let me know what you use the `Object.keys()` method for, or if there's a better way to accomplish the same thing.

Just need the JS snippet? Here it is without all the comments:

```javascript

const postWrapper = document.getElementById('postWrapper');
const template = postWrapper.querySelector('template');

blogPosts.forEach(post => {
    let postFragment = document.importNode(template.content, true);

    Object.keys(post).forEach(key => {
        const correspondingElement = postFragment.querySelector(`.${key}`);

        if (correspondingElement) {
            correspondingElement.insertAdjacentHTML('beforeend', post[key]);
        }
    });

    postWrapper.appendChild(postFragment);
})

```