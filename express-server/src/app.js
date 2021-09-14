const express = require('express')
const form = require('./routes/form')
const cache = require('./routes/cache')
const base = require('./routes/base')
const middleware = require('./routes/middleware')
const upload = require('./routes/upload')

const app = express()

//* static
const staticPath = __dirname + '/static'
app.use('/static', express.static(staticPath))

//* ejs
// app.set('view engine', 'pug')
app.set('view engine', 'ejs')
const viewPath = __dirname + '/views'
app.set('views', viewPath)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//* router
app.use('/base', base)
app.use('/cache', cache)
app.use('/middleware', middleware)
app.use('/form', form)
app.use('/upload', upload)

app.get('/', (req, res) => {
    res.send('Home')
    // res.render('index', { title: 'Home', message: 'Home Page' })
})

//* 404
app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
})

app.listen(3333)

console.log('Server running at http://localhost:3333/')
