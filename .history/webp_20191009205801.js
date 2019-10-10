const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const images = './imagesTest/*.jpg';
const imageDestination = './imagesTest/webp';


// Convert images to webp
(async () => {
    await imagemin([images], imageDestination, {
        use: [
            imageminWebp({ quality: 75 })
        ]
    });

    console.log('Images optimized');
})();