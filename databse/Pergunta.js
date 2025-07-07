const Sequelize = require('sequelize');
const connection = require('./database');

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }   
});

// Sincroniza o modelo com o banco de dados
Pergunta.sync({force: false}).then(() => {
    console.log("Tabela criada ou já existe!");
}).catch((error) => {
    console.error("Erro ao criar tabela: ", error);
});