import service from '../database/service'

export default async (ctx, next) => {
    ctx.service = service
    await next()
}
