import router from 'koa-router'
const route = router()

route.get('/', async ctx => {
    ctx.render('index', {
        name: 'koa',
    })
})

export default route
