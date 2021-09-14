const express = require('express')
const session = require('express-session')

const router = express.Router()

router.use(session({
  secret: 'express server session',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60
  },
  rolling: true
}))

router.get('/', (req, res) => {
  req.session.name = 'John'
  res.send('set session')
})

router.get('/res', (req, res) => {
  res.send('get session ' + req.session.name)
})

module.exports = router
