/**
 * após executar : 
 * npx knex migrate:make create_ongs: cria a migrate
 * npx knex migrate:latest cria a tabela na migrate
 * npx knex migrate:rollback : desfaz a ultima tabela executada
 * npx knex migrate:status : mostra as migrates
 * ele ira criar esse arquivo para criação de tabelas.
 */

 /**
  * método up, é onde criamos as tabelas.
  */
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  });
};

/**
 * o metodo down é utilizado quando da algum problema e eu
 * precise deletar alguma tabela.
 */
exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};

/**
 * no final dar npx knex migrate:latest 
 */
