const userDao = require("../DAO/userDao")
const logger = require('../helpers/loggerConfig')
const bcrypt = require("../helpers/bcryptConfig")

module.exports = {
    getUserById: async function(id) {
        return await userDao.getById(id)
    },

    getAllOtherUsers: async function(id){
        return await userDao.getAllOtherUsers(id)
    },

    getUserByEmail: async function(email) {
        return await userDao.getByEmail(email)
    },

    existEmail: async function(email) {
        return await userDao.getByEmail(email) != null
    },

    registerUser: async function(email, password) {
        if(!await this.existEmail(email)) {
            const result = await bcrypt.encodePassword(password)
            console.log(result)
            if(result.status === 500) {
                return result
            }
            const user = await userDao.insert(email, result.data)
            logger.logger.log('info', "Sucesso ao cadastrar usuário!")
            return {status: 201, data: user}
        }

        let messageError = "Já existe uma conta com esse email"
        logger.logger.log('error', messageError)
        return {status: 409, data: messageError}
    }

}
