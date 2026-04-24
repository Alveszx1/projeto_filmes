/**
 * Objetivo: Arquivo responsável pelo CRUD de dados do filme no banco de dados
 *      MYSQL
 * Data: 15/04/2026
 * Autor: Bruno Haddad Alves
 * Versão: 1.0
 * 
 */


// Faz o import da biblioteca para manipular dados no banco de dados MySQL
const knex = require("knex")

// Import do arquivo de configuração para acesso ao banco de dados
const knexDatabaseConfig = require("../../database_config/knexConfig.js")

// Criar a conexão com o BD Mysql conforme o arquivo de configuração
const knexConection = knex(knexDatabaseConfig.development)

//Função para inserir um novo filme no banco de dados 
const insertFilme = async function(filme){

    try {
        
     
    let sql = `insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	"${filme.nome}",
    "${filme.sinopse}",
    "${filme.capa}",
    "${filme.data_lancamento}",
    "${filme.duracao}",
    "${filme.valor}",
    if('${filme.avaliacao}' = " ", null, '${filme.avaliacao}')
);`
// Encaminha para o banco de dados o scriptSQL
let result = await knexConection.raw(sql)

if(result)
    return true
else    
    return false    

}

catch (error) {
    return false    
    }
}




//Funcão para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {
    
}

//Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function () {
    try {
        // Script SQL para listar todos os filmes cadastrados
        let sql = "select * from tbl_filme order by id desc"

        //Executa no banco de dados o script e guarda o retorno do banco
        //Pode ser um erro (false) ou um array com os dados
        let result = await knexConection.raw(sql)

        // Validação para verificar se o retorno do BD é um Array ou boolean (false)
        if(Array.isArray(result)){
            console.log(result[0])
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


//Função para retornar um filme filtrando pelo id 
const selectByIdFilme = async function (id) {
    try {

        let sql = `select * from tbl_filme where id=${id}`

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

//Fnção para excluir um filme filtrando pelo id  
const deleteFilme = async function (id) {
    
}

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}