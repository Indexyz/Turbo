import database from '../instance'
import bcrypt from 'bcrypt'

const SALT_ROUND = 10

class User {
    async find(func) {
        const user = await func()

        return user.length >= 1 ? user[0] : null
    }

    async create(dispath) {
        if (dispath.password !== '') {
            dispath.password = await bcrypt.hash(dispath.password, SALT_ROUND)
        }

        const user = await database('users').insert(dispath)

        return await this.findById(user[0])
    }

    async findById(id) {
        return await this.find(async () =>
            database('users').where('id', id))
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
