
exports.up = function(knex) {
    knex.schema.createTable('users', table => {
        table.increments()
        table.string('username')
        table.string('password')
        table.string('email')
        table.string('githubId')
    })
}

exports.down = function(knex) {
    knex.dropTable('users')
}
