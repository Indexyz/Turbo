import knex from 'knex'

const database = knex({
    client: 'sqlite3',
    connection: {
        filename: './database.sqlite3',
    },
})

export default database
