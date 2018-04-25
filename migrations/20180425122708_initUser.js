
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('username')
        table.string('password')
        table.string('email')
        table.string('githubId')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('users')
}
