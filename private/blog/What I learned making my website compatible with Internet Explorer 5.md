<meta name="categories" content="html, css, javascript, accessibility">
<meta name="media" content="/_assets/media/vintage-cassette.jpg">
<meta name="excerpt" content="There's a moment that happens for developers (or maybe just me). It's when you realize that 6 hours has gone by since you started debugging, and you're not sure if you remembered to breathe for most of that. Let's look at some of the weird and surprising things you might want to know for the making my website work in Internet Explorer 5.">

There's a moment that happens for developers (or maybe just me). It's when you realize that 6 hours has gone by since you started debugging, and you're not sure if you remembered to breathe for most of that. Your neck hurts and your brain is foggy and the only thing that could possibly bring you back to reality is an ice bath of espresso.

When I opened my website in an early version of Internet Explorer, it was *just good enough* that I thought "Hey, I can work with this." Many many hours later, I shut off my computer, went for a walk with my wife, and decided not to ever speak of it again. Now I think it might be helpful for somebody if I at least wrote a blog post about it. Here are some of the weird and surprising things I learned making my website work in Internet Explorer 5.



## Highlights
- IE developer tools are 🐌🐌🐌 (~10s to interactive on a very fast machine and connection)
- `getElementByID()` and `getElementsByTagName()` are pretty much your only options for selecting elements in the DOM.
- You WILL get very comfortable writing plain 'ol `for` loops
- `try`/`catch` is supported?! I thought that was a new thing, but apparently not.

> Side note: There are Javascript transpilers that can usually turn ES6 features into something to as early as ES3. I frequently use Typescript to do this in other projects, but configuring and managing it would be significant overkill for the 2kb of JS on this website.



## Moderately weird IE things

### CSS Variables/Custom Properties (IE 11 and below)
I discovered that [SCSS variables](https://sass-lang.com/documentation/variables) and functions are your friend when it comes to supporting IE. They compile down to vanilla CSS, which is fantastic.

That's great, but sometimes we're planning on changing or overriding CSS custom properties later from a user interaction. SCSS variables (which compile to static values), can't do that. That's okay! In Internet Explorer, CSS custom properties are treated the same as any other invalid property value, so it doesn't hurt anything to use them, as long as you provide a static value as a fallback.

```css
$primary: red;

body {
    --primary: #{$primary};
}

body.dark_mode {
    --primary: blue; /* color will change for users with modern browsers */
}

button {
    color: $primary; /* fallback value if no custom property support */
    color: var(--primary);
}
```


### Wave goodbye to (most) CSS relative units 👋 (IE 8 and below)
Enjoy using relative units like `rem`, `vw`, `vh`, `vmin`, `vmax`? Forget about it. You'll become well acquainted with `%` and `px` and `font-size: small`. This was annoying at first, because I use `rem` all over my stylesheets. My solution was to load in a separate stylesheet for 'retro' users, and make a small SCSS function that could convert rem-size numbers to pixels for me.

```css
@function rem($n) {
    @return ($n * 20) + px;
}

h1 {
    font-size: rem(4); /* 80px */
}
```



## Very weird IE things


### Type Mismatch Error (IE 9 and below)

![type mismatch error in the console](/_assets/media/type-mismatch-error.png)

This is probably the most mysterious and elusive error I've encountered while coding. Googling didn't help, and I ended up just trying different methods or APIs until it went away. Let me know if you have some insight on this one - for real.


### HTML 5 semantic elements are helpful but also not (IE 8 and below)
I try to be a responsible developer, so I use semantic elements like `nav`, `article`, and `footer`. I was confused to find that content inside these elements gets unwrapped by Internet Explorer. IE goes looking for the next valid parent up the DOM tree and puts your content there instead.

```html
<!-- this -->

<footer>
    © 2020 Dev-Signers, Inc.
</footer>

<!-- becomes this -->

<footer></footer>
© 2020 Dev-Signers, Inc.
<footer><//footer>
```

*Here's a list of HTML5 elements that won't work in Internet Explorer. See [caniuse.com](https://caniuse.com/#feat=html5semantic) for details.*
- `section`
- `article`
- `aside`
- `header`
- `footer`
- `nav`
- `figure`
- `figcaption`
- `time`
- `mark`
- `main`