# Knobs and dials on the web
## 2019/09/09
### html, css, ui, blog

In this article, we’ll look at how to make a rotating knob input with HTML, CSS, and just a smidge of Javascript.

> Stairway to Heaven (composed by Jimmy Page and performed by Led Zeppelin) is known by guitarists as the 'forbidden riff.'

![a sound board at a live concert](/_images/blog/sound-board.jpg)

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

Then we get something that looks like this:

<style>

.adjustment {
    --knob-position: 50;
    --knob-size: 4rem;
    position: relative;
    text-align: center;
    width: var(--knob-size);
    height: var(--knob-size);
}

.adjustment#example3::after {
    counter-reset: knobPosition var(--knob-position);
    content: counter(knobPosition);
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    font-size: 1em;
    color: white;
}

.adjustment#example3 .knob {
    transform: rotate(calc(((var(--knob-position) / 100) * 300deg) - 150deg));
}

.adjustment .knob,
.adjustment input[type=range] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.knob {
    border-radius: 50%;
    background: var(--CL-1);
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
    background: var(--CL-2);
    transform: translateX(-50%);
}

input[type=range] {
    appearance: none;
    -webkit-appearance: none;
    opacity: 0;
    transform: rotate(-65deg);
}
</style>

<div class="adjustment" id="example1">
    <div class="knob"></div>
    <input type="range" class="dormant">
</div>

Now, let's make our knob rotate as we drag up and down.

In our Javascript, we’ll add an event listener to the document. If an input event happens on the knob, we can update `knob-position` on the parent element using `element.style.setProperty()`. 

```javascript
document.addEventListener('input', function (e) {
    e.target.parentElement.style.setProperty('--knob-position', Math.round(e.target.value));
})
```

<script>
document.addEventListener('input', function (e) {
    if (e.target.getAttribute('class').includes('active')) {
        e.target.parentElement.style.setProperty('--knob-position', Math.round(e.target.value));
    }
})
</script>

<div class="adjustment" id="example2">
    <div class="knob"></div>
    <input type="range" class="active">
</div>

**Drag Me**

It works! The only thing left is to choose a stop and start position for the dial so it works like we would expect from the real thing.

To do that, we can do a little more math and adjust our CSS `calc()` expression. Now, it limits the rotation to 300 degrees out of 360. Then, we add half of that 300 degrees (150) to center everything.

Let's also rotate the range input to `-65deg` for a more natural click and drag behavior.

```css
.knob {
    transform: rotate(calc(((var(--knob-position) / 100) * 300deg) - 150deg));
}

input[type=range] {
    transform: rotate(-65deg);
    }
```

Lastly, we'll add a counter to display the numeric value of our knob using a CSS variable hack by [Cassie Evans](https://twitter.com/cassiecodes).

<iframe loading="lazy" height="720" style="width: 100%;" scrolling="no" title="Pure CSS Knob/Dial" src="https://codepen.io/bradeneast/embed/qBWxKro?height=265&theme-id=dark&default-tab=css,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/bradeneast/pen/qBWxKro'>Pure CSS Knob/Dial</a> by Braden
  (<a href='https://codepen.io/bradeneast'>@bradeneast</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>