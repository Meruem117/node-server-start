const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const utils = require('./utils')

http.createServer(function (request, response) {
    console.log(request.url)
    const filename = request.url === '/' ? 'index.html' : request.url
    const extname = path.extname(filename)
    const contentType = utils.getContentType(extname)
    if (request.url !== '/favicon.ico') {
        fs.readFile('./src/node-base/static/' + filename, (err, data) => {
            if (err) {
                console.error(err)
                response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
                response.end('404 Not Found')
            }
            response.writeHead(200, { 'Content-Type': contentType })
            response.end(data)
        })
    }
    // response.writeHead(200, { 'Content-Type': 'text/plain' })
    // response.write('hello nodes')
    // response.end()
}).listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
