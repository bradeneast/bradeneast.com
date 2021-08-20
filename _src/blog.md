---
layout: layouts/base.njk
templateEngine: njk,md
title: Blog
sortBy: date
menu:
  showInMenu: true
  label: Read my blog
---

# The blog for *dev-signers*

For moments of spontaneity, [here's a random post](/random).

<div class="feed">
{% set postsList = search.pages("type=blogPost", site.sorting.Blog) %}
{% include "templates/postsList.njk" %}
</div>