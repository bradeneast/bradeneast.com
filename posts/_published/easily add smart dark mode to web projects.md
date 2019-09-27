# Easily add a 'smart' dark mode to any website or web app
## 2019/09/23
### ui, css, javascript

Today, let's spice up our web project with a dark mode easter egg, unlocked with a secret code.

#### Fact of the day
James Bond is based on real WWII spy, Dusan Popov.

#### Code
To set up this feature in our project, we'll need a few lines of CSS that will change the background of our site and apply an `invert()` filter to everything when a dark-mode class is toggled on the `body` element.

![That's Dark! A gif.](/_images/blog/thats-dark.gif)

```css
body.dark-mode {
    filter: invert(1);
}
```

We could just throw this in our stylesheet and call it good. But we're not going to settle for that, are we? Let's make this a 'smart' dark mode, to imitate a popular iOS feature. For the dark mode to be smart, it needs to ignore images, only inverting things like typography and background colors.

```css
body.dark-mode {
    background: currentColor;
}

body.dark-mode h1,
body.dark-mode h2,
body.dark-mode h3,
body.dark-mode h4,
body.dark-mode h5,
body.dark-mode p,
body.dark-mode ul,
body.dark-mode ol,
body.dark-mode p img,
body.dark-mode ul img,
body.dark-mode ol img {
    filter: invert(1)
}

body.dark-mode ul h1,
body.dark-mode ul h2,
body.dark-mode ul h3,
body.dark-mode ul h4,
body.dark-mode ul h5,
body.dark-mode ul p,
body.dark-mode ol h1,
body.dark-mode ol h2,
body.dark-mode ol h3,
body.dark-mode ol h4,
body.dark-mode ol h5,
body.dark-mode ol p {
    filter: none
}
```

#### Javascript
To make this work, we need two functions - one that checks if dark mode is enabled on page load, and another that toggles dark mode when an event happens. We can use `JSON.parse()` to ensure that the darkModeOn value gets returned as the boolean `true`, not the string "true" when we get it from local storage.

```javascript
checkDarkMode();

function checkDarkMode() {
    let darkModeOn = JSON.parse(localStorage.getItem('darkModeOn')) || false;
    if (darkModeOn) { document.body.classList.add('dark-mode') }
}

function toggleDarkMode() {

    // If dark mode is on, turn off, otherwise, turn on
    darkModeOn ? darkModeOn = false : darkModeOn = true;

    // Store dark mode state in local storage
    localStorage.setItem('darkModeOn', darkModeOn);

    // Toggle dark mode class on the body
    document.body.classList.toggle('dark-mode');
}
```

P.S. <button onclick="toggleDarkMode()">Don't CLick Me</button>