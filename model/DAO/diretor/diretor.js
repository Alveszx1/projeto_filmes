const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertDiretor = async function(diretor){
    try {
        let sql = `INSERT INTO tbl_diretor (
    nome,
    data_nascimento,
    biografia,
    id_sexo
) VALUES (
    '${diretor.nome}',
    '${diretor.data_nascimento}',
    '${diretor.biografia}',
     ${diretor.id_sexo}
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

const selectAllDiretor = async function () {
    try {
        // Script SQL para listar todos os filmes cadastrados
        let sql = "select * from tbl_diretor order by id desc"

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

const selectDiretorById = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_diretor
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


const updateDiretor = async function (diretor) {
    try {
        let sql = `update tbl_diretor set 
    nome = '${diretor.nome}',
    data_nascimento = '${diretor.data_nascimento}',
    biografia = '${diretor.biografia}',
    id_sexo = '${diretor.id_sexo}'
    where id = ${diretor.id};`

    let result = await knexConection.raw(sql)

    if(result)
        return true
    else 
        return false

    } catch (error) {
        console.log(error   )
        return false
    }
    
}

const deleteDiretor = async function(id){
    try {
        let sql = `DELETE FROM tbl_diretor WHERE id=${id};`

        let result = await knexConection.raw(sql)
        console.log(result)

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
    insertDiretor,
    selectAllDiretor,
    selectDiretorById,
    updateDiretor,
    deleteDiretor
}