const crypto = require('crypto');

const connection = require('../database/connection');

const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index (request, response) {
    const ongs = await connection('ongs').select('*');
    
    return response.json(ongs);
  },
  
  async create(request, response) {
    /**
   * campos que vem do body da nossa requisicao
   */
    const {name, email, whatsapp, city, uf} = request.body;
    /**
    * o id é gerado usando o modulo crypto do proprio node
    * estou gerando uma string hexadecimal de 4 bytes
    */
    const id = generateUniqueId();

    /**
    * inserimos todos os campos na tabela ongs
    */
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })
    return response.json({ id });
  }
}