/**
 * arquivo knex para usarmos o banco
 */
const knex = require('knex');

/**
 * usando as configuracoes criadas dentro do arquivo knexfile la na rais
 */
const configuration = require ('../../knexfile');


/**
 * se o ambiente do banco de dados utilizado for teste
 * então ele seta a configuração de test, se não ele seta
 * a configuração de desenvolvimento.
 */
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;

/**
 * usando a configuração de desenvolvimento
 * criada la no knexfile
 */
const connection = knex(config);

module.exports = connection;