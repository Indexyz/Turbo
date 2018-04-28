import database from '../instance'

class Instance {
    async getUserOwner(userId) {
        return await database('instances').where('userId', userId)
    }

    async getUserCount(userId) {
        return await this.getUserOwner(userId).length
    }
}

export default new Instance()
