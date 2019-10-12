# Image formats for the web: the good, the bad, and the not yet
## 2019/10/11
### design, html, performance

#### The Good

1. SVG (Scalable Vector Graphic)
SVG wins on every account for logos, patterns... pretty much anything flat and relatively simple.

2. PNG (Portable Network Graphic)
PNG is an extremely useful format for dealing with
I go back and forth between 8-bit PNG and JPG with medium compression.

3. WebP ()


#### The Bad

1. GIF (Graphics Interchange Format)

#### At time of writing...
In the future, I may move to WebP instead of JPG, but it's just not mainstream enough yet.  Photoshop doesn't have good plugins for exporting to WebP, and it's still necessary to provide fallbacks for [several browsers](https://caniuse.com/#search=webp). I've experimented with using [imagemin](https://github.com/imagemin/imagemin) to convert images during my site build, but didn't feel comfortable its dependencies and complexities.