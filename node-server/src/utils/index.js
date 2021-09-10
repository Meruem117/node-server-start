const fs = require('fs')
const { basePath } = require('../constant')

function getContentType(extname) {
    switch (extname) {
        case '.html':
            return 'text/html'
        case '.css':
            return 'text/css'
        case '.js':
            return 'text/javascript'
        default:
            return 'text/plain'
    }
}

function getFileMime(extname) {
    return new Promise((resolve, reject) => {
        fs.readFile(basePath + '/data/mime.json', (err, data) => {
            if (err) {
                console.error(err)
                reject(err)
                return
            }
            const mimeObj = JSON.parse(data.toString())
            console.log(mimeObj[extname])
            resolve(mimeObj[extname])
        })
    })
}

module.exports = {
    getContentType,
    getFileMime
}
