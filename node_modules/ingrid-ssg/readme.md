# Ingrid
> A very small static site generator with a very big attitude.

[This is an example](https://bradeneast.com) of a site generated with Igrid.


## Getting Started

### 1. Do the npm thing in a new folder
```
npm init -y
...
npm install --save-dev ingrid-ssg
```

### 2. Run Ingrid
```
npx ingrid
```

### 3. Start dropping HTML and Markdown files in the `src` folder.

That's it, yo. If you run into problems, [open an issue](issues).


## Bricks

These are the cornerstone of Ingrid. Bricks are small chunks of HTML (or Markdown) we're going to be reusing throughout our static site.

> If you write a lot of code, it might help to think of Bricks like modules or functions. We'll see how they're used below.


### Slots

Slots are placeholders for the properties of a Brick.

```html
<!-- index.html -->
<Brick use="/_bricks/book.html">
	<Title>The Magician's Nephew</Title>
	<Author>C. S. Lewis</Author>
</Brick>

<!-- src/_bricks/book.html -->
<div>
	<h2>
		<Slot name="Title"></Slot>
	</h2>
	<Slot name="Author"></Slot>
</div>
```

Slots can also have a default value, in case the Brick property is missing.

```html
<!-- Contents are rendered if no property by that name --> 
<Slot name="Availability">
	Available
</Slot>
```

### Default Brick Properties
- `sys.href` The relative path of the current file (where the Brick is being used)
- `sys.content` The content of the current file


## Each's
Each's are placeholders for a list of pages you want to include. They're a rudimentary way to show all pages whose urls match a certain regular expression.

- `from`: The regular expression Ingrid will use to match page paths
- `sort`: The page property to sort by (can be reversed with a preceding '-')
- `use`: A relative path to the template you want to use for each item

```html
<Each from="courses/.+?/" sort="-CoursePrice" use="/_bricks/listedCourse.html"></Each>
```

In the example above, `src/_bricks/listedCourse.html` would contain a chunk of HTML with Slots for the course information.

```html
<!-- src/_bricks/listedCourse.html -->
<div>
	<h3>
		<Slot name="CourseTitle"></Slot>
	</h3>
	<p>
		<Slot name="CourseDescription"></Slot>
	</p>
</div>
```


## Interpolating Values
Double curly brackets let you interpolate a value that you've defined globally or in a Brick property. E.G. `{{DatePublished}}`. Brackets are generally less performant than Slots, but are sometimes necessary for things like `href` or `src` attributes.

```html
<img src="{{FeaturedImage}}" />
```

### Expressions
Adding the `@` symbol before your brackets `@{{...}}` will tell Ingrid to evaluate their contents as a Javascript expression.


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


## Development mode

To use Ingrid's development mode, just run Ingrid with the `-dev` flag.

```
npx ingrid -dev
```

This will start a live server at [127.0.0.1:3000](http://127.0.0.1:3000/) where you can refresh to see changes in your site.

> Hot-reload is coming in a future version. I'm trying to find the best way to do it with few to none additional dependencies.