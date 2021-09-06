const fs = require('fs')

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
        fs.readFile('./src/node-base/data/mime.json', (err, data) => {
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
