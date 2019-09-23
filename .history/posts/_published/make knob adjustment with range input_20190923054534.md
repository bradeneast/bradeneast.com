# Making UI knobs and dials with HTML and CSS
## 2019/09/09
### html, css, javascript, ui

Fun fact of the day: Stairway to Heaven (composed by Jimmy Page and performed by Led Zeppelin) is known by guitarists as the 'forbidden riff.' Today, we’ll look at how to make a rotating knob input with HTML, CSS, and just a smidge of Javascript.

When would we want to create a knob or dial adjustment?  Well, if you’re a talented Christmas goat, you might want to develop a web app with some digital effects for your seasonal guitar solos.

![goat playing electric guitar](/images/blog/goat-guitar.gif)

Most audio and electronic equipment relies heavily on knobs and dials. On the web however, it’s pretty rare to see these kind of inputs, when sliders are quick and easy and work out of the box.

Let's imagine we're coding an audio application that needs some knobs to simulate the analog experience. The most semantic way I’ve found to accomplish this is to use the HTML `range` input and a little bit of CSS trickery.

```html
<div class="adjustment">
    <div class="knob"></div>
    <input type="range" id="knob_1">
</div>
```

The basic idea is to give the range slider an opacity of `0` and position it on top of an empty element. We’ll apply a border radius of `50%` to make the knob round, then add a pseudo element to show where the knob is set.

We can also add a width of `100%` to make sure the slider will intercept a click anywhere on the knob element.

```css
.adjustment {
    --knob-position: 50;
    --knob-size: 4rem;
    position: relative;
    text-align: center;
    width: var(--knob-size);
    height: var(--knob-size);
}

.knob, input[type=range] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.knob {
    border-radius: 50%;
    background: dodgerblue;
    transform: rotate(calc((var(--knob-position) / 100) * 360deg));
}

.knob::after {
    content: '';
    display: block;
    position: absolute;
    top: 10%;
    left: 50%;
    width: 10%;
    height: 20%;
    background: royalblue;
    transform: translateX(-50%);
}

input[type=range] {
    appearance: none;
    -webkit-appearance: none;
    opacity: 0;
    transform: rotate(-65deg);
}
```

P.S. I rotated the range input to `-65deg` to acheive a more natural feeling when dragging to adjust the value. Set this angle to whatever feels right to you.

All we have left is to make our knob rotate as we drag up and down.

In our Javascript file, we’ll add an event listener for any input on the document. Once that happens, we can update `knob-position` on the input's parent element using `element.style.setProperty()`. 

```javascript
document.addEventListener('input', function (e) {
    e.target.parentElement.style.setProperty('--knob-position', Math.round(e.target.value));
}
```

It works! The only thing left is to choose a stop and start position for the dial.

To do that, we can do a little more math and adjust our CSS `calc()` expression. Now, it limits the rotation to 300 out of 360. Then, we add 180, minus half of the 60 degree difference (leaving 150) to center everything.

```css
.knob {
    transform: rotate(calc(((var(--knob-position) / 100) * 300deg) - 150deg));
}
```

Next, let's add a counter to display the numeric value of our knob using a CSS variable hack by [Cassie Evans](https://twitter.com/cassiecodes).

```css
.adjustment::after {
    /* magical stuff */
    counter-reset: knobPosition var(--knob-position);
    content: counter(knobPosition);

    /* positioning stuff */
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    /* font stuff */
    font-family: monospace;
    font-size: 1.7em;
    color: white;
}
```

That's it! If you want to see it in action, check out the [demo on CodePen](https://codepen.io/bradeneast/pen/VwZQmjG).