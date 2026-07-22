// Import do express
const express = require('express')

// Criando um objeto de rota para os Endpoints de Filme
const router = express.Router()

const bodyParser = require('body-parser')

// Permitindo a utilização de JSON no body da requisição
const bodyParserJson = bodyParser.json()

// Import da controller do filme
const controllerFilme = require('../controller/filme/controller_filme.js')

router.post('/', bodyParserJson, async function (request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function (request, response) {
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilme.buscarFilme(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJson, async function (request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function (request, response) {
    let id = request.params.id
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
