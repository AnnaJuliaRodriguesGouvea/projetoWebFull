const fruitDao = require("../DAO/fruitDao")
const {Op} = require("sequelize");
const mq = require('../messaging/producers/publishQueue');
const userService = require("./userService")
const logger = require('../helpers/loggerConfig')
const websocket = require("../websocket/websocketConfig")

module.exports = {
    existFruit: async function(name) {
        return await fruitDao.getByName(name) != null
    },

    publish: function(idLogged, user, acao, filter, substring) {
        const message = {
            data: new Date(),
            acao: acao,
            autorId: idLogged,
            autorEmail: user.email,
            filter: filter,
            substring: substring
        }

        console.log("Entrei")
        mq.publish('SistemaLogExchange', 'busca-fruits-realizada-log', JSON.stringify(message))
    },

    registerFruit: async function(idLogged, name, family, order, genus, calories, fat, sugar, carbohydrates, protein) {
        if(!await this.existFruit(name)) {
            const users = await userService.getAllOtherUsers(idLogged)
            if (!users) {
                messageError = "Erro ao capturar todos os outros usuários"
                logger.logger.log('error', messageError)
                return {status: 500, data: messageError}
            }

            const fruit = await fruitDao.insert(name, family, order, genus, calories, fat, sugar, carbohydrates, protein)
            logger.logger.log('info', "Sucesso ao cadastrar fruta!")

            websocket.addNotification({
                publisherId: idLogged,
                msg: `Inserido nova fruta por user id: ${idLogged}`,
                users: users.map((user) => user.id)
            })
            return {status: 201, data: fruit}
        }
        let messageError = "Já existe uma fruta com esse nome"
        logger.logger.log('error', messageError)
        return {status: 409, data: messageError}
    },

    listFruit: async function(idLogged, limit, page, filter, substring) {
        let whereCondition = {}
        let messageError = ""
        if (filter !== "null" && substring !== "null") {
            whereCondition[filter] = { [Op.iLike]: `%${substring}%` };
        }

        const fruits = await fruitDao.list(limit, page, whereCondition)
        if (fruits) {
            const user = await userService.getUserById(idLogged)
            if (!user) {
                messageError = "Usuário não encontrado"
                logger.logger.log('error', messageError)
                return {status: 500, data: messageError}
            }

            this.publish(idLogged, user, "buscaRealizadaDB", filter, substring)

            if(fruits.rows.length > 0) {
                const formattedFruits = await Promise.all(
                    fruits.rows.map(async (fruit) => {
                        return {
                            id: fruit.dataValues.id,
                            name: fruit.dataValues.name,
                            family: fruit.dataValues.family,
                            order: fruit.dataValues.order,
                            genus: fruit.dataValues.genus,
                            nutritions: {
                                calories: fruit.dataValues.calories,
                                fat: fruit.dataValues.fat,
                                sugar: fruit.dataValues.sugar,
                                carbohydrates: fruit.dataValues.carbohydrates,
                                protein: fruit.dataValues.protein,
                            },
                        };
                    })
                );

                const response = {
                    rows: formattedFruits,
                    count: fruits.count,
                    pageCount: Math.ceil(fruits.count / limit)
                }

                logger.logger.log('info', "Sucesso ao listar frutas!")
                return {status: 200, data: response}
            }
            messageError = "Não possui dados suficientes para essa página com esse limite"
            logger.logger.log('error', messageError)
            return {status: 204, data: messageError}
        }
        messageError = "Desculpe, não foi possível realizar essa pesquisa"
        logger.logger.log('error', messageError)
        return {status: 500, data: messageError}
    },

}
