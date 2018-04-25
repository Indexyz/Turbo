import github from 'passport-github'
import passport from 'koa-passport'
import config from 'config'
import database from '../database/instance'

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    const user = await database('users').where('id', id)

    if (user.length >= 1) {
        return done(null, user[0])
    } else {
        return done(null, false)
    }
})

const githubPassport = new github.Strategy({
    clientID: config.get('github.clientId'),
    clientSecret: config.get('github.clientScrect'),
}, async function(token, tokenSecret, profile, done) {
    const rows = await database('users').where('githubId', profile.id)

    if (rows.length === 0) {
        // create user
        const user = await database('users').insert({
            githubId: profile.id,
            username: profile.username,
            email: '',
            password: '',
        })

        return (await database('users').where('id', user[0]))[0]
    }
    return done(null, rows[0])
})

passport.use(githubPassport)
