const express = require('express')
const cookie = require('./cookie')
const session = require('./session')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('cache page')
})

router.use('/cookie', cookie)
router.use('/session', session)

module.exports = router
