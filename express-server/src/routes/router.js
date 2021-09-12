const express = require('express')

const router = express.Router()

router.get('/form', (req, res) => {
  res.render('form', {})
})

router.post('/login', (req, res) => {
  const body = req.body
  console.log(req)
  // res.send(body.username + ' login')
  res.send('login')
})

module.exports = router
