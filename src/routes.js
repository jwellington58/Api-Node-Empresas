const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const EmpresasController = require('./app/controllers/EmpresasController');
const SessionController = require('./app/controllers/SessionController');

const auth = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('Initial commit');
});

routes.post(
    '/session',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }),
    }),
    SessionController.store
);

routes.use(auth);

routes.get('/empresas', EmpresasController.index);
routes.get(
    '/empresas/id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            empresa_id: Joi.number().integer().required(),
        }).unknown(),
    }),
    EmpresasController.show
);
routes.post(
    '/empresas',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            telefone: Joi.string().required(),
            facebook: Joi.optional(),
            linkedin: Joi.optional(),
            instagram: Joi.optional(),
            foto: Joi.optional(),
            password_hash: Joi.string().required(),
        }),
    }),
    EmpresasController.store
);
routes.put(
    '/empresas/id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            empresa_id: Joi.number().integer().required(),
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            nome: Joi.string().required(),
            email: Joi.string().required().email(),
            telefone: Joi.string().required(),
            facebook: Joi.optional(),
            linkedin: Joi.optional(),
            instagram: Joi.optional(),
            foto: Joi.optional(),
            oldPassword: Joi.string().required(),
            password_hash: Joi.string().required(),
        }),
    }),
    EmpresasController.update
);
routes.delete(
    '/empresas/id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            empresa_id: Joi.number().integer().required(),
        }).unknown(),
    }),
    EmpresasController.delete
);

module.exports = routes;
