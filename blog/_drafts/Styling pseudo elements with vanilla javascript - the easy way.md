# Styling pseudo elements with vanilla javascript - the easy way
## 2019/09/20
### html, css, javascript

To style a pseudo element with javascript, just use CSS custom properties (aka: CSS variables).  It's that simple!

#### Example

Let's say we want to have a wavy background on a fullwidth section. We're using it in a lot of places, and always with the same element, so it makes sense to add it as a `::before` or `::after` psuedo element.

```css
.fullwidth-section {
    position: relative;
    width: 100%;
    height: 75vh;
    background-color: chocolate;
}

.fullwidth-section::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background: url(/images/overlay.svg);
    background-size: contain;
    background-position: center bottom;
}
```

What happens when we want to animate it as the user scrolls?  We could make it a real DOM element, but that would mean extra markup and more copying/pasting of elements.

Instead we can add a custom property to the parent element, `.fullwidth-section`, and let the pseudo element inherit that value for the property we want to animate.

```css
.fullwidth-section {
    --bg-position-x: 50%;
    position: relative;
    width: 100%;
    height: 75vh;
    background-color: chocolate;
}

.fullwidth-section::after {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    left: 0;
    z-index: 0;
    background: url(/images/overlay.svg);
    background-size: contain;
    background-position-y: bottom;
    background-position-x: var(--bg-position-x);
}
```

Then, we'll just add a scroll event listener, and set the custom property on the parent element.

```javascript
const section = document.querySelector('.fullwidth-section');
window.addEventListener('scroll', () => {
    section.style.setProperty('--bg-x', window.scrollY + 'px');
})
```

That's the basics!  Let's look at one more example.