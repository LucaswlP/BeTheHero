
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments(); //ira criar uma chave primaria auto_increments

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();//nossa chave estrangeira

        table.foreign('ong_id').references('id').inTable('ongs'); // referencia da chave estrangeira
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
