const Router = require('koa-router')

const router = new Router({ prefix: '/test' })

router.get('/', (ctx, next) => {
    ctx.body = '一个测试GET请求';
})

router.post('/', (ctx, next) => {
    ctx.body = ctx.request.body;
})

module.exports = router;