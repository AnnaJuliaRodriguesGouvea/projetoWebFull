const UserModel = require("../models/User")
const {Op} = require("sequelize");

module.exports = {
    insert: async function(email, password) {
        return await UserModel.create({
            email: email,
            password: password
        })
    },

    getByEmail: async function(email) {
        return await UserModel.findOne({ where: { email: email } })
    },

    getById: async function(id) {
        return await UserModel.findByPk(id)
    },

    getAllOtherUsers: async function(id) {
        return await UserModel.findAll({
            where: {
                id: { [Op.ne]: id },
            },
        })
    },
}
