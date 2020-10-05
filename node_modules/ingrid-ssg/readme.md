# Ingrid
> A very small static site generator with a very big attitude.

[This is an example](https://bradeneast.com) of a site generated with Igrid.


## Getting Started

### 1. Do the npm thing in a new folder
```
npm init -y
...
npm i --save-dev ingrid-ssg
```

### 2. Run Ingrid
```
npx ingrid
```

### 3. Start dropping HTML and Markdown files in the `src` folder.

That's it, yo. If you run into problems, [open an issue](issues).


## Bricks

These are the cornerstone of Ingrid. Bricks are small chunks of HTML (or Markdown) you can reuse throughout your static site project.

> If you've used React or something similar, it might be helpful to think of Bricks like components.

Here's an example of how a Brick might be used for a simple homepage:

```html
<!-- src/index.html -->
<Brick use="/_bricks/template.html">
	<Title>Nostalgia Books</Title>
	<Content>
		<p>We sell those good books.</p>
	</Content>
</Brick>
```

The brick above has a `Title` property and a `Content` property. <em>Only direct children of the Brick will register as a property.</em>

It's `use` attribute points to an HTML file, so Ingrid will make sure that file exists, then import its contents.

Here's what the template might look like:

```html
<!-- src/_bricks/template.html -->
<head>
	<title>
		<Slot name="Title"></Slot>
	</title>
</head>

<body>
	<h1>
		<Slot name="Title"></Slot>
	</h1>

	<main>
		<Slot name="Content"></Slot>
	</main>

	<footer>...</footer>
</body>
```

### What are those Slot elements?

Slots are placeholders for the properties of a Brick.

When this file gets imported, Ingrid tries to match up Slots with their corresponding Brick properties.

The resulting file will look like this:

```html
<!-- dist/index.html -->
<head>
	<title>Nostalgia Books</title>
</head>

<body>
	<h1>Nostalgia Books</h1>

	<main>
		<p>We sell those good books.</p>
	</main>

	<footer>...</footer>
</body>
```

Slots can also have a default value, in case the Brick property is missing.

```html
<!-- Contents are rendered if no property by that name --> 
<Slot name="Title">Default Title</Slot>
```

### Default Brick Properties
#### `sys.href`
The relative path of the current file (e.g. the href of `src/about/index.html` would be `/about`)

#### `sys.content`
The raw text/html content of the current file


## Each's
Each's are placeholders for a list of pages you want to include. They're a rudimentary way to show all pages whose urls match a certain regular expression.

- `from`: The regular expression Ingrid will use to match page paths
- `sort`: The page property to sort by (can be reversed with a preceding `-`)
- `use`: A relative path to the template you want to use for each item

```html
<ul>
	<Each from="books/.+?/" sort="BookRating" use="/_bricks/book.html"></Each>
</ul>
```

For the example above, Ingrid would import and hydrate the file below for each book.

```html
<!-- src/_bricks/book.html -->
<li>
	<h3>
		<Slot name="BookTitle"></Slot>
	</h3>
	Rating: <Slot name="BookRating"></Slot> stars
</li>
```

The result would look something like this:

```html
<ul>
	<li>
		<h3>The Magician's Nephew</h3>
		Rating: 4 stars
	</li>
	<li>
		<h3>The Giver</h3>
		Rating: 5 stars
	</li>
	<li>
		<h3>Where the Red Fern Grows</h3>
		Rating: 3.5 stars
	</li>
</ul>
```


## Interpolating Values
Double curly brackets let you interpolate a value that you've defined globally or in a Brick property. E.G. `{{DatePublished}}`. These are generally less performant than Slots, but are sometimes necessary for things like `href` or `src` attributes.

```html
<img src="{{FeaturedImage}}" />
```

### Expressions
Adding the `@` symbol before double curly brackets `@{{...}}` will tell Ingrid to evaluate their contents as a Javascript expression.


## Development mode

To use Ingrid's development mode, just run Ingrid with the `-dev` flag.

```
npx ingrid -dev
```

This will start a live server at [127.0.0.1:3000](http://127.0.0.1:3000/) where you can refresh to see changes in your site.

> Hot reload is coming in a future version. I'm trying to find the best way to do it with few to none additional dependencies.


## Examples

### Example 1: Online Course Store

```html
<!-- src/_bricks/courseTemplate.html -->
<html>

<head>
	<title>
		<Slot name="CourseTitle"></Slot>
	</title>
</head>

<body>
	<main>

		<Slot name="CourseImage">
			<img src="/defaultImage.webp" />
		</Slot>

		<h1>
			<Slot name="CourseTitle"></Slot>
		</h1>

		<h2>
			Cost: <Slot name="CoursePrice"></Slot>
		</h2>

		<p>
			<Slot name="CourseDescription"></Slot>
		</p>

	</main>
</body>

</html>
```

Now we can list the specific course information as properties of the Brick.

```html
<!-- src/courses/Beginner-Nutrition/index.html -->
<Brick use="/_bricks/courseTemplate.html">

	<CourseTitle>Beginner Nutrition</CourseTitle>
	<CoursePrice>$50</CoursePrice>

	<CourseImage>
		<img src="/beginner-nutrition.jpg" />
	</CourseImage>

	<CourseDescription>
		Want to get healthier <em>AND</em> eat better-tasting food? Get this course and stop being intimidated by the grocery store!
	</CourseDescription>

</Brick>
```

On the courses homepage, let's create a list of courses with their titles and descriptions.

```html
<!-- src/courses/index.html -->
<Each from="courses/.+?/" sort="-CoursePrice" use="/_bricks/listedCourse.html"></Each>
```

Remember those default Brick properties? `<Each>` items are a place we might use one.

```html
<!-- src/_bricks/listedCourse.html -->
<div>
	<h3>
		<Slot name="CourseTitle"></Slot>
	</h3>
	<p>
		<Slot name="CourseDescription"></Slot>
	</p>
	<a href="{{sys.href}}">Learn More</a>
</div>
```