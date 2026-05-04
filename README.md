Aqui está o README completo e correto para colar no GitHub:
markdown# 🎬 API de Cadastro de Filmes

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-Framework-black)
![Knex](https://img.shields.io/badge/Knex-Query%20Builder-orange)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)

API REST desenvolvida para gerenciamento de filmes, utilizando arquitetura **MVC (Model-View-Controller)**.
Permite realizar operações completas de **CRUD** (Create, Read, Update, Delete), com foco em organização de código e boas práticas de backend.

---

## 📂 Estrutura do Projeto
📦 projeto-filmes
┣ 📂 src
┃ ┣ 📂 controller
┃ ┃ ┗ filmeController.js
┃ ┣ 📂 model
┃ ┃ ┗ filmeModel.js
┃ ┗ app.js
┣ 📄 package.json
┗ 📄 README.md

---

## 🧠 Arquitetura MVC

- **Model** → Acesso ao banco de dados (Knex)
- **Controller** → Regras de negócio
- **App (Express)** → Definição das rotas

> 📌 As rotas estão implementadas diretamente no `app.js`.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- Knex.js
- MySQL
- JavaScript (ES6+)

---

## ⚙️ Configuração do Ambiente

### 1. Clonar repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Criar banco de dados

```sql
CREATE DATABASE db_filmes;
```

### 4. Criar tabela

```sql
CREATE TABLE tbl_filme (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    sinopse TEXT,
    capa VARCHAR(255),
    data_lancamento DATE,
    duracao INT,
    valor DECIMAL(10,2),
    avaliacao FLOAT
);
```

### 5. Configurar conexão com Knex

```js
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'sua_senha',
    database: 'db_filmes'
  }
})

module.exports = knex
```

---

## ▶️ Como Executar

```bash
npm start
```

Servidor rodando em: `http://localhost:8080`

---

## 📡 Endpoints da API

### 🎥 Listar todos os filmes
GET /filmes

### 🔍 Buscar filme por ID
GET /filmes/:id

### ➕ Cadastrar novo filme
POST /filmes

**Body:**
```json
{
  "nome": "Interestelar",
  "sinopse": "Exploração espacial",
  "capa": "url_da_imagem",
  "data_lancamento": "2014-11-07",
  "duracao": 169,
  "valor": 29.90,
  "avaliacao": 9.0
}
```

### ✏️ Atualizar filme
PUT /filmes/:id

### ❌ Deletar filme
DELETE /filmes/:id
