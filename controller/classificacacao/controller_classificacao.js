const configMessages = require("../modulo/configMessages.js")
const classificacaoDAO = require("../../model/DAO/classificacao/classificacao.js")

const validarDados = async function(classificacao){
    let customMessage = JSON.parse(JSON.stringify(configMessages))
    if(classificacao.classificacao == undefined ||classificacao.classificacao == null || classificacao.classificacao.length > 10){
        customMessage.ERROR_BAD_REQUEST.field = "[CLASSIFICACAO] INVÁLIDO"
        return customMessage.ERROR_BAD_REQUEST
    } else {
        return false
    }
}

const inserirNovaClassificacao =  async function(classificacao, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){
            let validacao = await validarDados(classificacao)

            if(validacao){
                return validacao
            }else{
                let result = await classificacaoDAO.insertClassificacao(await(tratarDados(classificacao)))
                console.log(result)


                if(result){ // 201

                    classificacao.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = classificacao

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


const listarClassificacao = async function() {
        // Cria uma cópia dos JSON do arquivo de configuração de mensagens 
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do banco de dados
        let result = await classificacaoDAO.selectAllClassificacao()
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


const buscarClassificacao = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um numero válido
        if( id == undefined || id == "" || id == null || isNaN(id) || id < 1){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST //400

        }else{

            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await classificacaoDAO.selectClassificacaoById(id)
            //Validação para verificar se o DAO retornou dados ou um FALSE(Eerro)

            if(result){
                            //Validação para verificar se o DAO tem algum dado no array

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.classificacao = result

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


const atualizarClassificacao = async function(classificacao, id , contentType){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            let resultBuscarClassificacao = await buscarClassificacao(id)
    
            if(resultBuscarClassificacao.status){
    
                let validar = await validarDados(classificacao)
    
                if(!validar){
    
                    classificacao.id = Number(id)
    
                    let result = await classificacaoDAO.updateClassificacao(await tratarDados(classificacao))
                    console.log(result)
    
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
    
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
    
    
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
    
                        customMessage.DEFAULT_MESSAGE.response = classificacao
                        return customMessage.DEFAULT_MESSAGE
                    }else{

                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarClassificacao
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const tratarDados = async function(classificacao){
    classificacao.classificacao = classificacao.classificacao.replaceAll("'", "")

    return classificacao
}


module.exports = {
    inserirNovaClassificacao,
    listarClassificacao,
    buscarClassificacao,
    atualizarClassificacao
}