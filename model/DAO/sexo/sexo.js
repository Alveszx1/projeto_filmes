const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertSexo = async function(sexo){
    try {
        let sql = `insert into tbl_sexo (
	sexo
    ) values (
	"${sexo.sexo}"
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

const selectAllSexo = async function(){
   try {
        let sql = "select * from tbl_sexo order by id desc"

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

const selectSexoById = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_sexo
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


const updateSexo = async function(sexo, id){
    try {

        let sql = `update tbl_sexo set    
        sexo = '${sexo.sexo}'
        where id = ${sexo.id};`
        
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


const deleteSexo = async function(id){
    try {
        let sql = `DELETE FROM tbl_sexo WHERE id=${id};`

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
    insertSexo,
    selectAllSexo,
    selectSexoById,
    updateSexo,
    deleteSexo
    
}