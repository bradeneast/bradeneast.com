---
layout: layouts/base.njk
templateEngine: njk,md
title: Design
menu:
  showInMenu: true
  label: See my designs
---

# Home-grown brands

My approach to design involves helping my friends and family stick to what
they're amazing at. I take the guesswork out of branding and bring my experience
to design identities that last a lifetime.

<div class="feed">
{% set postsList = search.pages("type=designPost", site.sorting.Design) %}
{% include "templates/postsList.njk" %}
</div>
