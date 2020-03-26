/**
 * arquivo knex para usarmos o banco
 */
const knex = require('knex');

/**
 * usando as configuracoes criadas dentro do arquivo knexfile la na rais
 */
const configuration = require ('../../knexfile');

/**
 * usando a configuração de desenvolvimento
 * criada la no knexfile
 */
const connection = knex(configuration.development);

module.exports = connection;