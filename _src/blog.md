---
layout: layouts/base.njk
templateEngine: njk,md
title: Blog
menu:
  showInMenu: false
  label: Read my blog
---

# The blog for _dev-signers_

For moments of spontaneity, <a data-no-schwifty href="/random">here's a random
post</a>

<div class="feed">
{% set postsList = search.pages("type=blogPost", site.sorting.Blog) %}
{% include "templates/postsList.njk" %}
</div>
