/****************************************************************************************************************
 * Objetivo: Arquivo responsável pela validação, tratamento , manipulação de dados para realizar o CRUD de filme
 * Data: 17/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 */

//Import de configurações do arquivo de mensagens do projeto

const configMessages = require("../modulo/configMessages.js")
const filmeGeneroDAO = require("../../model/DAO/filme_genero/filme_genero.js")

const validarDados = async function(filmeGenero){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if(filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || filmeGenero.id_filme.length > 45 || isNaN(filmeGenero.id_filme) || filmeGenero.id_filme <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    }else if(filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || filmeGenero.id_genero.length > 45 || isNaN(filmeGenero.id_genero) || filmeGenero.id_genero <= 0){
        customMessage.ERROR_BAD_REQUEST.field = "[ID_GENERO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirFilmeGenero =  async function(filmeGenero){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
            let validacao = await validarDados(filmeGenero)

            if(validacao){
                return validacao
            }else{
                let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)
                


                if(result){ // 201

                    filmeGenero.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = filmeGenero

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

const listarFilmeGenero = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await filmeGeneroDAO.selectAllFilmeGenero()
        console.log(result)

    if(result){
        if(result.length > 0){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
            customMessage.DEFAULT_MESSAGE.count = result.length
            customMessage.DEFAULT_MESSAGE.response.filme_genero = result

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

const atualizarFilmeGenero = async function(filmeGenero, id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
            let resultBuscarGenero = await buscarFilmeGenero(id)
    
            if(resultBuscarGenero.status){
    
                let validar = await validarDados(filmeGenero)
    
                if(!validar){
    
                    filmeGenero.id = Number(id)
    
                    let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)
    
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
    
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
    
    
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
    
                        customMessage.DEFAULT_MESSAGE.response = filmeGenero
    
                        return customMessage.DEFAULT_MESSAGE
                    }else{

                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarGenero
            }
        
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

//Função para buscar os generos filtrando pelo ID do filme
const buscarGeneroIdFilme = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_FILME] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filmeGeneroDAO.selectGenerosByIdFilme(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE. response.filme_genero = result

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

// Função para buscar filmes filtrando pelo id do genero
const buscarFilmesIdGenero = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_GENERO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE. response.filme_genero = result

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



const buscarFilmeGenero = async function (id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE. response.filme_genero = result

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


const deletarGeneroIdFilme = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {


        


            let result = await filmeGeneroDAO.deleteGeneroByIdFilme(id)
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


//Funçõão para excluir a relação de generos com o filme
const deletarFilmeGenero = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {

        let resultBuscarFilmeGenero = await buscarFilmeGenero(id)

        if(resultBuscarFilmeGenero.status){


            let result = await filmeGeneroDAO.deleteFilmeGenero(id)
            console.log(result)


            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarFilmeGenero
        }
        
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


module.exports = {
    inserirFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    atualizarFilmeGenero,
    deletarFilmeGenero,
    buscarFilmesIdGenero,
    buscarGeneroIdFilme,
    deletarGeneroIdFilme

}