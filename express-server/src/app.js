const express = require('express')
const router = require('./routes/router')
const cache = require('./routes/cache')
const base = require('./routes/base')

const app = express()

//* static
app.use('/static', express.static(__dirname + '/static'))

//* ejs
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//* middleware
const logger = (req, res, next) => {
    console.log('log')
    next()
}
const requestTime = (req, res, next) => {
    req.requestTime = Date.now()
    next()
}
app.use(logger, requestTime)
app.use('/user/:id', (req, res, next) => {
    console.log('Requested method: ' + req.method)
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//* router
app.use('/form', router)
app.use('/cache', cache)
app.use('/base', base)

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
