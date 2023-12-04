const Joi = require("joi")
const logger = require('../helpers/loggerConfig')

module.exports = {
    validateName: function(req, res, next) {
        let {error, value} = Joi.string()
                                                .trim()
                                                .normalize()
                                                .required().validate(req.body.name)
        if (error) {
            let messageError = "Erro na validação do nome"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "O nome não pode ser nulo"
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

        req.body.name = value
        return next()
    },

    validateFamily: function(req, res, next) {
        let {error, value} = Joi.string()
                                                .trim()
                                                .normalize()
                                                .required().validate(req.body.family)
        if (error) {
            let messageError = "Erro na validação da família"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "A família não pode ser nula"
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

        req.body.family = value
        return next()
    },

    validateOrder: function(req, res, next) {
        let {error, value} = Joi.string()
                                                .trim()
                                                .normalize()
                                                .required().validate(req.body.order)
        if (error) {
            let messageError = "Erro na validação da ordem"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "A ordem não pode ser nula"
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

        req.body.order = value
        return next()
    },

    validateGenus: function(req, res, next) {
        let {error, value} = Joi.string()
                                                .trim()
                                                .normalize()
                                                .required().validate(req.body.genus)
        if (error) {
            let messageError = "Erro na validação do gênero"
            if (error.details && error.details[0].type === 'string.empty') {
                messageError = "O gênero não pode ser nula"
                logger.logger.log('error', messageError)
                return res.status(400).json();
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

        req.body.genus = value
        return next()
    },

    validateCalories: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.calories)
        if (error) {
            let messageError = "Erro na validação das calorias"
            if (error.details && error.details[0].type === 'number.base') {
                messageError = "As calorias não podem ser nula"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.calories = value
        return next()
    },

    validateFat: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.fat)
        if (error) {
            let messageError = "Erro na validação da gordura"
            if (error.details && error.details[0].type === 'number.base') {
                messageError = "A gordura não pode ser nula"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.fat = value
        return next()
    },

    validateSugar: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.sugar)
        if (error) {
            let messageError = "Erro na validação do açúcar"
            if (error.details && error.details[0].type === 'number.base') {
                messageError = "O açúcar não pode ser nulo"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.sugar = value
        return next()
    },

    validateCarbohydrates: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.carbohydrates)
        if (error) {
            let messageError = "Erro na validação dos carboidratos"
            if (error.details && error.details[0].type === 'number.base') {
                messageError = "Os carboidratos não podem ser nulo"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.carbohydrates = value
        return next()
    },

    validateProtein: function(req, res, next) {
        const {error, value} = Joi.number().integer().required().validate(req.body.protein)
        if (error) {
            let messageError = "Erro na validação da proteína"
            if (error.details && error.details[0].type === 'number.base') {
                messageError = "A proteína não pode ser nula"
                logger.logger.log('error', messageError)
                return res.status(400).json(messageError);
            }
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.body.protein = value
        return next()
    },

    validateFilter: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.query.filter)
        if (error) {
            let messageError = "Erro na validação do filter"
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.query.filter = value
        return next()
    },

    validateSubstring: function(req, res, next) {
        const {error, value} = Joi.string().required().validate(req.query.substring)
        if (error) {
            let messageError = "Erro na validação da substring"
            logger.logger.log('error', messageError)
            return res.status(400).json(messageError);
        }

        req.query.substring = value
        return next()
    },
}
