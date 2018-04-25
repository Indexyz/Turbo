import passport from 'koa-passport'
import router from 'koa-router'
import '../../utils/auth'
const route = router()

route.get('/', passport.authenticate('github'))

export default route
