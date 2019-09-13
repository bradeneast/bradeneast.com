# Display the value of knobs and dials in real time using CSS counters
## 2019/09/11
### html, css, javascript, ui

Fun fact of the day: 

In my [last article](/blog/making-ui-knobs-and-dials-with-html-and-css), we looked at how to create an adjustment knob for your UI with the HTML range input. Let's improve on that design by adding a value counter that will change in real time as the user adjusts the input.

![sound board](/images/blog/sound-board.jpg)

Cassie Evans has a [fantastic hack](https://twitter.com/cassiecodes/status/1108063565666271234) for CSS counters that we can use to do just that.

I've put the entire stylesheet on [CodePen](https://codepen.io/bradeneast/pen/qBWxKro), but here's the general idea. We'll add a pseudo element to the container element, create a counter with the `knob-position` variable, and point the content property to that counter.

```css
.adjustment {
  --knob-position: 100;
  --knob-size: 8rem;
  position: relative;
  width: var(--knob-size);
  height: var(--knob-size);

  &::after {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    font-size: 1.7em;
    color: white;

    /* name and define the counter */
    counter-reset: knobPosition var(--knob-position);
    /* set the counter as the pseudo element's content */
    content: counter(knobPosition);

    font-family: monospace;
    pointer-events: none;
  }
}
```

What are some of the other properties doing here?  Notably, `font-family: monospace`, and `pointer-events: none` don't seem like they're needed. Let's take a look at that.

If you try to show numbers counting in real time, ordinary fonts will give you a funky jitter that's enough to drive anyone crazy.

![number counting causes font jitters](/images/blog/font-jitter.gif)
*example from [Lior Azi](https://blog.usejournal.com/proportional-vs-monospaced-numbers-when-to-use-which-one-in-order-to-avoid-wiggling-labels-e31b1c83e4d0)*

That's no fun at all.

Second, for the counter to be visible, it needs to be positioned in front of the knob.  For the range input to still be what's getting clicked on, our clicks will need to pass through the counter.

What we end up with is a more sophisticated version of the knob/dial input. Try it out in your UI design!

Here's the [demo on CodePen](https://codepen.io/bradeneast/pen/qBWxKro).