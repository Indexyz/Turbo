import router from 'koa-router'
import auth from './auth'
const route = router()

route.get('/', async ctx => {
    ctx.render('index', {
        name: 'koa',
    })
})

route.use('/auth', auth.routes(), auth.allowedMethods())

export default route
