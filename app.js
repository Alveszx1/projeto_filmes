const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const controllerFilme = require("./controller/filme/controller_filme")

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



app.listen(9090, function(){
    console.log("API aguardando novas requisições..............")
})



