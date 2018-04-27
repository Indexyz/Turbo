import router from 'koa-router'
import register from './register'
import logout from './logout'
import login from './login'
import github from './github'
const route = router()

route.use('/register', register.routes(), register.allowedMethods())
route.use('/login', login.routes(), login.allowedMethods())
route.use('/logout', logout.routes(), logout.allowedMethods())
route.use('/github', github.routes(), github.allowedMethods())

export default route
