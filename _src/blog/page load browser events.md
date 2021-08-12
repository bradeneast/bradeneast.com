---
draft: true
title: What browser events happen during page navigation?
image: /img/liquid-splashing-out-of-a-mug.jpg
tags:
  - Javascript
  - HTML
  - Performance
---

Today let's break down the browser events that are fired when we navigate from one webpage to another (there are more than you think).

Here's why I was interested, and why you might be too:

Over the summer, I wrote a [performance-boosting Javascript library](//github.com/bradeneast/schwifty) for sites that are static HTML or server-rendered. For the library to work, it needed to simulate a page navigation without actually refreshing. The goal was similar to what single-page apps use a router for, which normally requires a client-rendered, JS-heavy page.

I wanted to bring that single-page app speed and smoothness to static sites (like this one). One of the problems I encountered was that many pages *wait to run scripts until after a particular event fires*. That meant I needed a way to "fake" navigation and emit the same DOM events in the same order as a normal page load.


## What happens when you navigate to a new page?
In modern browsers, there are <span data-tooltip="Browser features are moving at a break-neck pace lately, so a 'time of writing' disclaimer is needed here.">at least 9 events</span> that get triggered while navigating to a new page. This article is only focusing on the events modern browsers have in common.


### 1. `window.beforeunload`
This event is normally used to confirm that a user wants to leave a page with unsaved changes. It fires early enough that the navigation can be prevented if necessary.

> ***Be careful!*** This event is easy to abuse, and is also triggered by updating the url with `history.replaceState()`.

![A confirmation prompt on CodePen that encourages users to save their work.](/_assets/images/window-confirm-prompt.png)


### 2. `window.pagehide`


### 3. `window.unload`


### 4. `document.readystatechange`
This happens when the `readyState` of the document is set to `loading`.


### 5. `document.readystatechange`
This happens when the `readyState` of the document is set to `interactive`.


### 6. `document.DOMContentLoaded`


### 7.  `document.readystatechange`
This last change happens when the `readyState` of the document is set to `complete`.


### 8. `window.load`


### 9. `window.pageshow`



## Other notable events

### `document.visibilitychange`
This event fires when the `visibilityState` of the document changes. The visibility is `hidden` when the document is not visible on any screen. The visibility is `visible` when the document is partially or completely visible.


## Helpful Resources

- [W3.org Reference](//www.w3.org/TR/page-visibility/#visibility-states-and-the-visibilitystate-enum)
- [The Page Lifecycle API](//developers.google.com/web/updates/2018/07/page-lifecycle-api#event-visibilitychange)
- [MDN readyState reference](//developer.mozilla.org/en-US/docs/Web/API/Document/readyState)

![The page lifecycle API](/_assets/images/page-lifecycle-api-state-event-flow.png "Philip Walton, Google Developers Reference")