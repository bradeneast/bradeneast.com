<meta name="categories" content="media, performance, accessibility">
<meta name="created" content="04/30/2020">
<meta name="media" content="/_assets/media/person-holding-a-DSLR-camera.jpg">

What is the best way, objectively, to reduce the file size of an image for the web? Let's get scientific today, and do some quantitative testing.

For the last decade or so, the standard for large images has been ~1920x1080 pixels with medium compression, weighing in around 250kb-400kb. That's changing quickly. In a few years, everything will have a 4k or 8k display. When I switched to a 4k monitor, I immediately noticed that most images on the web are too small for these displays. In fact, finding a "sharp at 4k" image online is rare.*

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

### Max Compression @4096 (4k) Group
- Avg. file size: 345kb || ~86% reduction
- Artifacting at 4k: High
- Blurring at 4k: None


### No Compression @1920 Group
- Avg. file size: 947kb || ~65% reduction
- Artifacting at 4k: None
- Blurring at 4k: Moderate



###  Heavy Compression @2880 Group
- Avg. file size: 294kb || ~89% reduction
- Artifacting at 4k: Moderate
- Blurring at 4k: Low



While it was easy to spot artifacting in heavily compressed photos with large swaths of color and gradients, most images did incredibly well. Even when JPG images were compressed into oblivion, their first-glance appearance held up remarkably well. Most looked exceptional. Aside from the Max Compression Group, every group was crisp and could even withstand some zoom in 4k before appearing distorted.

**Main takeaway: Compression has a much greater effect on file size than resizing (shrinking dimensions).**