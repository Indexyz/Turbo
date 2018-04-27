import router from 'koa-router'
import passport from 'koa-passport'
const route = router()

route.get('/', async ctx => {
    ctx.render('auth/login')
})

route.post('/', async ctx => {
    passport.authenticate('local', {}, async (err, user, info) => {
        if (err) {
            ctx.status = 500
            return
        }

        if (!user) {
            ctx.status = 401
            ctx.body = {
                messages: [{
                    message: info.message,
                }],
            }
        }
        ctx.status = 204
    }, ctx)
})

export default route
