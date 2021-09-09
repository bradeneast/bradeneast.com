---
title: Using Noscript
image: /img/staring-at-a-blank-screen.jpg
tags:
  - Javascript
  - Accessibility
  - HTML
---

The `noscript` element is really useful when we need to provide alternate/additional styles and content under circumstances where Javascript isn't available.

> The fastest marathon in the world was run by Eliud Kipchoge ([watch here](//www.youtube.com/watch?v=A73HQwEct-o))

The first thing we should keep in mind is that `<noscript>` is only applicable when Javascript is blocked in the *browser's* settings. This is what I'm referring to as a 'noscript situation' in this article.  Firewalls and ad blockers will not trigger `<noscript>` content to be rendered on the page.


## What happens in a noscript situation?

If a browser's settings block Javascript, content will be unwrapped from the `<noscript>` tags in its original location (with some exceptions, which is the topic for another article).

The most common use for `<noscript>` is to suggest that the user turn on Javascript.

```html
<noscript>
  Please enable Javascript for a better experience!
</noscript>
```

It seems like most people who have disabled Javascript in the first place probably don't pay attention to these messages, but I guess it's better than letting the user experience bugs and missing content with no context or explanation.

There are also cases where we might want to show large amounts of alternate content under noscript circumstances. If you cringe at the thought of dozens of `<noscript>` tags all over your markup in the almighty name of accessibility, you're not alone. Thankfully, there are much easier ways to hedge against noscript situations.


## 1. Replace alternate content with dynamic content

```html
<div class="noscript" id="fact-of-the-day">
  The tax on coffee is more than the cost of the coffee beans.
</div>

<script>
  document.getElementById('fact-of-the-day').innerHTML = fetchedContentOrSomething;
</script>
```

This is probably the most catch-all, straightforward solution. It's easy to implement and understand, which is a win for us and our users. As you can see, if the script runs, the placeholder gets changed to whatever message we've fetched or generated with our script.

In this case, we avoid using `<noscript>` altogether. Another feature of this approach is that it works just as well if Javascript is blocked by a firewall or ad blocker. The only consequence? Our alternate content will probably flash while the rest of the page is being loaded. If we want alternate content to ONLY EVER be shown in noscript circumstances, we need another option.


## 2. Show alternate content with CSS

With a class to target, we can initially hide noscript content via CSS. Then we're free to override those styles with something higher-specificity in a noscript situation.

In this example, a noscript situation will cause the `<style>` element to be unwrapped and applied to the document, where we declare something to show our alternate content.

```html
<style>
  .noscript {
    display: none;
  }
</style>

<noscript>
  <style>
    body .noscript {
      display: block;
    }
  </style>
</noscript>

<div class="noscript">
  The tax on coffee is more than the cost of the coffee beans.
</div>
```

## Quirks

Let's look at the quirks and surprising behavior of `<noscript>`.

1. [It seems as though](//ohgm.co.uk/breaking-head-quietly/) different browsers treat `<noscript>` in the `<head>` differently. In Chrome, doing this will land your content right after the opening `<body>` tag. Knowing that, it’s probably best to place `<noscript>` content exactly where you need it to end up in the first place.

2. `<noscript>` elements are block-level, so [they can’t be used inline](//htmlparser.info/parser/#noscript). If it’s really necessary, you could put a display of flex on the parent.