import router from 'koa-router'
import joi from 'joi'
const route = router()

route.get('/', async ctx => {
    ctx.render('auth/register')
})

route.post('/', async ctx => {
    const schema = {
        usename: joi.string().min(3).max(64).required(),
        password: joi.string().min(6).required(),
        email: joi.string().email().required(),
    }
    let result = null

    try {
        result = await joi.validate(ctx.requests.body, schema)
    } catch (error) {
        console.log(error)
        ctx.status = 422
        ctx.body = { message: error }
        return
    }
    console.log(result)
    await ctx.service.user.create(result)
    ctx.status = 204
})

export default route
