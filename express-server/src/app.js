const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()

//* session
app.use(session({
    secret: 'express server session',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60
    },
    rolling: true
}))

//* cookie
app.use(cookieParser())

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

app.get('/', (req, res) => {
    res.cookie('name', 'John')
    res.send('Home')
    // res.render('index', { title: 'Home', message: 'Home Page' })
})

app.get('/cookie', (req, res) => {
    const name = req.cookies.name
    res.send('cookie viewed by ' + name)
})

app.get('/login', (req, res) => {
    req.session.name = 'John'
    res.send('login')
})

app.get('/session', (req, res) => {
    if (req.session.name) {
        res.send(req.session.name + ' has login')
    } else {
        res.send('no one has login')
    }
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

//* base
app.get('/getTest', (req, res) => {
    res.send('getTest')
})

app.post('/postTest', (req, res) => {
    res.send('postTest')
})

app.put('/putTest', (req, res) => {
    res.send('putTest')
})

app.delete('/deleteTest', (req, res) => {
    res.send('deleteTest')
})

// 404
app.use((req, res, next) => {
    res.status(404).send('404 Not Found')
})

app.listen(3333)

console.log('Server running at http://localhost:3333/')
