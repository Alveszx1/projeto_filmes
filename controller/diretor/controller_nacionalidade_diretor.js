/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento , manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 */

//Import de configurações do arquivo de mensagens do projeto

const configMessages = require("../modulo/configMessages.js")
const nacionalidadeDiretorDAO = require("../../model/DAO/nacionalidade_diretor/nacionalidade_diretor.js")

const validarDados = async function(nacionalidadeDiretor){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if(nacionalidadeDiretor.id_nacionalidade == undefined || nacionalidadeDiretor.id_nacionalidade == null || isNaN(nacionalidadeDiretor.id_nacionalidade) || nacionalidadeDiretor.id_nacionalidade <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    }else if(nacionalidadeDiretor.id_diretor == undefined || nacionalidadeDiretor.id_diretor == null ||  isNaN(nacionalidadeDiretor.id_diretor) || nacionalidadeDiretor.id_diretor <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_DIRETOR] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirNacionalidadeDiretor =  async function(nacionalidadeDiretor){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
            let validacao = await validarDados(nacionalidadeDiretor)

            if(validacao){
                return validacao
            }else{
                let result = await nacionalidadeDiretorDAO.insertNacionalidadeDiretor(nacionalidadeDiretor)
                


                if(result){ // 201

                    nacionalidadeDiretor.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidadeDiretor

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

const listarNacionalidadeDiretor = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nacionalidadeDiretorDAO.selectAllNacionalidadeDiretor()
        console.log(result)

    if(result){
        if(result.length > 0){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
            customMessage.DEFAULT_MESSAGE.count = result.length
            customMessage.DEFAULT_MESSAGE.response.nacionalidade_diretor = result

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

const atualizarNacionalidadeDiretor = async function(nacionalidadeDiretor, id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarNacionalidadeDiretor = await buscarNacionalidadeDiretor(id)

        if(resultBuscarNacionalidadeDiretor.status){
            let validar = await validarDados(nacionalidadeDiretor)

            if(!validar){
                nacionalidadeDiretor.id = Number(id)

                let result = await nacionalidadeDiretorDAO.updateNacionalidadeDiretor(nacionalidadeDiretor)

                if(result){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidadeDiretor

                    return customMessage.DEFAULT_MESSAGE
                }else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }else{
                return validar
            }
        }else{
            return resultBuscarNacionalidadeDiretor
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para buscar diretor pelo id da nacionalidade 
const buscarDiretorIdNacionalidade = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_NACIONALIDADE] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeDiretorDAO.selectDiretorByIdNacionalidade(id)

            if(result){
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeDiretor =  result 
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

// Funlção para buscar nacionalidade pelo id do diretor
const buscarNacionalidadesByIdDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_DIRETOR] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeDiretorDAO.selectNacionalidadeByIdDiretor(id)

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

const buscarNacionalidadeDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {
            let result = await nacionalidadeDiretorDAO.selectByIdNacionalidadeDiretor(id)

            if(result){
                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.nacionalidadeDiretor = result
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

const deletarDiretorIdNacionalidade = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nacionalidadeDiretorDAO.deleteDiretorByIdNacionalidade(id)

        if(result){
            return customMessage.SUCCESS_DELETED_ITEM
        }else{
            return customMessage.ERROR_INTERNAL_SERVER_MODEL
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

const deletarNacionalidadeDiretor = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let resultBuscarNacionalidadeDiretor = await buscarNacionalidadeDiretor(id)

        if(resultBuscarNacionalidadeDiretor.status){
            let result = await nacionalidadeDiretorDAO.deleteNacionalidadeDiretor(id)

            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return resultBuscarNacionalidadeDiretor
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

module.exports = {
    inserirNacionalidadeDiretor,
    listarNacionalidadeDiretor,
    buscarNacionalidadeDiretor,
    atualizarNacionalidadeDiretor,
    deletarNacionalidadeDiretor,
    buscarNacionalidadesByIdDiretor,
    buscarDiretorIdNacionalidade,
    deletarDiretorIdNacionalidade
}