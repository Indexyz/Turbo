import router from 'koa-router'
import register from './register'
import github from './github'
const route = router()

route.use('/register', register.routes(), register.allowedMethods())
route.use('/github', github.routes(), github.allowedMethods())

export default route
