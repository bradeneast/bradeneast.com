---
title: Big List
image: /img/big-list/logo.svg
purpose: Web App
order: 1
links:
  Try the demo: //biglist.netlify.app
  Check the source code: //github.com/bradeneast/big-list
tags:
  - State Management
  - Downloads
  - Productivity
badges:
  - New
technologies:
  - 
    name: Javascript ES6
    description: I used vanilla Javascript to write clean, minimal code that outperforms framework and library implementations.
    image: javascript.svg
  - 
    name: esbuild
    description: The source code was split up into components and templates, so [esbuild](//github.com/evanw/esbuild) was the fastest way to bundle and minify the application.
    image: esbuild.svg
  - 
    name: Netlify
    description: I'm hosting Big List on Netlify and deploying from its GitHub repository.
    image: netlify.svg
---

{% from "macros.njk" import video %}

[Big List](//biglist.netlify.app) is, well... a big list.

Seriously, that's it! It's a checklist designed with oversized type. It's probably for designers, but maybe it will catch on with others too.

{{ video("big-list/typing.mp4") }}

This was a fun weekend project to complete and is my best example of several areas where I've been improving my proficiency and understanding. One of these features was a proprietary drag-and-drop implementation, which is even supported on mobile devices for this web app.

{{ video("big-list/dragging.mp4") }}

Big List uses the browser's `localStorage` API to make sure user data is never exposed to the internet. To allow moving lists between devices, I added an import/export feature which lets users combine multiple lists or replace an old list.

This feature supports file imports and pasted imports, with error handling for unexpected inputs.

{{ video("big-list/importing.mp4") }}

Finally, Big List also tracks revision history of the current session, so you can undo or redo up to 50 consecutive actions.