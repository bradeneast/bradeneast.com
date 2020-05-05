<meta name="categories" content="design, ui, css">
<meta name="media" content="/_assets/media/pull.jpg">
<meta name="created" content="January 22 2020">

Whether you like it or not, pull-to-refresh is here to stay, and it's something that designers and developers need to have in their reportoire.  While [Swift has a native API](https://stackoverflow.com/questions/24475792/how-to-use-pull-to-refresh-in-swift) for pull-to-refresh, web developers have to figure out their own Javascript implementation of the concept, which is unpleasantly buggy at worst and time-consuming at best.

> The first White House website was set up during the presidential term of Bill Clinton.

The reality is that most pull-to-refresh concepts are overdone and over-engineered for such a discreet part of the user interaction. Many have written to a great extent on accessibility and performance, so I'll let you decide if this lightweight approach meets your own standards.

Even the OG's of this interaction, Twitter and Instagram, have extremely simple pull-to-refresh interfaces.

Let's put together a reduced example app that we could pull downward to update with fresh content.

```html
<div class="loader">
	<div class="loader--inner"></div>
</div>

<ul class="scrollingList">
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

The loader animation should be hidden by default, so we'll give it a `height` of `0`. When the `loading` class is added, we'll animate to a different height value, which will push the rest of our content down.

```css
.loader {
	height: 0;
	overflow: hidden;
	will-change: transform;
	transition: .3s ease;
}

.loader.loading {
	height: 6em;
}
```

To detect when the content is "pulled" downward, we need to use a `scroll` event listener on the list. This function shows the loader for 2 seconds if the content is scrolled to less than 1px from the top. Let's also wrap it in `requestAnimationFrame()` for better performance.

```javascript
const scrollingList = document.querySelector('.scrollingList');
const loader = document.querySelector('.loader');

scrollingList.addEventListener('scroll', () => {
	requestAnimationFrame(() => {
		
		if (scrollingList.scrollTop > 1) return;
		loader.classList.add('loading');
		
		setTimeout(() => {			
			loader.classList.remove('loading');
			scrollingList.scrollTo(0, 2);
		}, 2000);
		
	})
})
```

That's all the Javascript we need! You'll notice we also used `scrollTo`, keeping the scroll position from ever staying at 0. This will make sure there is always room to scroll up and trigger the refresh.

Here's the demo:

<p class="codepen" data-slug-hash="bGNMyJx"></p>

It's up to you what styles, animations, and other garnish you want to add. For easy integration with an existing project, you probably want to abstract the whole function and assign variables to the threshold and class name. I hope you can use this minimal and lightweight approach in your projects!