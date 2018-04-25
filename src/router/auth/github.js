import passport from 'koa-passport'
import router from 'koa-router'
import '../../utils/auth'
const route = router()

route.get('/', passport.authenticate('github'))

route.get('/callback', async ctx => {
    try {
        await passport.authenticate('github', {
            successRedirect: '/',
            failureRedirect: '/',
        })(ctx)
    } catch (e) {
        console.log(e)
        ctx.redirect('/')
    }
})

export default route
