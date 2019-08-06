# JSON to HTML - A more complex example
## 2019/08/07
### web development, javascript, html

Recently I wrote about how to easily get values from a JSON object and place them inside elements with a matching classname in your HTML.

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

Just one layer of `Object.keys()` data is great and all, but what if we want to do something a little more complex, like handle urls, or arrays?  Let's set up a variation of the original.quick and easy transfer of that data into our HTML.

For example, how would you generate a grid layout of movies with self-links and thumbnails from the JSON below?

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