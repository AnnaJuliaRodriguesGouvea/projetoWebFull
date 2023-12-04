const Joi = require("joi")
const logger = require('../helpers/loggerConfig')

module.exports = {
    validateEmail: function(req, res, next) {
        let {error, value} = Joi.string()
                                                    .trim()
                                                    .normalize()
                                                    .email()
                                                    .required().validate(req.body.email)
        if (error) {
            let messageError = "Erro na validação do email"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "O email não pode ser nulo"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            if (error.details && error.details[0].type === 'string.email') {
                messageError = "O email não está no formato correto"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        value = value.replace(/([&<>"'\/])/g, (match) => {
            switch (match) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '>':
                    return '&gt;';
                case '"':
                    return '&quot;';
                case "'":
                    return '&#39;';
                case '/':
                    return '&#x2F;';
                default:
                    return match;
            }
        })

        req.body.email = value
        return next()
    },

    validatePassword: function(req, res, next) {
        const {error, value} = Joi.string()
                                                .trim()
                                                .normalize()
                                                .min(6)
                                                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
                                                .required()
                                                .validate(req.body.password)

        if (error) {
            let messageError = "Erro na validação da senha"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "A senha não pode ser nula"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            if (error.details && error.details[0].type === 'string.min') {
                messageError = "A senha deve ter pelo menos 6 caracteres"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            if (error.details && error.details[0].type === 'string.pattern.base') {
                messageError = "A senha não atende aos requisitos mínimos"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }

            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.password = value
        return next()
    },
}
