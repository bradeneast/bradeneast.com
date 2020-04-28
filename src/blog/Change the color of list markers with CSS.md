<meta name="categories" content="html, css">
<meta name="media" content="/_assets/media/stack-of-books-on-a-table.jpg" />

The web is mostly lists. Think about it. What comes up when we search Google? How would we navigate any website without a **list** of possible pages to visit (a menu)?

That said, not everything on the web *looks* like a list. It's easy to I want to share a quick, pure CSS way to add colored list markers, without the use of an image.

Here's a simple unordered list.

<ul>
    <li style="list-style-type: disc">1 whole egg</li>
    <li style="list-style-type: disc">2 egg whites</li>
    <li style="list-style-type: disc">2oz cream cheese</li>
    <li style="list-style-type: disc">2 Tbsp almond flour</li>
    <li style="list-style-type: disc">1 Tbsp brown sugar</li>
    <li style="list-style-type: disc">1 Tbsp sucralose</li>
    <li style="list-style-type: disc">1 tsp vanilla extract</li>
    <li style="list-style-type: disc">1 tsp baking powder</li>
    <li style="list-style-type: disc">1/2 tsp salt</li>
    <li style="list-style-type: disc">1/4 tsp almond extract</li>
</ul>

That's right. You're getting a bonus waffle recipe out of this. By default, the list marker color inherits the color of the list item. Let's say we're working with a specific theme color throughout a new project. How would we change the color of HTML list markers to make them match our theme color?

We have 2 options:

## Option 1: A pseudo element

This option is relatively straightforward and open-ended. Add `::before` or `::after` to `li` elements, then position and style the pseudo element as needed.

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
<ul class="pseudo-element-example">
    <li>My marker should be a blue diamond.</li>
    <li>Me too!</li>
    <li>I as well.</li>
</ul>

## Option 2: The `list-style-image` property

Images are fine, but updating a png/svg/jpg is not always easy, and won't match if we change the theme color. Thankfully, `list-style-image` accepts gradient values, and that's the secret.

```css
ul {
    list-style-image: radial-gradient(coral 65%, transparent 0);
}
```
<ul style="list-style-image: radial-gradient(coral 65%, transparent 0);">
    <li>My marker should be an orange disc.</li>
    <li>Me too!</li>
    <li>I as well.</li>
</ul>

```css
ul {
    list-style-image: linear-gradient(-45deg, dodgerblue 50%, transparent 0);
}
```

<ul style="list-style-image: linear-gradient(-45deg, #44aa77 37%, #66dd99 37%, #99ffbb 63%, transparent 0)">
    <li>My marker should look like a gem.</li>
    <li>Me too!</li>
    <li>I as well.</li>
</ul>

We can do more fun things with this, but I'll leave discovering those up to you.

Unfortunately, layering multiple gradients won't work. This approach limits you to a single gradient, within the size of the marker box. That's okay, as we have a much more straightforward way coming soon.  By next year, we might be using [the ::marker pseudo element](https://developer.mozilla.org/en-US/docs/Web/CSS/::marker) instead. At the time of writing, `::marker` is still a draft in the CSS spec.