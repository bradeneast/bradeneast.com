---
layout: layouts/base.njk
templateEngine: njk,md
title: Design
menu:
  showInMenu: true
  label: See my designs
---

# Home-grown creativity

My approach to design involves helping my friends and family stick to what they're amazing at. I take the guesswork out of graphics and use my wide experience in the design industry to bring your ideas to life.

<div class="feed">
{% set postsList = search.pages("type=designPost", site.sorting.Design) %}
{% include "templates/postsList.njk" %}
</div>
