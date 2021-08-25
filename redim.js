const Jimp = require('jimp')

Jimp.read('images/igor.png', (err, image) => {
    if (err){
        console.log('error', err)
        return
    }
    image
        //.scaleToFit(100, 100)
        .cover(50, 50)
        //.grayscale()
        .contrast(0.5)
        .blur(1)
        .write('images/temp.png')
})