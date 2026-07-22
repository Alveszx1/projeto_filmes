/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento , manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 */

//Import de configurações do arquivo de mensagens do projeto

const configMessages = require("../modulo/configMessages.js")
const nacionalidadeAtorDAO = require("../../model/DAO/nacionalidade_ator/nacionalidade_ator.js")

const validarDados = async function(nacionalidadeAtor){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if(nacionalidadeAtor.id_nacionalidade == undefined || nacionalidadeAtor.id_nacionalidade == null || isNaN(nacionalidadeAtor.id_nacionalidade) || nacionalidadeAtor.id_nacionalidade <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    }else if(nacionalidadeAtor.id_ator == undefined || nacionalidadeAtor.id_ator == null ||  isNaN(nacionalidadeAtor.id_ator) || nacionalidadeAtor.id_ator <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_ATOR] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirNacionalidadeAtor =  async function(nacionalidadeAtor){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
            let validacao = await validarDados(nacionalidadeAtor)

            if(validacao){
                return validacao
            }else{
                let result = await nacionalidadeAtorDAO.insertNacionalidadeAtor(nacionalidadeAtor)
                

                if(result){ // 201

                    nacionalidadeAtor.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidadeAtor

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

const listarNacionalidadeAtor = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nacionalidadeAtorDAO.selectAllNacionalidadeAtor()
        console.log(result)

    if(result){
        if(result.length > 0){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
            customMessage.DEFAULT_MESSAGE.count = result.length
            customMessage.DEFAULT_MESSAGE.response.nacionalidade_ator = result

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

const atualizarNacionalidadeAtor = async function(nacionalidadeAtor, id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarNacionalidadeAtor = await buscarNacionalidadeAtor(id)

        if(resultBuscarNacionalidadeAtor.status){
            let validar = await validarDados(nacionalidadeAtor)

            if(!validar){
                nacionalidadeAtor.id = Number(id)

                let result = await nacionalidadeAtorDAO.updateNacionalidadeAtor(nacionalidadeAtor)

                if(result){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidadeAtor

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validar
            }
        }else{
            return resultBuscarNacionalidadeAtor
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para buscar ator pelo id da nacionalidade 
const buscarAtorIdNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeAtorDAO.selectAtorByIdNacionalidade(id)

            if(result){
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeAtor =  result 
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

// Funlção para buscar nacionalidade pelo id do ator
const buscarNacionalidadesByIdAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_ATOR] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeAtorDAO.selectNacionalidadeByIdAtor(id)

            if(result){
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidade = result 
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

const buscarNacionalidadeAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeAtorDAO.selectByIdNacionalidadeAtor(id)

            if(result){
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeAtor = result
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

const deletarAtorIdNacionalidade = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nacionalidadeAtorDAO.deleteAtorByIdNacionalidade(id)

        if(result){
            return customMessage.SUCCESS_DELETED_ITEM
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarNacionalidadeAtor = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarNacionalidadeAtor = await buscarNacionalidadesByIdAtor(id)

        if(resultBuscarNacionalidadeAtor.status){
            let result = await nacionalidadeAtorDAO.deleteNacionalidadeAtor(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBuscarNacionalidadeAtor
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirNacionalidadeAtor,
    listarNacionalidadeAtor,
    buscarNacionalidadeAtor,
    atualizarNacionalidadeAtor,
    deletarNacionalidadeAtor,
    buscarNacionalidadesByIdAtor,
    buscarAtorIdNacionalidade,
    deletarAtorIdNacionalidade
}
