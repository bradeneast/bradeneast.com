---
layout: layouts/base.njk
templateEngine: njk,md
title: Design
menu:
  showInMenu: true
  label: See my designs
---

# Recovering what was lost.

My approach to design involves helping friends and family stick to what they're amazing at. I think we do best playing on our home feild, and design is a fun way to get us there.

<div class="feed">
{% set postsList = search.pages("type=designPost", site.sorting.Design) %}
{% include "templates/postsList.njk" %}
</div>