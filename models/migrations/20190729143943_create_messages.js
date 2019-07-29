exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages',(table)=>{
    table.increments()
    table.unique(['language','alert_id'])
    table.string('messageId').unique().notNullable()
    table.string('language').notNullable()
    table.string('body').notNullable()
    table.integer('alert_id').notNullable().references('id').inTable('alerts').onDelete('CASCADE').index()
    table.timestamps(true,true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
}
