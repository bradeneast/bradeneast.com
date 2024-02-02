---
title: Flintstone
image: /img/flintstone/logo.svg
purpose: Web App
order: 2
links:
  Try the demo: //flintstone-app.netlify.app
  Check the source code: //github.com/bradeneast/flintstone
tags:
  - State Management
  - User Authentication
  - Data Portability
technologies:
  - 
    name: GoTrue API
    description: I used the [GoTrue API](//github.com/netlify/gotrue) to handle user signup, authentication and custom user data. GoTrue is based on OAuth2 and JWT.
    image: auth.svg
  - 
    name: Lit
    description: I used this [templating library](https://lit.dev/) from Google's to render a reactive user interface.
    image: lit.svg
  - 
    name: esbuild
    description: The source code was split up into components and templates, so [esbuild](//github.com/evanw/esbuild) was the fastest way to bundle and minify the application.
    image: esbuild.svg
  - 
    name: Netlify
    description: I'm hosting the app on Netlify and deploying from its GitHub repository.
    image: netlify.svg
---

[Flintstone](//flintstone.app) is a high-performance web app that refines the document editing process. I designed it with a clear, responsive interface for changing data, text, and styles in real-time.

Initial users have told me they felt more in control of their documents than ever with something so simple and powerful.

{{ comp.video({ src:"flintstone/signin.mp4" }) }}

Flintstone handles secure individual user accounts through Netlify's GoTrue API. I designed the user experience to be seamless and unobtrusive, while authentication is handled nearly instantly in the background.

{{ comp.video({ src:"flintstone/data-fields.mp4" }) }}

The interface is modeled after a text-editor, where the majority of real-estate is reserved for the long form text. Data auto-completion (sometimes called &ldquo;intellisense&rdquo;) was one feature I was excited to integrate.

{{ comp.video({ src:"flintstone/document-editor.mp4" }) }}

Rich text features have been shown to frustrate many users, so I opted for a richly-applied style editor. This approach makes consistent styling a no-brainer, and doesn't require knowledge of CSS or HTML to use.

{{ comp.video({ src:"flintstone/style-editor.mp4" }) }}
