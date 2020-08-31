In this article, we’ll look at how to make a rotating knob input with HTML, CSS, and just a smidge of Javascript.

> *Stairway to Heaven* (composed by Jimmy Page and performed by Led Zeppelin) is known by guitarists as the 'forbidden riff.'

Most audio and electronic equipment relies heavily on knobs and dials. On the web however, it’s pretty rare to see these kind of inputs, when sliders are quick and easy and work out of the box.

Let's imagine we're coding an audio application that needs some knobs to simulate the analog experience. The most semantic way I’ve found to accomplish this is to use the HTML `range` input and a little bit of CSS trickery.

```html
<div class="adjustment">
    <input type="range">
    <div class="knob"></div>
</div>
```

The basic idea is to give the `range` input an opacity of 0 and position it on top of an empty element. We can also add a width and height of 100% to make sure the input will intercept a click anywhere on the element.

```css
input[type="range"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
```

Now, let's make our knob rotate as we drag up and down.

```html
<div class="adjustment">
    <input type="range" oninput="this.parentElement.style.setProperty('--knobPosition', this.value)">
    <div class="knob"></div>
</div>
```

Using the `range` input this way works as expected for desktop devices. However, touch devices (especially iOS) don't play well with range inputs. To support these users, we’ll add a `touchstart` and `touchmove` event listeners to the knob. This way, we can update our custom `--knobPosition` property on the parent element using `setProperty()`. I'm also throttling the `touchmove` event with `requestAnimationFrame` for better performance.

```javascript
let adjustmentWrapper = document.querySelector('.adjustment');

// Establish an object to store touch values
let touch = {
  start: 0,
  current: 0,
  diff: 0
}

// Set initial touch values on the touchstart event
adjustmentWrapper.addEventListener('touchstart', event =>
  touch.start = event.changedTouches[0].screenY;
)

adjustmentWrapper.addEventListener('touchmove', event =>
  requestAnimationFrame(() => {

    // Update touch values
    touch.current = event.changedTouches[0].screenY;
    touch.diff = (touch.current - touch.start) * -1;

    function clamp(n, min, max) {
      if (n < min) return min;
      if (n > max) return max;
      return n;
    }

    // Update the knob position
    adjustmentWrapper.style.setProperty(
        '--knobPosition', 
        clamp(touch.diff, 0, 100)
    )
  })
)
```

The only thing left is to set up the CSS that will rotate the knob accordingly.  First, we should divide the knob value by 100, since the HTML `range` input defaults to `min="0"` and `max="100"`. Next, let's set a range of motion for the knob so works like we would expect from the real thing. To do that, we can do a little more `calc()` math that limits the rotation to a specified range.

```css
.adjustment {
    --knobPosition: 100;
    --knobRange: 280deg;
}

.knob {
    /* Get the knob position as a percentage of the range */
    --knob-rotation: calc(var(--knobPosition) / 100 * var(--knobRange));
    /* Center the knob range */
    transform: rotate(calc(var(--knob-rotation) - (var(--knobRange) / 2)));
}
```

If you're feeling especially adventurous, you can add a [CSS counter](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters) to display the numeric value of the knob using a CSS variable hack by [Cassie Evans](https://twitter.com/cassiecodes). Here's the demo where I've pieced it all together.

<p class="codepen" data-slug-hash="qBWxKro"></p>