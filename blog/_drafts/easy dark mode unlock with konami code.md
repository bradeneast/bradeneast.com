# Spice up your web project with a Konami code-unlocked dark mode
## 09/14/2019
### ui, css, javascript

Fact of the day: The James Bond character is based on real WWII spy, Dusan Popov. Today, let's spice up our web project with a Konami-unlocked, dark mode easter egg for the gamers out there.

[Here's the demo on CodePen.](https://codepen.io/bradeneast/pen/vYBrvbK)

#### Summary
Toggle a CSS class of 'dark-mode' on the `body` element when a series of `keydown` events happens in the right order.

#### Code
To set up this feature in our project, we'll need a few lines of CSS that will change the background of our site and apply an `invert()` filter to everything but images.

#### Bonus
Here's a JS snippet that will enable this hidden dark mode feature on your website or web app. Plus, you can use a cuustom code by passing in your own array of keys to be pressed.

```javascript
const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const darkModeSuccess = 'Dark Mode unlocked. Repeat code to turn off.';

function initDarkMode(code, successMessage) {

    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = 'body.dm{background:currentColor}body.dm h1,body.dm h2,body.dm h3,body.dm h4,body.dm h5,body.dm p,body.dm ul,body.dm ol,body.dm p img,body.dm ul img,body.dm ol img{filter:invert(100%)}body.dm ul h1,body.dm ul h2,body.dm ul h3,body.dm ul h4,body.dm ul h5,body.dm ul p,body.dm ol h1,body.dm ol h2,body.dm ol h3,body.dm ol h4,body.dm ol h5,body.dm ol p{filter:none}';
    document.head.appendChild(darkModeStyles);

    let current = 0;
    let darkModeOn = JSON.parse(localStorage.getItem('darkModeOn')) || false;

    darkModeOn ? document.body.classList.toggle('dm') : null;

    document.addEventListener('keydown', function (e) {
        if (code.indexOf(e.key) < 0 || e.key !== code[current]) {
            current = 0;
            return;
        }

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

initDarkMode(konami, darkModeSuccess);
```
P.S. Thanks to [Chris Ferdinandi](https://gomakethings.com) for the concise konami code keyHandler function!