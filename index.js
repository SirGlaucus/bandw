const http = require('http')
const url = require('url')
const fs = require('fs')
const Jimp = require('jimp')


http.createServer((req, res) => {
    // 2. El servidor debe disponibilizar una ruta raíz que devuelva un HTML con el formulario
    // para el ingreso de la URL de la imagen a tratar.
    if (req.url == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile('index.html', 'utf8', (err, html) => {
            res.end(html)
        })
    }

    // 3. Los estilos de este HTML deben ser definidos por un archivo CSS alojado en el servidor.
    if (req.url == '/estilos') {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        fs.readFile('estilos.css', (err, css) => {
            res.end(css)
        })
    }

    // 4. El formulario debe redirigir a otra ruta del servidor que deberá procesar la imagen
    // tomada por la URL enviada del formulario con el paquete Jimp.

    if (req.url.includes('/cambiar-imagen')) {
        const parametros = url.parse(req.url, true).query
        const imagenUrl = parametros.url
        Jimp.read(`${imagenUrl}`, (err, imagen) => {
            imagen
                .resize(350, Jimp.AUTO) // y redimensionada a unos 350px de ancho.
                .greyscale() // La imagen debe ser procesada en escala de grises
                .quality(60) // con calidad a un 60%
                .writeAsync('newimg.jpg')
                .then(() => {
                    fs.readFile('newimg.jpg', (err, Imagen) => {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                        res.end(Imagen)
                    })
                })
        })
    }
}).listen(3000, () => console.log('Servidor ON'))