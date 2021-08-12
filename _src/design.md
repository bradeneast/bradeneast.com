---
layout: layouts/base.njk
title: Design
templateEngine: njk,md
sortBy: date
menu:
  showInMenu: true
  label: See my designs
---

# Uniting the digital and the material.

If it's a design, it's a story.

More than one, and it's a system.

<div class="feed">
{% set postsList = search.pages("type=designPost", sortBy + "=desc") %}
{% include "templates/postsList.njk" %}
</div>