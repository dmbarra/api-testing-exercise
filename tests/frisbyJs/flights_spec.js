var frisby = require('frisby');
var URL = 'http://localhost:3000/api/flights/'
var FLIGHT_INFORMATION = { "data_partida": "01-10-2015",
            "data_chegada": "10-10-2015",
            "numero": "666",
            "origem": "CNF",
            "destino": "JFK",
            "duracao": 15,
            "lugares": 200,
            "companhia": "American Airlines" }


frisby.create('Api flights ta disponivel?')
  .get(URL)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

frisby.create('Criar um voo')
  .post(URL, FLIGHT_INFORMATION , {json: true})
  .expectStatus(200)
  .afterJSON(function(json){
    frisby.create('Validando se flight esta disponivel')
        .get(URL + json.id)
        .expectJSON({
         companhia: "American Airlines",
        })
        .expectStatus(200)
        .toss()
      })
  .toss();

frisby.create('Verifica retorno invalido')
  .get(URL + '66505')
  .expectStatus(404)
  .toss()

frisby.create('Atualiza um voo')
  .post(URL, FLIGHT_INFORMATION , {json: true})
  .afterJSON(function(json){
    frisby.create('Atualizando')
        .put(URL + json.id, {
            "companhia": "SouthWest Airlines"
        }, {json: true})
        .expectJSON({
         companhia: "SouthWest Airlines",
        })
        .expectStatus(200)
        .toss()
      })
  .toss();

frisby.create('Tentar criar voo invalido')
  .post(URL, {"companhia": "American Airlines"} , {json: true})
  .expectStatus(422)
  .toss();

frisby.create('Deleta registro de voo')
  .post(URL, FLIGHT_INFORMATION , {json: true})
  .afterJSON(function(json){
    frisby.create('deletando')
        .delete(URL + json.id)
        .expectStatus(204)
        .toss()
      })
  .toss();

frisby.create('Verifica o tipo dos campos')
  .get(URL)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes('*', {
      data_partida: 'date',
      data_chegada: 'date',
      numero: String,
      origem: 'object',
      destino: 'object',
      duracao: Number,
      lugares: Number,
      companhia: 'object'
    })
  .toss();

  

