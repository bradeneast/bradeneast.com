---
layout: layouts/base.njk
templateEngine: njk,md
title: Code
menu:
  showInMenu: true
  label: See what I'm coding
---

# Making the web funner and easier.

Here you'll find the front-end things I'm building lately.

<div class="feed">
{% set postsList = search.pages("type=codePost", site.sorting.Code) %}
{% include "templates/postsList.njk" %}
</div>
