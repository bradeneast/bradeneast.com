# You're probably using classList.toggle() wrong
## 2019/11/18
### javascript, css

```javascript
function toggleClass(element, className, condition) {
    if (condition == undefined) element.classList.toggle(className);
    else element.classList.toggle(className, condition);
    return element;
}
```