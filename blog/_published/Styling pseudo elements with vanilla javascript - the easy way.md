# Styling pseudo elements with vanilla javascript - the easy way
## 2019/08/20
### html, css, javascript

Let's say we want to have a wavy background overlay on a section with another background image already. We could use multiple, comma-separated backgrounds, but only if we want to accept the same sizing and position for each background.

Let's say we needed more flexibility than that, and we're also using it in a lot of places.  In this case, it makes sense to add our wavy background overlay with a `::before` or `::after` psuedo element.

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
    background: url(/images/svg/wave.svg);
    background-size: contain;
    
    background-position: bottom center; /* Here's what we want to animate */
}
```

Everything is looking great, until we decide we want to animate the waves as the user scrolls.

![squidward dancing gif](/images/blog/squidward-dance.gif)

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
    background: url(/images/svg/wave.svg);
    background-position-y: bottom;
    background-size: contain;
    background-repeat: repeat-x;

    background-position-x: var(--bg-position); /* this will take the value of the custom property we added on the parent class */

    /* these properties added for smoother motion and better performance */
    backface-visibility: hidden;
    will-change: background-position-x;
    transition: background-position-x .5s ease;
}
```

That's it for the CSS.  We specified that we only want our background to repeat horizontally, and then added `will-change` for a faster framerate as the layer moves.  We also split `background-position` into X and Y for readability.

For the Javascript, we'll just add a scroll event listener, and set the custom property on the parent element.

```javascript
const wavySections = document.querySelectorAll('.wavy-background');

window.addEventListener('scroll', () => {
    wavySections.forEach(element => {
        element.style.setProperty('--bg-position', window.scrollY + 'px');
    })
})
```

In the DOM, it should look something like this.

![animating-background-position-of-a-pseudo-element](/images/blog/animating-background-position-of-a-pseudo-element.gif)


That's how to style pseudo elements vanilla Javascript. Keep in mind that this method is best for progressive enhancements because it requires [CSS variable support](https://caniuse.com/#feat=css-variables).

Here's the [demo on CodePen](https://codepen.io/bradeneast/pen/rNBWNBK).