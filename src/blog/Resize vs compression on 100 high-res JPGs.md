<meta name="categories" content="media, performance">
<meta name="created" content="04/30/2020">
<meta name="media" content="/_assets/media/person-holding-a-DSLR-camera.jpg">

What is the best way, objectively, to reduce the file size of a JPG image for the web? Let's get scientific today, and do some quantitative testing.

For the last decade or so, the standard for large images has been 1920px wide with medium lossy compression, usually weighing in at 300kb-400kb. That's changing quickly. In a few years, everything will have a 4k or 8k display. When I switched to a 4k monitor, I immediately noticed that most images on the web are too small for these displays. In fact, finding a "sharp at 4k" image online is rare.*

**Don't forget the occasional 6mb image that nobody bothered to optimize.*

That said, is there a way to squeeze more mileage out of high-res images for the web? That's what I wanted to find out, so I tested the two most common optimizations: Compression and Resizing.


## Control group
- 100 JPG images from the [Unsplash homepage](https://unsplash.com)
- Landscape and portrait orientations
- Wide variety of subjects, color ranges, noise levels, and dark/light areas
- Minimum dimension: 4096 pixels (4k)
- Maximum dimension: 4096 pixels (4k)
- Avg. file size: 2,510kb

To test so many images programmatically, I used Photoshop's Image Processor. I'm honestly amazed that I have used Photoshop this long without knowing of it. The use cases are endless.


## Results
| Test Group            | A    | B    | C     |
| --------------------- | ---- | ---- | ----- |
| Resized to (px)     | 4096 | 1080 | 2880  |
| Compression level   | Max  | None | Heavy |
| Avg. file size (kb) | 345  | 397  | 294   |
| % of original       | 14%  | 16%  | 11%   |
| Artifacting (at 4k) | High | None | Low   |
| Blurring (at 4k)    | None | High | Low   |


While it was easy to spot artifacting in heavily compressed photos with large swaths of color and gradients, most images did incredibly well. Even when JPG images were compressed into oblivion, their first-glance appearance held up remarkably well. Most looked exceptional. Aside from the Max Compression Group, every group was crisp and could even withstand some zoom in 4k before appearing distorted.


## Takeaways

### 1. Compression and resizing affect file size to a similar extent
Resizing images to 1080px (~25% of their original size) resulted in an 84% smaller file size. This was very close to the resulting 86% reduction in size from compression. **This means that 4k images are easy to serve at *no increase in size* if you're willing to accept some artifact noise.**

### 2. Compromise is still better if you can afford it
If you're able, find a combination of resizing compression that best suits your needs. If you have to choose between the two, compression will give you more bang for your buck. This assumes the image is large enough to begin with.