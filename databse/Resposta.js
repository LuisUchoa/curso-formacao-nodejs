const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false

    },
    perguntaId: {   
        type: Sequelize.INTEGER,
        allowNull: false,   
    }
});

// Sincroniza o modelo com o banco de dados
Resposta.sync({force: false}).then(() => {
    console.log("Tabela criada ou já existe!");
}).catch((error) => {
    console.error("Erro ao criar tabela: ", error);
});

module.exports = Resposta;