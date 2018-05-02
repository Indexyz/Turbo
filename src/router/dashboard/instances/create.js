import router from 'koa-router'
import joi from 'joi'
const route = router()

route.get('/', async ctx => {
    ctx.render('dashboard/instances/create')
})

route.post('/', async ctx => {
    const schema = {
        name: joi.string().min(3).max(64).required(),
        autoRestart: joi.boolean().required(),
        memoires: joi.number().min(0).required(),
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
    const inst = await ctx.service.instance.create(result)

    console.log(inst)
})

export default route
