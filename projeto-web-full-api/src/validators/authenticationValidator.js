const Joi = require("joi")
const jwt = require('jsonwebtoken')
const logger = require('../helpers/loggerConfig')

module.exports = {
    validatePassword: function(req, res, next) {
        const {error, value} = Joi.string()
                                                .trim()
                                                .normalize()
                                                .required()
                                                .validate(req.body.password)

        if (error) {
            let messageError = "Erro na validação da senha"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "A senha não pode ser nula"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.password = value
        return next()
    },

    validateToken: async function(req, res, next) {
        let token = req.headers['authorization']
        if (!token)
            token = ''
        token = token.split('Bearer ')[1]
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                let messageError = "Acesso negado - Token invalido"
                logger.logger.log('error', messageError)
                res.status(403).json(messageError)
                return
            }
            req.idLogged = payload.idLogged
            next()
        })
    },
}
