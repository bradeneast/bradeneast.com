const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const images = './imagesTest/*.jpg';
const imageDestination = './imagesTest/webp';


// Convert images to webp
(async () => {
    const optimizedImages = await imagemin([images], imageDestination, {
        use: [
            imageminWebp({ quality: 75 })
        ]
    });

    console.log(optimizedImages);
})();