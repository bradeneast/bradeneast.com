[Flintstone](https://flintstone.app) is a high-performance web app that refines the document editing process. I designed it with a clear, responsive interface for changing data, text, and styles in real-time.

Initial users have told me they felt more in control of their documents than ever with something so simple and powerful.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/signin.mp4"></video>

Flintstone handles secure individual user accounts through Netlify's GoTrue API. I designed the user experience to be seamless and unobtrusive, while authentication is handled nearly instantly in the background.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/data-fields.mp4"></video>

The interface is modeled after a text-editor, where the majority of real-estate is reserved for the long form text. Data auto-completion (sometimes called &ldquo;intellisense&rdquo;) was one feature I was excited to integrate.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/document-editor.mp4"></video>

Rich text features have been shown to frustrate many users, so I opted for a richly-applied style editor. This approach makes consistent styling a no-brainer, and doesn't require knowledge of CSS or HTML to use.

<video loop autoplay muted playsinline src="/_assets/images/flintstone/style-editor.mp4"></video>

## Technologies

<div class="technologies grid">

<Import from="/_/sm/tech.html">
	<TechName>GoTrue API</TechName>
	<TechUse>
		I used the <a href="https://github.com/netlify/gotrue">GoTrue API</a> to handle user signup, authentication and custom user data. GoTrue is based on OAuth2 and JWT.
	</TechUse>
	<TechLogo>
		<img src="/_assets/images/technologies/auth.svg" />
	</TechLogo>
</Import>

<Import from="/_/sm/tech.html">
	<TechName>lit-html</TechName>
	<TechUse>
		I used this templating library from Google's <a href="https://www.polymer-project.org/">Polymer Project</a> to render a reactive user interface.
	</TechUse>
	<TechLogo>
		<img src="/_assets/images/technologies/lit-html.svg" />
	</TechLogo>
</Import>

<Import from="/_/sm/tech.html">
	<TechName>esbuild</TechName>
	<TechUse>
	 The source code was split up into components and templates, so <a href="https://github.com/evanw/esbuild">esbuild</a> was the fastest way to bundle and minify the application.
	</TechUse>
</Import>

<Import from="/_/sm/tech.html">
	<TechName>Netlify</TechName>
	<TechUse>
		I'm hosting Flintstone on Netlify and deploying from its GitHub repository.
	</TechUse>
	<TechLogo>
		<img src="/_assets/images/technologies/netlify.svg" />
	</TechLogo>
</Import>

</div>