---
title: Coarse
image: /img/coarse/logo.svg
purpose: Library
order: 1
links:
  Try the demo: //coarse.netlify.app
  Check the source code: //github.com/bradeneast/coarse
tags:
  - UI
  - Carousel
  - Javascript
technologies:
  - 
    name: Javascript ES6
    description: I used vanilla Javascript to write clean, maintainable code that outperforms other carousel libraries.
    image: javascript.svg
---

{% from "macros.njk" import video %}

[Coarse](//coarse.netlify.app) is a totally design agnostic, minimal carousel library for modern websites.

{{ video("coarse/basic.mp4") }}

Coarse supports swiping gestures on mobile devices, and uses performance optimizations like [event bubbling](//developer.mozilla.org/en-US/docs/Web/API/Event/bubbles) to stay fast and responsive.

{{ video("coarse/swiping.mp4") }}

It allows for total style control, custom transitions with pure CSS, and is highly configurable from the ground up.

{{ video("coarse/icons.mp4") }}
