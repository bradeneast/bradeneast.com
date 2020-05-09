<meta name="media" content="/_assets/media/wrds/wrds-demo.mp4">
<meta name="categories" content="web app, javascript, lit-html">

WRDS is a super-lightweight web app for fast, templated document creation. It lets you create PDF documents in seconds, create templates, export/import data, and write unlimited styles.

> [Try it out for yourself](https://wrds.netlify.app) and let me know how it can be improved.

My goal with this project was to use as few libraries as possible. It also needed to be modular and easy to scale as I continue to add new features. WRDS is built to take advantage of the responsiveness of the web, which gives it an edge over programs like Microsoft Word and Adobe Acrobat.

Finally, WRDS is also privacy-first, meaning your data is never shared with a server. Everything is stored locally on your machine, giving you total control and privacy.


## Technologies used

### Javascript
I used ES6 modules to split up components, organize functions, and share data between parts of the app. The app isn't "bundled" per-say, but I did take advantage of Typescript's compiler to make the code more universally accessible.

### lit-html
[Lit-html](https://lit-html.polymer-project.org/) is my go-to web app foundation. It's a templating and rendering library that capitalizes on features of modern Javascript, like template literals. I selected it for it's [size, simplicity, and efficiency](https://lit-html.polymer-project.org/guide).

### Marked
[Marked](https://marked.js.org/) is the fastest and most straightforward library available for making HTML from markdown. It helps WRDS turn your notes into something polished.

### Prism
Since WRDS gives you the option to write and apply CSS to your document, I've included [Prism](https://prismjs.com) for syntax highlighting.
