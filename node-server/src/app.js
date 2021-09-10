const http = require('http')
const path = require('path')
const url = require('url')
const routes = require('./routes/routes')
const { basePath, baseUrl } = require('./constant')

http.createServer(function (request, response) {
    routes.static(request, response, basePath + '/static/')
    const pathname = new url.URL(request.url, baseUrl).pathname
    const extname = path.extname(pathname)
    if (!extname) {
        try {
            const name = pathname.replace('/', '')
            routes[name](request, response)
        } catch (error) {
            routes['error'](request, response)
        }
    }
}).listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
