const http = require('http')
const routes = require('./routes/routes')

const staticPath = './src/node-base/static/'
http.createServer(function (request, response) {
    routes.static(request, response, staticPath)
}).listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
