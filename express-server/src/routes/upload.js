const express = require('express')
const multer = require('multer')
const path = require('path')
const mkdirp = require('mkdirp')

const router = express.Router()

const uploadPath = path.resolve(__dirname, '../static/upload')
const storage = multer.diskStorage({
  destination: async (req, file, callback) => {
    const date = new Date().toLocaleDateString().replace(/\//g, '')
    const dir = path.join(uploadPath, date)
    await mkdirp(dir)
    callback(null, dir)
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
  // res.send({
  //   body: req.body,
  //   file: req.file
  // })
  res.send('upload successfully')
})

module.exports = router
