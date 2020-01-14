# Embed CodePens faster and more accessibly
## 2020/01/13
### blog, html, codepen, performance, accessibility
<img class="hide" src="/_images/blog/companion-cube-3d.gif" aria-hidden="true">

Since starting to write for my blog, I embed a [CodePen](https://codepen.io/) at the end of most of my posts, as a sort of "proof-of-concept". The problem is, CodePen embeds are not as friendly and easy to use as most other CodePen features.

> The puzzle video game *[Narbacular Drop](https://en.wikipedia.org/wiki/Narbacular_Drop)* was released in 2005. After the game's release, Valve hired several *Narbacular Drop* developers to help create *[Portal](https://en.wikipedia.org/wiki/Portal_(video_game))*.

<p class="codepen" data-default-tab="css,result" data-slug-hash="povpQdr">

In fact, CodePen embeds feel clunky to use and messy to customize. Here's the copy-and-paste embed code they provide by default.

```html
<p class="codepen" data-height="265" data-default-tab="result" data-user="bradeneast" data-slug-hash="povpQdr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pure CSS 3D Portal Companion Cube">
  <span>
    See the Pen <a href="https://codepen.io/bradeneast/pen/povpQdr">Pure CSS 3D Portal Companion Cube</a> by Braden (<a href="https://codepen.io/bradeneast">@bradeneast</a>) on <a href="https://codepen.io">CodePen</a>.
  </span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
```

We get `data` attributes all over the place, a myriad of inline styles, and some other unnecessary code (we'll get to that). CodePen offers an `iframe` option, which is slightly cleaner, but gives us even less control over when and how the pen loads.

This causes a few problems for bloggers/developers wanting to keep their websites clean and performant: 
1. Standardizing pen styles is difficult because the everthing is set inline (you'll have to use `!important` to override anything).
2. Customizing the attribution text requires manual edits and manual updates of each copied embed code.
3. Only one embed script is necessary to load multiple pens. Directly pasting more than one pen means several duplicate scripts that the browser has to parse and run.

#### Guessing the reasons
If you're anything like me, you're asking the question, "Why do CodePen embeds include all that extra code?"

In their [explainer](https://codepen.io/embeds) and [documentation](https://blog.codepen.io/documentation/features/embedded-pens/), CodePen doesn't offer an obvious reason for the extra markup. That said, these embeds gracefully fall back to a contentful bordered box if the pen is unable to load (see below), which is an important consideration to make for users with spotty connections.

<p data-height="265" data-default-tab="result" data-user="bradeneast" data-slug-hash="povpQdr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pure CSS 3D Portal Companion Cube">
  <span>
    See the Pen <a href="https://codepen.io/bradeneast/pen/povpQdr">Pure CSS 3D Portal Companion Cube</a> by Braden (<a href="https://codepen.io/bradeneast">@bradeneast</a>) on <a href="https://codepen.io">CodePen</a>.
  </span>
</p>

This is a nice feature, but [some have pointed out](https://www.matuzo.at/blog/improving-the-keyboard-accessibility-of-codepen-embeds/) that CodePen embeds still leave some to be desired when it comes to accessibility. Additionally, we can improve our own experience significantly without compromising that of our readers. Let's look at how.

#### My solution
Believe it or not, the only absolutely necessary part of a CodePen embed is the `data-slug-hash` attribute, so you can technically whittle the whole thing down to one line of HTML.

```html
<p class="codepen" data-slug-hash="povpQdr"></p>
```

You can get away with this if you include the [CodePen embed script](https://static.codepen.io/assets/embed/ei.js) (~5kb) on every page (this is what I do because I'm lazy).

Even though it's beautifully simple, we get nothing at all when a connection is unavailable or CodePen is *gasp* DOWN. To rememdy that, let's run a small bit of our own Javascript that will add a fallback.

```javascript
document.querySelectorAll(".codepen").forEach(pen => {
	
	const codePen = "https://codepen.io/";
	const hash = pen.getAttribute("data-slug-hash");
	const user = pen.getAttribute("data-user");
	const fallback = document.createElement('p');

	if (hash) fallback.innerHTML += `View <a href="${codePen}pen/${hash}">this pen</a>`;
	if (hash && user) fallback.innerHTML += ` by <a href="${codePen + user}">@${user}</a>`;

	fallback.innerHTML = hash || user ? fallback.innerHTML + " on CodePen." : "This pen is unavailable.";
	pen.insertAdjacentElement("afterend", fallback);
	
})
```

Now users will see a link to the pen regardless of its status. If the pen does load, users will see an additional invitation to view it on CodePen. If something goes wrong, our fallback text indicates what was supposed to happen.