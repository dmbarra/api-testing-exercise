var frisby = require('frisby');
var URL = 'http://localhost:3000/api/Users/'

var USER_INFORMATION = { "realm": "Daniel",
    "username": "dmbarra",
    "email": "dmbarra@Gmail.com",
    "emailVerified": false,
    "verificationToken": "123",
    "status": "Ativo",
    "created": "10-10-2015",
    "lastUpdated": "10-10-2015"}

frisby.globalSetup({ // globalSetup is for ALL requests
  request: {
    headers: { 'X-Auth-Token': 'fa8426a0-8eaf-4d22-8e13-7c1b16a9370c' }
  }
});

frisby.create('Api users ta disponivel?')
  .get(URL)
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .toss();

  frisby.create('Criar um usuario')
  .post(URL, USER_INFORMATION , {json: true})
  .expectStatus(200)
  .afterJSON(function(json){
    frisby.create('Validando se usuario esta disponivel')
        .get(URL + json.id)
        .expectJSON({
         username: "dmbarra",
        })
        .expectStatus(200)
        .toss()
      })
  .toss();