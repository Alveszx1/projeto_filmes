const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertNacionalidade = async function(nacionalidade){
    try {
        let sql = `insert into tbl_nacionalidade (
    nacionalidade
    ) values (
    "${nacionalidade.nacionalidade}"
    );`
    let result = await knexConection.raw(sql)
    if(result)
        return result[0].insertId
    else
        console.log(result)
        return false

    } catch (error) {
        console.log(error)
        return false
    }
}


const selectAllNacionalidade = async function(){
   try {
        let sql = "select * from tbl_nacionalidade order by id desc"

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


const selectNacionalidadeById = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_nacionalidade
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


const updateNacionalidade = async function(nacionalidade){
    try {

        let sql = `update tbl_nacionalidade set    
        nacionalidade = '${nacionalidade.nacionalidade}'
        where id = ${nacionalidade.id};`
        
        let result = await knexConection.raw(sql)

        if(result)
            return true
        else
            return false

        
    } catch (error) {
            return false
    }
}


const deleteNacionalidade = async function(id){
    try {
        let sql = `DELETE FROM tbl_nacionalidade WHERE id=${id};`

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
    insertNacionalidade,
    selectAllNacionalidade,
    selectNacionalidadeById,
    updateNacionalidade,
    deleteNacionalidade
}
    