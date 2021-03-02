const connection = require('../database/connection');

module.exports = {
  async create(request, response){
    const { id } = request.body;

    /**
     * SELECT name from ongs where id = id limit 1
     */
    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first();

      if (!ong) {
        //status bad request = alguma coisa deu errado
        return response.status(400).json({ error: 'No ONG found with this ID' });
      }

      return response.json(ong);
  }
}