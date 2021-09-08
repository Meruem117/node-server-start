const http = require('http')
const ejs = require('ejs')
const app = require('./index')
const { basePath } = require('../constant')

http.createServer(app).listen(3222)

app.get('/', function (request, response) {
    response.send('首页')
})

app.get('/form', function (request, response) {
    ejs.renderFile(basePath + '/views/form.ejs', {}, (error, data) => {
        response.send(data)
    })
})

app.post('/regist', function (request, response) {
    response.send(request.body)
})

console.log('Server running at http://127.0.0.1:3222/')
