const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const controllerFilme = require("./controller/filme/controller_filme")
const controllerGenero = require("./controller/genero/controller_genero")
const controllerSexo = require("./controller/sexo/controller_sexo")
const controllerNacionalidade = require("./controller/nacionalidade/controller_nacionalidade")
const controllerClassificacao = require("./controller/classificacacao/controller_classificacao")
const controllerAtor = require("./controller/ator/controller_ator")
const controllerDiretor = require("./controller/diretor/controller_diretor")




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

app.get("/v1/senai/locadora/genero/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerGenero.buscarGenero(id)
    
    response.status(result.status_code)
    response.json(result)


})


app.put('/v1/senai/locadora/genero/:id', bodyParserJson, async function (request, response) {

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


app.delete("/v1/senai/locadora/genero/:id", async function(request, response) {

    let id = request.params.id
    
    let result = await controllerGenero.deletarGenero(id)

    response.status(result.status_code)
    response.json(result)
    
})


//Sexo


app.post("/v1/senai/locadora/sexo", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerSexo.inserirNovoSexo(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get("/v1/senai/locadora/sexo", async function(request, response) {

    // Recebendo o body da requisição
    let result = await controllerSexo.listarSexo()
    
    response.status(result.status_code)
    response.json(result)

})

app.get("/v1/senai/locadora/sexo/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerSexo.buscarSexo(id)
    response.status(result.status_code)
    response.json(result)


})


app.put('/v1/senai/locadora/sexo/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o filme , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete("/v1/senai/locadora/sexo/:id", async function(request, response) {

    let id = request.params.id
    
    let result = await controllerSexo.deletarSexo(id)

    response.status(result.status_code)
    response.json(result)
    
})




//Nacionalidade


app.post("/v1/senai/locadora/nacionalidade", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerNacionalidade.inserirNovaNacionalidade(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})


app.get("/v1/senai/locadora/nacionalidade", async function(request, response) {

    // Recebendo o body da requisição
    let result = await controllerNacionalidade.listarNacionalidade()
    
    response.status(result.status_code)
    response.json(result)

})


app.get("/v1/senai/locadora/nacionalidade/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerNacionalidade.buscarNacionalidade(id)
    response.status(result.status_code)
    response.json(result)


})


app.put('/v1/senai/locadora/nacionalidade/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o filme , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerNacionalidade.atualizarNacionalidade(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


app.delete("/v1/senai/locadora/nacionalidade/:id", async function(request, response) {

    let id = request.params.id
    
    let result = await controllerNacionalidade.deletarNacionalidade(id)

    response.status(result.status_code)
    response.json(result)
    
})




//Classificacao

app.post("/v1/senai/locadora/classificacao", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerClassificacao.inserirNovaClassificacao(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})


app.get("/v1/senai/locadora/classificacao", async function(request, response) {

    // Recebendo o body da requisição
    let result = await controllerClassificacao.listarClassificacao()
    
    response.status(result.status_code)
    response.json(result)

})

app.get("/v1/senai/locadora/classificacao/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerClassificacao.buscarClassificacao(id)
    response.status(result.status_code)
    response.json(result)


})


app.put('/v1/senai/locadora/classificacao/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o filme , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})


app.delete("/v1/senai/locadora/classificacao/:id", async function(request, response) {

    let id = request.params.id
    
    let result = await controllerClassificacao.deletarClassificacao(id)

    response.status(result.status_code)
    response.json(result)
    
})


//Ator


app.post("/v1/senai/locadora/ator", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await  controllerAtor.inserirNovoAtor(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})

app.get("/v1/senai/locadora/ator", async function(request, response) {

    // Recebendo o body da requisição
    let result = await controllerAtor.listarAtor()
    
    response.status(result.status_code)
    response.json(result)

})

app.get("/v1/senai/locadora/ator/:id", async function(request, response) {
    // Recebe o id do filme via parametro
    let id = request.params.id

    // Recebendo o body da requisição
    let result = await controllerAtor.buscarAtor(id)
    response.status(result.status_code)
    response.json(result)


})

app.put('/v1/senai/locadora/ator/:id', bodyParserJson, async function (request, response) {

    // Recebe o content-type da requisição para validar se é JSON
    let contentType = request.headers['content-type']
    // Recebe o ID do registro a ser atualizado
    let id = request.params.id
    // Recebe os dados do body que serão modificados no BD
    let dados  = request.body

    //Chama a função para atualizar o filme , devemos encaminhar as 3 variaveis na mesma sequencia
    // que a função foi criada na controller

    let result = await controllerAtor.atualizarAtor(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.delete("/v1/senai/locadora/ator/:id", async function(request, response) {
    console.log("ooooo")
    let id = request.params.id
    
    let result = await controllerAtor.deletarAtor(id)

    response.status(result.status_code)
    response.json(result)
    
})


app.post("/v1/senai/locadora/diretor", bodyParserJson, async function(request, response) {

    // Recebendo o body da requisição
    let dados = request.body
    let contentType = request.headers["content-type"]
    let result = await controllerDiretor.inserirNovoDiretor(dados, contentType)
    
    response.status(result.status_code)
    response.json(result)
})



app.listen(9090, function(){
    console.log("API aguardando novas requisições..............")
})



