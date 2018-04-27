import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.render('auth/login')
})

export default route
