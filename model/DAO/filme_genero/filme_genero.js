const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertFilmeGenero = async function(filmeGenero){
    try {
        let sql = `insert into tbl_filme_genero (
        id_filme,
        id_genero
    ) values (
        ${filmeGenero.id_filme},
        ${filmeGenero.id_genero}
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

const updateFilmeGenero = async function(filmeGenero){
    try {

        let sql = `update tbl_filme_genero set    
        id_filme = ${filmeGenero.id_filme},
        id_genero = ${filmeGenero.id_genero}
        where id = ${filmeGenero.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
            return false
    }
}

const selectAllFilmeGenero = async function(filmeGenero){
   try {
        let sql = "select * from tbl_filme_genero order by id desc"

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

const selectByIdFilmeGenero = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_filme_genero
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

//Função para retornar os dados do genero  filtrando pelo id do filme
const selectGenerosByIdFilme = async function(idFilme) {
    try {
        
        let sql = `select tbl_genero.*

        FROM tbl_filme 

            inner join tbl_filme_genero
                on tbl_filme.id = tbl_filme_genero.id_filme

            inner join tbl_genero
                on tbl_genero.id = tbl_filme_genero.id_genero

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



const selectFilmeByIdGenero = async function(idGenero) {
    try {
        
        let sql = `select tbl_filme.*

        FROM tbl_filme
            inner join tbl_filme_genero
                on tbl_filme.id = tbl_filme_genero.id_filme

            inner join tbl_genero
                on tbl_genero.id = tbl_filme_genero.id_genero
                
        WHERE tbl_genero.id = ${idGenero};`
        

        let result = await knexConection.raw(sql)

        if(Array.isArray(result))
            return result[0]
        else
            return false

    } catch (error) {

        return false

    }
}

const deleteFilmeGenero = async function(id){
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id=${id};`

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
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmeByIdGenero
}