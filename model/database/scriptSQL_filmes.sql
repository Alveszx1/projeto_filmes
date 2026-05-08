#Permite criar o database
create database db_filmes_20261_b;

#Permite visualizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;

create table tbl_filme (
	id int not null auto_increment primary key,
    nome varchar(80) not null,
    sinopse text not null,
    capa varchar(255) not null,
    data_lancamento date not null,
    duracao time not null,
    valor decimal(5,2) default 0,
    avaliacao decimal(3,2) default null
    
);

insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	"Super Mario Galaxy: O Filme",
    "Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.",
    "https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg",
    "2026-04-02",
    "01:39:00",
    "50.99",
    "3"
);

select * from tbl_filme order by id desc;

delete from tbl_filme where id = 1;

select * from tbl_filme where id = 9;
select * from tbl_filme ;

DELETE FROM tbl_filme WHERE id = 8;

update tbl_filme set 
	nome = 'Ariranha',
    sinopse = 'Testando a atualização do Filme',
    capa = 'teste',
    data_lancamento = '2026-04-29',
    duracao = '02:30:00',
    valor = '10',
    avaliacao = '2'
    where id = 9;
    
create table tbl_genero(
	id int not null auto_increment primary key,
    genero varchar(45) not null
);

insert into tbl_genero (
	genero
) values (
	"Ficção Cientifíca"
);

ALTER TABLE tbl_genero
CHANGE genero nome_genero VARCHAR(45) NOT NULL;

select * from tbl_genero;

desc tbl_genero;

select * from tbl_genero order by id desc;
    
   

