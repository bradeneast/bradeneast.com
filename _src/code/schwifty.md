---
title: Schwifty
image: /img/schwifty/logo.svg
subtitle: Library
order: 4
links:
  Check the source code: //github.com/bradeneast/schwifty
tags:
  - Javascript
  - Performance
  - Static-Sites
technologies:
  - 
    name: Git & Github
    description: I used git branches to add new features, and [published the library](//github.com/bradeneast/schwifty) on Github with comprehensive documentation.
    image: github.svg
  - 
    name: Javascript ES6
    description: I leveraged several features of modern Javascript, including Classes, new Array methods, and the Intersection Observer API.
    image: javascript.svg
  - 
    name: esbuild
    description: I used the [esbuild](//github.com/evanw/esbuild) bundler to generate a minified version of the library.
    image: esbuild.svg
---

Schwfity is my first published Javascript library. It aims to help static sites join the instant-load party 🥳 with native and progressive apps.

## Aren't static sites already fast?
*Yes!* Static sites can have serious performance advantages. However, there are several "gotchas" where they can be slowed down ***dramatically***.

- [x] Slow DNS lookup
- [x] Slow server response
- [x] Slow SSL negotiation
- [x] No asset compression (GZIP, Brotli, etc.)
- [x] No server-side caching
- [x] Resources spread out over lots of domains (CDNs, third-party scripts, Google fonts, etc.)

It's possible to have these all dialed in, but even a highly-optimized server is sometimes not able to deliver smooth, instantaneous navigation.

> Popular hosting services like Netlify and Github Pages do a lot of these optimizations for you. That said, users on average connections can wait at least 300ms for page loads.

{{ comp.video({ src:"img/schwifty/speedDemo.mp4" }) }}

## How does Schwifty solve this problem?
Schwifty acheives crazy-fast speeds by preloading and caching same-origin pages. It essentially ~lazy-loads~ *lazy-preloads* links as they scroll into view. When a link is clicked, the content is swapped out and navigation happens.

Finally, Schwifty is built for the lightest possible client-side load. That's why <em data-tooltip="Minified and gzipped, of course">**it's only 1.1kb**</em>.