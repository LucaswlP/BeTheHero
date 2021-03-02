const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

/**
 * aqui estamos fazendo os testes na criação de ongs
 * o describe é a funçao de teste
 * o beforeEach executa antes do teste nesse caso para cada teste
 * ele ira criar as migrates.
 * o it contem o a funçao com o post a ser testado.
 */
describe('ONG', () => {
  //executa antes dos testes
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  //executa depois de todos os testes
  afterAll(async () => {
    await connection.destroy();
  });

  //testes
  it('should be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name : "ONG do lucas",
	      email : "lucaswesley.lima@hotmail.com",
	      whatsapp : "5511947902381",
	      city : "São Paulo",
	      uf : "SP"
      });

    //e depois o esperado  
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});