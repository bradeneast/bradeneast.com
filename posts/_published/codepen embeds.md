# Embed CodePens with one line of code - faster and more accessibly
## 2020/01/13
### blog, html, performance, accessibility
<video id="featured-media" src="/_images/blog/companion-cube-3d.mp4"></video>

When I write for this blog, I usually embed a [CodePen](https://codepen.io/) at the end of the post, as a proof-of-concept of sorts. The problem is, embedded pens are not as friendly and easy to use as most other CodePen features.

> The puzzle video game *[Narbacular Drop](https://en.wikipedia.org/wiki/Narbacular_Drop)* was released in 2005. After the game's release, Valve hired several *Narbacular Drop* developers to help create *[Portal](https://en.wikipedia.org/wiki/Portal_(video_game))*.

<p class="codepen" data-slug-hash="povpQdr">

My biggest complaint is that CodePen embeds feel clunky to use and messy to customize. Here's the copy-and-paste code they provide by default.

```html
<p class="codepen" data-height="265" data-default-tab="result" data-user="bradeneast" data-slug-hash="povpQdr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pure CSS 3D Portal Companion Cube">
  <span>
    See the Pen <a href="https://codepen.io/bradeneast/pen/povpQdr">Pure CSS 3D Portal Companion Cube</a> by Braden (<a href="https://codepen.io/bradeneast">@bradeneast</a>) on <a href="https://codepen.io">CodePen</a>.
  </span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
```

We get `data` attributes all over the place, a myriad of inline styles, and more that's just plain unnecessary (we'll get to that). CodePen offers an `iframe` option, which is slightly cleaner, but gives us even less control over when and how the pen loads.

This causes a few problems for bloggers/developers wanting to keep their websites clean and performant: 
1. Standardizing pen styles is difficult because the everthing is set inline (you'll have to use `!important` to override).
2. Customizing the attribution text requires manual edits and manual updates of each copied embed code.
3. Only one embed script is necessary to load multiple pens on a page. Directly pasting more than one pen means several duplicate scripts that the browser has to parse and run.

#### Guessing the reasons
If you're anything like me, you're probably wondering why CodePen chose to include all that extra code.

This decision isn't explicitly discussed in their [documentation](https://blog.codepen.io/documentation/features/embedded-pens/), but It's pretty obvious that most of their reasons were for accessibility. CodePens that encounter a network error will gracefully fall back to a contentful bordered box (see below).

<p data-height="265" data-default-tab="result" data-user="bradeneast" data-slug-hash="povpQdr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pure CSS 3D Portal Companion Cube">
  <span>
    See the Pen <a href="https://codepen.io/bradeneast/pen/povpQdr">Pure CSS 3D Portal Companion Cube</a> by Braden (<a href="https://codepen.io/bradeneast">@bradeneast</a>) on <a href="https://codepen.io">CodePen</a>.
  </span>
</p>

That's a nice feature, but [some have pointed out](https://www.matuzo.at/blog/improving-the-keyboard-accessibility-of-codepen-embeds/) that CodePen embeds still have room to grow when it comes to accessibility. This post focuses on how we can improve our own experience significantly without compromising that of our readers.

#### My solution
Believe it or not, the only absolutely necessary part of a CodePen embed is the `data-slug-hash` attribute, so we can technically whittle the whole thing down to one line of HTML.

```html
<p class="codepen" data-slug-hash="povpQdr"></p>
```

We can get away with this if we include the [CodePen embed script](https://static.codepen.io/assets/embed/ei.js) (~5kb) on every page. However, we pay the price with an empty space when Javascript is blocked or CodePen is ***gasp*** DOWN. To rememdy that, let's use a small bit Javascript that will add a fallback for us dynamically.

```javascript
document.querySelectorAll(".codepen").forEach(pen => {
	
	const codePen = "https://codepen.io/";
	const hash = pen.getAttribute("data-slug-hash");
	const user = pen.getAttribute("data-user");
	const fallback = document.createElement('p');

	if (hash) fallback.innerHTML += `View <a href="${codePen}pen/${hash}">this pen</a>`;
	if (hash && user) fallback.innerHTML += ` by <a href="${codePen + user}">@${user}</a>`;

	fallback.classList.add('codepen-fallback');
	fallback.innerHTML = hash || user ? fallback.innerHTML + " on CodePen." : "This pen is unavailable.";
	pen.insertAdjacentElement("afterend", fallback);
	
})
```

Now we can see a link to the pen regardless of its status. If something goes wrong, our fallback text will indicate what was supposed to happen. To really put a bow on this solution, we can even add a placeholder to the `.codepen` element for [noscript situations](/blog/using-noscript).

```css
.codepen::after {
	content: "Whoops! This pen is unavailable.";
	display: block;
	font-style: italic;
	text-align: center;
	padding: 2em;
	border: 2px solid currentColor;
}
```

This works because the CodePen embed script replaces the original `.codepen` element with an `iframe`. If all scripts are blocked, the element remains and shows our message.

Now you can enjoy writing one-line CodePen embeds that are fully customizable and easy to maintain!