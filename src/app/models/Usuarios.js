const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class Usuarios extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                password_hash: Sequelize.VIRTUAL,
            },
            {
                sequelize,
                tableName: 'usuarios',
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

module.exports = Usuarios;
