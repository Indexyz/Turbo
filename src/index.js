import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import session from 'koa-session'
import locales from 'koa-locales'
import logger from 'koa-logger'
import serve from 'koa-static'
import json from 'koa-json'
import pug from 'koa-pug'
import path from 'path'
import koa from 'koa'
import service from './middleware/service'
import route from './router'

class Application {
    static app = null;

    constructor() {
        this.app = new koa()
        this.init()
        this.boot()
        this.router()
    }

    init() {
        this.app.use(bodyParser({
            enableTypes:['json', 'form', 'text'],
        }))
        this.app.use(json())
        this.app.use(logger())
    }

    boot() {
        const pugInstance = new pug({
            viewPath: './template',
            debug: true,
            pretty: false,
            compileDebug: false,
            noCache: true,
        })

        locales(this.app, {
            dirs: [path.resolve(__dirname, '../locales/')],
            defaultLocale: 'zh-CN',
        })
        this.app.keys = ['secret']
        this.app.use(session({}, this.app))
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        this.app.use(serve('node_modules'))
        pugInstance.use(this.app)

        this.app.use(async (ctx, next) => {
            pugInstance.locals.__ = ctx.__.bind(ctx)
            await next()
        })
    }

    router() {
        this.app.use(service)
        this.app.use(route.routes(), route.allowedMethods())
    }

}

export default (new Application()).app
