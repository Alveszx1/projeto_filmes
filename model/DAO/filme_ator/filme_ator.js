const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeAtor = async function(filmeAtor){
    try {
        let sql = `insert into tbl_filme_ator (
        id_filme,
        id_ator
    ) values (
        ${filmeAtor.id_filme},
        ${filmeAtor.id_ator}
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

const updateFilmeAtor = async function(filmeAtor){
    try {

        let sql = `update tbl_filme_ator set    
        id_filme = ${filmeAtor.id_filme},
        id_ator = ${filmeAtor.id_ator}
        where id = ${filmeAtor.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
            return false
    }
}

const selectAllFilmeAtor = async function(filmeAtor){
   try {
        let sql = "select * from tbl_filme_ator order by id desc"

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

const selectByIdFilmeAtor = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_filme_ator
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

//Função para retornar os dados do ator filtrando pelo id do filme
const selectAtorByIdFilme = async function(idFilme) {
    try {
        
        let sql = `select tbl_ator.*

        FROM tbl_filme 

            inner join tbl_filme_ator
                on tbl_filme.id = tbl_filme_ator.id_filme

            inner join tbl_ator
                on tbl_ator.id = tbl_filme_ator.id_ator

        WHERE tbl_filme.id = ${idFilme};`
        

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}


//Filtra filme pelo id do ator
const selectFilmeByIdAtor = async function(id_ator) {
    try {
        
        let sql = `select tbl_filme.*

        FROM tbl_filme
            inner join tbl_filme_ator
                on tbl_filme.id = tbl_filme_ator.id_filme

            inner join tbl_ator
                on tbl_ator.id = tbl_filme_ator.id_ator
                
        WHERE tbl_ator.id = ${id_ator};`
        

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}

const deleteFilmeAtor = async function(id){
    try {
        let sql = `DELETE FROM tbl_filme_ator WHERE id=${id};`

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
const deleteAtorByIdFilme = async function(id){
    try {
        let sql = `DELETE FROM tbl_filme_ator WHERE id_filme=${id};`

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
    insertFilmeAtor,
    updateFilmeAtor,
    selectAllFilmeAtor,
    selectByIdFilmeAtor,
    selectAtorByIdFilme,
    selectFilmeByIdAtor,
    deleteFilmeAtor,
    deleteAtorByIdFilme
}