// Import do express
const express = require('express')

// Criando um objeto de rota para os Endpoints de Sexo
const router = express.Router()

const bodyParser = require('body-parser')

// Permitindo a utilização de JSON no body da requisição
const bodyParserJson = bodyParser.json()

// Import da controller do sexo
const controllerSexo = require('../controller/sexo/controller_sexo.js')

router.post('/', bodyParserJson, async function(request, response) {
    let dados = request.body
    let contentType = request.headers['content-type']
    let result = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.get('/', async function(request, response) {
    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

router.get('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerSexo.buscarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

router.put('/:id', bodyParserJson, async function(request, response) {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

router.delete('/:id', async function(request, response) {
    let id = request.params.id
    let result = await controllerSexo.deletarSexo(id)

    response.status(result.status_code)
    response.json(result)
})

module.exports = router
