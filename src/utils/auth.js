import github from 'passport-github'
import config from 'config'

const githubPassport = new github.Strategy({
    clientId: config.get('github.clientId'),
    clientSecret: config.get('github.clientScrect'),
})

export default githubPassport
