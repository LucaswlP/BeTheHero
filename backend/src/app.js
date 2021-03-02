/**
 * importando o modulo express,
 * para dentro da variavel express.
 */
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

const routes = require('./routes');

/**
 * instancia da minha aplicação usando express
 */
const app = express();

app.use(cors()); // o cors controle quem acessa nossa aplicacao;
/**
 * antes de todas as requisicoes, estou falando para 
 * o express transformar o json vindo do cliente em um objeto.
 */
app.use(express.json());


app.use(routes);
app.use(errors());

/**
 * a aplicacao ira utilizar a porta 3333 quando o usuario acessar localhost:3333
 */
module.exports = app;