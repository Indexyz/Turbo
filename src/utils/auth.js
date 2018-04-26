import github from 'passport-github'
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
}, async function(token, tokenSecret, profile, done) {
    const ghUser = await user.findByGitHub(profile.id)

    if (ghUser === null) {
        // create user
        const u = await user.create({
            githubId: profile.id,
            username: profile.username,
            email: '',
            password: '',
        })

        return done(null, u)
    }
    return done(null, ghUser)
})

passport.use(githubPassport)
