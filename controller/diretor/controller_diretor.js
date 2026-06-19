const configMessages = require("../modulo/configMessages.js")
const diretorDAO = require("../../model/DAO/diretor/diretor.js")
const controllerSexo = require("../../controller/sexo/controller_sexo.js")


const validarDados = async function(diretor){
     let customMessage = JSON.parse(JSON.stringify(configMessages))
    
        if( diretor.nome == undefined || diretor.nome == "" || diretor.nome == null  || diretor.nome.length > 45){
            customMessage.ERROR_BAD_REQUEST.field = "[DIRETOR] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
        } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == "" || diretor.data_nascimento == null || diretor.data_nascimento.length != 10 ){
            customMessage.ERROR_BAD_REQUEST.field = "[DATA_NASCIMENTO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
    
        } else if (diretor.foto == undefined || diretor.foto == "" || diretor.foto == null || diretor.foto.length > 256){
            customMessage.ERROR_BAD_REQUEST.field = "[FOTO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
    
        } else if (diretor.biografia == undefined || diretor.biografia == "" || diretor.biografia == null){
            customMessage.ERROR_BAD_REQUEST.field = "[BIOGRAFIA] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
    
        } else if ( diretor.id_sexo == undefined  || diretor.id_sexo == null ||  diretor.id_sexo == "" || isNaN(diretor.id_sexo) || diretor.id_sexo <= 0){
            customMessage.ERROR_BAD_REQUEST.field = "[ID_SEXO] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST
            // Validação para FK da classificação
        } else {
            
            return false 
        }
}

const inserirNovoDiretor =  async function(diretor, contentType){

    let customMessage = JSON.parse(JSON.stringify(configMessages))
    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            let validacao = await validarDados(diretor)

            if(validacao){
                return validacao
            }else{
                let result = await diretorDAO.insertDiretor(await(tratarDados(diretor)))


                if(result){ // 201

                    diretor.id = result

                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_CREATED_ITEM.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_CREATED_ITEM.status_code
                    customMessage.DEFAULT_MESSAGE.message = customMessage.SUCCESS_CREATED_ITEM.message
                    customMessage.DEFAULT_MESSAGE.response = diretor

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


const listarDiretor = async function() {
        // Cria uma cópia dos JSON do arquivo de configuração de mensagens 
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        // Chama a função do DAO para retornar a lista de filmes do banco de dados
        let result = await diretorDAO.selectAllDiretor() 
        //Validação para verificar se o DAO conseguiu processar o script do BD
        if(result){

            //Validação para verificar se o conteúdo do array tem dados de retorno
            // ou se esta vazio
            if(result.length > 0){

                //Manipulação dos dados da classificação
                //Percorre o array de filmes
                for(diretor of result){

                    //Busca na controller da classificacao o id referente a fk da classificação
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)
                    

                     // Se encontrar o id
                    if(resultSexo.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        diretor.sexo = resultSexo.response.sexo

                        //Apaga o id_classificação do JSON de filme
                        delete diretor.id_sexo
                    }
                }

                customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                customMessage.DEFAULT_MESSAGE.count = result.length
                customMessage.DEFAULT_MESSAGE.response.diretor = result

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

const buscarDiretor = async function (id) {
    let customMessage = JSON.parse(JSON.stringify(configMessages))

    try {
        //Validação para garantir que o id seja um numero válido
        if( id == undefined || id == "" || id == null || isNaN(id) || id < 1){
            customMessage.ERROR_BAD_REQUEST.field = "[ID] INVÁLIDO"
            return customMessage.ERROR_BAD_REQUEST //400

        }else{

            //Chama a função do DAO para pesquisar o filme pelo ID
            let result = await diretorDAO.selectDiretorById(id)


                for(diretor of result){

                    //Busca na controller da classificacao o id referente a fk da classificação
                    let resultSexo = await controllerSexo.buscarSexo(diretor.id_sexo)
                    

                     // Se encontrar o id
                    if(resultSexo.status){
                        //Adicionar um atributo classificação no JSON do filme e colocar o resultado com os dados da classificação
                        diretor.sexo= resultSexo.response.sexo

                        //Apaga o id_classificação do JSON de filme
                        delete diretor.id_sexo
                    }
                }

            //Validação para verificar se o DAO retornou dados ou um FALSE(Eerro)

            if(result){
                            //Validação para verificar se o DAO tem algum dado no array

                if(result.length > 0){
                    customMessage.DEFAULT_MESSAGE.status = customMessage.SUCCESS_RESPONSE.status
                    customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCCESS_RESPONSE.status_code
                    customMessage.DEFAULT_MESSAGE.response.diretor = result

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


const atualizarDiretor = async function(diretor, id , contentType){
    let customMessage = JSON.parse(JSON.stringify(configMessages))


    try {
        if(String(contentType).toUpperCase() == "APPLICATION/JSON"){

            let resultBuscarDiretor = await buscarDiretor(id)
    
            if(resultBuscarDiretor.status){
    
                let validar = await validarDados(diretor)
    
                if(!validar){
    
                    diretor.id = Number(id)
    
                    let result = await diretorDAO.updateDiretor(await tratarDados(diretor))
    
                    if(result){
                        customMessage.DEFAULT_MESSAGE.status = customMessage.SUCESS_UPDATE_ITEM.status
    
                        customMessage.DEFAULT_MESSAGE.status_code = customMessage.SUCESS_UPDATE_ITEM.status_code
    
    
                        customMessage.DEFAULT_MESSAGE.message = customMessage.SUCESS_UPDATE_ITEM.message
    
                        customMessage.DEFAULT_MESSAGE.response = diretor
                        return customMessage.DEFAULT_MESSAGE
                    }else{

                        return customMessage.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return validar
                }
            }else{
                return resultBuscarDiretor
            }
        }else{
            return customMessage.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return customMessage.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


const tratarDados = async function (diretor) {

    diretor.nome = diretor.nome.replaceAll("'", "")
    diretor.data_nascimento = diretor.data_nascimento.replaceAll("'", "")
    diretor.foto = diretor.foto.replaceAll("'", "")
    diretor.biografia = diretor.biografia.replaceAll("'", "")

    return diretor
    
}


module.exports = {
    inserirNovoDiretor,
    listarDiretor,
    buscarDiretor,
    atualizarDiretor
}