[WRDS](//wrds.netlify.app) is a super-lightweight web app for fast, templated document creation. It lets you create PDF documents in seconds, save templates, and export your data for portability.

<video loop autoplay muted playsinline src="/_assets/images/wrds/tooltip.mp4"></video>

## Why another word processor?
WRDS was built to solve the problems I encountered designing copy-centered PDFs like press-releases and guides. For me, programs like Microsoft Word and Adobe InDesign weren't quite right for quickly creating and modifying these types of documents. I felt like I was using a table saw where I really just needed a pocket-knife.

![The template-editor dialogue open](/_assets/images/wrds/dialogue.png)

I started coding WRDS to take advantage of the responsive nature of the web, the flexibility of Markdown syntax, and the power of CSS.

> Building this app from scratch has really broadened my practical knowledge of Javascript, but it's also given me a huge appreciation for how larger web apps handle edge-cases and extensibility.

My objective with this project was to make something that was easy to scale as I continue to add new features. Finally, WRDS is also privacy-first, meaning your data is never shared with a server. Everything is stored locally on your machine, giving you total control and privacy.

![A button highlighted from the content-editor interface](/_assets/images/wrds/content-editor.png)


## Technologies

<div class="post--grid">

<Import from="/_/sm/blurb.html">
	<BlurbTitle>Typescript</BlurbTitle>
	<BlurbDescription>
		I used Typescript's compiler to generate an accessible bundle from source code written in ES6+ syntax.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/typescript.svg" />
	</BlurbImage>
</Import>

<Import from="/_/sm/blurb.html">
	<BlurbTitle>lit-html</BlurbTitle>
	<BlurbDescription>
		I used this templating library from Google's <a href="//www.polymer-project.org/">Polymer Project</a> to render a reactive user interface.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/lit-html.svg" />
	</BlurbImage>
</Import>

<Import from="/_/sm/blurb.html">
	<BlurbTitle>esbuild</BlurbTitle>
	<BlurbDescription>
		Since the source code was split up into components and templates, I used <a href="//github.com/evanw/esbuild">esbuild</a> to bundle and minify the application.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/esbuild.svg" />
	</BlurbImage>
</Import>

<Import from="/_/sm/blurb.html">
	<BlurbTitle>Netlify</BlurbTitle>
	<BlurbDescription>
		I'm hosting WRDS on Netlify and deploying from its GitHub repository.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/netlify.svg" />
	</BlurbImage>
</Import>

</div>