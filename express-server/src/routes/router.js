const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('form', {})
})

router.post('/login', (req, res) => {
  const body = req.body
  console.log(body)
  res.send(body.username + ' login')
})

module.exports = router
