---
layout: layouts/base.njk
templateEngine: njk,md
title: Code
sortBy: order
menu:
  showInMenu: true
  label: See what I'm coding
---

# Making the web <em data-tooltip="more fun">funner</em> and easier.

Here you'll find the front-end things I'm building lately.

<div class="feed">
{% set postsList = search.pages("type=codePost", sortBy + "=asc") %}
{% include "templates/postsList.njk" %}
</div>