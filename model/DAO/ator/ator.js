const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)


const insertAtor = async function(ator){
    try {
        let sql = `INSERT INTO tbl_ator (
    nome,
    data_nascimento,
    foto,
    biografia,
    id_sexo
) VALUES (
    '${ator.nome}',
    '${ator.data_nascimento}',
    '${ator.foto}',
    '${ator.biografia}',
     ${ator.id_sexo}
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

const selectAllAtor = async function () {
    try {
        // Script SQL para listar todos os filmes cadastrados
        let sql = "select * from tbl_ator order by id desc"

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

const selectAtorById = async function(id) {
    try {
        
        let sql = `SELECT * FROM tbl_ator
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


const updateAtor = async function (ator) {
    try {
        let sql = `update tbl_ator set 
    nome = '${filme.nome}',
    data_nascimento = '${filme.sinopse}',
    foto = '${filme.capa}',
    biografia = '${filme.data_lancamento}',
    id_sexo = '${filme.duracao}',
    where id = ${filme.id};`

    let result = await knexConection.raw(sql)

    if(result)
        return true
    else 
        return false

    } catch (error) {
        return false
    }
    
}

module.exports = {
    insertAtor,
    selectAllAtor,
    selectAtorById,
    updateAtor
}