import database from '../instance'
import basicService from './basic'

class Instance extends basicService {
    static STATUS_WAIT_CREATE = 0

    get databaseName() {
        return 'instances'
    }

    async getUserOwner(userId) {
        return await database('instances').where('userId', userId)
    }

    async getUserCount(userId) {
        return await this.getUserOwner(userId).length
    }

    async create(dispath) {
        dispath.status = this.STATUS_WAIT_CREATE
        dispath.playerCount = 0
        basicService.prototype.create.call(this, [dispath])
    }
}

export default new Instance()
