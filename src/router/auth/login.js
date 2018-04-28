import router from 'koa-router'
import passport from 'koa-passport'
const route = router()

route.get('/', async ctx => {
    ctx.render('auth/login')
})

route.post('/', async ctx => {
    try {
        await passport.authenticate('local', async (err, user) => {
            if (err) {
                ctx.status = 500
                return
            }

            if (!user) {
                ctx.status = 401
                ctx.body = {
                    messages: [{
                        message: 'User not found',
                    }],
                }
                return
            }

            ctx.login(user)
            ctx.status = 204
        })(ctx)
    } catch (e) {
        console.log(e)
        ctx.status = 500
    }
})

export default route
