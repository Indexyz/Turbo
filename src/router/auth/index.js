import router from 'koa-router'
import register from './register'
import logout from './logout'
import github from './github'
const route = router()

route.use('/register', register.routes(), register.allowedMethods())
route.use('/github', github.routes(), github.allowedMethods())
route.use('/logout', logout.routes(), logout.allowedMethods())

export default route
