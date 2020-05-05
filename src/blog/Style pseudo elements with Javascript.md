<meta name="categories" content="html, css, javascript">
<meta name="media" content="/_assets/media/wave.jpg">
<meta name="created" content="December 8 2019">

I'm a proponent of styles in CSS over styles in Javascript where at all possible. That said, sometimes we want to add a little bit of extra zest that requires JS. Today, we're taking a look at styling pseudo elements with Javascript for that little extra sparkle.

I'm discovering more uses every day for `::before` and `::after`, letting me write cleaner, dryer code.  The problem is, pseudo elements haven't been the easiest to manipulate with Javascript in the past! There are lots of really complex solutions out there, but let's look at a simple example of how we can animate and style pseudo elements with vanilla Javascript.

Let's say we want to animate a pseudo element as the user scrolls down our page.  Or, what if we are using pseudo elements for tooltips, shown on the `onclick` event. Take this wavy background element for example:

```css
.wavy-background {
    position: relative;
    background-image: linear-gradient(to right, dodgerblue, royalblue);
}

.wavy-background::after {
    position: absolute;
    display: block;
    content: '';
    height: 100%;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: url(/_images/svg/wave.svg);
    background-size: contain;
    
    background-position: bottom center; /* Here's what we want to animate */
}
```

Everything is looking great, until we decide we want to animate the background as the user scrolls.

To do that, we have to introduce a little Javascript, which doesn't have a way to select pseudo elements. We could make it an ordinary element, but that would mean extra markup and more copying and pasting.

Instead, let's add a custom property (CSS variable) to the parent element, and let the pseudo element inherit the property we want to animate.

```css
.wavy-background {
    --bg-position: 50%; /* we'll set 50% to be the default value until it's changed */
    position: relative;
    background-image: linear-gradient(to right, dodgerblue, royalblue);
}

.wavy-background::after {
    position: absolute;
    display: block;
    content: '';
    height: 100%;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: url(/_images/svg/wave.svg);
    background-position-y: bottom;
    background-size: contain;
    background-repeat: repeat-x;

    background-position-x: var(--bg-position); /* this will take the value of the custom property we added on the parent class */

    /* these properties added for smoother motion and better performance */
    backface-visibility: hidden;
    will-change: transform;
    transition: background-position-x .5s ease;
}
```

That's it for the CSS.  We specified that we only want our background to repeat horizontally, and also split `background-position` into X and Y for readability.

For the Javascript, we'll just add a scroll event listener, and set the custom property on the parent element.

```javascript
const wavySections = document.querySelectorAll('.wavy-background');

window.addEventListener('scroll', () => {
    wavySections.forEach(element => {
        element.style.setProperty('--bg-position', window.scrollY + 'px');
    })
})
```

And that's how I style pseudo elements vanilla Javascript! Keep in mind that this method should be limited to progressive enhancements because it requires [CSS variable support](https://caniuse.com/#feat=css-variables).