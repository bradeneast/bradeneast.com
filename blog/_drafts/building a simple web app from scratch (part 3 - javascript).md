# Building a simple web app from scratch (part 3 - javascript)
## 2019/08/20
### design, html, css, javascript

This is part three of me building a simple web app from scratch, to show that building cool tools on the web doesn't have to be hard or complex! You can read part two [here](/blog/building-a-simple-web-app-from-scratch-part-2--html-and-css).

In this article, we'll write basic markup and CSS as handles for our Javascript to grab ahold of later. Let's make this app really work!

The first problem we run into is that our icon library is 55,000 lines of JSON. That's way too much to loop through every time the user updates their copy. Leaving the data as-is would come at a massive cost to browser performance and user experience.

![panting gif](/images/blog/panting.gif)

To solve this problem, we can create a much smaller array of search terms as our page is first being loaded. Fontawesome's library comes with search terms attached to each icon, which is exactly what we need to match icons to words in the text box.

 So, we'll `Array.map()` over the array of all our icons, let's call it `bigAF`.

 P.S. Fontawesome has the library set up as an object, so we're using `Object.values()` to treat it like an array.

 P.P.S I recently learned that `Array.map()` is usually more performant that `Array.forEach()`.

```javascript
let bigAF = [];
let iconSearchTerms = [];

fetch(`/icons.json`)
    .then(r => r.json())
    .then(data => {
        Object.values(data).map((icon, index) => {
            icon.index = index;
            bigAF.push(icon);
            icon.search.terms.map(term => {
                let searchTerm = {
                    'term': '',
                    'index': ''
                }
                searchTerm.term = term;
                searchTerm.index = index;
                iconSearchTerms.push(searchTerm);
            })
        });
    })
```