const http = require('http')
const ejs = require('ejs')
const path = require('path')
const routes = require('./routes/routes')

const basePath = './src/node-base'
http.createServer(function (request, response) {
    routes.static(request, response, basePath + '/static')
    const pathname = request.url === '/' ? 'index.html' : request.url
    const extname = path.extname(pathname)
    if (!extname) {
        if (pathname === '/login') {
            const message = "welcome to login page"
            const list = [
                { title: 'title1' },
                { title: 'title2' },
                { title: 'title3' }
            ]
            ejs.renderFile(basePath + '/views/login.ejs', {
                message: message,
                list: list
            }, (err, data) => {
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                response.end(data)
            })
        } else if (pathname == '/regist') {
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end("regist")
        } else if (pathname == '/admin') {
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end("admin")
        } else {
            response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end("404 Not Found")
        }
    }
}).listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
