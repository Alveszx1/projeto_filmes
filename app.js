const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const controllerFilme = require("./controller/filme/controller_filme")
const controllerGenero = require("./controller/genero/controller_genero")


// permitindo a utilização do JSON no body das requisições
const bodyParserJson = bodyParser.json()

const app = express()

const corsOptions = {
    origin: ["*"], // Configuração de origem da requisição (IP ou Dominio)
    methods: "GET, POST, PUT, DELETE, OPTIONS",  // Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', "Authorization"]
}



app.use(cors(corsOptions))

app.post("/v1/senai/locadora/filme", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerFilme.inserirNovoFilme(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)


})

app.get("/v1/senai/locadora/filme", async function(request, response) {

    // Recebendo o body da requisição
    let result = await controllerFilme.listarFilme()
    
    response.status(result.status_code)
    response.json(result)


})

app.get("/v1/senai/locadora/filme/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerFilme.buscarFilme(id)
    
    response.status(result.status_code)
    response.json(result)


})

app.put('/v1/senai/locadora/filme/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o filme , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerFilme.atualizarFilme(dados, id , contentType)

    response.status(result.status_code)
    response.json(result)
})


app.delete("/v1/senai/locadora/filme/:id", async function name(request, response) {

    let id = request.params.id
    
    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
    
})


app.post("/v1/senai/locadora/genero", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerGenero.inserirNovoGenero(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get("/v1/senai/locadora/genero", async function (request, response) {
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
})



app.listen(9090, function(){
    console.log("API aguardando novas requisições..............")
})



