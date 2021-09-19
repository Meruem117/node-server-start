const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')

const app = new Koa()
const router = new Router()

//* views
const viewsPath = __dirname + '/views'
app.use(views(viewsPath, {
  extension: 'ejs'
}))
app.use(async (ctx, next) => {
  ctx.state = {
    session: this.session,
    name: 'John'
  }
  await next()
})

//* middleware
app.use(async (ctx, next) => {
  console.log('p1')
  await next()
  console.log('p2')
})

router.get('/', async (ctx) => {
  ctx.body = "Home Page"
})

router.get('/user/:id', async (ctx) => {
  console.log(ctx.params)
  const id = ctx.params.id
  ctx.body = 'User ' + id
})

router.get('/get', async (ctx) => {
  console.log(ctx.query)
  console.log(ctx.querystring)
  console.log(ctx.request.url)
  ctx.body = 'get value'
})

router.get('/about', async (ctx) => {
  const message = 'ejs test'
  const d = '<h2>test</h2>'
  await ctx.render('about', {
    message,
    dom: d
  })
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.use(async (ctx, next) => {
  console.log(new Date().toLocaleString())
  await next()
  if (ctx.status === 404) {
    ctx.status = 404
    ctx.body = '404 Not Found'
    console.log(404)
  } else {
    console.log(200)
  }
})

app.listen(3333, () => {
  console.log('Server running at http://127.0.0.1:3333/')
})
