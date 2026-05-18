const configMessages = require("../modulo/configMessages.js")
const nacionalidadeDAO = require("../../model/DAO/nacionalidade/nacionalidade.js")

const validarDados = async function(nacionalidade){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if(nacionalidade.nacionalidade == undefined ||nacionalidade.nacionalidade == null || nacionalidade.nacionalidade.length > 60 || !isNaN(nacionalidade.nacionalidade)){
        customMessage.ERROR_BAD_REQUEST.field = "[NACIONALIDADE] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirNovaNacionalidade =  async function(nacionalidade, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let validacao = await validarDados(nacionalidade)

            if(validacao){
                return validacao
            }else{
                let result = await nacionalidadeDAO.insertNacionalidade(await(tratarDados(nacionalidade)))
                console.log(result)


                if(result){ // 201

                    nacionalidade.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = nacionalidade

                    return customMessage.DEFAULT_MESSAGE
                } else{
                    return customMessage.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

const listarNacionalidade = async function(){
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        let result = await nacionalidadeDAO.selectAllNacionalidade()
        console.log(result)

    if(result){
        if(result.length > 0){
            customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
            customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
            customMessage.DEFAULT_MESSAGE.count = result.length
            customMessage.DEFAULT_MESSAGE.response.genero = result

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


const buscarNacionalidade = async function buscarNacionalidade(id) {

    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        if(id == undefined || id == "" || id == null || isNaN(id) || id < 1 ){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else {

            let result = await nacionalidadeDAO.selectNacionalidadeById(id)

            if(result){

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status

                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code

                    customMessage.DEFAULT_MESSAGE. response.nacionalidade = result

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


const atualizarNacionalidade = async function(nacionalidade, id , contentType){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            let resultBuscarNacionalidade = await buscarNacionalidade(id)
    
            if(resultBuscarNacionalidade.status){
    
                let validar = await validarDados(nacionalidade)
    
                if(!validar){
    
                    nacionalidade.id = Number(id)
    
                    let result = await nacionalidadeDAO.updateNacionalidade(await tratarDados(nacionalidade))
    
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
    
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
    
    
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
    
                        customMessage.DEFAULT_MESSAGE.response = nacionalidade
    
                        return customMessage.DEFAULT_MESSAGE
                    }else{

                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarNacionalidade
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {

        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const deletarNacionalidade = async function(id){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {

        let resultBuscarNacionalidade = await buscarNacionalidade(id)

        if(resultBuscarNacionalidade.status){


            let result = await nacionalidadeDAO.deleteNacionalidade(id)


            if(result){
                return customMessage.SUCCESS_DELETED_ITEM
            }else{
                return customMessage.ERROR_INTERNAL_SERVER_MODEL
            }

        }else{
            return resultBuscarNacionalidade
        }
        
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}




const tratarDados = async function(nacionalidade){
   nacionalidade.nacionalidade = nacionalidade.nacionalidade.replaceAll("'", "")

    return nacionalidade
}


module.exports = {
    inserirNovaNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    atualizarNacionalidade,
    deletarNacionalidade
}