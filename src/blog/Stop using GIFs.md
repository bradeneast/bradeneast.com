<meta name="categories" content="media, html, performance, accessibility">
<meta name="media" content="/_assets/media/smart-thinking.jpg">

If you care about web performance, please stop using gifs for animations on your website. Heck, even [Giphy](https://giphy.com/), the largest gif library in the world, serves gifs as MP4 files. Actual GIF format is their ***last possible fallback***.

MP4, WebM, and WebP will almost always be 1/5 to 1/2 the file size of GIF, so there's an immediate benefit of faster page loads and better performance. Not only that, but HTML `video` elements have the benefit of fallbacks using `source` . If you've not used them before, here's a quick example of how to make a `video` element behave like a gif.

```html
<!-- The easy way -->
<video src="animation.mp4" autoplay muted loop playsinline></video>
```

```html
<!-- The easy way, but with fallbacks -->
<video autoplay muted loop playsinline>
    <source src="animation.webm" type="video/webm">
    <source src="animation.mp4" type="video/mp4">
    Your browser doesn't support embedded videos.
</video>
```

Pretty easy right?  One quick note: When possible, always use the `muted` and `autoplay` attributes together. The reason for this is that most mobile browsers will ignore `autoplay` if `muted` is not also present.

Already use gifs in production on your site? Use a service like [Ezgif.com](https://ezgif.com/) to convert them to MP4 and optimize them for the smallest possible file size. You'll be amazed at the results.
