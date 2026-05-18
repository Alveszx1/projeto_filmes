const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertClassificacao = async function(classificacao){
    try {
        let sql = `insert into tbl_classificacao (
    classificacao
    ) values (
    "${classificacao.classificacao}"
    );`
    let result = await knexConection.raw(sql)
    if(result)
        return result[0].insertId
    else
        return false

    } catch (error) {
        console.log(error)
        return false
    }
}


const selectAllClassificacao = async function () {
    try {
        // Script SQL para listar todos os filmes cadastrados
        let sql = "select * from tbl_classificacao order by id desc"

        //Executa no banco de dados o script e guarda o retorno do banco
        //Pode ser um erro (false) ou um array com os dados
        let result = await knexConection.raw(sql)

        // Validação para verificar se o retorno do BD é um Array ou boolean (false)
        if(Array.isArray(result)){
            return result[0] // retorna somente o indice com a lista de filmes
        } else{
            // Return false do banco de dados
            return false
        }

    } catch (error) {
        // return false do JavaScritp
       return false 
    }
}


const selectClassificacaoById = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_classificacao
        WHERE id = ${id};`
        

        let result = await knexConection.raw(sql)

        console.log(result)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}



const updateClassificacao = async function(classificacao){
    try {

        let sql = `update tbl_classificacao set    
        classificacao = '${classificacao.classificacao}'
        where id = ${classificacao.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {

        console.log(error)
            return false
    }
}

module.exports = {
    insertClassificacao,
    selectAllClassificacao,
    selectClassificacaoById,
    updateClassificacao
}