const fs = require('fs')
const path = require('path')
const url = require('url')

const mimePath = './src/node-base/data/mime.json'
const getFileMime = function (extname) {
    const data = fs.readFileSync(mimePath)
    const mimeObj = JSON.parse(data.toString())
    return mimeObj[extname]
}

exports.static = function (req, res, staticPath) {
    const filename = req.url === '/' ? 'index.html' : req.url
    const extname = path.extname(filename)
    if (extname) {
        if (filename !== '/favicon.ico') {
            try {
                const data = fs.readFileSync(staticPath + filename)
                if (data) {
                    const mime = getFileMime(extname)
                    res.writeHead(200, { 'Content-Type': '' + mime + ';charset=utf-8' })
                    res.end(data)
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                    res.end('404 Not Found')
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}
