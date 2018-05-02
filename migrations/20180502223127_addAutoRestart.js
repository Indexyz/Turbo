
exports.up = function(knex) {
    return knex.schema.table('instances', table => {
        table.boolean('autoRestart')
    })
};

exports.down = function(knex) {
    return knex.schema.table('instances', table => {
        table.dropColumn('autoRestart')
    })
};
