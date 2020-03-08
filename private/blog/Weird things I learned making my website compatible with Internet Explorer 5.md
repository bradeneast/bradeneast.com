<meta name="categories" content="html, css, javascript, accessibility">
<meta name="media" content="/_assets/media/vintage-cassette.jpg">
Recently I was bored and felt like doing something that would make me want to jump off a bridge. Naturally, I decided to visit my personal website in the earliest available version of Internet Explorer. What I saw was terrible, don't get me wrong, but it was *just good enough* that I thought "I can work with this."  So, I embarked on a weekend-long code spree.

## Highlights
- IE developer tools are 🐌🐌🐌
- `getElementByID()` and `getElementsByTagName()` are pretty much your only options for selecting elements.
- You WILL get very comfortable writing plain 'ol `for` loops
- `try`/`catch` is supported?!



## Other weird IE things

### Type Mismatch Error
This is probably the most mysterious and elusive error I've encountered while coding. Googling didn't help, and I ended up just trying different methods or APIs until it went away. Let me know if you have some insight on this one - for real.


### CSS Units
Enjoy using relative units like `rem`, `vw`, `vh`, `vmin`, `vmax`? Forget about it. You'll become well acquainted with `%` and `px` and `font-size: small`. This was annoying at first, because I use `rem` all over my stylesheets. My solution was to load in a separate stylesheet for 'retro' users, and make a small SCSS function that could convert rem-size numbers to pixels for me.

```css
@function rem($n) {
    @return ($n * 20) + px;
}

h1 {
    font-size: rem(4); /* 80px */
}
```


### HTML 5 semantic elements are helpful but also not
I try to be a responsible developer, so I use semantic elements like `nav`, `article`, and `footer`. I was confused to find that content inside these elements gets unwrapped by Internet Explorer. IE goes looking for the next valid parent up the DOM tree and puts it there instead.

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

*Here's a list of HTML5 elements that won't work in Internet Explorer. See [caniuse.com](https://caniuse.com/#feat=html5semantic) for details*
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


### CSS Variables/Custom Properties
As in the example earlier, I discovered that [SCSS variables](https://sass-lang.com/documentation/variables) and functions are your friend when it comes to supporting IE. They compile down to vanilla CSS, which is fantastic.

Sometimes, we're planning on changing or overriding CSS custom properties later from a user interaction. Relying only on SCSS variables (which compile to static values), will keep modern browsers from getting the full functionality. That's fine! In Internet Explorer, CSS custom properties are treated the same as any other invalid property value, so it's easy to provide a static value as a fallback.

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