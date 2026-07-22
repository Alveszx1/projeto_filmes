const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertNacionalidadeDiretor = async function(nacionalidadeDiretor){
    try {
        let sql = `insert into tbl_nacionalidade_diretor (
        id_nacionalidade,
        id_diretor
    ) values (
        ${nacionalidadeDiretor.id_nacionalidade},
        ${nacionalidadeDiretor.id_diretor}
    );`
    let result = await knexConection.raw(sql)
    if(result)
        return result[0].insertId
    else
        return false

    } catch (error) {
        return false
    }
}

const updateNacionalidadeDiretor = async function(nacionalidadeDiretor){
    try {

        let sql = `update tbl_nacionalidade_diretor set    
        id_nacionalidade = ${nacionalidadeDiretor.id_nacionalidade},
        id_diretor = ${nacionalidadeDiretor.id_diretor}
        where id = ${nacionalidadeDiretor.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
            return false
    }
}

const selectAllNacionalidadeDiretor = async function(nacionalidadeDiretor){
   try {
        let sql = "select * from tbl_nacionalidade_diretor order by id desc"

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

const selectByIdNacionalidadeDiretor = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_nacionalidade_diretor
        WHERE id_diretor = ${id};`
        

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
const selectNacionalidadeByIdDiretor = async function(idDiretor) {
    try {

        let sql = `SELECT tbl_nacionalidade.*

        FROM tbl_nacionalidade

            INNER JOIN tbl_nacionalidade_diretor
                ON tbl_nacionalidade.id = tbl_nacionalidade_diretor.id_nacionalidade

            INNER JOIN tbl_diretor
                ON tbl_diretor.id = tbl_nacionalidade_diretor.id_diretor

        WHERE tbl_diretor.id = ${idDiretor};`

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
const selectDiretorByIdNacionalidade = async function(id_nacionalidade) {
    try {
        
        let sql = `select tbl_diretor.*

        FROM tbl_diretor
            inner join tbl_nacionalidade_diretor
                on tbl_diretor.id = tbl_nacionalidade_diretor.id_diretor

            inner join tbl_nacionalidade
                on tbl_nacionalidade.id = tbl_nacionalidade_diretor.id_nacionalidade
                
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

const deleteNacionalidadeDiretor = async function(id){
    try {
        let sql = `DELETE FROM tbl_nacionalidade_diretor WHERE id_diretor=${id};`

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
const deleteDiretorByIdNacionalidade = async function(id){
    try {
        let sql = `DELETE FROM tbl_nacionalidade_diretor WHERE id_nacionalidade=${id};`

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
    insertNacionalidadeDiretor,
    updateNacionalidadeDiretor,
    selectAllNacionalidadeDiretor,
    selectByIdNacionalidadeDiretor,
    selectNacionalidadeByIdDiretor,
    selectDiretorByIdNacionalidade,
    deleteNacionalidadeDiretor,
    deleteDiretorByIdNacionalidade
}