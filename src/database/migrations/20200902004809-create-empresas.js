module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('empresas', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            telefone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            facebook: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            linkedin: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            instagram: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            foto: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('empresas');
    },
};
