# Populating HTML Templates with JSON using Object.keys()
## 2019/12/17
### javascript, html

Ever needed a quick way to convert data from JSON to HTML, with as few lines of code as possible? I find myself need a way to do this all the time, whether I'm wanting to display fetched API data, a list of posts, or something else.  Since the most common API response format is JSON data, I often unpack them using the Javascript object method, `Object.keys()`.

![a rubiks cube being solved](/_images/blog/rubiks-cube.jpg)

In a nutshell, we want to look for class names on DOM elements that match keys in a given JSON object.  Then, we want to get the value for that key and stick it into the matching element.  We also want it to be dynamic and customizable, so we can use it on multiple kinds of objects and elements.

Let's start with some barebones HTML.

```html

<main>
    <template>
        <article>
            <h2 data-content="title"></h2>
            <h3 data-content="date"></h3>
            <p data-content="body"></p>
        </article>
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
        "body": "Post 1 content goes here."
    },
    {
        "title": "Post 2",
        "date": "2019/08/05",
        "body": "Post 2 content goes here."
    },
    {
        "title": "Post 3",
        "date": "2020/01/01",
        "body": "Post 3 content goes here."
    }
];
```

Here's where the magic happens.

In short, we're making a deep copy of the HTML template, looping over each key/value pair in the post, and wrapping the value inside its corresponding element.  We do this for each post, and viola!

```javascript
const main = document.querySelector('main');
const template = main.querySelector('template');

blogPosts.forEach(post => {

    const fragment = document.importNode(template.content, true);
    
    // Object.keys() returns ['title', 'date', 'body'] because that's what we've named the key/value pairs for each post in our JSON
    Object.keys(post).forEach(key => {

        // checks the fragment for corresponding elements
        const elems = fragment.querySelectorAll(`[data-content=${key}]`);
        elems.forEach(elem => elem.append(post[key]));

    });

    main.appendChild(fragment);
	
})
```

<p class="codepen" data-height="720" data-default-tab="html,result" data-user="bradeneast" data-slug-hash="GRgNqPJ"></p>


#### Making it more robust

"Wait!" you might say.  "This only works for text!"  What if I have links and images that also need to be dynamic?

I'm glad you asked. Let's add these elements to our template.

```html
<main>
    <template>
        <article>
            <img alt="" data-content="image">
            <h2 data-content="title">
                <a data-content="link"></a>
            </h2>
            <h3 data-content="date"></h3>
            <p data-content="body"></p>
            <a data-content="link">Read More &rarr;</a>
        </article>
    </template>
</main>
```

```javascript
const blogPosts = [
    {
        "title": "Post 1",
        "date": "1997/03/22",
		"link": "./post1",
		"image": "https://picsum.photos/600/400",
        "body": "Post 1 content goes here."
    },
    {
        "title": "Post 2",
        "date": "2019/08/05",
		"link": "./post2",
		"image": "https://picsum.photos/603/402",
        "body": "Post 2 content goes here."
    },
    {
        "title": "Post 3",
        "date": "2020/01/01",
		"link": "./post3",
		"image": "https://picsum.photos/606/404",
        "body": "Post 3 content goes here."
    }
];
```

The solution isn't as verbose as you might think.  All we need to do is check the tag name of each element before populating its contents or attribute values.  If it's an image, we'll populate the `src` attribute, while anchor tags will get the value in their `href` attribute.  Everything else gets the value appended as a string.

```javascript
blogPosts.forEach(post => {
	
    let fragment = document.importNode(template.content, true);
    
    Object.keys(post).forEach(key => {

        let elems = fragment.querySelectorAll(`[data-content=${key}]`);
		
		elems.forEach(elem => {
			
			if (elem.tagName == 'A') elem.href = post[key];
			else if (elem.tagName == 'IMG') elem.src = post[key];
			else (elem.firstElementChild || elem).append(post[key]);
			
		});

    });

    main.appendChild(fragment);
	
})
```

You might notice we're also checking for a `firstElementChild` on our general elements.  This is to handle cases where an `anchor` element is wrapped inside another element (like our `h2` in this example).  A more thorough check is probably warranted depending on your use of this method.

<p class="codepen" data-height="720" data-default-tab="html,result" data-user="bradeneast" data-slug-hash="KKwNYWQ"></p>