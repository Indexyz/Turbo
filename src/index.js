import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import session from 'koa-session'
import logger from 'koa-logger'
import serve from 'koa-static'
import json from 'koa-json'
import pug from 'koa-pug'
import koa from 'koa'
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

        this.app.keys = ['secret']
        this.app.use(session({}, this.app))
        this.app.use(passport.initialize())
        this.app.use(passport.session())
        this.app.use(serve('node_modules'))
        this.app.use(pugInstance.middleware)
    }

    router() {
        this.app.use(route.routes(), route.allowedMethods())
    }

}

export default (new Application()).app
