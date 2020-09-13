WRDS is a super-lightweight web app for fast, templated document creation. It lets you create PDF documents in seconds, save templates, export/import data, and write unlimited styles.

## Why build another word processor?
WRDS was built to solve the problems I encountered designing copy-centered PDFs like press-releases and guides. For me, programs like Microsoft Word and Adobe InDesign weren't quite right for quickly creating and modifying these types of documents. I felt like I was using an electric drill when what I really needed was a hammer.

<video loop autoplay muted playsinline src="/_assets/images/wrds/wrds-demo.mp4"></video>

So, I started coding WRDS to take advantage of the responsive, open-ended nature of the web and its browsers.

> Building this app from scratch has really broadened my practical knowledge of Javascript, but it's also given me a huge appreciation for how larger web apps handle edge-cases and extensibility.

My objective with this project was to use as few libraries as possible, and make something that was easy to scale as I continue to add new features.

## Technologies

<Brick use="_bricks/atoms/blurb.html">
	<BlurbTitle>
		<h3>lit-html</h3>
	</BlurbTitle>
	<BlurbDescription>
		Lit-html is a templating library from Google's <a href="https://www.polymer-project.org/">Polymer Project</a>. I chose it because of its simplicity and extensibility.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/lit-html.svg" />
	</BlurbImage>
</Brick>

Finally, WRDS is also privacy-first, meaning your data is never shared with a server. Everything is stored locally on your machine, giving you total control and privacy.