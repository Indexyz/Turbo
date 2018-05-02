import database from '../instance'

export default class BasicService {
    get databaseName() {
        return ''
    }

    async find(func) {
        const item = await func()

        return item.length >= 1 ? item[0] : null
    }

    async findById(id) {
        return await this.find(async () =>
            database(this.databaseName).where('id', id))
    }

    async create(dispath) {
        const item = await database(this.databaseName).insert(dispath)

        return await this.findById(item[0])
    }
}
