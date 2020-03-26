const connection = require('../database/connection');

module.exports = {
  async index(request, response){
    //trago o id da ong
    const ong_id = request.headers.authorization;

    //trago todos os incidentes da ong com esse id
    const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select('*');

    return response.json(incidents);
  }
}