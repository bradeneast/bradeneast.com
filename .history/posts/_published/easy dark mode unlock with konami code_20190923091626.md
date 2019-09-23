# Easily add a dark mode easter egg to any website or web app
## 2019/19/09
### ui, css, javascript

Fact of the day: James Bond is based on real WWII spy, Dusan Popov. Today, let's spice up our web project with a dark mode easter egg, unlocked with a secret code.

[Here's the demo on CodePen.](https://codepen.io/bradeneast/pen/vYBrvbK)

#### tl;dr
Toggle a CSS class on the `body` element that inverts your color palette!

![That's Dark! A gif.](/_images/blog/thats-dark.gif)

#### Code
To set up this feature in our project, we'll need a few lines of CSS that will change the background of our site and apply an `invert()` filter to everything.



```css
body.dm {
    background: currentColor;
    filter: invert(1);
}
```

We could just throw this on and call it good. But we're not going to settle for mediocre tricks, are we? Let's make this a 'smart' dark mode, to imitate a popular iOS feature. For the dark mode to be smart, it needs to ignore images, only inverting things like typography and background colors.

```css
body.dm {
    background: currentColor;
}

body.dm h1,
body.dm h2,
body.dm h3,
body.dm h4,
body.dm h5,
body.dm p,
body.dm ul,
body.dm ol,
body.dm p img,
body.dm ul img,
body.dm ol img {
    filter: invert(1)
}

body.dm ul h1,
body.dm ul h2,
body.dm ul h3,
body.dm ul h4,
body.dm ul h5,
body.dm ul p,
body.dm ol h1,
body.dm ol h2,
body.dm ol h3,
body.dm ol h4,
body.dm ol h5,
body.dm ol p {
    filter: none
}
```

#### Bonus
By injecting this CSS as a string, we can bundle up a JS snippet that enables the hidden dark mode feature on any website or web app. Plus, we can use a custom activation code by passing in our own array of keys to be pressed.

```javascript
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const darkModeSuccess = 'Dark Mode unlocked. Repeat code to turn off.';
initDarkMode(konami, darkModeSuccess);

function initDarkMode(code, successMessage) {
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = 'body.dm{background:currentColor}body.dm h1,body.dm h2,body.dm h3,body.dm h4,body.dm h5,body.dm p,body.dm ul,body.dm ol,body.dm p img,body.dm ul img,body.dm ol img{filter:invert(1)}body.dm ul h1,body.dm ul h2,body.dm ul h3,body.dm ul h4,body.dm ul h5,body.dm ul p,body.dm ol h1,body.dm ol h2,body.dm ol h3,body.dm ol h4,body.dm ol h5,body.dm ol p{filter:none}';
    document.head.appendChild(darkModeStyles);

    let current = 0;
    let darkModeOn = JSON.parse(localStorage.getItem('darkModeOn')) || false;

    if (darkModeOn) { document.body.classList.toggle('dm') };

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
            document.body.classList.toggle('dm');
        }
    })
}
```

P.S. Thanks to [Chris Ferdinandi](https://gomakethings.com) for the konami idea and concise key handler logic!