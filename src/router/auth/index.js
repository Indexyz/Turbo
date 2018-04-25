import router from 'koa-router'
import register from './register'
const route = router()

route.use('/register', register.routes(), register.allowedMethods())

export default route
