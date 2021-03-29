[Flintstone](//flintstone.app) is a high-performance web app that refines the document editing process. I designed it with a clear, responsive interface for changing data, text, and styles in real-time.

Initial users have told me they felt more in control of their documents than ever with something so simple and powerful.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/signin.mp4"></video>

Flintstone handles secure individual user accounts through Netlify's GoTrue API. I designed the user experience to be seamless and unobtrusive, while authentication is handled nearly instantly in the background.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/data-fields.mp4"></video>

The interface is modeled after a text-editor, where the majority of real-estate is reserved for the long form text. Data auto-completion (sometimes called &ldquo;intellisense&rdquo;) was one feature I was excited to integrate.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/document-editor.mp4"></video>

Rich text features have been shown to frustrate many users, so I opted for a richly-applied style editor. This approach makes consistent styling a no-brainer, and doesn't require knowledge of CSS or HTML to use.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/style-editor.mp4"></video>

## Technologies

<div class="post--grid">

<Import from="/_/sm/blurb.html">
	<BlurbTitle>GoTrue API</BlurbTitle>
	<BlurbDescription>
		I used the <a href="//github.com/netlify/gotrue">GoTrue API</a> to handle user signup, authentication and custom user data. GoTrue is based on OAuth2 and JWT.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/auth.svg" />
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
	 The source code was split up into components and templates, so <a href="//github.com/evanw/esbuild">esbuild</a> was the fastest way to bundle and minify the application.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/esbuild.svg" />
	</BlurbImage>
</Import>

<Import from="/_/sm/blurb.html">
	<BlurbTitle>Netlify</BlurbTitle>
	<BlurbDescription>
		I'm hosting Flintstone on Netlify and deploying from its GitHub repository.
	</BlurbDescription>
	<BlurbImage>
		<img src="/_assets/images/technologies/netlify.svg" />
	</BlurbImage>
</Import>

</div>