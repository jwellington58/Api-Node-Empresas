const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuarios');

const authConfig = require('../../config/authConfig');

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        // Verificando se existe
        const usuario = await Usuarios.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuário não cadastrado.' });
        }

        // Verificar se a senha não bate
        if (!(await usuario.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, nome } = usuario;

        return res.json({
            usuario: {
                id,
                nome,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

module.exports = new SessionController();
