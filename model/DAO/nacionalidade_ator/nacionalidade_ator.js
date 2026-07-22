const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertNacionalidadeAtor = async function(nacionalidadeAtor){
    try {
        let sql = `insert into tbl_nacionalidade_ator (
        id_nacionalidade,
        id_ator
    ) values (
        ${nacionalidadeAtor.id_nacionalidade},
        ${nacionalidadeAtor.id_ator}
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

const updateNacionalidadeAtor = async function(nacionalidadeAtor){
    try {

        let sql = `update tbl_nacionalidade_ator set    
        id_nacionalidade = ${nacionalidadeAtor.id_nacionalidade},
        id_ator = ${nacionalidadeAtor.id_ator}
        where id = ${nacionalidadeAtor.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
            return false
    }
}

const selectAllNacionalidadeAtor = async function(nacionalidadeAtor){
   try {
        let sql = "select * from tbl_nacionalidade_ator order by id desc"

        let result = await knexConection.raw(sql)

        if(Array.isArray(result)){
            return result[0]
        }else{
            return false
        } 
   } catch (error) {
        return false
   }
}

const selectByIdNacionalidadeAtor = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_nacionalidade_ator
        WHERE id = ${id};`
        

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}

//Função para retornar os dados do diretor filtrando pelo id do filme
const selectNacionalidadeByIdAtor = async function(idAtor) {
    try {

        let sql = `SELECT tbl_nacionalidade.*

        FROM tbl_nacionalidade

            INNER JOIN tbl_nacionalidade_ator
                ON tbl_nacionalidade.id = tbl_nacionalidade_ator.id_nacionalidade

            INNER JOIN tbl_ator
                ON tbl_ator.id = tbl_nacionalidade_ator.id_ator

        WHERE tbl_ator.id = ${idAtor};`

        let result = await knexConection.raw(sql)

        if (Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}


//Filtra filme pelo id do diretor
const selectAtorByIdNacionalidade = async function(id_nacionalidade) {
    try {
        
        let sql = `select tbl_ator.*

        FROM tbl_ator
            inner join tbl_nacionalidade_ator
                on tbl_ator.id = tbl_nacionalidade_ator.id_ator

            inner join tbl_nacionalidade
                on tbl_nacionalidade.id = tbl_nacionalidade_ator.id_nacionalidade
                
        WHERE tbl_nacionalidade.id = ${id_nacionalidade};`
        

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}

const deleteNacionalidadeAtor = async function(id){
    try {
        let sql = `DELETE FROM tbl_nacionalidade_ator WHERE id_ator=${id};`

        let result = await knexConection.raw(sql)
        console.log(result)

        if(result)
            return true
        else 
            return false
    } catch (error) {
            return false
    }
}

//Esta função será utilizada no put do filme
const deleteAtorByIdNacionalidade = async function(id){
    try {
        let sql = `DELETE FROM tbl_nacionalidade_ator WHERE id_nacionalidade=${id};`

        let result = await knexConection.raw(sql)
        console.log(result)

        if(result)
            return true
        else 
            return false
    } catch (error) {
            return false
    }
}

module.exports = {
    insertNacionalidadeAtor,
    updateNacionalidadeAtor,
    selectAllNacionalidadeAtor,
    selectByIdNacionalidadeAtor,
    selectNacionalidadeByIdAtor,
    selectAtorByIdNacionalidade,
    deleteNacionalidadeAtor,
    deleteAtorByIdNacionalidade
}