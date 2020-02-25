# Images for the web
## 2019/10/11
### design, html, performance

#### The Good

1. SVG (Scalable Vector Graphic)
SVG wins on every account for logos, patterns... pretty much anything not photographic.

2. PNG (Portable Network Graphic)
Stick to PNG for uploading to social media.  Facebook, Twitter, and Instagram's image compression puts out super artifacty JPGs.

For file size, 8-bit PNG and JPG with medium compression will be very similar, depending on the contents of the image.  In general, the noiser the photo, the better JPG compression will work. 8-bit PNG wins out when there are large swaths of color in the image.

3. WebP ()
Honestly the best for performance and quality, but not well-supported yet.  If you're in a position to easily provide a JPG or PNG fallback for older browsers, absolutely use WebP!  I've experimented with using [imagemin](https://github.com/imagemin/imagemin) to convert images during my site build, but didn't feel comfortable its dependencies and complexities.

4. GIF (Graphics Interchange Format)
Very few use cases. MP4 will give you 1/2 to 1/6 the file size with the additional control HTML `video` elements provide.