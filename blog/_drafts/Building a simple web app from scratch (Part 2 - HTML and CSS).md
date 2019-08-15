# Building a simple web app from scratch (Part 2 - HTML and CSS)
## 2019/08/18
### design, html, css

If you're not a developer, this article might offer some insight into the development process and how to give your dev friends everything they need to execute your vision.

![coding](/images/blog/coding.gif)

To start off, our HTML header is going to be pretty simple - we won't worry about the SEO stuff right now. Everything is in the root because this is a small project for fun - no judgment here.

```html
<head>
    <title>Pair Icons | A tool for people who write better with a visual aid.</title>

    <link rel="preload" href="/style.css" as="style">
    <link rel="preload" href="/script.js" as="script">
    <link rel="preload" href="/icons.json" as="fetch">
    <link rel="stylesheet" href="/style.css">

    <noscript>
        This app requires some super lightweight javascript to run!
    </noscript>
</head>
```
We're using `preload` to make sure our CSS and Javascript files are ready as soon as they're requested to render the page.  We also know that we'll eventually need our directory of Fontawesome icons, which is available from the Fontawesome GitHub repository [as a JSON file](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json). It's a 3Mb file, so we definitely want to preload that as well.

As a nice performance bonus: Preloading a file (usually) tells the browser to cache it for future requests.

Next, we'll write the basic markup (inside our `<body>` tags of course).

```html
<main>
    <section class="wrapper">
        <div class="aside">
            <!-- UI settings and stuff -->
            <div class="button" role="button" aria-label="Update icon selection based on your copy" onclick="updateIcons()">
                Update Icons
            </div>
        </div>

        <div class="layout">

            <div class="icon-container">
                <div class="switch-up" tabindex="0"></div>

                <div class="icon-slider">
                    <div class="icon">
                        <!-- svg will be populated here -->
                    </div>
                </div>

                <div class="switch-down" tabindex="0"></div>
            </div>

            <div class="text-container">
                <p class="text" contenteditable="true">
                    <!-- users will type their copy here -->
                    If you're like me, sometimes you need a visual aid to write persuasive copy.
                </p>
            </div>

        </div>
    </section>
</main>
```

We're using `tabindex` to make our next and previous buttons accessible for keyboard users. When we add the slider functionality, we'll also write a functions called `goToNext()` and `goToPrevious()` for the `onkeypress` and `onclick` events.

I won't bore you with all my personal preference CSS, but here are the classes we'll be using later with our Javascript.

```css
.icon-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    font-size: 14rem;
}

.icon-slider {
    position: absolute;
    transition: .3s cubic-bezier(.2, 0, .4, 1.2);
}

.icon {
    height: 1em;
    transition: .3s cubic-bezier(.2, 0, .4, 1.2);
}

.icon:not(.active) {
    opacity: 0;
    transform: scale(.6);
    pointer-events: none;
}

.icon.active {
    pointer-events: all;
}
```
A couple notes here:
1. We'll use some Javascript to add the `active` class to the selected element. That will also come in handy when we need to share the composition with a permanent URL.

2. The icons will be inside a `div` that we'll transform along the Y-axis as we flip through the icon selection.

#### Wrapping up

[Github repository here.](https://github.com/bradeneast/pairiconsapp)

Have a suggestion to improve this project? Want me to go deeper next time?  Let me know!

bradeneastdesign@gmail.com