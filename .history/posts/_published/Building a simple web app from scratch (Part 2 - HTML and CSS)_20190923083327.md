# Building a simple web app from scratch (Part 2 - HTML and CSS)
## 2019/08/30
### design, html, css

This is part two of me building a simple web app from scratch, to show that building cool tools on the web doesn't have to be hard or complex! You can read part one [here](/blog/building-a-simple-web-app-from-scratch-part-1--wireframe-and-protoype).

In this article, we'll write basic markup and CSS as handles for our Javascript to grab ahold of later. If you're not a developer, this might offer some insight into the development process and how to give your dev friends everything they need to execute your vision.

![coding](/_images/blog/coding.gif)

To start off, our HTML header is going to be pretty simple - we won't worry about the SEO stuff right now. I also don't want to over-complicate the code because this is a small project - 

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

Next, we'll write the basic markup.

```html
<main>
    <section class="wrapper" id="wrapper>
        <div class="aside">
            <!-- UI settings and stuff -->
            <div class="button" role="button" aria-label="Update icon selection based on your copy" onclick="updateIcons()">
                Update Icons
            </div>
        </div>

        <div class="layout" id="layout">

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
                <p class="text" id="text" contenteditable="true">
                    <!-- users will type their copy here -->
                </p>
            </div>

        </div>
    </section>
</main>
```

We're using `tabindex` to make our next and previous buttons accessible for keyboard users. When we add the slider functionality, we'll also write a functions called `goToNext()` and `goToPrevious()` for the `onkeypress` and `onclick` events.

You might also have noticed that we're the same class and ID on several elements. Selecting by class is usually better in CSS for specificity reasons, while selecting by ID is faster in Javascript.

I won't bore you with all my CSS explorations, but here are the classes will be important later in our Javascript.

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
1. We'll use some Javascript to add the `active` class to the selected icon, in which case we'll scale it up and transition the `opacity` from 0 to 1. That will also come in handy when we need to share the composition with a permanent URL. We've also added `pointer-events: none` so the hidden icons don't obscure other parts of the UI.

2. The icons will be inside a `div` that we'll transform along the Y-axis as we flip through the icon selection.

#### Wrapping up
We covered using `preload` to give users a faster experience, selecting by class in CSS vs ID in Javascript, and using an `active` class to set styles on our selected icon.

Next time, we'll write the simple Javascript that will make this little web app work like magic!