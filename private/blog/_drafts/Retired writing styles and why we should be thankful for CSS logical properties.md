<meta name="categories" content="design, css, typography" />
<meta name="media" content="/_assets/media/writing-styles.jpg" />

With the advent of CSS [logical properties](https://css-tricks.com/css-logical-properties/), I think it's important for us to look more closely at why and how we make decisions like layout, text-alignment, and overall flow decisions for our little corners of the web.

This isn't just a history lesson, though. I want to help myself break out of the left-to-right-always-and-forever mindset that limits the creative ways I might otherwise solve layout and design problems. If you're down for that, keep reading.

## Retired writing styles
Let's trace modern languages back through history a little ways. Western languages are made up of a Latin character set, which was developed from Greek, which was developed from Phoenician hieroglyphs. We could keep going back, but you probably get the idea. As written language evolved, the letters weren't the only thing that changed - the alignment, direction, and flow of information was up for experimentation as well.


### Bou·stro·phe·don

#### Greek | "As the ox plows" 🐮

Boustrophedon writing was literally “as the ox plows.”  Ancient Greeks would write one direction on a line of text, and the other direction on the next line.  If there’s a word that means “as the lawn is mowed” it might also be appropriate to describe boustrophedon scripts.  Here's an example of what boustrophedonic text would look like on the web:

<p class="codepen" data-slug-hash="YzXELwj">


### Ron·go·ron·go

#### Rapanui | Easter Island Script 🗿

Rongorongo is a form of boustrophedonic writing that was found on Easter Island in the 1800’s.  It reads starting at the bottom left, and becoming inverted every other line, in this pattern: left-to-right right-side-up, right-to-left upside-down, and so on...

<p class="codepen" data-slug-hash="PoqOmmb">


### Bi-directional scripts


## In the browser
Software performs a significant amount of math to wrap text in a way that's predictable and mimics styles of print.

## Why does it matter?

Writing/reading direction also [impacts our abstraction](https://www.frontiersin.org/articles/10.3389/fpsyg.2012.00109/full) of time into space. In other words, the way you and I might use hierarchy and flow in a design could be somewhat foreign to an East-Asian audience. Even with English as a second language, cultures with bi-directional writing systems do spatial reasoning differently from western cultures. Progress is naturally expected to happen from bottom-to-top or left-to-right.

The web is a place where we have unlimited freedom to experiment and create. We can align text and user interfaces in an infinite number of ways with an infinite volume of content. That kind of "see what sticks" experimentation is what led to the diverse writing systems we have today.

That said, making these innovative layouts serve their purpose (as visually dazzling as they might be) is a mountain to climb on its own. [Andy Barefoot](http://andybarefoot.com/) is a prime example of someone who specializes in eccentric layouts, and making them semantic, accessible, and user-friendly.