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

    async isRegisted(username, email) {
        return (await this.find(async () =>
            database('users').where('username', username).orWhere('email', email)
        )) === null
    }
}

export default new User()
