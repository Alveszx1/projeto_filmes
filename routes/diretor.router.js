// Import do express
const express = require('express')

// Criando um objeto de rota para os Endpoints de Diretor
const router = express.Router()

const bodyParser = require('body-parser')

// Permitindo a utilização de JSON no body da requisição
const bodyParserJson = bodyParser.json()

// Import da controller do diretor
const controllerDiretor = require('../controller/diretor/controller_diretor.js')

router.post('/', bodyParserJson, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerDiretor.inserirNovoDiretor(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response) {
    let result = await controllerDiretor.listarDiretor()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerDiretor.buscarDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJson, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerDiretor.atualizarDiretor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerDiretor.excluirDiretor(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
