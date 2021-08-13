---
layout: layouts/base.njk
templateEngine: njk,md
title: Design
sortBy: date
menu:
  showInMenu: true
  label: See my designs
---

# Uniting the digital and the material.

It used to be called &ldquo;multi-media.&rdquo; I'm not particularly fond of that name, but it's a badge of experience and knowledge in many disciplines. I specialize in visual storytelling across all mediums, and if that makes me a multi-media designer, then so be it.

<div class="feed">
{% set postsList = search.pages("type=designPost", sortBy + "=desc") %}
{% include "templates/postsList.njk" %}
</div>