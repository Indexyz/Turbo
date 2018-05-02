import database from '../instance'
import basicService from './basic'

class Instance extends basicService {
    get databaseName() {
        return 'instances'
    }

    async getUserOwner(userId) {
        return await database('instances').where('userId', userId)
    }

    async getUserCount(userId) {
        return await this.getUserOwner(userId).length
    }
}

export default new Instance()
