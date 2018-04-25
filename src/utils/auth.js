import github from 'passport-github'
import passport from 'passport'
import config from 'config'
import database from '../database/instance'

const githubPassport = new github.Strategy({
    clientID: config.get('github.clientId'),
    clientSecret: config.get('github.clientScrect'),
}, (token, tokenSecret, profile, done) => {
    database('users').where('githubId', profile.id).first().then(row => done(row))
})

passport.use(githubPassport)
