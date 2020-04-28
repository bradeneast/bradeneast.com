<meta name="categories" content="html, css">
<meta name="media" content="/_assets/media/stack-of-books-on-a-table.jpg" />

The web is mostly lists. Ever been to a website without a navigation menu? That said, not everything on the web *looks* like a list. It's easy to un-style a list, but is there a pure CSS way to change the color of list markers, without the use of an image?

Let's start with a simple unordered list.

<ul>
    <li style="list-style-type: disc">1 whole egg</li>
    <li style="list-style-type: disc">2 egg whites</li>
    <li style="list-style-type: disc">2oz cream cheese</li>
</ul>

That's right. You're getting a bonus waffle recipe out of this. By default, the list marker inherits the text color of the list item. But how would we change the color of HTML list markers to make them match our theme color?

We have 2 pure CSS options:


## Option 1: A pseudo element

This option is the most open-ended. Add `::before` or `::after` to `li` elements, then style the pseudo element to your heart's content.

```css
li::before {
    content: '';
    position: absolute;
    left: -1em;
    top: .7em;
    height: .5em;
    width: .5em;
    transform: rotate(45deg);
    background: dodgerblue;
}
```

<style>
    .pseudo-element-example li {
        list-style: none !important;
    }
    .pseudo-element-example li::before {
        content: '';
        position: absolute;
        left: -1em;
        top: .7em;
        height: .5em;
        width: .5em;
        transform: rotate(45deg);
        background: dodgerblue;
    }
</style>
<ul aria-label="These list item markers should look like blue diamonds." class="pseudo-element-example">
    <li style="list-style-type: disc">2 Tbsp almond flour</li>
    <li style="list-style-type: disc">2 Tbsp brown sugar</li>
</ul>


## Option 2: The `list-style-image` property

Images are fine, but updating a png/svg/jpg is not always easy, and won't match if we change the theme color. Thankfully, `list-style-image` accepts gradient values, and that's the secret.

```css
ul {
    list-style-image: radial-gradient(coral 65%, transparent 0);
}
```
<ul aria-label="These list item markers should be coral colored." style="list-style-image: radial-gradient(coral 65%, transparent 0);">
    <li style="list-style-type: disc">1 tsp vanilla extract</li>
    <li style="list-style-type: disc">1 tsp baking powder</li>
</ul>

```css
ul {
    list-style-image: linear-gradient(-45deg, dodgerblue 50%, transparent 0);
}
```

<ul aria-label="These list item markers should look like gems." style="list-style-image: linear-gradient(-45deg, #44aa77 37%, #66dd99 37%, #99ffbb 63%, transparent 0)">
    <li style="list-style-type: disc">1/2 tsp salt</li>
    <li style="list-style-type: disc">1/4 tsp almond extract</li>
</ul>

We can do more fun things with this, but I'll leave discovering those up to you. Unfortunately, layering multiple gradients won't work. This approach limits you to a single gradient, within the size of the marker box.

Both of these approaches are a little bit hacky. That's okay, because we have a much more straightforward way coming soon.  By next year, we might be using [the ::marker pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker) instead. At the time of writing, `::marker` is still a draft in the CSS spec.