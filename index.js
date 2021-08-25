const Jimp = require('jimp')
const multer = require('multer')
const express = require('express')

const empresas = [
    {id: 1, nome: 'Teste 1', tel: '123'},
    {id: 2, nome: 'Teste 2', tel: '456'},
    {id: 3, nome: 'Teste 3', tel: '789'},
    {id: 4, nome: 'Teste 4', tel: '159'}
]



const genImage = async(text) => {
    const image = await new Jimp(200, 16)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    image.print(font, 0, 0, text)
    //await image.write('treku.png')
    return image
}

//genImage()

const app = express()
app.set('view engine', 'ejs')

app.get('/image/:index', async(req, res) => {
    const image = await genImage(empresas[req.params.index].tel)
    const buffer = await image.getBufferAsync(Jimp.MIME_PNG)
    res.header('Content-Type', 'image/png')
    res.send(buffer)

})


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const fn = Date.now() + '-' + file.originalname
        cb(null, fn)
    }
})

//const upload = multer({dest:'uploads'})
const upload = multer({storage})

app.get('/upload', (req, res) => {
    res.render('upload')
})

app.post('/upload', upload.single('img'), (req, res) => {
    //res.render('upload')
    console.log(req.body)
    console.log(req.file)
    res.send('ok')
})

app.get('/', (req, res) => {
    res.render('index', {empresas})
})

app.listen(3000, (err) => {
    if (err) {
        console.log('error', err) 
    } else {
        console.log('server online')
    }
})

