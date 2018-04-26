import router from 'koa-router'
import auth from './auth'
const route = router()

route.get('/', async ctx => {
    ctx.render('index')
})

route.use('/auth', auth.routes(), auth.allowedMethods())

export default route
