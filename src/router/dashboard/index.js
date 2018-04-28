import router from 'koa-router'
import instances from './instances'
const route = router()

route.get('/', async ctx => {
    ctx.render('dashboard/index')
})

route.use('/instances', instances.routes(), instances.allowedMethods())

export default route
