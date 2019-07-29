exports.up = function(knex, Promise) {
  return knex.schema.createTable('alerts',(table)=>{
    table.increments()
    table.string('alertId').unique().notNullable()
    table.string('name').unique().notNullable()
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('alerts')
}
