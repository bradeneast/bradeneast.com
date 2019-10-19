# Quirks of `<noscript>`
## 2019/10/20
### javascript, html, accessibility

> a fun fact

1. It seems as though different browsers treat `<noscript>` in the `<head>` differently.

    In Chrome, `<noscript>` content in the `<head>` element will end up right after the opening `<body>` tag. it’s best to place your `<noscript>` content in the `<body>` from the start. This also gives you more control over exactly where that content ends up.

2. `<noscript>` elements are block-level, so they can’t be used inline. If it’s really necessary, you could put a display of flex on the parent.

https://ohgm.co.uk/breaking-head-quietly/
https://htmlparser.info/parser/#noscript