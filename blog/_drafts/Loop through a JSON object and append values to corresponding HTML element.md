# Loop through a JSON object and append values to corresponding HTML elements
## 2019/08/04
### web, javascript, html

This kind of thing is great for when you need to display a list of posts or projects.  It uses the ```Object.keys()``` method to figure out what elements to look for, so it won't break if you use it for multiple kinds of objects and elements with varying names.

I'm an advocate that if you're doing your own content management, you probably want to keep your data in JSON format, or a format that's easily converted to JSON. Because it's based on Javascript, there are loads of native methods that work on JSON data out (sorting, looping through arrays, etc). Not to mention Javascript comes with a built-in JSON parser.

To start, you'll need a little html to grab them with your javascript. I like to name mine as clearly and self-explanatorily as possible. It saves me time explaining to my future self what's going on, without having to write as many comments.

```html

<main id="postWrapper">
    <template id="template">
        <div class="post">
            <h1 class="title"></h1>
            <h2 class="date"></h2>
            <p class="body"></p>
        </div>
    </template>
<main>

```

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

const postWrapper = document.getElementById('postWrapper');
const template = postWrapper.getElementById('template');

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

That's pretty much it! Because this approach is so flexible, you can use it for almost any kind of JSON data. The only place you have to match key names is in your HTML markup.

Here it is without all my ugly comments:

```javascript

const postWrapper = document.getElementById('postWrapper');
const template = postWrapper.getElementById('template');

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