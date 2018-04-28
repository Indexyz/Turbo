import router from 'koa-router'
import dashboard from './dashboard'
import auth from './auth'
const route = router()

route.get('/', async ctx => {
    ctx.render('index')
})

route.use('/dashboard', dashboard.routes(), dashboard.allowedMethods())
route.use('/auth', auth.routes(), auth.allowedMethods())

export default route
