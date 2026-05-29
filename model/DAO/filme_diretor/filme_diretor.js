const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeDiretor = async function(filmeDiretor){
    try {
        let sql = `insert into tbl_filme_diretor (
        id_filme,
        id_diretor
    ) values (
        ${filmeDiretor.id_filme},
        ${filmeDiretor.id_diretor}
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

const updateFilmeDiretor = async function(filmeDiretor){
    try {

        let sql = `update tbl_filme_diretor set    
        id_filme = ${filmeDiretor.id_filme},
        id_diretor = ${filmeDiretor.id_diretor}
        where id = ${filmeDiretor.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
            return false
    }
}

const selectAllFilmeDiretor = async function(filmeDiretor){
   try {
        let sql = "select * from tbl_filme_diretor order by id desc"

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

const selectByIdFilmeDiretor = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_filme_diretor
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
const selectDiretorByIdFilme = async function(idFilme) {
    try {
        
        let sql = `select tbl_diretor.*

        FROM tbl_filme 

            inner join tbl_filme_diretor
                on tbl_filme.id = tbl_filme_diretor.id_filme

            inner join tbl_diretor
                on tbl_diretor.id = tbl_filme_diretor.id_diretor

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


//Filtra filme pelo id do diretor
const selectFilmeByIdDiretor = async function(id_diretor) {
    try {
        
        let sql = `select tbl_filme.*

        FROM tbl_filme
            inner join tbl_filme_diretor
                on tbl_filme.id = tbl_filme_diretor.id_filme

            inner join tbl_diretor
                on tbl_diretor.id = tbl_filme_diretor.id_genero
                
        WHERE tbl_diretor.id = ${id_diretor};`
        

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}

const deleteFilmeDiretor = async function(id){
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id=${id};`

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
const deleteDiretorByIdFilme = async function(id){
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id_filme=${id};`

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
    insertFilmeDiretor,
    updateFilmeDiretor,
    selectAllFilmeDiretor,
    selectByIdFilmeDiretor,
    selectDiretorByIdFilme,
    selectFilmeByIdDiretor,
    deleteFilmeDiretor,
    deleteDiretorByIdFilme
}