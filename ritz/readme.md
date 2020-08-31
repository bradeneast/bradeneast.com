# Ritz


## Element Types


### Bricks
Bricks let you import content from other files.


### Slots
Slots are placeholders inside Bricks.


### Special

#### Markdown
Anything inside a `<Markdown>` element will get parsed as Markdown and rendered as HTML in the final file. *Markdown parsing happens once, in the last step of the build process, so the text will retain its syntax until written to the resulting HTML file.

```html
<!-- Source -->
<Markdown>
# I'm a heading

- Here is a list item
- This is another item in the list
</Markdown>


<!-- Result (Markdown tags are removed) -->
<h1>I'm a heading</h1>
<ul>
<li>Here is a list item</li>
<li>This is another item in the list</li>
</ul>
```


#### Each
- `from` accepts a regular expression to match a page path
- `sort` accepts a page property to sort by (can be reversed with a preceding '-')
- `use` works similarly to Bricks. Pass it the relative path to the template you want to use for each item.

```html
<Each from="articles/.+?/" sort="-Published" use="atoms/articleFeedItem"></Each>
```


### Brackets
Brackets let you get a specific property that you've defined globally or in a Slot. E.G. `{{Date}}`. Brackets are generally less performant than Slots, but are sometimes necessary for interpolating an attribute value.

```html
<a href="{{sys.href}}">Read More</a>
```

#### Expressions
Adding the `@` symbol before your brackets `@{{...}}` will tell Architect to evaluate their contents as a Javascript expression.