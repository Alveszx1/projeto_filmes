const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

const insertGenero = async function(genero){
    try {
        let sql = `insert into tbl_genero (
	nome_genero
    ) values (
	"${genero.nome_genero}"
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

const updateGenero = function(){

}

const selectAllGenero = async function(){
   try {
        let sql = "select * from tbl_genero order by id desc"

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

module.exports = {
    insertGenero,
    selectAllGenero
    
}