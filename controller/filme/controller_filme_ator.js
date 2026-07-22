/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento , manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 */

//Import de configurações do arquivo de mensagens do projeto

const configMessages = require("../modulo/configMessages.js")
const filmeAtorDAO = require("../../model/DAO/filme_ator/filme_ator.js")

const validarDados = async function(filmeAtor){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if(filmeAtor.id_filme == undefined || filmeAtor.id_filme == null  || isNaN(filmeAtor.id_filme) || filmeAtor.id_filme <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    }else if(filmeAtor.id_ator == undefined || filmeAtor.id_ator == null || isNaN(filmeAtor.id_ator) || filmeAtor.id_ator <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_ATOR] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirFilmeAtor =  async function(filmeAtor){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
            let validacao = await validarDados(filmeAtor)

            if(validacao){
                return validacao
            }else{
                let result = await filmeAtorDAO.insertFilmeAtor(filmeAtor)
                


                if(result){ // 201

                    filmeAtor.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeAtor

                    return customMessage.DEFAULT_MESSAGE
                } else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarFilmeAtor = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeAtorDAO.selectAllFilmeAtor()
        console.log(result)

    if(result){
        if(result.length > 0){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
            customMessage.DEFAULT_MESSAGE.count = result.length
            customMessage.DEFAULT_MESSAGE.response.filme_ator = result

            return customMessage.DEFAULT_MESSAGE
        }else{
            return customMessage.ERROR_NOT_FOUND
        }
    }else{
        return customMessage.ERROR_INTERNAL_SERVER_MODEL
    }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const atualizarFilmeAtor = async function(filmeAtor, id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
            let resultBuscarAtor = await buscarFilmeAtor(id)
    
            if(resultBuscarAtor.status){
    
                let validar = await validarDados(filmeAtor)
    
                if(!validar){
    
                    filmeAtor.id = Number(id)
    
                    let result = await filmeAtorDAO.updateFilmeAtor(filmeAtor)
    
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
    
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
    
    
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
    
                        customMessage.DEFAULT_MESSAGE.response = filmeAtor
    
                        return customMessage.DEFAULT_MESSAGE
                    }else{

                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarAtor
            }
        
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para buscar os atores filtrando pelo ID do filme
const buscarAtorIdFilme = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filmeAtorDAO.selectAtorByIdFilme(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE.response.filme_ator = result

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_NOT_FOUND
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Função para buscar filmes filtrando pelo id do ator
const buscarFilmesIdAtor = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_ATOR] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filmeAtorDAO.selectFilmeByIdAtor(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE. response.filme_ator = result

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_NOT_FOUND
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const buscarFilmeAtor = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filmeAtorDAO.selectByIdFilmeAtor(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE. response.filme_ator = result

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_NOT_FOUND
                }
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarAtorIdFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {


        


            let result = await filmeAtorDAO.deleteAtorByIdFilme(id)
            console.log(result)


            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }


        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Funçõão para excluir a relação de atores com o filme
const deletarFilmeAtor = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {

        let resultBuscarFilmeAtor = await buscarFilmeAtor(id)

        if(resultBuscarFilmeAtor.status){


            let result = await filmeAtorDAO.deleteFilmeAtor(id)
            console.log(result)


            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarFilmeAtor
        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    inserirFilmeAtor,
    listarFilmeAtor,
    buscarFilmeAtor,
    atualizarFilmeAtor,
    deletarFilmeAtor,
    buscarFilmesIdAtor,
    buscarAtorIdFilme,
    deletarAtorIdFilme

}