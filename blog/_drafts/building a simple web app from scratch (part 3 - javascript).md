# Building a simple web app from scratch (part 3 - javascript)
## 2019/08/20
### design, html, css, javascript

Let's make this app really work!

The first problem we run into is that our icon library is 55,000 lines of JSON. We'll call it the `bigArray`. That's way too much to loop through every time the user updates their copy. Leaving the data as-is would come at a massive cost to browser performance and user experience.

![panting gif](/images/blog/panting.gif)

To solve this problem, we can create an array of search terms as our page is first being loaded. Fontawesome's library comes with search terms attached to each icon, which is exactly what we need to match icons to words in the text box.

So, we create our array of search terms, and add the index where that term was found in the big array.

```javascript
let bigArray = [];
let iconSearchTerms = [];

fetch(`/icons.json`)
    .then(r => r.json())
    .then(data => {
        Object.values(data).map((icon, index) => {
            icon.index = index;
            bigArray.push(icon);
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