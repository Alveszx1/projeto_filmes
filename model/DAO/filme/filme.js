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
    "${filme.avaliacao}"
);`
// Encaminha para o banco de dados o scriptSQL
let result = await knexConection.raw(sql)

}




//Funcão para atualizar um filme existente no banco de dados
const updateFilme = async function (filme) {
    
}

//Função para retornar todos os dados de filme do banco de dados
const selectAllFilme = async function () {
    
}

//Função para retornar um filme filtrando pelo id 
const selectByIdFilme = async function (id) {
    
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