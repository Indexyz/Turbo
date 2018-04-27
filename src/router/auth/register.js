import router from 'koa-router'
import joi from 'joi'
const route = router()

route.get('/', async ctx => {
    ctx.render('auth/register')
})

route.post('/', async ctx => {
    const schema = {
        username: joi.string().min(3).max(64).required(),
        password: joi.string().min(6).required(),
        email: joi.string().email().required(),
    }
    let result = null
    const body = ctx.request.body

    try {
        result = await joi.validate(body, schema)
    } catch (error) {
        ctx.status = 422
        ctx.body = { messages: error.details }
        return
    }

    if (await ctx.service.user.isRegisted(result.username, result.email)) {
        ctx.body = 403
        ctx.body = {
            messages: [{
                message: 'User is registed',
            }],
        }
    }

    await ctx.service.user.create(result)
    ctx.status = 204
})

export default route
