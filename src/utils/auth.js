import github from 'passport-github'
import local from 'passport-local'
import passport from 'koa-passport'
import config from 'config'
import user from '../database/service/user'

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
    try {
        return done(null, await user.findById(id))
    } catch (e) {
        return done(e)
    }
})

const githubPassport = new github.Strategy({
    clientID: config.get('github.clientId'),
    clientSecret: config.get('github.clientScrect'),
    passReqToCallback : true,
}, async function(request, token, tokenSecret, profile, done) {
    const ghUser = await user.findByGitHub(profile.id)

    if (request.user) {
        console.log(request.user)
    }

    if (ghUser === null) {
        return done(null, false)
    }

    return done(null, ghUser)
})

const localPassport = new local.Strategy(async (username, password, done) => {
    return done(null, await user.login(username, passport))
})

passport.use(githubPassport)
passport.user(localPassport)
