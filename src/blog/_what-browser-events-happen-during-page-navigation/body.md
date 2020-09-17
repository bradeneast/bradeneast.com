Today let's break down the browser events that are fired when we navigate from one webpage to another (there are more than you think).

Over the summer, I wrote a [performance-boosting Javascript library](https://github.com/bradeneast/schwifty) for sites that are mostly static HTML, or server-rendered. For the library to work, it needed to simulate a page navigation without actually refreshing. The goal was similar to what single-page apps use a router for, which normally requires a client-rendered, JS-heavy page.

I wanted to bring that single-page app speed and smoothness to static sites (like this one). The problem was, lots of scripts use event listeners to run a particular at a specific time. That meant I needed a way to "fake" navigation and emit the *same DOM events in the same order* as a normal page load.


## What happens when you navigate to a new page?
In modern browsers, there are ***11 events*** that get triggered while navigating to a new page.

<br />

### 1. `document.visibilitychange`
This first change happens when the `visibilityState` of the document is set to `hidden`. This is supposed to only happen when the document is not visible on any screen.

<br />

### 2. `window.beforeunload`
<br />

### 3. `window.pagehide`
<br />

### 4. `window.unload`
<br />

### 5. `document.readystatechange`
This happens when the `readyState` of the document is set to `loading`.

<br />

### 6. `document.visibilitychange`
This second visibility change happens when the `visibilityState` of the document is set to `visible`. This means the document is partially or completely visible.

<br />

### 7. `document.readystatechange`
This happens when the `readyState` of the document is set to `interactive`.

<br />

### 8. `document.DOMContentLoaded`
<br />

### 9.  `document.readystatechange`
This last change happens when the `readyState` of the document is set to `complete`.

<br />

### 10. `window.load`
<br />

### 11. `window.pageshow`
<br />


## Helpful Resources

- [W3.org Reference](https://www.w3.org/TR/page-visibility/#visibility-states-and-the-visibilitystate-enum)
- [The Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#event-visibilitychange)
- [MDN readyState reference](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState)

![The page lifecycle API](/_assets/images/page-lifecycle-api-state-event-flow.png "Philip Walton, Google Developers Reference")