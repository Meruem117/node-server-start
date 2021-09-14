const express = require('express')

const router = express.Router()

const logger = (req, res, next) => {
  console.log('log')
  next()
}

const requestTime = (req, res, next) => {
  req.requestTime = Date.now()
  next()
}

router.use(logger, requestTime)

router.use('/method', (req, res, next) => {
  console.log('Requested method: ' + req.method)
  next()
})

router.get('/', (req, res) => {
  res.send('middleware test')
})

router.get('/time', (req, res) => {
  const text = `Requested at ${req.requestTime}`
  res.send(text)
})

router.get('/method', (req, res) => {
  res.send('method test')
})

module.exports = router
