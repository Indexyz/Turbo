import service from '../database/service'
import config from 'config'

export default async (ctx, next) => {
    ctx.service = service
    ctx.state.config = config
    await next()
}
