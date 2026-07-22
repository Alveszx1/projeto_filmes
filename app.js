const express = require("express")
const cors = require("cors")
const app = express()

const filmeRouter = require("./routes/filme.router.js")
const generoRouter = require("./routes/genero.router.js")
const sexoRouter = require("./routes/sexo.router.js")
const nacionalidadeRouter = require("./routes/nacionalidade.router.js")
const classificacaoRouter = require("./routes/classificacao.router.js")
const atorRouter = require("./routes/ator.router.js")
const diretorRouter = require("./routes/diretor.router.js")

const corsOptions = {
    origin: ["*"], // Configuração de origem da requisição (IP ou Dominio)
    methods: "GET, POST, PUT, DELETE, OPTIONS",  // Configuração dos verbos que serão utilizados na API
    allowedHeaders: ['Content-type', "Authorization"]
}



app.use(cors(corsOptions))

app.use("/v1/senai/locadora/filme", cors(), filmeRouter)

//Import do arquivo de rotas do genero 
app.use("/v1/senai/locadora/genero", cors(), generoRouter)
app.use("/v1/senai/locadora/sexo", cors(), sexoRouter)
app.use("/v1/senai/locadora/nacionalidade", cors(), nacionalidadeRouter)
app.use("/v1/senai/locadora/classificacao", cors(), classificacaoRouter)
app.use("/v1/senai/locadora/ator", cors(), atorRouter)
app.use("/v1/senai/locadora/diretor", cors(), diretorRouter)



app.listen(9090, function(){
    console.log("API aguardando novas requisições..............")
})



