exports.up = function(knex) {
    return knex.schema.createTable('instances', table => {
        table.increments()
        table.string('name')
        table.integer('userId')
        table.integer('status')
        table.integer('port')
        table.integer('containerId')
        table.integer('playerCount')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('instances')
}
