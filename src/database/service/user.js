import database from '../instance'
import basicService from './basic'
import bcrypt from 'bcrypt'

const SALT_ROUND = 10

class User extends basicService {
    get databaseName() {
        return 'users'
    }

    async create(dispath) {
        if (dispath.password !== '') {
            dispath.password = await bcrypt.hash(dispath.password, SALT_ROUND)
        }

        return await basicService.prototype.create.call(this, [dispath])
    }

    async findByGitHub(id) {
        return await this.find(async () =>
            database('users').where('githubId', id))
    }

    async findByUsername(username) {
        return await this.find(async () =>
            database('users').where('username', username))
    }

    async isRegisted(username, email) {
        return (await this.find(async () =>
            database('users').where('username', username).orWhere('email', email)
        )) === null
    }

    async login(username, password) {
        const user = await this.findByUsername(username)

        if (user === null) {
            return null
        }

        if (await bcrypt.compare(password, user.password)) {
            return user
        }
    }

    async bindGitHub(userId, githubId) {
        await database('users').where('id', userId)
            .update('githubId', githubId)
    }
}

export default new User()
