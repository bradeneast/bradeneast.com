# Designing, prototyping, and coding and simple web app from scratch
## 2019/08/11
### design, business

Have you ever needed to pair the right icons with your sales copy? It's the weekend, so I decided to build a companion to my first web app, the [Design Starter Toolkit](https://designstarterapp.netlify.com). I don't expect this second app to have quite as many moving parts, but I hope it can save time and headaches for my designer and developer friends.

#### Why does icon choice matter?

If you've worked on a project involving sales copy, you've probably faced the challenge of picking an icon that helps communicate your message visually. Your icon pairings can make the difference between a lost customer and a quality lead.

Picking icons that are too abstract will open your meaning up to interpretation, making readers work harder to understand your point and leaving room for confusion.

Picking icons that are too complex or illustrative will distract customers from the copy. This can break up the flow of the story you're telling with your sales page, and hurt conversion when potential customers reach your call to action.

Shopify has a [great article](https://www.shopify.com/partners/blog/how-to-use-icons-to-enhance-your-ecommerce-website) on how picking the right icons can enhance sales.

On top of that, if you're anything like me, it's easier to write when you have a visual aide. From sales pages to social media posts, I've found I write more compelling copy when I have a visual already in place. We want our icons to harmonize with the copy we've labored over, not hinder it.

There are several free, high quality icon libraries out there, so we should have all the resources we need.

That said, let's get into wireframing, prototyping, and coding this tool so we can use it to level up our projects!

#### Wireframing

There's not much wireframing involved in a single-page application. However, having an idea of layout and organization before we jump into prototyping will save us time when we open up Visual Studio and write the HTML, CSS, and Javascript.

My idea is to have a few different layout options that users can switch between using some kind of dropdown or radio buttons.

Side note: obviously, we'd expend more effort on a wireframe for a multi-page site.

![wireframe](/images/blog/pair-icons-wireframe.svg)

#### Prototyping

Next, let's use a screen design tool to prototype our user interactions. (I've recently started using [InVision Studio](https://www.invisionapp.com/studio) and I love it).  I really enjoy this part of the app design process, because I can very quickly get a taste of the overall feel and user experience of the app.

A few features I added during this step:
 - Words that match an icon in the library are highlighted to clarify why you're getting a particular set of results
 - Users can switch between icon results in real time (this might be tricky to implement - whoops)

If there's a massive oversight, it's much easier to catch it and pivot at this stage than after the code is written.

![prototype](/images/blog/icon-app-interaction.gif)

#### Writing the code

If you're not a developer, this section might offer some insight into the development process and how to give your dev friends everything they need to execute your vision.

To start off, our HTML header is going to be pretty simple - we won't worry about the SEO stuff right now.

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

As a nice performance bonus: Preloading a file also means the browser will cache it for future requests.

Next, we'll write the basic markup.

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
                        <!-- icon svg will be populated here -->
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

We're using `tabindex` to make our next and previous buttons accessible for keyboard users. When we add the slider functionality, we'll also write a functions called `goToNext()` and `goToPrevious()` for the `onkeypress` and `onclick` attributes of these buttons.

I won't bore you with all my personal preference CSS, but here are the basic styles I used to get a look similar to our prototype.

```css
:root {
    --PAD-S: 2rem;
    --PAD-M: 4rem;
    --PAD-L: 6rem;
}

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrapper {
    display: grid;
    grid-template-columns: minmax(20rem, 20vw) minmax(40rem, 1fr);
}

.layout {
    display: grid;
    grid-template-columns: 18rem 1fr 18rem;
}

.icon-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    font-size: 14rem;
}

.icon-slider {
    position: absolute;
}

.icon {
    height: 1em;
}

.icon:not(.active) {
    opacity: 0;
    transform: scale(.6);
    pointer-events: none;
}

.icon.active {
    pointer-events: all;
}

.text-container {
    grid-column-end: span 2;
    padding: var(--PAD-M);
    font-size: 1.4rem;
}
```
The main note here is that the selected icon will have the `active` class added to it by our Javascript.  That will also come in handy when we need to share the composition with a permanent URL.

Now for the Javascript to make this thing actually work.

```javascript
```

#### Wrapping up

[Github repository here.](https://github.com/bradeneast/pairiconsapp)

Have a suggestion to improve this project? Want me to go deeper next time?  Let me know!

bradeneastdesign@gmail.com