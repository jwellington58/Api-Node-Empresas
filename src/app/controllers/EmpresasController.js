const Empresas = require('../models/Empresas');

class EmpresasController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const empresas = await Empresas.findAll({
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(empresas);
    }

    async show(req, res) {
        const empresaId = req.headers.empresa_id;
        const empresa = await Empresas.findByPk(empresaId);

        if (!empresa) {
            return res.status(404).json({ message: 'Empresa não encontrada!' });
        }

        return res.json(empresa);
    }

    async store(req, res) {
        const empresaExists = await Empresas.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (empresaExists) {
            return res.status(400).json({ error: 'Empresa já cadastrada.' });
        }

        const {
            id,
            email,
            nome,
            telefone,
            facebook,
            linkedin,
            instagram,
            foto,
            cidade,
            estado,
            pais,
        } = await Empresas.create(req.body);

        return res.json({
            id,
            email,
            nome,
            telefone,
            facebook,
            linkedin,
            instagram,
            foto,
            cidade,
            estado,
            pais,
        });
    }

    async update(req, res) {
        const { email, oldPassword } = req.body;
        const empresa = await Empresas.findByPk(req.headers.empresa_id);

        if (!empresa) {
            return res.status(404).json({ error: 'Empresa não encontrada.' });
        }

        if (email !== empresa.email) {
            const empresaExists = await Empresas.findOne({
                where: { email },
            });

            if (empresaExists) {
                return res.status(400).json({ error: 'Email já cadastrado.' });
            }
        }

        if (oldPassword && !(await empresa.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        const {
            id,
            nome,
            telefone,
            facebook,
            linkedin,
            instagram,
            foto,
            cidade,
            estado,
            pais,
        } = await empresa.update(req.body);

        return res.json({
            id,
            email,
            nome,
            telefone,
            facebook,
            linkedin,
            instagram,
            foto,
            cidade,
            estado,
            pais,
        });
    }

    async delete(req, res) {
        const empresaId = req.headers.empresa_id;
        const empresa = await Empresas.findByPk(empresaId);

        if (!empresa) {
            return res.status(400).json({ error: 'Empresa não existente.' });
        }

        await empresa.destroy();
        return res.send();
    }
}

module.exports = new EmpresasController();
