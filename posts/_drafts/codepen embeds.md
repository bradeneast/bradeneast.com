# Load CodePen embeds faster and more accessibly
## 2020/01/13
### blog, html, codepen, performance, accessibility
<img class="hide" src="/_images/blog/companion-cube-3d.gif" aria-hidden="true">

As I write for this blog, I often like to embed a CodePen at the end of most of my posts, as a sort of "proof-of-concept". The problem is, CodePen embeds are not as friendly as many other CodePen features.

> The puzzle video game *[Narbacular Drop](https://en.wikipedia.org/wiki/Narbacular_Drop)* was released in 2005. After the game's release, Valve hired several *Narbacular Drop* developers to help create *[Portal](https://en.wikipedia.org/wiki/Portal_(video_game))*.

<p class="codepen" data-default-tab="css,result" data-slug-hash="povpQdr">

In fact, CodePen embeds feel clunky to use and messy to modify. Here's the copy-and-paste embed code they provide by default.

```html
<p class="codepen" data-height="265" data-default-tab="result" data-user="bradeneast" data-slug-hash="povpQdr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Pure CSS 3D Portal Companion Cube">
  <span>See the Pen <a href="https://codepen.io/bradeneast/pen/povpQdr">
  Pure CSS 3D Portal Companion Cube</a> by Braden (<a href="https://codepen.io/bradeneast">@bradeneast</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
```

We get `data` attributes all over the place, a myriad of inline styles, and a `script` tag to reference their embed Javascript. CodePen offers an iFrame option, which is slightly cleaner, but gives us even less control over when and how the pen loads.

This causes a few problems for bloggers/developers wanting to keep their posts clean and performant: 
1. Standardizing styles is difficult because the everthing is set inline (you'll have to use `!important` to override anything).
2. Customizing the attribution text requires manual edits and manual updates of each copied embed code.
3. Only one embed script per page is required. Pasting in multiple pens means multiple duplicate scripts and slower load times.

#### Guessing the reasons
If you're anything like me, you're asking the question, "Why do CodePen embeds include all that extra code?"

In their [explainer](https://codepen.io/embeds) and [documentation](https://blog.codepen.io/documentation/features/embedded-pens/), CodePen doesn't offer an obvious reason for the extra markup.