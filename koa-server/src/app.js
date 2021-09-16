const koa = require('koa')

const app = new koa()

app.use(async (ctx) => {
  ctx.body = 'hello koa'
})

app.listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
