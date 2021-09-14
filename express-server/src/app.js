const express = require('express')
const form = require('./routes/form')
const cache = require('./routes/cache')
const base = require('./routes/base')
const middleware = require('./routes/middleware')

const app = express()

//* static
app.use('/static', express.static(__dirname + '/static'))

//* ejs
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//* router
app.use('/base', base)
app.use('/cache', cache)
app.use('/middleware', middleware)
app.use('/form', form)

app.get('/', (req, res) => {
    res.send('Home')
    // res.render('index', { title: 'Home', message: 'Home Page' })
})

app.get('/about', (req, res) => {
    const message = 'ejs test about'
    res.render('about', { message: message })
})

app.get('/product', (req, res) => {
    const query = req.query
    console.log(query)
    res.send('product')
})

app.get('/user/:id', (req, res) => {
    const id = req.params['id']
    res.send('id = ' + id)
})

app.get('/time', (req, res) => {
    const text = `Requested at ${req.requestTime}`
    res.send(text)
})

// 404
app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
})

app.listen(3333)

console.log('Server running at http://localhost:3333/')
