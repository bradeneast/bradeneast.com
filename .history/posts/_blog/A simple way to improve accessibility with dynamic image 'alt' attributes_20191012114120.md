# Get img alt attribute automatically from src with javascript
## 2019/08/19
### javascript, html

I'm sometimes lazy when it comes to accessibility on web projects. No matter how hard I try, I'm usually adding `aria-label` and `tabindex` and `role` attributes later than I'd like.

The repetition is also frustrating. If you're anything like me, you enjoy writing code because it helps you avoid repeating the same tasks over and over.

![polaroid photos - the original accessible image](/_images/blog/polaroids.jpg)

That said, some things are just too important to skip, namely image `alt` attributes. When I discovered [why alt is so important](https://moz.com/learn/seo/alt-text), I realized I had yet another detail to manage for better SEO and accessibility on my web projects.

Today, let's look at how to solve that problem by adding accessible `alt` attribute values to our `img` elements with vanilla javascript.

Check out the example HTML below.

```html
<div class="gallery">

    <div class="gallery__item">
        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/_images/wboc-2-media-approved-preview-1521054875.jpeg?crop=1.00xw:0.870xh;0,0.130xh&resize=1080:*">
    </div>

    <div class="gallery__item">
        <img src="https://media-cdn.tripadvisor.com/media/photo-s/09/3a/1b/8a/sesame-chicken-yum.jpg">
    </div>

    <div class="gallery__item">
        <img src="https://4.bp.blogspot.com/-ehuFRO8kWgM/V3yvBqhyLvI/AAAAAAAAwQY/-eaVSQkLFs8ioHS53M_Hjxj7DJuj-pWFQCLcB/w1200-h630-p-k-no-nu/pei-wei-summer-salads.jpg">
    </div>

</div>
```

We have a delicious-looking gallery of asian-american food here. You probably had some difficulty figuring that out though, because the actual image titles come after a long, nonsensical string of characters that cdn's can read, but we can't.

We want to isolate just the image titles. To help us do that, we'll use some fun native javascript methods that honestly sound like dance moves: `split()`, `shift()`, and `pop()`.

First, let's grab the `img` elements with a `querySelectorAll()`.

```javascript
const images = document.querySelectorAll('img');

images.forEach(image => {
    // do stuff
})
```

Since `querySelectorAll()` returns a node list and not an array, we should use `forEach()` to loop over it.

Next, let's make sure the image doesn't already have an `alt` value already set.

```javascript
images.forEach(image => {
    if (!image.getAttribute('alt')) {
        // do stuff
    }
})
```

After that, we can get the `src` value, and convert URL-formatted characters with `decodeURIComponent()`. This will replace an encoded character like `%20` with a standard space.

```javascript
images.forEach(image => {
    if (!image.getAttribute('alt')) {
        const imageSource = decodeURIComponent(image.getAttribute('src'));
    }
})
```

From here, we can isolate the title by splitting the URL into chunks between forward slashes and returning the last one of those chunks.

```javascript
images.forEach(image => {
    if (!image.getAttribute('alt')) {
        const imageSource = decodeURIComponent(image.getAttribute('src'));
        const imageName = imageSource.split('/').pop();
    }
})
```

Finally, we'll remove the file extension (.jpg, .png, etc.) and everything after it. Then we'll just replace dashes with spaces, and we're done!

```javascript
const images = document.querySelectorAll('img');

images.forEach(image => {
    // will ignore images with alt already set
    if (!image.getAttribute('alt')) {

        const imageSource = decodeURIComponent(image.getAttribute('src'));
        const imageName = imageSource.split('/').pop(); // 'my-beautiful-image.jpg?format=small'
        const imageTitle = imageName.split('.').shift().replace(/-/g, ' '); // 'my beautiful image'

        image.setAttribute('alt', imageTitle);
    }
})
```

I hope this little snippet of vanilla javascript takes a little bit of the headache out of improving SEO and accessibility on your web projects.

As always, you can check out the [demo on CodePen](https://codepen.io/bradeneast/pen/ZEzpLNg), or copy the condensed version without comments below:

```javascript
document.querySelectorAll('img').forEach(e => {
    if (!e.getAttribute('alt')) {
        const source = decodeURIComponent(e.getAttribute('src'));
        const title = (source.split('/').pop()).split('.').shift().replace(/-/g, ' ');
        e.setAttribute('alt', title);
    }
})
```