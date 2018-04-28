import router from 'koa-router'
import create from './create'
const route = router()

route.get('/', async ctx => {
    ctx.render('dashboard/instances/index')
})

route.use('/create', create.routes(), create.allowedMethods())

export default route
