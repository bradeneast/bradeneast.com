# JSON to HTML - A more complex example
## 2019/08/07
### web development, javascript, html

Recently, I wrote about how to easily get values from a JSON object and place them inside elements with a matching classname in your HTML.

[Read it here,](/blog/append-json-values-to-matching-html-elements-with-object.keys) or just see the original method below.

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

This is great and all, but what if we want to do something a little more complex, like handle urls, arrays, or nested objects?  Let's face it - API data is rarely in the exact format we'd like for our specific application.

For example, how would you generate a grid layout of movies with self-links and thumbnails from the JSON below?

#### Handling urls
Let's add an `if` statement to our original code that will check if the value we're working with is a link.

```javascript
// Array of movie titles
[
    {
        "title": "Star Wars Episode I",
        "subtitle": "The Phantom Menace",
        "link": "/images/movies/starwars/phantom-menace/",
        "tags": ["tatooine", "podracing", "gungans", "naboo"],
        "thumbnails": {
            "large": "/images/movies/starwars/phantom-menace/thumb-large.jpg",
            "medium": "/images/movies/starwars/phantom-menace/thumb-medium.jpg",
            "small": "/images/movies/starwars/phantom-menace/thumb-small.jpg"
        }
    },
    {
        "title": "Star Wars Episode II"...
    }
]
// And so on
```

You could define a variable for 