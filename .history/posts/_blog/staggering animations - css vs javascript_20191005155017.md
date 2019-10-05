# Staggered motion in animation and UI design - css vs scss vs javascript
## 2019/09/03
### ui, design, css, javascript

Fun fact of the day: your odds of winning an Academy Award are about 10 times better than your odds of experiencing an earthquake.  Don't give up on that film project! Today, let's talk about integrating motion into our websites and user interfaces.

![people in motion on a sidewalk](/_images/blog/people-in-motion.jpg)

It's pretty obious that movement happening in perfect sync seems unnatural to us. Unless you're going for the 1970's kung fu movie vibe, you probably want to stagger and tweak your animations.

Our brains like smooth, sequential motion that overlaps, speeds up, and slows down according to the laws of physics.  That kind of motion is consistent with our experience and feels familiar.

In animation and motion design, a quick way to acheive this effect is through *staggered* or overlapping movement.

Here's an example:

![circles moving upwards in perfect sync, then downwards with different start times and speeds](/_images/blog/staggered-motion-vs-simultaneous-motion.gif)

Despite being almost in sync, the slight variation between each element makes their movement much more interesting and appealing.

Hopefully this illustrates why we'd want to use staggered motion in our designs, but what's the best way to do that? There are a few options at our disposal, so we'll look at the pros and cons of each.

- Pure CSS
- SCSS `for` loop
- Javascript `forEach` method

#### The Pure CSS Approach

```css
.stagger-child-transitions>:nth-of-type(2) { transition-delay: .1s }
.stagger-child-transitions>:nth-of-type(3) { transition-delay: .2s }
.stagger-child-transitions>:nth-of-type(4) { transition-delay: .3s }
.stagger-child-transitions>:nth-of-type(5) { transition-delay: .4s }
/* etc.... */
```

If you'll always have less than a defined number of children, this approach is probably the most straightforward. Just put your `stagger-child-transitions` class on the parent element, and animate the child elements however you like!

Another benefit to the pure CSS approach is that it's easy to override the transition delay if necessary. Type selectors like `:nth-of-type()` are low-specificity, which means those styles can be overriden with a class or ID at the same level:
- Using a class: `.stagger-child-transitions .child { transition-delay: 0s; }`
- Or an ID: `#special { transition-delay: 0s; }`


#### Using the SCSS `for` loop
The styles we wrote above can be cleaned up (sort of) with SCSS. Since SCSS is a a pre-processed language that compiles into regular CSS, it makes writing CSS quite a bit easier for us, but doesn't affect the experience of the user, for better or worse.

```css
@for $i from 1 through 100 {
    .stagger-child-transitions>:nth-of-type(#{$i}) {
        transition-delay: ($i * .1)s;
    }
}
```

That looks nice and clean!  The only drawback of this approach is that our CSS will start to bloat from the 100 extra lines with 100 extra rules (~10kb). 10kb isn't much in literal file size (considering a jpg can be easily 300kb+), but it does weigh in at around 15-20% of a standard CSS file. CSS isn't render-blocking like Javascript, but it does have to parsed and applied by the browser. If you're anything like me, those extra bytes will start to bug you.


#### Using the Javascript `forEach()` method

100 items was probably overkill, but we might want a method with less limitations in case we increase our element count later. This is where a couple lines of Javascript could be a good alternative to the SCSS approach.

```javascript
document.querySelectorAll('.stagger-child-transitions').forEach(element => {
    Array.from(element.children).map((child, index) => {
        child.style.transitionDelay = (index * .1) + 's';
    })
})
```

This solves our code bloating problem, and won't noticably affect the performance of our page (assuming we're already making the request for a script file). Just for grins, I used `console.time()` and `console.timeEnd()` to see how long this operation takes. For 100 elements, the time was consistently between 1 and 2 milliseconds. That's blazing fast, and quicker than loading the extra CSS.

This is definitely the most dynamic approach, but it does have its problems. Unlike CSS, adding styles with Javascript immediately maxes out our specificity 'headroom'. Because the styles are applied directly to the element, the only way we can change them is to write more Javascript. Another drawback to this approach is that elements added to the DOM after our page loads will not be affected. We have to call the function again to catch those.

Depending on your application, SCSS or Javascript might be better suited for staggering your UI animations. No matter what you choose, adding staggered motion and choreography will almost always make your application feel more friendly and interesting. :)

If you want to read more about this, check out the [Material Design spec](https://material.io/design/motion/customization.html#sequencing) on animation customization.