const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('baseTest')
})

router.get('/getTest', (req, res) => {
  res.send('getTest')
})

router.post('/postTest', (req, res) => {
  res.send('postTest')
})

router.put('/putTest', (req, res) => {
  res.send('putTest')
})

router.delete('/deleteTest', (req, res) => {
  res.send('deleteTest')
})

router.get('/query', (req, res) => {
  const query = req.query
  console.log(query)
  res.send('query')
})

router.get('/params/:id', (req, res) => {
  const id = req.params['id']
  res.send('params id = ' + id)
})

router.get('/about', (req, res) => {
  const message = 'ejs test about'
  res.render('about', { message: message })
})

module.exports = router
