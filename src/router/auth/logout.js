import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.logout()
    ctx.redirect('/')
})

export default route
