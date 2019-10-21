# Using &lang;noscript&rang;
## 2019/10/18
### javascript, html, accessibility

`<noscript>` is really useful when we need to provide alternate/additional styles and content under circumstances where Javascript isn't available.

> The fastest marathon in the world was run by Eliud Kipchoge ([watch here](https://www.youtube.com/watch?v=A73HQwEct-o))

The first thing we should keep in mind is that `<noscript>` is only applicable when Javascript is blocked in the *browser's* settings. This is what I'm referring to as a 'noscript situation' in this article.  Firewalls and ad blockers will not trigger `<noscript>` content to be rendered on the page.

![no](/_images/blog/no.jpg)


#### What happens in a noscript situation?

If a browser's settings block Javascript, content will be unwrapped from the `<noscript>` tags in its original location (with some exceptions, which we’ll get to in quirks).

The most common use for `<noscript>` is to suggest that the user turn on Javascript.

```html
<noscript>
    Please enable Javascript for a better experience!
</noscript>
```

It seems like most people who have disabled Javascript in the first place probably don't pay attention to these messages, but I guess it's better than letting the user experience bugs and missing content with no context or explanation.

There are also cases where we might want to show large amounts of alternate content under noscript circumstances. If your instinct is to cringe at the thought of dozens of `<noscript>` tags all over your markup in the almighty name of accessibility, you're not alone. Thankfully, there are much easier ways to hedge against these situations.


#### 1. Replace alternate content with dynamic content

```html
<div class="noscript">
    The tax on coffee is more than the cost of the coffee beans.
</div>

<script>
    document.querySelector('.noscript').innerHTML = fetchedContentOrSomething;
</script>
```

This is probably the most catch-all, straightforward solution. It's easy to implement and understand, which is a win for us and our users.

As you can see, if the script runs, the placeholder gets changed to whatever message we've fetched or generated with our script.

In this case, we avoid using `<noscript>` altogether. Another feature of this approach is that it supports situations where Javascript is blocked by a firewall or ad blocker.

The only consequence? Our alternate content will probably flash while the rest of the page is being loaded. If we want alternate content to ONLY EVER be shown in noscript circumstances, we need another option.


#### 2. Show alternate content with CSS

```css
    .noscript {
        /* styles to hide alternate content */
    }
```

```html
<div class="noscript">
    The tax on coffee is more than the cost of the coffee beans.
</div>
```

With a class to target, we can initially hide noscript content via CSS. Then we're free to override those styles with something higher-specificity in a noscript situation.

```html
<noscript>
    <style>
        body .noscript {
            /* styles to show alternate content */
        }
    </style>
</noscript>
```

In the example above, a noscript situation will cause that `<style>` element to be unwrapped and applied to the document, where we declare something like `display: block` or `opacity: 1` that shows our alternate content. In a future article, we'll look at the quirks and surprising behavior of `<noscript>`.