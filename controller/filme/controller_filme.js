/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento , manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 */

//Import de configurações do arquivo de mensagens do projeto
const configMessages = require("../modulo/configMessages.js")

const filmeDAO = require("../../model/DAO/filme/filme.js") 
const { application } = require("express")

const validarDados =  async function(filme){
    
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    if(filme.nome == "" || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        customMessage.ERROR_BAD_REQUEST.field = "[NOME] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else if (filme.sinopse == "" || filme.sinopse == null || filme.sinopse == undefined){
        customMessage.ERROR_BAD_REQUEST.field = "[SINOPSE] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.capa == "" || filme.capa == null || filme.capa == undefined || filme.capa.length > 255){
        customMessage.ERROR_BAD_REQUEST.field = "[CAPA] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.data_lancamento == "" || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        customMessage.ERROR_BAD_REQUEST.field = "[DATA DE LANÇAMENTO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.duracao == "" || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        customMessage.ERROR_BAD_REQUEST.field = "[DURAÇÃO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    } else if (filme.valor == undefined || isNaN(filme.valor) || filme.valor.length > 5){
        customMessage.ERROR_BAD_REQUEST.field = "[VALOR] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

    }  else if ( filme.avaliacao == undefined || isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        customMessage.ERROR_BAD_REQUEST.field = "[AVALIAÇÃO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST

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

        let result = await filmeDAO.insertFilme(filme)

       if(result){ //201
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
            customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message

            return customMessage.DEFAULT_MESSAGE

       } else { //
           return customMessage.ERROR_INTERNAL_SERVER_MODEL
       }

    }
  } else {
     return customMessage.ERROR_CONTENT_TYPE
  } 
    } catch (error) {
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
const atualizarFilme = async function(params) {
    
}
// Função para retornar um filme filtrando pelo id 
const buscarFilme = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um numero válido
        if(id == "" || id == null || id == undefined || isNaN(id)){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST //400

        }else{

            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await filmeDAO.selectByIdFilme(id)
            //Validação para verificar se o DAO retornou dados ou um FALSE(Eerro)

            if(result){
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
const excluirFilme = async function (params) {
    
}


module.exports = {
    inserirNovoFilme,
    atualizarFilme,
    listarFilme,
    buscarFilme,
    excluirFilme
}