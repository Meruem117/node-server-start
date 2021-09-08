const http = require('http')
const path = require('path')
const url = require('url')
const app = require('./index')
const { basePath, baseUrl } = require('./constant')

http.createServer(app).listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
