const configMessages = require("../modulo/configMessages.js")
const atorDAO = require("../../model/DAO/ator/ator.js")
const controllerSexo = require("../../controller/sexo/controller_sexo.js")


const validarDados = async function(ator){
     let customMessage = JSON.parse(JSON.stringify(configMessages))
    
        if( ator.nome == undefined || ator.nome == "" || ator.nome == null  || ator.nome.length > 45){
            customMessage.ERROR_BAD_REQUEST.field = "[ATOR] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else if (ator.data_nascimento == undefined || ator.data_nascimento == "" || ator.data_nascimento == null || ator.data_nascimento.length != 10 ){
            customMessage.ERROR_BAD_REQUEST.field = "[DATA_NASCIMENTO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
    
        } else if (ator.foto == undefined || ator.foto == "" || ator.foto == null || ator.foto.length > 256){
            customMessage.ERROR_BAD_REQUEST.field = "[FOTO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
    
        } else if (ator.biografia == undefined || ator.biografia == "" || ator.biografia == null){
            customMessage.ERROR_BAD_REQUEST.field = "[BIOGRAFIA] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
    
        } else if ( ator.id_sexo == undefined  || ator.id_sexo == null ||  ator.id_sexo == "" || isNaN(ator.id_sexo) || ator.id_sexo <= 0){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_SEXO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
            // Validação para FK da classificação
        } else {
            
            return false 
        }
}

const inserirNovoAtor =  async function(ator, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            let validacao = await validarDados(ator)

            if(validacao){
                return validacao
            }else{
                let result = await atorDAO.insertAtor(await(tratarDados(ator)))
                console.log(result)


                if(result){ // 201

                    ator.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = ator

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


const listarAtor = async function() {
        // Cria uma cópia dos JSON do arquivo de configuração de mensagens 
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do banco de dados
        let result = await atorDAO.selectAllAtor() 
        //Validação para verificar se o DAO conseguiu processar o script do BD
        if(result){

            //Validação para verificar se o conteúdo do array tem dados de retorno
            // ou se esta vazio
            if(result.length > 0){

                //Manipulação dos dados da classificação
                //Percorre o array de filmes
                for(ator of result){

                    //Busca na controller da classificacao o id referente a fk da classificação
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                    

                     // Se encontrar o id
                    if(resultSexo.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        ator.sexo = resultSexo.response.sexo

                        //Apaga o id_classificação do JSON de filme
                        delete ator.id_sexo
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.ator = result

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

const buscarAtor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um numero válido
        if( id == undefined || id == "" || id == null || isNaN(id) || id < 1){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST //400

        }else{

            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await atorDAO.selectAtorById(id)



                for(ator of result){

                    //Busca na controller da classificacao o id referente a fk da classificação
                    let resultSexo = await controllerSexo.buscarSexo(ator.id_sexo)
                    

                     // Se encontrar o id
                    if(resultSexo.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        ator.sexo= resultSexo.response.sexo

                        //Apaga o id_classificação do JSON de filme
                        delete ator.id_sexo
                    }
                }

            //Validação para verificar se o DAO retornou dados ou um FALSE(Eerro)

            if(result){
                            //Validação para verificar se o DAO tem algum dado no array

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.ator = result

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


const atualizarAtor = async function(ator, id , contentType){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            let resultBuscarAtor = await buscarAtor(id)
    
            if(resultBuscarAtor.status){
    
                let validar = await validarDados(ator)
    
                if(!validar){
    
                    ator.id = Number(id)
    
                    let result = await atorDAO.updateAtor(await tratarDados(ator))
    
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
    
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
    
    
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
    
                        customMessage.DEFAULT_MESSAGE.response = ator
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
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const tratarDados = async function (ator) {

    ator.nome = ator.nome.replaceAll("'", "")
    ator.data_nascimento = ator.data_nascimento.replaceAll("'", "")
    ator.foto = ator.foto.replaceAll("'", "")
    ator.biografia = ator.biografia.replaceAll("'", "")

    return ator
    
}


module.exports = {
    inserirNovoAtor,
    listarAtor,
    buscarAtor,
    atualizarAtor
}