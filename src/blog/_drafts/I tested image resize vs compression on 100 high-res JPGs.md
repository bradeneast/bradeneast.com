<meta name="categories" content="media, performance, accessibility">
<meta name="media" content="/_assets/media/person-holding-a-dslr-camera.jpg">

I wanted to compare the impact on file size of


## Control group
- 100 JPG images from the [Unsplash homepage](https://unsplash.com).
- Minimum dimension: > 2000 pixels
- Maximum dimension: < 8000 pixels


## Group A
### Photoshop Settings:
- Compression level: Max || Roughly 92% compression / 8% quality
- Resized to: 4096 (4k) maximum dimension


## Group B
### Photoshop Settings:
- Compression level: Very High || Roughly 83% compression / 17% quality
- Resized to: 4096 (4k) maximum dimension


## Group C
### Photoshop Settings:
- Compression level: Very Low || Roughly 17% compression / 83% quality
- Resized to: 1280 maximum dimension



Result: Compression has a much greater effect on file size than decreasing dimensions (resizing).