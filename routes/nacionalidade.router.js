// Import do express
const express = require('express')

// Criando um objeto de rota para os Endpoints de Nacionalidade
const router = express.Router()

const bodyParser = require('body-parser')

// Permitindo a utilização de JSON no body da requisição
const bodyParserJson = bodyParser.json()

// Import da controller da nacionalidade
const controllerNacionalidade = require('../controller/nacionalidade/controller_nacionalidade.js')

router.post('/', bodyParserJson, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response) {
    let result = await controllerNacionalidade.listarNacionalidade()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerNacionalidade.buscarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJson, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerNacionalidade.deletarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
