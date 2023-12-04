const Joi = require("joi")
const logger = require('../helpers/loggerConfig')

const minLimit = 6
const mediumLimit = 12
const maxLimit = 18

module.exports = {
    validateLimit: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.limit)
        if (error) {
            let messageError = "Erro na validação do limite da página"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "O limite não pode ser nulo"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        if(req.query.limit != minLimit && req.query.limit != mediumLimit && req.query.limit != maxLimit) {
            let messageError = "O limite só pode ser 6, 12 ou 18"
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError)
        }

        req.query.limit = value
        return next()
    },

    validatePage: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.query.page)
        if (error) {
            let messageError = "Erro na validação da página"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "A página não pode ser nulo"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.query.page = value
        return next()
    },

}
