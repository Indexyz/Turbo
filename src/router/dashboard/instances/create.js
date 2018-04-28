import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.render('dashboard/instances/create')
})

export default route
