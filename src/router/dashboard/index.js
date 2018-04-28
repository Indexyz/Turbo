import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.render('dashboard/index')
})

export default route
