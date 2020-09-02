const jwt = require('jsonwebtoken');
const Empresas = require('../models/Empresas');

const authConfig = require('../../config/authConfig');

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        // Verificando se existe
        const empresa = await Empresas.findOne({ where: { email } });
        if (!empresa) {
            return res.status(401).json({ error: 'Empresa não cadastrada.' });
        }

        // Verificar se a senha não bate
        if (!(await empresa.checkPassword(password))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, nome } = empresa;

        return res.json({
            empresa: {
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
