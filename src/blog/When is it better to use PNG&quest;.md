<meta name="categories" content="media, performance">
<meta name="media" content="/_assets/media/polaroid-camera-on-a-shelf.jpg">
<meta name="created" content="May 1 2020">

I've been writing a lot about images on the web lately, but I haven't mentioned PNG format, or when PNG might be a better alternative to its lossy counterparts. Because PNG is a lossless format, it holds up much better to being scaled up, decoded/re-encoded, and modified, so it's worth taking a look at.

Obviously PNGs are good for transparency. SVG also offers transparency, but will quickly bloat as the complexity of the image increases. I ran some simple tests to find out if and when PNG is probably good choice for non-transparent images.

> The Portable Networks Graphic (PNG) compression algorithm was actually created as a replacement for GIF, which was patented and controlled by a large tech company. Open-source wins again!

## Test results (all values in kb)

All values shown in kilobytes (kb). Winners indicated for each test.

| Application    | JPG (no compression) | PNG   | PNG-8   | SVG   |
| -------------- | -------------------- | ----- | ------- | ----- |
| Logo Wordmark  | 40                   | 7     | **4**   | 8     |
| Flat Pattern   | 152                  | 35    | **17**  | 26    |
| Paragraph Text | 123                  | 18    | **10**  | 21    |
| Small Photo    | 186                  | 285   | **129** | 1327  |
| Large Photo    | **1,224**            | 2,742 | 1,317   | 1,327 |

## Takeaways

### 1. PNGs work well for flat designs
Flat designs like patterns and typography are a great application for PNG images. These compress well, and may in some cases be smaller than SVG. If it's a simple logo, SVG is probably a better option, because vectors.

### 2. 8-bit is better
In this simple study, 8-bit PNGs averaged 49% smaller than ordinary 24-bit PNGs. This was a significant reduction in the size of the image. Even with less colors, there wasn't a noticable difference in visual quality.