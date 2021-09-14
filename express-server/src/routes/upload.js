const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const uploadPath = path.resolve(__dirname, '../static/upload')
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath)
  },
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname)
    callback(null, Date.now() + extname)
  }
})
const upload = multer({ storage: storage })

router.get('/', (req, res) => [
  res.render('upload', {})
])

router.post('/pic', upload.single('pic'), (req, res) => {
  res.send({
    body: req.body,
    file: req.file
  })
})

module.exports = router
