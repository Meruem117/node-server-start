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

router.use('/user/:id', (req, res, next) => {
  console.log('Requested method: ' + req.method)
  next()
})

module.exports = router
