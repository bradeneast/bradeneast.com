# Populating HTML Templates with JSON using Object.keys()
## 2019/12/17
### javascript, html, blog

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

#### Level 1

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

We'll make a deep copy of the HTML template, looping over each key/value pair in the post, and wrapping the value inside its corresponding element.  We do this for each post, and viola!

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

<p class="codepen" data-slug-hash="GRgNqPJ"></p>


#### Level 2

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

<p class="codepen" data-slug-hash="KKwNYWQ"></p>


#### Level 3

```javascript
const blogPosts = [
	{
		title: "Who needs buttons?",
		meta: {
			date: "Sat, 04 Apr 2021 12:00:00 GMT",
			tags: ["ui", "design", "semantics"],
			link: "/blog/who-needs-buttons"
		},
		image: "https://picsum.photos/id/119/600/400",
		content: {
			excerpt:
				"..."
		}
	},
	{
		title: "Making the Chili's website responsive for mobile",
		meta: {
			date: "Wed, 19 Dec 2020 18:00:00 GMT",
			tags: ["css", "responsive design", "ux"],
			link: "/blog/making-the-Chili's-website-responsive-for-mobile"
		},
		image: "https://picsum.photos/id/157/600/400",
		content: {
			excerpt:
				"..."
		}
	},
	{
		title: "Inverted reverse hex multi-grid masonry flex layout",
		meta: {
			date: "Mon, 04 Feb 2019 03:00:00 GMT",
			tags: ["ridiculous", "stahp pls", "what happened"],
			link: "inverted-reverse-hex-multi-grid-masonry-flex-layout"
		},
		image: "https://picsum.photos/id/1048/600/400",
		content: {
			excerpt:
				"..."
		}
	}
];
```

Let's break this down by what we need.

- We need a way to loop down through nested objects and arrays
- We need a way to check if a string value is a date
- We need a way to convert the UTC date into a `Date` object we can manipulate

First, let's abstract our process into a function we can call for each layer of JSON objects.

```javascript
const main = document.querySelector("main");
const postTemplate = main.querySelector("template");

function populateTemplate(data, fragment) {

	Object.keys(data).forEach(key => {

		let value = data[key];

		if (Array.isArray(value)) value = value.join(", ");
		
		if (typeof value == "object") populateTemplate(value, fragment);
		
		if (typeof value == "string") // Populate stuff
	})
}
```

If the value is an object, the function recurses and loops of the next set of key/value pairs.  We're also turning arrays into comma-separated strings for simplicity.

Next, let's write a helper function to check if our string is a date or not.

```javascript
const isDate = (string) => String(new Date(string)) !== "Invalid Date";
```

Anything passed into the Javascript `Date()` constructor will return either a `Date` object or "Invalid Date", which we can use to return a boolean.  With ES6 implicit returns, this whole function fits onto one line! :)

Finally, we'll call the function for each of the posts and let it do its thing!

```javascript
blogPosts.forEach(post => {

    const fragment = document.importNode(postTemplate.content, true);
    
	populateTemplate(post, fragment);
    main.appendChild(fragment);
    
})
```

<p class="codepen" data-slug-hash="eYmvzVB"></p>