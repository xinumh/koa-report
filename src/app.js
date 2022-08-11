const Koa = require('koa');
const render = require('./render')
const app = new Koa();


app.use(async ctx => {
  // ctx.body = 'hello world'
  ctx.body = toString(render(ctx))
});

app.listen(3000);
console.log('app', app)
console.log(`App listening on http://localhost:3000`);