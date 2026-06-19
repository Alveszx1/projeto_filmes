// Import do express
const express = require('express')

// Criando um objeto de rota para os Endpoints de Genero
const router = express.Router()

const bodyParser = require("body-parser")

//Permitindo a utilizaçãp de JSON no body da requisição
const bodyParserJson = bodyParser.json()

//Import da controller do genero
const controllerGenero = require('../controller/genero/controller_genero.js')



router.post("/", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

router.get("/", async function (request, response) {
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})

router.get("/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerGenero.buscarGenero(id)
    
    response.status(result.status_code)
    response.json(result)


})

router.put('/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o filme , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


router.delete("/:id", async function(request, response) {

    let id = request.params.id
    
    let result = await controllerGenero.deletarGenero(id)

    response.status(result.status_code)
    response.json(result)
    
})

//Export do objeto de rotas do genero
module.exports = router


