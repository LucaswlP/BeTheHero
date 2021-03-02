const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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

//celebrate é a validação da nossa rota de ongs
routes.post('/ongs', celebrate({
   //tudo que vem do body
   [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),//o nome tem que ser string e é obrigatório
      email: Joi.string().required().email(),// é string, é email e obrigatorio
      whatsapp: Joi.string().required().min(10).max(14),// é numero, e tem minimo de 10 numeros e max de 13 e obrigatorio
      city: Joi.string().required(), // é string e é obrigatorio
      uf: Joi.string().required().length(2), // é string, obrigatório e tem tamanho 2.
   })
}), OngController.create);

routes.get('/profile', celebrate({
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
}),ProfileController.index);


routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
   }),
   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
}), IncidentController.delete);

routes.get('/incidents', celebrate({
   [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
   }),
}), IncidentController.index);

routes.post('/incidents', celebrate({
   [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
   }),

   [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
   }).unknown(),
}), IncidentController.create);

routes.post('/sessions', SessionController.create);

module.exports = routes;