const connection = require('../database/connection');

module.exports = {
  async index(request, response){

    /**
     * logica de paginacao:
     * vou buscar um parametro page, se ele for 0, atribuo 1 ao valor dele.
     */
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count(); //total de registros de incidentes

    console.log(count);

    /**
     * SELECT    'incidents.*'
                ,'ongs.name'
                ,'ongs.email'
                ,'ongs.whatsapp'
                ,'ongs.city'
                ,'ongs.uf'
       FROM incidents
       JOIN ongs
       WHERE incidents.ong_id = ongs.id;
     */
    const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5) //retornar 5 incidentes apenas
    .offset((page - 1) * 5) //pular 5 registros por pagina 
    .select([
      'incidents.*'
     ,'ongs.name'
     ,'ongs.email'
     ,'ongs.whatsapp'
     ,'ongs.city'
     ,'ongs.uf'
    ]);

    response.header('X-Total-Count', count['count(*)']); //total de registros pelo header.

    return response.json(incidents);
  },

  async create(request, response){
    const { title, description, value} = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params; // deletar o id do incidente
    const ong_id = request.headers.authorization; // id da ong logada

    /**
     * SELECT ong_id FROM incidents where id = id limit 1;
     */
    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

      /**
       * se o id do incidente da  ong do banco for diferente do incidente da ong logada
       * da erro de autorizacao
       */
      if (incident.ong_id !== ong_id) {
        return response.status(401).json({ error: 'Operation not permitted' });
      }

      /**
       * delete from incidents where id = id;
       */
      await connection('incidents').where('id', id).delete(); // apago o incidente certo

      return response.status(204).send(); // deu certo mas nao tem conteudo
  }
};