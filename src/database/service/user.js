import database from '../instance'

class User {
    async find(func) {
        const user = await func()

        return user.length >= 1 ? user[0] : null
    }

    async create(dispath) {
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
}

export default new User()
