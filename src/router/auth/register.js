import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.render('auth/register')
})

export default route
