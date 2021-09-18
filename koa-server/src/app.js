const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/', (ctx, next) => {
  ctx.body = "Home Page"
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3333)

console.log('Server running at http://127.0.0.1:3333/')
