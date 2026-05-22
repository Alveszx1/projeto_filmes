/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento , manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 */

//Import de configurações do arquivo de mensagens do projeto
const configMessages = require("../modulo/configMessages.js")

const filmeDAO = require("../../model/DAO/filme/filme.js") 

//Import das controllers
const controllerClassificacao = require('../classificacacao/controller_classificacao.js')

const controllerFilmeGenero = require("./controller_filme_genero.js")


const { application } = require("express")
const { json } = require("body-parser")

const validarDados =  async function(filme){
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if( filme.nome == undefined || filme.nome == "" || filme.nome == null  || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.sinopse == undefined || filme.sinopse == "" || filme.sinopse == null ){
        customMessage.ERROR_BAD_REQUEST.field = "[SINOPSE] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.capa == undefined || filme.capa == "" || filme.capa == null || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = "[CAPA] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.data_lancamento == undefined || filme.data_lancamento == "" || filme.data_lancamento == null ||  filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = "[DATA DE LANÇAMENTO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.duracao == undefined || filme.duracao == "" || filme.duracao == null || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = "[DURAÇÃO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = "[VALOR] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    }  else if ( filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = "[AVALIAÇÃO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    }else if ( filme.id_classificacao == undefined  || filme.id_classificacao == null ||  filme.id_classificacao == "" || isNaN(filme.id_classificacao) || filme.id_classificacao <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_CLASSIFICACAO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
        // Validação para FK da classificação
    } else {
        
        return false 
    }
}

// Função para inserir um novo filme
const inserirNovoFilme = async function (filme, contentType) {

    // Cria uma cópia dos JSON do arquivo de configuração de mensagens 
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        
    

    if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
    
    

    // chama a funçao para validar a entrada dos dados do filme
    let validar = await validarDados(filme)


    //Retorna um JSON de erro caso algum atributo seja inválido, senão retorna um false n teve erro
    if(validar){
        return validar
    }
    else{

        let result = await filmeDAO.insertFilme(await(tratarDados(filme)))

       if(result){ //201

            filme.id = result

            // Manipulação de dados para inseriri os generos relacionados ao Filme


            //Percorre o array de generos e chegará na requisição pelo objeto

            for(itemFilme of filme.genero){

            let filmeGenero = {
                "id_filme": filme.id,
                "id_genero": itemFilme.id
            }

            let resulFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero)
            console.log(resulFilmeGenero)
        }

            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
            customMessage.DEFAULT_MESSAGE.response = filme

            return customMessage.DEFAULT_MESSAGE

       } else { //
           return customMessage.ERROR_INTERNAL_SERVER_MODEL
       }

    }
  } else {
     return customMessage.ERROR_CONTENT_TYPE
  } 
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}



const listarFilme = async function(filme) {
        // Cria uma cópia dos JSON do arquivo de configuração de mensagens 
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do banco de dados
        let result = await filmeDAO.selectAllFilme() 
        //Validação para verificar se o DAO conseguiu processar o script do BD
        if(result){

            //Validação para verificar se o conteúdo do array tem dados de retorno
            // ou se esta vazio
            if(result.length > 0){

                //Manipulação dos dados da classificação
                //Percorre o array de filmes
                for(filme of result){

                    //Busca na controller da classificacao o id referente a fk da classificação
                    let resultClassicacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                    

                     // Se encontrar o id
                    if(resultClassicacao.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        filme.classificacao = resultClassicacao.response.classificacao

                        //Apaga o id_classificação do JSON de filme
                        delete filme.id_classificacao
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.filme = result

                return customMessage.DEFAULT_MESSAGE
            }else{
                return customMessage.ERROR_NOT_FOUND
            }
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER //500 (controller)
    }
}

// Função para atualizar um filme existente
const atualizarFilme = async function(filme, id, contentType) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {



        //Validaçao para verificar se o conteudo do body é um json 
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            // Chama a função para buscar o filme e validar se o id esta correto , se o id existe no banco de dados e se o filme existe
           let resultBuscarFilme = await buscarFilme(id)
           
           if(resultBuscarFilme.status_code){
                let validar = await validarDados(filme)


                if(!validar){
                    //Adiciona um atributo id no JSON de filme para enviar ao DAO um único objeto
                    filme.id = Number(id) 
                    let result = await filmeDAO.updateFilme(await tratarDados(filme))

                    if(result){
                         customMessage.DEFAULT_MESSAGE.status       = customMessage.SUCESS_UPDATE_ITEM.status
                         customMessage.DEFAULT_MESSAGE.status_code  = customMessage.SUCESS_UPDATE_ITEM.status_code
                         customMessage.DEFAULT_MESSAGE.message      = customMessage.SUCESS_UPDATE_ITEM.message
                         customMessage.DEFAULT_MESSAGE.response     = filme

                         return customMessage.DEFAULT_MESSAGE
                    }else{
                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return validar
                }
           }else{
            return resultBuscarFilme // 400 (id Invalido) (404 não encontrado) ou 500
           }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}
// Função para retornar um filme filtrando pelo id 
const buscarFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um numero válido
        if( id == undefined || id == "" || id == null || isNaN(id) || id < 1){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST //400

        }else{

            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)
            //Validação para verificar se o DAO retornou dados ou um FALSE(Eerro)

            if(result){


                for(filme of result){

                    //Busca na controller da classificacao o id referente a fk da classificação
                    let resultClassicacao = await controllerClassificacao.buscarClassificacao(filme.id_classificacao)
                    

                     // Se encontrar o id
                    if(resultClassicacao.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        filme.classificacao = resultClassicacao.response.classificacao

                        //Apaga o id_classificação do JSON de filme
                        delete filme.id_classificacao
                    }
                }
                            //Validação para verificar se o DAO tem algum dado no array

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.filme = result

                    return customMessage.DEFAULT_MESSAGE //200

                }else{

                    return customMessage.ERROR_NOT_FOUND//404

                }
            }else{

                return customMessage.ERROR_INTERNAL_SERVER_MODEL //500(model)

            }
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER

    }
}

// Função para excluir um filme 
const excluirFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {

        //Chama a função de buscar filme para validar se o filme existe
        let resultBuscarFilme = await buscarFilme(id)
        
        if(resultBuscarFilme.status){

            let result = await filmeDAO.deleteFilme(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }
            else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBuscarFilme //400 e 404
        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Função para tratar os dados a serem inseridos
const tratarDados = async function (filme) {

    filme.nome = filme.nome.replaceAll("'", "")
    filme.sinopse = filme.sinopse.replaceAll("'", "")
    filme.capa = filme.capa.replaceAll("'", "")
    filme.data_lancamento = filme.data_lancamento.replaceAll("'", "")
    filme.duracao = filme.duracao.replaceAll("'", "")
    filme.valor = filme.valor.replaceAll("'", "")
    filme.avaliacao = filme.avaliacao.replaceAll("'", "")

    

    return filme
    
}


module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}