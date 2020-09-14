WRDS is a super-lightweight web app for fast, templated document creation. It lets you create PDF documents in seconds, save templates, and export/import data for portability.

## Why another word processor?
WRDS was built to solve the problems I encountered designing copy-centered PDFs like press-releases and guides. For me, programs like Microsoft Word and Adobe InDesign weren't quite right for quickly creating and modifying these types of documents. I felt like I was using a multi-purpose drill when what I really needed was a simple screwdriver.

<video loop autoplay muted playsinline src="/_assets/images/wrds/wrds-demo.mp4"></video>

I started coding WRDS to take advantage of the responsive nature of the web, the flexibility of Markdown syntax, and the power of CSS.

> Building this app from scratch has really broadened my practical knowledge of Javascript, but it's also given me a huge appreciation for how larger web apps handle edge-cases and extensibility.

My objective with this project was to make something that was easy to scale as I continue to add new features. Finally, WRDS is also privacy-first, meaning your data is never shared with a server. Everything is stored locally on your machine, giving you total control and privacy.

## Technologies

<ul class="technologies">

<Brick use="_bricks/atoms/tech.html">
	<TechName>Typescript</TechName>
	<TechUse>
		I used Typescript's compiler to generate an accessible bundle from source code written in ES6+ syntax.
	</TechUse>
	<TechLogo>
		<img src="/_assets/images/technologies/typescript.svg" />
	</TechLogo>
</Brick>

<Brick use="_bricks/atoms/tech.html">
	<TechName>lit-html</TechName>
	<TechUse>
		I used this templating library from Google's <a href="https://www.polymer-project.org/">Polymer Project</a> to render a reactive user interface.
	</TechUse>
	<TechLogo>
		<img src="/_assets/images/technologies/lit-html.svg" />
	</TechLogo>
</Brick>

<Brick use="_bricks/atoms/tech.html">
	<TechName>esbuild</TechName>
	<TechUse>
		Since the source code was split up into components and templates, I used <a href="https://github.com/evanw/esbuild">esbuild</a> to bundle and minify the application.
	</TechUse>
</Brick>

<Brick use="_bricks/atoms/tech.html">
	<TechName>Netlify</TechName>
	<TechUse>
		I'm hosting this project on Netlify for continuous deployment from the WRDS repository on Github.
	</TechUse>
	<TechLogo>
		<img src="/_assets/images/technologies/netlify.svg" />
	</TechLogo>
</Brick>

</ul>