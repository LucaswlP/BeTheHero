const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Rota / Recurso
 * Recurso é quando a gente informa o caminho da nossa rota,
 * ali no primeiro parametro antes do request
 * ex: estou querendo acessar o recurso de usuarios : localhost:3333/users/
 */

 /**
  * Metodos HTTP:
  * -GET: Buscar/listar uma informação do backend;
  * -POST: Criar uma informação no backend;
  * -PUT: Alterar uma informação no backend;
  * -DELETE: Deletar uma informação no backend.
  */

  /**
   * Tipos De Parametros:
   * 
   * Query Params: Parametros nomeados enviados na rota após o "?" (FIltros,paginação,etc)
   * Route Params: Parametros utilizados para identificar recursos, um único recurso. localhost:3333/users/:id
   * Request Body: Corpo da Requisição, utilizado para criar ou alterar recursos.
   */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/sessions', SessionController.create);

module.exports = routes;