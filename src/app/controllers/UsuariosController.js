const Usuarios = require('../models/Usuarios');

class UsuariosController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const usuarios = await Usuarios.findAll({
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(usuarios);
    }

    async show(req, res) {
        const usuarioId = req.headers.usuario_id;
        const usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        return res.json(usuario);
    }

    async store(req, res) {
        const usuarioExists = await Usuarios.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (usuarioExists) {
            return res.status(400).json({ error: 'Usuário já cadastrado.' });
        }

        const { id, email, nome } = await Usuarios.create(req.body);

        return res.json({
            id,
            email,
            nome,
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        const usuario = await Usuarios.findByPk(req.headers.usuario_id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        if (email !== usuario.email) {
            const usuarioExists = await Usuarios.findOne({
                where: { email },
            });

            if (usuarioExists) {
                return res.status(400).json({ error: 'Email já cadastrado.' });
            }
        }

        if (oldPassword && !(await usuario.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const { id, nome } = await usuario.update(req.body);

        return res.json({
            id,
            email,
            nome,
        });
    }

    async delete(req, res) {
        const usuarioId = req.headers.usuario_id;
        const usuario = await Usuarios.findByPk(usuarioId);

        if (!usuario) {
            return res.status(400).json({ error: 'Usuário não existente.' });
        }

        await usuario.destroy();
        return res.send();
    }
}

module.exports = new UsuariosController();
