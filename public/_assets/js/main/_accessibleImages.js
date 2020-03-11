// get alt attribute from img src
var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {

    var img = images[i];

    addClass(img.parentElement, 'has-img');
    altFromSrc(img);

}