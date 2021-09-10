const express = require('express')

const app = express()

//* base
app.get('/', (request, response) => {
    response.send('首页')
})

app.get('/getTest', (request, response) => {
    response.send('getTest')
})

app.get('/getTest/test', (request, response) => {
    response.send('getTest/test')
})

app.get('/getTest/:id', (request, response) => {
    const id = request.params['id']
    response.send('id = ' + id)
})

app.get('/product', (request, response) => {
    const query = request.query
    console.log(query)
    response.send('product')
})

app.post('/postTest', (request, response) => {
    response.send('postTest')
})

app.put('/putTest', (request, response) => {
    response.send('putTest')
})

app.delete('/deleteTest', (request, response) => {
    response.send('deleteTest')
})

//* ejs
app.set('view engine', 'ejs')

app.get('/home', (request, response) => {
    const message = 'ejs test'
    response.render('home', { message: message })
})

app.listen(3333)

console.log('Server running at http://localhost:3333/')
