import knex from 'knex'
import knexSettings from '../../knexfile'

const database = knex(knexSettings['development'])

export default database
