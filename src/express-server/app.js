const express = require('express')

const app = express()

app.get('/', (request, response) => {
    response.send('首页')
})

app.listen(3333)

console.log('Server running at http://localhost:3333/')
