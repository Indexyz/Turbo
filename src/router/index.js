import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.body = {
        message: 'Hello, Koa',
    }
})

export default route
