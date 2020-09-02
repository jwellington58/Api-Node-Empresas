const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class Empresas extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                telefone: Sequelize.STRING,
                facebook: Sequelize.STRING,
                linkedin: Sequelize.STRING,
                instagram: Sequelize.STRING,
                foto: Sequelize.STRING,
                password_hash: Sequelize.VIRTUAL,
            },
            {
                sequelize,
                tableName: 'empresas',
            }
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password_hash) {
                user.password = await bcrypt.hash(user.password_hash, 8);
            }
        });

        return this;
    }

    checkPassword(password_hash) {
        return bcrypt.compare(password_hash, this.password);
    }
}

module.exports = Empresas;
