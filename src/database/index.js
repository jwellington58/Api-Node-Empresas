const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Empresas = require('../app/models/Empresas');

// Variável para receber todos os models
const models = [Empresas];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // Conexão do banco com os models
        this.connection = new Sequelize(databaseConfig);

        models.map((model) => model.init(this.connection));
    }
}

module.exports = new Database();
