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

#### Bonus
To inject the CSS as a string, we can bundle up a JS snippet that enables dark mode on any website or web app. Plus, we can use a custom activation code by passing in our own array of keys to be pressed.

```javascript
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const darkModeSuccess = 'Dark Mode unlocked. Repeat code to turn off.';
initDarkMode(konami, darkModeSuccess);

function initDarkMode(code, successMessage) {
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = 'body.dark-mode{background:currentColor}body.dark-mode h1,body.dark-mode h2,body.dark-mode h3,body.dark-mode h4,body.dark-mode h5,body.dark-mode p,body.dark-mode ul,body.dark-mode ol,body.dark-mode p img,body.dark-mode ul img,body.dark-mode ol img{filter:invert(1)}body.dark-mode ul h1,body.dark-mode ul h2,body.dark-mode ul h3,body.dark-mode ul h4,body.dark-mode ul h5,body.dark-mode ul p,body.dark-mode ol h1,body.dark-mode ol h2,body.dark-mode ol h3,body.dark-mode ol h4,body.dark-mode ol h5,body.dark-mode ol p{filter:none}';
    document.head.appendChild(darkModeStyles);

    let current = 0;
    let darkModeOn = JSON.parse(localStorage.getItem('darkModeOn')) || false;

    if (darkModeOn) { document.body.classList.toggle('dark-mode') };

    document.addEventListener('keydown', function (e) {
        if (code.indexOf(e.key) < 0 || e.key !== code[current]) { current = 0; return; }
        current++;
        if (code.length === current) {
            if (darkModeOn) {
                darkModeOn = false;
            } else {
                darkModeOn = true;
                window.alert(successMessage);
            }
            current = 0;
            localStorage.setItem('darkModeOn', darkModeOn);
            document.body.classList.toggle('dark-mode');
        }
    })
}
```

P.S. <button onclick="toggleDarkMode">Don't CLick Me</button>

P.P.S. Thanks to [Chris Ferdinandi](https://gomakethings.com) for the concise key handler logic!