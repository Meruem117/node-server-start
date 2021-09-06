const http = require('http')
const ejs = require('ejs')
const path = require('path')
const url = require('url')
const qs = require('querystring')
const routes = require('./routes/routes')

const baseUrl = 'http://127.0.0.1:3333/'
const basePath = './src/node-base'
http.createServer(function (request, response) {
    routes.static(request, response, basePath + '/static/')
    const pathname = new url.URL(request.url, baseUrl).pathname
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
        } else if (pathname === '/news') {
            const query = new url.URL(request.url, baseUrl).searchParams
            console.log(query)
            console.log(query.get('id'))
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end('get')
        } else if (pathname === '/form') {
            ejs.renderFile(basePath + '/views/form.ejs', {}, (err, data) => {
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                response.end(data)
            })
        } else if (pathname === '/regist') {
            let postData = ''
            request.on('data', (chunk) => {
                postData += chunk
            })
            request.on('end', () => {
                const res = qs.parse(postData)
                console.log(res)
                console.log(res.username)
                response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
                response.write('post')
                response.end(postData)
            })
        } else {
            response.writeHead(404, { 'Content-Type': 'text/html;charset=utf-8' })
            response.end("404 Not Found")
        }
    }
}).listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
