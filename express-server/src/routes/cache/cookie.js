const express = require('express')
const cookieParser = require('cookie-parser')

const router = express.Router()

router.use(cookieParser())

router.get('/', (req, res) => {
  res.cookie('name', 'John')
  res.send('set cookie')
})

router.get('/res', (req, res) => {
  const name = req.cookies.name
  res.send('get cookie ' + name)
})

module.exports = router
