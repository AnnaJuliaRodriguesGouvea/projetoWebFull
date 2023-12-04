const logger = require('../helpers/loggerConfig')
let cache = require('express-redis-cache');

cache = cache({
    prefix: process.env.PREFIX_REDIS,
    url: `${process.env.CONTAINER_NAME}://${process.env.HOST_REDIS}:${process.env.PORT_REDIS}`
})


cache.validateCache = (routeOptions, user, publish) => {
    return async (req, res, next) => {
        const routeKey = `${req.originalUrl}`;

        if (!cache.connected) {
            next();
            return;
        }

        cache.get(routeKey, async (err, entries) => {
            if (err) {
                let messageError = `Error validating cache for route ${routeKey}: ${err}`
                logger.logger.log('error', messageError)
                console.error(messageError);
                next();
            } else if (entries.length > 0) {
                publish(req.idLogged, user, "buscaRealizadaCache", req.query.filter, req.query.substring)
                res.send(JSON.parse(entries[0].body));
            } else {
                res.originalSend = res.send;
                res.send = (body) => {
                    cache.add(routeKey, body, { expire: routeOptions.expire }, (err) => {
                        if (err) {
                            let messageError = `Error saving cache for route ${routeKey}: ${err}`
                            logger.logger.log('error', messageError)
                            console.error(messageError);
                        }
                    });
                    res.originalSend(body);
                };
                next();
            }
        });
    }
}

cache.invalidate = () => {
    return (req, res, next) => {
        const route_name = `${req.originalUrl}?*`;
        if(!cache.connected) {
            next();
            return;
        }
        cache.del(route_name, (err) => {
            if (err) {
                let messageError = `Error invalidating cache for route ${route_name}: ${err}`
                logger.logger.log('error', messageError)
                console.error(messageError);
            } else {
                let messageSucess = `Cache invalidated for route: ${route_name}`
                logger.logger.log('info', messageSucess)
                console.log(messageSucess);
            }
        });
        next()
    }
}

module.exports = cache;
