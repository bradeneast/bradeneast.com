The web is mostly lists. Ever been to a website without a navigation menu? That said, not everything on the web *looks* like a list. It's easy to un-style a list, but is there a pure CSS way to change the color of list markers, without the use of an image?

I'm currently on vacation and missing my protein shakes at home, so lets use the ingredients as our example list to help me cope. 

- 30g casein protein
- 1 cup whole milk
- 1 Tbsp ground flaxseed

By default, the list marker inherits the text color of the list item. But how would we change the color of HTML list markers to make them match our theme color? We have 2 pure CSS options:


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
  .list-style-image-example-1 li {
    list-style-image: radial-gradient(coral 63%, transparent 0);
  }
  .list-style-image-example-2 li {
    list-style-image: linear-gradient(
      -45deg,
      green 37%,
      lightgreen 37%,
      lightgreen 63%,
      transparent 0
    );
  }
</style>

#### These list item markers should look like blue diamonds.
<ul class="pseudo-element-example">
  <li>30g casein protein</li>
  <li>1 cup whole milk</li>
  <li>1 Tbsp ground flaxseed</li>
</ul>


## Option 2: The `list-style-image` property

Images are fine, but updating a png/svg/jpg is not always easy, and won't match if we change the theme color. Thankfully, `list-style-image` accepts gradient values, and that's the secret.

```css
ul {
  list-style-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 216 216'%3E%3Cpolygon fill='red' points='214.88 83.51 148.65 131.72 174.03 209.59 107.72 161.51 41.5 209.71 66.74 131.79 0.44 83.7 82.34 83.63 107.59 5.71 132.97 83.59 214.88 83.51'/%3E%3C/svg%3E");
}
```

#### These list item markers should be coral colored.
<ul class="list-style-image-example-1">
  <li>30g casein protein</li>
  <li>1 cup whole milk</li>
  <li>1 Tbsp ground flaxseed</li>
</ul>

```css
ul {
  list-style-image: linear-gradient(
    -45deg, 
    green 37%, 
    lightgreen 37%, 
    lightgreen 63%, 
    transparent 0
  );
}
```

#### These list item markers should look like gems.
<ul class="list-style-image-example-2">
  <li>30g casein protein</li>
  <li>1 cup whole milk</li>
  <li>1 Tbsp ground flaxseed</li>
</ul>

We can do more fun things with this, but I'll leave discovering those up to you. Unfortunately, layering multiple gradients won't work. This approach limits you to a single gradient, within the size of the marker box.

## Option 3: The `::marker` pseudo element
Both of the above approaches are a little bit hacky. That's okay, because we have a much more straightforward way coming soon.  By next year, we might be using [the ::marker pseudo element](//developer.mozilla.org/en-US/docs/Web/CSS/::marker) instead. At the time of writing, `::marker` is still a draft in the CSS spec.

```css
::marker {
  content: '⭐'
}
```

You can simulate this with the [partially supported](//caniuse.com/?s=list-style-type[string]) method of passing a string to `list-style-type`.

```css
li {
  list-style-type: '⭐'
}
```