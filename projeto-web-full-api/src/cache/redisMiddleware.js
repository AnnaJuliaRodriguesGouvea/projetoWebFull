const userService = require("../services/userService");
const fruitService = require("../services/fruitService");
const cache = require("./redisConfig");
const logger = require('../helpers/loggerConfig')

module.exports = {
    cacheValidate: async function(req, res, next) {
        const user = await userService.getUserById(req.idLogged)
        if(!user) {
            let messageError = "Usuário não encontrado"
            logger.logger.log('error', messageError)
            return res.status(500).json(messageError);
        }

        return await cache.validateCache({ expire: 60 }, user, fruitService.publish)(req, res, next);
        // fruitService.publish(req.idLogged, user, "buscaRealizadaCache", req.query.filter, req.query.substring)
        // return await cache.route({ expire: 60  })(req, res, next);
    },
}
