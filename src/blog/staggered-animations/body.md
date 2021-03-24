Today, let's talk about integrating motion into our websites and user interfaces.

> Your odds of winning an Academy Award are about 10 times better than your odds of experiencing an earthquake.

It's pretty obious that movement happening in perfect sync seems unnatural to us. Unless you're going for the 1970's kung fu movie vibe, you probably want to stagger and tweak your animations to act like they're bound by the laws of physics.

Our brains like smooth, sequential motion that overlaps, speeds up, and slows down in a way that feels familiar to the real world. In animation and motion design, a quick way to acheive this effect is through *staggered* or overlapping movement.

<style>
  @keyframes move {
    0% {
      transform: translate(0);
    }
    50% {
      transform: translateX(10rem);
    }
  }

  @-webkit-keyframes move {
    0% {
      transform: translate(0);
    }
    50% {
      transform: translateX(10rem);
    }
  }

  .example-wrapper {
    font-size: 1rem;
    position: relative;
    height: auto;
    width: 100%;
    margin-bottom: 2rem;
  }

  .example-wrapper .example-circle {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: dodgerblue;
    background: var(--primary);
    -webkit-animation: move 4s ease-in-out alternate infinite running;
    animation: move 4s ease-in-out alternate infinite running;
  }

  .staggered>:nth-child(4),
  .staggered>:nth-child(2) {
    animation-delay: .2s;
  }

  .staggered>:nth-child(5),
  .staggered>:nth-child(1) {
    animation-delay: .4s;
  }
</style>

### Simultaneous

<div class="example-wrapper">
  <div class="example-circle"></div>
  <div class="example-circle"></div>
  <div class="example-circle"></div>
  <div class="example-circle"></div>
  <div class="example-circle"></div>
</div>

### Staggered

<div class="example-wrapper staggered">
  <div class="example-circle"></div>
  <div class="example-circle"></div>
  <div class="example-circle"></div>
  <div class="example-circle"></div>
  <div class="example-circle"></div>
</div>

Despite being almost in sync, the slight variation between each element in the second example makes their movement much more interesting and appealing.

Hopefully this illustrates why we'd want to use staggered motion in our designs, but what's the best way to code it? There are a few options at our disposal, so we'll look at the pros and cons of each.

- Pure CSS
- SCSS `for` loop
- Javascript

## The Pure CSS Approach
```css
.stagger-child-transitions > :nth-child(2) { transition-delay: .1s }
.stagger-child-transitions > :nth-child(3) { transition-delay: .2s }
.stagger-child-transitions > :nth-child(4) { transition-delay: .3s }
.stagger-child-transitions > :nth-child(5) { transition-delay: .4s }
/* etc.... */
```

If you'll always have a managable number of children, this approach is probably the most straightforward. Just put your `stagger-child-transitions` class on the parent element, and animate the child elements however you like!

Another benefit to the pure CSS approach is that it's easy to override the transition delay if necessary. Type selectors like `:nth-child()` are low-specificity, which means those styles can be overriden with a class or ID at the same level:
- Using a class: `.stagger-child-transitions .child { transition-delay: 0s; }`
- Or an ID: `#special { transition-delay: 0s; }`


## Using the SCSS `for` loop
The styles we wrote above can be cleaned up (sort of) with SCSS. Since SCSS is a a pre-processed language that compiles into regular CSS, it makes writing CSS quite a bit easier for us, but doesn't affect the experience of the user, for better or worse.

```css
@for $i from 1 through 100 {
  .stagger-child-transitions > :nth-child(#{$i}) {
    transition-delay: ($i * .1)s;
  }
}
```

That looks nice and clean!  The only drawback of this approach (and pure CSS) is that our stylesheet will start to bloat from extra rules (~1kb per 10 additional children). CSS isn't render-blocking like Javascript, but still has to be downloaded, parsed, and applied by the browser. If you're working with small numbers of children, this approach is probably your best bet.


## Using Javascript

100 items in the last example was probably overkill, but we might want a method with less limitations in case we increase our element count later. This is where a couple lines of Javascript could be a good alternative to the SCSS approach.

```javascript
let targets = document.querySelectorAll('.stagger-child-transitions');

for (let element of targets) {
  element.children.map((child, i) => {
    child.style.transitionDelay = `${i * .1}s`;
  })
}
```

This solves our code bloating problem, and won't noticably affect the performance of our page.  The main advantage to using Javascript is that it's not limited to a finite number of elements, and it allows us to do more complex things, [like this](//codepen.io/bradeneast/pen/PooozNJ).

However, adding styles with Javascript does have drawbacks. Unlike CSS, adding styles with Javascript immediately maxes out our specificity 'headroom'. Because the styles are applied directly to the element, the only way we can change them is to write more Javascript. Another drawback to this approach is that elements added to the DOM after our script runs will not be affected. We have to call the function again to catch those.

Depending on your application, SCSS or Javascript might be better suited for staggering your UI animations. No matter what you choose, adding staggered motion and choreography will almost always make your application feel more friendly and interesting. :)

If you want to read more about this, check out the [Material Design spec](//material.io/design/motion/customization.html#sequencing) on animation customization.